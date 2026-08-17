import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Static OG card in the site's dark palette, rendered at build time.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0a0a0f",
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 70% 20%, rgba(99,102,241,0.25), transparent 70%)",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.3em",
            color: "#818cf8",
            marginBottom: 28,
          }}
        >
          {profile.eyebrow}
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            color: "#ecedf2",
            lineHeight: 1.05,
          }}
        >
          {profile.name}
        </div>
        <div style={{ fontSize: 34, color: "#a3a4b2", marginTop: 30 }}>
          4+ years of full-stack production engineering · published
          zero-shot computer vision research
        </div>
        <div style={{ fontSize: 26, color: "#71728a", marginTop: 44 }}>
          {profile.location}
        </div>
      </div>
    ),
    size
  );
}
