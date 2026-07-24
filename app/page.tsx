"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { SkillsSection } from "@/components/skills-section";
import { FilterBar } from "@/components/filter-bar";
import { CaseCard } from "@/components/case-card";
import { CaseModal } from "@/components/case-modal";
import { Footer } from "@/components/footer";
import { CASE_STUDIES, CaseStudy } from "@/data/cases";

export default function Home() {
  const [filter, setFilter] = useState("all");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const filteredCases =
    filter === "all"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) => c.category === filter);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SkillsSection />
        
        <section className="max-w-6xl mx-auto px-4 pb-16">
          <FilterBar currentFilter={filter} onSelectFilter={setFilter} />

          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredCases.map((item) => (
                <CaseCard
                  key={item.id}
                  item={item}
                  onClick={() => setSelectedCase(item)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        <CaseModal
          selectedCase={selectedCase}
          onClose={() => setSelectedCase(null)}
        />
      </main>
      <Footer />
    </div>
  );
}