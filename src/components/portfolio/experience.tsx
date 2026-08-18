"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

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
    role: "Senior Full-Stack Engineer",
    company: "Nimbus Labs",
    type: "work",
    bullets: [
      "Lead an 8-engineer team building a multi-tenant cloud SaaS; shipped 12+ customer-facing features.",
      "Cut infrastructure cost by 35% through right-sizing, edge caching, and a queue-based ingestion rewrite.",
    ],
    stack: ["Next.js", "TypeScript", "AWS", "PostgreSQL", "NestJS"],
  },
  {
    period: "2021 — 2023",
    role: "Full-Stack Developer",
    company: "Vertex Digital",
    type: "work",
    bullets: [
      "Built client web apps in Next.js and Node across fintech, health, and D2C commerce.",
      "Mentored 4 junior developers and introduced a typed-API-first workflow that cut integration bugs by 40%.",
    ],
    stack: ["Next.js", "Node.js", "GraphQL", "Prisma", "Vercel"],
  },
  {
    period: "2019 — 2021",
    role: "Frontend Engineer",
    company: "PixelForge",
    type: "work",
    bullets: [
      "Crafted design systems and high-conversion marketing sites used by 500k+ monthly visitors.",
      "Owned the component library and motion guidelines adopted across three product squads.",
    ],
    stack: ["React", "TypeScript", "Figma", "Storybook", "Webpack"],
  },
  {
    period: "2018 — 2019",
    role: "Software Engineer Intern",
    company: "TechSpark",
    type: "intern",
    bullets: [
      "Shipped internal tools and automation scripts that saved the ops team ~10 hours per week.",
      "Wrote the first end-to-end test suite for the customer-onboarding flow.",
    ],
    stack: ["JavaScript", "Node.js", "PostgreSQL", "Cypress"],
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
          className="absolute left-[18px] top-10 bottom-0 w-px bg-gradient-to-b from-accent-emerald/60 via-border to-transparent sm:left-[22px]"
        />
      ) : null}

      {/* Node */}
      <motion.span
        initial={reduce ? false : { scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, delay: index * 0.08 + 0.1, type: "spring", stiffness: 200 }}
        className="absolute left-0 top-1 flex size-9 items-center justify-center rounded-full border border-accent-emerald/40 bg-background text-accent-emerald shadow-[0_0_18px_-6px_var(--accent-emerald)] sm:size-11"
      >
        <Icon className="size-4 sm:size-5" />
        <span className="absolute inset-0 -z-10 rounded-full bg-accent-emerald/10 blur-[6px]" />
      </motion.span>

      <div className="group rounded-2xl border border-border/70 bg-card/60 p-5 transition-all hover:-translate-y-0.5 hover:border-accent-emerald/40 hover:shadow-[0_0_36px_-12px_var(--accent-emerald)] sm:p-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-semibold tracking-tight sm:text-lg">
              {entry.role}
            </h3>
            <p className="text-sm text-accent-emerald">
              {entry.company}
            </p>
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
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-emerald" />
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
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-24 bg-muted/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title={
            <span id="experience-heading">
              A timeline of <span className="text-gradient-emerald">growth</span>
            </span>
          }
          description="Five years of compounding impact across startups, agencies, and internships."
        />

        <ol className="mt-12 flex flex-col gap-8">
          {ENTRIES.map((entry, idx) => (
            <TimelineItem key={entry.company} entry={entry} index={idx} />
          ))}
        </ol>
      </div>
    </section>
  );
}
