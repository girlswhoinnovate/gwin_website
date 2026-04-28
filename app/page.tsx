import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import MarqueeTicker from "@/components/MarqueeTicker";
import ProgramsSection from "@/components/ProgramsSection";
import AboutSection from "@/components/AboutSection";
import ImpactSection from "@/components/ImpactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <main>
        <Hero />
        <StatsBar />
        <MarqueeTicker />
        <ProgramsSection />
        <AboutSection />
        <ImpactSection />
        <Footer />
      </main>
    </>
  );
}
