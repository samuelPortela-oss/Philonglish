"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { VocabTerm } from "@/types/learning";

/** Card width in px, clamped to the reading container on small screens. */
const CARD_WIDTH = 300;
const CARD_GAP = 8;

interface ActiveTerm {
  term: VocabTerm;
  left: number;
  top: number;
  width: number;
  above: boolean;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function VocabCard({
  active,
  onClose,
}: {
  active: ActiveTerm;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-label={`Definition of ${active.term.word}`}
      className="absolute z-10 rounded-xl border border-ochre-500 bg-white p-4 shadow-lg"
      style={{
        left: active.left,
        top: active.top,
        width: active.width,
        transform: active.above ? "translateY(-100%)" : undefined,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-serif text-base text-ink-900">{active.term.word}</p>
          <p className="mt-0.5 text-[11px] uppercase tracking-wider text-ochre-700">
            {active.term.partOfSpeech}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close definition"
          className="-m-1 rounded p-1 text-sm leading-none text-ink-500 transition-colors hover:text-ink-900"
        >
          ✕
        </button>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-ink-700">{active.term.definition}</p>

      <p className="mt-2 border-t border-ink-100 pt-2 font-serif text-sm italic leading-relaxed text-ink-500">
        “{active.term.context}”
      </p>
    </div>
  );
}

export default function ReadingPane({
  text,
  vocab,
}: {
  text: string;
  vocab: readonly VocabTerm[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<ActiveTerm | null>(null);

  const handleTermClick = useCallback((term: VocabTerm, element: HTMLElement) => {
    const container = containerRef.current;
    if (!container) return;

    setActive((current) => {
      if (current?.term.word === term.word) return null;

      const containerRect = container.getBoundingClientRect();
      const rect = element.getBoundingClientRect();

      const width = Math.min(CARD_WIDTH, containerRect.width);
      const left = Math.min(
        Math.max(rect.left - containerRect.left, 0),
        Math.max(containerRect.width - width, 0),
      );
      const aboveSpace = rect.top - containerRect.top;
      const belowSpace = rect.bottom - containerRect.top;
      const above = aboveSpace > belowSpace;
      const top = above
        ? rect.top - containerRect.top - CARD_GAP
        : rect.bottom - containerRect.top + CARD_GAP;

      return { term, left, top, width, above };
    });
  }, []);

  // Dismiss the open definition card on Escape, outside click or resize.
  useEffect(() => {
    if (!active) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
    }
    function handlePointerDown(event: PointerEvent) {
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest("[data-vocab-term]")) return;
      setActive(null);
    }
    function handleResize() {
      setActive(null);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [active]);

  function highlightContent(): ReactNode {
    if (vocab.length === 0) return text;

    const pattern = new RegExp(
      `\\b(${vocab.map((term) => escapeRegExp(term.word)).join("|")})\\b`,
      "gi",
    );
    const termByWord = new Map(vocab.map((term) => [term.word.toLowerCase(), term]));

    const nodes: ReactNode[] = [];
    let lastIndex = 0;

    for (const match of text.matchAll(pattern)) {
      const start = match.index ?? 0;
      if (start > lastIndex) nodes.push(text.slice(lastIndex, start));

      const word = match[0];
      const term = termByWord.get(word.toLowerCase());

      if (term) {
        const isActive = active?.term.word === term.word;
        nodes.push(
          <button
            key={start}
            type="button"
            data-vocab-term={term.word}
            aria-expanded={isActive}
            onClick={(event) => handleTermClick(term, event.currentTarget)}
            className={`cursor-pointer rounded px-0.5 align-baseline underline decoration-dotted underline-offset-[3px] transition-colors ${
              isActive
                ? "bg-ochre-100 font-medium text-ochre-700 decoration-ochre-700"
                : "text-ochre-700 decoration-ochre-500 hover:bg-ochre-100"
            }`}
          >
            {word}
          </button>,
        );
      } else {
        nodes.push(word);
      }

      lastIndex = start + word.length;
    }

    if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
    return <>{nodes}</>;
  }

  return (
    <div className="lg:sticky lg:top-20">
      <div
        ref={containerRef}
        className="relative rounded-xl border border-ink-100 bg-white p-6 sm:p-8"
      >
        <p className="font-serif text-lg leading-relaxed text-ink-900">{highlightContent()}</p>

        {active && <VocabCard active={active} onClose={() => setActive(null)} />}
      </div>

      {vocab.length > 0 && (
        <div className="mt-4 rounded-xl border border-ink-100 bg-white p-6">
          <h3 className="text-xs uppercase tracking-widest text-ochre-700">Key vocabulary</h3>
          <dl className="mt-3 space-y-2 text-sm">
            {vocab.map((term) => (
              <div key={term.word} className="flex gap-2">
                <dt className="font-medium text-ink-900">
                  {term.word}
                  <span className="ml-1.5 text-[11px] font-normal uppercase tracking-wide text-ink-300">
                    {term.partOfSpeech}
                  </span>
                </dt>
                <dd className="text-ink-500">{term.definition}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
