import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { SkillsSection } from "@/components/skills-section";
import { CertificationsSection } from "@/components/certifications-section";
import { LaboratoriosSection } from "@/components/laboratorios-section";
import { CasesSection } from "@/components/cases-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <SkillsSection />
        <CertificationsSection />
        <LaboratoriosSection />
        <CasesSection />
      </main>
      <Footer />
    </div>
  );
}
