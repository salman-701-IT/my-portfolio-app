"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Briefcase,
  CheckCircle2,
  Code2,
  Trophy,
  Sparkles,
  Building2,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";
import { useCountUp } from "./use-count-up";

const QUICK_FACTS: { label: string; value: string }[] = [
  { label: "Name", value: "Salman Khan S." },
  { label: "Location", value: "Chennai, Tamil Nadu, India" },
  { label: "Education", value: "IT, MSAJCE (Anna University)" },
  { label: "Focus", value: "AI/CV + Full-Stack Web" },
  { label: "Founder", value: "Yumaris Agency" },
  { label: "Status", value: "Open to internships & freelance" },
];

const STAT_CARDS = [
  { Icon: Code2, value: 12, suffix: "+", label: "Projects" },
  { Icon: Briefcase, value: 3, suffix: "", label: "Internships" },
  { Icon: Trophy, value: 5, suffix: "+", label: "Hackathons" },
  { Icon: Sparkles, value: 30, suffix: "+", label: "Tech Skills" },
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
    <Card className="group relative overflow-hidden p-4 transition-all hover:-translate-y-1 hover:border-accent-gold/40 hover:shadow-[0_0_28px_-10px_var(--accent-gold)]">
      <div className="absolute -right-6 -top-6 size-20 rounded-full bg-accent-gold/5 transition-transform group-hover:scale-150" />
      <div className="relative flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl border border-accent-gold/30 bg-accent-gold/10 text-accent-gold">
          <Icon className="size-5" />
        </span>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-0.5">
            <span ref={ref} className="text-2xl font-bold tracking-tight">
              {formatted}
            </span>
            <span className="text-lg font-bold text-accent-gold">{suffix}</span>
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
          eyebrow="About Me"
          title={
            <span id="about-heading">
              A builder who ships — across{" "}
              <span className="text-gradient-gold">AI, web, and brand</span>.
            </span>
          }
          description="Chennai-based IT student and founder focused on practical, portfolio-ready AI/CV systems and premium web experiences."
        />

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Monogram card (no photo) */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-sm lg:sticky lg:top-24"
          >
            <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-accent-gold/25 via-accent-blue/10 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-accent-gold/30 bg-card p-2">
              <div className="relative flex aspect-[4/5] flex-col items-center justify-center gap-6 overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-background/60 via-background/30 to-background/60 p-8">
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-[40%] size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-gold/15 blur-3xl"
                />
                <div
                  aria-hidden="true"
                  className="absolute right-6 top-6 size-24 rounded-full bg-accent-blue/15 blur-2xl"
                />
                <span className="relative flex size-40 items-center justify-center rounded-3xl border border-accent-gold/40 bg-background/40 font-mono text-7xl font-black tracking-tight text-gradient-gold glow-gold-sm">
                  SK
                </span>
                <div className="relative flex flex-col items-center gap-2 text-center">
                  <span className="text-base font-semibold tracking-tight">
                    Salman Khan S.
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-gold/30 bg-accent-gold/10 px-3 py-1 text-[11px] font-medium text-accent-gold">
                      <MapPin className="size-3" />
                      Chennai, India
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-blue/30 bg-accent-blue/10 px-3 py-1 text-[11px] font-medium text-accent-blue">
                      <Building2 className="size-3" />
                      Founder &amp; CEO, Yumaris Agency
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-accent-gold/40 bg-background/95 px-3 py-1.5 text-xs font-medium shadow-[0_0_24px_-8px_var(--accent-gold)] backdrop-blur">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-gold opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent-gold" />
                </span>
                Available
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
                I&apos;m an Information Technology student at Mohamed Sathak A J
                College of Engineering (Anna University), Chennai, with a deep
                interest in Artificial Intelligence, Computer Vision, and
                full-stack web development. I build practical, portfolio-ready
                systems — from browser-based face liveness detection to
                AI-powered analytics platforms.
              </p>
              <p>
                As Founder &amp; CEO of{" "}
                <span className="font-medium text-accent-gold">Yumaris Agency</span>,
                I lead a small team delivering online learning, website design,
                photo &amp; video editing, internship packages, and branding
                solutions. I care about premium, minimal design and engineering
                that actually ships.
              </p>
              <p>
                My toolkit spans Python, JavaScript, React, TensorFlow.js,
                Three.js, and AWS. I prefer lightweight, browser-first AI — no
                PyTorch, no bloat — and I love projects that blend real
                engineering with striking visuals.
              </p>
            </div>

            {/* Quick facts */}
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {QUICK_FACTS.map((fact) => (
                <li
                  key={fact.label}
                  className="flex items-center gap-3 rounded-xl border border-border/70 bg-card/60 px-4 py-3"
                >
                  <CheckCircle2 className="size-4 shrink-0 text-accent-gold" />
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
