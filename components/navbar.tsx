"use client";
import { USER_INFO } from "@/data/cases";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/70 border-b border-slate-800/80 px-4 sm:px-8 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono font-bold text-slate-100 tracking-tight">
            {USER_INFO.name}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {USER_INFO.status}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={USER_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors hidden sm:block"
          >
            GitHub
          </a>
          <a
            href={USER_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors hidden sm:block"
          >
            LinkedIn
          </a>
          <a
            href={USER_INFO.cvPdf}
            download
            className="px-3 py-1.5 text-xs font-mono rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all active:scale-95"
          >
            Descargar CV (PDF)
          </a>
        </div>
      </div>
    </header>
  );
};