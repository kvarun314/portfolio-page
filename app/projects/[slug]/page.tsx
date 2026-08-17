import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { TechBadge } from "@/components/ui/TechBadge";
import { PipelineDiagram } from "@/components/projects/PipelineDiagram";
import { Reveal } from "@/components/animations/Reveal";
import { Footer } from "@/components/navigation/Footer";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.oneLiner,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${profile.name}`,
      description: project.oneLiner,
      type: "article",
    },
  };
}

function CaseStudySection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section className="border-t border-line py-10 md:py-12">
        <h2 className="font-mono text-xs tracking-[0.3em] text-accent mb-6">
          {label}
        </h2>
        {children}
      </section>
    </Reveal>
  );
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project || !project.caseStudy) notFound();
  const cs = project.caseStudy;

  return (
    <>
      <header className="border-b border-line">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-5 md:px-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-fg-mid transition-colors duration-200 hover:text-fg"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All projects
          </Link>
          <span className="flex items-center gap-3">
            <span className="font-mono text-xs text-fg-dim">{profile.name}</span>
            <ThemeToggle />
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 md:px-8 py-16 md:py-24">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.3em] text-accent mb-5">
            PROJECT · {project.category}
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-fg leading-tight">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-fg-mid leading-relaxed">
            {project.oneLiner}
          </p>
          {project.publication && (
            <p className="mt-4 font-mono text-xs text-fg-dim">
              {project.publication}
            </p>
          )}
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-accent transition-colors duration-200 hover:text-fg cursor-pointer"
            >
              View code
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
        </Reveal>

        {project.metrics && (
          <Reveal delay={0.1}>
            <dl className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="spotlight-card rounded-lg border border-line bg-surface p-4 transition-colors duration-200 hover:border-line-bright"
                >
                  <dt className="font-mono text-[10px] tracking-[0.2em] text-fg-dim">
                    {m.label.toUpperCase()}
                  </dt>
                  <dd className="mt-2 font-mono text-2xl text-accent tabular-nums">
                    {m.value}
                  </dd>
                  {m.note && (
                    <dd className="mt-1 font-mono text-[10px] leading-4 text-fg-dim">
                      {m.note}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          </Reveal>
        )}

        <div className="mt-14">
          <CaseStudySection label="THE PROBLEM">
            <p className="max-w-2xl leading-relaxed text-fg-mid">{cs.problem}</p>
          </CaseStudySection>

          <CaseStudySection label="THE APPROACH">
            <p className="max-w-2xl leading-relaxed text-fg-mid">{cs.approach}</p>
          </CaseStudySection>

          <CaseStudySection label="ARCHITECTURE">
            <div className="max-w-md">
              <PipelineDiagram stages={[...cs.pipeline]} />
            </div>
          </CaseStudySection>

          <CaseStudySection label="TECHNOLOGY">
            <div className="flex flex-wrap gap-2">
              {cs.technologies.map((t) => (
                <TechBadge key={t} label={t} />
              ))}
            </div>
          </CaseStudySection>

          <CaseStudySection label="RESULTS">
            <ul className="max-w-2xl space-y-3">
              {cs.results.map((r) => (
                <li
                  key={r}
                  className="relative pl-5 leading-relaxed text-fg-mid before:absolute before:left-0 before:top-[10px] before:h-1 before:w-2 before:bg-accent/60"
                >
                  {r}
                </li>
              ))}
            </ul>
          </CaseStudySection>

          <CaseStudySection label="KEY LEARNINGS">
            <ul className="max-w-2xl space-y-3">
              {cs.learnings.map((l) => (
                <li
                  key={l}
                  className="relative pl-5 leading-relaxed text-fg-mid before:absolute before:left-0 before:top-[10px] before:h-1 before:w-2 before:bg-accent/60"
                >
                  {l}
                </li>
              ))}
            </ul>
          </CaseStudySection>
        </div>
      </main>
      <Footer />
    </>
  );
}
