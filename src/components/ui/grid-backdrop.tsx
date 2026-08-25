"use client";

import { useEffect, useRef } from "react";

export function GridBackdrop() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const spotlight = spotlightRef.current;
    if (reduceMotion || !spotlight) return;

    const handleMove = (e: MouseEvent) => {
      const rect = spotlight.parentElement?.getBoundingClientRect();
      if (!rect) return;
      spotlight.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      spotlight.style.setProperty("--my", `${e.clientY - rect.top}px`);
      spotlight.style.opacity = "1";
    };

    const handleLeave = () => {
      spotlight.style.opacity = "0";
    };

    const parent = spotlight.parentElement;
    parent?.addEventListener("mousemove", handleMove);
    parent?.addEventListener("mouseleave", handleLeave);
    return () => {
      parent?.removeEventListener("mousemove", handleMove);
      parent?.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        ref={spotlightRef}
        className="absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), var(--accent-brand) 0%, transparent 70%)",
          mixBlendMode: "soft-light",
        }}
      />
    </div>
  );
}
