export type UserId = string;
export type LevelId = string;
export type SessionId = string;
export type QuestionId = string;

export const SESSIONS_PER_LEVEL = 4;
export const QUESTIONS_PER_SESSION = 6;

// 1. Ampliamos los tipos de preguntas para incluir el estándar IELTS
export type QuestionType =
  | "READING_COMPREHENSION"
  | "TRUE_FALSE_NOT_GIVEN"  // <-- Nuevo tipo IELTS
  | "WORD_EXTRACTION"        // <-- Nuevo tipo IELTS (ONE WORD ONLY)
  | "GRAMMAR_ANALYSIS"
  | "ERROR_CORRECTION"
  | "FILL_IN_BLANK";

export type B2GrammarTopic =
  | "CONDITIONALS"
  | "PASSIVE_VOICE"
  | "INVERSION"
  | "REPORTED_SPEECH"
  | "RELATIVE_CLAUSES"
  | "MODAL_VERBS"
  | "WISH_AND_IF_ONLY"
  | "PARTICIPLE_CLAUSES"
  | "LINKING_WORDS"
  | "QUANTIFIERS";

interface BaseQuestion {
  readonly id: QuestionId;
  readonly type: QuestionType;
  readonly prompt: string;
  readonly feedback?: string;
}

export interface ReadingComprehensionQuestion extends BaseQuestion {
  readonly type: "READING_COMPREHENSION";
  readonly options: readonly string[];
  readonly correctOptionIndex: number;
}

// 2. Nueva interfaz para TRUE / FALSE / NOT GIVEN
export interface TrueFalseNotGivenQuestion extends BaseQuestion {
  readonly type: "TRUE_FALSE_NOT_GIVEN";
  readonly statement: string;
  readonly correctAnswer: "TRUE" | "FALSE" | "NOT_GIVEN";
  readonly explanation: string;
}

// 3. Nueva interfaz para extracción de palabras exactas del texto (IELTS Style)
export interface WordExtractionQuestion extends BaseQuestion {
  readonly type: "WORD_EXTRACTION";
  readonly sentenceWithBlank: string; // Ej: "Epicurus defined mental peace as ____."
  readonly acceptedWords: readonly string[]; // Ej: ["ataraxia"]
  readonly maxWordsAllowed: 1; // Para forzar "ONE WORD ONLY"
  readonly caseSensitive: boolean;
  readonly explanation: string;
}

export interface GrammarAnalysisQuestion extends BaseQuestion {
  readonly type: "GRAMMAR_ANALYSIS";
  readonly sentence: string;
  readonly options: readonly string[];
  readonly correctOptionIndex: number;
  readonly targetRule: B2GrammarTopic;
  readonly explanation: string;
}

export interface ErrorCorrectionQuestion extends BaseQuestion {
  readonly type: "ERROR_CORRECTION";
  readonly sentence: string;
  readonly correctedSentence: string;
  readonly errorToken?: string;
  readonly explanation: string;
}

export interface FillInBlankQuestion extends BaseQuestion {
  readonly type: "FILL_IN_BLANK";
  readonly sentence: string;
  readonly acceptedAnswers: readonly string[];
  readonly caseSensitive: boolean;
}

// 4. Actualizamos el tipo unión con las 2 nuevas interfaces
export type Question =
  | ReadingComprehensionQuestion
  | TrueFalseNotGivenQuestion
  | WordExtractionQuestion
  | GrammarAnalysisQuestion
  | ErrorCorrectionQuestion
  | FillInBlankQuestion;

// 5. La tupla de 6 preguntas ahora puede admitir cualquiera de los tipos
export type QuestionSet = readonly [
  Question,
  Question,
  Question,
  Question,
  Question,
  Question,
];

export type SessionOrder = 1 | 2 | 3 | 4;

export interface Session {
  readonly id: SessionId;
  readonly levelId: LevelId;
  readonly order: SessionOrder;
  readonly title: string;
  readonly philosopher: string;
  readonly era: string;
  readonly cefrLevel: "B2";
  readonly text: string;
  readonly questions: QuestionSet;
}

export type LevelSessions = readonly Session[];

export interface Level {
  readonly id: LevelId;
  readonly title: string;
  readonly period: string;
  readonly description: string;
  readonly sessions: LevelSessions;
}

export type SessionStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export type GivenAnswer = string | number;

export interface QuestionResult {
  readonly questionId: QuestionId;
  readonly questionType: QuestionType;
  readonly answer: GivenAnswer;
  readonly isCorrect: boolean;
  readonly answeredAt: string;
}

export interface SessionScore {
  readonly correct: number;
  readonly total: number;
}

export interface SessionProgress {
  readonly sessionId: SessionId;
  readonly status: SessionStatus;
  readonly results: readonly QuestionResult[];
  readonly score: SessionScore;
  readonly startedAt?: string;
  readonly completedAt?: string;
}

export interface LevelProgress {
  readonly levelId: LevelId;
  readonly sessions: readonly SessionProgress[];
}

export interface UserProgress {
  readonly userId: UserId;
  readonly levels: readonly LevelProgress[];
  readonly lastVisitedSessionId?: SessionId;
  readonly updatedAt: string;
}

// ---------------------------------------------------------------------------
// Vocabulary glossary
// ---------------------------------------------------------------------------

export type PartOfSpeech =
  | "noun"
  | "verb"
  | "adjective"
  | "adverb"
  | "pronoun"
  | "preposition"
  | "conjunction"
  | "determiner"
  | "phrase";

export interface VocabTerm {
  /** Surface form as it appears in the session reading text. */
  readonly word: string;
  readonly partOfSpeech: PartOfSpeech;
  /** Plain-English definition written for B2 learners. */
  readonly definition: string;
  /** The sentence from the reading text that illustrates the term. */
  readonly context: string;
}

/** Session vocabulary entries keyed by session id. */
export type SessionVocabulary = Readonly<
  Partial<Record<SessionId, readonly VocabTerm[]>>
>;