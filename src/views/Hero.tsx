"use client";

import { motion } from "framer-motion";
import PixelBall from "./PixelBall";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center neo-grid overflow-hidden"
    >
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neo-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Text */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex-1 text-center lg:text-left"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-block px-4 py-1.5 text-xs font-bold text-neo-accent bg-neo-accent/10 border border-neo-accent/20 rounded-full mb-6 tracking-widest uppercase">
              Beta abierta
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
          >
            Gestiona tu liga
            <br />
            <span className="text-gradient">como un pro</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-neo-secondary text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed"
          >
            La plataforma todo-en-uno para ligas de futbol amateur. Torneos,
            pagos, arbitros y equipos — todo desde tu celular.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <a
              href="#cta"
              className="px-8 py-3.5 bg-neo-accent text-black font-bold rounded-xl text-base hover:scale-105 transition-transform animate-glow-pulse"
            >
              Empezar gratis
            </a>
            <a
              href="#features"
              className="px-8 py-3.5 border border-neo-border text-white font-semibold rounded-xl text-base hover:border-neo-accent/40 transition-colors"
            >
              Ver funciones
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex items-center gap-6 justify-center lg:justify-start text-sm text-neo-secondary"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neo-accent" />
              Sin tarjeta de credito
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neo-accent" />
              Setup en 5 minutos
            </span>
          </motion.div>
        </motion.div>

        {/* Ball */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-shrink-0"
        >
          <PixelBall />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neo-bg to-transparent pointer-events-none" />
    </section>
  );
}
