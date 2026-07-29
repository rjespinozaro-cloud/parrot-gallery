import { useState, useRef, useEffect } from "react";
import { USER_INFO } from "@/data/cases";
import { FlagPeruIcon, FlagUsIcon } from "@/components/icons";

interface CvDropdownProps {
  direction?: "up" | "down";
  label?: string;
}

export const CvDropdown = ({ direction = "down", label = "CV" }: CvDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuPositionClass =
    direction === "up"
      ? "absolute bottom-full mb-2 right-0 w-52"
      : "absolute top-full mt-2 right-0 w-52";

  return (
    <div className="relative" ref={ref}>
      <button
        id="cv-dropdown-btn"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="px-3 py-1.5 text-xs font-mono rounded-lg bg-primary-600/15 text-white border border-primary-500/30 hover:bg-primary-600/25 transition-all active:scale-95 flex items-center gap-1.5"
      >
        {label}
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          aria-labelledby="cv-dropdown-btn"
          className={`${menuPositionClass} z-50 rounded-lg border border-carbon-500/60 bg-carbon-900/95 backdrop-blur-xl shadow-xl py-1`}
        >
          <a
            href={USER_INFO.cvPdfEs}
            download
            role="menuitem"
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-mono text-slate-200 hover:bg-primary-600/20 hover:text-white transition-colors"
            onClick={() => setOpen(false)}
          >
            <FlagPeruIcon size={16} />
            Descargar CV (Español)
          </a>
          <a
            href={USER_INFO.cvPdfEn}
            download
            role="menuitem"
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-mono text-slate-200 hover:bg-primary-600/20 hover:text-white transition-colors"
            onClick={() => setOpen(false)}
          >
            <FlagUsIcon size={16} />
            Download CV (English)
          </a>
        </div>
      )}
    </div>
  );
};
