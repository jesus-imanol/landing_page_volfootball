"use client";

import { useState } from "react";
import { useAuthContext } from "@/core/context/auth-context";

export function useLogin() {
  const { login } = useAuthContext();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await login({ correo, password });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return { correo, setCorreo, password, setPassword, error, isLoading, submit };
}

export function useRegister() {
  const { register } = useAuthContext();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
    setError(null);
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setIsLoading(true);
    try {
      await register({ nombre_completo: nombre, correo, password });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error al registrarse");
    } finally {
      setIsLoading(false);
    }
  };

  return { nombre, setNombre, correo, setCorreo, password, setPassword, confirmPassword, setConfirmPassword, error, isLoading, submit };
}
