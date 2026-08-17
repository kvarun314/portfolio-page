import { GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { profile } from "@/data/profile";

function MetaBlock({ label, items }: { label: string; items: readonly string[] }) {
  return (
    <div className="spotlight-card rounded-lg border border-line bg-surface p-5 transition-colors duration-200 hover:border-line-bright">
      <p className="font-mono text-[10px] tracking-[0.25em] text-fg-dim mb-3">
        {label}
      </p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="text-sm text-fg-mid">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 md:px-8 py-24 md:py-32">
      <SectionHeading index="01" eyebrow="ABOUT" title="Engineer by trade, researcher by practice" />

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="space-y-5 text-fg-mid leading-relaxed">
            <p>{profile.about.intro}</p>
            <p>{profile.about.research}</p>
            <p>{profile.about.current}</p>
          </div>

          <div className="mt-10 space-y-4">
            <p className="font-mono text-[10px] tracking-[0.25em] text-fg-dim">
              EDUCATION
            </p>
            {profile.education.map((edu) => (
              <div
                key={edu.degree}
                className="spotlight-card flex items-start gap-4 rounded-lg border border-line bg-surface p-4 transition-colors duration-200 hover:border-line-bright"
              >
                <GraduationCap
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-medium text-fg">{edu.degree}</p>
                  <p className="text-sm text-fg-mid">{edu.school}</p>
                  <p className="mt-1 font-mono text-xs text-fg-dim">
                    {edu.period}
                    {"note" in edu && edu.note ? ` · ${edu.note}` : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <MetaBlock label="FOCUS" items={profile.about.focus} />
            <MetaBlock label="STACK" items={profile.about.stack} />
            <MetaBlock label="INTERESTS" items={profile.about.interests} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
