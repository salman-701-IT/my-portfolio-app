"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Code2,
  Layers,
  Server,
  BrainCircuit,
  Database,
  Cloud,
  Wrench,
  Sparkles,
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
    Icon: Code2,
    title: "Programming",
    blurb: "Core languages I think and ship in.",
    skills: ["C", "C++", "Python", "Java", "JavaScript", "Dart"],
  },
  {
    Icon: Layers,
    title: "Frontend",
    blurb: "Interfaces that feel instant and look sharp.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Vite"],
  },
  {
    Icon: Server,
    title: "Backend",
    blurb: "Typed APIs and services that scale.",
    skills: ["Node.js", "Express.js", "Django", "FastAPI"],
  },
  {
    Icon: BrainCircuit,
    title: "AI / ML",
    blurb: "Browser-first AI & computer vision.",
    skills: [
      "TensorFlow",
      "TensorFlow.js",
      "ONNX",
      "BlazeFace",
      "Computer Vision",
      "Face & Liveness Detection",
      "AI Camera Systems",
    ],
  },
  {
    Icon: Database,
    title: "Databases",
    blurb: "Modeling, querying, and storage.",
    skills: ["Firebase", "Supabase", "MongoDB", "PostgreSQL", "MySQL", "DynamoDB"],
  },
  {
    Icon: Cloud,
    title: "Cloud / DevOps",
    blurb: "From commit to production, safely.",
    skills: ["AWS", "Docker", "Kubernetes", "Nginx", "Apache", "CI/CD", "XAMPP"],
  },
  {
    Icon: Wrench,
    title: "Development Tools",
    blurb: "Daily drivers for building and shipping.",
    skills: ["VS Code", "GitHub", "Postman", "Replit"],
  },
  {
    Icon: Sparkles,
    title: "Creative / UI",
    blurb: "Motion, 3D, and interactive web.",
    skills: [
      "Three.js",
      "Framer Motion",
      "Lottie",
      "3D UI",
      "Glassmorphism",
      "Animation",
      "Interactive Web",
    ],
  },
];

const PROFICIENCIES: { name: string; level: number }[] = [
  { name: "JavaScript", level: 90 },
  { name: "React", level: 88 },
  { name: "Python", level: 86 },
  { name: "Node.js", level: 84 },
  { name: "TensorFlow.js", level: 82 },
  { name: "Three.js / 3D UI", level: 78 },
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
        <span className="text-xs font-mono text-accent-gold">{level}%</span>
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
      className="scroll-mt-24 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Toolkit"
          title={
            <span id="skills-heading">
              The stack behind the{" "}
              <span className="text-gradient-gold">work</span>
            </span>
          }
          description="A pragmatic stack picked for speed, browser-first AI, and premium visuals — not hype."
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
                <Card className="group relative h-full overflow-hidden p-6 transition-all hover:-translate-y-1 hover:border-accent-gold/40 hover:shadow-[0_0_36px_-12px_var(--accent-gold)]">
                  <div className="absolute -right-10 -top-10 size-32 rounded-full bg-accent-gold/5 transition-transform duration-500 group-hover:scale-150" />
                  <div className="relative flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-11 items-center justify-center rounded-xl border border-accent-gold/30 bg-accent-gold/10 text-accent-gold">
                        <cat.Icon className="size-5" />
                      </span>
                      <div className="flex flex-col">
                        <h3 className="text-base font-semibold">{cat.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {cat.blurb}
                        </p>
                      </div>
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
                <h3 className="text-base font-semibold">Core proficiency</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Self-rated against what I&apos;d confidently ship today —
                  browser-first, no PyTorch.
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
