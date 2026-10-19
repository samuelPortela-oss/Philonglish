"use client";

import { useEffect, useRef } from "react";

export default function SessionSummary({
  score,
  total,
  onRetry,
  onClose,
}: {
  score: number;
  total: number;
  onRetry: () => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  const percent = Math.round((score / total) * 100);

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-ink-900/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="session-summary-title"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="w-full max-w-sm rounded-2xl border border-ink-100 bg-white p-8 outline-none"
      >
        <p className="text-xs uppercase tracking-widest text-ochre-700">Session complete</p>
        <h2 id="session-summary-title" className="mt-2 font-serif text-3xl">
          {score} / {total}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-500">
          You answered {percent}% of the questions correctly.
          {percent === 100 && " Excellent work."}
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onRetry}
            className="flex-1 rounded-lg bg-ink-900 px-4 py-2 text-sm text-white transition-colors hover:bg-ink-700"
          >
            Retry session
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-ink-900 px-4 py-2 text-sm transition-colors hover:bg-ink-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
