"use client";
import { USER_INFO } from "@/data/cases";

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-800/80 py-8 px-4 text-center text-xs font-mono text-slate-500 bg-slate-950">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} {USER_INFO.name}. Todos los derechos reservados.</p>
        <div className="flex items-center gap-4">
          <a href={`mailto:${USER_INFO.email}`} className="hover:text-cyan-400 transition-colors">
            {USER_INFO.email}
          </a>
        </div>
      </div>
    </footer>
  );
};