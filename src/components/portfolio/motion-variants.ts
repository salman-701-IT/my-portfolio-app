"use client";

import * as React from "react";
import { useReducedMotion, type Variants } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  Shared viewport config                                                    */
/* -------------------------------------------------------------------------- */

/** Standard "reveal once" viewport config used across all scroll animations. */
export const viewportOnce = { once: true, margin: "-80px" } as const;

/** A slightly tighter viewport margin for inner/child reveals. */
export const viewportOnceTight = { once: true, margin: "-60px" } as const;

/* -------------------------------------------------------------------------- */
/*  Easing                                                                    */
/* -------------------------------------------------------------------------- */

/** Premium editorial ease-out cubic — used everywhere for consistency. */
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------- */
/*  Directional reveal variants                                               */
/* -------------------------------------------------------------------------- */

interface RevealOptions {
  delay?: number;
  duration?: number;
}

/** Opacity 0→1, y 28→0. */
export function fadeUp(opts: RevealOptions = {}): Variants {
  const { delay = 0, duration = 0.6 } = opts;
  return {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration, delay, ease: EASE_OUT },
    },
  };
}

/** Opacity 0→1, y -28→0 (downward reveal). */
export function fadeDown(opts: RevealOptions = {}): Variants {
  const { delay = 0, duration = 0.6 } = opts;
  return {
    hidden: { opacity: 0, y: -28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration, delay, ease: EASE_OUT },
    },
  };
}

/** Opacity 0→1, x 40→0 (slide-in from right). */
export function fadeLeft(opts: RevealOptions = {}): Variants {
  const { delay = 0, duration = 0.6 } = opts;
  return {
    hidden: { opacity: 0, x: 40 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration, delay, ease: EASE_OUT },
    },
  };
}

/** Opacity 0→1, x -40→0 (slide-in from left). */
export function fadeRight(opts: RevealOptions = {}): Variants {
  const { delay = 0, duration = 0.6 } = opts;
  return {
    hidden: { opacity: 0, x: -40 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration, delay, ease: EASE_OUT },
    },
  };
}

/** Opacity 0→1, scale 0.92→1. */
export function scaleIn(opts: RevealOptions = {}): Variants {
  const { delay = 0, duration = 0.55 } = opts;
  return {
    hidden: { opacity: 0, scale: 0.92 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration, delay, ease: EASE_OUT },
    },
  };
}

/** Opacity 0→1, filter blur(12px)→blur(0). GPU-friendly blur reveal. */
export function blurIn(opts: RevealOptions = {}): Variants {
  const { delay = 0, duration = 0.7 } = opts;
  return {
    hidden: { opacity: 0, filter: "blur(12px)" },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration, delay, ease: EASE_OUT },
    },
  };
}

/* -------------------------------------------------------------------------- */
/*  Stagger container + item                                                  */
/* -------------------------------------------------------------------------- */

interface StaggerOptions {
  staggerChildren?: number;
  delayChildren?: number;
}

/** Container that staggers its children. Pair with `staggerItem`. */
export function staggerContainer(opts: StaggerOptions = {}): Variants {
  const { staggerChildren = 0.08, delayChildren = 0 } = opts;
  return {
    hidden: {},
    show: {
      transition: { staggerChildren, delayChildren },
    },
  };
}

/** Default child for `staggerContainer` — fades up. */
export function staggerItem(opts: RevealOptions = {}): Variants {
  const { delay = 0, duration = 0.55 } = opts;
  return {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration, delay, ease: EASE_OUT },
    },
  };
}

/* -------------------------------------------------------------------------- */
/*  Reduced-motion variants                                                   */
/* -------------------------------------------------------------------------- */

/**
 * If the user prefers reduced motion, returns a variant where `hidden` matches
 * `show` so no transition occurs. Otherwise returns the original variants.
 */
export function withReducedMotion(variants: Variants, reduce: boolean | null): Variants {
  if (!reduce) return variants;
  const show = variants.show ?? {};
  return {
    hidden: show,
    show: { transition: { duration: 0 } },
  };
}

/* -------------------------------------------------------------------------- */
/*  Convenience hook                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Wraps framer-motion's `useReducedMotion` and exposes the shared viewport
 * config. Use this in components so they all behave consistently.
 */
export function useMotionConfig() {
  const prefersReducedMotion = useReducedMotion();
  return React.useMemo(
    () => ({ prefersReducedMotion, viewportOnce, viewportOnceTight }),
    [prefersReducedMotion],
  );
}

/* -------------------------------------------------------------------------- */
/*  Small helpers for inline motion props                                     */
/* -------------------------------------------------------------------------- */

/**
 * Returns props for a motion element that should reveal on scroll.
 * Respects reduced motion (renders final state, no transition).
 */
export function revealProps(
  variants: Variants,
  reduce: boolean | null,
  extra?: Record<string, unknown>,
) {
  if (reduce) {
    return {
      initial: false,
      animate: "show",
      variants,
      viewport: viewportOnce,
      ...extra,
    };
  }
  return {
    initial: "hidden",
    whileInView: "show",
    variants,
    viewport: viewportOnce,
    ...extra,
  };
}
