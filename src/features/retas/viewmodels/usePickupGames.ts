"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/core/lib/api-client";
import type { PickupGame, CreatePickupGameRequest } from "../models/pickup-game";

export function usePickupGames() {
  const [games, setGames] = useState<PickupGame[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.get<{ data: PickupGame[] }>("/v1/pickup-games");
      setGames(res.data || []);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error cargando retas");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return { games, isLoading, error, reload: load };
}

export function useCreatePickupGame() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (data: CreatePickupGameRequest): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await api.post("/v1/pickup-games", data);
      return true;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error creando reta");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { create, isLoading, error };
}

export function usePickupGameDetail(id: number) {
  const [game, setGame] = useState<PickupGame | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get<{ data: PickupGame }>(`/v1/pickup-games/${id}`);
        setGame(res.data);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Error");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [id]);

  return { game, isLoading, error };
}
