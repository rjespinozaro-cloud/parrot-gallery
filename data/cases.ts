export interface CaseStudy {
  id: string;
  title: string;
  category: "web" | "red" | "movil";
  image: string;
  cvss: number;
  summary: string;
  problem: string;
  solution: string;
  mitreId: string;
  tools: string[];
  metrics: string;
}

export const USER_INFO = {
  name: "Joan Lu",
  role: "Cybersecurity Analyst & Full-Stack Developer",
  status: "Disponible para trabajar",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  email: "contacto@joanlu.dev",
  cvPdf: "/cv-joanlu.pdf",
};

export const SKILLS = [
  {
    category: "Ciberseguridad",
    items: ["Burp Suite Pro", "Metasploit", "Nmap", "Active Directory", "OWASP Top 10", "Wireshark"]
  },
  {
    category: "Full-Stack Dev",
    items: ["Next.js 14", "TypeScript", "Tailwind CSS", "Node.js", "Python", "PostgreSQL"]
  },
  {
    category: "Herramientas & Ops",
    items: ["Git / GitHub", "Docker", "Linux (Kali / Arch)", "MITRE ATT&CK", "CI/CD Pipelines"]
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "e-commerce-vuln",
    title: "Auditoría Web & IDOR Masivo",
    category: "web",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
    cvss: 8.8,
    summary: "Exposición de datos PII en API GraphQL de plataforma e-commerce.",
    problem: "Falta de validación de propiedad de objetos a nivel de resolver GraphQL (IDOR), permitiendo extraer información sensible de clientes.",
    solution: "Implementación de middleware de autorización basado en atributos (ABAC) y sanitización estricta de queries.",
    mitreId: "T1059.006",
    tools: ["Burp Suite Pro", "GraphQL", "Next.js", "Python"],
    metrics: "100% de datos PII resguardados previa salida a producción"
  },
  {
    id: "red-interna-ad",
    title: "Compromiso de Active Directory",
    category: "red",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    cvss: 9.5,
    summary: "Simulación de adversario en red corporativa híbrida.",
    problem: "Ataque de Kerberoasting exitoso debido a contraseñas débiles en cuentas SPN con privilegios elevados.",
    solution: "Endurecimiento de políticas de contraseñas, despliegue de MDI y rotación automatizada de cuentas gMSA.",
    mitreId: "T1558.003",
    tools: ["BloodHound", "Impacket", "CrackMapExec", "Responder"],
    metrics: "Escalación de privilegios mitigada en < 24 hrs"
  },
  {
    id: "app-android-insegura",
    title: "Ingeniería Inversa en App Móvil",
    category: "movil",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
    cvss: 7.4,
    summary: "Extracción de API Keys maestras de APK bancaria mediante deofuscación.",
    problem: "Credenciales de producción hardcodeadas dentro del código fuente compilado y almacenamiento inscripto en SharedPreferences.",
    solution: "Migración de secretos a Android Keystore y ofuscación avanzada con ProGuard / R8.",
    mitreId: "T1406",
    tools: ["Jadx-GUI", "Frida", "Objection", "ADB"],
    metrics: "0 claves expuestas tras implementación de Keystore"
  },
  {
    id: "cloud-config-audit",
    title: "Auditoría AWS Infrastructure",
    category: "red",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=800&auto=format&fit=crop",
    cvss: 8.2,
    summary: "Exposición accidental de buckets S3 y roles IAM hiper-permisivos.",
    problem: "Permisos wildcards (*) en políticas IAM asignadas a funciones Lambda públicas.",
    solution: "Refactorización hacia el Principio de Menor Privilegio (PoLP) e integración de AWS GuardDuty.",
    mitreId: "T1580",
    tools: ["Prowler", "AWS CLI", "ScoutSuite", "Terraform"],
    metrics: "Reducción de la superficie de ataque en un 85%"
  },
  {
    id: "api-jwt-bypass",
    title: "Bypass de Autenticación JWT",
    category: "web",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    cvss: 9.1,
    summary: "Ataque 'None Algorithm' en la verificación de tokens JWT.",
    problem: "Mala configuración del validador JWT que aceptaba tokens firmados con el algoritmo 'none'.",
    solution: "Validación forzada del algoritmo de firma RS256 en la capa de Gateway.",
    mitreId: "T1078",
    tools: ["JWT Editor", "Postman", "Burp Suite"],
    metrics: "Parcheado en Gateway en menos de 2 horas"
  },
  {
    id: "reverse-malware-analysis",
    title: "Análisis de Ransomware en C#",
    category: "red",
    image: "https://images.unsplash.com/photo-1510511459019-5dee997dd1db?q=80&w=800&auto=format&fit=crop",
    cvss: 8.9,
    summary: "Ingeniería inversa a muestra de malware para ingeniería de vacunas.",
    problem: "Muestra maliciosa cifrando archivos del sistema mediante algoritmo AES con clave derivada de hostname.",
    solution: "Desarrollo de script en Python para recuperar claves de cifrado y descifrar archivos afectados.",
    mitreId: "T1486",
    tools: ["dnSpy", "x64dbg", "CyberChef", "Python"],
    metrics: "Herramienta de descifrado desarrollada con éxito"
  }
];