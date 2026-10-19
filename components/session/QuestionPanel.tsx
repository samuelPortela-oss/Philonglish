"use client";

import { useState } from "react";
import type { Question } from "@/types/learning";
import { gradeAnswer } from "@/lib/grading";
import { GRAMMAR_TOPIC_LABEL, QUESTION_TYPE_LABEL } from "./questionMeta";

type ChoiceQuestion = Extract<Question, { options: readonly string[] }>;
type TextQuestion = Extract<
  Question,
  | { acceptedAnswers: readonly string[] }
  | { acceptedWords: readonly string[] }
  | { correctedSentence: string }
>;

const OPTION_LETTERS = ["A", "B", "C", "D"];

function isChoiceQuestion(question: Question): question is ChoiceQuestion {
  return "options" in question;
}

/** The statement / sentence excerpt displayed under the prompt, when the question has one. */
function questionBody(question: Question): string | null {
  switch (question.type) {
    case "TRUE_FALSE_NOT_GIVEN":
      return question.statement;
    case "WORD_EXTRACTION":
      return question.sentenceWithBlank;
    case "GRAMMAR_ANALYSIS":
    case "ERROR_CORRECTION":
    case "FILL_IN_BLANK":
      return question.sentence;
    case "READING_COMPREHENSION":
      return null;
  }
}

function modelAnswer(question: Question): string {
  switch (question.type) {
    case "READING_COMPREHENSION":
    case "GRAMMAR_ANALYSIS":
      return question.options[question.correctOptionIndex];
    case "TRUE_FALSE_NOT_GIVEN":
      return question.correctAnswer;
    case "WORD_EXTRACTION":
      return question.acceptedWords.join(" / ");
    case "FILL_IN_BLANK":
      return question.acceptedAnswers.join(" / ");
    case "ERROR_CORRECTION":
      return question.correctedSentence;
  }
}

function explanation(question: Question): string {
  switch (question.type) {
    case "GRAMMAR_ANALYSIS":
    case "ERROR_CORRECTION":
    case "TRUE_FALSE_NOT_GIVEN":
    case "WORD_EXTRACTION":
      return question.explanation;
    default:
      return question.feedback ?? "";
  }
}

function MultipleChoice({
  question,
  selected,
  revealed,
  onSelect,
}: {
  question: ChoiceQuestion;
  selected: number | null;
  revealed: boolean;
  onSelect: (index: number) => void;
}) {
  return (
    <fieldset className="mt-4 space-y-2" disabled={revealed}>
      <legend className="sr-only">{question.prompt}</legend>
      {question.options.map((option, index) => {
        const isSelected = selected === index;
        const isAnswer = revealed && index === question.correctOptionIndex;
        const isWrongPick = revealed && isSelected && !isAnswer;

        return (
          <label
            key={index}
            className={`flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-2.5 text-sm transition-colors ${
              isAnswer
                ? "border-ochre-500 bg-ochre-100"
                : isWrongPick
                  ? "border-red-300 bg-red-50 text-red-700"
                  : isSelected
                    ? "border-ink-900 bg-ink-50"
                    : "border-ink-100 hover:border-ink-300"
            } ${revealed ? "cursor-default" : ""}`}
          >
            <input
              type="radio"
              name={question.id}
              value={index}
              checked={isSelected}
              onChange={() => onSelect(index)}
              className="sr-only"
            />
            <span
              className={`mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-medium ${
                isSelected || isAnswer
                  ? "border-ink-900 bg-ink-900 text-white"
                  : "border-ink-300 text-ink-500"
              }`}
            >
              {OPTION_LETTERS[index]}
            </span>
            <span>{option}</span>
          </label>
        );
      })}
    </fieldset>
  );
}

// Componente visual específico para TRUE / FALSE / NOT GIVEN (Estilo IELTS)
function TrueFalseOptions({
  question,
  selectedText,
  revealed,
  onSelect,
}: {
  question: Extract<Question, { type: "TRUE_FALSE_NOT_GIVEN" }>;
  selectedText: string;
  revealed: boolean;
  onSelect: (val: string) => void;
}) {
  const options = ["TRUE", "FALSE", "NOT_GIVEN"] as const;

  return (
    <div className="mt-4 grid grid-cols-3 gap-2" aria-disabled={revealed}>
      {options.map((opt) => {
        const isSelected = selectedText === opt;
        const isCorrectOpt = revealed && question.correctAnswer === opt;
        const isWrongPick = revealed && isSelected && !isCorrectOpt;

        return (
          <button
            key={opt}
            type="button"
            disabled={revealed}
            onClick={() => onSelect(opt)}
            className={`rounded-lg border px-3 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
              isCorrectOpt
                ? "border-ochre-500 bg-ochre-100 text-ochre-800"
                : isWrongPick
                  ? "border-red-300 bg-red-50 text-red-700"
                  : isSelected
                    ? "border-ink-900 bg-ink-900 text-white"
                    : "border-ink-200 bg-white text-ink-700 hover:border-ink-400"
            }`}
          >
            {opt.replace("_", " ")}
          </button>
        );
      })}
    </div>
  );
}

function TextInput({
  question,
  value,
  revealed,
  onChange,
}: {
  question: TextQuestion;
  value: string;
  revealed: boolean;
  onChange: (value: string) => void;
}) {
  let placeholder = "Your answer…";
  if (question.type === "ERROR_CORRECTION") {
    placeholder = "Rewrite the whole sentence…";
  } else if (question.type === "WORD_EXTRACTION") {
    placeholder = "Write ONE word from the text…";
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      disabled={revealed}
      placeholder={placeholder}
      autoCapitalize="off"
      autoCorrect="off"
      spellCheck={false}
      className="mt-4 w-full rounded-lg border border-ink-100 bg-ink-50 px-4 py-2.5 font-serif text-sm outline-none transition-colors focus:border-ink-900 disabled:opacity-60"
    />
  );
}

export default function QuestionPanel({
  question,
  number,
  total,
  onAnswered,
  onNext,
  isLast,
}: {
  question: Question;
  number: number;
  total: number;
  onAnswered: (correct: boolean) => void;
  onNext: () => void;
  isLast: boolean;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [input, setInput] = useState("");
  const [revealed, setRevealed] = useState(false);

  const isChoice = isChoiceQuestion(question);
  const isTfng = question.type === "TRUE_FALSE_NOT_GIVEN";
  const body = questionBody(question);

  const correct = revealed && gradeAnswer(question, { selected, text: input });
  const canCheck = isChoice ? selected !== null : input.trim().length > 0;

  function handleCheck() {
    onAnswered(gradeAnswer(question, { selected, text: input }));
    setRevealed(true);
  }

  function handleNext() {
    setSelected(null);
    setInput("");
    setRevealed(false);
    onNext();
  }

  return (
    <section className="rounded-xl border border-ink-100 bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs uppercase tracking-widest text-ochre-700">
          {number} of {total} · {QUESTION_TYPE_LABEL[question.type]}
        </span>
        {question.type === "GRAMMAR_ANALYSIS" && (
          <span className="rounded-full bg-ochre-100 px-2 py-0.5 text-[11px] font-medium text-ochre-700">
            {GRAMMAR_TOPIC_LABEL[question.targetRule]}
          </span>
        )}
      </div>

      <p className="mt-3 leading-relaxed">{question.prompt}</p>

      {/* Sentencia, declaración o frase con hueco (IELTS) de la pregunta */}
      {body && (
        <p className="mt-4 rounded-lg bg-ink-50 p-3 font-serif italic leading-relaxed">
          {body}
        </p>
      )}

      {isChoice ? (
        <MultipleChoice
          question={question}
          selected={selected}
          revealed={revealed}
          onSelect={setSelected}
        />
      ) : isTfng ? (
        <TrueFalseOptions
          question={question}
          selectedText={input}
          revealed={revealed}
          onSelect={(val) => setInput(val)}
        />
      ) : (
        <TextInput
          question={question}
          value={input}
          revealed={revealed}
          onChange={setInput}
        />
      )}

      {revealed && (
        <div
          className={`mt-4 rounded-lg border p-4 ${
            correct ? "border-ochre-500 bg-ochre-100" : "border-red-200 bg-red-50"
          }`}
        >
          <p
            className={`text-sm font-medium ${
              correct ? "text-ochre-700" : "text-red-700"
            }`}
          >
            {correct ? "Correct" : "Incorrect"}
          </p>
          {!correct && (
            <p className="mt-1 text-sm text-ink-700">
              <span className="font-medium">Answer:</span> {modelAnswer(question)}
            </p>
          )}
          {explanation(question) && (
            <p className="mt-2 text-sm leading-relaxed text-ink-500">
              {explanation(question)}
            </p>
          )}
        </div>
      )}

      <div className="mt-6 flex justify-end">
        {revealed ? (
          <button
            type="button"
            onClick={handleNext}
            className="rounded-lg bg-ink-900 px-5 py-2 text-sm text-white transition-colors hover:bg-ink-700"
          >
            {isLast ? "Finish session" : "Next question"}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleCheck}
            disabled={!canCheck}
            className="rounded-lg border border-ink-900 px-5 py-2 text-sm transition-colors hover:bg-ink-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            Check
          </button>
        )}
      </div>
    </section>
  );
}