"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Dribbble,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCountUp } from "./use-count-up";

const SOCIALS: { label: string; href: string; Icon: LucideIcon }[] = [
  { label: "GitHub", href: "#", Icon: Github },
  { label: "LinkedIn", href: "#", Icon: Linkedin },
  { label: "X (Twitter)", href: "#", Icon: Twitter },
  { label: "Dribbble", href: "#", Icon: Dribbble },
];

const STATS = [
  { value: 9, suffix: "", label: "Products Built" },
  { value: 6, suffix: "", label: "AI Agents Designed" },
  { value: 5, suffix: "", label: "EdTech Tracks" },
  { value: 10, suffix: "+", label: "Team Members Led" },
];

function StatItem({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const { ref, formatted } = useCountUp({ value, duration: 1.8 });
  return (
    <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
      <div className="flex items-baseline gap-0.5">
        <span
          ref={ref}
          className="font-display text-3xl font-bold tracking-tight-display sm:text-4xl"
        >
          {formatted}
        </span>
        <span className="font-display text-xl font-bold text-accent-gold sm:text-2xl">
          {suffix}
        </span>
      </div>
      <span className="text-xs text-muted-foreground sm:text-sm">{label}</span>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative scroll-mt-24 overflow-hidden"
    >
      {/* Background image + blobs + grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background" />
        <div className="absolute inset-0 bg-grid mask-fade-b opacity-40" />
        <div className="absolute -left-32 top-10 size-[28rem] rounded-full bg-accent-gold/15 blur-[140px]" />
        <div className="absolute right-0 top-40 size-[24rem] rounded-full bg-accent-blue/10 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 size-[20rem] rounded-full bg-accent-gold/8 blur-[120px]" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-start gap-10 px-6 py-24 md:py-32">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start gap-7"
        >
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-accent-gold">
            <span className="size-1.5 rounded-full bg-accent-gold" />
            Founder &amp; CEO — Yumaris Agency
          </span>

          {/* H1 */}
          <h1 className="font-display text-balance text-5xl font-bold leading-[1.05] tracking-tight-display sm:text-6xl md:text-7xl lg:text-8xl">
            Founder. Builder.{" "}
            <span className="text-gradient-gold">AI Entrepreneur.</span>
          </h1>

          {/* Subhead */}
          <p className="max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            I build AI-powered products, software systems, educational
            platforms, and digital solutions that transform real-world problems
            into scalable technology.
          </p>

          {/* Brand statement pull-quote */}
          <blockquote className="max-w-2xl border-l-2 border-accent-gold pl-5">
            <p className="font-display text-balance text-lg italic text-foreground/90 sm:text-xl">
              I don&apos;t just learn technology.{" "}
              <span className="text-accent-gold">I build with it.</span>
            </p>
          </blockquote>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-accent-gold text-accent-gold-foreground shadow-[0_0_28px_-8px_var(--accent-gold)] hover:bg-accent-gold/90"
            >
              <Link href="#work">
                Explore My Work
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-accent-gold/40 text-foreground hover:bg-accent-gold/10 hover:text-accent-gold"
            >
              <Link href="#contact">Let&apos;s Build Something</Link>
            </Button>
          </div>

          {/* Socials */}
          <ul className="flex items-center gap-2 pt-1">
            {SOCIALS.map(({ label, Icon }) => (
              <li key={label}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info("Link coming soon", {
                      description: `${label} profile will be live shortly.`,
                    });
                  }}
                  aria-label={label}
                  className="group flex size-10 items-center justify-center rounded-xl border border-border/70 bg-card/60 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-accent-gold/60 hover:text-accent-gold hover:shadow-[0_0_20px_-6px_var(--accent-gold)]"
                >
                  <Icon className="size-4" />
                </button>
              </li>
            ))}
          </ul>

          {/* Stats strip */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-2 grid w-full max-w-3xl grid-cols-2 gap-8 rounded-2xl border border-border/70 bg-card/40 p-6 backdrop-blur-sm sm:grid-cols-4"
          >
            {STATS.map((s) => (
              <StatItem key={s.label} {...s} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
