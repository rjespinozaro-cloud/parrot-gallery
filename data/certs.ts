export interface Certification {
  id: string;
  title: string;
  issuer: "Cisco Networking Academy" | "Netzun";
  type: "career_path" | "specialization" | "course";
  category: "soc" | "infra" | "pentesting" | "general";
  date: string;
  credentialId?: string;
  pdfUrl?: string;
  badgeUrl: string;
  hours?: string;
  description: string;
  skills: string[];
  featured?: boolean;
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: "cisco-junior-cybersecurity-analyst",
    title: "Junior Cybersecurity Analyst Career Path",
    issuer: "Cisco Networking Academy",
    type: "career_path",
    category: "soc",
    date: "Junio 2026",
    pdfUrl: "/certs/cisco/junior-cybersecurity-analyst-path.pdf",
    badgeUrl: "/certs/cisco/junior-cybersecurity-analyst-path.png",
    description:
      "Ruta profesional oficial completa de Cisco que valida competencias esenciales en análisis de seguridad en SOC, redes defensivas, monitoreo de amenazas y hardening de dispositivos.",
    skills: [
      "SOC Analysis",
      "Network Defense",
      "Cyber Threat Management",
      "Endpoint Security",
      "Incident Response",
    ],
    featured: true,
  },
  {
    id: "netzun-especializacion-ciberseguridad",
    title: "Especialización en Ciberseguridad",
    issuer: "Netzun",
    type: "specialization",
    category: "soc",
    date: "28 de Mayo, 2026",
    credentialId: "7BA89A79",
    pdfUrl: "/certs/netzun/especializacion-ciberseguridad.pdf",
    badgeUrl: "/certs/netzun/especializacion-ciberseguridad.png",
    hours: "14 horas de especialización",
    description:
      "Programa intensivo de especialización en ciberseguridad defensiva, gestión de vulnerabilidades, marcos internacionales de seguridad (ISO 27001/NIST) e investigación de malware.",
    skills: [
      "Ethical Hacking",
      "Normas ISO 27001 / NIST",
      "Zero Trust",
      "Malware Analysis",
      "Seguridad en Redes",
    ],
    featured: true,
  },
  {
    id: "cisco-intro-cybersecurity",
    title: "Introducción a Ciberseguridad",
    issuer: "Cisco Networking Academy",
    type: "course",
    category: "soc",
    date: "29 de Mayo, 2026",
    credentialId: "bd5f7626-df42-4118-a8a3-1cdd9184a829",
    pdfUrl: "/certs/cisco/introduction-to-cybersecurity.pdf",
    badgeUrl: "/certs/cisco/introduction-to-cybersecurity.png",
    description:
      "Fundamentos de ciberseguridad, privacidad de datos, confidencialidad, integridad, disponibilidad (Tríada CIA) e impacto de las amenazas cibernéticas.",
    skills: ["CIA Triad", "Privacidad de Datos", "Ingeniería Social", "Defensa de Activos"],
  },
  {
    id: "cisco-networking-basics",
    title: "Conceptos Básicos de Redes (Networking Basics)",
    issuer: "Cisco Networking Academy",
    type: "course",
    category: "infra",
    date: "31 de Mayo, 2026",
    credentialId: "3da5c9a9-93df-4f2a-96b4-dc304a27add4",
    pdfUrl: "/certs/cisco/networking-basics.pdf",
    badgeUrl: "/certs/cisco/networking-basics.png",
    description:
      "Principios de comunicación de red, modelos OSI y TCP/IP, direccionamiento IPv4/IPv6, subredes y análisis de tráfico.",
    skills: ["Modelo OSI & TCP/IP", "IPv4 / IPv6 Subnetting", "Protocolos L3/L4", "Wireshark"],
  },
  {
    id: "cisco-networking-devices",
    title: "Dispositivos de Red y Configuración Inicial",
    issuer: "Cisco Networking Academy",
    type: "course",
    category: "infra",
    date: "02 de Junio, 2026",
    credentialId: "67c461e3-92cb-4396-864f-a8aa956ca987",
    pdfUrl: "/certs/cisco/networking-devices-and-initial-configuration.pdf",
    badgeUrl: "/certs/cisco/networking-devices-and-initial-configuration.png",
    description:
      "Configuración física y lógica de switches y routers Cisco, Cisco IOS CLI, VLANs 802.1Q, SSH y hardening inicial de equipos.",
    skills: ["Cisco IOS CLI", "Switch & Router Hardening", "VLANs 802.1Q", "SSH & AAA"],
  },
  {
    id: "cisco-endpoint-security",
    title: "Endpoint Security",
    issuer: "Cisco Networking Academy",
    type: "course",
    category: "soc",
    date: "Mayo 2026",
    pdfUrl: "/certs/cisco/endpoint-security.pdf",
    badgeUrl: "/certs/cisco/endpoint-security.png",
    description:
      "Protección de sistemas finales, antimalware, control de acceso a archivos (FIM), parches del sistema operativo y auditoría de eventos.",
    skills: ["Host-based Security", "FIM", "Antimalware", "Patch Management"],
  },
  {
    id: "cisco-network-defense",
    title: "Network Defense",
    issuer: "Cisco Networking Academy",
    type: "course",
    category: "infra",
    date: "Mayo 2026",
    pdfUrl: "/certs/cisco/network-defense.pdf",
    badgeUrl: "/certs/cisco/network-defense.png",
    description:
      "Supervisión de tráfico de red, detección de intrusiones con NIDS/NIPS, firewalls con estado y control de accesos perimetrales.",
    skills: ["Firewalls", "IDS / IPS", "Detección de Intrusiones", "Zero Trust"],
  },
  {
    id: "cisco-cyber-threat-management",
    title: "Cyber Threat Management",
    issuer: "Cisco Networking Academy",
    type: "course",
    category: "soc",
    date: "Mayo 2026",
    pdfUrl: "/certs/cisco/cyber-threat-management.pdf",
    badgeUrl: "/certs/cisco/cyber-threat-management.png",
    description:
      "Gestión y respuesta a amenazas cibernéticas, clasificación de incidentes, análisis forense inicial e inteligencia de amenazas cibernéticas.",
    skills: ["Incident Handling", "Threat Intelligence", "MITRE ATT&CK", "Forensics"],
  },
  {
    id: "netzun-ethical-hacker-fundamentals",
    title: "Cybersecurity Ethical Hacker Fundamentals",
    issuer: "Netzun",
    type: "course",
    category: "pentesting",
    date: "27 de Mayo, 2026",
    credentialId: "AB9EAC49",
    pdfUrl: "/certs/netzun/ethical-hacker-fundamentals.pdf",
    badgeUrl: "/certs/netzun/ethical-hacker-fundamentals.png",
    hours: "1 hr 10 min",
    description:
      "Metodología de pruebas de penetración, fases del hacking ético (reconocimiento, escaneo de puertos, explotación y reporte).",
    skills: ["Pentesting", "Reconocimiento con Nmap", "Análisis de Vulnerabilidades", "Explotación"],
  },
  {
    id: "netzun-estandares-normas",
    title: "Ciberseguridad: Estándares y Normas Internacionales",
    issuer: "Netzun",
    type: "course",
    category: "soc",
    date: "28 de Mayo, 2026",
    credentialId: "270BB5D4",
    pdfUrl: "/certs/netzun/estandares-normas-internacionales.pdf",
    badgeUrl: "/certs/netzun/estandares-normas-internacionales.png",
    hours: "1 hr 7 min",
    description:
      "Marcos de gobierno de ciberseguridad, familia ISO/IEC 27001, NIST Cybersecurity Framework y normas en sector financiero.",
    skills: ["ISO/IEC 27001", "NIST CSF", "Cumplimiento Normativo", "Gestión de Riesgos"],
  },
  {
    id: "netzun-cybersecurity-fundamentals",
    title: "Cybersecurity Fundamentals",
    issuer: "Netzun",
    type: "course",
    category: "soc",
    date: "20 de Mayo, 2026",
    credentialId: "10B25FB1",
    pdfUrl: "/certs/netzun/cybersecurity-fundamentals.pdf",
    badgeUrl: "/certs/netzun/cybersecurity-fundamentals.png",
    hours: "1 hr 27 min",
    description:
      "Fundamentos teóricos y prácticos de ciberseguridad defensiva, cifrado de datos y hardening de cuentas de usuario.",
    skills: ["Criptografía", "Control de Acceso", "Seguridad Defensiva", "Hardening"],
  },
  {
    id: "netzun-zero-trust",
    title: "Zero Trust Architecture",
    issuer: "Netzun",
    type: "course",
    category: "infra",
    date: "22 de Mayo, 2026",
    credentialId: "E30EDBCD",
    pdfUrl: "/certs/netzun/zero-trust.pdf",
    badgeUrl: "/certs/netzun/zero-trust.png",
    hours: "1 hr 12 min",
    description:
      "Modelo de seguridad Never Trust, Always Verify: microsegmentación de red, autenticación continua e identidad digital.",
    skills: ["Zero Trust Architecture", "Microsegmentación", "MFA", "Verificación Continua"],
  },
  {
    id: "netzun-software-malicioso",
    title: "Software Maliciosos: Tipos y Prevención",
    issuer: "Netzun",
    type: "course",
    category: "soc",
    date: "27 de Mayo, 2026",
    credentialId: "81F2F184",
    pdfUrl: "/certs/netzun/software-malicioso.pdf",
    badgeUrl: "/certs/netzun/software-malicioso.png",
    hours: "1 hr 22 min",
    description:
      "Análisis de familias de malware (Ransomware, Trojans, Rootkits, Spyware), técnicas de persistencia y métodos de prevención.",
    skills: ["Análisis de Malware", "Ransomware Mitigation", "Rootkits", "Prevención Defensiva"],
  },
];
