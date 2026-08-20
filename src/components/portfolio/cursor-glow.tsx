"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/**
 * A fixed, pointer-events-none blurred gold radial gradient that softly
 * follows the cursor with a spring lag. Desktop-only (hidden md:block),
 * disabled under `prefers-reduced-motion`.
 *
 * Decorative — marked `aria-hidden`.
 */
export function CursorGlow() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = React.useState(false);

  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 22, mass: 0.6 });

  React.useEffect(() => {
    if (reduce) return;
    // Only enable on md+ (pointer:fine) devices.
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX - 200);
      y.set(e.clientY - 200);
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("mousemove", onMove);
    };
  }, [reduce, x, y]);

  if (reduce || !enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: sx,
        y: sy,
        opacity: 0.25,
      }}
      className="pointer-events-none fixed left-0 top-0 z-[55] hidden h-[400px] w-[400px] mix-blend-screen rounded-full md:block"
    >
      <div
        className="size-full rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, var(--accent-gold), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </motion.div>
  );
}
