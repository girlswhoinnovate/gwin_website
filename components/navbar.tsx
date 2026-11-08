"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Programs", href: "/#programs" },
  { label: "Chapters", href: "/#chapters" },
  { label: "About", href: "/#about" },
  { label: "Impact", href: "/#impact" },
];

const ease = [0.22, 1, 0.36, 1] as const;

function Arrow({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // The bar turns into the dark floating pill once the page scrolls, or
  // whenever the mobile menu is open so the panel below it reads as one unit.
  const solid = scrolled || menuOpen;

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={false}
      animate={{
        paddingTop: solid ? 8 : 0,
        paddingLeft: solid ? 12 : 0,
        paddingRight: solid ? 12 : 0,
      }}
      transition={{ duration: 0.5, ease }}
    >
      <div className="mx-auto max-w-[1440px] md:px-4">
        <motion.div
          className="relative flex h-16 items-center justify-between px-5 md:grid md:grid-cols-[1fr_auto_1fr] md:px-7"
          initial={false}
          animate={{
            backgroundColor: solid ? "rgba(45,8,64,0.94)" : "rgba(45,8,64,0)",
            color: solid ? "#FFFFFF" : "#460C61",
            borderRadius: solid ? 999 : 0,
            boxShadow: solid ? "0 10px 30px rgba(45,8,64,0.18)" : "0 0 0 rgba(45,8,64,0)",
          }}
          transition={{ duration: 0.5, ease }}
          style={{ backdropFilter: solid ? "blur(12px)" : "none" }}
        >
          {/* Logo */}
          <Link href="/#" aria-label="Girls Who Innovate — home" className="flex items-center" onClick={() => setMenuOpen(false)}>
            <span className="gwin-logo-mask block h-8 md:h-9" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group relative mono-label text-[13px] py-2"
              >
                {link.label}
                <span className="absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center justify-end gap-3">
            <motion.a
              href="https://discord.gg/NG9zSSeHZC"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2.5 mono-label text-[13px]"
              initial={false}
              animate={{
                backgroundColor: solid ? "#F4F1F6" : "#460C61",
                color: solid ? "#2D0840" : "#FFFFFF",
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.4, ease }}
            >
              Join Us
            </motion.a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
            >
              <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </motion.div>

        {/* Mobile menu — a rounded panel that drops out of the pill */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden mt-2 overflow-hidden rounded-[28px] text-white"
              style={{ backgroundColor: "rgba(45,8,64,0.97)" }}
              initial={{ opacity: 0, y: -12, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -12, height: 0 }}
              transition={{ duration: 0.4, ease }}
            >
              <div className="flex flex-col px-6 pt-4 pb-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.1, duration: 0.35, ease }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between border-b py-4 text-2xl font-bold tracking-tight"
                      style={{ borderColor: "rgba(226,189,255,0.18)" }}
                    >
                      {link.label}
                      <Arrow className="w-4 h-4 opacity-60" />
                    </Link>
                  </motion.div>
                ))}

                <a
                  href="https://forms.gle/RWsPnSCAgZmhwQ2f9"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="mt-6 flex items-center justify-center gap-2 rounded-full px-5 py-3.5 mono-label text-[13px]"
                  style={{ backgroundColor: "#E2BDFF", color: "#2D0840" }}
                >
                  Join the Movement
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
