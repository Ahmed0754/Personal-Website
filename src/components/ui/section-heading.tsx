"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { sectionReveal } from "@/lib/motion";

function SectionHeading({
  icon: Icon,
  title,
  description,
  className,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <motion.div
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={cn("mb-10", className)}
    >
      <h2 className="flex items-center gap-2.5 font-mono text-2xl font-medium tracking-tight sm:text-3xl">
        {Icon && <Icon className="h-5 w-5 text-accent-brand" aria-hidden />}
        {title}
      </h2>
      {description && (
        <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>
      )}
    </motion.div>
  );
}

export { SectionHeading };
