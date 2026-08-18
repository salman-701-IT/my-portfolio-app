"use client";

import * as React from "react";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Twitter,
  Dribbble,
  ArrowUp,
  Mail,
  Send,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newsletterSchema, type NewsletterInput } from "@/lib/validations";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS: { label: string; href: string; Icon: LucideIcon }[] = [
  { label: "GitHub", href: "#", Icon: Github },
  { label: "LinkedIn", href: "#", Icon: Linkedin },
  { label: "X (Twitter)", href: "#", Icon: Twitter },
  { label: "Dribbble", href: "#", Icon: Dribbble },
];

function NewsletterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: NewsletterInput) => {
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        if (res.status === 409 || data.error?.toLowerCase().includes("unique")) {
          toast.info("You're already subscribed!", {
            description: "Thanks for the enthusiasm — see you in the next issue.",
          });
          reset();
          return;
        }
        throw new Error(data.error ?? "Request failed");
      }
      toast.success("Subscribed!", {
        description: "You'll get occasional notes on building, design, and code.",
      });
      reset();
    } catch {
      toast.error("Could not subscribe", {
        description: "Please try again in a moment.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-2"
      aria-label="Newsletter signup"
    >
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="email"
            placeholder="you@example.com"
            aria-label="Email address"
            aria-invalid={!!errors.email}
            className="h-10 pl-9"
            {...register("email")}
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-10 bg-accent-gold text-accent-gold-foreground hover:bg-accent-gold/90"
          aria-label="Subscribe"
        >
          <Send className="size-4" />
          <span className="sr-only sm:not-sr-only">Subscribe</span>
        </Button>
      </div>
      {errors.email ? (
        <p className="text-xs text-destructive" role="alert">
          {errors.email.message}
        </p>
      ) : null}
    </form>
  );
}

export function Footer() {
  const scrollTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSocial = (label: string) => {
    toast.info("Link coming soon", {
      description: `${label} profile will be live shortly.`,
    });
  };

  return (
    <footer className="mt-auto border-t border-border/70 bg-background/60">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand + socials */}
          <div className="flex flex-col gap-4">
            <Link
              href="#home"
              className="flex w-fit items-center gap-2.5"
              aria-label="Salman Khan S. — home"
            >
              <span className="flex size-9 items-center justify-center rounded-xl border border-accent-gold/40 bg-accent-gold/10 font-mono text-sm font-bold text-accent-gold shadow-[0_0_20px_-6px_var(--accent-gold)]">
                SK
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-sm font-semibold">Salman Khan S.</span>
                <span className="text-[11px] text-muted-foreground">
                  AI Engineer · Founder
                </span>
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              AI engineer &amp; founder building premium, practical tech —
              browser-first AI/CV, full-stack web, and 3D interactive
              experiences.
            </p>
            <ul className="flex flex-wrap gap-2">
              {SOCIALS.map(({ label, Icon }) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSocial(label);
                    }}
                    aria-label={label}
                    className="group flex size-9 items-center justify-center rounded-lg border border-border/70 bg-card/40 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-accent-gold/60 hover:text-accent-gold"
                  >
                    <Icon className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer navigate" className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Navigate
            </h3>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-accent-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Agency */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Agency
            </h3>
            <div className="flex flex-col gap-2">
              <a
                href="https://yumarisagency.web.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent-gold"
              >
                Yumaris Agency
                <ExternalLink className="size-3.5" />
              </a>
              <p className="text-xs text-muted-foreground">
                Online Learning · Web Design · Branding
              </p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Newsletter
            </h3>
            <p className="text-sm text-muted-foreground">
              Occasional notes on building, design, and code. No spam,
              unsubscribe anytime.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/70 pt-6 sm:flex-row">
          <p className="text-center text-xs text-muted-foreground sm:text-left">
            © 2025 Salman Khan S. · Crafted with care in Chennai.
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollTop}
            className="text-muted-foreground hover:text-accent-gold"
          >
            <ArrowUp className="size-4" />
            Back to top
          </Button>
        </div>
      </div>
    </footer>
  );
}
