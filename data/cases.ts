export interface CaseStudy {
  id: string;
  title: string;
  category: "web" | "infra" | "soc";
  image: string;
  summary: string;
  problem: string;
  solution: string;
  tools: string[];
  metrics: string;
  lab?: boolean;
  pdfUrl?: string;
  pdfTitle?: string;
}

export const USER_INFO = {
  name: "Ronaldiño Joanlu Espinoza Rosario",
  role: "Desarrollador Full Stack Junior · SOC Analyst L1",
  status: "Disponible para trabajar",
  github: "https://github.com/rjespinozaro-cloud",
  linkedin: "https://www.linkedin.com/in/ronaldiño-espinoza-rosario-4151a6307/",
  email: "respinozarosario5@gmail.com",
  cvPdfEn: "/CV_Joanlu_Espinoza_EN.pdf",
  cvPdfEs: "/CV_Ronaldino_Espinoza_ES.pdf",
  portfolio: "https://cyber-portfolio-backend.onrender.com/index.html",
  phone: "+51 969 359 792",
  profileImage: "/perfil.jpeg",
  education: "Ingeniería de Sistemas e Informática — UNSM (8vo ciclo)",
  certifications: [
    "Cisco Junior Cybersecurity Analyst — Full Path Completed",
    "Especialización en Ciberseguridad — Netzun",
  ],
  languages: [
    { name: "Español", level: "Nativo" },
    { name: "Inglés", level: "B1" },
  ],
  summary:
    "Estudiante de Ingeniería de Sistemas (8vo ciclo) con perfil dual en ciberseguridad defensiva y desarrollo full-stack. Opera un SOC funcional propio sobre Wazuh con reglas MITRE ATT&CK, monitoreo FIM, gestión de vulnerabilidades y respuesta automatizada. Como desarrollador, crea aplicaciones full-stack con Spring Boot, MariaDB y JWT/BCrypt, incluyendo su propio portfolio con dashboard SIEM en vivo y asistente de IA conversacional.",
};

export const SKILLS = [
  {
    category: "SIEM & Detección",
    items: [
      "Wazuh (Manager/Indexer/Dashboard)",
      "Zabbix",
      "Reglas MITRE ATT&CK",
      "FIM",
      "Active Response",
      "OpenSearch",
    ],
  },
  {
    category: "Hardening & Redes",
    items: [
      "UFW / nftables / arptables",
      "Zero Trust (deny-by-default)",
      "VLANs (802.1Q)",
      "DNSSEC / dig",
      "ARP Spoofing Mitigation",
      "Scapy",
      "tcpdump / tshark / Wireshark",
    ],
  },
  {
    category: "Pentesting",
    items: ["Nmap", "Metasploit", "Burp Suite Pro", "BloodHound", "Impacket"],
  },
  {
    category: "Full-Stack Dev",
    items: [
      "Spring Boot",
      "Next.js",
      "TypeScript",
      "JWT / BCrypt",
      "MariaDB / PostgreSQL",
      "APIs de IA / LLM",
    ],
  },
  {
    category: "Sistemas & Ops",
    items: [
      "BlackArch / Parrot OS / Kali",
      "Docker / Docker Compose",
      "Git / GitHub",
      "Windows Server",
    ],
  },
  {
    category: "Análisis de Tráfico",
    items: [
      "Wireshark / tshark",
      "Filtrado L3/L4/L7",
      "Detección SYN Scan",
      "Packet Crafting (Scapy)",
    ],
  },
  {
    category: "Idiomas",
    items: ["Español Nativo", "Inglés B1"],
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "soc-wazuh-deployment",
    title: "Implementación de SOC con Wazuh & Zabbix",
    category: "soc",
    lab: true,
    pdfUrl: "/labs/lab-soc-wazuh.pdf",
    pdfTitle: "Fase 2 — Despliegue de SIEM con Wazuh",
    image: "/cases/soc-dashboard.jpg",
    summary:
      "Despliegue completo de una arquitectura SIEM open-source en laboratorio personal: Manager, Indexer y Dashboard con Docker Compose.",
    problem:
      "Necesidad de un entorno de monitoreo de seguridad centralizado con detección de amenazas, integridad de archivos y respuesta automatizada.",
    solution:
      "Implementación de Wazuh (Manager + Indexer + Dashboard) vía Docker Compose con agentes integrados (FIM, syscollector, rootcheck). Desarrollo de reglas personalizadas mapeadas a MITRE ATT&CK con encadenamiento (if_sid) para reducir fatiga de alertas. Configuración de Active Response para bloqueo automatizado de IPs por firewall.",
    tools: [
      "Wazuh",
      "Docker",
      "MITRE ATT&CK",
      "FIM",
      "Zabbix",
      "OpenSearch",
    ],
    metrics: "Monitoreo continuo 24/7 con detección y respuesta automatizada",
  },
  {
    id: "network-hardening",
    title: "Hardening de Infraestructura de Red",
    category: "infra",
    lab: true,
    pdfUrl: "/labs/lab-network-hardening.pdf",
    pdfTitle: "Semana 1 — Hardening de Redes y Segmentación VLAN",
    image: "/cases/network-hardening.jpg",
    summary:
      "Endurecimiento completo de red con enfoque Zero Trust: firewalls deny-by-default, mitigación de ARP Spoofing y segmentación VLAN.",
    problem:
      "Red doméstica/laboratorio sin segmentación, políticas de firewall permisivas y vulnerabilidad a ataques ARP Spoofing.",
    solution:
      "Configuración de firewalls UFW/nftables con política deny-by-default, mitigación de SSH brute-force vía rate-limiting y modo invisible (DROP vs REJECT) contra escaneo ICMP. Mitigación de ARP Spoofing con entradas ARP estáticas + monitoreo pasivo IP↔MAC (arpwatch, arping). Segmentación con VLANs 802.1Q y subnetting.",
    tools: [
      "UFW",
      "nftables",
      "tcpdump",
      "Scapy",
      "VLAN/802.1Q",
      "DNSSEC",
      "arpwatch",
    ],
    metrics:
      "Reducción completa de superficie de ataque en capas 2-7 del modelo OSI",
  },
  {
    id: "soc-alert-triage",
    title: "Triage de Alertas SOC — LetsDefend & TryHackMe",
    category: "soc",
    lab: true,
    pdfUrl: "/labs/lab-alert-triage.pdf",
    pdfTitle: "Semana 2 — Triage de Alertas y Respuesta a Incidentes",
    image: "/cases/alert-triage.jpg",
    summary:
      "Simulación de entorno SOC real con clasificación de alertas y documentación de IOCs siguiendo el ciclo de vida NIST SP 800-61.",
    problem:
      "Falta de experiencia práctica en triage de incidentes de seguridad en un entorno SOC real.",
    solution:
      "Clasificación de alertas de severidad Alta/Media/Baja: ataques web (SQLi, XSS), malware, brute force y phishing. Documentación de IOCs y veredictos (TP/FP) según el ciclo de vida de respuesta a incidentes NIST SP 800-61. Descomposición de payloads multi-etapa (ej: SQL Injection + RCE) y gestión de casos con escalamiento estructurado.",
    tools: ["SIEM", "Wireshark", "NIST SP 800-61", "TryHackMe", "LetsDefend"],
    metrics: "Experiencia práctica en más de 50 alertas clasificadas y documentadas",
  },
  {
    id: "fullstack-portfolio-siem",
    title: "Portfolio Full-Stack con SIEM Integrado",
    category: "web",
    image: "/cases/portfolio-siem.jpg",
    summary:
      "Desarrollo y despliegue de un dashboard de seguridad con monitoreo de peticiones y visualización de alertas en tiempo real.",
    problem:
      "Necesidad de un portfolio interactivo que demuestre habilidades duales en ciberseguridad y desarrollo full-stack.",
    solution:
      "Desarrollo de dashboard de seguridad con monitoreo de peticiones y visualización de alertas en tiempo real (stream de logs SIEM en vivo). Implementación de autenticación segura (JWT + BCrypt) y sistema de logging para detectar y analizar amenazas web. Integración de asistente de IA conversacional como auditor técnico del portfolio (backend Spring Boot + consumo de API LLM).",
    tools: ["Spring Boot", "MariaDB", "JavaScript", "JWT/BCrypt", "API IA"],
    metrics: "Portfolio desplegado con dashboard SIEM en vivo y asistente IA integrado",
  },
  {
    id: "cloud-secure-auth",
    title: "Implementación de Autenticación Segura",
    category: "web",
    image: "/cases/secure-auth.jpg",
    summary:
      "Despliegue de sistema de autenticación robusto con JWT, BCrypt y protección contra ataques de fuerza bruta.",
    problem:
      "Aplicaciones web sin medidas de seguridad adecuadas en autenticación, expuestas a ataques de fuerza bruta y token manipulation.",
    solution:
      "Implementación de autenticación stateless con JWT + BCrypt para hash de contraseñas. Configuración de rate-limiting por IP, expiración de tokens y rotación de refresh tokens. Protección contra ataques de timing y enumeración de usuarios mediante respuestas genéricas.",
    tools: ["JWT", "BCrypt", "Spring Boot", "Next.js", "Docker"],
    metrics: "Sistema de autenticación seguro implementado en múltiples proyectos",
  },
  {
    id: "vulnerability-management",
    title: "Gestión de Vulnerabilidades con Wazuh",
    category: "soc",
    lab: true,
    pdfUrl: "/labs/lab-vuln-management.pdf",
    pdfTitle: "Fase 1 — Escaneo y Gestión de Vulnerabilidades CVE",
    image: "/cases/vuln-management.jpg",
    summary:
      "Configuración del módulo de detección de vulnerabilidades (CVE) de Wazuh para escaneo y reporte continuo.",
    problem:
      "Necesidad de identificar y priorizar vulnerabilidades en endpoints monitoreados sin herramientas comerciales costosas.",
    solution:
      "Configuración del módulo de detección de vulnerabilidades de Wazuh (CVE) para escaneo continuo de agentes. Integración con el dashboard para visualización de vulnerabilidades por severidad. Priorización basada en explotabilidad y parches disponibles.",
    tools: ["Wazuh", "Docker", "CVE", "OpenSearch", "Linux"],
    metrics: "Detección y priorización automatizada de vulnerabilidades CVE",
  },
];