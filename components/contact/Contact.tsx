import { Mail } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="absolute inset-0 grid-backdrop" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8 py-24 md:py-36 text-center">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.3em] text-accent mb-6">
            05 · CONTACT
          </p>
          <h2 className="mx-auto max-w-3xl text-3xl md:text-5xl font-semibold tracking-tight text-fg leading-tight">
            Let&apos;s build something intelligent.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-fg-mid leading-relaxed">
            Interested in computer vision, generative AI, or taking ML systems
            to production? I&apos;d love to hear from you.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-md bg-accent-strong px-5 py-3 text-sm font-medium text-white shadow-[0_0_24px_var(--glow-btn)] transition-all duration-200 hover:bg-accent hover:shadow-[0_0_36px_var(--glow-btn-hover)] cursor-pointer"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Get in touch
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-line-bright px-5 py-3 text-sm font-medium text-fg-mid transition-all duration-200 hover:border-accent hover:text-fg cursor-pointer"
            >
              <LinkedInIcon className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-line-bright px-5 py-3 text-sm font-medium text-fg-mid transition-all duration-200 hover:border-accent hover:text-fg cursor-pointer"
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
            </a>
          </div>

          <p className="mt-10 font-mono text-xs text-fg-dim">
            {profile.email} · {profile.phone}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
