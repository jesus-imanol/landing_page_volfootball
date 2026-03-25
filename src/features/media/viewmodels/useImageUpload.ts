"use client";

import { useState } from "react";
import { getToken } from "@/core/lib/auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

interface UploadResult {
  url: string;
  public_id: string;
}

export function useImageUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (
    file: File,
    endpoint: string = "/v1/media/upload",
    method: string = "POST"
  ): Promise<UploadResult | null> => {
    setIsUploading(true);
    setError(null);

    try {
      const token = getToken();
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error?.message || "Error subiendo imagen");
      }

      return { url: data.url, public_id: data.public_id };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error subiendo imagen";
      setError(msg);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const uploadAvatar = (file: File) => upload(file, "/v1/media/avatar", "PATCH");
  const uploadTeamLogo = (equipoId: number, file: File) =>
    upload(file, `/v1/media/equipos/${equipoId}/logo`, "PATCH");

  return { upload, uploadAvatar, uploadTeamLogo, isUploading, error };
}
