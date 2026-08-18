"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Hammer,
  BookOpen,
  Users,
  Megaphone,
  Boxes,
  Brain,
  Target,
  type LucideIcon,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";

const METHODOLOGY_STEPS = [
  "Problem Discovery",
  "Requirement Analysis",
  "Product Design",
  "Architecture",
  "Development",
  "Testing",
  "Deployment",
  "Feedback",
  "Optimization",
  "Scale",
];

interface PhilosophyCard {
  title: string;
  body: string;
}

const PHILOSOPHY: PhilosophyCard[] = [
  {
    title: "Product Philosophy",
    body: "A product must answer: What problem does it solve? Who benefits? Can it scale?",
  },
  {
    title: "Business Philosophy",
    body: "Combine Human Expertise + Software + AI + Automation. AI eliminates repetitive work so people focus on higher-value activities.",
  },
  {
    title: "Leadership Philosophy",
    body: "Clear communication, defined ownership, accountability, consistent execution. A team should know 'why' — not just 'what'.",
  },
];

const PILLARS: { Icon: LucideIcon; title: string; body: string }[] = [
  {
    Icon: Hammer,
    title: "BUILD",
    body: "Ship real products — AI, software, EdTech, automation.",
  },
  {
    Icon: BookOpen,
    title: "LEARN",
    body: "Stay current with AI, engineering, and product thinking.",
  },
  {
    Icon: Users,
    title: "LEAD",
    body: "Coordinate teams with clarity, ownership, accountability.",
  },
  {
    Icon: Megaphone,
    title: "TEACH",
    body: "Mentor, train, and build learning ecosystems for the next builders.",
  },
];

export function Leadership() {
  const reduce = useReducedMotion();
  return (
    <section
      id="leadership"
      aria-labelledby="leadership-heading"
      className="scroll-mt-24 bg-muted/30 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          align="left"
          eyebrow="Leadership"
          title={
            <span id="leadership-heading">
              Problem first. Technology second.{" "}
              <span className="text-gradient-gold">Impact always.</span>
            </span>
          }
          description="How I lead product development — a 10-step methodology, three operating philosophies, and four personal brand pillars."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* LEFT: Methodology */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="relative h-full overflow-hidden p-6 sm:p-8">
              <div className="absolute -right-12 -top-12 size-44 rounded-full bg-accent-gold/5 blur-2xl" />
              <div className="relative flex flex-col gap-5">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-9 items-center justify-center rounded-lg border border-accent-gold/30 bg-accent-gold/10 text-accent-gold">
                    <Boxes className="size-[18px]" />
                  </span>
                  <h3 className="font-display text-base font-semibold tracking-tight">
                    Product Development Methodology
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  A disciplined 10-step lifecycle — from problem to scale. Each
                  phase has clear inputs, outputs, and ownership.
                </p>
                <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {METHODOLOGY_STEPS.map((step, idx) => (
                    <motion.li
                      key={step}
                      initial={reduce ? false : { opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                        delay: idx * 0.04,
                      }}
                      className="flex items-center gap-3 rounded-lg border border-border/70 bg-background/40 px-3 py-2.5 transition-colors hover:border-accent-gold/40 hover:bg-accent-gold/5"
                    >
                      <span className="font-display flex size-7 shrink-0 items-center justify-center rounded-md border border-accent-gold/40 bg-accent-gold/10 text-xs font-bold text-accent-gold">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-medium">{step}</span>
                    </motion.li>
                  ))}
                </ol>
              </div>
            </Card>
          </motion.div>

          {/* RIGHT: Philosophy cards */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-lg border border-accent-blue/30 bg-accent-blue/10 text-accent-blue">
                <Brain className="size-[18px]" />
              </span>
              <h3 className="font-display text-base font-semibold tracking-tight">
                Operating Philosophies
              </h3>
            </div>
            {PHILOSOPHY.map((p, idx) => (
              <motion.div
                key={p.title}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.1 + idx * 0.07,
                }}
              >
                <Card className="group relative overflow-hidden p-5 transition-all hover:-translate-y-0.5 hover:border-accent-gold/40">
                  <div className="absolute -right-6 -top-6 size-20 rounded-full bg-accent-gold/5 transition-transform duration-500 group-hover:scale-[1.6]" />
                  <div className="relative flex flex-col gap-2">
                    <h4 className="font-display text-sm font-semibold tracking-tight">
                      {p.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {p.body}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Personal brand pillars */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-lg border border-accent-gold/30 bg-accent-gold/10 text-accent-gold">
              <Target className="size-[18px]" />
            </span>
            <h3 className="font-display text-base font-semibold tracking-tight">
              Personal Brand Pillars
            </h3>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: idx * 0.06,
                }}
              >
                <Card className="group relative h-full overflow-hidden p-5 transition-all hover:-translate-y-1 hover:border-accent-gold/50 hover:shadow-[0_0_36px_-12px_var(--accent-gold)]">
                  <div className="absolute -right-8 -top-8 size-24 rounded-full bg-accent-gold/5 transition-transform duration-500 group-hover:scale-[1.8]" />
                  <div className="relative flex flex-col gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl border border-accent-gold/30 bg-accent-gold/10 text-accent-gold transition-all group-hover:scale-110">
                      <pillar.Icon className="size-5" />
                    </span>
                    <h4 className="font-display text-base font-bold tracking-[0.1em] text-foreground">
                      {pillar.title}
                    </h4>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {pillar.body}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
