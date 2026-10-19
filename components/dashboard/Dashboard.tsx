"use client";

import { useMemo } from "react";
import { levels } from "@/data/levels";
import { mockUserProgress } from "@/data/mockUserProgress";
import { deriveSessionStates } from "@/lib/progress";
import type { UserProgress } from "@/types/learning";
import LevelOverview from "./LevelOverview";

export default function Dashboard() {
  const progress: UserProgress = mockUserProgress;

  const levelStates = useMemo(
    () =>
      levels.map((level) => ({
        level,
        sessions: deriveSessionStates(level, progress),
      })),
    [progress],
  );

  return (
    <div className="space-y-16">
      {levelStates.map(({ level, sessions }) => (
        <LevelOverview key={level.id} level={level} sessions={sessions} />
      ))}
    </div>
  );
}
