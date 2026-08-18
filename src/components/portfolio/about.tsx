"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Mail,
  Briefcase,
  Clock,
  CheckCircle2,
  Code2,
  Trophy,
  Users,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";
import { useCountUp } from "./use-count-up";

const QUICK_FACTS = [
  { label: "Name", value: "Salman Khan" },
  { label: "Location", value: "Bengaluru, India" },
  { label: "Email", value: "hello@salmankhan.dev" },
  { label: "Experience", value: "5+ Years" },
  { label: "Freelance", value: "Available" },
];

const STAT_CARDS = [
  {
    Icon: Briefcase,
    value: 5,
    suffix: "+",
    label: "Years Experience",
  },
  {
    Icon: Code2,
    value: 50,
    suffix: "+",
    label: "Projects Done",
  },
  {
    Icon: Users,
    value: 30,
    suffix: "+",
    label: "Happy Clients",
  },
  {
    Icon: Trophy,
    value: 15,
    suffix: "+",
    label: "Awards",
  },
];

function StatCard({
  Icon,
  value,
  suffix,
  label,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  value: number;
  suffix: string;
  label: string;
}) {
  const { ref, formatted } = useCountUp({ value, duration: 1.8 });
  return (
    <Card className="group relative overflow-hidden p-4 transition-all hover:-translate-y-1 hover:border-accent-emerald/40 hover:shadow-[0_0_28px_-10px_var(--accent-emerald)]">
      <div className="absolute -right-6 -top-6 size-20 rounded-full bg-accent-emerald/5 transition-transform group-hover:scale-150" />
      <div className="relative flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl border border-accent-emerald/30 bg-accent-emerald/10 text-accent-emerald">
          <Icon className="size-5" />
        </span>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-0.5">
            <span ref={ref} className="text-2xl font-bold tracking-tight">
              {formatted}
            </span>
            <span className="text-lg font-bold text-accent-emerald">
              {suffix}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      </div>
    </Card>
  );
}

export function About() {
  const reduce = useReducedMotion();
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 bg-muted/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About"
          title={
            <span id="about-heading">
              A developer who cares about the{" "}
              <span className="text-gradient-emerald">craft</span>
            </span>
          }
          description="Five years of shipping real products across fintech, health, and SaaS — pairing strong engineering fundamentals with a designer's eye."
        />

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Avatar frame */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-sm lg:sticky lg:top-24"
          >
            <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-accent-emerald/30 via-teal-500/10 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-accent-emerald/30 bg-card p-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src="/images/avatar.png"
                  alt="Salman Khan working on a laptop"
                  fill
                  sizes="(max-width: 1024px) 80vw, 30vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-accent-emerald/40 bg-background/95 px-3 py-1.5 text-xs font-medium shadow-[0_0_24px_-8px_var(--accent-emerald)] backdrop-blur">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-emerald opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent-emerald" />
                </span>
                Available for work
              </div>
            </div>
          </motion.div>

          {/* Text + facts + stat cards */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="flex flex-col gap-8"
          >
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>
                I&apos;m a full-stack developer who has spent the last five
                years turning ambiguous product briefs into reliable, fast, and
                genuinely delightful software. My sweet spot is the seam between
                frontend and backend — where design tokens meet database
                schemas and where milliseconds actually matter.
              </p>
              <p>
                Most recently I led an 8-engineer team building a cloud SaaS
                platform at Nimbus Labs, shipping 12+ customer-facing features,
                cutting infrastructure cost by 35%, and standing up the design
                system that now powers every internal dashboard.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me contributing to
                open-source, mentoring junior developers, or sketching UI ideas
                in Figma over a filter coffee. I care about accessibility,
                performance budgets, and writing code my future self can read.
              </p>
            </div>

            {/* Quick facts */}
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {QUICK_FACTS.map((fact) => (
                <li
                  key={fact.label}
                  className="flex items-center gap-3 rounded-xl border border-border/70 bg-card/60 px-4 py-3"
                >
                  <CheckCircle2 className="size-4 shrink-0 text-accent-emerald" />
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      {fact.label}
                    </span>
                    <span className="text-sm font-medium">{fact.value}</span>
                  </div>
                </li>
              ))}
            </ul>

            {/* Stat cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {STAT_CARDS.map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>

            {/* Contact mini-row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4 text-accent-emerald" />
                Bengaluru, India
              </span>
              <span className="inline-flex items-center gap-2">
                <Mail className="size-4 text-accent-emerald" />
                hello@salmankhan.dev
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="size-4 text-accent-emerald" />
                IST (UTC+5:30)
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
