"use client";
import { motion } from "framer-motion";
import { USER_INFO } from "@/data/cases";

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-carbon-600/60 animate-aurora"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-80" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] items-center gap-12 px-6 sm:px-10 py-16 sm:py-24"
      >
        <div className="text-left">
          <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.24em] text-primary-300">
            <span className="h-px w-8 bg-primary-400" />
            White-hat security · software engineering
          </span>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-400/40 bg-primary-400/10 px-3 py-1.5 text-primary-200">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-300 animate-pulse" />
              {USER_INFO.status}
            </span>
            <span className="text-slate-400">{USER_INFO.role}</span>
          </div>
          <h1 className="mt-6 text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-[0.95]">
            {USER_INFO.name.split(" ")[0]}{" "}
            <span className="text-gradient-gold">{USER_INFO.name.split(" ").slice(1).join(" ")}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
            {USER_INFO.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${USER_INFO.email}`} className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-5 py-3 text-sm font-semibold text-white shadow-neon-navy transition hover:-translate-y-0.5 hover:bg-primary-400">
              Contactar por email
              <span aria-hidden="true">→</span>
            </a>
            <a href={USER_INFO.cvPdfEs} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-lg border border-slate-600 bg-carbon-800/60 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-primary-400 hover:text-primary-200">
              Ver CV
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs font-mono text-slate-400">
            <span>{USER_INFO.education}</span>
            <span className="text-primary-300">SOC · SIEM · Full-Stack</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:justify-self-end">
          <div className="absolute -inset-8 rounded-full bg-primary-500/10 blur-3xl" aria-hidden="true" />
          <div className="relative rounded-2xl border border-slate-700/80 bg-carbon-900/70 p-5 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-slate-700/70 pb-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">Profile snapshot</span>
              <span className="h-2 w-2 rounded-full bg-primary-400 shadow-[0_0_12px_rgba(45,212,191,0.8)]" />
            </div>
            <div className="flex items-center gap-4 py-6">
              <img src={USER_INFO.profileImage} alt={USER_INFO.name} className="h-20 w-20 rounded-xl object-cover border border-primary-400/50" loading="eager" />
              <div>
                <p className="font-semibold text-white">{USER_INFO.role}</p>
                <p className="mt-1 text-sm text-primary-300">{USER_INFO.status}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 border-t border-slate-700/70 pt-4 text-center">
              <div><strong className="block text-lg text-white">24/7</strong><span className="text-[10px] uppercase tracking-wider text-slate-500">monitoring</span></div>
              <div><strong className="block text-lg text-white">50+</strong><span className="text-[10px] uppercase tracking-wider text-slate-500">alerts</span></div>
              <div><strong className="block text-lg text-white">L1</strong><span className="text-[10px] uppercase tracking-wider text-slate-500">analyst</span></div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};