import type { Question } from "@/types/learning";

export interface SessionAnswer {
  questionId: string;
  isCorrect: boolean;
}

export function normalizeAnswer(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[.!?]+$/, "")
    .replace(/\s+/g, " ");
}

export function gradeAnswer(
  question: Question,
  input: { selected: number | null; text: string },
): boolean {
  switch (question.type) {
    case "READING_COMPREHENSION":
    case "GRAMMAR_ANALYSIS":
      return input.selected === question.correctOptionIndex;

    // 1. Caso IELTS: TRUE / FALSE / NOT GIVEN
    case "TRUE_FALSE_NOT_GIVEN": {
      const userValue = normalizeAnswer(input.text);
      const correctValue = normalizeAnswer(question.correctAnswer);
      return userValue === correctValue;
    }

    // 2. Caso IELTS: Extracción de palabra exacta (ONE WORD ONLY)
    case "WORD_EXTRACTION": {
      const value = input.text.trim();
      return question.acceptedWords.some((accepted) =>
        question.caseSensitive
          ? accepted === value
          : normalizeAnswer(accepted) === normalizeAnswer(value),
      );
    }

    case "FILL_IN_BLANK": {
      const value = input.text.trim();
      return question.acceptedAnswers.some((accepted) =>
        question.caseSensitive
          ? accepted === value
          : normalizeAnswer(accepted) === normalizeAnswer(value),
      );
    }

    case "ERROR_CORRECTION":
      return (
        normalizeAnswer(question.correctedSentence) ===
        normalizeAnswer(input.text)
      );
  }
}