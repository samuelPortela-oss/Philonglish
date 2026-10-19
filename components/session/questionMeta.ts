import type { B2GrammarTopic, Question } from "@/types/learning";

export const QUESTION_TYPE_LABEL: Record<Question["type"], string> = {
  READING_COMPREHENSION: "Reading comprehension",
  TRUE_FALSE_NOT_GIVEN: "True / False / Not Given",
  WORD_EXTRACTION: "Word extraction (One Word Only)",
  GRAMMAR_ANALYSIS: "Grammar analysis",
  ERROR_CORRECTION: "Error correction",
  FILL_IN_BLANK: "Fill in the blank",
};

export const GRAMMAR_TOPIC_LABEL: Record<B2GrammarTopic, string> = {
  CONDITIONALS: "Conditionals",
  PASSIVE_VOICE: "Passive voice",
  INVERSION: "Inversion",
  REPORTED_SPEECH: "Reported speech",
  RELATIVE_CLAUSES: "Relative clauses",
  MODAL_VERBS: "Modal verbs",
  WISH_AND_IF_ONLY: "Wish / if only",
  PARTICIPLE_CLAUSES: "Participle clauses",
  LINKING_WORDS: "Linking words",
  QUANTIFIERS: "Quantifiers",
};
