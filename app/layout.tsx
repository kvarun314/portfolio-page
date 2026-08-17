import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/utils";
import { profile } from "@/data/profile";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jbMono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} — Full Stack Engineer, AI/ML & Data Science`,
    template: `%s — ${profile.name}`,
  },
  description: profile.summary,
  keywords: [
    "Full-Stack Developer",
    "Software Engineer",
    "Data Scientist",
    "AI Engineer",
    "Machine Learning Engineer",
    "Computer Vision",
    "Generative AI",
    "Data Science",
    "Bengaluru",
  ],
  authors: [{ name: profile.name }],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${profile.name} — Full Stack Engineer, AI/ML & Data Science`,
    description: profile.summary,
    url: SITE_URL,
    siteName: profile.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Full Stack Engineer, AI/ML & Data Science`,
    description: profile.summary,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
    { media: "(prefers-color-scheme: light)", color: "#f7f7fb" },
  ],
};

// Runs before paint: applies the stored theme (or system preference) so the
// first frame renders in the right mode. Kept inline to avoid a flash.
const themeInit = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||(!t&&window.matchMedia("(prefers-color-scheme: light)").matches))document.documentElement.classList.add("light")}catch(e){}})()`;

// GitHub Pages can't serve custom HTTP headers, so CSP is delivered via
// <meta http-equiv> instead of next.config's headers(). The meta delivery
// mechanism can't carry frame-ancestors (silently ignored by browsers per
// spec) — X-Frame-Options / Permissions-Policy have no meta equivalent at
// all, so clickjacking/feature-policy protection is not available on this
// host. Same-origin hosting with a server (e.g. Vercel) would restore both.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jbMono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <meta httpEquiv="Content-Security-Policy" content={csp} />
      </head>
      <body className="min-h-full flex flex-col text-fg">
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <AmbientBackground />
        {children}
      </body>
    </html>
  );
}
