"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/core/lib/api-client";
import type { Notificacion } from "../models/notification";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notificacion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await api.get<{ data: Notificacion[] | null }>("/v1/notificaciones");
      setNotifications(Array.isArray(res.data) ? res.data : []);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const markAsRead = async (id: number) => {
    try {
      await api.put(`/v1/notificaciones/${id}/leer`);
      setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, leida: true } : n));
    } catch {
      // silent
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.put("/v1/notificaciones/leer-todas");
      setNotifications((prev) => prev.map((n) => ({ ...n, leida: true })));
    } catch {
      // silent
    }
  };

  const unreadCount = notifications.filter((n) => !n.leida).length;

  return { notifications, isLoading, error, markAsRead, markAllAsRead, unreadCount, reload: load };
}
