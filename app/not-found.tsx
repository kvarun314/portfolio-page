import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-xs tracking-[0.3em] text-accent mb-4">
        404 · NOT FOUND
      </p>
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-fg">
        This page doesn&apos;t exist.
      </h1>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-md border border-line-bright px-5 py-3 text-sm text-fg-mid transition-all duration-200 hover:border-accent hover:text-fg"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back home
      </Link>
    </main>
  );
}
