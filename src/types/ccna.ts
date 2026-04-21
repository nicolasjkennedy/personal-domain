// ─── Core Content Interfaces ──────────────────────────────────────────────────

export interface Domain {
  /** Slug-style unique id, e.g. "net-fundamentals" */
  id: string;
  /** Display name, e.g. "Network Fundamentals" */
  name: string;
  /** Exam weight as a percentage, e.g. 20 */
  examWeight: number;
  /** One-sentence description of the domain */
  description: string;
  /** Ordered list of topic IDs belonging to this domain */
  topicIds: string[];
  /** Source weeks from ccna.ts that this domain covers (for backward compat) */
  sourceWeeks: number[];
}

export interface Topic {
  /** Slug-style unique id, e.g. "osi-model" */
  id: string;
  /** Parent domain id */
  domainId: string;
  /** Display name */
  name: string;
  /** 2–4 sentence summary used on the Study page */
  summary: string;
  /** Which week's lab exercise most directly practices this topic */
  labConnection: string;
  /** Key concepts bullet points (plain text, rendered as list) */
  keyConcepts: string[];
}

export interface Flashcard {
  /** Unique id, e.g. "fc-osi-001" */
  id: string;
  /** Parent domain id */
  domainId: string;
  /** Parent topic id */
  topicId: string;
  /** The term or question shown on the front face */
  term: string;
  /** The definition or answer shown on the back face */
  definition: string;
  /** Optional extra context (mnemonic, real-world use, CLI example) */
  context?: string;
}

export interface Question {
  /** Unique id, e.g. "q-routing-042" */
  id: string;
  /** Parent domain id */
  domainId: string;
  /** Parent topic id */
  topicId: string;
  /** Only multiple-choice is supported in v1 */
  type: "multiple-choice";
  /** The question text (may include backtick-wrapped CLI snippets) */
  question: string;
  /** Exactly 4 answer options */
  options: [string, string, string, string];
  /** Zero-based index of the correct option */
  correct: 0 | 1 | 2 | 3;
  /** Explanation shown after the user answers */
  explanation: string;
}

export interface CLICommand {
  /** Unique id, e.g. "cmd-ospf-001" */
  id: string;
  /** Parent domain id */
  domainId: string;
  /** The base command keyword(s), e.g. "show ip route" */
  command: string;
  /** Full syntax with placeholders, e.g. "show ip route [prefix mask]" */
  syntax: string;
  /** Plain-English description of what the command does */
  description: string;
  /** A realistic usage example with output excerpt where helpful */
  example: string;
  /** IOS mode required */
  mode: "user" | "privileged" | "global-config" | "interface-config";
  /** Free-form tags for filtering */
  tags: string[];
}

// ─── Spaced Repetition (SM-2) ─────────────────────────────────────────────────

export interface CardSchedule {
  /** Inter-repetition interval in days */
  interval: number;
  /** Ease factor — starts at 2.5, floor is 1.3 */
  easeFactor: number;
  /** ISO 8601 date string for when the card is next due */
  dueDate: string;
  /** Number of successful repetitions (resets to 0 on quality < 3) */
  repetitions: number;
}

// ─── Quiz History ─────────────────────────────────────────────────────────────

export interface QuizResult {
  /** UUID v4 generated at session end */
  id: string;
  /** ISO 8601 datetime string */
  date: string;
  /** Domain IDs that were included in this quiz */
  domainIds: string[];
  /** Number of correct answers */
  score: number;
  /** Total questions in session */
  total: number;
  /** Wall-clock seconds for the session (0 if untimed) */
  timeSeconds: number;
  /** Question IDs answered incorrectly */
  wrongIds: string[];
}

// ─── User Progress (root localStorage object) ─────────────────────────────────

export interface UserProgress {
  /** Topic IDs the user has explicitly marked complete */
  completedTopics: string[];
  /** Map from flashcard ID to its current SM-2 schedule */
  flashcardSchedule: Record<string, CardSchedule>;
  /** Full quiz history, newest first */
  quizHistory: QuizResult[];
  /** Current consecutive-day study streak */
  streak: number;
  /** ISO 8601 date string of the most recent study activity */
  lastStudyDate: string;
  /** Target quiz questions answered per week (user-configurable, default 50) */
  weeklyGoal: number;
  /** Cumulative questions answered across all quizzes */
  totalQuestionsAnswered: number;
  /** Cumulative correct answers across all quizzes */
  totalCorrect: number;
}

// ─── Quiz Session (in-memory only, never persisted) ───────────────────────────

export interface QuizSession {
  /** Subset of Question[] selected for this session */
  questions: Question[];
  /** Zero-based index of the currently displayed question */
  currentIndex: number;
  /** Map from question ID to user's chosen option index (null = unanswered) */
  answers: Record<string, number | null>;
  /** Whether the session is still active or has ended */
  status: "active" | "complete";
  /** Unix timestamp (ms) when the session started */
  startedAt: number;
  /** Unix timestamp (ms) when the session ended (0 while active) */
  endedAt: number;
  /** Config used to create this session */
  config: QuizConfig;
}

export interface QuizConfig {
  /** Domain IDs to pull questions from (empty array = all domains) */
  domainIds: string[];
  /** Number of questions to include */
  questionCount: number;
  /** Whether the session uses a countdown timer */
  timed: boolean;
  /** Seconds per question when timed (default 90) */
  secondsPerQuestion: number;
}
