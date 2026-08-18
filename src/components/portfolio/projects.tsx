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

type Category = "AI/ML" | "Web App" | "3D/Creative" | "Agency";

interface Project {
  id: number;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  categories: Category[];
  stack: string[];
  liveUrl?: string;
  liveExternal?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Face Liveness Detection",
    tagline: "AI · Computer Vision",
    description:
      "Browser-based face liveness verification using TensorFlow.js, BlazeFace & ONNX.",
    longDescription:
      "A lightweight, browser-first face liveness detection system. Uses TensorFlow.js with the BlazeFace model and ONNX runtime for real-time webcam face detection, landmark tracking, and blink-based liveness verification. Built for UIDAI-style challenge contexts with a target model size under 5 MB and inference under 500 ms — no server round-trips, no PyTorch.",
    image: "/images/project-liveness.png",
    categories: ["AI/ML"],
    stack: ["TensorFlow.js", "BlazeFace", "ONNX", "Computer Vision", "JavaScript"],
  },
  {
    id: 2,
    title: "LogoMatic AI",
    tagline: "AI · Creative",
    description:
      "AI-powered logo generator producing brand-ready logos from text prompts.",
    longDescription:
      "An AI logo generation tool that turns text prompts into editable, brand-ready logos with multiple variants and SVG/PNG export. Combines a Python/FastAPI backend with a React + Tailwind frontend for a smooth creative workflow.",
    image: "/images/project-logomatic.png",
    categories: ["AI/ML"],
    stack: ["Python", "FastAPI", "React", "Tailwind CSS", "AI"],
  },
  {
    id: 3,
    title: "WorkVision",
    tagline: "Web App · Analytics",
    description:
      "AI-powered performance analysis turning raw data into clear insights.",
    longDescription:
      "A performance analytics platform that transforms workplace data into interactive dashboards and predictive insights. Built with React, Node.js/Express, and PostgreSQL with Recharts visualizations.",
    image: "/images/project-workvision.png",
    categories: ["Web App"],
    stack: ["React", "Node.js", "Express", "PostgreSQL", "Recharts"],
  },
  {
    id: 4,
    title: "Yumaris Agency Platform",
    tagline: "Agency · Brand",
    description:
      "Founded & led Yumaris Agency — branding, web, and learning services.",
    longDescription:
      "Founded and lead Yumaris Agency, an online platform offering online learning, website design, photo & video editing, internship packages, and branding solutions. Delivered the agency website, service descriptions, QR-code-based service promotions, posters, and social media content.",
    image: "/images/project-yumaris.png",
    categories: ["Agency"],
    stack: ["React", "Firebase", "Tailwind CSS", "Figma", "Branding"],
    liveUrl: "https://yumarisagency.web.app",
    liveExternal: true,
  },
  {
    id: 5,
    title: "Voice-Controlled Gaming Tools",
    tagline: "3D/Creative · Accessibility",
    description:
      "Voice-driven game controls with real-time waveform visualization.",
    longDescription:
      "A toolkit enabling hands-free game interaction through voice commands, built with the Web Speech API and real-time audio waveform visualization. Designed for accessibility and immersive play.",
    image: "/images/project-voicegame.png",
    categories: ["3D/Creative"],
    stack: ["JavaScript", "Web Speech API", "Three.js", "Canvas"],
  },
  {
    id: 6,
    title: "3D Interactive Web Experience",
    tagline: "3D/Creative · Motion",
    description: "Immersive 3D website with scroll-driven camera motion.",
    longDescription:
      "An immersive 3D website combining Three.js scenes, scroll-driven camera motion, Framer Motion transitions, Lottie micro-animations, and glassmorphism UI for a premium interactive feel.",
    image: "/images/project-3dweb.png",
    categories: ["3D/Creative"],
    stack: ["Three.js", "Framer Motion", "Lottie", "React", "Vite"],
  },
];

const FILTERS = ["All", "AI/ML", "Web App", "3D/Creative", "Agency"] as const;
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
      description: "Link coming soon — drop me a message and I'll share it.",
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
          eyebrow="Selected Work"
          title={
            <span id="work-heading">
              Projects I&apos;m{" "}
              <span className="text-gradient-gold">proud of</span>
            </span>
          }
          description="A mix of browser-first AI/CV, full-stack apps, 3D experiences, and agency builds — each shipped and documented."
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
                  ? "border-accent-gold/60 bg-accent-gold/10 text-accent-gold"
                  : "border-border/70 bg-card/40 text-muted-foreground hover:border-accent-gold/40 hover:text-foreground",
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
                <Card className="group relative h-full overflow-hidden p-0 transition-all hover:-translate-y-1.5 hover:border-accent-gold/50 hover:shadow-[0_0_44px_-14px_var(--accent-gold)]">
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
                            className="border-accent-gold/30 bg-background/80 text-[11px] text-accent-gold backdrop-blur"
                          >
                            {c}
                          </Badge>
                        ))}
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
                        <div className="flex flex-col">
                          <span className="text-[11px] font-medium uppercase tracking-wide text-accent-gold">
                            {project.tagline}
                          </span>
                          <h3 className="text-lg font-semibold leading-tight tracking-tight">
                            {project.title}
                          </h3>
                        </div>
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-accent-gold/40 bg-background/80 text-accent-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
                      {project.liveExternal && project.liveUrl ? (
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="h-8 flex-1 border-accent-gold/30 hover:bg-accent-gold/10 hover:text-accent-gold"
                        >
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="size-3.5" />
                            Live Demo
                          </a>
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 flex-1 border-accent-gold/30 hover:bg-accent-gold/10 hover:text-accent-gold"
                          onClick={() => handleLink("live", project.title)}
                        >
                          <ExternalLink className="size-3.5" />
                          Live Demo
                        </Button>
                      )}
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
                      className="border-accent-gold/30 bg-background/80 text-accent-gold backdrop-blur"
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
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-accent-gold">
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
                  className="border-accent-gold/30 hover:bg-accent-gold/10 hover:text-accent-gold"
                  onClick={() => handleLink("source", selected.title)}
                >
                  <Github className="size-4" />
                  Source
                </Button>
                {selected.liveExternal && selected.liveUrl ? (
                  <Button asChild className="bg-accent-gold text-accent-gold-foreground hover:bg-accent-gold/90">
                    <a
                      href={selected.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="size-4" />
                      Live Demo
                    </a>
                  </Button>
                ) : (
                  <Button
                    className="bg-accent-gold text-accent-gold-foreground hover:bg-accent-gold/90"
                    onClick={() => handleLink("live", selected.title)}
                  >
                    <ExternalLink className="size-4" />
                    Live Demo
                  </Button>
                )}
              </DialogFooter>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
