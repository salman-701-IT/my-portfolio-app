"use client";

import * as React from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

interface UseCountUpOptions {
  value: number;
  duration?: number;
  decimals?: number;
}

/**
 * Count-up hook that triggers on in-view. When the count finishes, flips
 * `isDone` true so the caller can show a subtle "pop" (scale 1.15→1) and a
 * gold flash on the number.
 */
export function useCountUp({
  value,
  duration = 1.6,
  decimals = 0,
}: UseCountUpOptions) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = React.useState(reduce ? value : 0);
  const [isDone, setIsDone] = React.useState(reduce);

  React.useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      setIsDone(true);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        setDisplay(v);
      },
      onComplete() {
        setIsDone(true);
      },
    });
    return () => controls.stop();
  }, [inView, value, duration, reduce]);

  const formatted = React.useMemo(() => {
    if (Number.isInteger(value) && decimals === 0) {
      return Math.round(display).toLocaleString();
    }
    return display.toFixed(decimals);
  }, [display, decimals, value]);

  return { ref, formatted, isDone };
}
