"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <head>
        <title>Joan Lu | Cybersecurity & Full-Stack Case Studies</title>
        <meta
          name="description"
          content="Portfolio interactivo de auditorías de ciberseguridad, desarrollo full-stack y proyectos de pentesting."
        />
      </head>
      <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
        <body className="bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-black min-h-screen flex flex-col">
          {children}
        </body>
      </ReactLenis>
    </html>
  );
}