"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Shield, LogOut, Check, X, Users, Crown } from "lucide-react";
import toast from "react-hot-toast";
import PortalCard from "@/core/components/PortalCard";
import Spinner from "@/core/components/Spinner";
import AvatarUpload from "@/features/media/views/AvatarUpload";
import { useImageUpload } from "@/features/media/viewmodels/useImageUpload";
import { useInvitations } from "@/features/invitaciones/viewmodels/useInvitations";
import { useProfile } from "../viewmodels/useProfile";
import { useMisEquipos } from "../viewmodels/useMisEquipos";

const roleNames: Record<number, string> = {
  1: "Super Admin",
  2: "Admin de Liga",
  3: "Árbitro",
  4: "Admin de Equipo",
  5: "Patrocinador",
  6: "Jugador",
};

export default function PerfilView() {
  const { user, logout, updateAvatarUrl } = useProfile();
  const { uploadAvatar, isUploading, error } = useImageUpload();
  const { invitations, accept, reject, actionLoading } = useInvitations();
  const { equipos } = useMisEquipos();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(user?.foto_perfil_url ?? null);

  const handleAvatarUpload = async (file: File) => {
    const result = await uploadAvatar(file);
    if (result) {
      setAvatarUrl(result.url);
      updateAvatarUrl(result.url);
      toast.success("Avatar actualizado");
    } else if (error) {
      toast.error(error);
    }
  };

  const initials = user?.nombre_completo
    ?.split(" ")
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("") || "?";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-lg mx-auto space-y-6">
      <h1 className="text-xl font-bold text-white">Mi Perfil</h1>

      {/* Avatar + name */}
      <div className="flex flex-col items-center py-6">
        <div className="mb-4">
          <AvatarUpload
            currentUrl={avatarUrl}
            initials={initials}
            isUploading={isUploading}
            onFileSelected={handleAvatarUpload}
            size={80}
          />
        </div>
        <h2 className="text-white text-lg font-bold">{user?.nombre_completo || "Jugador"}</h2>
        <span className="text-neo-accent text-xs bg-neo-accent/10 px-3 py-1 rounded-full mt-1 font-medium">
          {roleNames[user?.rol_id || 6] || "Jugador"}
        </span>
      </div>

      {/* Info */}
      <PortalCard>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-neo-secondary" />
            <div>
              <p className="text-neo-secondary text-xs">Nombre</p>
              <p className="text-white text-sm font-medium">{user?.nombre_completo}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-neo-secondary" />
            <div>
              <p className="text-neo-secondary text-xs">Correo</p>
              <p className="text-white text-sm font-medium">{user?.correo}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-neo-secondary" />
            <div>
              <p className="text-neo-secondary text-xs">Rol</p>
              <p className="text-white text-sm font-medium">{roleNames[user?.rol_id || 6]}</p>
            </div>
          </div>
        </div>
      </PortalCard>

      {/* Pending invitations */}
      {invitations.length > 0 && (
        <PortalCard>
          <h2 className="text-white font-semibold text-sm mb-3">
            Invitaciones pendientes ({invitations.length})
          </h2>
          <div className="space-y-3">
            {invitations.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-medium">{inv.equipo_nombre || "Equipo"}</p>
                  <p className="text-neo-secondary text-xs mt-0.5">
                    Invitado por {inv.invitador_nombre || "Capitán"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => accept(inv.id)}
                    disabled={actionLoading === inv.id}
                    className="p-2 bg-neo-accent/10 rounded-lg hover:bg-neo-accent/20 transition-colors"
                  >
                    {actionLoading === inv.id ? <Spinner size={16} /> : <Check className="w-4 h-4 text-neo-accent" />}
                  </button>
                  <button
                    onClick={() => reject(inv.id)}
                    disabled={actionLoading === inv.id}
                    className="p-2 bg-neo-error/10 rounded-lg hover:bg-neo-error/20 transition-colors"
                  >
                    <X className="w-4 h-4 text-neo-error" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </PortalCard>
      )}

      {/* Mis equipos */}
      <PortalCard>
        <h2 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
          <Users className="w-4 h-4 text-neo-accent" />
          Mis equipos
        </h2>
        {equipos.length === 0 ? (
          <p className="text-neo-secondary text-xs text-center py-2">
            No perteneces a ningún equipo aún
          </p>
        ) : (
          <div className="space-y-2">
            {equipos.map((eq) => (
              <div key={eq.id} className="flex items-center justify-between py-2 border-b border-neo-border/30 last:border-0">
                <div>
                  <p className="text-white text-sm font-medium">{eq.nombre}</p>
                  <p className="text-neo-secondary text-xs mt-0.5">{eq.liga_nombre || "Liga"}</p>
                </div>
                <div className="flex items-center gap-2">
                  {eq.es_capitan && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-neo-accent bg-neo-accent/10 px-2 py-0.5 rounded-full">
                      <Crown className="w-3 h-3" /> Capitán
                    </span>
                  )}
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    eq.estado === "activo"
                      ? "bg-neo-accent/10 text-neo-accent"
                      : "bg-neo-secondary/10 text-neo-secondary"
                  }`}>
                    {eq.estado.charAt(0).toUpperCase() + eq.estado.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </PortalCard>

      {/* Logout */}
      <button
        onClick={logout}
        className="w-full flex items-center justify-center gap-2 bg-neo-error/10 border border-neo-error/30 text-neo-error font-bold py-3.5 rounded-xl hover:bg-neo-error/20 transition-all"
      >
        <LogOut className="w-5 h-5" />
        Cerrar sesión
      </button>

      <p className="text-center text-neo-secondary/40 text-xs">VolFootball v1.0</p>
    </motion.div>
  );
}
