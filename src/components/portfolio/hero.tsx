"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Dribbble,
  ArrowUpRight,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCountUp } from "./use-count-up";

const ROLES = [
  "AI/ML Developer",
  "Computer Vision Engineer",
  "Full-Stack Developer",
  "3D Web Creative",
  "Founder, Yumaris Agency",
];

const SOCIALS: { label: string; href: string; Icon: LucideIcon }[] = [
  { label: "GitHub", href: "#", Icon: Github },
  { label: "LinkedIn", href: "#", Icon: Linkedin },
  { label: "X (Twitter)", href: "#", Icon: Twitter },
  { label: "Dribbble", href: "#", Icon: Dribbble },
];

const STATS = [
  { value: 12, suffix: "+", label: "Projects Built" },
  { value: 3, suffix: "", label: "Internships" },
  { value: 5, suffix: "+", label: "Hackathons" },
  { value: 30, suffix: "+", label: "Technologies" },
];

function RoleRotator() {
  const reduce = useReducedMotion();
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ROLES.length);
    }, 2600);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="relative inline-flex h-[1.4em] items-center overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          initial={reduce ? false : { y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-gradient-gold whitespace-nowrap font-bold"
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

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
          className="text-2xl font-bold tracking-tight sm:text-3xl"
        >
          {formatted}
        </span>
        <span className="text-xl font-bold text-accent-gold sm:text-2xl">
          {suffix}
        </span>
      </div>
      <span className="text-xs text-muted-foreground sm:text-sm">{label}</span>
    </div>
  );
}

export function Hero() {
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
          className="object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
        <div className="absolute inset-0 bg-grid mask-fade-b opacity-40" />
        <div className="absolute -left-32 top-10 size-[28rem] rounded-full bg-accent-gold/20 blur-[120px]" />
        <div className="absolute right-0 top-40 size-[24rem] rounded-full bg-accent-blue/15 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 size-[20rem] rounded-full bg-accent-gold/10 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:py-28 lg:px-8">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start gap-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-gold/30 bg-accent-gold/10 px-3 py-1 text-xs font-medium text-accent-gold">
            <Sparkles className="size-3.5" />
            Available for internships &amp; freelance
          </span>

          <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Hi, I&apos;m{" "}
            <span className="text-gradient-gold">Salman Khan S.</span>
          </h1>

          <div className="text-xl font-medium text-foreground sm:text-2xl">
            <RoleRotator />
          </div>

          <p className="max-w-xl text-balance text-sm leading-relaxed text-muted-foreground sm:text-base">
            Chennai-based IT student and builder crafting browser-first AI &amp;
            computer-vision systems, full-stack web apps, and premium 3D
            interactive experiences. Founder &amp; CEO of Yumaris Agency.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-accent-gold text-accent-gold-foreground shadow-[0_0_28px_-8px_var(--accent-gold)] hover:bg-accent-gold/90"
            >
              <Link href="#work">
                View My Work
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-accent-gold/40 text-foreground hover:bg-accent-gold/10 hover:text-accent-gold"
            >
              <Link href="#contact">Let&apos;s Talk</Link>
            </Button>
          </div>

          {/* Socials */}
          <ul className="flex items-center gap-2 pt-2">
            {SOCIALS.map(({ label, href, Icon }) => (
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
          <div className="mt-2 grid w-full max-w-xl grid-cols-2 gap-6 rounded-2xl border border-border/70 bg-card/40 p-5 backdrop-blur-sm sm:grid-cols-4">
            {STATS.map((s) => (
              <StatItem key={s.label} {...s} />
            ))}
          </div>
        </motion.div>

        {/* Right column — premium monogram card (no photo) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative mx-auto w-full max-w-sm lg:max-w-md"
        >
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-accent-gold/30 bg-card/40 p-2 backdrop-blur-sm">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-accent-gold/15 blur-3xl" />
            <div className="relative flex size-full flex-col items-center justify-center gap-6 overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-background/60 via-background/30 to-background/60 p-8">
              {/* Glow ring behind monogram */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-[42%] size-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-gold/15 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="absolute right-6 top-6 size-24 rounded-full bg-accent-blue/15 blur-2xl"
              />

              <motion.span
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex size-36 items-center justify-center rounded-3xl border border-accent-gold/40 bg-background/40 font-mono text-6xl font-black tracking-tight text-gradient-gold glow-gold-sm sm:size-40 sm:text-7xl"
              >
                SK
              </motion.span>

              <div className="relative flex flex-col items-center gap-2 text-center">
                <span className="text-base font-semibold tracking-tight sm:text-lg">
                  Salman Khan S.
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground sm:text-sm">
                  AI · CV · Full-Stack · 3D
                </span>
              </div>

              <div className="relative flex flex-wrap items-center justify-center gap-2">
                <span className="rounded-full border border-accent-gold/30 bg-accent-gold/10 px-3 py-1 text-[11px] font-medium text-accent-gold">
                  Chennai, India
                </span>
                <span className="rounded-full border border-accent-blue/30 bg-accent-blue/10 px-3 py-1 text-[11px] font-medium text-accent-blue">
                  Founder, Yumaris Agency
                </span>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2"
            >
              <div className="flex items-center gap-2 rounded-full border border-accent-gold/40 bg-background/95 px-4 py-1.5 text-xs font-medium shadow-[0_0_24px_-6px_var(--accent-gold)] backdrop-blur">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-gold opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent-gold" />
                </span>
                Open to opportunities
              </div>
            </motion.div>
          </div>

          {/* Floating chips */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute -left-4 top-12 hidden rounded-xl border border-border/70 bg-card/80 px-3 py-2 text-xs font-medium backdrop-blur sm:block"
          >
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-accent-gold" />
              TensorFlow.js
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="absolute -right-4 top-1/3 hidden rounded-xl border border-border/70 bg-card/80 px-3 py-2 text-xs font-medium backdrop-blur sm:block"
          >
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-accent-blue" />
              Three.js · 3D
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
