"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";

const values = [
  { label: "Dream Big", body: "Every audacious idea starts here." },
  { label: "Take Risks", body: "Calculated risk is how breakthroughs happen." },
  { label: "Embrace Failure", body: "Every setback is a lesson we build on." },
  { label: "Own the Room", body: "Confidence is a skill we practice." },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container-wide">
        <SectionHeader
          index="03"
          label="Who we are"
          title="About"
          blurb="Innovation has no age limit — and confidence should never be a barrier."
        />

        {/* ── Statement + photo ── */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            className="relative aspect-[4/3] w-full overflow-hidden rounded-[32px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
          >
            <Image
              src="/images/2.svg"
              alt="Girls Who Innovate — community members collaborating"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              unoptimized
            />
          </motion.div>

          <motion.div
            className="flex flex-col justify-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            <h3
              className="font-bold leading-[1.05] tracking-[-0.03em]"
              style={{ color: "#2D0840", fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)" }}
            >
              We&rsquo;re changing the way girls approach{" "}
              <span style={{ color: "#460C61" }}>entrepreneurship.</span>
            </h3>
            <p className="max-w-lg text-lg leading-snug" style={{ color: "#1E293B", opacity: 0.7 }}>
              Too many girls with brilliant ideas are held back by self-doubt and a lack of
              mentorship. GWIN gives them the tools, community, and support to turn ideas into impact.
            </p>
          </motion.div>
        </div>

        {/* ── Values ── */}
        <div className="mt-20 grid gap-8 sm:grid-cols-2 md:mt-28 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.div
              key={v.label}
              className="border-t pt-6"
              style={{ borderColor: "#E2BDFF" }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease, delay: i * 0.08 }}
            >
              <p className="mono-label mb-6" style={{ color: "#7A4A8A" }}>
                0{i + 1}
              </p>
              <h4 className="mb-2 text-xl font-bold tracking-[-0.02em]" style={{ color: "#2D0840" }}>
                {v.label}
              </h4>
              <p className="text-base leading-snug" style={{ color: "#1E293B", opacity: 0.7 }}>
                {v.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
