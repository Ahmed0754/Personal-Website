export const PROFILE = {
  name: "Syed Ahmed Ali",
  tagline: "CS student building AI agent tooling and backend systems",
  location: "New York, USA",
  focus: "Currently building CLI tooling, rate-limiting infrastructure, and mainframe automation.",
  about:
    "Computer Science student at SUNY New Paltz (B.S., GPA 3.7, expected May 2027), transferred from Rockland Community College (A.S. in Mathematics & Computer Science, GPA 3.9). Currently focused on backend/infrastructure engineering, AI agent tooling, and systems work.",
  links: {
    github: "https://github.com/Ahmed0754",
    linkedin: "https://www.linkedin.com/in/syedahmed-ali",
    email: "syedahmedali.0520@gmail.com",
    phone: "845-248-1429",
    resume: "/Syed_Ahmed_Ali_Resume.pdf",
  },
} as const;

export function buildEmailLink(
  to: string,
  subject = "Inquiry from your portfolio",
  body = "Hi Syed, I saw your portfolio and…"
) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    to
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export type ExperienceItem = {
  role: string;
  org: string;
  orgNote?: string;
  time: string;
  location: string;
  bullets: string[];
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Software Engineer Intern — z/OS Container Extensions",
    org: "IBM",
    time: "May 2026 – Aug 2026",
    location: "Poughkeepsie, NY",
    bullets: [
      "Built an MCP-integrated AI agent that replaced a 10+ step manual UI workflow with a single natural language command, autonomously invoking IBM z/OSMF workflow REST APIs to provision and manage containerized workloads",
      "Automated mainframe infrastructure provisioning by scripting IBM's REST APIs and XML workflow definitions in Python, consolidating a multi-step manual process into a single reusable tool",
      "Designed and debugged 8+ automated workflows orchestrating the deploy, modify, and teardown lifecycle for containerized workloads on z/OS, including a status-check threshold fix that aligned instance health checks with the underlying log query window",
      "Shipped changes to a production release (v2.4.x), collaborating with senior engineers through code review",
    ],
  },
  {
    role: "Software Engineer Intern",
    org: "Aurify AI",
    orgNote: "Early-stage AI startup",
    time: "Jul 2025 – Dec 2025",
    location: "Remote",
    bullets: [
      "Built user profile features in React + TypeScript with Supabase — create/update/delete flows with auditing — shipping 5+ pull requests to production",
      "Configured linting/formatting tooling that unified code style across the codebase",
      "Wrote Jest unit and smoke tests for 3+ services, increasing test coverage and catching regressions in CI",
    ],
  },
  {
    role: "Software Engineer Intern — AI/ML",
    org: "Macrosoft Inc.",
    orgNote: "IT consulting firm",
    time: "Jun 2023 – Aug 2023",
    location: "Bedminster, NJ",
    bullets: [
      "Built Python preprocessing pipelines for text and image datasets, cutting training iteration time by ~20%",
      "Optimized 2 RESTful services powering AI features, reducing response latency",
      "Delivered features on schedule across a 3-month engagement in Agile/Scrum sprints",
    ],
  },
];

export type ProjectItem = {
  title: string;
  tagline: string;
  tech: string[];
  links: { label: string; href: string }[];
  github?: { owner: string; repo: string };
  pypi?: string;
};

export const PROJECTS: ProjectItem[] = [
  {
    title: "RampUp AI",
    tagline:
      "Full-stack AI web app that classifies workplace inputs (Slack messages, terminal errors, Jira tickets) and generates plain-English explanations, action items, and tone-aware reply drafts using the Claude API. FastAPI + Supabase (Postgres/Auth/RLS) backend, React + TypeScript frontend, deployed on Vercel with a Dockerized backend. Includes a weekly brag-summary feature that auto-generates resume bullets from logged intern progress.",
    tech: ["React", "TypeScript", "FastAPI", "Supabase", "Claude API"],
    links: [{ label: "Code", href: "https://github.com/Ahmed0754/rampup-ai" }],
    github: { owner: "Ahmed0754", repo: "rampup-ai" },
  },
  {
    title: "repocheck",
    tagline:
      "GitHub repo health scanner published to PyPI (v0.4.0, 4 releases) scoring repos across 14 weighted health checks with JSON/CSV/Markdown/HTML export. Includes a published GitHub composite Action for CI gating, a local web dashboard (Chart.js score history, fix checklists, auto-refresh), org-wide scanning, batch mode, Slack webhook reporting, and 57-test coverage.",
    tech: ["Python", "Click", "Rich", "GitHub REST API", "PyPI", "GitHub Actions"],
    links: [{ label: "Code", href: "https://github.com/Ahmed0754/repocheck" }],
    github: { owner: "Ahmed0754", repo: "repocheck" },
    pypi: "repocheck",
  },
  {
    title: "ratelimiter-py",
    tagline:
      "Rate limiting library implementing 3 algorithms (token bucket, sliding window, fixed window) with pluggable in-memory/Redis backends using atomic operations. Includes FastAPI middleware (429/Retry-After/X-RateLimit-* headers), a 41-test suite, and a CLI benchmarking tool reporting p50/p99 latency.",
    tech: ["Python", "Redis", "FastAPI", "Click", "PyPI"],
    links: [{ label: "Code", href: "https://github.com/Ahmed0754/ratelimiter-py" }],
    github: { owner: "Ahmed0754", repo: "ratelimiter-py" },
    pypi: "ratelimiter-py",
  },
  {
    title: "Premier League Backend API",
    tagline:
      "RESTful backend with Java Spring Boot, PostgreSQL, and Python ingestion for live player and match stats.",
    tech: ["Java", "Spring Boot", "PostgreSQL", "Python"],
    links: [
      { label: "Code", href: "https://github.com/Ahmed0754/Premier-League-Backend-Api" },
    ],
    github: { owner: "Ahmed0754", repo: "Premier-League-Backend-Api" },
  },
  {
    title: "AI Stock Market Predictor",
    tagline:
      "A full-stack AI-powered stock market forecasting application that uses LSTM (Long Short-Term Memory) neural networks to predict future stock prices. Built with Flask, Keras, and the Yahoo Finance API, the app allows users to enter any stock ticker symbol and visualize past trends alongside future predictions. Includes a sleek, responsive UI.",
    tech: ["Python", "Flask", "Keras", "LSTM", "Yahoo Finance API"],
    links: [
      { label: "Code", href: "https://github.com/Ahmed0754/AI-Stock-Market-Predictor" },
      { label: "Live", href: "https://health-dashboard-z3go.vercel.app" },
    ],
    github: { owner: "Ahmed0754", repo: "AI-Stock-Market-Predictor" },
  },
];

export type SkillGroup = {
  title: string;
  items: string[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Languages",
    items: [
      "Java",
      "Python",
      "JavaScript",
      "TypeScript (ES6+)",
      "C",
      "C++",
      "SQL",
      "HTML/CSS",
      "Bash/Linux",
    ],
  },
  {
    title: "Frameworks & Tools",
    items: [
      "React",
      "Node.js",
      "Next.js",
      "Spring Boot",
      "Flask",
      "FastAPI",
      "Docker",
      "AWS",
    ],
  },
  {
    title: "Databases & DevOps",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Git/GitHub", "CI/CD", "Agile/Scrum"],
  },
  {
    title: "AI & LLM Tooling",
    items: [
      "Claude API",
      "MCP (Model Context Protocol)",
      "OpenAI API",
      "Gemini API",
      "GitHub Copilot",
      "Cursor",
    ],
  },
];

export type EducationItem = {
  school: string;
  degree: string;
  gpa: string;
  time: string;
};

export const EDUCATION: EducationItem[] = [
  {
    school: "SUNY New Paltz",
    degree: "B.S. in Computer Science",
    gpa: "3.7",
    time: "Jan 2025 – May 2027",
  },
  {
    school: "Rockland Community College",
    degree: "A.S. in Mathematics & Computer Science",
    gpa: "3.9",
    time: "Sep 2023 – Dec 2024",
  },
];

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
] as const;
