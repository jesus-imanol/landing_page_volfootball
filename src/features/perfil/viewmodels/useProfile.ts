"use client";

import { useAuthContext } from "@/core/context/auth-context";

export function useProfile() {
  const { user, logout, updateAvatarUrl } = useAuthContext();
  return { user, logout, updateAvatarUrl };
}
