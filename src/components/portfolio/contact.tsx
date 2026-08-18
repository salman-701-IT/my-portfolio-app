"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion } from "framer-motion";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Dribbble,
  Send,
  Loader2,
  CheckCircle2,
  Building2,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { cn } from "@/lib/utils";

interface ContactRow {
  Icon: LucideIcon;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

const CONTACT_INFO: ContactRow[] = [
  {
    Icon: Mail,
    label: "Email",
    value: "hello@salmankhan.dev",
    href: "mailto:hello@salmankhan.dev",
  },
  {
    Icon: MapPin,
    label: "Location",
    value: "Chennai, Tamil Nadu, India",
    href: "https://maps.google.com/?q=Chennai,Tamil+Nadu,India",
    external: true,
  },
  {
    Icon: Building2,
    label: "Founder & CEO",
    value: "Yumaris Agency",
    href: "https://yumarisagency.web.app",
    external: true,
  },
];

const SOCIALS: { label: string; href: string; Icon: LucideIcon }[] = [
  { label: "GitHub", href: "#", Icon: Github },
  { label: "LinkedIn", href: "#", Icon: Linkedin },
  { label: "X (Twitter)", href: "#", Icon: Twitter },
  { label: "Dribbble", href: "#", Icon: Dribbble },
];

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
}

function Field({ id, label, error, children, required, hint }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
          {required ? (
            <span className="ml-0.5 text-accent-gold">*</span>
          ) : null}
        </Label>
        {hint ? (
          <span className="text-[11px] text-muted-foreground">{hint}</span>
        ) : null}
      </div>
      {children}
      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Contact() {
  const reduce = useReducedMotion();
  const [submitted, setSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (values: ContactInput) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as {
        ok: boolean;
        errors?: Record<string, string[]>;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        if (data.errors) {
          const firstField = Object.values(data.errors)[0];
          const firstError = Array.isArray(firstField)
            ? firstField[0]
            : undefined;
          toast.error("Validation failed", {
            description: firstError ?? "Please check the highlighted fields.",
          });
          return;
        }
        throw new Error(data.error ?? "Request failed");
      }
      toast.success("Message sent!", {
        description: "Thanks for reaching out — I'll reply within 24 hours.",
        icon: <CheckCircle2 className="size-4" />,
      });
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 3500);
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again or email me directly.",
      });
    }
  };

  const handleSocial = (label: string) => {
    toast.info("Link coming soon", {
      description: `${label} profile will be live shortly.`,
    });
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-24 bg-muted/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title={
            <span id="contact-heading">
              Let&apos;s build something{" "}
              <span className="text-gradient-gold">great</span>
            </span>
          }
          description="Have a project, role, or collaboration in mind? Drop me a note — I read every message."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          {/* Left — info */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <Card className="relative overflow-hidden p-6">
              <div className="absolute -right-10 -top-10 size-40 rounded-full bg-accent-gold/5 blur-2xl" />
              <div className="relative flex flex-col gap-5">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-accent-gold/30 bg-accent-gold/10 px-3 py-1 text-xs font-medium text-accent-gold">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-gold opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-accent-gold" />
                  </span>
                  Open to internships &amp; freelance
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Based in Chennai, working with clients and collaborators
                  worldwide. Typical response time is under 24 hours — feel free
                  to reach out via the form or any channel below.
                </p>
                <ul className="flex flex-col gap-3">
                  {CONTACT_INFO.map(({ Icon, label, value, href, external }) => (
                    <li key={label}>
                      <a
                        href={href}
                        {...(external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="group flex items-center gap-3 rounded-xl border border-border/70 bg-background/40 p-3 transition-all hover:-translate-y-0.5 hover:border-accent-gold/40 hover:shadow-[0_0_24px_-8px_var(--accent-gold)]"
                      >
                        <span className="flex size-10 items-center justify-center rounded-lg border border-accent-gold/30 bg-accent-gold/10 text-accent-gold">
                          <Icon className="size-4" />
                        </span>
                        <span className="flex flex-col">
                          <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                            {label}
                          </span>
                          <span className="text-sm font-medium group-hover:text-accent-gold">
                            {value}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Find me online
                  </span>
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
                          className="group flex size-10 items-center justify-center rounded-xl border border-border/70 bg-background/40 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-accent-gold/60 hover:text-accent-gold hover:shadow-[0_0_20px_-6px_var(--accent-gold)]"
                        >
                          <Icon className="size-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          >
            <Card className="relative h-full overflow-hidden p-6 sm:p-8">
              <div className="absolute -left-10 -bottom-10 size-40 rounded-full bg-accent-gold/5 blur-2xl" />
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="relative flex flex-col gap-5"
                aria-label="Contact form"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="name" label="Name" required error={errors.name?.message}>
                    <Input
                      id="name"
                      placeholder="Your name"
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      className={cn(
                        "h-11",
                        errors.name && "border-destructive/60",
                      )}
                      {...register("name")}
                    />
                  </Field>
                  <Field id="email" label="Email" required error={errors.email?.message}>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      className={cn(
                        "h-11",
                        errors.email && "border-destructive/60",
                      )}
                      {...register("email")}
                    />
                  </Field>
                </div>
                <Field id="subject" label="Subject" required error={errors.subject?.message}>
                  <Input
                    id="subject"
                    placeholder="What's this about?"
                    aria-invalid={!!errors.subject}
                    className={cn(
                      "h-11",
                      errors.subject && "border-destructive/60",
                    )}
                    {...register("subject")}
                  />
                </Field>
                <Field
                  id="message"
                  label="Message"
                  required
                  error={errors.message?.message}
                  hint="Min 10 characters"
                >
                  <Textarea
                    id="message"
                    placeholder="Tell me about the project, timeline, and goals…"
                    rows={5}
                    aria-invalid={!!errors.message}
                    className={cn(
                      "min-h-28 resize-y",
                      errors.message && "border-destructive/60",
                    )}
                    {...register("message")}
                  />
                </Field>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 w-full bg-accent-gold text-accent-gold-foreground shadow-[0_0_28px_-8px_var(--accent-gold)] hover:bg-accent-gold/90"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Sending…
                    </>
                  ) : submitted ? (
                    <>
                      <CheckCircle2 className="size-4" />
                      Sent!
                    </>
                  ) : (
                    <>
                      <Send className="size-4" />
                      Send Message
                    </>
                  )}
                </Button>
                <p className="text-center text-[11px] text-muted-foreground">
                  By submitting, you agree to be contacted about your inquiry.
                  No spam, ever.
                </p>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
