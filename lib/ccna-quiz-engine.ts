/**
 * ccna-quiz-engine.ts
 *
 * Quiz session factory and scoring logic for the CCNA study app.
 * Pure TypeScript — no React, no Next.js, no localStorage access.
 * All functions are stateless transformations of their inputs.
 */

import type {
  Question,
  QuizConfig,
  QuizSession,
  QuizResult,
} from "@/src/types/ccna";

// ─── Utilities ────────────────────────────────────────────────────────────────

/**
 * Fisher-Yates (Knuth) shuffle. Returns a new array; does not mutate input.
 */
export function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap
    const tmp = copy[i];
    copy[i] = copy[j];
    copy[j] = tmp;
  }
  return copy;
}

/**
 * Generates a UUID v4-like string using Math.random().
 * Sufficient for client-side IDs that never need cryptographic uniqueness.
 */
function generateId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Returns the current UTC date-time as an ISO 8601 string.
 */
function nowISO(): string {
  return new Date().toISOString();
}

// ─── Session Creation ─────────────────────────────────────────────────────────

/**
 * Creates a new quiz session from the full question pool and a config.
 *
 * Steps:
 *  1. Filter questions by config.domainIds (empty array = include all domains).
 *  2. Shuffle the filtered pool with Fisher-Yates.
 *  3. Take the first config.questionCount questions (or all if pool is smaller).
 *  4. Initialise answers map with null for every question ID.
 *
 * @param questions — The complete Question[] from ccna-questions.ts
 * @param config    — QuizConfig specifying domain filter, count, and timer settings
 */
export function createQuizSession(
  questions: Question[],
  config: QuizConfig
): QuizSession {
  // 1. Filter by domain
  const filtered =
    config.domainIds.length === 0
      ? questions
      : questions.filter((q) => config.domainIds.includes(q.domainId));

  // 2. Shuffle
  const shuffled = shuffleArray(filtered);

  // 3. Slice to requested count
  const selected = shuffled.slice(
    0,
    Math.min(config.questionCount, shuffled.length)
  );

  // 4. Build initial answers map (all null = unanswered)
  const answers: Record<string, number | null> = {};
  for (const q of selected) {
    answers[q.id] = null;
  }

  return {
    questions: selected,
    currentIndex: 0,
    answers,
    status: "active",
    startedAt: Date.now(),
    endedAt: 0,
    config,
  };
}

// ─── Answering ────────────────────────────────────────────────────────────────

/**
 * Records the user's answer for a specific question by ID.
 * Returns an updated session with the answer stored.
 * Does NOT advance currentIndex — the UI shows feedback before advancing.
 *
 * Passing optionIndex === -1 indicates a timeout (auto-submitted, no selection).
 * The value -1 is stored as-is; scoring treats it as incorrect.
 *
 * @param session     — Current QuizSession
 * @param questionId  — ID of the question being answered
 * @param optionIndex — Zero-based option index selected, or -1 for timeout
 */
export function submitAnswer(
  session: QuizSession,
  questionId: string,
  optionIndex: number
): QuizSession {
  // Ignore submissions for unknown question IDs or completed sessions
  if (session.status === "complete") return session;

  const validQuestion = session.questions.some((q) => q.id === questionId);
  if (!validQuestion) return session;

  return {
    ...session,
    answers: {
      ...session.answers,
      [questionId]: optionIndex,
    },
  };
}

/**
 * Convenience overload used by the UI's per-question flow where only the
 * current question index (not the ID) is known.
 * Delegates to submitAnswer after resolving the ID.
 */
export function submitCurrentAnswer(
  session: QuizSession,
  optionIndex: number
): QuizSession {
  const currentQuestion = session.questions[session.currentIndex];
  if (!currentQuestion) return session;
  return submitAnswer(session, currentQuestion.id, optionIndex);
}

// ─── Advancing ────────────────────────────────────────────────────────────────

/**
 * Increments currentIndex by 1.
 * If the new index equals or exceeds the question count, the session is
 * NOT automatically completed here — callers must call endSession() when
 * appropriate (typically after the last question's feedback is dismissed).
 *
 * @param session — Current QuizSession
 */
export function advanceQuestion(session: QuizSession): QuizSession {
  if (session.status === "complete") return session;

  const nextIndex = session.currentIndex + 1;

  return {
    ...session,
    currentIndex: nextIndex,
  };
}

// ─── Ending ───────────────────────────────────────────────────────────────────

/**
 * Ends the quiz session, computes the result, and returns both.
 *
 * Steps:
 *  1. Stamp endedAt.
 *  2. Mark status as "complete".
 *  3. Count correct answers (answer === question.correct).
 *  4. Collect wrong question IDs (unanswered or wrong — including timeouts).
 *  5. Build QuizResult with a fresh UUID.
 *
 * Does NOT persist — the caller is responsible for passing result to
 * addQuizResult() from ccna-progress.ts.
 *
 * @param session — The active (or partially answered) QuizSession
 */
export function endSession(session: QuizSession): {
  session: QuizSession;
  result: QuizResult;
} {
  const endedAt = Date.now();

  const completedSession: QuizSession = {
    ...session,
    status: "complete",
    endedAt,
  };

  let score = 0;
  const wrongIds: string[] = [];

  for (const question of session.questions) {
    const answer = session.answers[question.id];
    if (answer === question.correct) {
      score++;
    } else {
      wrongIds.push(question.id);
    }
  }

  // Deduplicate domain IDs from the selected questions
  const domainIdSet = new Set<string>();
  for (const q of session.questions) {
    domainIdSet.add(q.domainId);
  }

  const result: QuizResult = {
    id: generateId(),
    date: nowISO(),
    domainIds: Array.from(domainIdSet),
    score,
    total: session.questions.length,
    timeSeconds: Math.round((endedAt - session.startedAt) / 1000),
    wrongIds,
  };

  return { session: completedSession, result };
}
