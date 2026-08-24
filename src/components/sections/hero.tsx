"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { buildEmailLink, PROFILE } from "@/lib/data";
import { fadeUp } from "@/lib/motion";

export function Hero() {
  const emailHref = buildEmailLink(PROFILE.links.email);

  return (
    <section id="home" className="pt-20 pb-16 sm:pt-28 sm:pb-24">
      <Container>
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {PROFILE.location}
          </div>

          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
            {PROFILE.name}
          </h1>

          <p className="mt-4 text-xl font-medium text-muted-foreground sm:text-2xl">
            {PROFILE.tagline}
          </p>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {PROFILE.status}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={PROFILE.links.resume} target="_blank" rel="noreferrer">
              <Button variant="brand" size="lg">
                Resume
              </Button>
            </a>
            <a href={PROFILE.links.github} target="_blank" rel="noreferrer">
              <Button variant="outline" size="lg">
                <Github className="h-4 w-4" />
                GitHub
              </Button>
            </a>
            <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer">
              <Button variant="outline" size="lg">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Button>
            </a>
            <a href={emailHref} target="_blank" rel="noreferrer">
              <Button variant="outline" size="lg">
                <Mail className="h-4 w-4" />
                Email
              </Button>
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
