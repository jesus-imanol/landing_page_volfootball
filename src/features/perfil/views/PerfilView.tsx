"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Shield, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import PortalCard from "@/core/components/PortalCard";
import AvatarUpload from "@/features/media/views/AvatarUpload";
import { useImageUpload } from "@/features/media/viewmodels/useImageUpload";
import { useProfile } from "../viewmodels/useProfile";

const roleNames: Record<number, string> = {
  1: "Super Admin",
  2: "Admin de Liga",
  3: "Árbitro",
  4: "Admin de Equipo",
  5: "Patrocinador",
  6: "Jugador",
};

export default function PerfilView() {
  const { user, logout } = useProfile();
  const { uploadAvatar, isUploading, error } = useImageUpload();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const handleAvatarUpload = async (file: File) => {
    const result = await uploadAvatar(file);
    if (result) {
      setAvatarUrl(result.url);
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
