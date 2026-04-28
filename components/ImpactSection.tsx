"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, animate, type Variants } from "framer-motion";

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

// ─── Animated progress bar ────────────────────────────────────────────────────

function ProgressBar({ pct, delay }: { pct: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: "#7A4A8A" }}>
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: "#E2BDFF" }}
        initial={{ width: "0%" }}
        animate={inView ? { width: `${pct}%` } : {}}
        transition={{ duration: 1.6, delay, ease: "easeOut" }}
      />
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const traction = [
  { value: 95, suffix: "", label: "Girls Impacted", pct: 17 },
  { value: 561, suffix: "", label: "Girls Interested in the Program", pct: 100 },
  { value: 43, suffix: "", label: "Schools & Universities Reached", pct: 43 },
];

const highlights = [
  "Bootcamp alumni have launched 12+ student ventures",
  "Speakers drawn from Forbes 30 Under 30, UN, and Fortune 500",
  "Operating across 3 time zones with fully remote programming",
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ImpactSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });
  const highlightsInView = useInView(highlightsRef, { once: true, margin: "-60px" });

  return (
    <section id="impact" className="py-14 px-6" style={{ backgroundColor: "#460C61" }}>
      <div className="mx-auto max-w-5xl space-y-10">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#E2BDFF" }}>
            Our Traction
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            The Impact So Far
          </h2>
          <motion.div
            className="mx-auto mt-4 h-1 rounded-full"
            style={{ backgroundColor: "#E2BDFF" }}
            initial={{ width: 0 }}
            animate={headerInView ? { width: 64 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </motion.div>

        {/* Traction stats */}
        <motion.div
          ref={statsRef}
          variants={stagger}
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {traction.map((item, i) => (
            <motion.div key={item.label} variants={fadeUp} className="flex flex-col gap-3">
              <span className="text-5xl md:text-6xl font-extrabold tabular-nums text-white leading-none">
                <CountUp to={item.value} suffix={item.suffix} />
              </span>
              <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: "#E2BDFF" }}>
                {item.label}
              </span>
              <ProgressBar pct={item.pct} delay={i * 0.15 + 0.3} />
            </motion.div>
          ))}
        </motion.div>

        {/* Highlights */}
        <motion.div
          ref={highlightsRef}
          variants={stagger}
          initial="hidden"
          animate={highlightsInView ? "visible" : "hidden"}
          className="rounded-2xl p-8 md:p-10 grid sm:grid-cols-2 gap-5"
          style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(226,189,255,0.2)" }}
        >
          {highlights.map((h) => (
            <motion.div key={h} variants={fadeUp} className="flex items-start gap-3">
              <span
                className="mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#E2BDFF" }}
              >
                <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="#460C61" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="text-sm leading-relaxed text-white opacity-85">{h}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={highlightsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-lg font-semibold text-white mb-6 opacity-90">
            Ready to be part of the next chapter?
          </p>
          <motion.a
            href="https://forms.gle/RWsPnSCAgZmhwQ2f9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold"
            style={{ backgroundColor: "#E2BDFF", color: "#460C61" }}
            whileHover={{ scale: 1.05, backgroundColor: "#FFFFFF" }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring" as const, stiffness: 380, damping: 22 }}
          >
            Apply Today
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
