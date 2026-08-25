"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { NAV_LINKS, PROFILE } from "@/lib/data";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => el !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <a href="#home" className="text-lg font-semibold tracking-tight">
          {PROFILE.name}
        </a>

        <nav className="hidden md:flex md:items-center md:gap-8 font-mono text-sm">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "relative py-1 text-muted-foreground transition-colors hover:text-foreground",
                active === link.href ? "text-foreground" : "link-underline"
              )}
            >
              {link.label}
              {active === link.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-[1px] left-0 right-0 h-[2px] rounded-full bg-accent-brand"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex md:items-center md:gap-2">
          <a href={PROFILE.links.resume} target="_blank" rel="noreferrer">
            <Button variant="brand">Resume</Button>
          </a>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="outline"
            size="icon"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t md:hidden"
          >
            <Container className="flex flex-col gap-1 py-3">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-md px-2 py-2 font-mono text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href={PROFILE.links.resume}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2"
              >
                <Button variant="brand" className="w-full">
                  Resume
                </Button>
              </a>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
