"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

// Big heading on the left with a short blurb on the right. The
// heading rises out of a clipped line as it scrolls into view.
export default function SectionHeader({
  index,
  label,
  title,
  blurb,
  dark,
  children,
}: {
  index: string;
  label: string;
  title: string;
  blurb?: React.ReactNode;
  dark?: boolean;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="mb-12 grid gap-8 md:mb-16 md:grid-cols-2 md:items-end">
      <div>
        <motion.p
          className="mono-label mb-5"
          style={{ color: dark ? "#E2BDFF" : "#7A4A8A" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          [{index}] {label}
        </motion.p>
        <h2
          // extra bottom padding keeps descenders (g, p, y) inside the clip;
          // the negative margin cancels it so spacing below stays the same
          className="overflow-hidden pb-[0.2em] -mb-[0.12em] font-extrabold leading-[0.9] tracking-[-0.045em]"
          style={{ color: dark ? "#FFFFFF" : "#2D0840", fontSize: "clamp(3.25rem, 9vw, 8rem)" }}
        >
          <motion.span
            className="block"
            initial={{ y: "105%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 0.9, ease }}
          >
            {title}
          </motion.span>
        </h2>
      </div>

      {(blurb || children) && (
        <motion.div
          className="flex flex-col items-start gap-6 md:justify-self-end md:max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
        >
          {blurb && (
            <p
              className="text-lg font-medium leading-snug tracking-[-0.01em]"
              style={{ color: dark ? "#E2BDFF" : "#2D0840" }}
            >
              {blurb}
            </p>
          )}
          {children}
        </motion.div>
      )}
    </div>
  );
}
