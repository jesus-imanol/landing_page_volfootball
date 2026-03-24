"use client";

import { AuthProvider } from "@/core/context/auth-context";
import RegisterView from "@/features/auth/views/RegisterView";

export default function RegisterPage() {
  return (
    <AuthProvider>
      <RegisterView />
    </AuthProvider>
  );
}
