"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="h-full"
    >
      <Link
        href={`/projects/${project.slug}`}
        className={cn(
          "spotlight-card group flex h-full flex-col rounded-xl border border-line bg-surface p-6 md:p-8 transition-[border-color,background-color,box-shadow] duration-250 hover:border-accent/50 hover:bg-surface-2 hover:shadow-[0_12px_40px_-12px_var(--glow-card)] cursor-pointer",
          featured && "lg:p-10"
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <p className="font-mono text-[10px] tracking-[0.25em] text-accent">
            {project.category}
          </p>
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-fg-dim transition-all duration-200 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </div>

        <h3
          className={cn(
            "mt-4 font-semibold tracking-tight text-fg",
            featured ? "text-2xl md:text-3xl max-w-xl" : "text-xl"
          )}
        >
          {project.title}
        </h3>

        <p className="mt-3 max-w-xl text-sm leading-relaxed text-fg-mid">
          {project.oneLiner}
        </p>

        {project.publication && (
          <p className="mt-4 flex items-center gap-2 font-mono text-xs text-fg-dim">
            <BookOpen className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            {project.publication}
          </p>
        )}

        <div className="mt-auto pt-6 flex flex-wrap items-center gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded border border-line px-2 py-0.5 font-mono text-[11px] leading-5 text-fg-mid transition-colors duration-200 group-hover:border-line-bright"
            >
              {t}
            </span>
          ))}
          <span className="ml-auto font-mono text-xs text-fg-dim transition-colors duration-200 group-hover:text-accent">
            → case study
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
