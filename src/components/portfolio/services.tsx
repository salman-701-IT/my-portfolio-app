"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Code2,
  Palette,
  Server,
  Cloud,
  Plug,
  Gauge,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";

interface Service {
  Icon: LucideIcon;
  title: string;
  description: string;
  items: string[];
}

const SERVICES: Service[] = [
  {
    Icon: Code2,
    title: "Web Development",
    description:
      "End-to-end web apps built on Next.js, TypeScript, and a well-typed API layer.",
    items: ["SSR / ISR / Edge", "Type-safe end-to-end", "SEO & a11y baked in"],
  },
  {
    Icon: Palette,
    title: "UI/UX Design",
    description:
      "Design systems, component libraries, and high-conversion marketing pages.",
    items: ["Figma → production", "Design tokens", "Motion & micro-interactions"],
  },
  {
    Icon: Server,
    title: "Backend Architecture",
    description:
      "Modular Node.js / NestJS services with queues, jobs, and clean domain boundaries.",
    items: ["REST & GraphQL APIs", "Event-driven design", "Background workers"],
  },
  {
    Icon: Cloud,
    title: "Cloud & DevOps",
    description:
      "From commit to production safely — IaC, CI/CD, observability, and cost control.",
    items: ["AWS / GCP / Vercel", "Docker & K8s", "IaC + observability"],
  },
  {
    Icon: Plug,
    title: "API Integration",
    description:
      "Stripe, Twilio, OpenAI, Mapbox — wired in cleanly with retries and webhooks.",
    items: ["Third-party SDKs", "Webhooks & idempotency", "Rate-limit & retry"],
  },
  {
    Icon: Gauge,
    title: "Performance Optimization",
    description:
      "Core Web Vitals, bundle analysis, caching, and real-user monitoring.",
    items: ["Lighthouse 95+", "Bundle & image tuning", "RUM dashboards"],
  },
];

export function Services() {
  const reduce = useReducedMotion();
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-24 bg-muted/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title={
            <span id="services-heading">
              What I can <span className="text-gradient-emerald">ship</span>{" "}
              for you
            </span>
          }
          description="From a single landing page to a multi-service platform — flexible engagements that fit your stage."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
                delay: idx * 0.05,
              }}
            >
              <Card className="group relative h-full overflow-hidden p-6 transition-all hover:-translate-y-1.5 hover:border-accent-emerald/50 hover:shadow-[0_0_44px_-14px_var(--accent-emerald)]">
                <div className="absolute -right-12 -top-12 size-40 rounded-full bg-accent-emerald/5 transition-transform duration-500 group-hover:scale-[2]" />
                <div className="relative flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-xl border border-accent-emerald/30 bg-accent-emerald/10 text-accent-emerald transition-all group-hover:scale-110 group-hover:shadow-[0_0_24px_-6px_var(--accent-emerald)]">
                      <service.Icon className="size-6" />
                    </span>
                    <ArrowUpRight className="size-5 text-muted-foreground/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-emerald" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                  <ul className="mt-1 flex flex-col gap-1.5">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-xs text-foreground/80"
                      >
                        <span className="size-1 rounded-full bg-accent-emerald" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
