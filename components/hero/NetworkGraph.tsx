"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

const NODE_COUNT = 42;
const LINK_DIST = 130;
const POINTER_RADIUS = 200;

/* Reads the theme's canvas accent (defined as "r, g, b" in globals.css) */
const readAccent = () =>
  getComputedStyle(document.documentElement)
    .getPropertyValue("--net-accent")
    .trim() || "129, 140, 248";

/**
 * Lightweight canvas network graph — drifting nodes with proximity links,
 * evoking an embedding space / graph structure. Nodes near the pointer are
 * gently attracted and link to it, so the graph reacts as you move around.
 * Pauses off-screen and renders a static frame under prefers-reduced-motion.
 */
export function NetworkGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let visible = true;
    let accent = readAccent();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    const pointer = { x: -9999, y: -9999, active: false };

    // Re-read the accent when the theme class on <html> flips
    const themeObserver = new MutationObserver(() => {
      accent = readAccent();
      if (reduceMotion) draw(false);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const size = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return rect;
    };

    const init = () => {
      const rect = size();
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1.2 + Math.random() * 1.6,
      }));
    };

    const draw = (animate: boolean) => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      if (animate) {
        for (const n of nodes) {
          // Gentle attraction toward the pointer, capped so nodes drift rather than snap
          if (pointer.active) {
            const dx = pointer.x - n.x;
            const dy = pointer.y - n.y;
            const dist = Math.hypot(dx, dy);
            if (dist < POINTER_RADIUS && dist > 1) {
              const force = ((POINTER_RADIUS - dist) / POINTER_RADIUS) * 0.012;
              n.vx += (dx / dist) * force;
              n.vy += (dy / dist) * force;
            }
          }
          // Cap velocity so pointer forces never accelerate nodes indefinitely
          const speed = Math.hypot(n.vx, n.vy);
          if (speed > 0.8) {
            n.vx = (n.vx / speed) * 0.8;
            n.vy = (n.vy / speed) * 0.8;
          }
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > rect.width) n.vx *= -1;
          if (n.y < 0 || n.y > rect.height) n.vy *= -1;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.28;
            ctx.strokeStyle = `rgba(${accent}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Brighter links from nearby nodes to the pointer itself
      if (pointer.active) {
        for (const n of nodes) {
          const dist = Math.hypot(n.x - pointer.x, n.y - pointer.y);
          if (dist < POINTER_RADIUS) {
            const alpha = (1 - dist / POINTER_RADIUS) * 0.45;
            ctx.strokeStyle = `rgba(${accent}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = `rgba(${accent}, 0.75)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (!running) return;
      if (visible) draw(true);
      raf = requestAnimationFrame(loop);
    };

    init();

    if (reduceMotion) {
      draw(false);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    const onResize = () => {
      init();
      if (reduceMotion) draw(false);
    };
    window.addEventListener("resize", onResize);

    // The canvas sits behind other content, so track the pointer at the
    // window level and translate into canvas coordinates.
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active =
        pointer.x >= 0 &&
        pointer.x <= rect.width &&
        pointer.y >= 0 &&
        pointer.y <= rect.height;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerdown", onPointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
