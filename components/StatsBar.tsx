"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Stat {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  sublabel?: string;
}

// ─── Count-up ─────────────────────────────────────────────────────────────────

function CountUp({ value, prefix = "", suffix }: Pick<Stat, "value" | "prefix" | "suffix">) {
  const count = useMotionValue(0);
  const isDecimal = value % 1 !== 0;
  const display = useTransform(count, (v) =>
    `${prefix}${isDecimal ? v.toFixed(1) : Math.round(v)}${suffix}`
  );
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration: 2.2, ease: "easeOut" });
    return controls.stop;
  }, [inView, count, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ stat, index, dark }: { stat: Stat; index: number; dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="flex flex-col items-center justify-start text-center px-6 py-6"
    >
      <span
        className="text-4xl md:text-5xl font-extrabold tabular-nums leading-none"
        style={{ color: dark ? "#FFFFFF" : "#460C61" }}
      >
        <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
      </span>
      <span
        className="mt-3 text-sm font-semibold uppercase tracking-wide leading-snug"
        style={{ color: dark ? "#E2BDFF" : "#1E293B" }}
      >
        {stat.label}
      </span>
      {stat.sublabel && (
        <span
          className="mt-1 text-xs leading-snug"
          style={{ color: dark ? "#E2BDFF" : "#1E293B", opacity: 0.7 }}
        >
          {stat.sublabel}
        </span>
      )}
    </motion.div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const industryStats: Stat[] = [
  {
    value: 14.3,
    suffix: "%",
    label: "of founders are female",
  },
  {
    value: 2.3,
    suffix: "%",
    label: "of female founding teams receive VC funding",
    sublabel: "30-year average",
  },
  {
    value: 14.9,
    suffix: "%",
    label: "of founders in their 20s are female",
  },
];

// ─── Section header ───────────────────────────────────────────────────────────

function SectionLabel({ text, dark }: { text: string; dark?: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45 }}
      className="mb-8 text-xs font-bold uppercase tracking-[0.2em]"
      style={{ color: dark ? "#E2BDFF" : "#460C61" }}
    >
      {text}
    </motion.p>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function StatsBar() {
  return (
    <>
      {/* Row 1 — Industry stats — white background */}
      <section className="bg-white py-10 px-6">
        <div className="mx-auto max-w-5xl">
          <SectionLabel text="Female Entrepreneurship in Numbers" />
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E2BDFF]">
            {industryStats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
