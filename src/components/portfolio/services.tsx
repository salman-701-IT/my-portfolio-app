"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ScanFace,
  Code2,
  Boxes,
  Palette,
  Cloud,
  PenTool,
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
    Icon: ScanFace,
    title: "AI & Computer Vision",
    description:
      "Custom AI/CV systems: face detection, liveness, and blink detection with browser-side inference.",
    items: [
      "TensorFlow.js + ONNX models",
      "Real-time webcam pipelines",
      "Lightweight (<5MB, <500ms)",
    ],
  },
  {
    Icon: Code2,
    title: "Full-Stack Web Development",
    description: "End-to-end web apps from API to pixel.",
    items: [
      "React + Tailwind frontends",
      "Node/Express & Django/FastAPI backends",
      "PostgreSQL / MongoDB / Firebase",
    ],
  },
  {
    Icon: Boxes,
    title: "3D & Interactive Web",
    description: "Immersive 3D experiences that feel alive.",
    items: ["Three.js scenes", "Framer Motion + Lottie motion", "Glassmorphism UI"],
  },
  {
    Icon: Palette,
    title: "Branding & Creative Design",
    description: "Yumaris-backed branding, posters, and promotions.",
    items: [
      "Brand identity & posters",
      "QR-code service promotions",
      "Social media content",
    ],
  },
  {
    Icon: Cloud,
    title: "Cloud & DevOps",
    description: "Deploy, monitor, scale.",
    items: [
      "AWS / Docker / Kubernetes",
      "Nginx / Apache / CI-CD",
      "Zabbix monitoring & deployments",
    ],
  },
  {
    Icon: PenTool,
    title: "UI/UX Design",
    description: "Premium, minimal interfaces with motion.",
    items: [
      "Apple/Tesla-grade minimal",
      "Design systems",
      "Micro-interactions",
    ],
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
              What I can <span className="text-gradient-gold">ship</span> for you
            </span>
          }
          description="From a browser-based AI/CV system to a full agency-grade brand — flexible engagements that fit your stage."
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
              <Card className="group relative h-full overflow-hidden p-6 transition-all hover:-translate-y-1.5 hover:border-accent-gold/50 hover:shadow-[0_0_44px_-14px_var(--accent-gold)]">
                <div className="absolute -right-12 -top-12 size-40 rounded-full bg-accent-gold/5 transition-transform duration-500 group-hover:scale-[2]" />
                <div className="relative flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-xl border border-accent-gold/30 bg-accent-gold/10 text-accent-gold transition-all group-hover:scale-110 group-hover:shadow-[0_0_24px_-6px_var(--accent-gold)]">
                      <service.Icon className="size-6" />
                    </span>
                    <ArrowUpRight className="size-5 text-muted-foreground/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-gold" />
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
                        <span className="size-1 rounded-full bg-accent-gold" />
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
