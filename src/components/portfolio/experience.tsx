"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Trophy,
  Award,
  Users,
  Rocket,
  BookOpen,
  CalendarDays,
  type LucideIcon,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "./section-heading";

interface TimelineEntry {
  period: string;
  role: string;
  company: string;
  type: "work" | "intern";
  bullets: string[];
  stack: string[];
}

const ENTRIES: TimelineEntry[] = [
  {
    period: "2023 — Present",
    role: "Founder & CEO",
    company: "Yumaris Agency",
    type: "work",
    bullets: [
      "Founded Yumaris Agency; lead AI, software, EdTech, and automation initiatives.",
      "Coordinate cross-functional teams across product, engineering, design, and education.",
    ],
    stack: ["AI", "Software", "EdTech", "Automation"],
  },
  {
    period: "2023",
    role: "DevOps & Monitoring Intern",
    company: "Apdeops Technologies Pvt. Ltd.",
    type: "intern",
    bullets: [
      "Zabbix monitoring, RMAN backup, deployment processes.",
      "Rotated across RIM / Monitoring / DevOps / Engineering teams.",
    ],
    stack: ["Zabbix", "RMAN", "DevOps", "Linux"],
  },
  {
    period: "2022",
    role: "Java Full Stack Intern",
    company: "Main Flow Services and Technologies Pvt. Ltd.",
    type: "intern",
    bullets: [
      "Java full-stack web development assignments.",
      "Built full-stack features using Java, JDBC, and front-end technologies.",
    ],
    stack: ["Java", "JDBC", "Web Dev"],
  },
  {
    period: "2022",
    role: "Intern",
    company: "CODSOFT",
    type: "intern",
    bullets: [
      "Internship project work and documentation.",
      "Delivered portfolio-ready applications and reports.",
    ],
    stack: ["Java", "Web Development"],
  },
];

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
    Icon: Rocket,
    title: "Founded Yumaris Agency",
    note: "Founded and lead a technology ecosystem across AI, software, EdTech, and automation.",
  },
  {
    Icon: Award,
    title: "Designed AI Agent Ecosystem",
    note: "Specialized AI agents for CEO, CFO, CMO, Sales, HR, and Document functions.",
  },
  {
    Icon: Briefcase,
    title: "Built HRMS & EdTech Product Concepts",
    note: "AI-powered HRMS, internship management platform, and assessment systems.",
  },
  {
    Icon: Users,
    title: "Coordinated Cross-Functional Teams",
    note: "Led teams across product, engineering, design, and education tracks.",
  },
  {
    Icon: BookOpen,
    title: "Created Internship Programs",
    note: "Structured internship lifecycle from registration to certificate.",
  },
  {
    Icon: Trophy,
    title: "Developed Technical Training Programs",
    note: "Course tracks in Full Stack Java, Python, Data Science, AI/ML, and No-Code.",
  },
];

function TimelineItem({
  entry,
  index,
}: {
  entry: TimelineEntry;
  index: number;
}) {
  const reduce = useReducedMotion();
  const isLast = index === ENTRIES.length - 1;
  const Icon = entry.type === "intern" ? GraduationCap : Briefcase;

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className="relative pl-12 sm:pl-16"
    >
      {/* Vertical line */}
      {!isLast ? (
        <span
          aria-hidden="true"
          className="absolute left-[18px] top-10 bottom-0 w-px bg-gradient-to-b from-accent-gold/60 via-border to-transparent sm:left-[22px]"
        />
      ) : null}

      {/* Node */}
      <motion.span
        initial={reduce ? false : { scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          duration: 0.4,
          delay: index * 0.08 + 0.1,
          type: "spring",
          stiffness: 200,
        }}
        className="absolute left-0 top-1 flex size-9 items-center justify-center rounded-full border border-accent-gold/40 bg-background text-accent-gold shadow-[0_0_18px_-6px_var(--accent-gold)] sm:size-11"
      >
        <Icon className="size-4 sm:size-5" />
        <span className="absolute inset-0 -z-10 rounded-full bg-accent-gold/10 blur-[6px]" />
      </motion.span>

      <div className="group rounded-2xl border border-border/70 bg-card/60 p-5 transition-all hover:-translate-y-0.5 hover:border-accent-gold/40 hover:shadow-[0_0_36px_-12px_var(--accent-gold)] sm:p-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-base font-semibold tracking-tight sm:text-lg">
              {entry.role}
            </h3>
            <p className="text-sm text-accent-gold">{entry.company}</p>
          </div>
          <span className="inline-flex w-fit items-center rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground">
            {entry.period}
          </span>
        </div>
        <ul className="mt-4 flex flex-col gap-2">
          {entry.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
            >
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-gold" />
              {bullet}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {entry.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-border/70 bg-background/60 px-2 py-0.5 text-[11px] font-medium text-foreground/80"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.li>
  );
}

export function Experience() {
  const reduce = useReducedMotion();
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-24 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          align="left"
          eyebrow="Experience & Achievements"
          title={
            <span id="experience-heading">
              Building, leading, and{" "}
              <span className="text-gradient-gold">shipping.</span>
            </span>
          }
          description="From founding Yumaris Agency to cross-functional team leadership and prior internships — the experience behind the products."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {/* LEFT: Experience timeline */}
          <div>
            <ol className="flex flex-col gap-8">
              {ENTRIES.map((entry, idx) => (
                <TimelineItem
                  key={`${entry.company}-${idx}`}
                  entry={entry}
                  index={idx}
                />
              ))}
            </ol>
          </div>

          {/* RIGHT: Education + Achievements */}
          <div className="flex flex-col gap-6">
            {/* Education card */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="group relative overflow-hidden p-6">
                <div className="absolute -right-12 -top-12 size-44 rounded-full bg-accent-gold/5 blur-2xl transition-transform duration-500 group-hover:scale-150" />
                <div className="relative flex h-full flex-col gap-5">
                  <div className="flex items-start gap-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-accent-gold/40 bg-accent-gold/10 text-accent-gold shadow-[0_0_24px_-8px_var(--accent-gold)]">
                      <GraduationCap className="size-6" />
                    </span>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-display text-lg font-bold tracking-tight">
                        B.Tech — Information Technology
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
                      Pursuing
                    </span>
                    <Badge
                      variant="secondary"
                      className="border-accent-gold/30 bg-accent-gold/10 text-[11px] text-accent-gold"
                    >
                      Full-time
                    </Badge>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h4 className="text-[11px] font-semibold uppercase tracking-wide text-accent-gold">
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
            <div>
              <h3 className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Achievements
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
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
                    <Card className="group relative h-full overflow-hidden p-4 transition-all hover:-translate-y-1 hover:border-accent-gold/50 hover:shadow-[0_0_36px_-12px_var(--accent-gold)]">
                      <div className="absolute -right-8 -top-8 size-20 rounded-full bg-accent-gold/5 transition-transform duration-500 group-hover:scale-[1.8]" />
                      <div className="relative flex flex-col gap-2.5">
                        <span className="flex size-9 items-center justify-center rounded-xl border border-accent-gold/30 bg-accent-gold/10 text-accent-gold transition-all group-hover:scale-110">
                          <a.Icon className="size-[18px]" />
                        </span>
                        <div className="flex flex-col gap-0.5">
                          <h4 className="font-display text-sm font-semibold leading-tight tracking-tight">
                            {a.title}
                          </h4>
                          <p className="text-xs leading-relaxed text-muted-foreground">
                            {a.note}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
