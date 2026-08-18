"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";

type Category = "Web App" | "Mobile" | "SaaS" | "Open Source";

interface Project {
  id: number;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  categories: Category[];
  stack: string[];
  highlights: string[];
  liveUrl?: string;
  sourceUrl?: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "FinTrack",
    tagline: "Fintech Dashboard",
    description:
      "Real-time financial analytics dashboard with predictive insights.",
    longDescription:
      "FinTrack is a real-time financial analytics dashboard for ops teams at a Series-B fintech. It ingests transaction streams, surfaces anomalies with predictive insights, and lets analysts drill from a portfolio view down to individual ledger entries in under two clicks. Built to render 100k+ rows smoothly using virtualization and server-side aggregations.",
    image: "/images/project-1.png",
    categories: ["Web App", "SaaS"],
    stack: ["React", "Next.js", "Prisma", "Recharts"],
    highlights: [
      "Sub-200ms p95 dashboard loads via edge caching",
      "Virtualized tables for 100k+ rows",
      "Role-based access with audit logging",
    ],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    id: 2,
    title: "Nexus AI",
    tagline: "Chat Assistant",
    description:
      "Multi-modal AI chat with streaming responses and voice input.",
    longDescription:
      "Nexus AI is a multi-modal chat assistant with streaming responses, voice input, and tool-calling for browsing the web and executing user-defined functions. The frontend streams tokens via Server-Sent Events with optimistic UI, while the backend coordinates model routing, rate limiting, and per-tenant usage tracking.",
    image: "/images/project-2.png",
    categories: ["Web App"],
    stack: ["Next.js", "OpenAI", "WebSocket", "Tailwind"],
    highlights: [
      "Token streaming with optimistic rendering",
      "Voice input via WebRTC + Whisper",
      "Per-tenant rate limiting & usage meters",
    ],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    id: 3,
    title: "ShopFlow",
    tagline: "E-commerce App",
    description: "Cross-platform shopping experience with one-tap checkout.",
    longDescription:
      "ShopFlow is a cross-platform e-commerce app focused on reducing checkout friction. A one-tap checkout flow, native payment sheets, and an offline-first cart drove a 23% lift in conversion in the first quarter post-launch. Built with React Native, Redux, and Stripe for both iOS and Android from a single codebase.",
    image: "/images/project-3.png",
    categories: ["Mobile"],
    stack: ["React Native", "Stripe", "Redux"],
    highlights: [
      "One-tap checkout with native payment sheets",
      "Offline-first cart with background sync",
      "Push notifications & deep linking",
    ],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    id: 4,
    title: "MediCare",
    tagline: "Health Analytics",
    description: "HIPAA-compliant patient analytics for clinics.",
    longDescription:
      "MediCare delivers HIPAA-compliant patient analytics for mid-sized clinics. It aggregates EHR data, visualizes population health, and flags patients at risk of readmission. Every layer — from row-level security in PostgreSQL to audit logging and PHI redaction in logs — was built to satisfy a real-world compliance review.",
    image: "/images/project-4.png",
    categories: ["SaaS"],
    stack: ["Next.js", "D3.js", "Node.js", "PostgreSQL"],
    highlights: [
      "HIPAA-aligned architecture & audit logs",
      "Row-level security in PostgreSQL",
      "Population health risk scoring",
    ],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    id: 5,
    title: "EstateHub",
    tagline: "Real Estate Platform",
    description: "Property discovery with interactive maps and AR previews.",
    longDescription:
      "EstateHub is a property discovery platform combining interactive Mapbox maps with AR room previews. Buyers can drop into a neighborhood, filter by school district and walk score, and preview unfurnished rooms with their own furniture using WebXR. Listing agents get a CMS-driven workflow with media management built in.",
    image: "/images/project-5.png",
    categories: ["Web App"],
    stack: ["Next.js", "Mapbox", "Prisma"],
    highlights: [
      "Interactive Mapbox with custom tiles",
      "AR room previews via WebXR",
      "CMS-driven agent workflow",
    ],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    id: 6,
    title: "LearnLoop",
    tagline: "EdTech Platform",
    description: "Open-source collaborative learning with live classrooms.",
    longDescription:
      "LearnLoop is an open-source collaborative learning platform with live classrooms, shared whiteboards, and breakout rooms — all running on WebRTC. Designed to be self-hostable by schools and nonprofits, it ships with a documented deployment story, IaC, and accessibility-first defaults for low-bandwidth environments.",
    image: "/images/project-6.png",
    categories: ["Open Source"],
    stack: ["React", "Node.js", "WebRTC"],
    highlights: [
      "Live classrooms on WebRTC with breakouts",
      "Self-hostable with one-command IaC",
      "Low-bandwidth & a11y-first defaults",
    ],
    liveUrl: "#",
    sourceUrl: "#",
  },
];

const FILTERS = ["All", "Web App", "Mobile", "SaaS", "Open Source"] as const;
type Filter = (typeof FILTERS)[number];

export function Projects() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = React.useState<Filter>("All");
  const [selected, setSelected] = React.useState<Project | null>(null);

  const visible = React.useMemo(() => {
    if (filter === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.categories.includes(filter as Category));
  }, [filter]);

  const handleLink = (kind: "live" | "source", title: string) => {
    toast.info(`${kind === "live" ? "Live demo" : "Source code"} for ${title}`, {
      description: "Links are placeholders on this portfolio demo.",
    });
  };

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="scroll-mt-24 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Work"
          title={
            <span id="work-heading">
              Selected <span className="text-gradient-emerald">projects</span>
            </span>
          }
          description="A mix of client work, open-source, and product builds — each shipped to production."
        />

        {/* Filter tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={cn(
                "relative rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                filter === f
                  ? "border-accent-emerald/60 bg-accent-emerald/10 text-accent-emerald"
                  : "border-border/70 bg-card/40 text-muted-foreground hover:border-accent-emerald/40 hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group"
              >
                <Card className="group relative h-full overflow-hidden p-0 transition-all hover:-translate-y-1.5 hover:border-accent-emerald/50 hover:shadow-[0_0_44px_-14px_var(--accent-emerald)]">
                  <button
                    type="button"
                    onClick={() => setSelected(project)}
                    className="block w-full text-left"
                    aria-label={`Open details for ${project.title}`}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={project.image}
                        alt={`${project.title} — ${project.tagline}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
                      <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                        {project.categories.map((c) => (
                          <Badge
                            key={c}
                            variant="secondary"
                            className="border-accent-emerald/30 bg-background/80 text-[11px] text-accent-emerald backdrop-blur"
                          >
                            {c}
                          </Badge>
                        ))}
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
                        <div className="flex flex-col">
                          <span className="text-[11px] font-medium uppercase tracking-wide text-accent-emerald">
                            {project.tagline}
                          </span>
                          <h3 className="text-lg font-semibold leading-tight tracking-tight">
                            {project.title}
                          </h3>
                        </div>
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-accent-emerald/40 bg-background/80 text-accent-emerald opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <ArrowUpRight className="size-4" />
                        </span>
                      </div>
                    </div>
                  </button>

                  <div className="flex flex-col gap-3 p-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border/70 bg-background/60 px-2 py-0.5 text-[11px] font-medium text-foreground/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 flex-1 border-accent-emerald/30 hover:bg-accent-emerald/10 hover:text-accent-emerald"
                        onClick={() => handleLink("live", project.title)}
                      >
                        <ExternalLink className="size-3.5" />
                        Live Demo
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 flex-1"
                        onClick={() => handleLink("source", project.title)}
                      >
                        <Github className="size-3.5" />
                        Source
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Detail dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl overflow-hidden p-0">
          {selected ? (
            <>
              <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                <Image
                  src={selected.image}
                  alt={`${selected.title} — ${selected.tagline}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex flex-wrap gap-1.5">
                  {selected.categories.map((c) => (
                    <Badge
                      key={c}
                      variant="secondary"
                      className="border-accent-emerald/30 bg-background/80 text-accent-emerald backdrop-blur"
                    >
                      {c}
                    </Badge>
                  ))}
                </div>
              </div>
              <DialogHeader className="px-6 pt-4">
                <DialogTitle className="text-xl">
                  {selected.title}{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    — {selected.tagline}
                  </span>
                </DialogTitle>
                <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                  {selected.longDescription}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 px-6">
                <div className="flex flex-col gap-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-accent-emerald">
                    Highlights
                  </h4>
                  <ul className="flex flex-col gap-1.5">
                    {selected.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-sm text-foreground/90"
                      >
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-emerald" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-accent-emerald">
                    Tech stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border/70 bg-muted/40 px-2 py-0.5 text-xs font-medium text-foreground/90"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter className="px-6 pb-6">
                <Button
                  variant="outline"
                  className="border-accent-emerald/30 hover:bg-accent-emerald/10 hover:text-accent-emerald"
                  onClick={() => handleLink("source", selected.title)}
                >
                  <Github className="size-4" />
                  Source
                </Button>
                <Button
                  className="bg-accent-emerald text-accent-emerald-foreground hover:bg-accent-emerald/90"
                  onClick={() => handleLink("live", selected.title)}
                >
                  <ExternalLink className="size-4" />
                  Live Demo
                </Button>
              </DialogFooter>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
