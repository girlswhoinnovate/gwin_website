"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" as const } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const values = [
  {
    label: "Dream Big",
    body: "We push girls to think without limits — every audacious idea starts here.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#460C61" strokeWidth={1.8} className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
    ),
  },
  {
    label: "Take Risks",
    body: "We teach that calculated risk is not reckless; it's how breakthroughs happen.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#460C61" strokeWidth={1.8} className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
  {
    label: "Embrace Failure",
    body: "Failure is a feature, not a bug. Every setback is a lesson we build on.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#460C61" strokeWidth={1.8} className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
  {
    label: "Own the Room",
    body: "Confidence is a skill. We practice it, build it, and celebrate it.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#460C61" strokeWidth={1.8} className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
      </svg>
    ),
  },
];

export default function AboutSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const missionInView = useInView(missionRef, { once: true, margin: "-80px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-80px" });

  return (
    <section id="about" className="bg-white py-14 px-6">
      <div className="mx-auto max-w-5xl space-y-12">

        {/* ── Section header ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#460C61" }}>
            Who We Are
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{ color: "#1E293B" }}>
            About Girls Who Innovate
          </h2>
          <motion.div
            className="mx-auto mt-4 h-1 rounded-full"
            style={{ backgroundColor: "#460C61" }}
            initial={{ width: 0 }}
            animate={headerInView ? { width: 64 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </motion.div>

        {/* ── Mission + About split ── */}
        <div ref={missionRef} className="grid lg:grid-cols-2 gap-8 items-stretch">

          {/* Left — photo */}
          <motion.div
            className="relative h-full"
            initial={{ opacity: 0, x: -50 }}
            animate={missionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Shadow card */}
            <div
              className="absolute inset-4 rounded-3xl"
              style={{ backgroundColor: "#E2BDFF", opacity: 0.35, transform: "rotate(2deg)" }}
            />
            <div className="relative rounded-3xl overflow-hidden shadow-xl h-full min-h-[360px] w-full max-w-sm mx-auto lg:mx-0">
              <Image
                src="/images/2.svg"
                alt="Girls Who Innovate — community members collaborating"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </motion.div>

          {/* Right — Mission + Story text */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, ease: "easeOut" }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#460C61" }}>
                Our Mission
              </p>
              <h3
                className="text-2xl md:text-3xl font-extrabold leading-snug mb-4"
                style={{ color: "#1E293B" }}
              >
                We&rsquo;re Changing the Way Girls{" "}
                <span style={{ color: "#460C61" }}>Approach Entrepreneurship.</span>
              </h3>
              <p className="text-base leading-relaxed" style={{ color: "#1E293B", opacity: 0.75 }}>
                Girls Who Innovate (GWIN) is a program dedicated to empowering high school and college
                girls with the skills they need to become innovators. Through bootcamps, competitions,
                and networking, we aim to build the next generation of female entrepreneurs.
              </p>
            </motion.div>

            <div className="h-px w-full" style={{ backgroundColor: "#E2BDFF" }} />

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.14 }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#460C61" }}>
                Our Story
              </p>
              <p className="text-base leading-relaxed mb-3" style={{ color: "#1E293B", opacity: 0.75 }}>
                Girls Who Innovate (GWIN) was founded to address a critical gap: the lack of accessible
                and empowering entrepreneurship resources for girls and young women aged 14 to 22. We
                believe that innovation has no age limit, and confidence should never be a barrier.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "#1E293B", opacity: 0.75 }}>
                Too often, young girls with brilliant ideas are held back by self-doubt, limited
                opportunities, and a lack of mentorship. GWIN is here to change that — providing the
                tools, community, and support they need to turn vision into action, and ideas into
                impact.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── Values grid ── */}
        <motion.div
          ref={valuesRef}
          variants={stagger}
          initial="hidden"
          animate={valuesInView ? "visible" : "hidden"}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-center"
            style={{ color: "#460C61" }}
          >
            What We Stand For
          </motion.p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((v) => (
              <motion.div
                key={v.label}
                variants={fadeUp}
                whileHover={{ y: -6, boxShadow: "0 12px 32px rgba(70,12,97,0.10)" }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 22 }}
                className="rounded-2xl border p-6 cursor-default"
                style={{ borderColor: "#E2BDFF", backgroundColor: "#FFFFFF" }}
              >
                <div
                  className="w-9 h-9 rounded-full mb-4 flex items-center justify-center"
                  style={{ backgroundColor: "#E2BDFF" }}
                >
                  {v.icon}
                </div>
                <h4 className="font-bold text-base mb-2" style={{ color: "#460C61" }}>
                  {v.label}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: "#1E293B", opacity: 0.7 }}>
                  {v.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
