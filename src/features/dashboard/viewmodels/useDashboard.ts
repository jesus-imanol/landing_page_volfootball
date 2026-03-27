"use client";

import { useState, useEffect } from "react";
import { api } from "@/core/lib/api-client";

interface DashboardData {
  retas: { id: number; title: string; fecha_hora: string; lugar: string; estado: string }[];
  invitacionesPendientes: number;
  notificacionesNoLeidas: number;
}

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [retasRes, invsRes, notifsRes] = await Promise.allSettled([
        api.get<{ data: { id: number; title: string; fecha_hora: string; lugar: string; estado: string }[] }>("/v1/pickup-games"),
        api.get<{ invitaciones: { id: number }[] | null }>("/v1/invitaciones/mis-invitaciones"),
        api.get<{ data: { no_leidas: number } }>("/v1/notificaciones"),
      ]);

      const retas = retasRes.status === "fulfilled" ? (retasRes.value.data || []).slice(0, 3) : [];
      const invs = invsRes.status === "fulfilled" ? (invsRes.value.invitaciones ?? []).length : 0;
      const notifs = notifsRes.status === "fulfilled" ? (notifsRes.value.data?.no_leidas ?? 0) : 0;

      setData({
        retas,
        invitacionesPendientes: invs,
        notificacionesNoLeidas: notifs,
      });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error cargando dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, reload: load };
}
