"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CaseStudy } from "@/data/cases";

interface CaseModalProps {
  selectedCase: CaseStudy | null;
  onClose: () => void;
}

export const CaseModal = ({ selectedCase, onClose }: CaseModalProps) => {
  if (!selectedCase) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      >
        <motion.div
          layoutId={`card-${selectedCase.id}`}
          onClick={(e) => e.stopPropagation()}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 p-6 sm:p-8 text-slate-100 shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-xs font-mono uppercase text-cyan-400">
                {selectedCase.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold">
                {selectedCase.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4 text-sm text-slate-300 font-sans">
            <div>
              <h4 className="font-mono text-cyan-400 text-xs uppercase mb-1">
                🚨 Problema Identificado
              </h4>
              <p className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                {selectedCase.problem}
              </p>
            </div>

            <div>
              <h4 className="font-mono text-cyan-400 text-xs uppercase mb-1">
                🛡️ Solución / Remediación
              </h4>
              <p className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                {selectedCase.solution}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800/80">
                <h4 className="font-mono text-xs uppercase text-slate-400">
                  MITRE ATT&CK
                </h4>
                <p className="font-mono font-bold text-slate-200">
                  {selectedCase.mitreId}
                </p>
              </div>
              <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800/80">
                <h4 className="font-mono text-xs uppercase text-slate-400">
                  Puntaje CVSS
                </h4>
                <p className="font-mono font-bold text-red-400">
                  {selectedCase.cvss} / 10
                </p>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="font-mono text-xs uppercase text-slate-400 mb-2">
                Herramientas Utilizadas
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedCase.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <h4 className="font-mono text-xs uppercase text-emerald-400 mb-1">
                📈 Resultado / Métrica de Impacto
              </h4>
              <p className="text-slate-200 font-mono text-xs bg-emerald-500/10 p-2.5 rounded border border-emerald-500/20">
                {selectedCase.metrics}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};