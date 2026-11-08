"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const sponsors: { name: string; src: string; href: string; size?: string; className?: string; row: 1 | 2 }[] = [
  { name: "University of Virginia", src: "/images/uva_logo.png", href: "https://www.virginia.edu/", size: "w-48 h-24 sm:w-56 sm:h-28", className: "-ml-4 sm:-ml-6", row: 1 },
  { name: "JPMorgan", src: "/images/jpm_logo.png", href: "https://www.jpmorgan.com/global", size: "w-36 h-18 sm:w-44 sm:h-22", className: "-ml-3 sm:-ml-6", row: 1 },
  { name: "Duke University", src: "/images/duke_logo.png", href: "https://www.duke.edu/", size: "w-32 h-16 sm:w-40 sm:h-20", className: "ml-2 sm:ml-3", row: 1 },
  { name: "iLab", src: "/images/ilab_logo.png", href: "https://www.darden.virginia.edu/batten-institute/entrepreneurship/ilab", size: "w-28 h-10 sm:w-36 sm:h-12", row: 2 },
  { name: "Hilton", src: "/images/hilton_logo.png", href: "https://www.hilton.com/en/", size: "w-32 h-16 sm:w-40 sm:h-20", row: 2 },
];

export default function IntroSection() {
  const textRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const sponsorsRef = useRef<HTMLDivElement>(null);
  const textInView = useInView(textRef, { once: true, margin: "-80px" });
  const sponsorsInView = useInView(sponsorsRef, { once: true, margin: "-60px" });

  // Slow parallax on the photo inside its rounded frame
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="intro" className="pt-20 pb-5 md:pt-28 md:pb-7" style={{ backgroundColor: "#2D0840" }}>
      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Statement */}
          <div ref={textRef} className="flex flex-col justify-between gap-12">
            <div>
              <motion.p
                className="mono-label mb-6"
                style={{ color: "#E2BDFF" }}
                initial={{ opacity: 0 }}
                animate={textInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6 }}
              >
                [00] Our mission
              </motion.p>
              <motion.h2
                className="font-bold leading-[1.05] tracking-[-0.03em]"
                style={{ color: "#E2BDFF", fontSize: "clamp(2rem, 4.2vw, 3.6rem)" }}
                initial={{ opacity: 0, y: 30 }}
                animate={textInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, ease }}
              >
                Empowering the next generation of{" "}
                <span className="relative inline-block text-white">
                  female entrepreneurs.
                  {/* Hand-drawn underline that draws itself in */}
                  <svg
                    aria-hidden
                    className="absolute -bottom-[0.3em] left-0 w-full h-[0.25em] overflow-visible"
                    viewBox="0 0 300 20"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <motion.path
                      d="M4 10 C 70 6, 130 15, 190 10 S 270 8, 296 12"
                      stroke="#E2BDFF"
                      strokeWidth={4}
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={textInView ? { pathLength: 1 } : {}}
                      transition={{ duration: 1.1, ease: "easeInOut", delay: 0.7 }}
                    />
                  </svg>
                </span>
              </motion.h2>
            </div>

            <motion.div
              className="flex flex-col items-start gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={textInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
            >
              <p className="max-w-md text-lg leading-snug" style={{ color: "rgba(226,189,255,0.8)" }}>
                Bootcamps, competitions, and a community that turns ideas into impact.
              </p>
              <motion.a
                href="#programs"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 mono-label text-[13px]"
                style={{ backgroundColor: "#E2BDFF", color: "#2D0840" }}
                whileHover={{ scale: 1.04, backgroundColor: "#FFFFFF" }}
                whileTap={{ scale: 0.96 }}
              >
                Explore programs
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </motion.a>
            </motion.div>
          </div>

          {/* Photo */}
          <motion.div
            ref={photoRef}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] lg:aspect-[5/6]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
          >
            <motion.div className="absolute inset-[-8%]" style={{ y: photoY }}>
              <Image
                src="/images/1.svg"
                alt="Girls Who Innovate — students at our entrepreneurship bootcamp"
                fill
                className="object-cover object-center"
                unoptimized
              />
            </motion.div>

            {/* Stat tags, styled like the mono pills on the example's work cards */}
            <div className="absolute left-5 top-5 flex flex-wrap gap-2">
              <span className="mono-label rounded-full bg-white/90 px-3 py-2 text-[11px]" style={{ color: "#2D0840" }}>
                700+ girls impacted
              </span>
              <span className="mono-label rounded-full bg-white/90 px-3 py-2 text-[11px]" style={{ color: "#2D0840" }}>
                43 schools reached
              </span>
            </div>
          </motion.div>
        </div>

        {/* Supported by */}
        <motion.div
          ref={sponsorsRef}
          className="mt-16 flex flex-col items-center gap-5 rounded-[32px] px-6 py-10 md:mt-24"
          style={{ backgroundColor: "#F4F1F6" }}
          initial={{ opacity: 0, y: 30 }}
          animate={sponsorsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <span className="mono-label" style={{ color: "#7A4A8A" }}>
            Supported by
          </span>
          <div className="flex flex-col items-center gap-y-4 sm:gap-y-6">
            {[1, 2].map((row) => (
              <div
                key={row}
                className={`flex flex-wrap items-center justify-center ${
                  row === 1 ? "gap-x-10 sm:gap-x-16" : "gap-x-8 sm:gap-x-12"
                }`}
              >
                {sponsors
                  .filter((sponsor) => sponsor.row === row)
                  .map((sponsor) => (
                    <a
                      key={sponsor.name}
                      href={sponsor.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={sponsor.name}
                      className={`relative block transition-transform duration-300 hover:scale-110 ${sponsor.size ?? "w-40 h-20 sm:w-48 sm:h-24"} ${sponsor.className ?? ""}`}
                    >
                      <Image src={sponsor.src} alt={sponsor.name} fill className="object-contain" unoptimized />
                    </a>
                  ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
