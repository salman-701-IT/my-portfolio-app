"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  staggerContainer,
  staggerItem,
  blurIn,
  withReducedMotion,
  viewportOnce,
  fadeRight,
} from "./motion-variants";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

const eyebrowItem: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const underlineVariants: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const reduce = useReducedMotion();
  const container = withReducedMotion(
    staggerContainer({ staggerChildren: 0.1, delayChildren: 0.05 }),
    reduce,
  );
  const titleVariants = withReducedMotion(blurIn({ duration: 0.7 }), reduce);
  const descVariants = withReducedMotion(
    fadeRight({ delay: 0.05, duration: 0.6 }),
    reduce,
  );
  const underline = withReducedMotion(underlineVariants, reduce);
  const eyebrowV = withReducedMotion(eyebrowItem, reduce);
  const item = withReducedMotion(staggerItem(), reduce);

  return (
    <motion.div
      variants={container}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={viewportOnce}
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <motion.div variants={eyebrowV} className="flex flex-col items-start gap-2">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-accent-gold">
            <span className="relative flex size-1.5">
              <span className="size-1.5 rounded-full bg-accent-gold" />
            </span>
            {eyebrow}
          </span>
          {/* Animated gold underline that scales in from left under the kicker. */}
          <motion.span
            aria-hidden="true"
            variants={underline}
            className="block h-px w-12 origin-left bg-gradient-to-r from-accent-gold to-transparent"
          />
        </motion.div>
      ) : null}
      <motion.h2
        variants={titleVariants}
        className="font-display max-w-3xl text-balance text-4xl font-bold leading-[1.1] tracking-tight-display sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          variants={descVariants}
          className={cn(
            "max-w-2xl text-balance text-sm leading-relaxed text-muted-foreground sm:text-base",
            align === "center" ? "mx-auto" : "",
          )}
        >
          {description}
        </motion.p>
      ) : null}
      {/* Hidden stagger item to keep container variance fluent if no description. */}
      <motion.span variants={item} aria-hidden="true" className="sr-only" />
    </motion.div>
  );
}
