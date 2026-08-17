import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { TechBadge } from "@/components/ui/TechBadge";
import { experience } from "@/data/experience";
import { cn } from "@/lib/utils";

export function ExperienceTimeline() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-6xl px-5 md:px-8 py-24 md:py-32"
    >
      <SectionHeading
        index="02"
        eyebrow="EXPERIENCE"
        title="Four years of shipping production systems"
        description="From Java microservices at telecom scale to distributed caching, Snowflake data pipelines, and full-stack analytics tooling on AWS — an arc bending steadily toward data science and AI engineering."
      />

      <ol className="relative border-l border-line md:ml-4">
        {experience.map((item, idx) => (
          <li key={`${item.company}-${item.period}`} className="relative pb-14 last:pb-0 pl-7 md:pl-12">
            {/* Timeline node */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full border",
                item.current
                  ? "border-accent bg-accent shadow-[0_0_12px_rgba(129,140,248,0.6)]"
                  : "border-line-bright bg-surface"
              )}
            />
            <Reveal delay={Math.min(idx * 0.05, 0.2)}>
              <p className="font-mono text-xs tracking-[0.2em] text-accent">
                {item.period.toUpperCase()}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-fg">
                {item.role}
              </h3>
              <p className="mt-1 text-sm text-fg-mid">
                {item.company} · {item.location}
              </p>

              {item.summary ? (
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-fg-mid">
                  {item.summary}
                </p>
              ) : null}

              {item.highlights.length > 0 && (
                <ul className="mt-4 max-w-3xl space-y-2.5">
                  {item.highlights.map((h) => (
                    <li
                      key={h}
                      className="relative pl-5 text-sm leading-relaxed text-fg-mid before:absolute before:left-0 before:top-[9px] before:h-1 before:w-2 before:bg-accent/60"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                {item.technologies.map((t) => (
                  <TechBadge key={t} label={t} />
                ))}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
