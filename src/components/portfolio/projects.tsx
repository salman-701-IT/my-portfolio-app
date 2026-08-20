"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ExternalLink,
  ArrowUpRight,
  CalendarClock,
  Cpu,
  Lightbulb,
  Target,
  UserCog,
  Layers,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SectionHeading } from "./section-heading";
import { TiltCard } from "./tilt-card";
import {
  staggerContainer,
  staggerItem,
  withReducedMotion,
} from "./motion-variants";
import { cn } from "@/lib/utils";

type Category = "AI/ML" | "Software" | "EdTech" | "Automation" | "Web";

interface FeaturedProject {
  id: number;
  title: string;
  image: string;
  category: Category;
  problem: string;
  solution: string;
  role: string;
  technologies: string[];
  features: string[];
  status: string;
  futureScope: string;
  liveUrl?: string;
}

interface CompactProject {
  Icon: LucideIcon;
  title: string;
  description: string;
  category: Category;
}

const FEATURED: FeaturedProject[] = [
  {
    id: 1,
    title: "AI-Powered HRMS",
    image: "/images/project-hrms.png",
    category: "Software",
    problem:
      "Fragmented HR data across attendance, recruitment, and employee records.",
    solution:
      "Centralized HR platform combining traditional HRMS with AI-assisted operations.",
    role: "Product planning, system architecture, AI feature planning, team management.",
    technologies: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Java",
      "Spring Boot",
      "Firebase/Firestore",
      "AI/LLM",
    ],
    features: [
      "Employee management",
      "Attendance",
      "Recruitment pipeline",
      "HR operations",
      "AI assistant layer",
    ],
    status: "In development",
    futureScope:
      "Face-recognition attendance, AI analytics, workflow automation.",
  },
  {
    id: 2,
    title: "AI Business Assistant",
    image: "/images/project-ai-assistant.png",
    category: "AI/ML",
    problem: "Repetitive manual work to find and process business information.",
    solution:
      "Conversational AI assistant with RAG over internal business knowledge.",
    role: "AI solution design, architecture, development.",
    technologies: ["LLMs", "RAG", "Vector Search", "Node.js", "React"],
    features: [
      "Business knowledge retrieval",
      "Document analysis",
      "Q&A",
      "Automated summaries",
      "RAG knowledge base",
    ],
    status: "Concept → prototype",
    futureScope: "Multi-agent orchestration, workflow automation.",
  },
  {
    id: 3,
    title: "AI Sales Workflow",
    image: "/images/project-ai-sales.png",
    category: "Automation",
    problem: "Manual, repetitive lead-management activities.",
    solution: "AI-driven sales automation across the full lead lifecycle.",
    role: "Product strategy, AI workflow design.",
    technologies: ["LLMs", "Node.js", "React", "CRM integration"],
    features: [
      "Lead generation → qualification → scoring → follow-up",
      "Conversion tracking",
      "Reporting",
    ],
    status: "Concept",
    futureScope:
      "CRM integration, automated reporting, sales forecasting.",
  },
  {
    id: 4,
    title: "AI Document Retrieval",
    image: "/images/project-doc-retrieval.png",
    category: "AI/ML",
    problem: "Hours lost manually searching hundreds of company documents.",
    solution:
      "Upload documents, ask natural-language questions, get retrieved answers.",
    role: "Architecture, AI integration.",
    technologies: [
      "LLMs",
      "Embeddings",
      "Vector Search",
      "RAG",
      "Document processing",
    ],
    features: [
      "Document ingestion",
      "Vector embeddings",
      "Semantic search",
      "Cited answers",
    ],
    status: "Prototype",
    futureScope:
      "Knowledge-base management UI, access control, multi-org.",
  },
  {
    id: 5,
    title: "Internship Management Platform",
    image: "/images/project-internship.png",
    category: "EdTech",
    problem: "Internships reduced to a participation certificate.",
    solution:
      "Structured internship lifecycle from registration to certificate.",
    role: "Product design, development, mentor coordination.",
    technologies: ["React", "Node.js", "Firebase", "Spring Boot"],
    features: [
      "Registration → role allocation → team formation → tasks",
      "Attendance → scrum → progress tracking",
      "Mentor evaluation → certificate",
    ],
    status: "In development",
    futureScope: "AI mentor assistant, automated evaluation.",
  },
  {
    id: 6,
    title: "Yumaris Agency Platform",
    image: "/images/project-yumaris.png",
    category: "Web",
    problem: "Businesses need a unified technology partner.",
    solution:
      "Agency platform offering AI, software, web, EdTech, branding services.",
    role:
      "Founder & CEO — product, strategy, brand, development supervision.",
    technologies: ["React", "Firebase", "Tailwind CSS", "Figma"],
    features: [
      "Service catalog",
      "QR-code promotions",
      "Branding",
      "Social content",
    ],
    status: "Live",
    liveUrl: "https://yumarisagency.web.app",
  },
];

const COMPACT: CompactProject[] = [
  {
    Icon: CalendarClock,
    title: "Attendance Management System",
    description: "Automated attendance with face-recognition potential.",
    category: "Automation",
  },
  {
    Icon: Lightbulb,
    title: "AI MCQ / Assessment Generator",
    description: "Auto-generate MCQs from learning content.",
    category: "EdTech",
  },
  {
    Icon: Layers,
    title: "Automatic File Organizer",
    description: "Classify files by type, project, date, rules.",
    category: "Automation",
  },
  {
    Icon: UserCog,
    title: "CRM / Business Management",
    description: "Centralized leads, sales, follow-ups, tasks.",
    category: "Software",
  },
  {
    Icon: CheckCircle2,
    title: "Student Assessment Platform",
    description: "Question banks, online exams, analytics.",
    category: "EdTech",
  },
  {
    Icon: Cpu,
    title: "Certificate Generation System",
    description: "Automated certificates with verification.",
    category: "Software",
  },
];

const FILTERS = ["All", "AI/ML", "Software", "EdTech", "Automation", "Web"] as const;
type Filter = (typeof FILTERS)[number];

function DetailRow({
  Icon,
  label,
  children,
}: {
  Icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={withReducedMotion(staggerItem({ duration: 0.4 }), reduce)}
      className="flex flex-col gap-1.5"
    >
      <div className="flex items-center gap-2">
        <Icon className="size-3.5 text-accent-gold" />
        <h4 className="text-[11px] font-semibold uppercase tracking-wide text-accent-gold">
          {label}
        </h4>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{children}</p>
    </motion.div>
  );
}

// Stagger container for Dialog content.
const dialogContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export function Projects() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = React.useState<Filter>("All");
  const [selected, setSelected] = React.useState<FeaturedProject | null>(null);

  const visible = React.useMemo(() => {
    if (filter === "All") return FEATURED;
    return FEATURED.filter((p) => p.category === filter);
  }, [filter]);

  const visibleCompact = React.useMemo(() => {
    if (filter === "All") return COMPACT;
    return COMPACT.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="scroll-mt-24 bg-muted/30 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          align="left"
          eyebrow="Products & Solutions"
          title={
            <span id="work-heading">
              Technology I&apos;m{" "}
              <span className="text-gradient-gold">building.</span>
            </span>
          }
          description="Featured products and solutions across AI/ML, software, EdTech, automation, and web — each with a clear problem, solution, and roadmap."
        />

        {/* Filter tabs */}
        <div className="mt-10 flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={isActive}
                className={cn(
                  "relative rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "border-accent-gold/60 bg-accent-gold/10 text-accent-gold"
                    : "border-border/70 bg-card/40 text-muted-foreground hover:border-accent-gold/40 hover:text-foreground",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="filter-tab-pill"
                    className="absolute inset-0 -z-10 rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    style={{
                      background:
                        "linear-gradient(120deg, var(--accent-gold), oklch(0.78 0.12 70))",
                      opacity: 0.12,
                    }}
                  />
                ) : null}
                {f}
              </button>
            );
          })}
        </div>

        {/* Featured grid */}
        <motion.div
          layout
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project, idx) => (
              <motion.article
                key={project.id}
                layout
                initial={reduce ? false : { opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                  delay: idx * 0.05,
                }}
                className="group"
              >
                <TiltCard className="h-full">
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
                        alt={`${project.title} — ${project.category} product`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
                      <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                        <Badge
                          variant="secondary"
                          className="border-accent-gold/30 bg-background/80 text-[11px] text-accent-gold backdrop-blur"
                        >
                          {project.category}
                        </Badge>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
                        <div className="flex flex-col">
                          <h3 className="font-display text-lg font-semibold leading-tight tracking-tight">
                            {project.title}
                          </h3>
                          <span className="text-[11px] text-muted-foreground">
                            {project.status}
                          </span>
                        </div>
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-accent-gold/40 bg-background/80 text-accent-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <ArrowUpRight className="size-4" />
                        </span>
                      </div>
                    </div>
                  </button>

                  <div className="flex flex-col gap-3 p-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {project.problem}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border/70 bg-background/60 px-2 py-0.5 text-[11px] font-medium text-foreground/80"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 ? (
                        <span className="rounded-md border border-border/70 bg-background/60 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                          +{project.technologies.length - 4}
                        </span>
                      ) : null}
                    </div>
                    {project.liveUrl ? (
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="h-8 w-full border-accent-gold/30 hover:bg-accent-gold/10 hover:text-accent-gold"
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
                    ) : null}
                  </div>
                </Card>
              </TiltCard>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Compact grid — More products & concepts */}
        {visibleCompact.length > 0 ? (
          <div className="mt-14">
            <h3 className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              More Products & Concepts
            </h3>
            <motion.div
              layout
              className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {visibleCompact.map((project) => (
                  <motion.div
                    key={project.title}
                    layout
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Card className="group relative h-full overflow-hidden p-5 transition-all hover:-translate-y-1 hover:border-accent-gold/40 hover:shadow-[0_0_28px_-10px_var(--accent-gold)]">
                      <div className="absolute -right-6 -top-6 size-20 rounded-full bg-accent-gold/5 transition-transform duration-500 group-hover:scale-[1.6]" />
                      <div className="relative flex items-start gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent-gold/30 bg-accent-gold/10 text-accent-gold transition-transform group-hover:scale-110">
                          <project.Icon className="size-5" />
                        </span>
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-display text-sm font-semibold leading-tight tracking-tight">
                              {project.title}
                            </h4>
                          </div>
                          <p className="text-xs leading-relaxed text-muted-foreground">
                            {project.description}
                          </p>
                          <span className="mt-1 inline-flex w-fit items-center rounded-full border border-border/70 bg-background/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                            {project.category}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        ) : null}
      </div>

      {/* Detail dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl overflow-hidden p-0">
          {selected ? (
            <motion.div
              variants={reduce ? undefined : dialogContainer}
              initial={reduce ? false : "hidden"}
              animate="show"
            >
              <motion.div variants={withReducedMotion(staggerItem({ duration: 0.45 }), reduce)} className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                <Image
                  src={selected.image}
                  alt={`${selected.title} — ${selected.category} product detail`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-end justify-between gap-2">
                  <div className="flex flex-col">
                    <DialogTitle className="font-display text-2xl font-bold tracking-tight-display">
                      {selected.title}
                    </DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground">
                      {selected.status}
                    </DialogDescription>
                  </div>
                  <Badge
                    variant="secondary"
                    className="border-accent-gold/30 bg-background/80 text-accent-gold backdrop-blur"
                  >
                    {selected.category}
                  </Badge>
                </div>
              </motion.div>
              <DialogHeader className="px-6 pt-4">
                <DialogDescription className="sr-only">
                  Detailed project information for {selected.title}
                </DialogDescription>
              </DialogHeader>
              <motion.div
                variants={reduce ? undefined : withReducedMotion(staggerContainer({ staggerChildren: 0.07, delayChildren: 0.1 }), reduce)}
                className="flex flex-col gap-5 px-6 pb-6"
              >
                <DetailRow Icon={Target} label="Problem">
                  {selected.problem}
                </DetailRow>
                <DetailRow Icon={Lightbulb} label="Solution">
                  {selected.solution}
                </DetailRow>
                <DetailRow Icon={UserCog} label="My Role">
                  {selected.role}
                </DetailRow>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Cpu className="size-3.5 text-accent-gold" />
                    <h4 className="text-[11px] font-semibold uppercase tracking-wide text-accent-gold">
                      Technologies
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border/70 bg-muted/40 px-2 py-0.5 text-xs font-medium text-foreground/90"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-accent-gold" />
                    <h4 className="text-[11px] font-semibold uppercase tracking-wide text-accent-gold">
                      Key Features
                    </h4>
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {selected.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-gold" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <DetailRow Icon={CalendarClock} label="Future Scope">
                  {selected.futureScope}
                </DetailRow>
                {selected.liveUrl ? (
                  <motion.div variants={withReducedMotion(staggerItem({ duration: 0.4 }), reduce)}>
                    <Button
                      asChild
                      className="bg-accent-gold text-accent-gold-foreground hover:bg-accent-gold/90"
                    >
                      <a
                        href={selected.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="size-4" />
                        Visit Live Site
                      </a>
                    </Button>
                  </motion.div>
                ) : null}
              </motion.div>
            </motion.div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
