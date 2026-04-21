/**
 * ccna-progress.ts
 *
 * All localStorage read/write functions for the CCNA study app.
 * This module is the single source of truth for progress persistence —
 * no page component or other module writes directly to localStorage.
 *
 * SSR Safety: Every localStorage access is guarded with a
 * `typeof window === "undefined"` check. Next.js static export runs
 * module-level code during the build (in Node.js, where window does not
 * exist), so all browser-only calls must be inside these guards.
 *
 * Key used: "ccna-user-progress"
 * Key NOT touched: "ccna-completed-weeks" (owned by legacy weekly-view page)
 */

import type { UserProgress, CardSchedule, QuizResult } from "@/src/types/ccna";

// ─── Constants ────────────────────────────────────────────────────────────────

const PROGRESS_KEY = "ccna-user-progress";
// NOTE: "ccna-completed-weeks" is intentionally not defined or used here.

// ─── Default / Initial State ──────────────────────────────────────────────────

/**
 * Returns a fresh UserProgress with all collections empty and counters at zero.
 * Used as the fallback when no saved progress exists or parsing fails.
 */
export function getDefaultProgress(): UserProgress {
  return {
    completedTopics: [],
    flashcardSchedule: {},
    quizHistory: [],
    streak: 0,
    lastStudyDate: "",
    weeklyGoal: 50,
    totalQuestionsAnswered: 0,
    totalCorrect: 0,
  };
}

// ─── Date Helpers ─────────────────────────────────────────────────────────────

/**
 * Returns today's date as "YYYY-MM-DD" using local time.
 * Avoids the UTC offset issue that arises from toISOString().
 */
function todayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Returns yesterday's date as "YYYY-MM-DD" using local time.
 */
function yesterdayDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// ─── Shape Validation ─────────────────────────────────────────────────────────

/**
 * Lightweight structural check: verifies the parsed object has the expected
 * top-level shape so we don't silently accept garbage data.
 * Returns true only when all required fields are present with the right types.
 */
function isValidProgress(obj: unknown): obj is UserProgress {
  if (!obj || typeof obj !== "object") return false;

  const p = obj as Record<string, unknown>;

  return (
    Array.isArray(p.completedTopics) &&
    typeof p.flashcardSchedule === "object" &&
    p.flashcardSchedule !== null &&
    Array.isArray(p.quizHistory) &&
    typeof p.streak === "number" &&
    typeof p.lastStudyDate === "string" &&
    typeof p.weeklyGoal === "number" &&
    typeof p.totalQuestionsAnswered === "number" &&
    typeof p.totalCorrect === "number"
  );
}

// ─── Core Read / Write ────────────────────────────────────────────────────────

/**
 * Reads UserProgress from localStorage.
 * Returns getDefaultProgress() if:
 *  - Running in SSR / build context (window is undefined)
 *  - The key is absent
 *  - The stored value cannot be parsed as JSON
 *  - The parsed value does not match the expected shape
 *
 * Never throws.
 */
export function getProgress(): UserProgress {
  if (typeof window === "undefined") return getDefaultProgress();

  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (raw === null) return getDefaultProgress();

    const parsed: unknown = JSON.parse(raw);

    if (!isValidProgress(parsed)) return getDefaultProgress();

    // Merge with defaults so new fields added in future versions
    // appear with sensible values on existing saved data.
    return {
      ...getDefaultProgress(),
      ...parsed,
    };
  } catch {
    return getDefaultProgress();
  }
}

/**
 * Serializes a UserProgress object and writes it to localStorage.
 * SSR-safe: does nothing when window is undefined.
 * Wraps the write in try/catch to handle storage quota errors silently.
 */
export function saveProgress(p: UserProgress): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
  } catch {
    // Storage quota exceeded or private browsing restriction — fail silently.
  }
}

// ─── Topic Progress ───────────────────────────────────────────────────────────

/**
 * Adds topicId to completedTopics if not already present (idempotent).
 * Internally calls updateStreak().
 */
export function markTopicComplete(topicId: string): void {
  if (typeof window === "undefined") return;

  const progress = getProgress();

  if (!progress.completedTopics.includes(topicId)) {
    progress.completedTopics = [...progress.completedTopics, topicId];
  }

  saveProgress(progress);
  updateStreak();
}

/**
 * Removes topicId from completedTopics.
 * Does nothing if the topic was not marked complete.
 */
export function markTopicIncomplete(topicId: string): void {
  if (typeof window === "undefined") return;

  const progress = getProgress();
  progress.completedTopics = progress.completedTopics.filter(
    (id) => id !== topicId
  );
  saveProgress(progress);
}

// ─── Flashcard Schedule ───────────────────────────────────────────────────────

/**
 * Updates (or creates) the SM-2 schedule entry for a single flashcard.
 * Internally calls updateStreak().
 */
export function updateCardSchedule(
  cardId: string,
  schedule: CardSchedule
): void {
  if (typeof window === "undefined") return;

  const progress = getProgress();
  progress.flashcardSchedule = {
    ...progress.flashcardSchedule,
    [cardId]: schedule,
  };
  saveProgress(progress);
  updateStreak();
}

// ─── Quiz History ─────────────────────────────────────────────────────────────

/**
 * Appends a completed QuizResult to quizHistory (newest first).
 * Trims the history to the 50 most recent results to bound storage size.
 * Increments totalQuestionsAnswered and totalCorrect.
 * Internally calls updateStreak().
 */
export function addQuizResult(result: QuizResult): void {
  if (typeof window === "undefined") return;

  const progress = getProgress();

  // Prepend newest result
  progress.quizHistory = [result, ...progress.quizHistory].slice(0, 50);

  // Accumulate global stats
  progress.totalQuestionsAnswered += result.total;
  progress.totalCorrect += result.score;

  saveProgress(progress);
  updateStreak();
}

// ─── Streak Tracking ──────────────────────────────────────────────────────────

/**
 * Updates the consecutive-day study streak and lastStudyDate.
 *
 * Rules (all comparisons on local "YYYY-MM-DD" strings):
 *   - lastStudyDate === today   → no change (already counted for today)
 *   - lastStudyDate === yesterday → streak++, lastStudyDate = today
 *   - lastStudyDate is older or empty → streak = 1, lastStudyDate = today
 *
 * Called internally by markTopicComplete, updateCardSchedule, addQuizResult.
 * May also be called directly if needed.
 */
export function updateStreak(): void {
  if (typeof window === "undefined") return;

  try {
    const progress = getProgress();
    const today = todayDateString();
    const yesterday = yesterdayDateString();

    if (progress.lastStudyDate === today) {
      // Already updated today — nothing to do.
      return;
    }

    if (progress.lastStudyDate === yesterday) {
      // Extending an active streak.
      progress.streak = progress.streak + 1;
    } else {
      // Streak broken or first-ever study — start fresh at 1.
      progress.streak = 1;
    }

    progress.lastStudyDate = today;
    saveProgress(progress);
  } catch {
    // Never let streak logic crash the caller.
  }
}

// ─── Export / Import / Reset ──────────────────────────────────────────────────

/**
 * Serializes the current UserProgress to a formatted JSON string.
 * Suitable for the user to copy to clipboard or download as a backup file.
 *
 * Returns an empty JSON object string if running in SSR context.
 */
export function exportProgress(): string {
  if (typeof window === "undefined") return JSON.stringify(getDefaultProgress(), null, 2);

  try {
    const progress = getProgress();
    return JSON.stringify(progress, null, 2);
  } catch {
    return JSON.stringify(getDefaultProgress(), null, 2);
  }
}

/**
 * Parses a JSON string (produced by exportProgress) and writes it to
 * localStorage, replacing the current progress.
 *
 * Validates that the parsed value has the expected shape before writing.
 * Returns true on success, false if the input is invalid or an error occurs.
 *
 * SSR-safe: returns false immediately if window is undefined.
 */
export function importProgress(json: string): boolean {
  if (typeof window === "undefined") return false;

  try {
    const parsed: unknown = JSON.parse(json);

    if (!isValidProgress(parsed)) return false;

    // Merge with defaults so any missing fields get sensible values.
    const merged: UserProgress = {
      ...getDefaultProgress(),
      ...parsed,
    };

    saveProgress(merged);
    return true;
  } catch {
    return false;
  }
}

/**
 * Resets all CCNA study progress to the default empty state.
 * Does NOT touch "ccna-completed-weeks" (the legacy weekly-view key).
 *
 * SSR-safe: does nothing if window is undefined.
 */
export function resetProgress(): void {
  if (typeof window === "undefined") return;

  try {
    saveProgress(getDefaultProgress());
  } catch {
    // Fail silently.
  }
}
