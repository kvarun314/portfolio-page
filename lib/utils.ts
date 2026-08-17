export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// GitHub Pages serves project repos under /<repo-name>/, so production
// builds need every root-absolute asset URL prefixed. Next's own <Link>
// and metadata file conventions apply this automatically; only raw
// `<a href="/...">` tags (e.g. the resume download link) need it by hand.
export const BASE_PATH =
  process.env.NODE_ENV === "production" ? "/portfolio-page" : "";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (BASE_PATH
    ? `https://kvarun314.github.io${BASE_PATH}`
    : "http://localhost:3000");
