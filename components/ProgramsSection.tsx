"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, LayoutGroup } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const programs = [
  {
    id: "bootcamp",
    tab: "Summer Bootcamp",
    title: "Online Summer High School Bootcamp",
    tagline: "Free · 2 Weeks · Rising 9th–12th Grade",
    description:
      "Our free two-week online bootcamp gives high school girls hands-on entrepreneurship experience — from ideation to a live pitch in front of real judges and investors. The top teams win real cash to kickstart their ideas.",
    features: [
      "Project-based learning with a real startup challenge",
      "Live sessions with female founders and industry leaders",
      "Final pitch event judged by entrepreneurs & investors",
      "Certificate of completion + alumni network access",
    ],
    prizes: [
      { place: "1st Place", amount: "$500", medal: "🥇" },
      { place: "2nd Place", amount: "$250", medal: "🥈" },
      { place: "3rd Place", amount: "$100", medal: "🥉" },
      { place: "Special Awards", amount: "More prizes to help kickstart your project", medal: "⭐" },
    ],
    cta: "Apply for Bootcamp",
    ctaHref: "https://forms.gle/RWsPnSCAgZmhwQ2f9",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    id: "chapters",
    tab: "HS Chapters",
    title: "High School Chapters",
    tagline: "Student-Run · Any School · Free to Join",
    description:
      "Start or join a GWIN chapter at your high school. Chapters are student-led entrepreneurship clubs powered by GWIN's full curriculum, speaker network, and competition access — bringing the GWIN experience to your campus.",
    features: [
      "Full access to GWIN's curriculum and workshop library",
      "Chapter leader coaching and mentorship support",
      "Inter-chapter competitions and pitch showcases",
      "Priority access to bootcamp and network events",
    ],
    cta: "Start a Chapter",
    ctaHref: "https://forms.gle/abyXShxxPMKYR8To6",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    id: "network",
    tab: "Online Network",
    title: "GWIN Online Network",
    tagline: "Free · All Ages · Year-Round",
    description:
      "Our online community connects young women aged 14–22 with peers, mentors, and industry leaders from across the country. Get advice, find collaborators, discover opportunities, and never build alone.",
    features: [
      "Peer community of ambitious girls across 43+ schools",
      "Direct access to mentors and female founders",
      "Job boards, internship leads, and funding resources",
      "Monthly virtual events, AMAs, and workshops",
    ],
    cta: "Join the Network",
    ctaHref: "https://discord.gg/tuePJasA42",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
];

// ─── Animated feature list item ───────────────────────────────────────────────

function Feature({ text, index }: { text: string; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="flex items-start gap-3 text-sm leading-relaxed"
      style={{ color: "#1E293B" }}
    >
      <span
        className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "#E2BDFF" }}
      >
        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
          <path d="M2 6l3 3 5-5" stroke="#460C61" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {text}
    </motion.li>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProgramsSection() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const program = programs[active];

  return (
    <section id="programs" ref={ref} className="bg-white py-14 px-6">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-8 text-center"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#460C61" }}>
            What We Offer
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{ color: "#1E293B" }}>
            Our Programs
          </h2>
          <motion.div
            className="mx-auto mt-4 h-1 rounded-full"
            style={{ backgroundColor: "#460C61" }}
            initial={{ width: 0 }}
            animate={inView ? { width: 64 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </motion.div>

        {/* Tab bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-6 flex justify-center"
        >
          <LayoutGroup>
            <div
              className="inline-flex w-full md:w-auto rounded-xl p-1 gap-1"
              style={{ backgroundColor: "#F6EBFF" }}
            >
              {programs.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setActive(i)}
                  className="relative flex-1 md:flex-none px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors duration-200 z-10"
                  style={{ color: active === i ? "#FFFFFF" : "#460C61" }}
                >
                  {active === i && (
                    <motion.span
                      layoutId="tab-pill"
                      className="absolute inset-0 rounded-lg z-[-1]"
                      style={{ backgroundColor: "#460C61" }}
                      transition={{ type: "spring" as const, stiffness: 380, damping: 32 }}
                    />
                  )}
                  {p.tab}
                </button>
              ))}
            </div>
          </LayoutGroup>
        </motion.div>

        {/* Content panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={program.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.38, ease: "easeOut" }}
            className="grid md:grid-cols-2 gap-8 items-stretch rounded-2xl border p-6 md:p-8"
            style={{ borderColor: "#E2BDFF", backgroundColor: "#FFFFFF" }}
          >
            {/* Left — copy */}
            <div className="flex flex-col">
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6"
                style={{ backgroundColor: "#F6EBFF", color: "#460C61" }}
              >
                {program.icon}
              </div>

              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#7A4A8A" }}>
                {program.tagline}
              </p>
              <h3 className="text-2xl md:text-3xl font-extrabold leading-tight mb-4" style={{ color: "#1E293B" }}>
                {program.title}
              </h3>
              <p className="text-base leading-relaxed mb-3" style={{ color: "#1E293B", opacity: 0.75 }}>
                {program.description}
              </p>

              <motion.a
                href={program.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white mb-3"
                style={{ backgroundColor: "#460C61" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
              >
                {program.cta}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </motion.a>

              {/* Prize pool — only shown for bootcamp, pushed to bottom */}
              {"prizes" in program && program.prizes && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="mt-auto rounded-xl overflow-hidden border"
                  style={{ borderColor: "#E2BDFF" }}
                >
                  <div
                    className="px-4 py-2.5 flex items-center gap-2"
                    style={{ backgroundColor: "#460C61" }}
                  >
                    <svg className="w-4 h-4 text-white opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                    </svg>
                    <span className="text-xs font-bold uppercase tracking-widest text-white">Prize Pool</span>
                  </div>
                  <div style={{ backgroundColor: "#F6EBFF" }}>
                    {program.prizes.map((prize, i) => (
                      <div
                        key={prize.place}
                        className={`flex items-center justify-between px-4 py-2.5 ${i < program.prizes!.length - 1 ? "border-b" : ""}`}
                        style={{ borderColor: "#E2BDFF" }}
                      >
                        <span className="flex items-center gap-2 text-sm font-medium" style={{ color: "#1E293B" }}>
                          <span>{prize.medal}</span>
                          {prize.place}
                        </span>
                        <span className="text-sm font-extrabold" style={{ color: "#460C61" }}>
                          {prize.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right — photo + feature list */}
            <div className="flex flex-col gap-4">
              {/* Photo */}
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] w-full">
                <Image
                  src="/images/3.svg"
                  alt="Girls Who Innovate — program participants in action"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Feature list — mt-auto keeps it bottom-aligned with prize pool */}
              <div
                className="mt-auto rounded-xl p-6"
                style={{ backgroundColor: "#F6EBFF" }}
              >
                <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#460C61" }}>
                  What you get
                </p>
                <ul className="space-y-4">
                  {program.features.map((feat, i) => (
                    <Feature key={feat} text={feat} index={i} />
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
