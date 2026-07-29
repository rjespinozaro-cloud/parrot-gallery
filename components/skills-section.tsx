"use client";
import { SKILLS } from "@/data/cases";

export const SkillsSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8 border-b border-carbon-600/60 w-full ambient-skills">
<h2 className="text-xs font-mono text-primary-300 uppercase tracking-widest mb-4 text-center sm:text-left">
          Stack Técnico & Especialidades
        </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SKILLS.map((group) => (
          <div
            key={group.category}
            className="p-4 rounded-xl bg-carbon-800/80 border border-carbon-600/80 backdrop-blur-sm hover:border-primary-500/30 transition-colors shadow-sm"
          >
            <h3 className="text-sm font-mono font-bold text-white mb-2">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="text-xs font-mono px-2 py-0.5 rounded bg-carbon-700/80 border border-carbon-500/50 text-slate-200 hover:border-primary-500/30 hover:text-primary-300 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};