"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Code2,
  Layers,
  Server,
  Database,
  BrainCircuit,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";

interface SkillCategory {
  Icon: LucideIcon;
  title: string;
  skills: string[];
}

const CATEGORIES: SkillCategory[] = [
  {
    Icon: Code2,
    title: "Languages",
    skills: ["Java", "Python", "JavaScript", "HTML", "CSS"],
  },
  {
    Icon: Layers,
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "Three.js"],
  },
  {
    Icon: Server,
    title: "Backend",
    skills: ["Java", "Spring Boot", "Node.js", "REST APIs"],
  },
  {
    Icon: Database,
    title: "Database & Cloud",
    skills: ["Firebase", "Firestore", "Cloud Services", "API Integrations"],
  },
  {
    Icon: BrainCircuit,
    title: "Artificial Intelligence",
    skills: [
      "Generative AI",
      "LLMs",
      "RAG",
      "AI Agents",
      "Prompt Engineering",
      "Machine Learning",
      "Data Science",
    ],
  },
  {
    Icon: Briefcase,
    title: "Business Technology",
    skills: [
      "CRM",
      "HRMS",
      "ERP Concepts",
      "Workflow Automation",
      "Digital Transformation",
    ],
  },
];

const PROFICIENCIES: { name: string; level: number }[] = [
  { name: "Java", level: 88 },
  { name: "React", level: 90 },
  { name: "Next.js", level: 87 },
  { name: "Spring Boot", level: 82 },
  { name: "AI / RAG", level: 85 },
  { name: "Three.js", level: 78 },
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
        <span className="font-mono text-xs text-accent-gold">{level}%</span>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={reduce ? { width: `${level}%` } : { width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
          className="relative h-full rounded-full bg-gradient-to-r from-accent-gold via-amber-300 to-accent-blue"
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-gold via-amber-300 to-accent-blue opacity-50 blur-[6px]" />
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
      className="scroll-mt-24 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          align="left"
          eyebrow="Toolkit"
          title={
            <span id="skills-heading">
              The stack behind the{" "}
              <span className="text-gradient-gold">products.</span>
            </span>
          }
          description="A pragmatic stack spanning languages, frontend, backend, cloud, AI, and business technology — chosen to ship real products, not chase hype."
        />

        {/* Category grid */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                <Card className="group relative h-full overflow-hidden p-6 transition-all hover:-translate-y-1 hover:border-accent-gold/40 hover:shadow-[0_0_36px_-12px_var(--accent-gold)]">
                  <div className="absolute -right-10 -top-10 size-32 rounded-full bg-accent-gold/5 transition-transform duration-500 group-hover:scale-150" />
                  <div className="relative flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-11 items-center justify-center rounded-xl border border-accent-gold/30 bg-accent-gold/10 text-accent-gold">
                        <cat.Icon className="size-5" />
                      </span>
                      <h3 className="font-display text-base font-semibold tracking-tight">
                        {cat.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-1">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-medium text-foreground/90 transition-colors hover:border-accent-gold/50 hover:text-accent-gold"
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
            <div className="absolute -left-10 -top-10 size-40 rounded-full bg-accent-gold/5 blur-2xl" />
            <div className="relative grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="sm:col-span-2 lg:col-span-1">
                <h3 className="font-display text-base font-semibold tracking-tight">
                  Core proficiency
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Self-rated against what I&apos;d confidently ship today —
                  across AI, full-stack, and creative engineering.
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
