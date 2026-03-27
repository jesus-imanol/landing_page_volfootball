"use client";

import { useState, useEffect } from "react";
import { api } from "@/core/lib/api-client";

export interface MiEquipo {
  id: number;
  liga_id: number;
  nombre: string;
  liga_nombre: string;
  max_jugadores: number;
  estado: string;
  es_capitan: boolean;
}

export function useMisEquipos() {
  const [equipos, setEquipos] = useState<MiEquipo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get<{ equipos: MiEquipo[] }>("/v1/mis-equipos")
      .then((res) => setEquipos(res.equipos ?? []))
      .catch(() => setEquipos([]))
      .finally(() => setIsLoading(false));
  }, []);

  return { equipos, isLoading };
}
