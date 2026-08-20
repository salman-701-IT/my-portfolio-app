"use client";

import * as React from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

/**
 * One-time page entrance: the whole page fades in + a thin gold line sweeps
 * across the top on first mount. Under 600ms. Respects reduced motion.
 *
 * Decorative — `aria-hidden`. Renders once on mount.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [done, setDone] = React.useState(false);

  return (
    <div className="relative">
      <AnimatePresence>
        {!reduce && !done ? (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-px origin-left bg-gradient-to-r from-transparent via-accent-gold to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => setDone(true)}
          />
        ) : null}
      </AnimatePresence>

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
