"use client";
import { useState, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import { CERTIFICATIONS, Certification } from "@/data/certs";
import { DocumentIcon, BadgeCheckIcon } from "@/components/icons";
import { useLenis } from "@studio-freight/react-lenis";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORY_LABELS: Record<Certification["type"], { label: string; bg: string; border: string; text: string }> = {
  career_path: { label: "Ruta Completa", bg: "bg-primary-500/10", border: "border-primary-500/30", text: "text-primary-300" },
  specialization: { label: "Especialización", bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-300" },
  course: { label: "Curso", bg: "bg-carbon-700/60", border: "border-carbon-600/60", text: "text-slate-400" },
  certification: { label: "Certificación", bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-300" },
};

const ISSUER_STYLES: Record<string, { badge: string; dot: string; imageClass: string; gradient: string }> = {
  "Cisco Networking Academy": {
    badge: "bg-azure-950/60 border-azure-600/50 text-azure-300",
    dot: "bg-azure-400 animate-pulse",
    imageClass: "object-contain",
    gradient: "from-azure-600/20 via-azure-950/30 to-carbon-900",
  },
  Netzun: {
    badge: "bg-amber-950/60 border-amber-600/50 text-amber-300",
    dot: "bg-amber-400",
    imageClass: "object-contain rounded-md",
    gradient: "from-amber-500/20 via-amber-950/30 to-carbon-900",
  },
  Internacionales: {
    badge: "bg-purple-950/60 border-purple-600/50 text-purple-300",
    dot: "bg-purple-400",
    imageClass: "object-contain rounded-md",
    gradient: "from-purple-500/20 via-purple-950/30 to-carbon-900",
  },
  DEFAULT: {
    badge: "bg-carbon-800/80 border-carbon-600/60 text-slate-300",
    dot: "bg-primary-400",
    imageClass: "object-contain rounded-md",
    gradient: "from-carbon-700/20 via-carbon-800/30 to-carbon-900",
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
  const lenis = useLenis();

  const handleCloseModal = useCallback(() => {
    setSelectedCert(null);
    setCopiedId(false);
    setShowPdf(false);
  }, []);

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
      if (e.key === "Escape") handleCloseModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleCloseModal]);

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

  const handleCopyId = useCallback(() => {
    if (selectedCert?.credentialId) {
      copyToClipboard(selectedCert.credentialId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  }, [selectedCert]);

  const filterTabs = useMemo(() => [
    { id: "all", label: "Todas", count: stats.total },
    { id: "featured", label: "Destacadas", count: CERTIFICATIONS.filter((c) => c.featured).length },
    { id: "cisco", label: "Cisco", count: stats.cisco },
    { id: "netzun", label: "Netzun", count: stats.netzun },
  ], [stats]);

  const modalIssuerStyle = selectedCert
    ? ISSUER_STYLES[selectedCert.issuer] || ISSUER_STYLES.DEFAULT
    : ISSUER_STYLES.DEFAULT;

  return (
    <section id="certificaciones" className="relative mx-auto max-w-6xl px-4 py-16 border-b border-carbon-600/60">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-cyber opacity-25" />

      {/* Encabezado Principal */}
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-10 bg-gradient-to-r from-transparent via-accent/50 to-accent/50" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Acreditaciones
          </span>
          <div className="h-px w-10 bg-gradient-to-r from-accent/50 to-accent/50 via-transparent" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Certificaciones & <span className="text-gradient-gold">Credenciales</span>
        </h2>
        <p className="mt-3 text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
          Logros académicos, certificados oficiales e insignias emitidas por entidades reconocidas.
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="text-center">
            <p className="text-2xl font-bold font-mono text-primary-300">{stats.total}</p>
            <p className="text-[10px] font-mono uppercase tracking-wider text-carbon-400 mt-1">Total</p>
          </div>
          <div className="h-8 w-px bg-carbon-600" />
          <div className="text-center">
            <p className="text-2xl font-bold font-mono text-azure-300">{stats.cisco}</p>
            <p className="text-[10px] font-mono uppercase tracking-wider text-carbon-400 mt-1">Cisco</p>
          </div>
          <div className="h-8 w-px bg-carbon-600" />
          <div className="text-center">
            <p className="text-2xl font-bold font-mono text-amber-300">{stats.netzun}</p>
            <p className="text-[10px] font-mono uppercase tracking-wider text-carbon-400 mt-1">Netzun</p>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
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

      {/* Grid de Certificaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCerts.map((cert, index) => {
          const cfg = ISSUER_STYLES[cert.issuer] || ISSUER_STYLES.DEFAULT;
          const catStyle = CATEGORY_LABELS[cert.type] || CATEGORY_LABELS.course;

          return (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              onClick={() => handleSelectCert(cert, false)}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelectCert(cert, false);
                }
              }}
              role="button"
              tabIndex={0}
              className="group cursor-pointer rounded-2xl border border-carbon-600/80 bg-carbon-800/70 p-5 backdrop-blur-xl transition-all duration-300 hover:border-primary-500/50 hover:shadow-[0_0_30px_rgba(15,118,110,0.12)] hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider border ${cfg.badge}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                    {cert.issuer}
                  </span>
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${catStyle.bg} ${catStyle.border} ${catStyle.text}`}>
                    {catStyle.label}
                  </span>
                </div>

                <div className="relative mx-auto my-3 w-32 h-32 flex items-center justify-center p-1">
                  <Image
                    src={cert.badgeUrl}
                    alt={cert.title}
                    fill
                    sizes="128px"
                    className={`p-1 transition-transform duration-300 group-hover:scale-105 ${cfg.imageClass}`}
                  />
                </div>

                <h3 className="text-base font-bold mb-2 text-white group-hover:text-primary-300 transition-colors line-clamp-2">
                  {cert.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-3 line-clamp-2">
                  {cert.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {(cert.skills || []).slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-carbon-700/60 border border-carbon-600/40 text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                  {(cert.skills || []).length > 3 && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-carbon-700/60 border border-carbon-600/40 text-slate-500">
                      +{(cert.skills || []).length - 3}
                    </span>
                  )}
                </div>

                <div className="pt-2.5 border-t border-carbon-700/60 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-primary-400 flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    Ver credencial →
                  </span>
                  {cert.pdfUrl && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectCert(cert, true);
                      }}
                      className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition-colors cursor-pointer"
                    >
                      PDF
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal de Detalle / PDF */}
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
              className="relative w-full max-w-2xl rounded-2xl border border-carbon-600/80 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] bg-carbon-900"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`p-4 sm:p-5 border-b border-carbon-700/60 shrink-0 text-center bg-gradient-to-b ${modalIssuerStyle.gradient}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-mono text-primary-300 uppercase tracking-wider">
                    {showPdf ? "Documento PDF Oficial" : "Detalle de Credencial"}
                  </h3>
                  <button
                    onClick={handleCloseModal}
                    aria-label="Cerrar"
                    className="p-1.5 rounded-lg bg-carbon-800/80 border border-carbon-600/60 text-slate-400 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border uppercase tracking-widest ${modalIssuerStyle.badge}`}>
                    {selectedCert.issuer}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    (CATEGORY_LABELS[selectedCert.type] || CATEGORY_LABELS.course).bg
                  } ${(CATEGORY_LABELS[selectedCert.type] || CATEGORY_LABELS.course).border} ${
                    (CATEGORY_LABELS[selectedCert.type] || CATEGORY_LABELS.course).text
                  }`}>
                    {(CATEGORY_LABELS[selectedCert.type] || CATEGORY_LABELS.course).label}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                  {selectedCert.title}
                </h3>
                <p className="text-xs font-mono text-slate-400">
                  Fecha: {selectedCert.date}
                  {selectedCert.hours && <span className="ml-2 text-slate-500">· {selectedCert.hours}</span>}
                </p>
              </div>

              <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1 bg-carbon-900">
                {showPdf && selectedCert.pdfUrl ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <button
                        onClick={() => setShowPdf(false)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-carbon-800 border border-carbon-600 text-slate-300 hover:text-white hover:border-slate-400 transition-colors text-xs font-mono"
                      >
                        ← Volver a Detalles
                      </button>
                      <a
                        href={selectedCert.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-600/20 border border-primary-500/40 text-primary-300 hover:bg-primary-600/30 transition-colors text-xs font-mono"
                      >
                        Abrir en Pestaña Nueva ↗
                      </a>
                    </div>

                    <div className="rounded-xl border border-carbon-600/80 bg-carbon-950 overflow-hidden">
                      <iframe
                        src={selectedCert.pdfUrl}
                        className="w-full h-[60vh] min-h-[350px]"
                        title="PDF del certificado"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-center p-4 bg-carbon-950 rounded-xl border border-carbon-800">
                      <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
                        <Image
                          src={selectedCert.badgeUrl}
                          alt={selectedCert.title}
                          fill
                          className={`p-1 object-contain ${
                            selectedCert.issuer === "Cisco Networking Academy"
                              ? "drop-shadow-[0_0_20px_rgba(14,165,233,0.35)]"
                              : "rounded-md"
                          }`}
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
                          {(selectedCert.skills || []).map((skill) => (
                            <span key={skill} className="text-xs font-mono px-2.5 py-1 rounded bg-carbon-800 border border-carbon-600 text-slate-200 hover:bg-carbon-700 hover:border-carbon-500 transition-colors">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {selectedCert.pdfUrl && (
                        <div className="pt-2">
                          <button
                            onClick={() => setShowPdf(true)}
                            className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-amber-600/15 border border-amber-500/30 hover:bg-amber-600/25 hover:border-amber-500/50 transition-all group"
                          >
                            <div className="flex items-center gap-3">
                              <DocumentIcon size={16} className="text-amber-400" />
                              <div className="text-left">
                                <p className="text-sm font-mono text-amber-200 group-hover:text-amber-100 transition-colors">
                                  Ver Documento PDF Oficial
                                </p>
                                <p className="text-[10px] font-mono text-slate-400">
                                  Haz clic para abrir el certificado en pantalla completa
                                </p>
                              </div>
                            </div>
                            <span className="text-xs font-mono text-amber-400 group-hover:translate-x-0.5 transition-transform">
                              Ver →
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center justify-between gap-3 p-4 border-t border-carbon-700/60 bg-carbon-900 shrink-0">
                {selectedCert.pdfUrl && !showPdf ? (
                  <button
                    onClick={() => setShowPdf(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-600/15 border border-amber-500/30 text-amber-300 hover:bg-amber-600/25 transition-all text-xs font-mono"
                  >
                    <DocumentIcon size={12} />
                    Ver PDF
                  </button>
                ) : (
                  <div />
                )}
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-lg bg-carbon-700/80 border border-carbon-500/60 text-slate-200 hover:border-slate-400 transition-all text-xs font-mono"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
