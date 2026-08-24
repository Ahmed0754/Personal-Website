"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { EXPERIENCE } from "@/lib/data";
import { sectionReveal, staggerContainer, staggerItem } from "@/lib/motion";

export function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-24">
      <Container>
        <SectionHeading icon={Briefcase} title="Experience" />

        <div className="space-y-10 border-l pl-6 sm:pl-8">
          {EXPERIENCE.map((job) => (
            <motion.article
              key={job.role + job.org}
              variants={sectionReveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="relative"
            >
              <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent-brand sm:-left-[37px]" />

              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-lg font-semibold">
                  {job.role} · {job.org}
                  {job.orgNote && (
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      {job.orgNote}
                    </span>
                  )}
                </h3>
                <p className="shrink-0 font-mono text-sm text-muted-foreground">
                  {job.time} · {job.location}
                </p>
              </div>

              <motion.ul
                variants={staggerContainer}
                className="mt-3 space-y-2 text-muted-foreground"
              >
                {job.bullets.map((bullet, i) => (
                  <motion.li
                    key={i}
                    variants={staggerItem}
                    className="flex gap-2.5 leading-relaxed"
                  >
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent-brand/60" />
                    {bullet}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
