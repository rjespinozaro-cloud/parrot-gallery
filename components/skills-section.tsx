"use client";
import { SKILLS } from "@/data/cases";

export const SkillsSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8 border-b border-slate-800/60 w-full">
      <h2 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4 text-center sm:text-left">
        // Stack Técnico & Especialidades
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {SKILLS.map((group) => (
          <div
            key={group.category}
            className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm"
          >
            <h3 className="text-sm font-mono font-bold text-cyan-400 mb-2">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/50 text-slate-300"
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