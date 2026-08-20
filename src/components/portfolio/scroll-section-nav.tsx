"use client";

import * as React from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

interface SectionLink {
  id: string;
  label: string;
}

const SECTIONS: SectionLink[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "skills", label: "Skills" },
  { id: "yumaris", label: "Yumaris" },
  { id: "ai", label: "AI" },
  { id: "work", label: "Work" },
  { id: "edtech", label: "EdTech" },
  { id: "leadership", label: "Leadership" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

/**
 * Fixed, thin vertical dot indicator on the right side (desktop only).
 * Shows the current section among the main anchors. Clicking smooth-scrolls.
 *
 * Decorative navigation aid — uses `aria-label` for screen readers.
 */
export function ScrollSectionNav() {
  const reduce = useReducedMotion();
  const [active, setActive] = React.useState<string>("home");
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    const updateVisible = () => setVisible(mq.matches);
    updateVisible();
    mq.addEventListener("change", updateVisible);
    return () => mq.removeEventListener("change", updateVisible);
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const sections = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the largest intersection ratio that is intersecting.
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (!best || entry.intersectionRatio > best.intersectionRatio) {
            best = entry;
          }
        }
        if (best) {
          setActive(best.target.id);
        }
      },
      {
        // Trigger when section is roughly within the viewport middle band.
        rootMargin: "-40% 0px -50% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );
    for (const el of sections) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.nav
          aria-label="Section navigation"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 md:block"
        >
          <ul className="flex flex-col items-end gap-3">
            {SECTIONS.map((s) => {
              const isActive = active === s.id;
              return (
                <li key={s.id} className="pointer-events-auto">
                  <a
                    href={`#${s.id}`}
                    onClick={handleClick(s.id)}
                    className="group flex items-center justify-end gap-2"
                    aria-label={`Jump to ${s.label}`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span
                      className={`text-[11px] font-medium uppercase tracking-[0.14em] transition-all duration-300 ${
                        isActive
                          ? "text-accent-gold opacity-100"
                          : "text-muted-foreground opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      {s.label}
                    </span>
                    <span className="relative flex size-3 items-center justify-center">
                      <motion.span
                        className="block rounded-full"
                        animate={
                          reduce
                            ? undefined
                            : {
                                scale: isActive ? 1 : 0.7,
                                opacity: isActive ? 1 : 0.4,
                              }
                        }
                        transition={{
                          duration: 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{
                          width: isActive ? 10 : 8,
                          height: isActive ? 10 : 8,
                          backgroundColor: isActive
                            ? "var(--accent-gold)"
                            : "var(--muted-foreground)",
                          boxShadow: isActive
                            ? "0 0 12px -2px var(--accent-gold)"
                            : "none",
                        }}
                      />
                      {isActive && !reduce ? (
                        <motion.span
                          layoutId="section-nav-ring"
                          className="absolute inset-0 -z-10 rounded-full border border-accent-gold/40"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 26,
                          }}
                        />
                      ) : null}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </motion.nav>
      ) : null}
    </AnimatePresence>
  );
}
