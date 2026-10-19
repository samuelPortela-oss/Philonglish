import type { QuestionResult, SessionProgress, UserProgress } from "@/types/learning";

/**
 * Demo progress seeded against the canonical ids in `data/levels.ts`.
 */
const examinedLifeResults: QuestionResult[] = [
  {
    questionId: "el-q1",
    questionType: "TRUE_FALSE_NOT_GIVEN",
    answer: "FALSE",
    isCorrect: true,
    answeredAt: "2026-03-02T10:12:00.000Z",
  },
  {
    questionId: "el-q2",
    questionType: "TRUE_FALSE_NOT_GIVEN",
    answer: "NOT_GIVEN",
    isCorrect: true,
    answeredAt: "2026-03-02T10:15:00.000Z",
  },
  {
    questionId: "el-q3",
    questionType: "WORD_EXTRACTION",
    answer: "judgments",
    isCorrect: true,
    answeredAt: "2026-03-02T10:18:00.000Z",
  },
  {
    questionId: "el-q4",
    questionType: "GRAMMAR_ANALYSIS",
    answer: 0,
    isCorrect: true,
    answeredAt: "2026-03-02T10:20:00.000Z",
  },
  {
    questionId: "el-q5",
    questionType: "ERROR_CORRECTION",
    answer: "Socrates refused writing a single line during his lifetime.",
    isCorrect: false,
    answeredAt: "2026-03-02T10:23:00.000Z",
  },
  {
    questionId: "el-q6",
    questionType: "FILL_IN_BLANK",
    answer: "living",
    isCorrect: true,
    answeredAt: "2026-03-02T10:26:00.000Z",
  },
];

const examinedLifeProgress: SessionProgress = {
  sessionId: "examined-life",
  status: "COMPLETED",
  results: examinedLifeResults,
  score: { correct: 5, total: 6 },
  startedAt: "2026-03-02T10:10:00.000Z",
  completedAt: "2026-03-02T10:28:00.000Z",
};

const allegoryCaveProgress: SessionProgress = {
  sessionId: "allegory-cave",
  status: "IN_PROGRESS",
  results: [
    {
      questionId: "ac-q1",
      questionType: "TRUE_FALSE_NOT_GIVEN",
      answer: "FALSE",
      isCorrect: true,
      answeredAt: "2026-03-03T18:40:00.000Z",
    },
    {
      questionId: "ac-q2",
      questionType: "TRUE_FALSE_NOT_GIVEN",
      answer: "FALSE",
      isCorrect: false,
      answeredAt: "2026-03-03T18:44:00.000Z",
    },
  ],
  score: { correct: 1, total: 6 },
  startedAt: "2026-03-03T18:38:00.000Z",
};

export const mockUserProgress: UserProgress = {
  userId: "u-demo-001",
  levels: [
    {
      levelId: "ancient-greece",
      sessions: [examinedLifeProgress, allegoryCaveProgress],
    },
  ],
  lastVisitedSessionId: "allegory-cave",
  updatedAt: "2026-03-03T18:45:00.000Z",
};
