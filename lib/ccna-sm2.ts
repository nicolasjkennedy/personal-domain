/**
 * ccna-sm2.ts
 *
 * Pure TypeScript implementation of the SuperMemo 2 (SM-2) spaced-repetition
 * algorithm. No React, no Next.js, no side-effects — all functions are
 * deterministic given their inputs.
 *
 * Reference: https://www.supermemo.com/en/archives1990-2015/english/ol/sm2
 */

import type { CardSchedule } from "@/src/types/ccna";

// ─── Constants ────────────────────────────────────────────────────────────────

export const DEFAULT_EASE_FACTOR = 2.5;
export const MIN_EASE_FACTOR = 1.3;

// ─── Date Helpers (date-only, no timezone issues) ─────────────────────────────

/**
 * Returns today's date as a "YYYY-MM-DD" string using local time.
 * Avoids timezone skew that occurs with toISOString() (which is UTC).
 */
function todayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Adds `days` to a "YYYY-MM-DD" base date and returns the resulting
 * "YYYY-MM-DD" string. Uses Date arithmetic to handle month/year rollovers.
 */
function addDays(base: string, days: number): string {
  const d = new Date(`${base}T12:00:00`); // Noon to avoid DST edge cases
  d.setDate(d.getDate() + days);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Returns a fresh CardSchedule for a brand-new card.
 * Due immediately (today), interval 0, repetitions 0, ease factor 2.5.
 */
export function createInitialSchedule(): CardSchedule {
  return {
    interval: 0,
    easeFactor: DEFAULT_EASE_FACTOR,
    dueDate: todayDateString(),
    repetitions: 0,
  };
}

/**
 * Applies the SM-2 algorithm and returns an updated CardSchedule.
 *
 * Quality rating semantics (0–5):
 *   0 — Complete blackout, no recall
 *   1 — Incorrect, but remembered on seeing the answer
 *   2 — Incorrect, easy to recall in hindsight
 *   3 — Correct with significant difficulty
 *   4 — Correct after brief hesitation
 *   5 — Perfect, immediate recall
 *
 * Algorithm:
 *   - quality < 3  → reset: repetitions = 0, interval = 1
 *   - quality >= 3 → advance:
 *       repetitions === 0 → interval = 1
 *       repetitions === 1 → interval = 6
 *       repetitions  >= 2 → interval = round(prev_interval × EF)
 *   - EF' = EF + (0.1 − (5 − q) × (0.08 + (5 − q) × 0.02))
 *   - EF' floor: MIN_EASE_FACTOR (1.3)
 *   - dueDate = today + interval days
 *
 * Input `quality` is typed as `number` so callers don't need a cast, but
 * values outside 0–5 are clamped to the nearest bound.
 */
export function reviewCard(schedule: CardSchedule, quality: number): CardSchedule {
  // Clamp quality to valid range
  const q = Math.min(5, Math.max(0, Math.round(quality)));

  // Compute new ease factor
  const rawEF =
    schedule.easeFactor +
    (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  const newEaseFactor = Math.max(MIN_EASE_FACTOR, rawEF);

  let newRepetitions: number;
  let newInterval: number;

  if (q < 3) {
    // Failed recall — reset to beginning
    newRepetitions = 0;
    newInterval = 1;
  } else {
    // Successful recall — advance according to SM-2 intervals
    newRepetitions = schedule.repetitions + 1;

    if (schedule.repetitions === 0) {
      newInterval = 1;
    } else if (schedule.repetitions === 1) {
      newInterval = 6;
    } else {
      // Use the *previous* interval (before this review) × the *new* EF
      newInterval = Math.round(schedule.interval * newEaseFactor);
    }
  }

  // Ensure interval is at least 1
  newInterval = Math.max(1, newInterval);

  const today = todayDateString();
  const newDueDate = addDays(today, newInterval);

  return {
    interval: newInterval,
    easeFactor: newEaseFactor,
    dueDate: newDueDate,
    repetitions: newRepetitions,
  };
}

/**
 * Returns true if the card is due for review today or is overdue.
 * Comparison is purely lexicographic on "YYYY-MM-DD" strings (correct by construction).
 */
export function isDue(schedule: CardSchedule): boolean {
  return schedule.dueDate <= todayDateString();
}

/**
 * Counts how many cards in a schedule map are currently due.
 */
export function getDueCount(schedules: Record<string, CardSchedule>): number {
  return Object.values(schedules).filter(isDue).length;
}

/**
 * Returns the IDs of all cards that are due today or overdue.
 * Cards with no schedule entry are implicitly due (treat as new cards).
 */
export function getCardsDueToday(
  schedules: Record<string, CardSchedule>
): string[] {
  return Object.entries(schedules)
    .filter(([, schedule]) => isDue(schedule))
    .map(([cardId]) => cardId);
}
