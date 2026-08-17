"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { NetworkGraph } from "./NetworkGraph";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();

  const enter = (delay: number) => ({
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    animate: reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease },
  });

  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden">
      {/* Backdrop: coordinate grid + network graph */}
      <div className="absolute inset-0 grid-backdrop" aria-hidden="true" />
      <div className="absolute inset-0 opacity-60 md:opacity-80">
        <NetworkGraph />
      </div>
      {/* Readability scrim over the visualization */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-bg via-bg/70 to-bg/30"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 md:px-8 pt-24 pb-16">
        <motion.p
          {...enter(0.05)}
          className="font-mono text-[11px] md:text-xs tracking-[0.3em] text-accent mb-6"
        >
          {profile.eyebrow}
        </motion.p>

        <motion.h1
          {...enter(0.15)}
          className="max-w-3xl text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]"
        >
          <span className="bg-gradient-to-br from-[var(--hero-from)] via-fg to-fg-mid bg-clip-text text-transparent">
            Varun Keshav
          </span>
          <span className="bg-gradient-to-r from-accent to-[var(--hero-accent-to)] bg-clip-text text-transparent">
            {" "}
            Kumar
          </span>
        </motion.h1>

        <motion.div {...enter(0.28)} className="mt-8 max-w-2xl">
          <p className="text-lg md:text-xl text-fg-mid leading-relaxed">
            Full-stack engineer with 4+ years shipping production systems —
            distributed caching, cloud automation, React dashboards —
            transitioning that depth into a full-time career in AI/ML &amp;
            Data Science, backed by published zero-shot computer vision
            research.
          </p>
          <p className="mt-4 flex items-center gap-2 font-mono text-xs text-fg-dim">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {profile.location}
          </p>
        </motion.div>

        <motion.div {...enter(0.4)} className="mt-10 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-md bg-accent-strong px-5 py-3 text-sm font-medium text-white shadow-[0_0_24px_var(--glow-btn)] transition-all duration-200 hover:bg-accent hover:shadow-[0_0_36px_var(--glow-btn-hover)] cursor-pointer"
          >
            View Projects
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
          <a
            href={profile.resumeFile}
            download
            className="inline-flex items-center gap-2 rounded-md border border-line-bright px-5 py-3 text-sm font-medium text-fg-mid transition-all duration-200 hover:border-accent hover:text-fg cursor-pointer"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download Resume
          </a>
        </motion.div>

      </div>
    </section>
  );
}
