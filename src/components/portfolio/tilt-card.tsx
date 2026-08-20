"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max tilt angle in degrees. Default 6. */
  maxTilt?: number;
  /** Show cursor-follow glare highlight. Default true. */
  glare?: boolean;
  /** Disable the tilt entirely (e.g. inside an already-animated parent). */
  disabled?: boolean;
}

/**
 * 3D tilt card: tilts toward the cursor on hover with perspective. Includes
 * a soft gold glare/highlight that follows the cursor across the card. Resets
 * on leave. Subtle and premium — max ~6deg. Disabled under `prefers-reduced-
 * motion` and on touch devices (no hover capability).
 *
 * Pass the card content as `children`. The wrapper preserves all className
 * passthrough — apply the card's visual styling to the child, not here.
 */
export const TiltCard = React.forwardRef<HTMLDivElement, TiltCardProps>(
  function TiltCard(
    { children, maxTilt = 6, glare = true, className, ...rest },
    ref,
  ) {
    const reduce = useReducedMotion();
    const [enabled, setEnabled] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    // Pointer position as a fraction [0..1] of the card.
    const px = useMotionValue(0.5);
    const py = useMotionValue(0.5);

    const sx = useSpring(px, { stiffness: 220, damping: 20, mass: 0.5 });
    const sy = useSpring(py, { stiffness: 220, damping: 20, mass: 0.5 });

    const rotateX = useTransform(sy, [0, 1], [maxTilt, -maxTilt]);
    const rotateY = useTransform(sx, [0, 1], [-maxTilt, maxTilt]);

    // Glare position: -50% to 150% of the card across.
    const glareX = useTransform(sx, [0, 1], ["-20%", "120%"]);
    const glareY = useTransform(sy, [0, 1], ["-20%", "120%"]);

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
      px.set((e.clientX - rect.left) / rect.width);
      py.set((e.clientY - rect.top) / rect.height);
    };

    const reset = () => {
      px.set(0.5);
      py.set(0.5);
    };

    return (
      <motion.div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={
          enabled && !reduce
            ? {
                rotateX,
                rotateY,
                transformPerspective: 800,
                transformStyle: "preserve-3d",
              }
            : undefined
        }
        className={cn("relative", className)}
        {...rest}
      >
        {children}
        {enabled && !reduce && glare ? (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="absolute size-32 rounded-full"
              style={{
                left: glareX,
                top: glareY,
                translateX: "-50%",
                translateY: "-50%",
                background:
                  "radial-gradient(closest-side, oklch(0.83 0.13 82 / 0.18), transparent 70%)",
                filter: "blur(8px)",
                mixBlendMode: "screen",
              }}
            />
          </motion.div>
        ) : null}
      </motion.div>
    );
  },
);
