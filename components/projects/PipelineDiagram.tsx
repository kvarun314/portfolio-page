"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";

/**
 * Animated vertical pipeline — each stage fades in sequentially with a
 * connector, visualizing an ML processing flow.
 */
export function PipelineDiagram({ stages }: { stages: string[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <ol className="relative">
      {stages.map((stage, i) => (
        <motion.li
          key={stage}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="flex items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3">
            <span className="font-mono text-[10px] text-accent w-6 shrink-0">
              {String(i).padStart(2, "0")}
            </span>
            <span className="text-sm text-fg">{stage}</span>
          </div>
          {i < stages.length - 1 && (
            <div
              aria-hidden="true"
              className="flex justify-center py-1 text-fg-dim"
            >
              <ChevronRight className="h-4 w-4 rotate-90" />
            </div>
          )}
        </motion.li>
      ))}
    </ol>
  );
}
