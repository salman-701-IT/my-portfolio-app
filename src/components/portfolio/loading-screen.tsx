"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  Boot sequence lines                                                       */
/* -------------------------------------------------------------------------- */

interface BootLine {
  text: string;
  /** Marks this line as a "done" status (gets a gold check). */
  done?: boolean;
  /** Render as a heading / section divider. */
  head?: boolean;
}

const BOOT_LINES: BootLine[] = [
  { text: "› boot: salman-khan-portfolio v2.5.0", head: true },
  { text: "› initializing design system …", done: true },
  { text: "› loading fonts: libre-baskerville, poppins …", done: true },
  { text: "› mounting hero · about · journey …", done: true },
  { text: "› calibrating AI agents [6] …", done: true },
  { text: "› linking yumaris agency ecosystem …", done: true },
  { text: "› warming scroll animations …", done: true },
  { text: "› portfolio ready", head: true },
];

const CHAR_DELAY = 18; // ms per character when typing
const LINE_GAP = 90; // ms pause between lines
const DONE_HOLD = 320; // ms hold after completion before fade
const FADE_MS = 620; // fade-out duration

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export function LoadingScreen() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [done, setDone] = React.useState(false);

  // SSR guard + once-per-session guard.
  React.useEffect(() => {
    setMounted(true);
    try {
      if (sessionStorage.getItem("sk_loaded_once") === "1") {
        return; // skip loader on repeat visits within the same session
      }
    } catch {
      /* ignore */
    }
    setVisible(true);
  }, []);

  // Drive the boot sequence.
  React.useEffect(() => {
    if (!visible || done) return;

    // Reduced motion: skip typing, just hold briefly then fade.
    if (reduce) {
      const t = window.setTimeout(() => setDone(true), 480);
      return () => window.clearTimeout(t);
    }

    let cancelled = false;
    let elapsed = 0;

    // total time = sum of all char delays + gaps, computed loosely
    const totalChars = BOOT_LINES.reduce((n, l) => n + l.text.length, 0);
    const totalTime =
      totalChars * CHAR_DELAY + BOOT_LINES.length * LINE_GAP + DONE_HOLD;

    const t = window.setTimeout(() => {
      if (!cancelled) setDone(true);
    }, totalTime);

    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [visible, done, reduce]);

  // After done flag flips, fade out then unmount + mark session.
  React.useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem("sk_loaded_once", "1");
      } catch {
        /* ignore */
      }
    }, 60);
    return () => window.clearTimeout(t);
  }, [done]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading-screen"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: FADE_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 px-6 backdrop-blur-sm"
        >
          {/* Subtle grid backdrop */}
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 mask-fade-b" />

          {/* Gold radial glow behind the window */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-gold/10 blur-3xl"
          />

          {/* Editor window */}
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-xl border border-border/70 bg-card/80 shadow-2xl backdrop-blur-md glow-gold-sm"
          >
            {/* Title bar */}
            <div className="flex items-center gap-3 border-b border-border/70 bg-background/60 px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="size-3 rounded-full bg-accent-gold/80" />
                <span className="size-3 rounded-full bg-muted-foreground/40" />
                <span className="size-3 rounded-full bg-muted-foreground/40" />
              </div>
              <div className="mx-auto flex items-center gap-2 rounded-md border border-border/60 bg-background/50 px-3 py-1 font-mono text-[11px] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-accent-gold/80" />
                salman-khan.tsx
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
                loading
              </div>
            </div>

            {/* Code body */}
            <div className="relative px-5 py-5 font-mono text-[12px] leading-relaxed sm:text-[13px]">
              {/* line numbers gutter */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 flex h-full w-10 flex-col items-end gap-0 border-r border-border/40 px-2 py-5 text-[10px] text-muted-foreground/30"
              >
                {BOOT_LINES.map((_, i) => (
                  <span key={i} className="leading-relaxed">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                ))}
              </div>

              <div className="pl-8">
                <TypewriterLines lines={BOOT_LINES} reduce={!!reduce} />

                {/* Blinking cursor */}
                <motion.span
                  aria-hidden
                  animate={{ opacity: reduce ? 1 : [1, 0, 1] }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { duration: 0.9, repeat: Infinity, ease: "linear" }
                  }
                  className="ml-0.5 inline-block h-[1.1em] w-[8px] translate-y-[2px] bg-accent-gold"
                />
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-[2px] w-full bg-border/50">
              <ProgressBar reduce={!!reduce} />
            </div>
          </motion.div>

          {/* Corner status text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60"
          >
            {done ? "ready" : "compiling portfolio…"}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/*  Typewriter — reveals each line char-by-char                               */
/* -------------------------------------------------------------------------- */

function TypewriterLines({
  lines,
  reduce,
}: {
  lines: BootLine[];
  reduce: boolean;
}) {
  const [revealedLines, setRevealedLines] = React.useState<number>(
    reduce ? lines.length : 0
  );
  const [chars, setChars] = React.useState<number>(reduce ? Infinity : 0);

  React.useEffect(() => {
    if (reduce) return; // all shown instantly

    let cancelled = false;
    let charTimer: number;
    let lineTimer: number;

    const run = () => {
      if (revealedLines >= lines.length) return;
      const currentLine = lines[revealedLines];

      if (chars >= currentLine.text.length) {
        // move to next line after a gap
        lineTimer = window.setTimeout(() => {
          if (cancelled) return;
          setRevealedLines((n) => n + 1);
          setChars(0);
        }, LINE_GAP);
        return;
      }

      charTimer = window.setTimeout(() => {
        if (cancelled) return;
        setChars((c) => c + 1);
      }, CHAR_DELAY);
    };

    run();

    return () => {
      cancelled = true;
      window.clearTimeout(charTimer);
      window.clearTimeout(lineTimer);
    };
  }, [revealedLines, chars, lines, reduce]);

  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        const isShown = i < revealedLines || (i === revealedLines && chars > 0);
        if (!isShown && i > revealedLines) {
          // render an empty line to keep the gutter stable
          return <div key={i} className="h-[1.4em]" />;
        }
        const shownText =
          i < revealedLines ? line.text : line.text.slice(0, chars);

        return (
          <div key={i} className="flex h-[1.4em] items-start gap-2">
            <span
              className={
                line.head
                  ? "shrink-0 text-accent-gold"
                  : "shrink-0 text-muted-foreground/50"
              }
            >
              {line.head ? "◆" : "·"}
            </span>
            <span
              className={
                line.head
                  ? "text-foreground"
                  : "text-muted-foreground"
              }
            >
              {shownText}
              {line.done && i < revealedLines && (
                <span className="ml-2 inline-flex items-center gap-1 text-accent-gold">
                  <CheckIcon /> ok
                </span>
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Progress bar — fills as lines complete                                    */
/* -------------------------------------------------------------------------- */

function ProgressBar({ reduce }: { reduce: boolean }) {
  const [progress, setProgress] = React.useState(reduce ? 100 : 0);

  React.useEffect(() => {
    if (reduce) return;

    const totalSteps = BOOT_LINES.length;
    let step = 0;

    const tick = () => {
      step += 1;
      setProgress(Math.min(100, Math.round((step / totalSteps) * 100)));
      if (step < totalSteps) {
        timer = window.setTimeout(tick, 240 + step * 30);
      }
    };
    let timer = window.setTimeout(tick, 200);

    return () => window.clearTimeout(timer);
  }, [reduce]);

  return (
    <motion.div
      className="h-full bg-gradient-to-r from-accent-gold via-amber-300 to-accent-blue"
      initial={{ width: reduce ? "100%" : "0%" }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
