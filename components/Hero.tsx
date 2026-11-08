"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const letters = ["G", "W", "I", "N"];
const photos = ["/images/1.svg", "/images/2.svg", "/images/3.svg"];

// Each step flips one letter into a photo tile; the empty steps in between
// let the full wordmark read again before the next swap.
const steps: ({ slot: number; photo: number } | null)[] = [
  { slot: 0, photo: 0 },
  null,
  { slot: 3, photo: 1 },
  null,
  { slot: 1, photo: 2 },
  null,
  { slot: 2, photo: 0 },
  null,
];

const ease = [0.22, 1, 0.36, 1] as const;
const INTRO_MS = 1600;
const STEP_MS = 1500;

// Inter's caps exactly fill a line box of 0.727em, so each slot is sized to
// the cap height and a photo tile can sit precisely where the letter was.
const CAP = "0.727em";
const PAD = "0.02em";

function Slot({ letter, index, photo, reduce }: { letter: string; index: number; photo: number | null; reduce: boolean }) {
  return (
    <span className="relative block overflow-hidden" style={{ paddingBlock: PAD }}>
      {/* Invisible copy keeps the slot at the letter's natural width */}
      <span className="invisible block" style={{ lineHeight: CAP }}>{letter}</span>

      <AnimatePresence initial={!reduce}>
        {photo === null ? (
          <motion.span
            key="letter"
            className="absolute inset-x-0 block"
            style={{ top: PAD, lineHeight: CAP }}
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-110%" }}
            transition={{ duration: 0.75, ease }}
          >
            {letter}
          </motion.span>
        ) : (
          <motion.span
            key={`photo-${photo}`}
            className="absolute inset-x-[0.02em] block overflow-hidden rounded-[0.07em]"
            style={{ top: PAD, bottom: PAD }}
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-110%" }}
            transition={{ duration: 0.75, ease }}
          >
            <motion.span
              className="absolute inset-0 block"
              initial={{ scale: 1.35 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: STEP_MS / 1000 + 0.75, ease: "easeOut" }}
            >
              <Image
                src={photos[photo]}
                alt=""
                fill
                sizes="30vw"
                className="object-cover"
                unoptimized
                priority={index === 0}
              />
            </motion.span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (reduce) return;
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      setStep(0);
      interval = setInterval(() => setStep((s) => (s + 1) % steps.length), STEP_MS);
    }, INTRO_MS);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [reduce]);

  // As the hero scrolls away the wordmark drifts up, shrinks and blurs out.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const markY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const markScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const markOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const markBlur = useTransform(scrollYProgress, [0, 0.8], ["blur(0px)", "blur(14px)"]);

  const active = step >= 0 ? steps[step] : null;

  return (
    <section
      ref={sectionRef}
      className="hero-bands relative flex h-[100svh] min-h-[560px] flex-col overflow-hidden"
    >
      <div className="relative flex flex-1 items-center justify-center">
        <motion.div
          className="flex flex-col items-center"
          style={reduce ? undefined : { y: markY, scale: markScale, opacity: markOpacity, filter: markBlur }}
        >
          <h1
            aria-label="GWIN — Girls Who Innovate"
            className="flex select-none font-extrabold tracking-[-0.045em]"
            style={{ color: "#460C61", fontSize: "clamp(6rem, 27vw, 17rem)", lineHeight: CAP }}
          >
            {letters.map((letter, i) => (
              <motion.span
                key={letter + i}
                className="block"
                initial={reduce ? false : { y: "40%", opacity: 0, filter: "blur(10px)" }}
                animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1, ease, delay: 0.15 + i * 0.09 }}
              >
                <Slot
                  letter={letter}
                  index={i}
                  photo={active && active.slot === i ? active.photo : null}
                  reduce={reduce}
                />
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mono-label mt-5 text-[13px] md:mt-7 md:text-sm"
            style={{ color: "#7A4A8A" }}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.8 }}
          >
            [ Girls Who Innovate ]
          </motion.p>
        </motion.div>
      </div>

      {/* Corner captions */}
      <motion.div
        className="container-wide relative flex items-end justify-between gap-6 pb-6 md:pb-7"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        <p className="mono-label max-w-[14rem] leading-snug md:max-w-none" style={{ color: "#2D0840" }}>
          Empowering the next generation of female entrepreneurs
        </p>
        <p className="mono-label hidden shrink-0 sm:flex items-center gap-4" style={{ color: "#2D0840" }}>
          <span>700+ girls</span>
          <span>43 schools</span>
        </p>
        <a href="#intro" className="mono-label shrink-0 sm:hidden" style={{ color: "#2D0840" }} aria-label="Scroll down">
          Scroll ↓
        </a>
      </motion.div>
    </section>
  );
}
