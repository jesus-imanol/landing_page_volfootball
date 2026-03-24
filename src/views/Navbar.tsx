"use client";

import { motion } from "framer-motion";
import { useLanding } from "@/viewmodels/useLanding";

export default function Navbar() {
  const { navLinks } = useLanding();

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-neo-accent/20 border border-neo-accent/40 flex items-center justify-center">
            <span className="text-neo-accent font-bold text-sm">V</span>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Vol<span className="text-neo-accent">Football</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-neo-secondary text-sm hover:text-neo-accent transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/login"
            className="px-5 py-2 border border-neo-accent/40 text-neo-accent font-medium text-sm rounded-lg hover:bg-neo-accent/10 transition-all"
          >
            Iniciar sesión
          </a>
          <a
            href="/register"
            className="px-5 py-2 bg-neo-accent text-black font-bold text-sm rounded-lg hover:bg-neo-accent/90 transition-all"
          >
            Registrarse
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
