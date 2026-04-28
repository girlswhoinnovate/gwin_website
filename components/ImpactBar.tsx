'use client';

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

const stats = [
  { value: 500, suffix: '+', label: 'Innovators' },
  { value: 20, suffix: '+', label: 'Programs' },
  { value: 15, suffix: '+', label: 'Cities Reached' },
  { value: 98, suffix: '%', label: 'Would Recommend' },
];

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${Math.round(v)}${suffix}`);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, to, { duration: 2, ease: 'easeOut' });
    return controls.stop;
  }, [isInView, count, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function ImpactBar() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      className="bg-[#7C3AED] px-6 py-16"
    >
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center text-sm font-semibold uppercase tracking-widest text-[#DDD6FE]"
        >
          Our Impact
        </motion.p>

        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="flex flex-col items-center gap-1 text-center"
            >
              <span className="text-5xl font-extrabold text-white md:text-6xl">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-base font-medium text-[#DDD6FE]">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
