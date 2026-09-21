"use client";
import { motion } from "framer-motion";
import { USER_INFO } from "@/data/cases";

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-[50vh] text-center px-4 py-12 overflow-hidden animate-aurora border-b border-carbon-600/60"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-80" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl z-10 flex flex-col items-center gap-6"
      >
        <div className="relative">
          <img
            src={USER_INFO.profileImage}
            alt={USER_INFO.name}
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-2 border-primary-500/50 shadow-neon-navy"
            loading="eager"
          />
          <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-green-500 border-2 border-carbon-900" />
        </div>
        <span className="inline-block text-xs font-mono px-3 py-1 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-300 mb-2">
          {USER_INFO.role}
        </span>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
          {USER_INFO.name.split(" ")[0]}{" "}
          <span className="text-gradient-gold">
            {USER_INFO.name.split(" ").slice(1).join(" ")}
          </span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {USER_INFO.summary}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-primary-500/10 text-primary-300 border border-primary-500/30">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
            {USER_INFO.status}
          </span>
          <span className="text-xs font-mono text-slate-400">
            {USER_INFO.education}
          </span>
        </div>
      </motion.div>
    </section>
  );
};