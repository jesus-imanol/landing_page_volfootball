"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/core/lib/api-client";
import type { Invitation } from "../models/invitation";

export function useInvitations() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [joinCode, setJoinCode] = useState("");
  const [joinLoading, setJoinLoading] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);
  const [joinSuccess, setJoinSuccess] = useState(false);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await api.get<{ invitaciones: Invitation[] | null }>("/v1/invitaciones/mis-invitaciones");
      setInvitations(res.invitaciones || []);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const accept = async (id: number) => {
    setActionLoading(id);
    try {
      await api.put(`/v1/invitaciones/${id}/aceptar`);
      setInvitations((prev) => prev.filter((i) => i.id !== id));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setActionLoading(null);
    }
  };

  const reject = async (id: number) => {
    setActionLoading(id);
    try {
      await api.put(`/v1/invitaciones/${id}/rechazar`);
      setInvitations((prev) => prev.filter((i) => i.id !== id));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setActionLoading(null);
    }
  };

  const joinWithCode = async () => {
    if (!joinCode.trim()) return;
    setJoinLoading(true);
    setJoinError(null);
    setJoinSuccess(false);
    try {
      await api.post("/v1/invitaciones/unirse", { codigo: joinCode.trim() });
      setJoinSuccess(true);
      setJoinCode("");
    } catch (e: unknown) {
      setJoinError(e instanceof Error ? e.message : "Código inválido");
    } finally {
      setJoinLoading(false);
    }
  };

  return { invitations, isLoading, error, actionLoading, accept, reject, joinCode, setJoinCode, joinWithCode, joinLoading, joinError, joinSuccess, reload: load };
}
