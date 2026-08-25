"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

function timeAgo(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days < 1) return "today";
  if (days === 1) return "1d ago";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? "1mo ago" : `${months}mo ago`;
}

export function LiveStat({
  github,
  pypi,
}: {
  github?: { owner: string; repo: string };
  pypi?: string;
}) {
  const [stars, setStars] = useState<number | null>(null);
  const [updated, setUpdated] = useState<string | null>(null);
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    if (github) {
      fetch(`https://api.github.com/repos/${github.owner}/${github.repo}`)
        .then((res) => (res.ok ? res.json() : Promise.reject()))
        .then((data) => {
          if (cancelled) return;
          if (typeof data.stargazers_count === "number") setStars(data.stargazers_count);
          if (typeof data.pushed_at === "string") setUpdated(timeAgo(data.pushed_at));
        })
        .catch(() => {});
    }

    if (pypi) {
      fetch(`https://pypi.org/pypi/${pypi}/json`)
        .then((res) => (res.ok ? res.json() : Promise.reject()))
        .then((data) => {
          if (cancelled) return;
          const v = data?.info?.version;
          if (typeof v === "string") setVersion(v);
        })
        .catch(() => {});
    }

    return () => {
      cancelled = true;
    };
  }, [github, pypi]);

  const parts: string[] = [];
  if (version) parts.push(`v${version}`);
  if (updated) parts.push(`updated ${updated}`);

  if (stars === null && parts.length === 0) return null;

  return (
    <div className="flex items-center gap-1.5 font-mono text-xs text-accent-signal">
      {stars !== null && (
        <span className="inline-flex items-center gap-1">
          <Star className="h-3 w-3" aria-hidden />
          {stars}
        </span>
      )}
      {stars !== null && parts.length > 0 && <span aria-hidden>·</span>}
      {parts.join(" · ")}
    </div>
  );
}
