"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { skillCategories, domains } from "@/data/skills";
import { cn } from "@/lib/utils";

export function SkillEcosystem() {
  const [hovered, setHovered] = useState<string | null>(null);

  const isRelated = (key: string) => {
    if (!hovered) return false;
    const cat = skillCategories.find((c) => c.key === hovered);
    return cat?.related.includes(key) ?? false;
  };

  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 md:px-8 py-24 md:py-32">
      <SectionHeading
        index="04"
        eyebrow="SKILLS"
        title="Technical ecosystem"
        description="Hover a category to see how it connects across the stack — from foundation models to the infrastructure they run on."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat, idx) => {
          const active = hovered === cat.key;
          const related = isRelated(cat.key);
          const dimmed = hovered !== null && !active && !related;

          return (
            <Reveal key={cat.key} delay={Math.min(idx * 0.05, 0.25)}>
              <motion.div
                onMouseEnter={() => setHovered(cat.key)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(cat.key)}
                onBlur={() => setHovered(null)}
                tabIndex={0}
                aria-label={`${cat.label}: ${cat.skills.join(", ")}`}
                animate={{ opacity: dimmed ? 0.45 : 1 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "spotlight-card h-full rounded-lg border p-5 transition-colors duration-200",
                  active
                    ? "border-accent bg-accent-dim"
                    : related
                      ? "border-line-bright bg-surface-2"
                      : "border-line bg-surface"
                )}
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-fg">{cat.label}</h3>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "font-mono text-[10px] transition-colors",
                      active ? "text-accent" : "text-fg-dim"
                    )}
                  >
                    {related ? "── linked" : `${cat.skills.length}`}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((s) => (
                    <span
                      key={s}
                      className={cn(
                        "rounded border px-2 py-0.5 font-mono text-[11px] leading-5 transition-colors duration-200",
                        active
                          ? "border-accent/40 text-fg"
                          : "border-line text-fg-mid"
                      )}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.15}>
        <div className="spotlight-card mt-10 rounded-lg border border-line bg-surface p-5 transition-colors duration-200 hover:border-line-bright">
          <p className="font-mono text-[10px] tracking-[0.25em] text-fg-dim mb-3">
            DOMAINS
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {domains.map((d, i) => (
              <span key={d} className="flex items-center gap-6 text-sm text-fg-mid">
                {d}
                {i < domains.length - 1 && (
                  <span aria-hidden="true" className="hidden sm:inline text-fg-dim">
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
