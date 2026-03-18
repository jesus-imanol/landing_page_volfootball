"use client";

export default function Footer() {
  return (
    <footer className="border-t border-neo-border py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-neo-accent/20 border border-neo-accent/40 flex items-center justify-center">
            <span className="text-neo-accent font-bold text-xs">V</span>
          </div>
          <span className="text-white font-bold text-sm">
            Vol<span className="text-neo-accent">Football</span>
          </span>
        </div>

        <div className="flex items-center gap-8 text-sm text-neo-secondary">
          <a href="#features" className="hover:text-neo-accent transition-colors">
            Funciones
          </a>
          <a href="#roles" className="hover:text-neo-accent transition-colors">
            Roles
          </a>
          <a href="#cta" className="hover:text-neo-accent transition-colors">
            Contacto
          </a>
        </div>

        <p className="text-neo-secondary text-xs">
          Hecho con ⚽ por <span className="text-neo-accent">FastCode</span> — 2026
        </p>
      </div>
    </footer>
  );
}
