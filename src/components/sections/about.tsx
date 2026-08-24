"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PROFILE } from "@/lib/data";
import { sectionReveal } from "@/lib/motion";

export function About() {
  return (
    <section id="about" className="py-16 sm:py-24">
      <Container>
        <SectionHeading title="About" />
        <motion.p
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-2xl text-lg leading-relaxed text-muted-foreground"
        >
          {PROFILE.about}
        </motion.p>
      </Container>
    </section>
  );
}
