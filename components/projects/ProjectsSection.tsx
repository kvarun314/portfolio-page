import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { ProjectCard } from "./ProjectCard";
import { projects, publications } from "@/data/projects";

export function ProjectsSection() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 md:px-8 py-24 md:py-32">
      <SectionHeading
        index="03"
        eyebrow="PROJECTS & RESEARCH"
        title="Systems shipped, research published"
        description="Production systems built for enterprise scale, alongside computer vision research — including a co-authored conference paper on automated annotation with vision-language foundation models."
      />

      <div className="grid gap-5">
        {featured && (
          <Reveal>
            <ProjectCard project={featured} featured />
          </Reveal>
        )}
        <div className="grid gap-5 md:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={Math.min(i * 0.08, 0.2)}>
              <ProjectCard project={p} />
            </Reveal>
          ))}

          {/* Publications panel */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-xl border border-line bg-surface p-6 md:p-8">
              <p className="font-mono text-[10px] tracking-[0.25em] text-accent">
                PUBLICATIONS
              </p>
              <ul className="mt-4 space-y-4">
                {publications.map((pub) => (
                  <li key={pub.title} className="border-b border-line pb-4 last:border-0 last:pb-0">
                    <p className="text-sm font-medium text-fg leading-snug">
                      {pub.title}
                    </p>
                    <p className="mt-1 font-mono text-xs text-fg-dim">
                      {pub.venue}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
