"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Crown,
  Wallet,
  Megaphone,
  TrendingUp,
  Users,
  FileText,
  Database,
  Search,
  type LucideIcon,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";

interface AIAgent {
  Icon: LucideIcon;
  role: string;
  capabilities: string[];
}

const AGENTS: AIAgent[] = [
  {
    Icon: Crown,
    role: "AI CEO Agent",
    capabilities: [
      "Business summaries & decision support",
      "Executive reporting",
      "KPI analysis",
    ],
  },
  {
    Icon: Wallet,
    role: "AI CFO Agent",
    capabilities: [
      "Financial reporting & budget analysis",
      "Revenue summaries",
      "Expense categorization",
    ],
  },
  {
    Icon: Megaphone,
    role: "AI CMO Agent",
    capabilities: [
      "Marketing planning & campaign ideas",
      "Content strategy",
      "Market analysis",
    ],
  },
  {
    Icon: TrendingUp,
    role: "AI Sales Agent",
    capabilities: [
      "Lead qualification & lead scoring",
      "Follow-up management",
      "CRM updates",
    ],
  },
  {
    Icon: Users,
    role: "AI HR Agent",
    capabilities: [
      "Recruitment support & candidate screening",
      "Policy retrieval",
      "HR workflows",
    ],
  },
  {
    Icon: FileText,
    role: "AI Document Agent",
    capabilities: [
      "Document ingestion & classification",
      "Summarization & Q&A",
      "Knowledge-base management",
    ],
  },
];

export function AIAutomation() {
  const reduce = useReducedMotion();
  return (
    <section
      id="ai"
      aria-labelledby="ai-heading"
      className="scroll-mt-24 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          align="left"
          eyebrow="AI & Automation"
          title={
            <span id="ai-heading">
              An AI agent department for{" "}
              <span className="text-gradient-gold">
                every business function.
              </span>
            </span>
          }
          description="Instead of a single general-purpose assistant, I design specialized AI agents for each organizational function — combined with RAG knowledge systems that turn company documents into a private, queryable intelligence layer."
        />

        {/* AI Agent grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map((agent, idx) => (
            <motion.div
              key={agent.role}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: idx * 0.06,
              }}
            >
              <Card className="group relative h-full overflow-hidden p-6 transition-all hover:-translate-y-1.5 hover:border-accent-gold/50 hover:shadow-[0_0_44px_-14px_var(--accent-gold)]">
                <div className="absolute -right-10 -top-10 size-40 rounded-full bg-accent-gold/5 transition-transform duration-500 group-hover:scale-[1.8]" />
                <div className="relative flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex size-12 items-center justify-center rounded-xl border border-accent-gold/30 bg-accent-gold/10 text-accent-gold transition-all group-hover:scale-110 group-hover:shadow-[0_0_24px_-6px_var(--accent-gold)]">
                      <agent.Icon className="size-6" />
                    </span>
                    <h3 className="font-display text-base font-semibold tracking-tight">
                      {agent.role}
                    </h3>
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {agent.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="flex items-start gap-2 text-xs leading-relaxed text-foreground/80"
                      >
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent-gold" />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* RAG Knowledge System highlight card (full-width) */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="mt-10 overflow-hidden p-0">
            <div className="grid gap-0 lg:grid-cols-2">
              {/* Image side */}
              <div className="relative aspect-video w-full overflow-hidden lg:aspect-auto">
                <Image
                  src="/images/project-doc-retrieval.png"
                  alt="AI Document Retrieval — RAG knowledge system turning company documents into a private AI interface"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent lg:bg-gradient-to-r" />
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-accent-gold/30 bg-background/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-accent-gold backdrop-blur">
                  <Database className="size-3" />
                  RAG Knowledge System
                </div>
              </div>

              {/* Text side */}
              <div className="flex flex-col gap-5 p-8 sm:p-10">
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-gold">
                    Retrieval-Augmented Generation
                  </span>
                  <h3 className="font-display text-2xl font-bold tracking-tight-display sm:text-3xl">
                    Turn your documents into a private AI knowledge interface.
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Upload your HR policies, SOPs, product docs, and training
                    materials. Employees ask in natural language — the system
                    retrieves the right context and answers from your documents,
                    with citations.
                  </p>
                </div>

                {/* Example callout */}
                <div className="flex flex-col gap-2 rounded-xl border border-border/70 bg-muted/40 p-4">
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border border-accent-gold/30 bg-accent-gold/10 text-accent-gold">
                      <Search className="size-3.5" />
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        Example query
                      </span>
                      <p className="font-mono text-sm text-foreground">
                        &gt; &ldquo;What is our internship policy?&rdquo;
                      </p>
                    </div>
                  </div>
                  <div className="ml-9 border-l-2 border-accent-gold/40 pl-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-accent-gold">
                      Response
                    </span>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      Retrieves the relevant HR policy section and answers with
                      accurate citations — no hallucinations, no manual search.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
