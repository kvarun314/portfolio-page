import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { SkillEcosystem } from "@/components/skills/SkillEcosystem";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/navigation/Footer";
import { profile } from "@/data/profile";
import { SITE_URL } from "@/lib/utils";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  email: `mailto:${profile.email}`,
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  sameAs: [profile.linkedin, profile.github],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "PES University" },
    { "@type": "CollegeOrUniversity", name: "Jain University" },
  ],
  knowsAbout: [
    "Full-Stack Development",
    "Data Engineering",
    "Data Science",
    "Machine Learning",
    "Computer Vision",
    "Generative AI",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          // Escape < so the payload can never close the script tag early
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <ExperienceTimeline />
        <ProjectsSection />
        <SkillEcosystem />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
