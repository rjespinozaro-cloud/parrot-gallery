"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";
import { CaseStudy } from "@/data/cases";
import { cn } from "@/lib/utils";

interface DnaTowerProps {
  items: CaseStudy[];
  onSelectCase: (item: CaseStudy) => void;
}

const CV_NODES = [
  { label: "Wazuh SIEM",       detail: "SIEM" },
  { label: "MITRE ATT&CK",     detail: "Threat Intel" },
  { label: "Hardening",        detail: "Zero Trust" },
  { label: "Análisis Tráfico", detail: "Packet Analysis" },
  { label: "Spring Boot",      detail: "Backend" },
  { label: "Docker",           detail: "Containers" },
  { label: "FIM",              detail: "File Integrity" },
  { label: "Capa 2/3",         detail: "Network" },
  { label: "Zero Trust",       detail: "Security" },
  { label: "JWT/BCrypt",       detail: "Auth" },
];

const RUNGS      = 22;
const TURNS      = 4;
const AMPLITUDE  = 30;
const HEIGHT     = 640;

function buildStrand(mirrored: boolean) {
  return Array.from({ length: RUNGS }, (_, i) => {
    const t     = i / (RUNGS - 1);
    const angle = t * TURNS * Math.PI * 2;
    const sway  = Math.sin(angle) * AMPLITUDE;
    return { x: 50 + (mirrored ? -sway : sway), y: t * HEIGHT, z: Math.cos(angle) };
  });
}

const STRAND_A = buildStrand(false);
const STRAND_B = buildStrand(true);

function toPath(nodes: typeof STRAND_A) {
  return nodes.map((n, i) => `${i === 0 ? "M" : "L"} ${n.x.toFixed(1)} ${n.y}`).join(" ");
}

const PATH_A = toPath(STRAND_A);
const PATH_B = toPath(STRAND_B);

const DnaSpine = React.memo(function DnaSpine({ progress }: { progress: MotionValue<number> }) {
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const orbTop = useTransform(progress, [0, 1], ["0%", "90%"]);

  useMotionValueEvent(progress, "change", (latest) => {
    setActiveNodeIndex(Math.min(
      Math.floor(latest * CV_NODES.length),
      CV_NODES.length - 1
    ));
  });

  return (
    <div className="relative h-[70vh] w-[130px]">
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-navy-500 via-transparent to-azure-500 blur-3xl opacity-5 pointer-events-none" />

      <svg
        viewBox={`0 0 100 ${HEIGHT}`}
        className="h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="dna-gradA" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="rgba(0,71,230,0.9)" />
            <stop offset="50%"  stopColor="rgba(0,71,230,0.6)" />
            <stop offset="100%" stopColor="rgba(0,71,230,0.9)" />
          </linearGradient>
          <linearGradient id="dna-gradB" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="rgba(14,165,233,0.9)" />
            <stop offset="50%"  stopColor="rgba(14,165,233,0.6)" />
            <stop offset="100%" stopColor="rgba(14,165,233,0.9)" />
          </linearGradient>
          <filter id="dna-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d={PATH_A}
          fill="none"
          stroke="url(#dna-gradA)"
          strokeWidth={3}
          strokeLinecap="round"
          filter="url(#dna-glow)"
          className="dna-strand-pulse-a"
        />
        <path
          d={PATH_B}
          fill="none"
          stroke="url(#dna-gradB)"
          strokeWidth={3}
          strokeLinecap="round"
          filter="url(#dna-glow)"
          className="dna-strand-pulse-b"
        />

        {STRAND_A.map((n, i) =>
          i % 2 === 0 ? (
            <line
              key={i}
              x1={n.x}
              y1={n.y}
              x2={STRAND_B[i].x}
              y2={STRAND_B[i].y}
              stroke={i % 4 === 0 ? "rgba(0,71,230,0.7)" : "rgba(14,165,233,0.7)"}
              strokeWidth={1.5}
              style={{ opacity: 0.25 + ((n.z + 1) / 2) * 0.55 }}
            />
          ) : null
        )}
      </svg>

      {CV_NODES.map((node, index) => {
        const t      = index / (CV_NODES.length - 1);
        const isLeft = index % 2 === 0;
        const isActive = index === activeNodeIndex;

        return (
          <div
            key={node.label}
            className={cn(
              "absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[10px] font-bold whitespace-nowrap border backdrop-blur-sm transition-all duration-300",
              isActive
                ? "bg-gradient-to-r from-primary-500/30 to-primary-600/20 border-primary-400/80 text-primary-200"
                : "bg-carbon-900/80 border-carbon-600/50 text-carbon-400"
            )}
            style={{
              top: `${t * 88 + 6}%`,
              [isLeft ? "left" : "right"]: "-10px",
              transform: `translateY(-50%) scale(${isActive ? 1.15 : 0.95})`,
              opacity: isActive ? 1 : 0.6,
              boxShadow: isActive
                ? "0 0 18px rgba(0,71,230,0.5), 0 0 36px rgba(0,71,230,0.3)"
                : "none",
            }}
          >
            <span className="leading-tight">{node.label}</span>
            {isActive && node.detail && (
              <span className="text-[8px] opacity-70">{node.detail}</span>
            )}
            {isActive && (
              <span
                className="h-2 w-2 rounded-full shrink-0 dna-node-pulse"
                style={{
                  background: "linear-gradient(135deg, rgba(0,71,230,0.9), rgba(14,165,233,0.9))",
                }}
              />
            )}
          </div>
        );
      })}

      <motion.div
        className="absolute left-1/2 h-5 w-5 -translate-x-1/2 rounded-full"
        style={{
          top: orbTop,
          background: "linear-gradient(135deg, #3b6fd4, #0ea5e9)",
          boxShadow: "0 0 20px rgba(0,71,230,0.7), 0 0 40px rgba(14,165,233,0.4)",
        }}
      >
        <div className="absolute inset-0 rounded-full bg-white/30 animate-pulse" />
      </motion.div>
    </div>
  );
});

const DnaModule = React.memo(function DnaModule({
  item,
  onOpenDetails,
}: {
  item: CaseStudy;
  onOpenDetails: () => void;
}) {
  return (
    <div
      onClick={onOpenDetails}
      className="cursor-pointer rounded-2xl border border-carbon-600 bg-carbon-800/80 p-5 shadow-glass backdrop-blur-xl will-change-transform"
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary-400">
          {item.category === "web"
            ? "Desarrollo Web"
            : item.category === "soc"
            ? "Operaciones SOC"
            : "Infraestructura"}
        </span>
        <div className="h-2 w-2 rounded-full bg-carbon-600" />
      </div>

      <h3 className="text-lg font-bold text-white mb-3">
        <span className="text-gradient-gold">{item.title}</span>
      </h3>

      <div className="mb-4">
        <h4 className="font-mono text-[10px] uppercase tracking-wider text-primary-300 mb-2">
          Resumen
        </h4>
        <p className="text-sm text-slate-300 leading-relaxed">{item.summary}</p>
      </div>

      <div className="mb-3">
        <h4 className="font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-2">
          Herramientas
        </h4>
        <div className="flex flex-wrap gap-2">
          {item.tools.map((tool) => (
            <span
              key={tool}
              className="text-[10px] font-mono px-2 py-1 rounded-full bg-primary-600/15 border border-primary-500/25 text-slate-200"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-carbon-800/80">
        <span className="font-mono text-xs text-primary-400 flex items-center gap-2">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </svg>
          Ver caso completo →
        </span>
      </div>
    </div>
  );
});

export const DnaTower = ({ items, onSelectCase }: DnaTowerProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-carbon-800 bg-carbon-900/40 py-16 text-center font-mono text-sm text-carbon-500">
        No hay casos de estudio en esta categoría.
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className="relative mx-auto grid max-w-5xl grid-cols-1 gap-x-6 px-2 md:grid-cols-[1fr_130px_1fr]"
    >
      <div className="flex flex-col gap-16 md:pt-[8vh]">
        {items.map((item, index) =>
          index % 2 === 0 ? (
            <div
              key={item.id}
              className="flex min-h-[40vh] items-center"
            >
              <DnaModule
                item={item}
                onOpenDetails={() => onSelectCase(item)}
              />
            </div>
          ) : null
        )}
      </div>

      <div className="pointer-events-none sticky top-0 z-0 hidden h-screen items-center justify-center md:flex">
        <DnaSpine progress={scrollYProgress} />
      </div>

      <div className="flex flex-col gap-16 pt-24 md:pt-[28vh]">
        {items.map((item, index) =>
          index % 2 === 1 ? (
            <div
              key={item.id}
              className="flex min-h-[40vh] items-center"
            >
              <DnaModule
                item={item}
                onOpenDetails={() => onSelectCase(item)}
              />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};