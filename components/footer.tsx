"use client";
import { USER_INFO } from "@/data/cases";
import { CvDropdown } from "@/components/cv-dropdown";
import { EnvelopeIcon, PhoneIcon } from "@/components/icons";

const EXTERNAL_LINKS = [
  { label: "GitHub", href: USER_INFO.github },
  { label: "LinkedIn", href: USER_INFO.linkedin },
];

export const Footer = () => {
  return (
    <footer className="border-t border-carbon-600/60 bg-carbon-900 ambient-footer">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
        {/* Main grid: 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-mono font-bold text-white text-sm mb-3">
              {USER_INFO.name}
            </h3>
            <p className="font-mono text-xs text-primary-300 mb-3">
              {USER_INFO.role}
            </p>
            <p className="font-mono text-xs text-slate-300 leading-relaxed">
              {USER_INFO.summary}
            </p>
          </div>

{/* Column 2: Contact & Links */}

            <div>
            <h3 className="font-mono font-bold text-white text-sm mb-3">
              Contacto
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${USER_INFO.email}`}
                  className="font-mono text-xs text-slate-300 hover:text-primary-400 transition-colors flex items-center gap-2"
                >
                  <EnvelopeIcon size={14} className="text-slate-500" /> {USER_INFO.email}
                </a>
              </li>
              <li>
                <span className="font-mono text-xs text-slate-300 flex items-center gap-2">
                  <PhoneIcon size={14} className="text-slate-500" /> {USER_INFO.phone}
                </span>
              </li>
              {EXTERNAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-slate-300 hover:text-primary-400 transition-colors flex items-center gap-2"
                  >
                    ↗ {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Certifications & Education */}

          <div>
            <h3 className="font-mono font-bold text-white text-sm mb-3">
              Certificaciones
            </h3>
            <ul className="space-y-2 mb-4">
              {USER_INFO.certifications.map((cert) => (
                <li key={cert} className="font-mono text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-primary-400 mt-0.5">▸</span>
                  {cert}
                </li>
              ))}
            </ul>
            <h3 className="font-mono font-bold text-white text-sm mb-3 mt-4">
              Educación
            </h3>
            <p className="font-mono text-xs text-slate-300 flex items-start gap-2">
              <span className="text-primary-400 mt-0.5">▸</span>
              {USER_INFO.education}
            </p>
          </div>
        </div>

        <div className="border-t border-carbon-600/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-slate-400">
            © {new Date().getFullYear()} {USER_INFO.name}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <CvDropdown direction="up" label="Descargar CV" />
            <span className="font-mono text-[10px] text-slate-400">
              Disponible para trabajar · Remoto
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
