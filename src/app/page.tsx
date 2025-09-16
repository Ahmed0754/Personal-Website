"use client";

import type { Variants } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Briefcase,
  GraduationCap,
  Sparkles,
  Globe,
  Phone,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

/** ==========
 *  DATA — aligned to your resume
 *  ========== */
const DATA = {
  name: "Syed Ahmed Ali",
  title: "Lead Software Engineer Intern • Full-Stack • AI/ML",
  blurb:
    "Full-stack developer with strong foundations in Java Spring Boot, React/Next.js, and PostgreSQL. Experienced in building scalable AI-powered systems, optimizing deployments with Docker + CI/CD, and collaborating in Agile teams to deliver impactful products.",
  location: "New York, USA",
  links: {
    github: "https://github.com/Ahmed0754",
    linkedin: "https://www.linkedin.com/in/syed-ahmed-ali-7270792b2/",
    email: "syedahmedali.0520@gmail.com",
    resume: "/Syed_Ahmed_Ali_Resume.pdf",
    portfolio: "https://ahmed0754.github.io/Portfolio/",
  },
  highlights: [
    "B.S. Computer Science @ SUNY New Paltz (Accelerated M.S. Track, GPA 3.8)",
    "A.S. Mathematics & CS @ Rockland CC (GPA 3.9)",
    "Internships: Aurify AI, Andino Labs, Macrosoft (AI/ML), RCC IT",
    "Built and deployed production-ready full-stack and ML apps",
  ],
  // Used for the marquee
  skillsFlat: [
    // Languages
    "Java","Python","JavaScript","TypeScript (ES6+)","C","C++","SQL","HTML/CSS","Bash/Linux",
    // Frameworks/Tools
    "React","Node.js","Next.js","Express.js","Spring Boot","Flask","FastAPI","TensorFlow/Keras","Docker","AWS",
    // Databases/DevOps
    "PostgreSQL","MySQL","MongoDB","Git/GitHub","CI/CD","Agile/Scrum","JIRA",
  ],
  // Rotating subtitle
  cycleTitles: [
    "Lead SWE Intern @ Aurify AI",
    "Full-Stack Developer",
    "AI/ML Engineer",
    "React + Spring Boot Builder",
    "Problem Solver",
  ],
  // Projects with real links
  projects: [
    {
      title: "Aurify — AI-Powered Communication App",
      tagline:
        "Modern AI productivity app with auth, profiles, and AI feedback.",
      badges: ["React", "TypeScript", "Tailwind", "Firebase", "Gemini API"],
      links: [
        { href: "https://github.com/Ahmed0754/Aurify", label: "Code" },
        { href: "https://ahmed0754.github.io/Portfolio/", label: "Portfolio" },
      ],
    },
    {
      title: "Premier League Backend API",
      tagline:
        "Java Spring Boot + PostgreSQL backend with Python scraping for football stats.",
      badges: ["Spring Boot", "PostgreSQL", "Python"],
      links: [
        { href: "https://github.com/Ahmed0754/Premier-League-Backend-Api", label: "Code" },
      ],
    },
    {
      title: "Social Media Web App",
      tagline:
        "React/Node/MongoDB with JWT auth, ERD: User, Post, Comment, Follow; real-time feed.",
      badges: ["React", "Node.js", "MongoDB", "JWT"],
      links: [
        { href: "https://github.com/Ahmed0754/Social-Media_Web_App", label: "Code" },
      ],
    },
    {
      title: "AI Stock Market Predictor",
      tagline:
        "Python + TensorFlow/Keras LSTM with FastAPI serving and a React dashboard.",
      badges: ["Python", "TensorFlow", "FastAPI", "React"],
      links: [
        { href: "https://github.com/Ahmed0754/AI-Stock-Market-Predictor", label: "Code" },
      ],
    },
  ],
  experience: [
    {
      role: "Lead Software Engineer Intern",
      org: "Aurify AI",
      time: "Jul 2025 – Present",
      bullets: [
        "Developed real-time team communication tool with Spring Boot + React.",
        "Optimized React data flows, cutting request latency by ~30%.",
        "Automated deployments with Docker + CI/CD, reducing the release cycle from 2 weeks to 3 days.",
      ],
    },
    {
      role: "Software Engineer Intern",
      org: "Andino Labs",
      time: "Jun 2025 – Sep 2025",
      bullets: [
        "Built construction project agent in React/Node defining scope of work and file organization.",
        "Developed secure REST APIs with JWT, improving performance by ~25%.",
        "Collaborated in Agile sprints and completed 15+ peer code reviews.",
      ],
    },
    {
      role: "IT Support Specialist",
      org: "Rockland Community College",
      time: "Sep 2023 – Dec 2024",
      bullets: [
        "Resolved 200+ hardware/network/account issues and created documentation, reducing repeat tickets by ~15%.",
        "Maintained and imaged lab PCs for reliable student access.",
      ],
    },
    {
      role: "SWE Intern — AI/ML",
      org: "Macrosoft Inc.",
      time: "Jun 2023 – Aug 2023",
      bullets: [
        "Built ML preprocessing pipelines for text and image data, reducing preprocessing time by ~20%.",
        "Optimized RESTful services powering AI features, cutting latency by ~15%.",
      ],
    },
  ],
  education: [
    {
      school: "SUNY New Paltz",
      degree: "B.S. Computer Science (Accelerated M.S. Track)",
      time: "Jan 2025 – Dec 2026",
      gpa: "3.8",
    },
    {
      school: "Rockland Community College",
      degree: "A.S. in Mathematics & Computer Science",
      time: "Sep 2023 – Dec 2024",
      gpa: "3.9",
    },
  ],
};

/** Grouped skills (with progress bars) */
const SKILL_GROUPS: { title: string; items: string[]; level: number }[] = [
  {
    title: "Languages",
    items: ["Java","Python","JavaScript","TypeScript (ES6+)","C","C++","SQL","HTML/CSS","Bash/Linux"],
    level: 85,
  },
  {
    title: "Frameworks & Tools",
    items: ["React","Node.js","Next.js","Express.js","Spring Boot","Flask","FastAPI","TensorFlow/Keras","Docker","AWS"],
    level: 82,
  },
  {
    title: "Databases & DevOps",
    items: ["PostgreSQL","MySQL","MongoDB","Git/GitHub","CI/CD","Agile/Scrum","JIRA"],
    level: 80,
  },
];

// ===== Animations =====
const container: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      // cubic-bezier equivalent of "easeOut"
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const reveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};


// ===== Hooks / utils =====
function useCycleText(words: string[], delay = 2000) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), delay);
    return () => clearInterval(id);
  }, [words, delay]);
  return words[index];
}

function Tilt({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const handle = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateX(${-py * 6}deg) rotateY(${px * 6}deg) translateZ(0)`;
  };
  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "rotateX(0) rotateY(0)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={handle}
      onMouseLeave={reset}
      className="transition-transform duration-200 will-change-transform"
    >
      {children}
    </div>
  );
}

/** Wrapped, non-overlapping hero badges with a gentle bob */
function FloatingBadges() {
  const items = DATA.highlights;
  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      {items.map((h, i) => (
        <motion.span
          key={h}
          className="inline-flex items-center gap-2 rounded-xl border bg-white/70 dark:bg-slate-900/70 backdrop-blur px-3 py-1 text-xs shadow-sm"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3 + i * 0.15, repeat: Infinity, repeatType: "mirror" }}
        >
          <Sparkles className="h-3.5 w-3.5" /> {h}
        </motion.span>
      ))}
    </div>
  );
}

function Marquee({ items }: { items: string[] }) {
  const row = useMemo(() => [...items, ...items, ...items], [items]);
  return (
    <div className="relative overflow-hidden border rounded-2xl bg-white/50 dark:bg-slate-900/40 backdrop-blur">
      <div className="animate-marquee whitespace-nowrap py-3">
        {row.map((s, i) => (
          <span key={i} className="mx-4 inline-block text-sm text-slate-700 dark:text-slate-200">
            • {s}
          </span>
        ))}
      </div>
    </div>
  );
}

// Gmail compose URL (fallback-friendly)
function buildEmailLink(
  to: string,
  subject = "Inquiry from your portfolio",
  body = "Hi Syed, I saw your portfolio and…"
) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    to
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Dark mode starts enabled by default; still toggleable */
function useDarkMode(defaultDark = true) {
  const [dark, setDark] = useState(defaultDark);
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("dark", dark);
  }, [dark]);
  return { dark, setDark } as const;
}

/** Simple gradient progress bar for skills */
function SkillBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
      <div
        className="h-2 rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-orange-500"
        style={{ width: `${value}%` }}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        role="progressbar"
      />
    </div>
  );
}

export default function Portfolio() {
  const { dark, setDark } = useDarkMode(true); // start in dark mode
  const cycle = useCycleText(DATA.cycleTitles, 2000);
  const emailHref = useMemo(() => buildEmailLink(DATA.links.email), []);

  return (
    <div className="min-h-screen relative text-slate-900 dark:text-slate-100 dark:bg-slate-950">
      {/* Animated aurora background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-[conic-gradient(at_30%_30%,#06b6d4,45%,#7c3aed,60%,#f97316,80%,#06b6d4)] blur-3xl opacity-40 animate-aurora" />
        <div className="absolute -bottom-20 right-[-10%] h-[50vh] w-[50vh] rounded-full bg-[conic-gradient(at_70%_70%,#22d3ee,30%,#a78bfa,55%,#fb923c,80%,#22d3ee)] blur-3xl opacity-30 animate-aurora-slow" />
      </div>

      <header className="sticky top-0 z-50 backdrop-blur bg-white/60 dark:bg-slate-900/60 border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#home" className="font-bold text-xl tracking-tight flex items-center gap-2">
            <Sparkles className="h-5 w-5" /> {DATA.name.split(" ")[0]}
          </a>
          <nav className="hidden md:flex gap-6 text-sm">
            <a className="navlink" href="#projects">Projects</a>
            <a className="navlink" href="#experience">Experience</a>
            <a className="navlink" href="#skills">Skills</a>
            <a className="navlink" href="#education">Education</a>
            <a className="navlink" href="#contact">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href={DATA.links.resume} target="_blank" rel="noreferrer">
              <Button className="rounded-2xl btn-aurora">Resume</Button>
            </a>
            <Button
              variant="outline"
              className="rounded-2xl"
              onClick={() => setDark(!dark)}
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="mx-auto max-w-6xl px-4 py-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-5 gap-10 items-center"
        >
          <div className="md:col-span-3 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs bg-white/70 dark:bg-slate-900/70 backdrop-blur">
              <Globe className="h-3.5 w-3.5" /> {DATA.location}
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              <span className="animated-text">{DATA.name}</span>
            </h1>

            <div className="text-2xl md:text-3xl font-semibold">
              <span className="text-slate-600 dark:text-slate-300">I’m a </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={cycle}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="animated-subtitle"
                >
                  {cycle}
                </motion.span>
              </AnimatePresence>
            </div>

            <p className="text-lg text-slate-700 dark:text-slate-300 max-w-prose">
              {DATA.blurb}
            </p>

            {/* Wrapped, bobbing badges (no overlap) */}
            <FloatingBadges />

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={DATA.links.github} target="_blank" rel="noreferrer">
                <Button variant="outline" className="rounded-2xl">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
              </a>

              <a href={DATA.links.linkedin} target="_blank" rel="noreferrer">
                <Button variant="outline" className="rounded-2xl">
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
              </a>

              {/* Email button — opens Gmail compose reliably */}
              <Button
                type="button"
                variant="outline"
                className="rounded-2xl"
                onClick={() => window.open(emailHref, "_blank")}
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>
          </div>

          <div className="md:col-span-2">
            <Card className="rounded-2xl shadow-sm bg-white/70 dark:bg-slate-900/70 backdrop-blur border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5" /> Currently Building
                </CardTitle>
                <CardDescription>High-impact projects & experiments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {DATA.projects.slice(0, 2).map((p) => (
                  <div key={p.title} className="flex items-start justify-between">
                    <div>
                      <div className="font-medium">{p.title}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">
                        {p.tagline}
                      </div>
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {p.badges.map((b) => (
                          <Badge key={b} variant="outline" className="rounded-xl">
                            {b}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      {p.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
                        >
                          {l.label} <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <Marquee items={DATA.skillsFlat} />
      </div>

      <Separator className="max-w-6xl mx-auto my-12" />

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-6xl px-4 py-8">
        <motion.h2
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-2xl font-semibold mb-6 flex items-center gap-2"
        >
          <Code2 className="h-5 w-5" /> Projects
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {DATA.projects.map((p) => (
            <motion.div
              key={p.title}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Tilt>
                <Card className="rounded-2xl hover:shadow-xl transition-shadow relative overflow-hidden group">
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-cyan-500/10 via-violet-500/10 to-orange-500/10" />
                  <CardHeader>
                    <CardTitle>{p.title}</CardTitle>
                    <CardDescription>{p.tagline}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {p.badges.map((b) => (
                        <Badge key={b} variant="outline" className="rounded-xl">
                          {b}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      {p.links.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                          <Button className="rounded-2xl btn-aurora">{l.label}</Button>
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="mx-auto max-w-6xl px-4 py-12">
        <motion.h2
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-2xl font-semibold mb-6 flex items-center gap-2"
        >
          <Briefcase className="h-5 w-5" /> Experience
        </motion.h2>
        <div className="space-y-4">
          {DATA.experience.map((e) => (
            <motion.div
              key={e.role + e.org}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Card className="rounded-2xl border">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {e.role} — {e.org}
                    </CardTitle>
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {e.time}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-200">
                    {e.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="mx-auto max-w-6xl px-4 py-12">
        <motion.h2
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-2xl font-semibold mb-6 flex items-center gap-2"
        >
          <Code2 className="h-5 w-5" /> Skills
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-6">
          {SKILL_GROUPS.map((group) => (
            <Card key={group.title} className="rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{group.title}</CardTitle>
                <CardDescription>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {group.items.map((s) => (
                      <Badge key={s} variant="secondary" className="rounded-xl">{s}</Badge>
                    ))}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SkillBar value={group.level} />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Education */}
      <section id="education" className="mx-auto max-w-6xl px-4 py-12">
        <motion.h2
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-2xl font-semibold mb-6 flex items-center gap-2"
        >
          <GraduationCap className="h-5 w-5" /> Education
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-6">
          {DATA.education.map((ed) => (
            <Card key={ed.school} className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">{ed.school}</CardTitle>
                <CardDescription>{ed.degree}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  {ed.time} {ed.gpa ? `• GPA ${ed.gpa}` : ""}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-12">
        <motion.h2
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-2xl font-semibold mb-6 flex items-center gap-2"
        >
          <Phone className="h-5 w-5" /> Contact
        </motion.h2>
        <Card className="rounded-2xl">
          <CardContent className="pt-6">
            <form className="grid md:grid-cols-2 gap-4">
              <Input placeholder="Your name" required />
              <Input type="email" placeholder="Your email" required />
              <div className="md:col-span-2">
                <Textarea placeholder="Message" className="min-h-[120px]" required />
              </div>
              <div className="md:col-span-2 flex items-center gap-3">
                <Button
                  type="button"
                  className="rounded-2xl btn-aurora"
                  onClick={() => window.open(emailHref, "_blank")}
                >
                  Send
                </Button>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  (Opens Gmail compose; swap to Resend/Formspree for server delivery)
                </span>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-700 dark:text-slate-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} {DATA.name}. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a className="hover:underline" href={DATA.links.github} target="_blank" rel="noreferrer">GitHub</a>
            <a className="hover:underline" href={DATA.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="hover:underline" href={DATA.links.resume} target="_blank" rel="noreferrer">Resume</a>
            <a className="hover:underline" href={emailHref} target="_blank" rel="noreferrer">Email</a>
          </div>
        </div>
      </footer>

      {/* Styles: animated color scheme, nav links, buttons, marquee & aurora */}
      <style>{`
        .animated-text{
          background: linear-gradient(90deg,#06b6d4,#7c3aed,#f97316,#06b6d4);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradientShift 8s ease infinite;
        }
        .animated-subtitle{
          background: linear-gradient(90deg,#22d3ee,#a78bfa,#fb923c,#22d3ee);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradientShift 10s ease infinite;
        }
        .btn-aurora{
          background-image: linear-gradient(90deg,#06b6d4,#7c3aed,#f97316);
          background-size: 200% 200%;
          color: white;
          border: none;
          transition: background-position .4s ease, transform .2s ease, box-shadow .2s ease;
        }
        .btn-aurora:hover{
          background-position: 100% 0%;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(124,58,237,.25);
        }
        .navlink{ transition: color .2s ease, text-shadow .2s ease; }
        .navlink:hover{ text-shadow: 0 0 12px rgba(124,58,237,.35); }

        /* marquee animation */
        .animate-marquee{ animation: marquee 18s linear infinite; }
        @keyframes marquee{ 0%{transform:translateX(0)} 100%{transform:translateX(-33.33%)} }

        /* aurora blobs */
        .animate-aurora{ animation: aurora 18s ease-in-out infinite alternate; }
        .animate-aurora-slow{ animation: aurora 28s ease-in-out infinite alternate; }
        @keyframes aurora{
          0%{ transform: translate(-10%, -5%) scale(1); opacity:.35; }
          50%{ transform: translate(5%, 10%) scale(1.1); opacity:.45; }
          100%{ transform: translate(0%, 0%) scale(1.05); opacity:.4; }
        }
      `}</style>
    </div>
  );
}
