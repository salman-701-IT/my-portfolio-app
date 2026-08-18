"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  color: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Aarav Mehta",
    role: "VP Product",
    company: "Nimbus Labs",
    quote:
      "Salman turned a vague spec into a shipping product in six weeks. His eye for detail and relentless focus on performance made the whole team better. Easily one of the strongest engineers I've worked with.",
    rating: 5,
    color: "from-emerald-400 to-teal-500",
  },
  {
    name: "Priya Nair",
    role: "Design Director",
    company: "PixelForge",
    quote:
      "Rare to find an engineer who actually reads the Figma file. Salman cared about spacing, motion, and accessibility as much as we did — the design system he shipped is still the foundation we build on.",
    rating: 5,
    color: "from-teal-400 to-cyan-500",
  },
  {
    name: "Daniel Okafor",
    role: "CTO",
    company: "Vertex Digital",
    quote:
      "We hired Salman to ship one app and ended up giving him three. He mentors juniors without ego, writes code his teammates can read, and quietly raises the bar on everything he touches.",
    rating: 5,
    color: "from-cyan-400 to-emerald-500",
  },
  {
    name: "Sara Lindqvist",
    role: "Founder",
    company: "LearnLoop (OSS)",
    quote:
      "Salman's open-source contributions to LearnLoop were exceptional — clean PRs, thoughtful docs, and accessibility fixes we'd missed. The kind of maintainer every project wishes they had.",
    rating: 5,
    color: "from-emerald-400 to-green-500",
  },
  {
    name: "Karan Shah",
    role: "Engineering Manager",
    company: "FinTrack",
    quote:
      "Our dashboards were slow and buggy before Salman. He re-architected the data layer, virtualized our tables, and got p95 under 200ms. Numbers went up, support tickets went down.",
    rating: 5,
    color: "from-teal-400 to-emerald-500",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  const reduce = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });
  const [selected, setSelected] = React.useState(0);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  React.useEffect(() => {
    if (!emblaApi || reduce) return;
    const id = setInterval(() => {
      emblaApi.scrollNext();
    }, 5500);
    return () => clearInterval(id);
  }, [emblaApi, reduce]);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="scroll-mt-24 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <span id="testimonials-heading">
              Kind words from{" "}
              <span className="text-gradient-emerald">collaborators</span>
            </span>
          }
          description="A few notes from folks I've shipped alongside — founders, designers, and engineers."
        />

        <div className="relative mt-12">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {TESTIMONIALS.map((t, idx) => (
                <div
                  key={t.name}
                  className="min-w-0 flex-[0_0_100%] px-1 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                      delay: idx * 0.04,
                    }}
                    className="h-full p-2"
                  >
                    <Card className="relative flex h-full flex-col gap-5 overflow-hidden p-6 transition-all hover:border-accent-emerald/40 hover:shadow-[0_0_36px_-12px_var(--accent-emerald)]">
                      <Quote
                        className="size-8 text-accent-emerald/40"
                        aria-hidden="true"
                      />
                      <p className="flex-1 text-sm leading-relaxed text-foreground/90">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "size-4",
                              i < t.rating
                                ? "fill-accent-emerald text-accent-emerald"
                                : "text-muted-foreground/30",
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-3 border-t border-border/70 pt-4">
                        <div
                          className={cn(
                            "flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white shadow-[0_0_18px_-6px_var(--accent-emerald)]",
                            t.color,
                          )}
                          aria-hidden="true"
                        >
                          {initials(t.name)}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold">
                            {t.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {t.role} · {t.company}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-accent-emerald/30 hover:bg-accent-emerald/10 hover:text-accent-emerald"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <div className="flex items-center gap-1.5">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === selected
                      ? "w-6 bg-accent-emerald"
                      : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/70",
                  )}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-accent-emerald/30 hover:bg-accent-emerald/10 hover:text-accent-emerald"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next testimonial"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
