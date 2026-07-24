"use client";
import { motion } from "framer-motion";

interface FilterBarProps {
  currentFilter: string;
  onSelectFilter: (category: string) => void;
}

const CATEGORIES = [
  { id: "all", label: "Todos" },
  { id: "web", label: "Web" },
  { id: "red", label: "Red" },
  { id: "movil", label: "Móvil" },
];

export const FilterBar = ({ currentFilter, onSelectFilter }: FilterBarProps) => {
  return (
    <div className="flex justify-center gap-2 my-8 px-4 flex-wrap">
      {CATEGORIES.map((cat) => {
        const isActive = currentFilter === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectFilter(cat.id)}
            className="relative px-4 py-2 text-sm font-mono transition-colors rounded-lg focus:outline-none"
          >
            {isActive && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-cyan-500/20 border border-cyan-500/50 rounded-lg"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span
              className={`relative z-10 ${
                isActive
                  ? "text-cyan-300 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {cat.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};