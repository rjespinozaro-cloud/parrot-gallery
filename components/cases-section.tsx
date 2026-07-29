"use client";
import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { FilterBar } from "@/components/filter-bar";
import { DnaTower } from "@/components/dna-tower";
import { CaseModal } from "@/components/case-modal";
import { CASE_STUDIES, type CaseStudy } from "@/data/cases";

export const CasesSection = () => {
  const [filter, setFilter] = useState("all");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const filteredCases = useMemo(
    () =>
      filter === "all"
        ? CASE_STUDIES
        : CASE_STUDIES.filter((c) => c.category === filter),
    [filter]
  );

  return (
    <>
      <section className="relative mx-auto max-w-6xl px-4 pb-24 ambient-cases">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-cyber opacity-40" />

        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-8 bg-primary-500/40" />
            <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Case Studies
            </h2>
            <div className="h-px w-8 bg-primary-500/40" />
          </div>
          <p className="text-2xl font-bold text-carbon-50 sm:text-3xl">
            Torre de Casos de Estudio
          </p>
        </div>

        <FilterBar currentFilter={filter} onSelectFilter={setFilter} />

        <div className="mt-8">
          <DnaTower key={filter} items={filteredCases} onSelectCase={setSelectedCase} />
        </div>
      </section>

      <AnimatePresence>
        {selectedCase && (
          <CaseModal
            selectedCase={selectedCase}
            onClose={() => setSelectedCase(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};
