# CCNA Study App — Backend Guide

_Produced: 2026-04-19 — Backend Agent output._

---

## Overview

All "backend" logic for the CCNA study app is client-side only. There is no
server, no API, and no database. State lives entirely in the browser's
`localStorage`. Three library modules make up the backend:

| Module | File | Responsibility |
|--------|------|----------------|
| Types | `src/types/ccna.ts` | Shared TypeScript interfaces |
| Progress | `lib/ccna-progress.ts` | localStorage reads and writes |
| SM-2 | `lib/ccna-sm2.ts` | Spaced-repetition algorithm |
| Quiz engine | `lib/ccna-quiz-engine.ts` | Quiz session logic |

---

## SSR Safety — Why `typeof window` Checks Are Needed

Next.js 14 with `output: "export"` generates static HTML at **build time**
using Node.js. During this build phase, the module-level code of every page and
lib file is executed in Node — where `window`, `localStorage`, and other browser
globals do not exist.

Calling `localStorage.getItem(...)` at build time throws a `ReferenceError`,
which crashes the build.

Every function in `lib/ccna-progress.ts` that touches `localStorage` is guarded:

```typescript
if (typeof window === "undefined") return; // or return defaultValue
```

This guard is a no-op in the browser (window is always defined) but prevents
crashes in the Node build environment. The pattern is idiomatic in Next.js
projects — it appears wherever browser-only APIs are used outside of
`useEffect`.

---

## localStorage Schema

### Keys Used

| Key | Type | Owner |
|-----|------|-------|
| `"ccna-user-progress"` | JSON string of `UserProgress` | `lib/ccna-progress.ts` |
| `"ccna-completed-weeks"` | JSON string of `string[]` | Legacy page — **DO NOT TOUCH** |

### `"ccna-user-progress"` Shape

```json
{
  "completedTopics": ["osi-tcpip-models", "subnetting"],
  "flashcardSchedule": {
    "fc-osi-001": {
      "interval": 4,
      "easeFactor": 2.6,
      "dueDate": "2026-04-23",
      "repetitions": 2
    }
  },
  "quizHistory": [
    {
      "id": "3f2a1b4c-0000-4000-8000-000000000001",
      "date": "2026-04-19T14:32:00.000Z",
      "domainIds": ["network-fundamentals"],
      "score": 8,
      "total": 10,
      "timeSeconds": 312,
      "wrongIds": ["q-routing-042", "q-ospf-017"]
    }
  ],
  "streak": 5,
  "lastStudyDate": "2026-04-19",
  "weeklyGoal": 50,
  "totalQuestionsAnswered": 142,
  "totalCorrect": 119
}
```

All dates are stored as `"YYYY-MM-DD"` strings (local time, not UTC) to avoid
timezone edge cases. The one exception is `QuizResult.date`, which is an ISO
8601 full datetime for display purposes only.

---

## How SM-2 Works

The SuperMemo 2 algorithm schedules each flashcard for review at increasing
intervals based on how well the user recalled it.

### Quality Ratings

| Rating | Label | Meaning |
|--------|-------|---------|
| 0 | Again | Complete blackout |
| 1 | Hard | Incorrect, recognised on seeing answer |
| 2 | Difficult | Incorrect, easy in hindsight |
| 3 | Good | Correct with significant difficulty |
| 4 | Easy | Correct after brief hesitation |
| 5 | Perfect | Immediate, effortless recall |

### Algorithm (from `lib/ccna-sm2.ts`)

```
If quality < 3 (failed recall):
    repetitions = 0
    interval    = 1

If quality >= 3 (successful recall):
    repetitions = old_repetitions + 1
    interval:
        repetitions was 0 → interval = 1
        repetitions was 1 → interval = 6
        repetitions >= 2  → interval = round(old_interval × new_EF)

New ease factor:
    EF' = EF + (0.1 - (5 - quality) × (0.08 + (5 - quality) × 0.02))
    EF' = max(1.3, EF')    ← floor enforced

Due date = today + interval days (YYYY-MM-DD)
```

A card rated "3 – Good" repeatedly will stabilise at roughly a 2.5× multiplier
per cycle (4 → 10 → 25 → 62 days…). A card rated "5 – Perfect" will have an
ever-growing ease factor and intervals measured in months within a dozen
reviews.

### Initial State for New Cards

```typescript
{
  interval: 0,
  easeFactor: 2.5,
  dueDate: todayDateString(), // due immediately
  repetitions: 0
}
```

Cards without a schedule entry are treated as new cards and always appear in
the flashcard session.

### Due Card Detection

```typescript
isDue(schedule) → schedule.dueDate <= todayDateString()
```

Because both sides are `"YYYY-MM-DD"` strings, lexicographic comparison is
identical to chronological comparison.

---

## How Quiz Sessions Work

### Session Lifecycle

```
createQuizSession(allQuestions, config)
    → filter by domainIds (empty = all)
    → Fisher-Yates shuffle
    → slice to config.questionCount
    → return QuizSession { status: "active", answers: {all null}, ... }

For each question:
    submitAnswer(session, questionId, optionIndex)  → updated session
    [UI shows feedback]
    advanceQuestion(session)                        → increments currentIndex

After the last question:
    endSession(session) → { session (status: complete), result: QuizResult }
    addQuizResult(result)                           → persists to localStorage
```

### Timeout Handling

When a timed quiz times out on a question, the page calls:

```typescript
submitAnswer(session, questionId, -1)
```

`-1` is stored as the answer. During scoring in `endSession`, `-1 !== question.correct`
for any valid option (0–3), so it is counted as incorrect and added to `wrongIds`.

### Session Object (in-memory only, never persisted)

```typescript
interface QuizSession {
  questions: Question[];       // selected subset
  currentIndex: number;        // 0-based
  answers: Record<string, number | null>; // null = unanswered
  status: "active" | "complete";
  startedAt: number;           // Date.now() ms
  endedAt: number;             // 0 while active
  config: QuizConfig;
}
```

---

## How Streak Tracking Works

The streak counts consecutive calendar days on which at least one study activity
occurred (topic marked complete, flashcard rated, or quiz completed).

### Rules

```
today = YYYY-MM-DD (local time)

if lastStudyDate === today:
    no change (already counted today)

if lastStudyDate === yesterday:
    streak += 1
    lastStudyDate = today

if lastStudyDate is older than yesterday, or is empty:
    streak = 1       ← restart from 1 (not 0 — today counts)
    lastStudyDate = today
```

`updateStreak()` is called internally by `markTopicComplete`, `updateCardSchedule`,
and `addQuizResult`. Components do not call it directly.

---

## Function Reference

### `lib/ccna-progress.ts`

```typescript
getDefaultProgress(): UserProgress
// Returns a fresh empty UserProgress. Pure function, no side-effects.

getProgress(): UserProgress
// Reads from localStorage. Returns default if absent or malformed. Never throws.

saveProgress(p: UserProgress): void
// Writes full UserProgress to localStorage. SSR-safe.

markTopicComplete(topicId: string): void
// Adds topicId to completedTopics (idempotent). Calls updateStreak().

markTopicIncomplete(topicId: string): void
// Removes topicId from completedTopics.

updateCardSchedule(cardId: string, schedule: CardSchedule): void
// Upserts a CardSchedule entry. Calls updateStreak().

addQuizResult(result: QuizResult): void
// Prepends result to quizHistory (max 50). Updates totals. Calls updateStreak().

updateStreak(): void
// Recomputes and persists streak + lastStudyDate based on today's date.

exportProgress(): string
// Returns JSON.stringify(currentProgress, null, 2). SSR-safe fallback to default.

importProgress(json: string): boolean
// Parses and validates json, writes to localStorage. Returns true on success.

resetProgress(): void
// Overwrites localStorage with getDefaultProgress(). Does not touch "ccna-completed-weeks".
```

### `lib/ccna-sm2.ts`

```typescript
createInitialSchedule(): CardSchedule
// Returns { interval: 0, easeFactor: 2.5, dueDate: today, repetitions: 0 }

reviewCard(schedule: CardSchedule, quality: number): CardSchedule
// Applies SM-2 and returns the new schedule. Quality is clamped to 0–5.

isDue(schedule: CardSchedule): boolean
// Returns true if dueDate <= today.

getDueCount(schedules: Record<string, CardSchedule>): number
// Count of due cards in the schedule map.

getCardsDueToday(schedules: Record<string, CardSchedule>): string[]
// Array of cardIds that are due or overdue.
```

### `lib/ccna-quiz-engine.ts`

```typescript
shuffleArray<T>(arr: T[]): T[]
// Fisher-Yates shuffle. Returns new array, does not mutate input.

createQuizSession(questions: Question[], config: QuizConfig): QuizSession
// Filters, shuffles, slices, initialises answers map.

submitAnswer(session: QuizSession, questionId: string, optionIndex: number): QuizSession
// Records answer for questionId. -1 = timeout. Returns updated session.

submitCurrentAnswer(session: QuizSession, optionIndex: number): QuizSession
// Convenience: submits for session.questions[session.currentIndex].

advanceQuestion(session: QuizSession): QuizSession
// Increments currentIndex. Caller is responsible for calling endSession after the last question.

endSession(session: QuizSession): { session: QuizSession; result: QuizResult }
// Sets status: "complete", computes score/wrongIds, returns both updated session and result.
```

---

## Usage Examples

### Typical page component pattern

```typescript
"use client";

import { useEffect, useState } from "react";
import { getProgress, markTopicComplete } from "@/lib/ccna-progress";
import type { UserProgress } from "@/src/types/ccna";

export default function StudyPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  // Read on mount (client-side only)
  useEffect(() => {
    setProgress(getProgress());
  }, []);

  function handleComplete(topicId: string) {
    markTopicComplete(topicId);
    setProgress(getProgress()); // re-read to trigger re-render
  }

  if (!progress) return <div>Loading...</div>;
  // ...render
}
```

### Flashcard rating flow

```typescript
import { createInitialSchedule, reviewCard } from "@/lib/ccna-sm2";
import { updateCardSchedule, getProgress } from "@/lib/ccna-progress";

// Get current schedule or initialise for new card
const progress = getProgress();
const currentSchedule =
  progress.flashcardSchedule["fc-osi-001"] ?? createInitialSchedule();

// User rates the card 4 (Easy)
const newSchedule = reviewCard(currentSchedule, 4);

// Persist
updateCardSchedule("fc-osi-001", newSchedule);
```

### Quiz session flow

```typescript
import { createQuizSession, submitAnswer, advanceQuestion, endSession } from "@/lib/ccna-quiz-engine";
import { addQuizResult } from "@/lib/ccna-progress";
import { CCNA_QUESTIONS } from "@/src/content/ccna-questions";

// Create session
let session = createQuizSession(CCNA_QUESTIONS, {
  domainIds: ["network-fundamentals"],
  questionCount: 10,
  timed: false,
  secondsPerQuestion: 90,
});

// User answers question 0 with option index 2
const questionId = session.questions[0].id;
session = submitAnswer(session, questionId, 2);

// After showing feedback, advance
session = advanceQuestion(session);

// ... repeat for remaining questions ...

// End session and persist result
const { result } = endSession(session);
addQuizResult(result);

console.log(`Score: ${result.score} / ${result.total}`);
```

### Export and import

```typescript
import { exportProgress, importProgress, resetProgress } from "@/lib/ccna-progress";

// Export to string (user can copy or download)
const backup = exportProgress();

// Import from string (e.g. from file upload)
const ok = importProgress(backup);
if (!ok) alert("Invalid backup file.");

// Reset all progress
resetProgress();
```
