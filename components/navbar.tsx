"use client";
import { useState, useRef, useEffect } from "react";
import { USER_INFO } from "@/data/cases";
import { useScrollToDna } from "@/hooks/useScrollToDna";
import { CvDropdown } from "@/components/cv-dropdown";

const NAV_LINKS = [
  { label: "Certificados", href: "#certificaciones", external: false },
  { label: "Email", href: `mailto:${USER_INFO.email}`, external: false },
  { label: "GitHub", href: USER_INFO.github, external: true },
  { label: "LinkedIn", href: USER_INFO.linkedin, external: true },
  { label: "Portfolio", href: USER_INFO.portfolio, external: true },
];

export const Navbar = () => {
  const isDnaSectionVisible = useScrollToDna();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isDnaSectionVisible) setMobileOpen(false);
  }, [isDnaSectionVisible]);

  return (
    <header
      className={`sticky top-0 z-40 w-full backdrop-blur-md border-b px-4 sm:px-8 py-3 transition-all duration-500 ease-out ${
        isDnaSectionVisible
          ? "bg-carbon-800/40 border-carbon-600/40 -translate-y-full opacity-0 pointer-events-none"
          : "bg-carbon-800/90 border-carbon-600/80 translate-y-0 opacity-100"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono font-bold text-white tracking-tight text-sm">
            {USER_INFO.name}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono bg-primary-500/15 text-primary-300 border border-primary-500/40">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500 animate-pulse" />
            {USER_INFO.status}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="text-xs font-mono text-slate-300 hover:text-primary-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <CvDropdown direction="down" />
        </div>

        <div className="flex sm:hidden items-center gap-2" ref={mobileMenuRef}>
          <CvDropdown direction="down" />
          <button
            id="mobile-menu-btn"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="p-2 rounded-lg border border-carbon-500/60 bg-carbon-800/80 text-slate-300 hover:text-white hover:border-primary-500/40 transition-all active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {mobileOpen && (
            <nav
              id="mobile-menu"
              role="navigation"
              aria-label="Menú móvil"
              className="absolute top-full right-4 mt-1 w-56 rounded-xl border border-carbon-500/60 bg-carbon-900/97 backdrop-blur-xl shadow-xl z-50 py-2"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-xs font-mono text-slate-200 hover:bg-primary-600/20 hover:text-white transition-colors"
                >
                  {link.external && (
                    <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                  {link.label}
                </a>
              ))}
              <div className="mt-1 pt-2 border-t border-carbon-700/60 px-4 pb-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  {USER_INFO.status}
                </span>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};
