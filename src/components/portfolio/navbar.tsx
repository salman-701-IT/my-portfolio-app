"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn("relative", className)}
    >
      {mounted ? (
        isDark ? (
          <Sun className="size-4 text-accent-emerald" />
        ) : (
          <Moon className="size-4 text-accent-emerald" />
        )
      ) : (
        <Sun className="size-4" />
      )}
    </Button>
  );
}

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-colors",
        scrolled
          ? "border-border/70 bg-background/80 supports-[backdrop-filter]:bg-background/60"
          : "border-transparent bg-background/40",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        {/* Brand */}
        <Link
          href="#home"
          className="group flex items-center gap-2.5"
          aria-label="Salman Khan — home"
        >
          <span className="relative flex size-9 items-center justify-center rounded-xl border border-accent-emerald/40 bg-accent-emerald/10 font-mono text-sm font-bold text-accent-emerald shadow-[0_0_20px_-6px_var(--accent-emerald)] transition-transform group-hover:scale-105">
            SK
            <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-accent-emerald shadow-[0_0_8px_var(--accent-emerald)]" />
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="text-sm font-semibold tracking-tight">
              Salman Khan
            </span>
            <span className="text-[11px] text-muted-foreground">
              Full-Stack Developer
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-x-3 -bottom-px h-px scale-x-0 bg-gradient-to-r from-transparent via-accent-emerald to-transparent transition-transform duration-300 hover:scale-x-100" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            className="hidden bg-accent-emerald text-accent-emerald-foreground shadow-[0_0_24px_-8px_var(--accent-emerald)] hover:bg-accent-emerald/90 sm:inline-flex"
          >
            <Link href="#contact">
              Hire Me
              <ArrowUpRight className="size-3.5" />
            </Link>
          </Button>

          {/* Mobile sheet */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 border-border/70 bg-background/95"
            >
              <SheetTitle className="px-1 pt-2 text-base">
                <span className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-lg border border-accent-emerald/40 bg-accent-emerald/10 font-mono text-xs font-bold text-accent-emerald">
                    SK
                  </span>
                  Salman Khan
                </span>
              </SheetTitle>
              <nav aria-label="Mobile" className="flex flex-col gap-1 px-2 pt-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent-emerald/10 hover:text-accent-emerald"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto p-4">
                <Button
                  asChild
                  className="w-full bg-accent-emerald text-accent-emerald-foreground hover:bg-accent-emerald/90"
                >
                  <Link href="#contact" onClick={() => setOpen(false)}>
                    Hire Me
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
