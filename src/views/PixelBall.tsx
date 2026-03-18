"use client";

import { motion } from "framer-motion";

export default function PixelBall() {
  return (
    <motion.div
      animate={{
        y: [-12, 12, -12],
        rotate: [0, 360],
      }}
      transition={{
        y: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
        rotate: { duration: 8, repeat: Infinity, ease: "linear" },
      }}
      className="relative"
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 16 16"
        className="pixel-ball drop-shadow-[0_0_40px_rgba(61,255,114,0.4)]"
      >
        {/* Pixel art soccer ball 16x16 */}
        {/* Background circle */}
        <rect x="5" y="0" width="6" height="1" fill="#e8e8e8" />
        <rect x="3" y="1" width="10" height="1" fill="#e8e8e8" />
        <rect x="2" y="2" width="12" height="1" fill="#e8e8e8" />
        <rect x="1" y="3" width="14" height="1" fill="#e8e8e8" />
        <rect x="1" y="4" width="14" height="1" fill="#e8e8e8" />
        <rect x="0" y="5" width="16" height="1" fill="#e8e8e8" />
        <rect x="0" y="6" width="16" height="1" fill="#e8e8e8" />
        <rect x="0" y="7" width="16" height="1" fill="#e8e8e8" />
        <rect x="0" y="8" width="16" height="1" fill="#e8e8e8" />
        <rect x="0" y="9" width="16" height="1" fill="#e8e8e8" />
        <rect x="0" y="10" width="16" height="1" fill="#e8e8e8" />
        <rect x="1" y="11" width="14" height="1" fill="#e8e8e8" />
        <rect x="1" y="12" width="14" height="1" fill="#e8e8e8" />
        <rect x="2" y="13" width="12" height="1" fill="#e8e8e8" />
        <rect x="3" y="14" width="10" height="1" fill="#e8e8e8" />
        <rect x="5" y="15" width="6" height="1" fill="#e8e8e8" />

        {/* Pentagon patches (dark green neo) */}
        <rect x="6" y="1" width="4" height="3" fill="#1a3d2a" />
        <rect x="1" y="5" width="4" height="3" fill="#1a3d2a" />
        <rect x="11" y="5" width="4" height="3" fill="#1a3d2a" />
        <rect x="3" y="10" width="4" height="3" fill="#1a3d2a" />
        <rect x="9" y="10" width="4" height="3" fill="#1a3d2a" />
        <rect x="6" y="6" width="4" height="4" fill="#1a3d2a" />

        {/* Neon green accents on patches */}
        <rect x="7" y="2" width="2" height="1" fill="#3DFF72" opacity="0.7" />
        <rect x="2" y="6" width="2" height="1" fill="#3DFF72" opacity="0.7" />
        <rect x="12" y="6" width="2" height="1" fill="#3DFF72" opacity="0.7" />
        <rect x="4" y="11" width="2" height="1" fill="#3DFF72" opacity="0.7" />
        <rect x="10" y="11" width="2" height="1" fill="#3DFF72" opacity="0.7" />
        <rect x="7" y="7" width="2" height="2" fill="#3DFF72" opacity="0.5" />

        {/* Seam lines */}
        <rect x="5" y="4" width="1" height="1" fill="#999" />
        <rect x="10" y="4" width="1" height="1" fill="#999" />
        <rect x="5" y="10" width="1" height="1" fill="#999" />
        <rect x="10" y="10" width="1" height="1" fill="#999" />
      </svg>

      {/* Glow ring */}
      <div className="absolute inset-0 rounded-full bg-neo-accent/10 blur-xl animate-glow-pulse" />
    </motion.div>
  );
}
