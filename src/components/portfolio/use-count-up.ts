"use client";

import * as React from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

interface UseCountUpOptions {
  value: number;
  duration?: number;
  decimals?: number;
}

export function useCountUp({
  value,
  duration = 1.6,
  decimals = 0,
}: UseCountUpOptions) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = React.useState(reduce ? value : 0);

  React.useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        setDisplay(v);
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

  return { ref, formatted };
}
