"use client";

import { motion } from "framer-motion";
import { Code2, ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { LiveStat } from "@/components/ui/live-stat";
import { SectionHeading } from "@/components/ui/section-heading";
import { PROJECTS } from "@/lib/data";
import { staggerContainer, staggerItem } from "@/lib/motion";

export function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-24">
      <Container>
        <SectionHeading icon={Code2} title="Projects" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 sm:grid-cols-2"
        >
          {PROJECTS.map((project) => (
            <motion.div key={project.title} variants={staggerItem} whileTap={{ scale: 0.98 }}>
              <Card className="h-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:border-accent-brand/40 hover:shadow-[0_0_32px_-12px_var(--accent-brand)]">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle>{project.title}</CardTitle>
                    <LiveStat github={project.github} pypi={project.pypi} />
                  </div>
                  <CardDescription className="leading-relaxed">
                    {project.tagline}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <Badge key={t} variant="secondary">
                        {t}
                      </Badge>
                    ))}
                  </div>

                  {project.links.length > 0 ? (
                    <div className="flex flex-wrap gap-4">
                      {project.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className="link-underline inline-flex items-center gap-1 text-sm font-medium text-accent-brand"
                        >
                          {l.label}
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <Badge variant="outline">Private / Case Study</Badge>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
