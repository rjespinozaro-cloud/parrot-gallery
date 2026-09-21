"use client";
import { motion } from "framer-motion";
import { CaseStudy } from "@/data/cases";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "@studio-freight/react-lenis";
import { AlertIcon, ShieldIcon, LightningIcon, ChartLineIcon, DocumentIcon } from "@/components/icons";

interface CaseModalProps {
  selectedCase: CaseStudy | null;
  onClose: () => void;
}

const CORNER_ACCENTS = [
  "left-0 top-0 rounded-tl-lg border-l-2 border-t-2",
  "right-0 top-0 rounded-tr-lg border-r-2 border-t-2",
  "bottom-0 left-0 rounded-bl-lg border-b-2 border-l-2",
  "bottom-0 right-0 rounded-br-lg border-b-2 border-r-2",
];

const categoryLabel = (cat: string) =>
  cat === "web" ? "Desarrollo Web" : cat === "soc" ? "Operaciones SOC" : "Infraestructura";

const InfoSection = ({
  icon,
  title,
  children,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  delay: number;
}) => (
  <motion.div
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay }}
    className="p-4 rounded-xl bg-carbon-700/60 border border-carbon-500/50 backdrop-blur-sm"
  >
    <h4 className="font-mono text-primary-300 text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
      <span className="text-sm">{icon}</span>
      <span className="text-gradient-gold">{title}</span>
    </h4>
    <p className="text-slate-200 leading-relaxed">{children}</p>
  </motion.div>
);

export const CaseModal = ({ selectedCase, onClose }: CaseModalProps) => {
  const lenis = useLenis();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showPdf, setShowPdf] = useState(false);
  const pdfUrl = selectedCase?.pdfUrl;
  const pdfTitle = selectedCase?.pdfTitle;

  useEffect(() => {
    if (!selectedCase) return;

    lenis?.stop();
    document.body.style.overflow = "hidden";

    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [selectedCase, lenis]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !selectedCase) return;

    const onWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop = scrollTop === 0 && e.deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight && e.deltaY > 0;

      if (!atTop && !atBottom) {
        e.stopPropagation();
      }
    };

    el.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      el.removeEventListener("wheel", onWheel);
    };
  }, [selectedCase]);

  if (!selectedCase) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon-900/90 backdrop-blur-lg"
    >
      <motion.div
        layoutId={`card-${selectedCase.id}`}
        onClick={(e) => e.stopPropagation()}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-2xl rounded-2xl border-2 border-primary-500/40 bg-carbon-800 shadow-neon-navy-lg backdrop-blur-xl"
        style={{ maxHeight: "90vh" }}
      >
        <div
          ref={scrollRef}
          className="overflow-y-auto overscroll-contain p-6 sm:p-8 text-slate-100"
          style={{ maxHeight: "90vh" }}
        >
          <div className="scanline animate-scanline" />

          {CORNER_ACCENTS.map((cls, i) => (
            <motion.div
              key={i}
              className={`pointer-events-none absolute h-8 w-8 border-primary-400/80 ${cls}`}
              animate={{ boxShadow: "0 0 20px rgba(0, 71, 230, 0.6)" }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          ))}

          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <motion.span
                className="inline-block text-xs font-mono uppercase tracking-widest text-primary-400 mb-2 px-3 py-1 rounded-full border border-primary-500/30 bg-primary-500/10"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {categoryLabel(selectedCase.category)}
              </motion.span>
              <motion.h2
                className="text-2xl sm:text-3xl font-bold text-gradient-gold"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {selectedCase.title}
              </motion.h2>
            </div>
            <motion.button
              onClick={onClose}
              className="p-2 rounded-lg bg-carbon-700/80 text-slate-300 hover:text-white hover:shadow-neon-navy transition-all border border-carbon-500 hover:border-primary-500/50 shrink-0"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Cerrar modal"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </motion.button>
          </div>

          <motion.div
            className="space-y-4 text-sm text-slate-200 font-sans"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <InfoSection icon={<AlertIcon size={14} />} title="Problema Identificado" delay={0.5}>
              {selectedCase.problem}
            </InfoSection>

            <InfoSection icon={<ShieldIcon size={14} />} title="Solución / Remediación" delay={0.6}>
              {selectedCase.solution}
            </InfoSection>

            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7 }} className="pt-2">
              <h4 className="font-mono text-xs uppercase text-slate-300 mb-3 tracking-wider">
                <LightningIcon size={14} className="text-primary-400" /> Herramientas Utilizadas
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedCase.tools.map((tool, idx) => (
                  <motion.span
                    key={tool}
                    className="text-xs font-mono px-3 py-1.5 rounded-full bg-gradient-to-r from-primary-600/20 to-secondary/20 border border-primary-500/30 text-slate-200 backdrop-blur-sm hover-lift"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7 + idx * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8 }} className="pt-2">
              <div className="p-4 rounded-xl bg-gradient-to-br from-primary-600/15 to-secondary/15 border border-primary-500/30 backdrop-blur-sm">
                <h4 className="font-mono text-xs uppercase text-primary-300 mb-2 tracking-wider flex items-center gap-2">
                  <ChartLineIcon size={14} className="text-primary-400" />
                  <span>Resultado / Métrica de Impacto</span>
                </h4>
                <p className="text-slate-200 font-mono text-sm leading-relaxed">
                  {selectedCase.metrics}
                </p>
              </div>
            </motion.div>

            {pdfUrl && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="pt-4"
              >
                <button
                  onClick={() => setShowPdf((v) => !v)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-primary-600/10 border border-primary-500/30 hover:bg-primary-600/20 hover:border-primary-500/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <DocumentIcon size={16} className="text-primary-400" />
                    <div className="text-left">
                      <p className="text-sm font-mono text-primary-200 group-hover:text-primary-100 transition-colors">
                        {pdfTitle || "PDF del Laboratorio"}
                      </p>
                      <p className="text-[10px] font-mono text-slate-400">
                        {showPdf ? "Cerrar visor" : "Haz clic para ver el documento"}
                      </p>
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 text-primary-400 transition-transform duration-300 ${showPdf ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: showPdf ? "auto" : 0, opacity: showPdf ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 rounded-xl border border-carbon-600/80 bg-carbon-950 overflow-hidden">
                    <iframe
                      src={pdfUrl}
                      className="w-full"
                      style={{ height: "70vh", minHeight: "400px" }}
                      title={pdfTitle || "PDF"}
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
