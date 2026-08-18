"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  MapPin,
  GraduationCap,
  Building2,
  CheckCircle2,
  Briefcase,
  Lightbulb,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";
import { useCountUp } from "./use-count-up";

const ROLE_CHIPS = [
  "Founder",
  "Product Manager",
  "Technology Lead",
  "AI Strategist",
  "Developer",
  "Business Strategist",
];

const STAT_CARDS: {
  Icon: LucideIcon;
  value: number;
  suffix: string;
  label: string;
}[] = [
  { Icon: Briefcase, value: 10, suffix: "+", label: "Products Concepted" },
  { Icon: Sparkles, value: 6, suffix: "", label: "AI Agent Roles" },
  { Icon: GraduationCap, value: 5, suffix: "", label: "EdTech Programs" },
  { Icon: Briefcase, value: 3, suffix: "", label: "Prior Internships" },
];

function StatCard({
  Icon,
  value,
  suffix,
  label,
}: {
  Icon: LucideIcon;
  value: number;
  suffix: string;
  label: string;
}) {
  const { ref, formatted } = useCountUp({ value, duration: 1.8 });
  return (
    <Card className="group relative overflow-hidden p-4 transition-all hover:-translate-y-1 hover:border-accent-gold/40 hover:shadow-[0_0_28px_-10px_var(--accent-gold)]">
      <div className="absolute -right-6 -top-6 size-20 rounded-full bg-accent-gold/5 transition-transform group-hover:scale-150" />
      <div className="relative flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl border border-accent-gold/30 bg-accent-gold/10 text-accent-gold">
          <Icon className="size-5" />
        </span>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-0.5">
            <span
              ref={ref}
              className="font-display text-2xl font-bold tracking-tight-display"
            >
              {formatted}
            </span>
            <span className="font-display text-lg font-bold text-accent-gold">
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
      className="scroll-mt-24 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          align="left"
          eyebrow="Who I Am"
          title={
            <span id="about-heading">
              A technology entrepreneur across{" "}
              <span className="text-gradient-gold">
                AI, software, education &amp; automation.
              </span>
            </span>
          }
          description="Founder & CEO of Yumaris Agency, working across product strategy, AI systems, full-stack development, business automation, and technology education."
        />

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Monogram card */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-sm lg:sticky lg:top-24"
          >
            <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-accent-gold/20 via-accent-blue/8 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-accent-gold/30 bg-card p-2">
              <div className="relative flex aspect-[4/5] flex-col items-center justify-center gap-6 overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-background/60 via-background/30 to-background/60 p-8">
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-[40%] size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-gold/15 blur-3xl"
                />
                <div
                  aria-hidden="true"
                  className="absolute right-6 top-6 size-24 rounded-full bg-accent-blue/12 blur-2xl"
                />
                <span className="font-display relative flex size-40 items-center justify-center rounded-3xl border border-accent-gold/40 bg-background/40 text-7xl font-black tracking-tight-display text-gradient-gold glow-gold-sm">
                  SK
                </span>
                <div className="relative flex flex-col items-center gap-3 text-center">
                  <span className="font-display text-base font-semibold tracking-tight">
                    Salman Khan S.
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-gold/30 bg-accent-gold/10 px-3 py-1 text-[11px] font-medium text-accent-gold">
                      <MapPin className="size-3" />
                      Chennai, India
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/60 px-3 py-1 text-[11px] font-medium text-foreground/80">
                      <GraduationCap className="size-3" />
                      B.Tech Information Technology
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-blue/30 bg-accent-blue/10 px-3 py-1 text-[11px] font-medium text-accent-blue">
                      <Building2 className="size-3" />
                      Founder &amp; CEO, Yumaris Agency
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-gold/40 bg-accent-gold/10 px-3 py-1 text-[11px] font-medium text-accent-gold">
                      <span className="relative flex size-1.5">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-gold opacity-75" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-accent-gold" />
                      </span>
                      Available
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text + role chips + stat cards */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="flex flex-col gap-8"
          >
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>
                I&apos;m{" "}
                <span className="font-medium text-foreground">
                  Salman Khan S.
                </span>
                , Founder &amp; CEO of{" "}
                <span className="font-medium text-accent-gold">
                  Yumaris Agency
                </span>{" "}
                and a technology entrepreneur focused on Artificial Intelligence,
                software development, EdTech, automation, and digital
                transformation. I work across product strategy, AI systems,
                full-stack development, business automation, and technology
                education.
              </p>
              <p>
                As a B.Tech Information Technology student and founder, I operate
                across the complete product lifecycle — from problem discovery
                and architecture to development, deployment, and scaling. My goal
                is to convert ideas into practical digital products that create
                measurable value.
              </p>
              <p>
                Through Yumaris Agency, I lead a team building AI agents, HRMS
                platforms, RAG knowledge systems, EdTech programs, and business
                automation tools — combining human expertise with software and
                AI.
              </p>
            </div>

            {/* My role in a project */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                My role in a project
              </h3>
              <div className="flex flex-wrap gap-2">
                {ROLE_CHIPS.map((role) => (
                  <span
                    key={role}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-3 py-1 text-xs font-medium text-foreground/90 transition-colors hover:border-accent-gold/50 hover:text-accent-gold"
                  >
                    <CheckCircle2 className="size-3 text-accent-gold" />
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {STAT_CARDS.map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>

            {/* Mini brand statement */}
            <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-muted/30 p-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-accent-gold/30 bg-accent-gold/10 text-accent-gold">
                <Lightbulb className="size-4" />
              </span>
              <p className="font-display text-sm italic text-foreground/90">
                Problem first. Technology second.{" "}
                <span className="text-accent-gold">Impact always.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
