import { Navbar } from "@/components/portfolio/navbar";
import { Hero } from "@/components/portfolio/hero";
import { About } from "@/components/portfolio/about";
import { Journey } from "@/components/portfolio/journey";
import { Skills } from "@/components/portfolio/skills";
import { Yumaris } from "@/components/portfolio/yumaris";
import { AIAutomation } from "@/components/portfolio/ai-automation";
import { Projects } from "@/components/portfolio/projects";
import { EdTech } from "@/components/portfolio/edtech";
import { Leadership } from "@/components/portfolio/leadership";
import { Experience } from "@/components/portfolio/experience";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";
import { ScrollProgress } from "@/components/portfolio/scroll-progress";
import { CursorGlow } from "@/components/portfolio/cursor-glow";
import { ScrollSectionNav } from "@/components/portfolio/scroll-section-nav";
import { TechMarquee } from "@/components/portfolio/tech-marquee";
import { PageTransition } from "@/components/portfolio/page-transition";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <PageTransition>
        <main className="flex-1">
          <Hero />
          <About />
          <Journey />
          <Skills />
          <TechMarquee />
          <Yumaris />
          <AIAutomation />
          <Projects />
          <EdTech />
          <Leadership />
          <Experience />
          <Contact />
        </main>
      </PageTransition>
      <Footer />
      <ScrollSectionNav />
    </div>
  );
}
