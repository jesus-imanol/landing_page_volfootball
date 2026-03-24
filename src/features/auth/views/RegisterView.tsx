"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import Spinner from "@/core/components/Spinner";
import { useRegister } from "../viewmodels/useAuth";

export default function RegisterView() {
  const vm = useRegister();

  return (
    <div className="min-h-screen bg-neo-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-neo-accent" />
            <span className="text-2xl font-bold text-white">VolFootball</span>
          </div>
          <h1 className="text-xl text-white font-semibold">Crear cuenta</h1>
          <p className="text-neo-secondary text-sm mt-1">Únete a la comunidad</p>
        </div>

        <div className="bg-neo-card border border-neo-border rounded-2xl p-6 space-y-4">
          <div>
            <label className="text-neo-secondary text-xs font-medium block mb-1.5">Nombre completo</label>
            <input
              type="text"
              value={vm.nombre}
              onChange={(e) => vm.setNombre(e.target.value)}
              placeholder="Juan Pérez"
              className="w-full bg-neo-surface border border-neo-border rounded-xl px-4 py-3 text-white placeholder:text-neo-secondary/50 focus:border-neo-accent focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-neo-secondary text-xs font-medium block mb-1.5">Correo</label>
            <input
              type="email"
              value={vm.correo}
              onChange={(e) => vm.setCorreo(e.target.value)}
              placeholder="tu@correo.com"
              className="w-full bg-neo-surface border border-neo-border rounded-xl px-4 py-3 text-white placeholder:text-neo-secondary/50 focus:border-neo-accent focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-neo-secondary text-xs font-medium block mb-1.5">Contraseña</label>
            <input
              type="password"
              value={vm.password}
              onChange={(e) => vm.setPassword(e.target.value)}
              placeholder="********"
              className="w-full bg-neo-surface border border-neo-border rounded-xl px-4 py-3 text-white placeholder:text-neo-secondary/50 focus:border-neo-accent focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-neo-secondary text-xs font-medium block mb-1.5">Confirmar contraseña</label>
            <input
              type="password"
              value={vm.confirmPassword}
              onChange={(e) => vm.setConfirmPassword(e.target.value)}
              placeholder="********"
              onKeyDown={(e) => e.key === "Enter" && vm.submit()}
              className="w-full bg-neo-surface border border-neo-border rounded-xl px-4 py-3 text-white placeholder:text-neo-secondary/50 focus:border-neo-accent focus:outline-none transition-colors"
            />
          </div>

          {vm.error && (
            <div className="bg-neo-error/10 border border-neo-error/30 rounded-xl px-4 py-3">
              <p className="text-neo-error text-sm">{vm.error}</p>
            </div>
          )}

          <button
            onClick={vm.submit}
            disabled={vm.isLoading || !vm.nombre || !vm.correo || !vm.password}
            className="w-full bg-neo-accent text-neo-bg font-bold py-3.5 rounded-xl hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {vm.isLoading ? <Spinner size={20} /> : "Crear cuenta"}
          </button>

          <p className="text-center text-neo-secondary text-sm">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-neo-accent font-medium hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
