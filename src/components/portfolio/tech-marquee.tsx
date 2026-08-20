"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";

const TECH = [
  "Java",
  "Python",
  "JavaScript",
  "React",
  "Next.js",
  "Spring Boot",
  "Node.js",
  "Tailwind CSS",
  "Three.js",
  "Firebase",
  "LLMs",
  "RAG",
  "AI Agents",
  "TensorFlow.js",
  "Docker",
  "AWS",
];

/**
 * Horizontal infinite marquee of core tech, with gold-dot separators.
 * Two rows scrolling opposite directions. Pauses on hover (CSS
 * `animation-play-state`). Falls back to a static strip when the user
 * prefers reduced motion (the global CSS override zeroes animation duration).
 *
 * Decorative — `aria-hidden`.
 */
export function TechMarquee() {
  const reduce = useReducedMotion();
  // Duplicate the list so the loop is seamless: container translates -50%.
  const items = [...TECH, ...TECH];

  return (
    <section
      aria-hidden="true"
      className="marquee-pause border-y border-border/40 bg-muted/20 py-6"
    >
      <div className="flex flex-col gap-4">
        <Row items={items} trackClass="marquee-track-left" reduce={!!reduce} />
        <Row
          items={[...items].reverse()}
          trackClass="marquee-track-right"
          reduce={!!reduce}
        />
      </div>
    </section>
  );
}

function Row({
  items,
  trackClass,
  reduce,
}: {
  items: string[];
  trackClass: string;
  reduce: boolean;
}) {
  return (
    <div className="relative flex w-full overflow-hidden">
      {/* Edge fades */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent"
      />
      <div
        className={`flex shrink-0 items-center gap-6 pr-6 ${
          reduce ? "" : trackClass
        }`}
      >
        {items.map((tech, idx) => (
          <span key={`${tech}-${idx}`} className="flex items-center gap-6">
            <span className="font-display text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {tech}
            </span>
            <span className="size-1 rounded-full bg-accent-gold/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
