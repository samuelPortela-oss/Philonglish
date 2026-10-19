"use client";

import { useState } from "react";
import type { Level, Session } from "@/types/learning";
import { getVocab } from "@/data/vocab";
import ReadingPane from "./ReadingPane";
import QuestionPanel from "./QuestionPanel";
import SessionNav from "./SessionNav";
import SessionSummary from "./SessionSummary";

interface SessionRunnerProps {
  level: Level;
  session: Session;
}

export default function SessionRunner({ level, session }: SessionRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const total = session.questions.length;
  const question = session.questions[currentIndex];
  const vocab = getVocab(session.id);

  function handleAnswered(correct: boolean) {
    if (correct) setScore((value) => value + 1);
  }

  function handleNext() {
    if (currentIndex === total - 1) {
      setFinished(true);
      setSummaryOpen(true);
      return;
    }
    setCurrentIndex((index) => index + 1);
  }

  function handleRetry() {
    setCurrentIndex(0);
    setScore(0);
    setFinished(false);
    setSummaryOpen(false);
  }

  return (
    <div>
      <header className="border-b border-ink-100 pb-6">
        <p className="text-xs uppercase tracking-widest text-ochre-700">
          {level.title} · Session {session.order} · {session.era}
        </p>
        <h1 className="mt-2 font-serif text-3xl">{session.title}</h1>
        <p className="mt-1 text-sm text-ink-500">{session.philosopher}</p>
      </header>

      <div className="mt-6">
        <div className="flex items-center justify-between text-sm text-ink-500">
          <span className="tabular-nums">
            Question {Math.min(currentIndex + 1, total)} of {total}
          </span>
          <span className="tabular-nums">{score} correct</span>
        </div>
        <div
          className="mt-2 h-1 overflow-hidden rounded-full bg-ink-100"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={currentIndex + 1}
        >
          <div
            className="h-full rounded-full bg-ochre-500 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
        <ReadingPane text={session.text} vocab={vocab} />

        <div>
          <QuestionPanel
            key={question.id}
            question={question}
            number={currentIndex + 1}
            total={total}
            onAnswered={handleAnswered}
            onNext={handleNext}
            isLast={currentIndex === total - 1}
          />
        </div>
      </div>

      <SessionNav level={level} session={session} />

      {summaryOpen && (
        <SessionSummary
          score={score}
          total={total}
          onRetry={handleRetry}
          onClose={() => setSummaryOpen(false)}
        />
      )}
    </div>
  );
}
