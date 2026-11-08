"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

// Each group of letters rolls over to the word it stands for, sized to the
// exact width of those letters. "IN" is one group so "Innovate" spans both.
const groups = [
  { letters: "G", word: "Girls" },
  { letters: "W", word: "Who" },
  { letters: "IN", word: "Innovate" },
];

// Which groups show their word at each step: the words build up one by one
// to read "Girls Who Innovate", hold, then all roll back to "GWIN".
const steps: number[][] = [[], [0], [0, 1], [0, 1, 2], [0, 1, 2], []];

const ease = [0.22, 1, 0.36, 1] as const;
const INTRO_MS = 1600;
const STEP_MS = 1300;

// Inter's caps exactly fill a line box of 0.727em, so each slot is sized to
// the cap height and the letters can roll cleanly in and out of it.
const CAP = "0.727em";
const PAD = "0.02em";
// Set on the word itself (not inherited) so it scales with the word's own size
const WORD_TRACKING = "-0.03em";

function Slot({
  letters,
  word,
  showWord,
  wordSize,
  onMeasure,
  reduce,
}: {
  letters: string;
  word: string;
  showWord: boolean;
  wordSize: number;
  onMeasure: (fit: number) => void;
  reduce: boolean;
}) {
  const sizerRef = useRef<HTMLSpanElement>(null);
  const probeRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    // Reports the largest font size (in em) at which this word still fits
    // within its letters. Both widths scale with the h1's font size, so this
    // only needs redoing once the web font has loaded and changed the metrics.
    const measure = () => {
      const sizer = sizerRef.current;
      const probe = probeRef.current;
      // 0.88 leaves a little air on each side so neighbouring words don't touch
      if (sizer && probe && probe.offsetWidth > 0) onMeasure((sizer.offsetWidth * 0.88) / probe.offsetWidth);
    };
    measure();
    document.fonts?.ready.then(measure);
  }, [onMeasure]);

  return (
    <span className="relative block overflow-hidden" style={{ paddingBlock: PAD }}>
      {/* Invisible copy keeps the slot at the letters' natural width */}
      <span ref={sizerRef} className="invisible block whitespace-nowrap" style={{ lineHeight: CAP }}>{letters}</span>
      {/* Invisible 1em copy of the word, used only to measure its width */}
      <span ref={probeRef} aria-hidden className="invisible absolute left-0 top-0 whitespace-nowrap" style={{ lineHeight: 1, letterSpacing: WORD_TRACKING }}>
        {word}
      </span>

      <AnimatePresence initial={!reduce}>
        {showWord ? (
          <motion.span
            key="word"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-110%" }}
            transition={{ duration: 0.75, ease }}
          >
            <span className="block whitespace-nowrap" style={{ fontSize: `${wordSize}em`, lineHeight: 1, letterSpacing: WORD_TRACKING }}>
              {word}
            </span>
          </motion.span>
        ) : (
          <motion.span
            key="letters"
            className="absolute inset-x-0 block whitespace-nowrap"
            style={{ top: PAD, lineHeight: CAP }}
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-110%" }}
            transition={{ duration: 0.75, ease }}
          >
            {letters}
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

  // All words share one size: the smallest of the per-word fits, so every
  // word still fits within its own letters.
  const [fits, setFits] = useState<number[]>(() => groups.map(() => 0.25));
  const wordSize = Math.min(...fits);
  const measureCallbacks = useMemo(
    () =>
      groups.map((_, i) => (fit: number) =>
        setFits((prev) => (prev[i] === fit ? prev : prev.map((f, j) => (j === i ? fit : f))))
      ),
    []
  );

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

  const showing = step >= 0 ? steps[step] : [];

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
            {groups.map((group, i) => (
              <motion.span
                key={group.letters}
                className="block"
                initial={reduce ? false : { y: "40%", opacity: 0, filter: "blur(10px)" }}
                animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1, ease, delay: 0.15 + i * 0.09 }}
              >
                <Slot
                  letters={group.letters}
                  word={group.word}
                  showWord={showing.includes(i)}
                  wordSize={wordSize}
                  onMeasure={measureCallbacks[i]}
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
