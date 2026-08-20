"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max translate in px. Default 6. */
  strength?: number;
  /** Hover radius in px within which magnetic effect is active. Default 80. */
  radius?: number;
  as?: "div";
}

/**
 * Magnetic wrapper: gently translates its child toward the cursor when hovered
 * within `radius` px. Resets on leave. Disabled under `prefers-reduced-motion`
 * and on touch devices (no hover capability).
 *
 * Wrap a `Button` (with `asChild` not set) inside this — pass the button as
 * the child.
 */
export const MagneticButton = React.forwardRef<
  HTMLDivElement,
  MagneticButtonProps
>(function MagneticButton(
  { children, strength = 6, radius = 80, className, ...rest },
  ref,
) {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  React.useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > radius) {
      x.set(0);
      y.set(0);
      return;
    }
    const factor = 1 - dist / radius;
    x.set((dx / radius) * strength * factor);
    y.set((dy / radius) * strength * factor);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={(node) => {
        containerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      style={enabled && !reduce ? { x: sx, y: sy } : undefined}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={cn("inline-flex", className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
});
