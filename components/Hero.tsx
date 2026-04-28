"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 60, damping: 18 },
  },
};

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.05 } },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 45, damping: 22 });
  const springY = useSpring(rawY, { stiffness: 45, damping: 22 });
  const imgX = useTransform(springX, [-1, 1], [-12, 12]);
  const imgY = useTransform(springY, [-1, 1], [-8, 8]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    rawY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-white overflow-hidden min-h-screen flex flex-col"
    >
      {/* Dot-grid texture */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.05]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#E2BDFF" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* Halo top-right */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.18] -translate-y-1/4 translate-x-1/4"
        style={{ backgroundColor: "#E2BDFF", x: useTransform(springX, [-1, 1], [6, -6]), y: useTransform(springY, [-1, 1], [4, -4]) }}
      />

      {/* Halo bottom-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-[0.12] translate-y-1/3 -translate-x-1/4"
        style={{ backgroundColor: "#E2BDFF" }}
      />

      {/* Main grid */}
      <div className="relative z-10 flex-1 flex items-center w-full">
      <div className="mx-auto max-w-5xl w-full px-6 pt-20 pb-10 grid md:grid-cols-2 gap-10 items-center">

        {/* ── Left column — text ── */}
        <motion.div
          className="flex flex-col items-start gap-5 text-left"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp}>
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{ backgroundColor: "#F6EBFF", color: "#460C61" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#460C61" }} />
              Applications Open · Summer 2026
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl font-extrabold leading-[1.08] tracking-tight"
            style={{ color: "#460C61" }}
          >
            Empowering the{" "}
            <span className="relative inline-block">
              Next Generation
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                style={{ backgroundColor: "#E2BDFF" }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.7, ease: "easeOut" }}
              />
            </span>{" "}
            of Female Entrepreneurs.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={fadeUp}
            className="max-w-md text-base leading-relaxed"
            style={{ color: "#7A4A8A" }}
          >
            Through bootcamps, competitions, and networking, we build the next
            generation of female entrepreneurs — giving girls aged 14–22 the
            tools, community, and confidence to turn ideas into impact.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-row flex-wrap justify-start gap-3"
            variants={fadeUp}
          >
            <motion.a
              href="https://forms.gle/RWsPnSCAgZmhwQ2f9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white"
              style={{ backgroundColor: "#460C61" }}
              animate={{
                boxShadow: [
                  "0 0 0 0px rgba(70,12,97,0.45)",
                  "0 0 0 10px rgba(70,12,97,0)",
                  "0 0 0 0px rgba(70,12,97,0)",
                ],
              }}
              transition={{
                boxShadow: { duration: 2.2, repeat: Infinity, repeatDelay: 0.6, delay: 1.4 },
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              Apply Today
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </motion.a>

            <motion.a
              href="#programs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border-2"
              style={{ borderColor: "#E2BDFF", color: "#460C61", backgroundColor: "transparent" }}
              whileHover={{ backgroundColor: "#F6EBFF" }}
              whileTap={{ scale: 0.96 }}
            >
              Explore Programs
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ── Right column — photo ── */}
        <motion.div
          className="relative hidden md:flex items-center justify-center py-6"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, type: "spring" as const, stiffness: 55, damping: 18 }}
        >
          {/* Shadow card */}
          <motion.div
            className="absolute inset-6 rounded-3xl"
            style={{
              backgroundColor: "#E2BDFF",
              opacity: 0.35,
              rotate: -2,
              x: useTransform(springX, [-1, 1], [8, -8]),
              y: useTransform(springY, [-1, 1], [5, -5]),
            }}
          />

          {/* Photo */}
          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-xl w-full max-w-sm aspect-[3/4]"
            style={{ x: imgX, y: imgY, rotate: 1.5 }}
            animate={{ y: [0, -8, 0] }}
            transition={{
              y: { duration: 5, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" },
            }}
          >
            <Image
              src="/images/1.svg"
              alt="Girls Who Innovate — students at our entrepreneurship bootcamp"
              fill
              className="object-cover object-center"
              unoptimized
              priority
            />
          </motion.div>

          {/* Badge — Girls Impacted */}
          <motion.div
            className="absolute bottom-8 left-2 flex items-center gap-2 px-4 py-2 rounded-2xl shadow-lg"
            style={{ backgroundColor: "#460C61" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: [0, -6, 0] }}
            transition={{
              opacity: { duration: 0.5, delay: 1.1 },
              y: { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.2, repeatType: "mirror" },
            }}
            whileHover={{ scale: 1.06 }}
          >
            <span className="text-lg font-extrabold text-white">95+</span>
            <span className="text-xs font-semibold leading-tight text-white opacity-80">Girls<br />Impacted</span>
          </motion.div>

          {/* Badge — Schools Reached */}
          <motion.div
            className="absolute top-8 right-2 flex items-center gap-2 px-4 py-2 rounded-2xl shadow-lg"
            style={{ backgroundColor: "#F6EBFF", border: "1.5px solid #E2BDFF" }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { duration: 0.5, delay: 1.3 },
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6, repeatType: "mirror" },
            }}
            whileHover={{ scale: 1.06 }}
          >
            <span className="text-lg font-extrabold" style={{ color: "#460C61" }}>43</span>
            <span className="text-xs font-semibold leading-tight" style={{ color: "#7A4A8A" }}>Schools<br />Reached</span>
          </motion.div>
        </motion.div>

      </div>
      </div>
    </section>
  );
}
