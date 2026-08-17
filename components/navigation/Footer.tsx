import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 md:flex-row md:px-8">
        <div>
          <p className="text-sm font-medium text-fg">{profile.name}</p>
          <p className="mt-0.5 font-mono text-xs text-fg-dim">
            {profile.title} · © {new Date().getFullYear()}
          </p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-fg-dim transition-colors duration-200 hover:text-fg"
          >
            <GitHubIcon className="h-4.5 w-4.5" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-fg-dim transition-colors duration-200 hover:text-fg"
          >
            <LinkedInIcon className="h-4.5 w-4.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
