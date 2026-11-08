"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ChaptersMap from "@/components/ChaptersMapLoader";
import ChapterList from "@/components/ChapterList";
import SectionHeader from "@/components/SectionHeader";

export default function ChaptersSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="chapters" ref={ref} className="py-20 md:py-28">
      <div className="container-wide">
        <SectionHeader
          index="02"
          label="Where we are"
          title="Chapters"
          blurb="Student-led chapters and university partners across the country. Find one near you."
        >
          <motion.a
            href="https://forms.gle/abyXShxxPMKYR8To6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 mono-label text-[13px] text-white"
            style={{ backgroundColor: "#460C61" }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
          >
            Start a chapter
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </motion.a>
        </SectionHeader>

        {/* List + Map */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start rounded-[32px] bg-white p-4 md:p-8"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="min-w-0 md:col-span-2">
            <ChapterList activeId={activeId} setActiveId={setActiveId} />
          </div>
          <div className="min-w-0 md:col-span-3">
            <ChaptersMap activeId={activeId} setActiveId={setActiveId} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
