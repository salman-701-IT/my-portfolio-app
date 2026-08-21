"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
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
import { MagneticButton } from "./magnetic-button";
import { useCountUp } from "./use-count-up";
import {
  staggerContainer,
  withReducedMotion,
} from "./motion-variants";

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

// Per-word fade+blur reveal variant for the H1.
const wordVariants: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const socialItem: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

function StatItem({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const { ref, formatted, isDone } = useCountUp({ value, duration: 1.8 });
  return (
    <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
      <div className="flex items-baseline gap-0.5">
        <motion.span
          ref={ref}
          animate={
            isDone
              ? { scale: [1, 1.15, 1] }
              : { scale: 1 }
          }
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={cnHeroNumber(isDone)}
        >
          {formatted}
        </motion.span>
        <span className="font-display text-xl font-bold text-accent-gold sm:text-2xl">
          {suffix}
        </span>
      </div>
      <span className="text-xs text-muted-foreground sm:text-sm">{label}</span>
    </div>
  );
}

// Tailwind class helper to apply gold flash when count completes.
function cnHeroNumber(done: boolean): string {
  const base =
    "font-display text-3xl font-bold tracking-tight-display sm:text-4xl transition-colors duration-300";
  return done ? `${base} text-accent-gold` : `${base} text-foreground`;
}

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement | null>(null);

  // Parallax: track hero scroll progress (top-of-hero at top of viewport →
  // bottom-of-hero at top of viewport).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const container = withReducedMotion(
    staggerContainer({ staggerChildren: 0.1, delayChildren: 0.05 }),
    reduce,
  );
  const statsContainer = withReducedMotion(
    staggerContainer({ staggerChildren: 0.08, delayChildren: 0.4 }),
    reduce,
  );
  const socialsContainer = withReducedMotion(
    staggerContainer({ staggerChildren: 0.06, delayChildren: 0.45 }),
    reduce,
  );

  const eyebrowV: Variants = {
    hidden: { opacity: 0, y: -12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const subheadV: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const quoteV: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 },
    },
  };
  const ctaV: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Split the H1 into words so we can do per-word reveal.
  const h1Words = ["Founder.", "Builder.", "AI Entrepreneur."];

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-label="Introduction"
      className="relative scroll-mt-24 overflow-hidden"
    >
      {/* Background image + blobs + grid (parallax layer) */}
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { y: bgY, opacity: bgOpacity }}
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
        <div className="absolute -left-32 top-10 size-[28rem] rounded-full bg-accent-gold/15 blur-[140px] animate-float-bob" />
        <div className="absolute right-0 top-40 size-[24rem] rounded-full bg-accent-blue/10 blur-[140px] animate-float-bob-slow" />
        <div className="absolute bottom-0 left-1/3 size-[20rem] rounded-full bg-accent-gold/8 blur-[120px] animate-float-bob" />
      </motion.div>

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="mx-auto flex max-w-6xl flex-col items-start gap-10 px-6 py-24 md:py-32 lg:grid lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:gap-12"
      >
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="flex flex-col items-start gap-7"
        >
          {/* Eyebrow */}
          <motion.span
            variants={withReducedMotion(eyebrowV, reduce)}
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-accent-gold"
          >
            <span className="size-1.5 rounded-full bg-accent-gold" />
            Founder &amp; CEO — Yumaris Agency
          </motion.span>

          {/* H1 with per-word blur+clip reveal */}
          <h1 className="font-display text-balance text-5xl font-bold leading-[1.05] tracking-tight-display sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="sr-only">Founder. Builder. AI Entrepreneur.</span>
            <motion.span
              variants={container}
              initial={reduce ? false : "hidden"}
              animate="show"
              aria-hidden="true"
              className="flex flex-wrap gap-x-4 gap-y-1"
            >
              {h1Words.map((word, idx) => (
                <motion.span
                  key={word}
                  variants={withReducedMotion(wordVariants, reduce)}
                  transition={{ delay: idx * 0.08 }}
                  className={
                    idx === h1Words.length - 1 ? "text-gradient-gold" : ""
                  }
                >
                  {word}
                </motion.span>
              ))}
            </motion.span>
          </h1>

          {/* Subhead */}
          <motion.p
            variants={withReducedMotion(subheadV, reduce)}
            className="max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            I build AI-powered products, software systems, educational
            platforms, and digital solutions that transform real-world problems
            into scalable technology.
          </motion.p>

          {/* Brand statement pull-quote */}
          <motion.blockquote
            variants={withReducedMotion(quoteV, reduce)}
            className="max-w-2xl border-l-2 border-accent-gold pl-5"
          >
            <p className="font-display text-balance text-lg italic text-foreground/90 sm:text-xl">
              I don&apos;t just learn technology.{" "}
              <span className="text-accent-gold">I build with it.</span>
            </p>
          </motion.blockquote>

          {/* CTAs — magnetic */}
          <motion.div
            variants={withReducedMotion(ctaV, reduce)}
            className="flex flex-wrap items-center gap-3"
          >
            <MagneticButton>
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
            </MagneticButton>
            <MagneticButton>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-accent-gold/40 text-foreground hover:bg-accent-gold/10 hover:text-accent-gold"
              >
                <Link href="#contact">Let&apos;s Build Something</Link>
              </Button>
            </MagneticButton>
          </motion.div>

          {/* Socials */}
          <motion.ul
            variants={socialsContainer}
            initial={reduce ? false : "hidden"}
            animate="show"
            className="flex items-center gap-2 pt-1"
          >
            {SOCIALS.map(({ label, Icon }) => (
              <motion.li key={label} variants={withReducedMotion(socialItem, reduce)}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info("Link coming soon", {
                      description: `${label} profile will be live shortly.`,
                    });
                  }}
                  aria-label={label}
                  className="group relative flex size-10 items-center justify-center rounded-xl border border-border/70 bg-card/60 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-accent-gold/60 hover:text-accent-gold hover:shadow-[0_0_20px_-6px_var(--accent-gold)]"
                >
                  <Icon className="size-4 transition-transform group-hover:scale-110" />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-accent-gold/0 transition-all duration-300 group-hover:ring-2 group-hover:ring-accent-gold/30"
                  />
                </button>
              </motion.li>
            ))}
          </motion.ul>

          {/* Stats strip */}
          <motion.div
            variants={statsContainer}
            initial={reduce ? false : "hidden"}
            animate="show"
            className="mt-2 grid w-full max-w-3xl grid-cols-2 gap-8 rounded-2xl border border-border/70 bg-card/40 p-6 backdrop-blur-sm sm:grid-cols-4"
          >
            {STATS.map((s) => (
              <StatItem key={s.label} {...s} />
            ))}
          </motion.div>
        </motion.div>

        {/* Portrait visual (desktop only) */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative mx-auto hidden w-full max-w-sm lg:block"
        >
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-accent-gold/25 via-accent-blue/10 to-transparent blur-3xl" />
          <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] border border-accent-gold/30 bg-card/40 p-2 backdrop-blur-sm glow-gold-sm">
            <div className="relative size-full overflow-hidden rounded-[1.4rem]">
              <Image
                src="/images/salman-portrait.png"
                alt="Salman Khan S. — Founder & CEO of Yumaris Agency"
                fill
                priority
                loading="eager"
                sizes="(min-width: 1024px) 30vw, 0px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
          </div>
          {/* Floating badge */}
          <motion.div
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-2xl border border-accent-gold/40 bg-background/80 px-4 py-3 backdrop-blur-md glow-gold-sm"
          >
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-gold opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-accent-gold" />
            </span>
            <div className="flex flex-col">
              <span className="font-display text-xs font-bold tracking-tight text-foreground">
                Available for work
              </span>
              <span className="text-[10px] text-muted-foreground">
                Founder &middot; Builder &middot; AI Entrepreneur
              </span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
