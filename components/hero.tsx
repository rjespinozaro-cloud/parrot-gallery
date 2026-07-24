"use client";
import { motion } from "framer-motion";
import { USER_INFO } from "@/data/cases";

export const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[50vh] text-center px-4 py-12 overflow-hidden animate-aurora border-b border-slate-800/60">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl z-10"
      >
        <span className="inline-block text-xs font-mono px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 mb-6">
          {USER_INFO.role}
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-100 mb-4">
          Case Studies de{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Ciberseguridad & Pentesting
          </span>
        </h1>
        <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
          Galería técnica interactiva con evidencias de auditoría, remediaciones e ingeniería de software segura.
        </p>
      </motion.div>
    </section>
  );
};