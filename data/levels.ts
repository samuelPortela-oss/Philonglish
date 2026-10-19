import type { Level, LevelId, Session, SessionId } from "@/types/learning";

const ancientGreeceSessions: Session[] = [
  {
    id: "examined-life",
    levelId: "ancient-greece",
    order: 1,
    title: "The Examined Life",
    philosopher: "Socrates",
    era: "c. 399 BCE",
    cefrLevel: "B2",
    text: "Socrates never wrote a single line. What we know of him comes from his students, especially Plato, who recorded his conversations in the market of Athens. In his defence speech, Socrates told the jury that a life without examination was not worth living. He questioned politicians, poets, and craftsmen, and he found that each believed he knew much more than he actually did. This, Socrates argued, was a kind of ignorance worse than his own, because he knew at least that he knew nothing. The jury, tired of being exposed, condemned him to drink hemlock. He accepted the sentence calmly, arguing that a citizen who enjoys the protection of the laws must also accept their judgments.",
    questions: [
      {
        id: "el-q1",
        type: "TRUE_FALSE_NOT_GIVEN",
        prompt: "Does the following statement agree with the text?",
        statement: "Socrates believed that politicians and poets possessed genuine practical wisdom.",
        correctAnswer: "FALSE",
        explanation: "The text states that Socrates questioned politicians and poets, finding that 'each believed he knew much more than he actually did,' which Socrates considered a form of ignorance."
      },
      {
        id: "el-q2",
        type: "TRUE_FALSE_NOT_GIVEN",
        prompt: "Does the following statement agree with the text?",
        statement: "Plato was the only student who took written notes during Socrates's trials in Athens.",
        correctAnswer: "NOT_GIVEN",
        explanation: "The text notes that Plato recorded conversations in the market, but it does not state that he was the 'only' student who took notes or that he did so during the trial itself."
      },
      {
        id: "el-q3",
        type: "WORD_EXTRACTION",
        prompt: "Complete the statement below. Write ONE WORD ONLY from the text for your answer.",
        sentenceWithBlank: "Socrates calmly accepted his sentence, insisting that a citizen protected by the laws must accept their ____.",
        acceptedWords: ["judgments"],
        maxWordsAllowed: 1,
        caseSensitive: false,
        explanation: "In the final sentence of the text, Socrates argues that citizens must 'accept their judgments'."
      },
      {
        id: "el-q4",
        type: "GRAMMAR_ANALYSIS",
        prompt: 'In the clause "What we know of him comes from his students", identify the grammatical role of "What we know of him".',
        sentence: "What we know of him comes from his students...",
        options: [
          "It acts as the subject of the verb 'comes'",
          "It is an object complement of the preposition 'from'",
          "It functions as an adverbial clause of time",
          "It is a relative clause modifying 'students'"
        ],
        correctOptionIndex: 0,
        targetRule: "RELATIVE_CLAUSES",
        explanation: "The nominal relative clause 'What we know of him' acts as the noun phrase subject for the verb 'comes'."
      },
      {
        id: "el-q5",
        type: "ERROR_CORRECTION",
        prompt: "Rewrite the sentence below to fix the gerund/infinitive grammatical error.",
        sentence: "Socrates refused writing a single line during his lifetime.",
        correctedSentence: "Socrates refused to write a single line during his lifetime.",
        errorToken: "writing",
        explanation: "The verb 'refuse' must be followed by an infinitive ('to write'), not a gerund ('writing')."
      },
      {
        id: "el-q6",
        type: "FILL_IN_BLANK",
        prompt: "Complete the famous Socratic dictum using the correct B2 participle form.",
        sentence: "In his defence speech, Socrates insisted that an unexamined life was not worth ____.",
        acceptedAnswers: ["living"],
        caseSensitive: false
      }
    ]
  },
  {
    id: "allegory-cave",
    levelId: "ancient-greece",
    order: 2,
    title: "The Allegory of the Cave",
    philosopher: "Plato",
    era: "c. 375 BCE",
    cefrLevel: "B2",
    text: "Imagine prisoners chained in a cave since childhood, unable to turn their heads. Behind them burns a fire, and between the fire and the prisoners someone carries objects whose shadows fall on the wall. For the prisoners, these shadows are the whole of reality. If one of them is released and dragged into the sunlight, the light wounds his eyes and he cannot see anything at first. Only after a long habituation does he grasp the world above, and finally the sun itself. When he returns to the cave, his eyes no longer adjust to the darkness, and the other prisoners conclude that his journey has ruined him. Plato uses the allegory to explain education: it does not fill an empty mind, but turns the soul towards the light.",
    questions: [
      {
        id: "ac-q1",
        type: "TRUE_FALSE_NOT_GIVEN",
        prompt: "Does the following statement agree with the text?",
        statement: "Upon returning to the cave, the freed prisoner was welcomed as a wise teacher by the others.",
        correctAnswer: "FALSE",
        explanation: "The text states that his eyes could no longer adjust to darkness, causing the other prisoners to conclude that 'his journey has ruined him'."
      },
      {
        id: "ac-q2",
        type: "TRUE_FALSE_NOT_GIVEN",
        prompt: "Does the following statement agree with the text?",
        statement: "According to Plato, true education is a process of reorienting the soul rather than transmitting information.",
        correctAnswer: "TRUE",
        explanation: "The passage explicitly concludes that education 'does not fill an empty mind, but turns the soul towards the light'."
      },
      {
        id: "ac-q3",
        type: "WORD_EXTRACTION",
        prompt: "Complete the statement below. Write ONE WORD ONLY from the text for your answer.",
        sentenceWithBlank: "For the tied prisoners, the ____ projected on the wall constituted their entire reality.",
        acceptedWords: ["shadows"],
        maxWordsAllowed: 1,
        caseSensitive: false,
        explanation: "The text explicitly states: 'For the prisoners, these shadows are the whole of reality.'"
      },
      {
        id: "ac-q4",
        type: "GRAMMAR_ANALYSIS",
        prompt: 'Analyze the inverted structure in: "Only after a long habituation does he grasp the world above."',
        sentence: "Only after a long habituation does he grasp the world above...",
        options: [
          "Subject-verb inversion triggered by a restrictive negative/limiting adverbial pre-modifier",
          "A second conditional clause omitting the conjunction 'if'",
          "A passive voice construction used for stylistic emphasis",
          "An indirect question embedded in a complex sentence"
        ],
        correctOptionIndex: 0,
        targetRule: "INVERSION",
        explanation: "When negative or limiting adverbial phrases starting with 'Only after...' are placed at the sentence front, auxiliary inversion ('does he grasp') is required."
      },
      {
        id: "ac-q5",
        type: "ERROR_CORRECTION",
        prompt: "Rewrite the sentence to correct the prepositional pattern after 'allegory'.",
        sentence: "Plato uses the allegory for explaining how true knowledge is attained.",
        correctedSentence: "Plato uses the allegory to explain how true knowledge is attained.",
        errorToken: "for explaining",
        explanation: "The infinitive of purpose ('to explain') should be used here instead of 'for + gerund'."
      },
      {
        id: "ac-q6",
        type: "FILL_IN_BLANK",
        prompt: "Complete the sentence using the correct zero conditional verb form.",
        sentence: "If a prisoner ____ released into bright sunlight, the sudden light wounds his eyes.",
        acceptedAnswers: ["is"],
        caseSensitive: false
      }
    ]
  },
  {
    id: "golden-mean",
    levelId: "ancient-greece",
    order: 3,
    title: "The Golden Mean",
    philosopher: "Aristotle",
    era: "c. 340 BCE",
    cefrLevel: "B2",
    text: "Virtue, said Aristotle, lies between two vices: one of excess and one of deficiency. Courage, for instance, sits between cowardice and rashness; generosity between stinginess and extravagance. The mean is not arithmetic: it is what the practical wisdom of a virtuous person would choose, and it varies with each situation. Aristotle insists that we become virtuous by practising virtuous acts, just as we become builders by building. Nature gives us the capacity; habit gives us the actual virtue. This is why he warns that a single act does not make a person just, any more than one meal makes them healthy. Character, like a sculpture, is carved by repetition.",
    questions: [
      {
        id: "gm-q1",
        type: "TRUE_FALSE_NOT_GIVEN",
        prompt: "Does the following statement agree with the text?",
        statement: "Aristotle taught that the golden mean can be calculated using a fixed mathematical formula applicable to all people.",
        correctAnswer: "FALSE",
        explanation: "The text clearly states: 'The mean is not arithmetic... and it varies with each situation.'"
      },
      {
        id: "gm-q2",
        type: "TRUE_FALSE_NOT_GIVEN",
        prompt: "Does the following statement agree with the text?",
        statement: "Aristotle studied biology in Lyceum before developing his ethical framework on habituation.",
        correctAnswer: "NOT_GIVEN",
        explanation: "The text discusses habit and character formation, but makes no reference to his biological studies or the Lyceum."
      },
      {
        id: "gm-q3",
        type: "WORD_EXTRACTION",
        prompt: "Complete the statement below. Write ONE WORD ONLY from the text for your answer.",
        sentenceWithBlank: "According to Aristotle, moral character resembles a sculpture because it is carved through ____.",
        acceptedWords: ["repetition"],
        maxWordsAllowed: 1,
        caseSensitive: false,
        explanation: "The text concludes: 'Character, like a sculpture, is carved by repetition.'"
      },
      {
        id: "gm-q4",
        type: "GRAMMAR_ANALYSIS",
        prompt: 'Identify the passive voice structure in: "Character, like a sculpture, is carved by repetition."',
        sentence: "Character, like a sculpture, is carved by repetition.",
        options: [
          "Present simple passive ('is carved') showing an enduring truth or rule",
          "Past simple passive indicating a completed historic event",
          "Present continuous passive describing an action happening right now",
          "Subjunctive passive used in formal philosophical hypotheses"
        ],
        correctOptionIndex: 0,
        targetRule: "PASSIVE_VOICE",
        explanation: "'is carved' is a present simple passive verb phrase indicating a timeless principle."
      },
      {
        id: "gm-q5",
        type: "ERROR_CORRECTION",
        prompt: "Rewrite the sentence to fix subject-verb agreement.",
        sentence: "A single virtuous act do not make a person morally upright.",
        correctedSentence: "A single virtuous act does not make a person morally upright.",
        errorToken: "do not",
        explanation: "The singular subject 'A single virtuous act' requires the third-person singular auxiliary verb 'does not'."
      },
      {
        id: "gm-q6",
        type: "FILL_IN_BLANK",
        prompt: "Complete the sentence with the appropriate prenominal conjunction.",
        sentence: "Courage sits ____ cowardice and rashness.",
        acceptedAnswers: ["between"],
        caseSensitive: false
      }
    ]
  },
  {
    id: "pleasure-and-death",
    levelId: "ancient-greece",
    order: 4,
    title: "Pleasure and Death",
    philosopher: "Epicurus",
    era: "c. 300 BCE",
    cefrLevel: "B2",
    text: "Epicurus taught that death is nothing to us, because while we exist, death is not here, and when death is here, we no longer exist. Fear of the gods, he argued, must likewise be set aside, since the blessed cannot suffer anger. The wise person therefore concentrates on the present, seeking not intense pleasures but the absence of pain and disturbance — a state he called ataraxia. On this view, a bowl of water and a piece of bread can rival the feasts of kings. Epicurus did not despise friendship or gratitude: he held that no wise person could live pleasantly without them. The garden where he taught was open to slaves and women, an extraordinary welcome in the ancient world.",
    questions: [
      {
        id: "pd-q1",
        type: "TRUE_FALSE_NOT_GIVEN",
        prompt: "Does the following statement agree with the text?",
        statement: "Epicurus advocated for endless sensory indulgence and opulent banquets.",
        correctAnswer: "FALSE",
        explanation: "The text explains that Epicurus sought 'not intense pleasures but the absence of pain and disturbance', noting that plain bread and water could rival luxury feasts."
      },
      {
        id: "pd-q2",
        type: "TRUE_FALSE_NOT_GIVEN",
        prompt: "Does the following statement agree with the text?",
        statement: "Epicurean garden communities were socially inclusive compared to conventional ancient Greek standards.",
        correctAnswer: "TRUE",
        explanation: "The text explicitly states: 'The garden where he taught was open to slaves and women, an extraordinary welcome in the ancient world.'"
      },
      {
        id: "pd-q3",
        type: "WORD_EXTRACTION",
        prompt: "Complete the statement below. Write ONE WORD ONLY from the text for your answer.",
        sentenceWithBlank: "Epicurus termed the tranquility achieved through freedom from mental disturbance and pain as ____.",
        acceptedWords: ["ataraxia"],
        maxWordsAllowed: 1,
        caseSensitive: false,
        explanation: "The text defines ataraxia as 'the absence of pain and disturbance'."
      },
      {
        id: "pd-q4",
        type: "GRAMMAR_ANALYSIS",
        prompt: 'Analyze the function of "while" in the clause: "while we exist, death is not here".',
        sentence: "While we exist, death is not here...",
        options: [
          "It introduces a subordinate adverbial clause of time/duration",
          "It acts as a concessive linking word meaning 'although'",
          "It functions as a relative pronoun referring to 'death'",
          "It introduces a conditional hypothesis"
        ],
        correctOptionIndex: 0,
        targetRule: "LINKING_WORDS",
        explanation: "'While' is used here as a temporal conjunction establishing simultaneous duration ('during the time that we exist')."
      },
      {
        id: "pd-q5",
        type: "ERROR_CORRECTION",
        prompt: "Rewrite the sentence to correct the preposition following 'open'.",
        sentence: "His garden was open for slaves and women alike.",
        correctedSentence: "His garden was open to slaves and women alike.",
        errorToken: "for",
        explanation: "The adjective 'open' takes the preposition 'to' when indicating accessibility to a group ('open to slaves')."
      },
      {
        id: "pd-q6",
        type: "FILL_IN_BLANK",
        prompt: "Complete the modal sentence expressing past reported belief.",
        sentence: "Epicurus maintained that no wise individual ____ live pleasantly without genuine friendship.",
        acceptedAnswers: ["could"],
        caseSensitive: false
      }
    ]
  }
];

/**
 * Single source of truth for level and session content.
 */
export const levels: readonly Level[] = [
  {
    id: "ancient-greece",
    title: "Ancient Greece",
    period: "5th–3rd century BCE",
    description:
      "Socrates, Plato, Aristotle and Epicurus on knowledge, virtue, the golden mean, and human flourishing.",
    sessions: ancientGreeceSessions
  },
  {
    id: "stoicism-rome",
    title: "Stoicism and Rome",
    period: "1st century BCE–2nd century CE",
    description: "Seneca, Epictetus and Marcus Aurelius on duty, emotion and what we cannot control.",
    sessions: []
  },
  {
    id: "medieval-thought",
    title: "Medieval Thought",
    period: "5th–15th century",
    description: "Augustine, Hildegard and Aquinas on faith, reason and the order of the world.",
    sessions: []
  },
  {
    id: "renaissance-humanism",
    title: "Renaissance Humanism",
    period: "14th–17th century",
    description: "Erasmus, Machiavelli and More on the human capacity to shape society.",
    sessions: []
  }
];

export function getLevel(id: LevelId): Level | undefined {
  return levels.find((level) => level.id === id);
}

export function getSession(levelId: LevelId, sessionId: SessionId): Session | undefined {
  return getLevel(levelId)?.sessions.find((session) => session.id === sessionId);
}
