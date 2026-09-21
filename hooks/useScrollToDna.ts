"use client";

import { useState, useEffect } from "react";

export const useScrollToDna = () => {
  const [isDnaSectionVisible, setIsDnaSectionVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const dnaSection = document.querySelector("section.ambient-cases");
      if (!dnaSection) return;

      const rect = dnaSection.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight * 0.3 && rect.bottom >= 0;
      setIsDnaSectionVisible(isVisible);
    };

    handleScroll();

    let timeoutId: NodeJS.Timeout;
    const debouncedScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 50);
    };

    window.addEventListener("scroll", debouncedScroll);
    return () => {
      window.removeEventListener("scroll", debouncedScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return isDnaSectionVisible;
};