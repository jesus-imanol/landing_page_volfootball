"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/core/lib/api-client";
import type { Notificacion, NotificacionesResponse } from "../models/notification";

export interface NotificacionesAgrupadas {
  hoy: Notificacion[];
  estaSemana: Notificacion[];
  anteriores: Notificacion[];
  noLeidas: number;
}

export function useNotifications() {
  const [grupos, setGrupos] = useState<NotificacionesAgrupadas>({
    hoy: [],
    estaSemana: [],
    anteriores: [],
    noLeidas: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await api.get<{ data: NotificacionesResponse }>("/v1/notificaciones");
      const d = res.data;
      setGrupos({
        hoy: d?.hoy ?? [],
        estaSemana: d?.esta_semana ?? [],
        anteriores: d?.anteriores ?? [],
        noLeidas: d?.no_leidas ?? 0,
      });
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
      const markOne = (list: Notificacion[]) =>
        list.map((n) => (n.id === id ? { ...n, leida: true } : n));
      setGrupos((prev) => ({
        ...prev,
        hoy: markOne(prev.hoy),
        estaSemana: markOne(prev.estaSemana),
        anteriores: markOne(prev.anteriores),
        noLeidas: Math.max(0, prev.noLeidas - 1),
      }));
    } catch {
      // silent
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.put("/v1/notificaciones/leer-todas");
      const markAll = (list: Notificacion[]) => list.map((n) => ({ ...n, leida: true }));
      setGrupos((prev) => ({
        ...prev,
        hoy: markAll(prev.hoy),
        estaSemana: markAll(prev.estaSemana),
        anteriores: markAll(prev.anteriores),
        noLeidas: 0,
      }));
    } catch {
      // silent
    }
  };

  const total = grupos.hoy.length + grupos.estaSemana.length + grupos.anteriores.length;

  return { grupos, total, isLoading, error, markAsRead, markAllAsRead, unreadCount: grupos.noLeidas, reload: load };
}
