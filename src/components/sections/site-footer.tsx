import { Github, Linkedin, Mail } from "lucide-react";

import { Container } from "@/components/ui/container";
import { buildEmailLink, PROFILE } from "@/lib/data";

export function SiteFooter() {
  const emailHref = buildEmailLink(PROFILE.links.email);

  return (
    <footer className="border-t">
      <Container className="flex flex-col items-center gap-4 py-10 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {PROFILE.name}
        </p>
        <div className="flex items-center gap-4">
          <a
            href={PROFILE.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={PROFILE.links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-foreground"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={emailHref}
            target="_blank"
            rel="noreferrer"
            aria-label="Email"
            className="transition-colors hover:text-foreground"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
