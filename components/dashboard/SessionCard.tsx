"use client";

import Link from "next/link";
import type { SessionViewState } from "@/lib/progress";
import { ArrowIcon, CheckIcon, LockIcon } from "./icons";

const STATE_CARD_CLASS: Record<SessionViewState["state"], string> = {
  LOCKED: "border-ink-100 bg-ink-50 text-ink-300",
  AVAILABLE: "border-ink-100 bg-white hover:border-ink-900",
  IN_PROGRESS: "border-ink-100 bg-white hover:border-ink-900",
  COMPLETED: "border-ochre-500 bg-white",
};

const STATE_ACTION: Record<SessionViewState["state"], string> = {
  LOCKED: "Locked",
  AVAILABLE: "Start",
  IN_PROGRESS: "Continue",
  COMPLETED: "Review",
};

function ProgressTrack({ answered, total }: { answered: number; total: number }) {
  const percent = Math.round((answered / total) * 100);

  return (
    <div className="mt-3 flex items-center gap-3">
      <div className="h-1 flex-1 overflow-hidden rounded-full bg-ink-100">
        <div className="h-full rounded-full bg-ink-900" style={{ width: `${percent}%` }} />
      </div>
      <span className="text-xs tabular-nums text-ink-500">
        {answered}/{total}
      </span>
    </div>
  );
}

function ScoreBadge({ correct, total }: { correct: number; total: number }) {
  return (
    <span className="rounded-full bg-ochre-100 px-2.5 py-0.5 text-xs font-medium tabular-nums text-ochre-700">
      {correct}/{total}
    </span>
  );
}

export default function SessionCard({ view }: { view: SessionViewState }) {
  const { session, state, answeredCount, correctCount, totalQuestions } = view;

  const body = (
    <div className="flex items-start gap-4">
      <span
        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm tabular-nums ${
          state === "COMPLETED"
            ? "border-ochre-500 bg-ochre-100 text-ochre-700"
            : state === "LOCKED"
              ? "border-ink-100 bg-ink-50 text-ink-300"
              : "border-ink-900 bg-white text-ink-900"
        }`}
      >
        {state === "COMPLETED" ? <CheckIcon className="h-4 w-4" /> : session.order}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3
            className={`font-serif text-lg ${state === "LOCKED" ? "text-ink-300" : "text-ink-900"}`}
          >
            {session.title}
          </h3>
          {state === "COMPLETED" && (
            <ScoreBadge correct={correctCount} total={totalQuestions} />
          )}
        </div>

        <p
          className={`mt-0.5 text-sm ${
            state === "LOCKED" ? "text-ink-300" : "text-ink-500"
          }`}
        >
          {session.philosopher} · {session.era}
        </p>

        {state === "IN_PROGRESS" && (
          <ProgressTrack answered={answeredCount} total={totalQuestions} />
        )}
      </div>

      <span
        className={`mt-1 flex shrink-0 items-center gap-1 text-sm ${
          state === "LOCKED"
            ? "text-ink-300"
            : state === "COMPLETED"
              ? "text-ochre-700"
              : "text-ink-900"
        }`}
      >
        {state === "LOCKED" && <LockIcon className="h-4 w-4" />}
        {STATE_ACTION[state]}
        {state !== "LOCKED" && <ArrowIcon className="h-4 w-4" />}
      </span>
    </div>
  );

  if (state === "LOCKED") {
    return (
      <div aria-disabled="true" className={`rounded-xl border p-4 sm:p-5 ${STATE_CARD_CLASS.LOCKED}`}>
        {body}
      </div>
    );
  }

  return (
    <Link
      href={`/learn/${session.levelId}/${session.id}`}
      className={`block rounded-xl border p-4 transition-colors sm:p-5 ${STATE_CARD_CLASS[state]}`}
    >
      {body}
    </Link>
  );
}
