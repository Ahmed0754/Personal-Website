"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { EDUCATION } from "@/lib/data";
import { staggerContainer, staggerItem } from "@/lib/motion";

export function Education() {
  return (
    <section id="education" className="py-16 sm:py-24">
      <Container>
        <SectionHeading icon={GraduationCap} title="Education" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 sm:grid-cols-2"
        >
          {EDUCATION.map((ed) => (
            <motion.div key={ed.school} variants={staggerItem}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{ed.school}</CardTitle>
                  <CardDescription>{ed.degree}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-sm text-muted-foreground">
                    {ed.time} · GPA {ed.gpa}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
