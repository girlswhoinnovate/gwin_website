"use client";

import { motion } from "framer-motion";

const links = [
  { label: "Programs", href: "#programs" },
  { label: "About", href: "#about" },
  { label: "Impact", href: "#impact" },
  { label: "Apply", href: "https://forms.gle/RWsPnSCAgZmhwQ2f9" },
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
];

export default function Footer() {
  return (
    <footer className="bg-white border-t px-6 py-10" style={{ borderColor: "#E2BDFF" }}>
      <div className="mx-auto max-w-5xl">

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">

          {/* Brand */}
          <div className="max-w-xs">
            <p className="text-xl font-extrabold mb-2" style={{ color: "#460C61" }}>
              Girls Who Innovate
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#1E293B", opacity: 0.65 }}>
              Empowering girls aged 14–22 to become the entrepreneurs, innovators, and leaders of
              tomorrow.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((l) => (
              <motion.a
                key={l.label}
                href={l.href}
                {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-sm font-medium"
                style={{ color: "#460C61" }}
                whileHover={{ x: 3 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
              >
                {l.label}
              </motion.a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex items-center justify-center w-9 h-9 rounded-full border transition-colors"
                style={{ borderColor: "#E2BDFF", color: "#460C61" }}
                whileHover={{ scale: 1.12, backgroundColor: "#F6EBFF", borderColor: "#460C61" }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring" as const, stiffness: 380, damping: 22 }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full mb-8" style={{ backgroundColor: "#E2BDFF" }} />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ color: "#1E293B", opacity: 0.5 }}>
          <p>© {new Date().getFullYear()} Girls Who Innovate. All rights reserved.</p>
          <p>Built with purpose.</p>
        </div>

      </div>
    </footer>
  );
}
