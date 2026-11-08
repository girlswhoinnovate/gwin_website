"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Stat {
  value: number;
  suffix: string;
  label: string;
  sublabel?: string;
}

// ─── Count-up ─────────────────────────────────────────────────────────────────

function CountUp({ value, suffix }: Pick<Stat, "value" | "suffix">) {
  const count = useMotionValue(0);
  const isDecimal = value % 1 !== 0;
  const display = useTransform(count, (v) => `${isDecimal ? v.toFixed(1) : Math.round(v)}${suffix}`);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration: 2.2, ease: "easeOut" });
    return controls.stop;
  }, [inView, count, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
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

const ease = [0.22, 1, 0.36, 1] as const;

// ─── Main Component ───────────────────────────────────────────────────────────

export default function StatsBar() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-wide">
        <motion.h2
          className="mb-12 max-w-2xl font-bold leading-[1.05] tracking-[-0.03em] md:mb-16"
          style={{ color: "#2D0840", fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
        >
          Female founders are still the exception. We&rsquo;re changing that.
        </motion.h2>

        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {industryStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="border-t pt-6"
              style={{ borderColor: "#E2BDFF" }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease, delay: i * 0.1 }}
            >
              <span
                className="block font-extrabold leading-none tracking-[-0.04em] tabular-nums"
                style={{ color: "#460C61", fontSize: "clamp(3.5rem, 7vw, 6rem)" }}
              >
                <CountUp value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="mt-4 block max-w-[16rem] text-base leading-snug" style={{ color: "#1E293B", opacity: 0.7 }}>
                {stat.label}
              </span>
              {stat.sublabel && (
                <span className="mono-label mt-3 block text-[11px]" style={{ color: "#7A4A8A" }}>
                  {stat.sublabel}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
