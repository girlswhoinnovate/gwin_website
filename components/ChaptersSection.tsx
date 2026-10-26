"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ChaptersMap from "@/components/ChaptersMapLoader";
import ChapterList from "@/components/ChapterList";

export default function ChaptersSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="chapters" ref={ref} className="bg-white py-14 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-10 text-center"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#460C61" }}>
            Where We Are
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{ color: "#1E293B" }}>
            Chapters
          </h2>
          <motion.div
            className="mx-auto mt-4 h-1 rounded-full"
            style={{ backgroundColor: "#460C61" }}
            initial={{ width: 0 }}
            animate={inView ? { width: 64 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed" style={{ color: "#1E293B", opacity: 0.75 }}>
            GWIN chapters bring our entrepreneurship curriculum to high schools nationwide, while
            our university partners connect us with college communities across the country.
            Search the list or explore the map to find a GWIN chapter near you.
          </p>
          <motion.a
            href="https://forms.gle/abyXShxxPMKYR8To6"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: "#460C61" }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
          >
            Start a Chapter
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </motion.a>
        </motion.div>

        {/* List + Map */}
        <div className="grid md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-2">
            <ChapterList activeId={activeId} setActiveId={setActiveId} />
          </div>
          <div className="md:col-span-3">
            <ChaptersMap activeId={activeId} setActiveId={setActiveId} />
          </div>
        </div>
      </div>
    </section>
  );
}
