"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { buildEmailLink, PROFILE } from "@/lib/data";
import { staggerContainer, staggerItem } from "@/lib/motion";

const TILE_CLASS =
  "flex items-center gap-3 rounded-xl border p-4 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-0.5 hover:border-accent-brand/40 hover:bg-accent";

export function Contact() {
  const emailHref = buildEmailLink(PROFILE.links.email);
  const telHref = `tel:${PROFILE.links.phone.replace(/[^\d+]/g, "")}`;

  return (
    <section id="contact" className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          icon={Mail}
          title="Contact"
          description="Reach out directly — I'm actively looking for fall internship and new-grad roles."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <motion.a
            variants={staggerItem}
            href={emailHref}
            target="_blank"
            rel="noreferrer"
            className={TILE_CLASS}
          >
            <Mail className="h-5 w-5 shrink-0 text-accent-brand" aria-hidden />
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{PROFILE.links.email}</p>
            </div>
          </motion.a>

          <motion.a variants={staggerItem} href={telHref} className={TILE_CLASS}>
            <Phone className="h-5 w-5 shrink-0 text-accent-brand" aria-hidden />
            <div>
              <p className="text-sm font-medium">Phone</p>
              <p className="text-sm text-muted-foreground">{PROFILE.links.phone}</p>
            </div>
          </motion.a>

          <motion.a
            variants={staggerItem}
            href={PROFILE.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className={TILE_CLASS}
          >
            <Linkedin className="h-5 w-5 shrink-0 text-accent-brand" aria-hidden />
            <div>
              <p className="text-sm font-medium">LinkedIn</p>
              <p className="text-sm text-muted-foreground">linkedin.com/in/syedahmed-ali</p>
            </div>
          </motion.a>

          <motion.a
            variants={staggerItem}
            href={PROFILE.links.github}
            target="_blank"
            rel="noreferrer"
            className={TILE_CLASS}
          >
            <Github className="h-5 w-5 shrink-0 text-accent-brand" aria-hidden />
            <div>
              <p className="text-sm font-medium">GitHub</p>
              <p className="text-sm text-muted-foreground">github.com/Ahmed0754</p>
            </div>
          </motion.a>
        </motion.div>
      </Container>
    </section>
  );
}
