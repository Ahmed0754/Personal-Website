"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SKILL_GROUPS } from "@/lib/data";
import { staggerContainer, staggerItem } from "@/lib/motion";

export function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-24">
      <Container>
        <SectionHeading icon={Sparkles} title="Skills" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 sm:grid-cols-2"
        >
          {SKILL_GROUPS.map((group) => (
            <motion.div key={group.title} variants={staggerItem}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{group.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Badge key={item} variant="secondary">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
