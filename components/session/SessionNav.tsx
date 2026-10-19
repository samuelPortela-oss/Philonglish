"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Level, Session } from "@/types/learning";

interface SessionNavProps {
  level: Level;
  session: Session;
}

interface ArrowProps {
  className?: string;
}

function ArrowLeftIcon({ className }: ArrowProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M13 8H3m4 4-4-4 4-4" />
    </svg>
  );
}

function ArrowRightIcon({ className }: ArrowProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

const ITEM_BASE =
  "group flex flex-1 flex-col gap-0.5 rounded-xl border border-ink-100 bg-white px-5 py-3.5 transition-colors";
const ITEM_ENABLED = `${ITEM_BASE} hover:border-ochre-500`;
const ITEM_DISABLED = `${ITEM_BASE} cursor-not-allowed opacity-40`;
const LABEL_BASE = "flex items-center gap-1.5 text-xs uppercase tracking-widest";

export default function SessionNav({ level, session }: SessionNavProps) {
  const pathname = usePathname();

  // Sessions are ordered explicitly via `order`, so prev/next stay correct even
  // if the level's session list is ever reordered or partially populated.
  const orderedSessions = [...level.sessions].sort((a, b) => a.order - b.order);
  const currentIndex = orderedSessions.findIndex((entry) => entry.id === session.id);

  const previousSession = currentIndex > 0 ? orderedSessions[currentIndex - 1] : null;
  const nextSession =
    currentIndex >= 0 && currentIndex < orderedSessions.length - 1
      ? orderedSessions[currentIndex + 1]
      : null;

  /** Keeps navigation inside the current route family (/learn/… or /levels/…). */
  function hrefFor(target: Session): string {
    const segments = pathname.split("/").filter((segment) => segment.length > 0);
    if (segments.length < 2) return `/learn/${level.id}/${target.id}`;
    segments[segments.length - 1] = target.id;
    return `/${segments.join("/")}`;
  }

  return (
    <nav
      aria-label="Lesson navigation"
      className="mt-10 flex items-stretch gap-3 border-t border-ink-100 pt-6"
    >
      {previousSession ? (
        <Link href={hrefFor(previousSession)} className={ITEM_ENABLED}>
          <span className={`${LABEL_BASE} text-ochre-700`}>
            <ArrowLeftIcon className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Previous Lesson
          </span>
          <span className="font-serif text-sm text-ink-900">{previousSession.title}</span>
        </Link>
      ) : (
        <span aria-disabled="true" className={ITEM_DISABLED}>
          <span className={`${LABEL_BASE} text-ink-300`}>
            <ArrowLeftIcon className="h-3.5 w-3.5" />
            Previous Lesson
          </span>
          <span className="font-serif text-sm text-ink-300">First session</span>
        </span>
      )}

      {nextSession ? (
        <Link
          href={hrefFor(nextSession)}
          className={`${ITEM_ENABLED} items-end text-right`}
        >
          <span className={`${LABEL_BASE} justify-end text-ochre-700`}>
            Next Lesson
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="font-serif text-sm text-ink-900">{nextSession.title}</span>
        </Link>
      ) : (
        <span aria-disabled="true" className={`${ITEM_DISABLED} items-end text-right`}>
          <span className={`${LABEL_BASE} justify-end text-ink-300`}>
            Next Lesson
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </span>
          <span className="font-serif text-sm text-ink-300">Last session</span>
        </span>
      )}
    </nav>
  );
}
