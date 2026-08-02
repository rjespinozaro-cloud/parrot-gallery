import type { Metadata } from "next";
import { DnaBackdrop } from "@/components/dna-backdrop";
import { ScrollProgress } from "@/components/scroll-progress";
import { LenisProvider } from "@/components/lenis-provider";
import "./globals.css";
import { DnaProvider } from "@/components/dna-provider";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Ronaldiño Joanlu Espinoza | SOC Analyst & Full-Stack Developer",
    template: "%s | Joanlu Espinoza",
  },
  description:
    "Portfolio profesional de ciberseguridad defensiva y desarrollo full-stack. SOC Analyst con Wazuh, hardening de redes Zero Trust y aplicaciones seguras con Spring Boot y Next.js.",
  keywords: [
    "SOC Analyst",
    "Ciberseguridad",
    "Wazuh",
    "SIEM",
    "Full-Stack Developer",
    "Spring Boot",
    "Next.js",
    "MITRE ATT&CK",
    "Pentesting",
    "Zero Trust",
  ],
  authors: [{ name: "Ronaldiño Joanlu Espinoza Rosario" }],
  creator: "Ronaldiño Joanlu Espinoza Rosario",
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: BASE_URL,
    siteName: "Joanlu Espinoza — Portfolio",
    title: "Ronaldiño Joanlu Espinoza | SOC Analyst & Full-Stack Developer",
    description:
      "Portfolio profesional de ciberseguridad defensiva y desarrollo full-stack. SOC Analyst con Wazuh, hardening de redes y aplicaciones seguras.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Joanlu Espinoza — SOC Analyst & Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ronaldiño Joanlu Espinoza | SOC Analyst & Full-Stack Developer",
    description:
      "Portfolio profesional de ciberseguridad defensiva y desarrollo full-stack.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="bg-carbon-900 text-slate-100 antialiased selection:bg-primary-500 selection:text-white min-h-screen flex flex-col overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 rounded-lg bg-carbon-800 text-white border border-carbon-600 shadow-lg"
        >
          Saltar al contenido principal
        </a>

        <div className="video-fallback-bg" aria-hidden="true" />

        <div className="fixed inset-0 pointer-events-none z-[-1] bg-gradient-to-br from-primary-900/20 via-carbon-900/80 to-violet-900/20 mix-blend-screen" />

        <DnaProvider>
          <LenisProvider />
          <ScrollProgress />
          <DnaBackdrop />
          {children}
        </DnaProvider>
      </body>
    </html>
  );
}
