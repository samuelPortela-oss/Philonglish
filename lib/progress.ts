import type { Level, Session, SessionProgress, UserProgress } from "@/types/learning";

export type SessionState = "LOCKED" | "AVAILABLE" | "IN_PROGRESS" | "COMPLETED";

export interface SessionViewState {
  session: Session;
  state: SessionState;
  answeredCount: number;
  correctCount: number;
  totalQuestions: number;
}

function findSessionProgress(
  session: Session,
  progress?: UserProgress,
): SessionProgress | undefined {
  return progress?.levels
    .find((level) => level.levelId === session.levelId)
    ?.sessions.find((entry) => entry.sessionId === session.id);
}

export function deriveSessionStates(level: Level, progress?: UserProgress): SessionViewState[] {
  let previousUnlocked = false;

  return level.sessions.map((session) => {
    const entry = findSessionProgress(session, progress);
    const answeredCount = entry?.results.length ?? 0;
    const correctCount = entry?.results.filter((result) => result.isCorrect).length ?? 0;

    let state: SessionState;
    if (entry?.status === "COMPLETED") {
      state = "COMPLETED";
    } else if (answeredCount > 0) {
      state = "IN_PROGRESS";
    } else {
      state = previousUnlocked ? "AVAILABLE" : "LOCKED";
    }

    previousUnlocked = state !== "LOCKED";

    return {
      session,
      state,
      answeredCount,
      correctCount,
      totalQuestions: session.questions.length,
    };
  });
}

export function levelCompletion(
  level: Level,
  progress?: UserProgress,
): { completed: number; total: number } {
  const states = deriveSessionStates(level, progress);
  return {
    completed: states.filter((view) => view.state === "COMPLETED").length,
    total: level.sessions.length,
  };
}
