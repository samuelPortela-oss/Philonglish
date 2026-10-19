import type { SessionId, SessionVocabulary, VocabTerm } from "@/types/learning";

/**
 * Session vocabulary entries keyed by session id.
 * Every `word` must appear in the matching session's reading text in `data/levels.ts`,
 * and `context` quotes the sentence that contains it.
 */
const sessionVocabulary: SessionVocabulary = {
  "examined-life": [
    {
      word: "defence",
      partOfSpeech: "noun",
      definition:
        "What you say or write to explain or justify your actions, especially when you are accused of something.",
      context:
        "In his defence speech, Socrates told the jury that a life without examination was not worth living."
    },
    {
      word: "examination",
      partOfSpeech: "noun",
      definition:
        "A careful and serious look at something; here, thinking deeply about your own life and beliefs.",
      context:
        "In his defence speech, Socrates told the jury that a life without examination was not worth living."
    },
    {
      word: "craftsmen",
      partOfSpeech: "noun",
      definition: "People who are skilled at making things with their hands.",
      context:
        "He questioned politicians, poets, and craftsmen, and he found that each believed he knew much more than he actually did."
    },
    {
      word: "ignorance",
      partOfSpeech: "noun",
      definition: "A lack of knowledge or information about something.",
      context:
        "This, Socrates argued, was a kind of ignorance worse than his own, because he knew at least that he knew nothing."
    },
    {
      word: "condemned",
      partOfSpeech: "verb",
      definition: "Officially declared guilty and given a punishment.",
      context: "The jury, tired of being exposed, condemned him to drink hemlock."
    },
    {
      word: "judgments",
      partOfSpeech: "noun",
      definition: "Decisions or opinions formed after thinking carefully.",
      context:
        "He accepted the sentence calmly, arguing that a citizen who enjoys the protection of the laws must also accept their judgments."
    }
  ],
  "allegory-cave": [
    {
      word: "allegory",
      partOfSpeech: "noun",
      definition: "A story whose people and events stand for hidden ideas or meanings.",
      context:
        "Plato uses the allegory to explain education: it does not fill an empty mind, but turns the soul towards the light."
    },
    {
      word: "reality",
      partOfSpeech: "noun",
      definition: "The state of things as they really exist.",
      context: "For the prisoners, these shadows are the whole of reality."
    },
    {
      word: "habituation",
      partOfSpeech: "noun",
      definition: "The process of getting used to something through repeated experience.",
      context: "Only after a long habituation does he grasp the world above, and finally the sun itself."
    },
    {
      word: "grasp",
      partOfSpeech: "verb",
      definition: "To understand an idea or problem clearly.",
      context: "Only after a long habituation does he grasp the world above, and finally the sun itself."
    },
    {
      word: "conclude",
      partOfSpeech: "verb",
      definition: "To decide or believe something after thinking about the facts.",
      context:
        "When he returns to the cave, his eyes no longer adjust to the darkness, and the other prisoners conclude that his journey has ruined him."
    }
  ],
  "golden-mean": [
    {
      word: "virtue",
      partOfSpeech: "noun",
      definition: "A quality that is morally good, such as courage, honesty, or fairness.",
      context: "Nature gives us the capacity; habit gives us the actual virtue."
    },
    {
      word: "vices",
      partOfSpeech: "noun",
      definition: "Serious moral faults; the opposite of virtues.",
      context: "Virtue, said Aristotle, lies between two vices: one of excess and one of deficiency."
    },
    {
      word: "deficiency",
      partOfSpeech: "noun",
      definition: "Not having enough of something.",
      context: "Virtue, said Aristotle, lies between two vices: one of excess and one of deficiency."
    },
    {
      word: "varies",
      partOfSpeech: "verb",
      definition: "Is different in different situations or from person to person.",
      context:
        "The mean is not arithmetic: it is what the practical wisdom of a virtuous person would choose, and it varies with each situation."
    },
    {
      word: "capacity",
      partOfSpeech: "noun",
      definition: "The ability or potential to do something.",
      context: "Nature gives us the capacity; habit gives us the actual virtue."
    },
    {
      word: "carved",
      partOfSpeech: "verb",
      definition: "Shaped or formed gradually; here, built up through repeated action.",
      context: "Character, like a sculpture, is carved by repetition."
    }
  ],
  "pleasure-and-death": [
    {
      word: "ataraxia",
      partOfSpeech: "noun",
      definition: "A calm state of mind free from worry, pain, or disturbance.",
      context:
        "The wise person therefore concentrates on the present, seeking not intense pleasures but the absence of pain and disturbance — a state he called ataraxia."
    },
    {
      word: "disturbance",
      partOfSpeech: "noun",
      definition: "Worry, trouble, or activity that interrupts calm.",
      context:
        "The wise person therefore concentrates on the present, seeking not intense pleasures but the absence of pain and disturbance — a state he called ataraxia."
    },
    {
      word: "likewise",
      partOfSpeech: "adverb",
      definition: "In the same way; also.",
      context:
        "Fear of the gods, he argued, must likewise be set aside, since the blessed cannot suffer anger."
    },
    {
      word: "rival",
      partOfSpeech: "verb",
      definition: "To be as good as, or seem as important as, something else.",
      context: "On this view, a bowl of water and a piece of bread can rival the feasts of kings."
    },
    {
      word: "despise",
      partOfSpeech: "verb",
      definition: "To feel that someone or something is very bad or worthless.",
      context:
        "Epicurus did not despise friendship or gratitude: he held that no wise person could live pleasantly without them."
    },
    {
      word: "gratitude",
      partOfSpeech: "noun",
      definition: "The feeling of being thankful for something.",
      context:
        "Epicurus did not despise friendship or gratitude: he held that no wise person could live pleasantly without them."
    }
  ]
};

export function getVocab(sessionId: SessionId): readonly VocabTerm[] {
  return sessionVocabulary[sessionId] ?? [];
}
