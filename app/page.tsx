import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import IntroSection from "@/components/IntroSection";
import StatsBar from "@/components/StatsBar";
import ProgramsSection from "@/components/ProgramsSection";
import ChaptersSection from "@/components/ChaptersSection";
import AboutSection from "@/components/AboutSection";
import ImpactSection from "@/components/ImpactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <main>
        <Hero />
        <IntroSection />
        <StatsBar />
        <ProgramsSection />
        <ChaptersSection />
        <AboutSection />
        <ImpactSection />
        <Footer />
      </main>
    </>
  );
}
