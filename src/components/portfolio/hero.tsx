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
  Download,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCountUp } from "./use-count-up";

const ROLES = [
  "Full-Stack Developer",
  "UI Engineer",
  "Cloud Builder",
  "Open-Source Contributor",
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com", Icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
  { label: "X (Twitter)", href: "https://x.com", Icon: Twitter },
  { label: "Dribbble", href: "https://dribbble.com", Icon: Dribbble },
];

const STATS = [
  { value: 5, suffix: "+", label: "Years" },
  { value: 50, suffix: "+", label: "Projects" },
  { value: 30, suffix: "+", label: "Clients" },
  { value: 15, suffix: "+", label: "Awards" },
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
          className="text-gradient-emerald whitespace-nowrap font-bold"
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
        <span className="text-xl font-bold text-accent-emerald sm:text-2xl">
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
      {/* Background blobs + grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-grid mask-fade-b opacity-60" />
        <div className="absolute -left-32 top-10 size-[28rem] rounded-full bg-accent-emerald/20 blur-[120px]" />
        <div className="absolute right-0 top-40 size-[24rem] rounded-full bg-teal-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 size-[20rem] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:py-28 lg:px-8">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start gap-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-emerald/30 bg-accent-emerald/10 px-3 py-1 text-xs font-medium text-accent-emerald">
            <Sparkles className="size-3.5" />
            Available for freelance & full-time
          </span>

          <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Hi, I&apos;m{" "}
            <span className="text-gradient-emerald">Salman Khan</span>
          </h1>

          <div className="text-xl font-medium text-foreground sm:text-2xl">
            <RoleRotator />
          </div>

          <p className="max-w-xl text-balance text-sm leading-relaxed text-muted-foreground sm:text-base">
            I design and build production-grade web products end-to-end — from
            pixel-perfect interfaces to scalable cloud backends. Currently
            crafting developer-friendly SaaS from Bengaluru, India, with a soft
            spot for design systems, performance budgets, and well-typed APIs.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-accent-emerald text-accent-emerald-foreground shadow-[0_0_28px_-8px_var(--accent-emerald)] hover:bg-accent-emerald/90"
            >
              <Link href="#work">
                View My Work
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-accent-emerald/40 text-foreground hover:bg-accent-emerald/10 hover:text-accent-emerald"
              onClick={() =>
                toast.info("CV download coming soon", {
                  description: "Drop me a message and I'll send it over ASAP.",
                })
              }
            >
              <Download className="size-4" />
              Download CV
            </Button>
          </div>

          {/* Socials */}
          <ul className="flex items-center gap-2 pt-2">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex size-10 items-center justify-center rounded-xl border border-border/70 bg-card/60 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-accent-emerald/60 hover:text-accent-emerald hover:shadow-[0_0_20px_-6px_var(--accent-emerald)]"
                >
                  <Icon className="size-4" />
                </Link>
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

        {/* Right column — avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative mx-auto w-full max-w-sm lg:max-w-md"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-accent-emerald/30 bg-card/40 p-2 backdrop-blur-sm">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-accent-emerald/20 blur-3xl" />
            <div className="relative size-full overflow-hidden rounded-2xl">
              <Image
                src="/images/avatar.png"
                alt="Portrait of Salman Khan, full-stack developer and designer"
                fill
                priority
                loading="eager"
                sizes="(max-width: 768px) 80vw, 30vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2"
            >
              <div className="flex items-center gap-2 rounded-full border border-accent-emerald/40 bg-background/95 px-4 py-1.5 text-xs font-medium shadow-[0_0_24px_-6px_var(--accent-emerald)] backdrop-blur">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-emerald opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent-emerald" />
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
              <span className="size-2 rounded-full bg-emerald-400" />
              TypeScript
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="absolute -right-4 top-1/3 hidden rounded-xl border border-border/70 bg-card/80 px-3 py-2 text-xs font-medium backdrop-blur sm:block"
          >
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-teal-400" />
              Next.js 16
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
