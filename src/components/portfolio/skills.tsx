"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Layers,
  Server,
  Database,
  Cloud,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";

interface SkillCategory {
  Icon: LucideIcon;
  title: string;
  blurb: string;
  skills: string[];
}

const CATEGORIES: SkillCategory[] = [
  {
    Icon: Layers,
    title: "Frontend",
    blurb: "Interfaces that feel instant and look sharp.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind", "Redux", "Vue"],
  },
  {
    Icon: Server,
    title: "Backend",
    blurb: "Typed APIs, queues, and services that scale.",
    skills: ["Node.js", "Express", "NestJS", "Python", "GraphQL", "REST"],
  },
  {
    Icon: Database,
    title: "Database",
    blurb: "Modeling, indexing, and query tuning.",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "SQLite"],
  },
  {
    Icon: Cloud,
    title: "DevOps & Cloud",
    blurb: "From commit to production, safely.",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Vercel", "GCP"],
  },
  {
    Icon: Wrench,
    title: "Tools & Design",
    blurb: "Design systems and developer ergonomics.",
    skills: ["Figma", "Git", "Jira", "Webpack", "Vite", "Storybook"],
  },
];

const PROFICIENCIES: { name: string; level: number }[] = [
  { name: "React", level: 95 },
  { name: "TypeScript", level: 92 },
  { name: "Next.js", level: 90 },
  { name: "Node.js", level: 88 },
  { name: "AWS", level: 82 },
  { name: "UI/UX Design", level: 85 },
];

function ProficiencyBar({
  name,
  level,
  delay,
}: {
  name: string;
  level: number;
  delay: number;
}) {
  const reduce = useReducedMotion();
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-xs font-mono text-accent-emerald">{level}%</span>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={reduce ? { width: `${level}%` } : { width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
          className="relative h-full rounded-full bg-gradient-to-r from-accent-emerald via-teal-400 to-cyan-400"
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-emerald via-teal-400 to-cyan-400 opacity-50 blur-[6px]" />
        </motion.div>
      </div>
    </div>
  );
}

export function Skills() {
  const reduce = useReducedMotion();
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="scroll-mt-24 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Skills"
          title={
            <span id="skills-heading">
              The toolkit behind the{" "}
              <span className="text-gradient-emerald">work</span>
            </span>
          }
          description="A pragmatic stack picked for speed, type-safety, and longevity — not hype."
        />

        {/* Category grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, idx) => {
            return (
              <motion.div
                key={cat.title}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                  delay: idx * 0.05,
                }}
              >
                <Card className="group relative h-full overflow-hidden p-6 transition-all hover:-translate-y-1 hover:border-accent-emerald/40 hover:shadow-[0_0_36px_-12px_var(--accent-emerald)]">
                  <div className="absolute -right-10 -top-10 size-32 rounded-full bg-accent-emerald/5 transition-transform duration-500 group-hover:scale-150" />
                  <div className="relative flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-11 items-center justify-center rounded-xl border border-accent-emerald/30 bg-accent-emerald/10 text-accent-emerald">
                        <cat.Icon className="size-5" />
                      </span>
                      <div className="flex flex-col">
                        <h3 className="text-base font-semibold">{cat.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {cat.blurb}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-medium text-foreground/90 transition-colors hover:border-accent-emerald/50 hover:text-accent-emerald"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}

          {/* Proficiency card spanning last cell on lg */}
          <Card className="relative overflow-hidden p-6 lg:col-span-3">
            <div className="absolute -left-10 -top-10 size-40 rounded-full bg-accent-emerald/5 blur-2xl" />
            <div className="relative grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="sm:col-span-2 lg:col-span-1">
                <h3 className="text-base font-semibold">
                  Core proficiency
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Self-rated against what I&apos;d confidently ship to
                  production today.
                </p>
              </div>
              <div className="grid gap-5 sm:col-span-2 sm:grid-cols-2 lg:grid-cols-3">
                {PROFICIENCIES.map((p, i) => (
                  <ProficiencyBar
                    key={p.name}
                    name={p.name}
                    level={p.level}
                    delay={i * 0.08}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
