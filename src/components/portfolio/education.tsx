"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  GraduationCap,
  Trophy,
  Medal,
  Award,
  Lightbulb,
  Leaf,
  CalendarDays,
  type LucideIcon,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "./section-heading";

const COURSEWORK = [
  "Data Structures",
  "DBMS",
  "Operating Systems",
  "Computer Networks",
  "Web Technologies",
  "AI/ML",
];

interface Achievement {
  Icon: LucideIcon;
  title: string;
  note: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    Icon: Trophy,
    title: "IIT Bombay Hackathon",
    note: "Participant",
  },
  {
    Icon: Medal,
    title: "Hackathon, Bangalore",
    note: "Global Academy of Institution",
  },
  {
    Icon: Award,
    title: "CodeCode Competitions",
    note: "Competitive programming",
  },
  {
    Icon: Lightbulb,
    title: "Design Thinking Workshops",
    note: "IIC / School of Design Thinking",
  },
  {
    Icon: Leaf,
    title: "Green Campus IoT Challenge",
    note: "IoT-based sustainability",
  },
  {
    Icon: Trophy,
    title: "Multiple Hackathons & Workshops",
    note: "Active participant",
  },
];

export function Education() {
  const reduce = useReducedMotion();
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="scroll-mt-24 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Background"
          title={
            <span id="education-heading">
              Education &amp;{" "}
              <span className="text-gradient-gold">achievements</span>
            </span>
          }
          description="A B.E. in Information Technology at Anna University, sharpened by hackathons, design-thinking labs, and IoT challenges."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          {/* Education card */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="group relative h-full overflow-hidden p-6 sm:p-8">
              <div className="absolute -right-12 -top-12 size-44 rounded-full bg-accent-gold/5 blur-2xl transition-transform duration-500 group-hover:scale-150" />
              <div className="relative flex h-full flex-col gap-6">
                <div className="flex items-start gap-4">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-accent-gold/40 bg-accent-gold/10 text-accent-gold shadow-[0_0_24px_-8px_var(--accent-gold)]">
                    <GraduationCap className="size-7" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-bold tracking-tight">
                      B.E. — Information Technology
                    </h3>
                    <p className="text-sm font-medium text-accent-gold">
                      Mohamed Sathak A J College of Engineering (MSAJCE)
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Anna University · Chennai
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                    <CalendarDays className="size-3.5" />
                    2021 — 2025
                  </span>
                  <Badge
                    variant="secondary"
                    className="border-accent-gold/30 bg-accent-gold/10 text-[11px] text-accent-gold"
                  >
                    Pursuing
                  </Badge>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  Focus: AI, Computer Vision, full-stack web, and 3D interactive
                  experiences.
                </p>

                <div className="flex flex-col gap-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-accent-gold">
                    Coursework
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {COURSEWORK.map((c) => (
                      <span
                        key={c}
                        className="rounded-md border border-border/70 bg-background/60 px-2 py-0.5 text-[11px] font-medium text-foreground/80"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Achievements grid */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          >
            <div className="grid h-full gap-4 sm:grid-cols-2">
              {ACHIEVEMENTS.map((a, idx) => (
                <motion.div
                  key={a.title}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.05 + idx * 0.05,
                  }}
                >
                  <Card className="group relative h-full overflow-hidden p-5 transition-all hover:-translate-y-1 hover:border-accent-gold/50 hover:shadow-[0_0_36px_-12px_var(--accent-gold)]">
                    <div className="absolute -right-8 -top-8 size-24 rounded-full bg-accent-gold/5 transition-transform duration-500 group-hover:scale-[1.8]" />
                    <div className="relative flex flex-col gap-3">
                      <span className="flex size-10 items-center justify-center rounded-xl border border-accent-gold/30 bg-accent-gold/10 text-accent-gold transition-all group-hover:scale-110">
                        <a.Icon className="size-5" />
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <h4 className="text-sm font-semibold leading-tight tracking-tight">
                          {a.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">{a.note}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
