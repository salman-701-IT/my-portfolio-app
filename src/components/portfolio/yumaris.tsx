"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BrainCircuit,
  Code2,
  Globe,
  GraduationCap,
  Megaphone,
  Palette,
  ExternalLink,
  Target,
  Eye,
  type LucideIcon,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./section-heading";
import { TiltCard } from "./tilt-card";
import {
  fadeLeft,
  fadeRight,
  staggerContainer,
  staggerItem,
  withReducedMotion,
} from "./motion-variants";

interface ServiceItem {
  Icon: LucideIcon;
  title: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    Icon: BrainCircuit,
    title: "AI Solutions",
    description: "AI agents, RAG systems, and intelligent business automation.",
  },
  {
    Icon: Code2,
    title: "Software Development",
    description: "Custom software products engineered end-to-end.",
  },
  {
    Icon: Globe,
    title: "Web Development",
    description: "Modern, performant, premium websites and web apps.",
  },
  {
    Icon: GraduationCap,
    title: "EdTech",
    description: "Learning tracks, internship programs, and assessment platforms.",
  },
  {
    Icon: Megaphone,
    title: "Digital Marketing",
    description: "Growth, content, and digital presence for brands.",
  },
  {
    Icon: Palette,
    title: "Branding & Content",
    description: "Identity, design systems, posters, and creative content.",
  },
];

const SERVES = [
  "Businesses",
  "Startups",
  "Educational Institutions",
  "Students",
  "Entrepreneurs",
  "Organizations",
];

export function Yumaris() {
  const reduce = useReducedMotion();
  const serviceContainer = withReducedMotion(
    staggerContainer({ staggerChildren: 0.07, delayChildren: 0.05 }),
    reduce,
  );
  const serviceItem = withReducedMotion(staggerItem({ duration: 0.5 }), reduce);
  return (
    <section
      id="yumaris"
      aria-labelledby="yumaris-heading"
      className="scroll-mt-24 bg-muted/30 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          align="left"
          eyebrow="Yumaris Agency"
          title={
            <span id="yumaris-heading">
              A technology ecosystem for{" "}
              <span className="text-gradient-gold">
                AI, software, education &amp; automation.
              </span>
            </span>
          }
          description="Founded by Salman Khan S., Yumaris Agency unifies AI solutions, software, web, EdTech, and branding under one ecosystem."
        />

        {/* Two-column intro */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* Left: wordmark card */}
          <motion.div
            variants={withReducedMotion(fadeRight(), reduce)}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <Card className="relative h-full overflow-hidden p-8 sm:p-10">
              <div className="absolute -right-12 -top-12 size-44 rounded-full bg-accent-gold/10 blur-3xl" />
              <div className="absolute -left-12 -bottom-12 size-44 rounded-full bg-accent-blue/8 blur-3xl" />
              <div className="relative flex h-full flex-col gap-6">
                <div className="flex items-center gap-3">
                  <span className="font-display flex size-12 items-center justify-center rounded-xl border border-accent-gold/40 bg-accent-gold/10 text-xl font-black tracking-tight text-accent-gold shadow-[0_0_24px_-8px_var(--accent-gold)]">
                    Y
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    Founded 2023
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-4xl font-bold tracking-tight-display sm:text-5xl">
                    Yumaris Agency
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Founded by Salman Khan S.
                  </p>
                </div>
                <p className="font-display text-sm italic text-foreground/80">
                  AI + Software + Education + Automation + Innovation
                </p>
                <Button
                  asChild
                  className="w-fit bg-accent-gold text-accent-gold-foreground shadow-[0_0_24px_-8px_var(--accent-gold)] hover:bg-accent-gold/90"
                >
                  <a
                    href="https://yumarisagency.web.app"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit yumarisagency.web.app
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Right: Vision + Mission cards */}
          <motion.div
            variants={withReducedMotion(fadeLeft(), reduce)}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-4"
          >
            <Card className="relative overflow-hidden p-6">
              <div className="absolute -right-8 -top-8 size-24 rounded-full bg-accent-gold/8 blur-2xl" />
              <div className="relative flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-9 items-center justify-center rounded-lg border border-accent-gold/30 bg-accent-gold/10 text-accent-gold">
                    <Eye className="size-[18px]" />
                  </span>
                  <h4 className="font-display text-base font-semibold tracking-tight">
                    Vision
                  </h4>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  To build a technology ecosystem where businesses, students,
                  educational institutions, and organizations can access practical
                  AI and digital solutions.
                </p>
              </div>
            </Card>
            <Card className="relative overflow-hidden p-6">
              <div className="absolute -right-8 -top-8 size-24 rounded-full bg-accent-blue/8 blur-2xl" />
              <div className="relative flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-9 items-center justify-center rounded-lg border border-accent-blue/30 bg-accent-blue/10 text-accent-blue">
                    <Target className="size-[18px]" />
                  </span>
                  <h4 className="font-display text-base font-semibold tracking-tight">
                    Mission
                  </h4>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  To transform ideas and real-world problems into scalable
                  technology products through AI, software, education, automation,
                  and innovation.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Service ecosystem grid */}
        <div className="mt-10">
          <h3 className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Service Ecosystem
          </h3>
          <motion.div
            variants={serviceContainer}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {SERVICES.map((service) => (
              <motion.div key={service.title} variants={serviceItem}>
                <TiltCard className="h-full">
                  <Card className="group relative h-full overflow-hidden p-5 transition-all hover:-translate-y-1 hover:border-accent-gold/50 hover:shadow-[0_0_36px_-12px_var(--accent-gold)]">
                    <div className="absolute -right-8 -top-8 size-24 rounded-full bg-accent-gold/5 transition-transform duration-500 group-hover:scale-[1.8]" />
                    <div className="relative flex items-start gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-gold/30 bg-accent-gold/10 text-accent-gold transition-all group-hover:scale-110">
                        <service.Icon className="size-5" />
                      </span>
                      <div className="flex flex-col gap-1">
                        <h4 className="font-display text-sm font-semibold leading-tight tracking-tight">
                          {service.title}
                        </h4>
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Who we serve */}
        <motion.div
          variants={withReducedMotion(staggerItem({ duration: 0.55 }), reduce)}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-border/70 bg-card/40 p-6 text-center"
        >
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Who We Serve
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {SERVES.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-medium text-foreground/90 transition-colors hover:border-accent-gold/50 hover:text-accent-gold"
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
