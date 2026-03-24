"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { api } from "@/core/lib/api-client";

interface CredencialData {
  qr_token: string;
  expires_in: number;
}

export function useCredencial(ligaId: number) {
  const [qrToken, setQrToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const generate = useCallback(async () => {
    if (ligaId <= 0) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.post<CredencialData>("/v1/qr/generar", { liga_id: ligaId });
      setQrToken(res.qr_token);
      setSecondsLeft(300); // 5 min
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error generando QR");
    } finally {
      setIsLoading(false);
    }
  }, [ligaId]);

  // Auto-generate on mount
  useEffect(() => {
    generate();
  }, [generate]);

  // Countdown timer
  useEffect(() => {
    if (secondsLeft <= 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Auto-regenerate when expired
          generate();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [secondsLeft, generate]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeDisplay = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  const progress = secondsLeft / 300;

  return { qrToken, isLoading, error, timeDisplay, progress, regenerate: generate };
}
