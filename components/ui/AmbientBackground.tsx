"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Site-wide ambient backdrop: a cursor-following indigo glow, two slowly
 * drifting aurora blobs, and a faint film-grain wash. Lives on a fixed
 * -z-10 layer behind all content (the page background sits on <html> so
 * this layer stays visible).
 *
 * Also powers the `.spotlight-card` hover highlight by writing the pointer
 * position into CSS variables on the card under the cursor — one delegated
 * listener instead of a client component per card.
 */
export function AmbientBackground() {
  const glowRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const glow = glowRef.current;
    if (!glow) return;

    let raf = 0;
    let idle = true;
    const target = { x: window.innerWidth / 2, y: window.innerHeight * 0.35 };
    const pos = { ...target };

    const apply = () => {
      glow.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
    };

    // Lerp toward the pointer so the glow trails with a little inertia,
    // then park the rAF loop once it settles.
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.08;
      pos.y += (target.y - pos.y) * 0.08;
      apply();
      if (Math.abs(target.x - pos.x) < 0.5 && Math.abs(target.y - pos.y) < 0.5) {
        idle = true;
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const onPointerMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (idle) {
        idle = false;
        raf = requestAnimationFrame(loop);
      }

      const card = (e.target as Element | null)?.closest?.(".spotlight-card");
      if (card instanceof HTMLElement) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--sx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--sy", `${e.clientY - rect.top}px`);
      }
    };

    apply();
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [reduceMotion]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="aurora-blob aurora-blob-a" />
      <div className="aurora-blob aurora-blob-b" />
      <div
        ref={glowRef}
        className="cursor-glow absolute left-0 top-0 h-[44rem] w-[44rem] rounded-full will-change-transform"
        style={{ transform: "translate3d(50vw, 35vh, 0) translate(-50%, -50%)" }}
      />
      <div className="grain absolute inset-0" />
    </div>
  );
}
