import { HeroSection } from "~/components/hero-section";
import { PinnedSection } from "~/components/pinned-section";
import { ProjectsSection } from "~/components/projects-section";
import { SkillsSection } from "~/components/skills-section";
import { ContactSection } from "~/components/contact-section";
import { Footer } from "~/components/footer";

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <PinnedSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
