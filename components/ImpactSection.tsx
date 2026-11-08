"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";

// ─── Count-up ─────────────────────────────────────────────────────────────────

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => `${Math.round(v)}${suffix}`);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(count, to, { duration: 2.4, ease: "easeOut" });
    return ctrl.stop;
  }, [inView, count, to]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const traction = [
  { value: 87, label: "Bootcamp participants" },
  { value: 733, label: "Girls impacted" },
  { value: 43, label: "Schools & universities" },
];

const highlights = [
  "12+ student ventures launched by bootcamp alumni",
  "Speakers from Forbes 30 Under 30, the UN, and the Fortune 500",
  "Fully remote programming across 3 time zones",
];

const ease = [0.22, 1, 0.36, 1] as const;
const line = "rgba(226,189,255,0.2)";

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ImpactSection() {
  return (
    <section id="impact" className="py-20 md:py-28" style={{ backgroundColor: "#460C61" }}>
      <div className="container-wide">
        <SectionHeader
          index="04"
          label="Our traction"
          title="Impact"
          blurb="The numbers so far — and we're just getting started."
          dark
        />

        {/* Stats */}
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {traction.map((item, i) => (
            <motion.div
              key={item.label}
              className="border-t pt-6"
              style={{ borderColor: line }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease, delay: i * 0.1 }}
            >
              <span
                className="block font-extrabold leading-none tracking-[-0.04em] tabular-nums text-white"
                style={{ fontSize: "clamp(3.5rem, 7vw, 6rem)" }}
              >
                <CountUp to={item.value} />
              </span>
              <span className="mono-label mt-4 block" style={{ color: "#E2BDFF" }}>
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Highlights */}
        <ul className="mt-16 md:mt-24">
          {highlights.map((h, i) => (
            <motion.li
              key={h}
              className="flex items-baseline gap-6 border-t py-5 text-lg md:text-xl"
              style={{ borderColor: line, color: "#FFFFFF" }}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
            >
              <span className="mono-label shrink-0" style={{ color: "#E2BDFF" }}>
                0{i + 1}
              </span>
              {h}
            </motion.li>
          ))}
        </ul>

        {/* CTA */}
        <motion.div
          className="flex flex-col items-start justify-between gap-6 border-t pt-10 md:flex-row md:items-center"
          style={{ borderColor: line }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="font-bold tracking-[-0.03em] text-white" style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)" }}>
            Ready to be part of the next chapter?
          </p>
          <motion.a
            href="https://docs.google.com/forms/d/e/1FAIpQLScoSynXmACCTkW-78iiN67yZadcOUoRjsJHt4rcaIplU62rSQ/viewform?usp=send_form"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full px-7 py-4 mono-label text-[13px]"
            style={{ backgroundColor: "#E2BDFF", color: "#460C61" }}
            whileHover={{ scale: 1.04, backgroundColor: "#FFFFFF" }}
            whileTap={{ scale: 0.96 }}
          >
            Apply for a chapter
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
