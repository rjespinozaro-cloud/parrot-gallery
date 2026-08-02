"use client";

import React, { createContext, useContext, useMemo, useRef, useEffect, useState } from "react";
import { useScroll, useMotionValue, MotionValue } from "framer-motion";

type DnaContextType = {
  progress: MotionValue<number>;
  activeIndex: number;
  goTo: (index: number) => void;
  registerSection: (id: string, el: HTMLElement | null) => void;
};

const DnaContext = createContext<DnaContextType | undefined>(undefined);

export function DnaProvider({ children }: { children: React.ReactNode }) {
  // progreso global del scroll (0..1)
  const { scrollYProgress } = useScroll();
  const progress = useMotionValue(0);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => progress.set(v));
    return unsub;
  }, [scrollYProgress, progress]);

  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const unsub = progress.on("change", (v) => {
      const ids = Object.keys(sectionsRef.current);
      const count = Math.max(1, ids.length);
      const idx = Math.round(v * (count - 1));
      setActiveIndex(Math.max(0, Math.min(count - 1, idx)));
    });
    return unsub;
  }, [progress]);

  function registerSection(id: string, el: HTMLElement | null) {
    if (el) sectionsRef.current[id] = el;
    else delete sectionsRef.current[id];
  }

  function goTo(index: number) {
    const ids = Object.keys(sectionsRef.current);
    if (ids.length === 0) return;

    const clamped = Math.max(0, Math.min(ids.length - 1, index));
    const el = sectionsRef.current[ids[clamped]];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // fallback: aproximar posición
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const y = (clamped / Math.max(1, ids.length - 1)) * height;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  const value = useMemo(
    () => ({ progress, activeIndex, goTo, registerSection }),
    [progress, activeIndex]
  );

  return <DnaContext.Provider value={value}>{children}</DnaContext.Provider>;
}

export const useDna = () => {
  const c = useContext(DnaContext);
  if (!c) throw new Error("useDna must be used inside DnaProvider");
  return c;
};
