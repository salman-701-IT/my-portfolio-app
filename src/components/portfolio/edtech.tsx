"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Code2,
  BarChart3,
  BrainCircuit,
  MousePointerClick,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";

interface CourseTrack {
  Icon: LucideIcon;
  title: string;
  focusAreas: string[];
}

const TRACKS: CourseTrack[] = [
  {
    Icon: Code2,
    title: "Full Stack Java",
    focusAreas: ["Java", "Spring Boot", "APIs", "Databases", "Full-stack projects"],
  },
  {
    Icon: Code2,
    title: "Full Stack Python",
    focusAreas: ["Python", "Backend", "APIs", "Databases", "Applications"],
  },
  {
    Icon: BarChart3,
    title: "Data Science",
    focusAreas: ["Python", "Statistics", "Data analysis", "Visualization", "ML", "Projects"],
  },
  {
    Icon: BrainCircuit,
    title: "AI & ML Engineering",
    focusAreas: ["AI fundamentals", "ML", "Generative AI", "LLMs", "AI engineering"],
  },
  {
    Icon: MousePointerClick,
    title: "No-Code Web Development",
    focusAreas: ["Build websites without deep programming"],
  },
];

const INTERNSHIP_ROLES = [
  "Frontend",
  "Backend",
  "Full Stack",
  "Python",
  "AI/ML",
  "Data Science",
  "DevOps",
  "QA",
  "Sales",
  "Business Development",
  "Content",
];

export function EdTech() {
  const reduce = useReducedMotion();
  return (
    <section
      id="edtech"
      aria-labelledby="edtech-heading"
      className="scroll-mt-24 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          align="left"
          eyebrow="EdTech"
          title={
            <span id="edtech-heading">
              Bridging academics and{" "}
              <span className="text-gradient-gold">industry-ready skills.</span>
            </span>
          }
          description="Education is core to the Yumaris ecosystem — not just courses, but a complete student journey: Learn → Practice → Build → Intern → Portfolio → Career."
        />

        {/* Course tracks grid */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TRACKS.map((track, idx) => (
            <motion.div
              key={track.title}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
                delay: idx * 0.06,
              }}
            >
              <Card className="group relative h-full overflow-hidden p-6 transition-all hover:-translate-y-1 hover:border-accent-gold/40 hover:shadow-[0_0_36px_-12px_var(--accent-gold)]">
                <div className="absolute -right-10 -top-10 size-32 rounded-full bg-accent-gold/5 transition-transform duration-500 group-hover:scale-150" />
                <div className="relative flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-xl border border-accent-gold/30 bg-accent-gold/10 text-accent-gold transition-all group-hover:scale-110 group-hover:shadow-[0_0_24px_-6px_var(--accent-gold)]">
                      <track.Icon className="size-5" />
                    </span>
                    <h3 className="font-display text-base font-semibold tracking-tight">
                      {track.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {track.focusAreas.map((focus) => (
                      <span
                        key={focus}
                        className="rounded-full border border-border/70 bg-background/60 px-2.5 py-0.5 text-[11px] font-medium text-foreground/80 transition-colors hover:border-accent-gold/50 hover:text-accent-gold"
                      >
                        {focus}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Internship Ecosystem full-width card */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="mt-10 overflow-hidden p-8 sm:p-10">
            <div className="absolute -right-12 -top-12 size-44 rounded-full bg-accent-gold/8 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_1.1fr]">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-10 items-center justify-center rounded-xl border border-accent-gold/30 bg-accent-gold/10 text-accent-gold">
                    <GraduationCap className="size-5" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-gold">
                    Internship Ecosystem
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold tracking-tight-display sm:text-3xl">
                  Real roles. Real teams. Real output.
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Interns at Yumaris don&apos;t just watch — they join a
                  functional team, build with mentors, ship features, and walk
                  away with portfolio-grade work.
                </p>
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Internship Roles
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {INTERNSHIP_ROLES.map((role) => (
                      <span
                        key={role}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-medium text-foreground/90 transition-colors hover:border-accent-gold/50 hover:text-accent-gold"
                      >
                        <span className="size-1 rounded-full bg-accent-gold" />
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Philosophy pull-quote */}
              <div className="flex flex-col justify-center rounded-2xl border border-border/70 bg-muted/40 p-6 sm:p-8">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Philosophy
                </span>
                <p className="font-display mt-4 text-balance text-lg font-semibold leading-snug tracking-tight sm:text-2xl">
                  Learn <span className="text-accent-gold">→</span> Work in
                  Teams <span className="text-accent-gold">→</span> Build{" "}
                  <span className="text-accent-gold">→</span> Test{" "}
                  <span className="text-accent-gold">→</span> Document{" "}
                  <span className="text-accent-gold">→</span> Present.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Every internship follows a structured lifecycle — interns
                  learn, build, ship, document, and present their work, leaving
                  with real portfolio pieces and demonstrated experience.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
