"use client";

import { AuthProvider } from "@/core/context/auth-context";
import LoginView from "@/features/auth/views/LoginView";

export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginView />
    </AuthProvider>
  );
}
