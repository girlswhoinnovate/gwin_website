"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";

// ─── Data ─────────────────────────────────────────────────────────────────────

const programs = [
  {
    id: "bootcamp",
    title: "Summer Bootcamp",
    tags: ["Free", "2 weeks", "Grades 9–12"],
    description:
      "A free online bootcamp that takes you from an idea to a live pitch in front of real judges and investors.",
    prizes: ["$500 1st", "$250 2nd", "$100 3rd"],
    status: "Summer 2027 applications opening soon",
    cta: "Stay tuned",
    ctaHref: "https://discord.gg/HhHcCR8NYj",
    image: "/images/3.svg",
  },
  {
    id: "chapters",
    title: "High School Chapters",
    tags: ["Student-run", "Any school"],
    description:
      "Start a GWIN club at your school, powered by our curriculum, speaker network, and competitions.",
    cta: "Start a chapter",
    ctaHref: "https://forms.gle/abyXShxxPMKYR8To6",
    image: "/images/2.svg",
  },
  {
    id: "network",
    title: "Online Network",
    tags: ["All ages", "Year-round"],
    description:
      "Mentors and founders across 43+ schools, so you never have to build alone.",
    cta: "Join the network",
    ctaHref: "https://discord.gg/HhHcCR8NYj",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProgramsSection() {
  const [open, setOpen] = useState<string | null>(programs[0].id);

  return (
    <section id="programs" className="py-20 md:py-28">
      <div className="container-wide">
        <SectionHeader
          index="01"
          label="What we offer"
          title="Programs"
        />

        {/* Expandable rows — one program open at a time */}
        <div className="border-b" style={{ borderColor: "#E2BDFF" }}>
          {programs.map((program, i) => {
            const isOpen = open === program.id;
            return (
              <motion.div
                key={program.id}
                className="border-t"
                style={{ borderColor: "#E2BDFF" }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease, delay: i * 0.08 }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : program.id)}
                  aria-expanded={isOpen}
                  className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 py-6 text-left md:grid-cols-[4rem_1fr_auto_auto] md:gap-8 md:py-8"
                >
                  <span className="mono-label" style={{ color: "#7A4A8A" }}>
                    [0{i + 1}]
                  </span>
                  <span
                    className="font-extrabold leading-[0.95] tracking-[-0.035em] transition-transform duration-500 ease-out group-hover:translate-x-2"
                    style={{ color: isOpen ? "#460C61" : "#2D0840", fontSize: "clamp(1.75rem, 4.5vw, 4rem)" }}
                  >
                    {program.title}
                  </span>
                  <span className="mono-label hidden text-[11px] md:block" style={{ color: "#7A4A8A" }}>
                    {program.tags.join(" · ")}
                  </span>
                  {/* Diamond toggle: a square turned 45°. The diamond itself stays put and
                      fills when open; only the icon inside turns, from "+" to "×". */}
                  <span className="flex h-10 w-10 items-center justify-center md:h-12 md:w-12">
                    <motion.span
                      className="flex h-7 w-7 items-center justify-center border md:h-8 md:w-8"
                      style={{ borderColor: "#E2BDFF", rotate: 45 }}
                      animate={{
                        backgroundColor: isOpen ? "#460C61" : "rgba(70,12,97,0)",
                        borderColor: isOpen ? "#460C61" : "#E2BDFF",
                        color: isOpen ? "#FFFFFF" : "#460C61",
                      }}
                      transition={{ duration: 0.4, ease }}
                    >
                      {/* -45° cancels the diamond's turn so "+" sits upright when closed */}
                      <motion.svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.25}
                        initial={false}
                        animate={{ rotate: isOpen ? 0 : -45 }}
                        transition={{ duration: 0.4, ease }}
                      >
                        <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                      </motion.svg>
                    </motion.span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="panel"
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease }}
                    >
                      <div className="grid gap-8 pb-10 md:grid-cols-[4rem_1fr_1fr] md:gap-8 md:pb-14">
                        {/* Copy */}
                        <div className="flex flex-col items-start gap-6 md:col-start-2">
                          <p className="max-w-md text-lg leading-snug" style={{ color: "#1E293B", opacity: 0.7 }}>
                            {program.description}
                          </p>

                          {/* Tags live in the row header on desktop */}
                          <p className="mono-label text-[11px] md:hidden" style={{ color: "#7A4A8A" }}>
                            {program.tags.join(" · ")}
                          </p>
                          {program.prizes && (
                            <p className="mono-label text-[11px] leading-relaxed" style={{ color: "#460C61" }}>
                              <span style={{ color: "#7A4A8A" }}>Prizes</span>
                              <span className="mx-2" style={{ color: "#7A4A8A" }}>—</span>
                              {program.prizes.join(" · ")}
                            </p>
                          )}

                          <div className="flex flex-wrap items-center gap-4">
                            <motion.a
                              href={program.ctaHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-full px-6 py-3 mono-label text-[13px] text-white"
                              style={{ backgroundColor: "#460C61" }}
                              whileHover={{ scale: 1.04 }}
                              whileTap={{ scale: 0.96 }}
                            >
                              {program.cta}
                            </motion.a>
                            {program.status && (
                              <span className="mono-label text-[11px]" style={{ color: "#7A4A8A" }}>
                                {program.status}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Photo */}
                        {program.image && (
                          <motion.div
                            className="relative aspect-[16/10] w-full overflow-hidden"
                            initial={{ scale: 0.96, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.7, ease, delay: 0.1 }}
                          >
                            <Image
                              src={program.image}
                              alt={`Girls Who Innovate — ${program.title}`}
                              fill
                              sizes="(min-width: 768px) 45vw, 100vw"
                              className="object-cover"
                              unoptimized
                            />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
