"use client";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { CERTIFICATIONS, Certification } from "@/data/certs";
import { DocumentIcon, StarIcon, BadgeCheckIcon } from "@/components/icons";
import { useLenis } from "@studio-freight/react-lenis";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORY_LABELS: Record<Certification["type"], { label: string; bg: string; border: string; text: string }> = {
  career_path: { label: "Ruta Completa", bg: "bg-primary-500/20", border: "border-primary-500/50", text: "text-primary-300" },
  specialization: { label: "Especialización", bg: "bg-amber-500/20", border: "border-amber-500/40", text: "text-amber-300" },
  course: { label: "Curso", bg: "bg-carbon-700/60", border: "border-carbon-600/60", text: "text-slate-400" },
};

const CATEGORY_STATS: Record<string, { label: string; count: number }> = {
  soc: { label: "SOC & Operaciones", count: CERTIFICATIONS.filter((c) => c.category === "soc").length },
  infra: { label: "Infraestructura", count: CERTIFICATIONS.filter((c) => c.category === "infra").length },
  pentesting: { label: "Pentesting", count: CERTIFICATIONS.filter((c) => c.category === "pentesting").length },
};

const ISSUER_STYLES: Record<string, { badge: string; dot: string; imageClass: string; gradient: string; accentBorder: string }> = {
  "Cisco Networking Academy": {
    badge: "bg-azure-950/60 border-azure-600/50 text-azure-300",
    dot: "bg-azure-400 animate-pulse",
    imageClass: "object-contain",
    gradient: "from-azure-600/20 to-azure-950/40",
    accentBorder: "border-azure-500/30",
  },
  Netzun: {
    badge: "bg-amber-950/60 border-amber-600/50 text-amber-300",
    dot: "bg-amber-400",
    imageClass: "object-contain rounded-md",
    gradient: "from-amber-500/20 to-amber-950/40",
    accentBorder: "border-amber-500/30",
  },
  DEFAULT: {
    badge: "bg-carbon-800/80 border-carbon-600/60 text-slate-300",
    dot: "bg-primary-400",
    imageClass: "object-contain rounded-md",
    gradient: "from-carbon-700/20 to-carbon-900/40",
    accentBorder: "border-carbon-600/30",
  },
};

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const OVERLAY_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const MODAL_VARIANTS = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 28 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
};

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).catch(() => {});
}

export const CertificationsSection = () => {
  const [filter, setFilter] = useState<string>("all");
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (selectedCert) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [selectedCert, lenis]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filteredCerts = useMemo(() => {
    if (filter === "cisco") return CERTIFICATIONS.filter((c) => c.issuer === "Cisco Networking Academy");
    if (filter === "netzun") return CERTIFICATIONS.filter((c) => c.issuer === "Netzun");
    if (filter === "featured") return CERTIFICATIONS.filter((c) => c.featured);
    if (filter === "soc") return CERTIFICATIONS.filter((c) => c.category === "soc");
    if (filter === "infra") return CERTIFICATIONS.filter((c) => c.category === "infra");
    if (filter === "pentesting") return CERTIFICATIONS.filter((c) => c.category === "pentesting");
    return CERTIFICATIONS;
  }, [filter]);

  const stats = useMemo(() => ({
    total: CERTIFICATIONS.length,
    cisco: CERTIFICATIONS.filter((c) => c.issuer === "Cisco Networking Academy").length,
    netzun: CERTIFICATIONS.filter((c) => c.issuer === "Netzun").length,
  }), []);

  const handleSelectCert = useCallback((cert: Certification, openPdf = false) => {
    setSelectedCert(cert);
    setCopiedId(false);
    setShowPdf(openPdf);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedCert(null);
    setCopiedId(false);
    setShowPdf(false);
  }, []);

  const handleCopyId = useCallback(() => {
    if (selectedCert?.credentialId) {
      copyToClipboard(selectedCert.credentialId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  }, [selectedCert]);

  const renderBadgeCard = useCallback((cert: Certification) => {
    const styles = ISSUER_STYLES[cert.issuer] || ISSUER_STYLES.DEFAULT;
    const catStyle = CATEGORY_LABELS[cert.type] || CATEGORY_LABELS.course;
    const hasPdf = !!cert.pdfUrl;
    const isFeatured = !!cert.featured;

    return (
      <motion.div
        key={cert.id}
        variants={CARD_VARIANTS}
        className={`group relative rounded-xl flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
          isFeatured
            ? "bg-gradient-to-b from-carbon-800/90 to-carbon-800/70 border border-primary-500/40 hover:border-primary-400/60 shadow-lg shadow-primary-950/20 hover:shadow-primary-900/30"
            : "bg-carbon-800/70 border border-carbon-600/80 hover:border-primary-500/40 hover:shadow-lg hover:shadow-primary-950/20"
        }`}
      >
        {isFeatured && (
          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-500/20 border border-primary-500/40 text-primary-300 text-[9px] font-mono uppercase tracking-wider backdrop-blur-sm">
              <StarIcon size={8} />
              Destacado
            </span>
          </div>
        )}

        <div
          onClick={() => handleSelectCert(cert)}
          className="cursor-pointer flex-1 flex flex-col"
        >
          <div className={`relative mx-auto mt-4 overflow-hidden rounded-lg ${
            isFeatured ? "w-36 h-36 sm:w-40 sm:h-40" : "w-32 h-32 sm:w-36 sm:h-36"
          } bg-carbon-900/60 flex items-center justify-center p-2`}>
            <Image
              src={cert.badgeUrl}
              alt={cert.title}
              fill
              sizes="(max-width: 640px) 144px, 160px"
              className={`p-1 transition-transform duration-300 group-hover:scale-105 ${styles.imageClass}`}
            />
          </div>

          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono border uppercase tracking-wider ${styles.badge}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
                  {cert.issuer}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${catStyle.bg} ${catStyle.border} ${catStyle.text}`}>
                  {catStyle.label}
                </span>
              </div>

              <h3 className={`font-bold text-white mb-1 leading-snug group-hover:text-primary-300 transition-colors line-clamp-2 ${
                isFeatured ? "text-sm sm:text-base" : "text-sm"
              }`}>
                {cert.title}
              </h3>

              <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2 mb-2">
                {cert.description}
              </p>
            </div>

            <div>
              {cert.hours && (
                <p className="text-[10px] font-mono text-slate-500 mb-2">
                  {cert.hours}
                </p>
              )}

              <div className="flex flex-wrap gap-1">
                {cert.skills.slice(0, isFeatured ? 5 : 4).map((skill) => (
                  <span key={skill} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-carbon-700/60 border border-carbon-600/60 text-slate-400 hover:bg-carbon-700 hover:text-slate-300 transition-colors">
                    {skill}
                  </span>
                ))}
                {cert.skills.length > (isFeatured ? 5 : 4) && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-carbon-700/60 border border-carbon-600/60 text-slate-500">
                    +{cert.skills.length - (isFeatured ? 5 : 4)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 pb-4 pt-0 mt-auto">
          {hasPdf && (
            <button
              onClick={() => handleSelectCert(cert, true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600/15 border border-amber-500/30 text-amber-300 hover:bg-amber-600/25 hover:border-amber-500/50 transition-all text-[11px] font-mono"
              title="Ver Documento PDF"
            >
              <DocumentIcon size={12} />
              PDF
            </button>
          )}
          <button
            onClick={() => handleSelectCert(cert, false)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-carbon-700/60 border border-carbon-600/60 text-slate-300 hover:border-slate-400 hover:bg-carbon-700 transition-all text-[11px] font-mono ml-auto"
          >
            Detalles
          </button>
        </div>
      </motion.div>
    );
  }, [handleSelectCert]);

  const filterTabs = useMemo(() => [
    { id: "all", label: "Todas", count: stats.total },
    { id: "featured", label: "Destacados", count: CERTIFICATIONS.filter((c) => c.featured).length },
    { id: "cisco", label: "Cisco", count: stats.cisco },
    { id: "netzun", label: "Netzun", count: stats.netzun },
    { id: "soc", label: "SOC", count: CATEGORY_STATS.soc.count },
    { id: "infra", label: "Infra", count: CATEGORY_STATS.infra.count },
    { id: "pentesting", label: "Pentesting", count: CATEGORY_STATS.pentesting.count },
  ], [stats]);

  return (
    <section id="certificaciones" className="max-w-6xl mx-auto px-4 py-12 border-b border-carbon-600/60 w-full relative">
      <div className="mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-xs font-mono text-primary-300 uppercase tracking-widest mb-1">
            Certificaciones & Acreditaciones
          </h2>
          <p className="text-2xl font-bold text-white tracking-tight sm:text-3xl">
            Credenciales Oficiales, Insignias & Diplomas
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-carbon-800 border border-carbon-600 text-slate-300">
            Total: <strong className="text-primary-300">{stats.total}</strong>
          </span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-azure-900/40 border border-azure-700/50 text-azure-300">
            Cisco: <strong className="text-azure-200">{stats.cisco}</strong>
          </span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-amber-950/40 border border-amber-700/50 text-amber-300">
            Netzun: <strong className="text-amber-200">{stats.netzun}</strong>
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
              filter === tab.id
                ? "bg-primary-600/25 border-primary-500 text-white shadow-sm shadow-primary-500/20"
                : "bg-carbon-800/80 border-carbon-600/80 text-slate-400 hover:text-slate-200 hover:border-carbon-500"
            }`}
          >
            {tab.label}
            <span className={`ml-1.5 text-[10px] ${filter === tab.id ? "text-primary-300" : "text-slate-500"}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        initial="hidden"
        animate="visible"
        key={filter}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } }}
      >
        {filteredCerts.map(renderBadgeCard)}
      </motion.div>

      <AnimatePresence>
        {selectedCert && (
          <motion.div
            key="cert-overlay"
            variants={OVERLAY_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon-950/80 backdrop-blur-sm"
            onClick={handleCloseModal}
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              key="cert-modal"
              variants={MODAL_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-xl rounded-2xl border border-carbon-600/80 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] bg-carbon-900"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                ref={scrollRef}
                className="overflow-y-auto overscroll-contain flex-1"
              >
                <div className={`bg-gradient-to-b ${
                  selectedCert.issuer === "Cisco Networking Academy"
                    ? "from-azure-600/20 via-azure-950/30 to-carbon-900"
                    : selectedCert.issuer === "Netzun"
                    ? "from-amber-500/20 via-amber-950/30 to-carbon-900"
                    : "from-carbon-700/20 via-carbon-800/30 to-carbon-900"
                }`}>
                  <div className="flex items-center justify-between p-4 border-b border-carbon-700/40">
                    <h3 className="text-sm font-mono text-primary-300 uppercase tracking-wider">
                      Detalle de Credencial
                    </h3>
                    <button
                      onClick={handleCloseModal}
                      aria-label="Cerrar"
                      className="p-2 rounded-lg bg-carbon-800/80 border border-carbon-600/60 text-slate-400 hover:text-white hover:border-slate-400 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="p-6 pb-4">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border uppercase tracking-widest ${
                        selectedCert.issuer === "Cisco Networking Academy"
                          ? "bg-azure-950 border-azure-600 text-azure-300"
                          : selectedCert.issuer === "Netzun"
                          ? "bg-amber-950 border-amber-600 text-amber-300"
                          : "bg-carbon-800 border-carbon-600 text-slate-300"
                      }`}>
                        {selectedCert.issuer}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        (CATEGORY_LABELS[selectedCert.type] || CATEGORY_LABELS.course).bg
                      } ${(CATEGORY_LABELS[selectedCert.type] || CATEGORY_LABELS.course).border} ${
                        (CATEGORY_LABELS[selectedCert.type] || CATEGORY_LABELS.course).text
                      }`}>
                        {(CATEGORY_LABELS[selectedCert.type] || CATEGORY_LABELS.course).label}
                      </span>
                      {selectedCert.featured && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-primary-500/20 border border-primary-500/40 text-primary-300">
                          <StarIcon size={8} />
                          Destacado
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {selectedCert.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-400">
                      Fecha: {selectedCert.date}
                      {selectedCert.hours && <span className="ml-2 text-slate-500">· {selectedCert.hours}</span>}
                    </p>
                  </div>
                </div>

                <div className="bg-carbon-900 p-6">
                  <div className="flex justify-center mb-6 p-4 bg-carbon-950 rounded-xl border border-carbon-800">
                    <div className={`relative ${selectedCert.issuer === "Cisco Networking Academy" ? "w-44 h-44 sm:w-52 sm:h-52" : "w-full h-56 sm:h-64"}`}>
                      <Image
                        src={selectedCert.badgeUrl}
                        alt={selectedCert.title}
                        fill
                        className={`p-1 ${selectedCert.issuer === "Cisco Networking Academy" ? "object-contain drop-shadow-[0_0_15px_rgba(14,165,233,0.3)]" : "object-contain rounded-md"}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-4 text-sm text-slate-300">
                    <div>
                      <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Descripción</h4>
                      <p className="leading-relaxed bg-carbon-800/60 p-3 rounded-lg border border-carbon-700/60 text-xs sm:text-sm">
                        {selectedCert.description}
                      </p>
                    </div>

                    {selectedCert.credentialId && (
                      <div>
                        <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <BadgeCheckIcon size={12} className="text-primary-400" />
                          Código de Credencial / Verificación
                        </h4>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 font-mono text-xs text-primary-300 bg-carbon-950 p-2.5 rounded border border-carbon-800 select-all overflow-x-auto">
                            {selectedCert.credentialId}
                          </code>
                          <button
                            onClick={handleCopyId}
                            className="shrink-0 px-2.5 py-2 rounded-lg bg-carbon-800 border border-carbon-600 text-slate-400 hover:text-primary-300 hover:border-primary-500/50 transition-all text-[10px] font-mono"
                            title="Copiar código"
                          >
                            {copiedId ? "Copiado" : "Copiar"}
                          </button>
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                        Competencias & Temas Acreditados
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCert.skills.map((skill) => (
                          <span key={skill} className="text-xs font-mono px-2.5 py-1 rounded bg-carbon-800 border border-carbon-600 text-slate-200 hover:bg-carbon-700 hover:border-carbon-500 transition-colors">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {selectedCert.pdfUrl && (
                      <div className="pt-2">
                        <div className="flex items-center gap-2 mb-2">
                          <button
                            onClick={() => setShowPdf((v) => !v)}
                            className="flex-1 flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-primary-600/10 border border-primary-500/30 hover:bg-primary-600/20 hover:border-primary-500/50 transition-all group"
                          >
                            <div className="flex items-center gap-3">
                              <DocumentIcon size={16} className="text-primary-400" />
                              <div className="text-left">
                                <p className="text-sm font-mono text-primary-200 group-hover:text-primary-100 transition-colors">
                                  Documento PDF Oficial
                                </p>
                                <p className="text-[10px] font-mono text-slate-400">
                                  {showPdf ? "Ocultar visor" : "Haz clic para desplegar documento"}
                                </p>
                              </div>
                            </div>
                            <svg
                              className={`w-5 h-5 text-primary-400 transition-transform duration-300 ${showPdf ? "rotate-180" : ""}`}
                              fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>

                          <a
                            href={selectedCert.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-3 rounded-xl bg-carbon-800 border border-carbon-600 text-slate-300 hover:text-white hover:border-slate-400 transition-colors text-xs font-mono"
                            title="Abrir PDF en pestaña nueva"
                          >
                            ↗
                          </a>
                        </div>

                        <motion.div
                          initial={false}
                          animate={{ height: showPdf ? "auto" : 0, opacity: showPdf ? 1 : 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 rounded-xl border border-carbon-600/80 bg-carbon-950 overflow-hidden">
                            <iframe
                              src={selectedCert.pdfUrl}
                              className="w-full h-[50vh] min-h-[300px]"
                              title="PDF del certificado"
                            />
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 p-4 border-t border-carbon-700/60 bg-carbon-900 sticky bottom-0">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 rounded-lg bg-carbon-700/80 border border-carbon-500/60 text-slate-200 hover:border-slate-400 transition-all text-xs font-mono"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
