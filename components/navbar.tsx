"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Programs", href: "#programs" },
    { label: "About", href: "#about" },
    { label: "Impact", href: "#impact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300 ${
          scrolled ? "shadow-[0_2px_20px_rgba(0,0,0,0.25)]" : ""
        }`}
        style={{ backgroundColor: "#2D0840" }}
      >
        <div className="max-w-5xl w-full mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <Link href="#" className="flex items-center">
            <img
              src="/gwin-logo.svg"
              alt="Girls Who Innovate"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.div
                key={link.label}
                whileHover={{ scale: 1.05, y: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Link
                  href={link.href}
                  className="block px-4 py-2 text-sm font-medium tracking-wide rounded-lg transition-colors duration-200"
                  style={{ color: "#E2BDFF" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(226,189,255,0.12)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right: CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">

            {/* Join Button */}
            <motion.a
              href="https://forms.gle/RWsPnSCAgZmhwQ2f9"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full"
              style={{ backgroundColor: "#E2BDFF", color: "#2D0840", letterSpacing: "0.02em" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <span>Join</span>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </motion.a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg transition-colors hover:bg-[rgba(226,189,255,0.12)]"
            >
              <span className={`block h-0.5 w-5 transition-all duration-300 bg-[#E2BDFF] ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 w-5 transition-all duration-300 bg-[#E2BDFF] ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 transition-all duration-300 bg-[#E2BDFF] ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            menuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t px-6 pb-6 pt-3 flex flex-col gap-1" style={{ backgroundColor: "#2D0840", borderColor: "rgba(226,189,255,0.2)" }}>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between px-3 py-3 text-sm font-medium rounded-lg transition-colors"
                style={{ color: "#E2BDFF" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(226,189,255,0.12)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"}
              >
                {link.label}
                <svg className="w-4 h-4" style={{ color: "#E2BDFF" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            ))}

            <div className="mt-3 pt-3 border-t" style={{ borderColor: "rgba(226,189,255,0.2)" }}>
              <motion.a
                href="https://forms.gle/RWsPnSCAgZmhwQ2f9"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-semibold text-white rounded-full"
                style={{ backgroundColor: "#460C61" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Join the Movement
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}