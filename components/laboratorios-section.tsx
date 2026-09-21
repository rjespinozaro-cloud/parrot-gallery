"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CASE_STUDIES, type CaseStudy } from "@/data/cases";
import { CaseModal } from "@/components/case-modal";

const LABS = CASE_STUDIES.filter((c) => c.lab);
const FEATURED = LABS[0];
const REST = LABS.slice(1);

const categoryConfig = {
  soc: {
    label: "SOC",
    bg: "bg-primary-500/10",
    border: "border-primary-500/30",
    text: "text-primary-300",
    dot: "bg-primary-400",
    glow: "shadow-[0_0_20px_rgba(15,118,110,0.2)]",
  },
  infra: {
    label: "Infra",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-300",
    dot: "bg-amber-400",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.2)]",
  },
  web: {
    label: "Web",
    bg: "bg-azure-500/10",
    border: "border-azure-500/30",
    text: "text-azure-300",
    dot: "bg-azure-400",
    glow: "shadow-[0_0_20px_rgba(14,165,233,0.2)]",
  },
};

export const LaboratoriosSection = () => {
  const [selectedLab, setSelectedLab] = useState<CaseStudy | null>(null);

  return (
    <section className="relative mx-auto max-w-6xl px-4 pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-cyber opacity-25" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary-500/4 rounded-full blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-500/3 rounded-full blur-[120px]" />

      <div className="mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-10 bg-gradient-to-r from-transparent via-accent/50 to-accent/50" />
<span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Laboratorios
            </span>
          <div className="h-px w-10 bg-gradient-to-r from-accent/50 to-accent/50 via-transparent" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white text-center tracking-tight">
          Laboratorios &{" "}
          <span className="text-gradient-gold">Simulaciones</span>
        </h2>
        <p className="mt-3 text-sm text-slate-400 max-w-lg mx-auto leading-relaxed text-center">
          Entornos prácticos donde aplico detección de amenazas, endurecimiento
          de redes y respuesta a incidentes sobre infraestructura real.
        </p>

        <div className="flex items-center justify-center gap-6 mt-8">
          {[
            { label: "Laboratorios", value: LABS.length, color: "text-primary-300" },
            { label: "Categorías", value: 2, color: "text-accent" },
            { label: "PDFs", value: LABS.filter((l) => l.pdfUrl).length, color: "text-amber-300" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className={`text-2xl font-bold font-mono ${stat.color}`}>
                {stat.value}
              </p>
              <p className="text-[10px] font-mono uppercase tracking-wider text-carbon-400 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
          <div className="h-8 w-px bg-carbon-600" />
          <div className="text-center">
            <p className="text-2xl font-bold font-mono text-white">4</p>
            <p className="text-[10px] font-mono uppercase tracking-wider text-carbon-400 mt-1">
              Técnicas
            </p>
          </div>
        </div>
      </div>

      {FEATURED && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onClick={() => setSelectedLab(FEATURED)}
          onKeyDown={(e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedLab(FEATURED); } }}
          role="button"
          tabIndex={0}
          className="relative cursor-pointer rounded-2xl border border-primary-500/20 bg-gradient-to-br from-carbon-800/90 to-carbon-900/90 p-6 sm:p-8 backdrop-blur-xl transition-all duration-500 hover:border-primary-500/50 hover:shadow-[0_0_40px_rgba(15,118,110,0.12)] hover:-translate-y-0.5 mb-8"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary-500 via-primary-400 to-transparent rounded-l-2xl" />

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border bg-primary-500/10 border-primary-500/30 text-primary-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-400 animate-pulse" />
                  {FEATURED.category === "soc" ? "SOC" : "Infraestructura"}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent/10 border border-accent/30 text-accent">
                  Destacado
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-3">
                <span className="text-gradient-gold">{FEATURED.title}</span>
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {FEATURED.summary}
              </p>

              <div className="flex flex-wrap gap-2">
                {FEATURED.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-[10px] font-mono px-2 py-1 rounded-full bg-primary-600/15 border border-primary-500/20 text-slate-200"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:w-48 flex flex-col justify-between items-start lg:items-end gap-3">
              {FEATURED.pdfUrl && (
                <div className="flex items-center gap-2 text-[10px] font-mono text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 3.5L18.5 8H14V3.5z" />
                  </svg>
                  Documento técnico
                </div>
              )}
              <div className="text-right">
                <p className="font-mono text-xs text-primary-300">Ver detalle →</p>
                <p className="text-[10px] text-carbon-400 mt-1">Click para abrir</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {REST.map((lab, index) => {
          const cfg = categoryConfig[lab.category];
          return (
            <motion.div
              key={lab.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              onClick={() => setSelectedLab(lab)}
              onKeyDown={(e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedLab(lab); } }}
              role="button"
              tabIndex={0}
              className="group cursor-pointer rounded-2xl border border-carbon-600/80 bg-carbon-800/70 p-5 backdrop-blur-xl backdrop-filter transition-all duration-300 hover:border-primary-500/50 hover:shadow-[0_0_30px_rgba(15,118,110,0.12)] hover:-translate-y-1"
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider border ${cfg.bg} ${cfg.border} ${cfg.text}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                  {cfg.label}
                </span>
                {lab.pdfUrl && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    PDF
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold mb-2">
                <span className="text-gradient-gold">{lab.title}</span>
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed mb-3 line-clamp-2">
                {lab.summary}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {lab.tools.slice(0, 4).map((tool) => (
                  <span
                    key={tool}
                    className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-carbon-700/60 border border-carbon-600/40 text-slate-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <div className="pt-2.5 border-t border-carbon-700/60">
                <span className="font-mono text-[11px] text-primary-400 flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                  Abrir laboratorio
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedLab && (
          <CaseModal
            selectedCase={selectedLab}
            onClose={() => setSelectedLab(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
