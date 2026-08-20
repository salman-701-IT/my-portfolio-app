"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  Code2,
  Rocket,
  Building2,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";
import {
  fadeLeft,
  fadeRight,
  staggerItem,
  withReducedMotion,
} from "./motion-variants";

interface JourneyStep {
  Icon: LucideIcon;
  title: string;
  description: string;
}

const STEPS: JourneyStep[] = [
  {
    Icon: Sparkles,
    title: "Curiosity",
    description:
      "Started with an interest in programming and software development.",
  },
  {
    Icon: Code2,
    title: "Building",
    description:
      "Moved into web development, software engineering, and AI/data science.",
  },
  {
    Icon: Rocket,
    title: "Product Thinking",
    description:
      "Shifted from learning languages to understanding how complete products are created.",
  },
  {
    Icon: Building2,
    title: "Entrepreneurship",
    description:
      "Founded Yumaris Agency to build products across AI, software, education, and automation.",
  },
  {
    Icon: TrendingUp,
    title: "Scaling",
    description:
      "Now building AI agents, RAG systems, EdTech ecosystems, and business automation platforms.",
  },
];

function Step({
  step,
  index,
  isLast,
}: {
  step: JourneyStep;
  index: number;
  isLast: boolean;
}) {
  const reduce = useReducedMotion();
  // Alternate left/right reveal direction for visual rhythm.
  const stepVariants = withReducedMotion(
    index % 2 === 0 ? fadeLeft({ delay: 0.05, duration: 0.55 }) : fadeRight({ delay: 0.05, duration: 0.55 }),
    reduce,
  );
  return (
    <motion.li
      variants={stepVariants}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="relative flex flex-1 flex-col items-start gap-4"
    >
      {/* Connector line (horizontal) */}
      {!isLast ? (
        <span
          aria-hidden="true"
          className="absolute left-7 top-7 hidden h-px w-[calc(100%-1.5rem)] bg-gradient-to-r from-accent-gold/40 via-border to-transparent md:block"
        />
      ) : null}

      {/* Node */}
      <div className="relative flex items-center gap-4">
        <motion.span
          initial={reduce ? false : { scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.4,
            delay: index * 0.1 + 0.1,
            type: "spring",
            stiffness: 200,
          }}
          className="relative flex size-14 shrink-0 items-center justify-center rounded-full border border-accent-gold/40 bg-background text-accent-gold shadow-[0_0_24px_-8px_var(--accent-gold)]"
        >
          <step.Icon className="size-6" />
          <span className="absolute inset-0 -z-10 rounded-full bg-accent-gold/10 blur-[8px]" />
        </motion.span>
        <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Step {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="font-display text-xl font-bold tracking-tight-display">
          {step.title}
        </h3>
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
          {step.description}
        </p>
      </div>
    </motion.li>
  );
}

export function Journey() {
  const reduce = useReducedMotion();
  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="scroll-mt-24 bg-muted/30 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          align="left"
          eyebrow="My Journey"
          title={
            <span id="journey-heading">
              From &ldquo;how do I build software?&rdquo; to{" "}
              <span className="text-gradient-gold">
                &ldquo;what problem should I solve?&rdquo;
              </span>
            </span>
          }
          description="A five-step evolution — from curious beginner to founder building AI products, EdTech platforms, and automation systems."
        />

        {/* Horizontal stepper (md+) */}
        <ol className="mt-16 hidden flex-row items-start gap-8 md:flex">
          {STEPS.map((step, idx) => (
            <Step
              key={step.title}
              step={step}
              index={idx}
              isLast={idx === STEPS.length - 1}
            />
          ))}
        </ol>

        {/* Vertical stepper (mobile) */}
        <ol className="mt-12 flex flex-col gap-8 md:hidden">
          {STEPS.map((step, idx) => (
            <Step
              key={step.title}
              step={step}
              index={idx}
              isLast={idx === STEPS.length - 1}
            />
          ))}
        </ol>

        {/* Pull-quote */}
        <motion.div
          variants={withReducedMotion(staggerItem({ duration: 0.6 }), reduce)}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <Card className="mt-16 overflow-hidden p-8 sm:p-12">
            <div className="absolute -right-12 -top-12 size-44 rounded-full bg-accent-gold/5 blur-2xl" />
            <div className="relative flex flex-col items-center gap-4 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-gold">
                Operating Philosophy
              </span>
              <p className="font-display text-balance text-2xl font-bold leading-snug tracking-tight-display sm:text-4xl">
                Problem First.{" "}
                <span className="text-gradient-gold">Technology Second.</span>{" "}
                Impact Always.
              </p>
              <p className="max-w-xl text-sm text-muted-foreground">
                Every product I build starts with the problem. Technology is the
                instrument — impact is the goal.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
