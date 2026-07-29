"use client";

import { useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    document.documentElement.style.setProperty("--scroll-progress", latest.toFixed(4));
  });

  useEffect(() => {
    document.documentElement.style.setProperty("--scroll-progress", "0");
  }, []);

  return null;
};