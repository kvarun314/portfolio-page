"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300",
        scrolled || menuOpen
          ? "bg-bg/80 backdrop-blur-md border-b border-line shadow-[0_8px_32px_var(--shadow-nav)]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      {/* Scroll progress along the top edge */}
      <motion.span
        aria-hidden="true"
        style={{ scaleX: reduceMotion ? scrollYProgress : progress }}
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-accent-strong via-accent to-[var(--hero-accent-to)]"
      />
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8"
      >
        <Link
          href="#"
          onClick={closeMenu}
          className="font-mono text-sm font-medium tracking-tight text-fg hover:text-accent transition-colors"
        >
          varun<span className="text-accent">.</span>keshav
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? "true" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm transition-colors duration-200",
                  active === s.id
                    ? "text-fg"
                    : "text-fg-mid hover:text-fg"
                )}
              >
                {active === s.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-md bg-accent-dim"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 400, damping: 32 }
                    }
                  />
                )}
                <span className="relative">{s.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <a
            href={profile.resumeFile}
            download
            className="inline-flex items-center gap-2 rounded-md border border-line-bright px-3.5 py-2 text-sm text-fg-mid transition-all duration-200 hover:border-accent hover:text-fg cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Resume
          </a>
        </div>

        {/* Mobile: theme toggle + menu button */}
        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-fg-mid hover:text-fg transition-colors cursor-pointer"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={
              reduceMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }
            }
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-b border-line bg-bg/95 backdrop-blur-md"
          >
            <ul className="px-5 pb-4 pt-2">
              {sections.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.2 }}
                >
                  <a
                    href={`#${s.id}`}
                    onClick={closeMenu}
                    className={cn(
                      "flex items-center justify-between rounded-md px-3 py-3 text-base transition-colors",
                      active === s.id
                        ? "text-fg bg-accent-dim"
                        : "text-fg-mid hover:text-fg"
                    )}
                  >
                    {s.label}
                    <span className="font-mono text-[10px] text-fg-dim">
                      0{i + 1}
                    </span>
                  </a>
                </motion.li>
              ))}
              <li className="mt-2 border-t border-line pt-3">
                <a
                  href={profile.resumeFile}
                  download
                  onClick={closeMenu}
                  className="flex items-center gap-2 rounded-md px-3 py-3 text-base text-fg-mid hover:text-fg transition-colors"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
