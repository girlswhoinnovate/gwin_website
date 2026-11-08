"use client";

import { motion } from "framer-motion";

const links = [
  { label: "Programs", href: "#programs" },
  { label: "About", href: "#about" },
  { label: "Impact", href: "#impact" },
  { label: "Apply", href: "https://forms.gle/abyXShxxPMKYR8To6" },
];

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/girlswho_innovate/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/girls-who-innovate1/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
  },
  {
    label: "Discord",
    href: "https://discord.gg/HhHcCR8NYj",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinejoin="round" className="w-5 h-5">
        <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.099.246.197.373.291a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.892.076.076 0 0 0-.04.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.331c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.42 0 1.332-.955 2.418-2.157 2.418zm7.974 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.42 0 1.332-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      // A deeper shade than the Impact band so the two dark sections read as separate
      className="overflow-hidden pt-16 pb-6 md:pt-20 md:pb-7"
      style={{ backgroundColor: "#1A0626", color: "#E2BDFF" }}
    >
      <div className="container-wide">

        <div className="grid gap-12 md:grid-cols-2">

          {/* Brand */}
          <div className="max-w-md">
            <p className="text-3xl md:text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-white">
              Empowering girls to become the entrepreneurs, innovators, and leaders of tomorrow.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10">
            {/* Nav links */}
            <div>
              <p className="mono-label mb-5" style={{ opacity: 0.7 }}>Explore</p>
              <nav className="flex flex-col gap-1.5">
                {links.map((l) => (
                  <motion.a
                    key={l.label}
                    href={l.href}
                    {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="self-start text-lg font-medium"
                    whileHover={{ x: 4, color: "#FFFFFF" }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
                  >
                    {l.label}
                  </motion.a>
                ))}
              </nav>
            </div>

            {/* Socials */}
            <div>
              <p className="mono-label mb-5" style={{ opacity: 0.7 }}>Socials</p>
              <div className="flex flex-col gap-1.5">
                {socials.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-start inline-flex items-center gap-2.5 text-lg font-medium"
                    whileHover={{ x: 4, color: "#FFFFFF" }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
                  >
                    {s.icon}
                    {s.label}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Oversized wordmark that spans the full width */}
        <motion.p
          aria-hidden
          className="mt-20 select-none whitespace-nowrap font-extrabold leading-[0.85] tracking-[-0.05em] md:mt-28"
          // the wordmark is ~8.5em wide, so this sizes it to span the gutters
          style={{ fontSize: "min(calc((100vw - 3.6rem) / 8.6), 10rem)", color: "#E2BDFF" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Girls Who Innovate
        </motion.p>

        {/* Bottom row */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" style={{ opacity: 0.7 }}>
          <p className="mono-label">© {new Date().getFullYear()} Girls Who Innovate</p>
          <p className="mono-label">Built with purpose</p>
        </div>

      </div>
    </footer>
  );
}
