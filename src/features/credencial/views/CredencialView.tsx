"use client";

import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Shield, RefreshCw, Clock, User, Mail } from "lucide-react";
import { useAuthContext } from "@/core/context/auth-context";
import Spinner from "@/core/components/Spinner";
import { useCredencial } from "../viewmodels/useCredencial";

export default function CredencialView() {
  const { user } = useAuthContext();
  // TODO: get ligaId from user's team — for now use 1 as default
  const ligaId = 1;
  const { qrToken, isLoading, error, timeDisplay, progress, regenerate } = useCredencial(ligaId);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-xl font-bold text-white">Mi Credencial</h1>
        <p className="text-neo-secondary text-sm mt-1">Muestra este QR al árbitro para verificar tu identidad</p>
      </div>

      {/* Credential Card */}
      <div className="bg-neo-card border border-neo-border rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-neo-accent/20 to-neo-accent/5 px-6 py-4 border-b border-neo-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neo-accent/20 rounded-xl">
              <Shield className="w-6 h-6 text-neo-accent" />
            </div>
            <div>
              <p className="text-white font-bold">VolFootball</p>
              <p className="text-neo-secondary text-xs">Credencial Digital</p>
            </div>
          </div>
        </div>

        {/* User info */}
        <div className="px-6 py-4 space-y-3 border-b border-neo-border">
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-neo-secondary" />
            <div>
              <p className="text-neo-secondary text-[10px] uppercase tracking-wider">Nombre</p>
              <p className="text-white font-medium text-sm">{user?.nombre_completo || "Jugador"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-neo-secondary" />
            <div>
              <p className="text-neo-secondary text-[10px] uppercase tracking-wider">Correo</p>
              <p className="text-white font-medium text-sm">{user?.correo || ""}</p>
            </div>
          </div>
        </div>

        {/* QR Code */}
        <div className="px-6 py-6 flex flex-col items-center">
          {isLoading ? (
            <div className="w-48 h-48 flex items-center justify-center">
              <Spinner size={32} />
            </div>
          ) : error ? (
            <div className="w-48 h-48 flex flex-col items-center justify-center text-center">
              <p className="text-neo-error text-sm mb-3">{error}</p>
              <button
                onClick={regenerate}
                className="text-neo-accent text-sm font-medium flex items-center gap-1 hover:underline"
              >
                <RefreshCw className="w-4 h-4" />
                Reintentar
              </button>
            </div>
          ) : qrToken ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="bg-white p-4 rounded-2xl">
                <QRCodeSVG
                  value={qrToken}
                  size={192}
                  level="H"
                  bgColor="#ffffff"
                  fgColor="#0A0E1A"
                />
              </div>
            </motion.div>
          ) : null}

          {/* Timer */}
          {qrToken && !isLoading && (
            <div className="mt-4 w-full space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-neo-secondary">
                  <Clock className="w-3.5 h-3.5" />
                  Expira en
                </span>
                <span className={`font-bold ${progress < 0.2 ? "text-neo-error" : "text-neo-accent"}`}>
                  {timeDisplay}
                </span>
              </div>
              <div className="w-full h-1.5 bg-neo-surface rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${progress < 0.2 ? "bg-neo-error" : "bg-neo-accent"}`}
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Refresh button */}
        <div className="px-6 pb-6">
          <button
            onClick={regenerate}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-neo-surface border border-neo-border text-white font-medium py-3 rounded-xl hover:border-neo-accent/40 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            Generar nuevo QR
          </button>
        </div>
      </div>

      <p className="text-center text-neo-secondary/50 text-xs">
        El QR se renueva automáticamente cada 5 minutos por seguridad
      </p>
    </motion.div>
  );
}
