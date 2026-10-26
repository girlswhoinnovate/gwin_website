import type { Metadata } from "next";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import ChaptersMap from "@/components/ChaptersMapLoader";
import { LocationCard } from "@/components/ChaptersMap";
import { locations } from "@/lib/chapterLocations";

export const metadata: Metadata = {
  title: "Chapters | Girls Who Innovate",
  description:
    "Explore GWIN high school chapters and university partners across the country.",
};

export default function ChaptersPage() {
  const chapters = locations.filter((l) => l.kind === "chapter");
  const hubs = locations.filter((l) => l.kind === "hub");

  return (
    <>
      <ScrollProgress />
      <main className="bg-white pt-28 pb-14 px-6">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#460C61" }}>
              Where We Are
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{ color: "#1E293B" }}>
              Chapters
            </h1>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full" style={{ backgroundColor: "#460C61" }} />
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed" style={{ color: "#1E293B", opacity: 0.75 }}>
              GWIN chapters bring our entrepreneurship curriculum to high schools nationwide, while
              our university partners connect us with college communities across the country.
              Explore the map to find a GWIN chapter near you.
            </p>
          </div>

          {/* Map */}
          <ChaptersMap />

          {/* Lists */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ color: "#460C61" }}>
                High School Chapters
              </p>
              <div className="space-y-3">
                {chapters.map((loc) => (
                  <LocationCard key={loc.id} location={loc} />
                ))}
              </div>
            </div>

            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ color: "#460C61" }}>
                University Partners
              </p>
              <div className="space-y-3">
                {hubs.map((loc) => (
                  <LocationCard key={loc.id} location={loc} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
