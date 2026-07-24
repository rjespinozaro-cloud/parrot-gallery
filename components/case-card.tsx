"use client";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { CaseStudy } from "@/data/cases";

export const CaseCard = ({
  item,
  onClick,
}: {
  item: CaseStudy;
  onClick: () => void;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      layoutId={`card-${item.id}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-md transition-all hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col justify-between"
    >
      <div style={{ transform: "translateZ(30px)" }}>
        <div className="relative h-40 w-full mb-4 overflow-hidden rounded-lg bg-slate-950">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          <span
            className={`absolute top-2 right-2 text-xs px-2 py-0.5 rounded font-mono font-bold ${
              item.cvss >= 8
                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                : "bg-amber-500/20 text-amber-400"
            }`}
          >
            CVSS {item.cvss}
          </span>
        </div>

        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
            {item.category}
          </span>
          <span className="text-xs font-mono text-slate-500">{item.mitreId}</span>
        </div>

        <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-cyan-300 transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-slate-400 line-clamp-2">{item.summary}</p>
      </div>

      <div
        style={{ transform: "translateZ(20px)" }}
        className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono"
      >
        <span>Ver detalles</span>
        <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">
          →
        </span>
      </div>
    </motion.div>
  );
};