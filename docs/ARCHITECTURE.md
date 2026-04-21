# CCNA Interactive Study App — Architecture

_Produced: 2026-04-19 — Architect Agent output. Drives all subsequent build agents._

---

## Overview

This document specifies the complete technical design for a CCNA interactive study application built inside the existing Next.js 14 personal website. The app is a static export (no server-side code, no API routes), persists all state in localStorage, and extends the existing `/lessons/ccna/` route with five sub-routes.

---

## 1. Route Map

Every new file to create, with its corresponding URL and purpose.

### Pages

| File Path | URL | Purpose |
|-----------|-----|---------|
| `app/lessons/ccna/page.tsx` | `/lessons/ccna/` | **Dashboard** — replaces the existing weekly-view page. Shows domain cards with progress rings, streak, quiz accuracy stats, and entry points to all sub-sections. |
| `app/lessons/ccna/study/page.tsx` | `/lessons/ccna/study/` | **Study** — domain/topic browser with expandable topic detail, key concepts, lab connection, and mark-complete action. |
| `app/lessons/ccna/flashcards/page.tsx` | `/lessons/ccna/flashcards/` | **Flashcards** — SM-2 spaced-repetition deck. Shows due cards first, flip animation, quality rating buttons (0–5). |
| `app/lessons/ccna/quiz/page.tsx` | `/lessons/ccna/quiz/` | **Quiz** — configurable quiz session: domain filter, question count, optional timer. Per-question feedback, final summary with score and wrong-answer review. |
| `app/lessons/ccna/commands/page.tsx` | `/lessons/ccna/commands/` | **Commands** — searchable CLI command reference. Filter by domain, IOS mode, and tag. Copy-to-clipboard on each command block. |
| `app/lessons/ccna/progress/page.tsx` | `/lessons/ccna/progress/` | **Progress** — full progress dashboard: domain completion bars, quiz history timeline, streak calendar, export/import/reset controls. |

### Library & Data Files

| File Path | Purpose |
|-----------|---------|
| `src/content/ccna-domains.ts` | Canonical data: `Domain[]`, `Topic[]` |
| `src/content/ccna-flashcards.ts` | `Flashcard[]` — one file per domain group is acceptable but a single export is preferred |
| `src/content/ccna-questions.ts` | `Question[]` — all quiz questions |
| `src/content/ccna-commands.ts` | `CLICommand[]` — full command reference |
| `lib/ccna-progress.ts` | All localStorage read/write functions (see Section 6) |
| `lib/ccna-sm2.ts` | Pure SM-2 algorithm implementation (see Section 7) |
| `lib/ccna-quiz-engine.ts` | Quiz session factory and scoring logic (see Section 8) |

### Component Files

| File Path | Purpose |
|-----------|---------|
| `components/ccna/CCNALayout.tsx` | Sub-nav wrapper used by every CCNA page |
| `components/ccna/ProgressRing.tsx` | SVG circular progress indicator |
| `components/ccna/DomainCard.tsx` | Domain summary card with ring and stats |
| `components/ccna/FlashCard.tsx` | Flippable card with CSS 3D transform |
| `components/ccna/QuizQuestion.tsx` | Single-question renderer with answer feedback |
| `components/ccna/CommandSearch.tsx` | Searchable + filterable command reference |
| `components/ccna/StatBar.tsx` | Horizontal accuracy bar |
| `components/ccna/StreakBadge.tsx` | Current study streak display |

---

## 2. TypeScript Data Interfaces

All interfaces live in `src/types/ccna.ts` and are imported by content files, lib files, and components.

```typescript
// ─── Core Content Interfaces ──────────────────────────────────────────────────

export interface Domain {
  /** Slug-style unique id, e.g. "network-fundamentals" */
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
  /** Key concepts bullet points (plain text, rendered as <pre> or list) */
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
  /** IOS mode required: "user", "privileged", "global-config", "interface-config" */
  mode: "user" | "privileged" | "global-config" | "interface-config";
  /** Free-form tags for filtering, e.g. ["ospf", "verification", "troubleshooting"] */
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
```

---

## 3. Domain to Week Mapping

The CCNA 200-301 exam has six weighted domains. Below is the canonical mapping from exam domains to the existing 16-week content, together with the recommended topic IDs to create (5 per domain).

### Domain 1 — Network Fundamentals (20%)

**Source weeks**: 1, 2
**Description**: OSI/TCP-IP models, IPv4 addressing and subnetting, binary conversion, network device roles, Ethernet and cabling.

| Topic ID | Topic Name |
|----------|------------|
| `osi-tcpip-models` | OSI & TCP/IP Models |
| `ipv4-addressing` | IPv4 Addressing Structure |
| `subnetting` | Subnetting & CIDR |
| `network-devices` | Network Device Roles (Router, Switch, Hub) |
| `ethernet-cabling` | Ethernet Cabling Standards |

---

### Domain 2 — Network Access (20%)

**Source weeks**: 3, 4
**Description**: VLANs, trunk ports, Spanning Tree Protocol, wireless standards, PoE.

| Topic ID | Topic Name |
|----------|------------|
| `vlans` | VLAN Concepts & Configuration |
| `trunk-ports` | Trunk Ports & 802.1Q Tagging |
| `spanning-tree` | Spanning Tree Protocol (STP/RSTP) |
| `wireless-standards` | Wireless LAN Standards (802.11 a/b/g/n/ac/ax) |
| `wireless-security` | Wireless Security (WEP, WPA, WPA2, WPA3) |

---

### Domain 3 — IP Connectivity (25%)

**Source weeks**: 5, 6, 7
**Description**: Static and dynamic routing, OSPF, EIGRP, BGP basics, administrative distance, route summarization, NAT/PAT.

| Topic ID | Topic Name |
|----------|------------|
| `static-routing` | Static Routes & Default Routes |
| `ospf` | OSPF Concepts & Configuration |
| `eigrp` | EIGRP & Administrative Distance |
| `nat-pat` | NAT & PAT |
| `bgp-summarization` | BGP Basics & Route Summarization |

---

### Domain 4 — IP Services (10%)

**Source weeks**: 8
**Description**: DHCP (DORA process, relay agent), DNS resolution, NTP stratum levels, SNMP versions, Syslog severity levels, IPv6 basics.

| Topic ID | Topic Name |
|----------|------------|
| `dhcp` | DHCP & the DORA Process |
| `dns` | DNS Resolution |
| `ntp-snmp-syslog` | NTP, SNMP & Syslog |
| `ipv6-basics` | IPv6 Addressing |
| `dhcp-relay` | DHCP Relay (ip helper-address) |

---

### Domain 5 — Security Fundamentals (15%)

**Source weeks**: 9, 10
**Description**: ACLs (standard, extended, named), SSH configuration, port security, DHCP snooping, Dynamic ARP Inspection, VTP modes.

| Topic ID | Topic Name |
|----------|------------|
| `acls` | Access Control Lists (Standard & Extended) |
| `ssh-device-security` | SSH & Device Password Security |
| `port-security` | Port Security & Violation Modes |
| `dhcp-snooping-dai` | DHCP Snooping & Dynamic ARP Inspection |
| `vtp` | VTP Modes & Security |

---

### Domain 6 — Automation & Programmability (10%)

**Source weeks**: 11, 12
**Description**: REST APIs, JSON/XML/YAML, Cisco DNA Center, Ansible, Infrastructure as Code, NETCONF/YANG.

| Topic ID | Topic Name |
|----------|------------|
| `rest-apis` | REST APIs & HTTP Verbs |
| `data-formats` | JSON, XML & YAML |
| `cisco-apis` | Cisco APIs (Meraki, DNA Center) |
| `ansible-automation` | Ansible & Configuration Management |
| `sdn` | Software-Defined Networking & IaC |

---

### Review Weeks (13–16)

Weeks 13–16 are review, troubleshooting, and exam prep. They span all six domains. Content from these weeks (show commands, troubleshooting methodology, QoS, exam format) maps to existing topics rather than creating new topic IDs. Flashcards and questions sourced from weeks 13–16 should be tagged with all relevant domain IDs.

---

## 4. Component Tree

All components live under `components/ccna/`. Each is a client component (`"use client"` directive) except where noted.

---

### `CCNALayout.tsx`

Wrapper component used by every CCNA page. Renders `BlogNavigation` at the top, then a horizontal sub-nav bar below it linking to all six CCNA pages. Accepts children as its content area.

```typescript
interface CCNALayoutProps {
  /** The active sub-route for highlighting the correct nav link */
  activePage: "dashboard" | "study" | "flashcards" | "quiz" | "commands" | "progress";
  children: React.ReactNode;
}
```

Implementation notes:
- Sub-nav items: Dashboard (`/lessons/ccna/`), Study (`/lessons/ccna/study/`), Flashcards (`/lessons/ccna/flashcards/`), Quiz (`/lessons/ccna/quiz/`), Commands (`/lessons/ccna/commands/`), Progress (`/lessons/ccna/progress/`)
- Active item: `border-b border-foreground font-mono text-foreground`, inactive: `opacity-60 font-mono`
- Mobile: collapse sub-nav into a `<select>` or drawer toggle below the `BlogNavigation`
- Does NOT replace `BlogNavigation` — renders it above the sub-nav

---

### `ProgressRing.tsx`

Pure SVG circular progress indicator. No external dependencies.

```typescript
interface ProgressRingProps {
  /** Progress value from 0 to 100 */
  percent: number;
  /** Outer diameter in pixels (default: 64) */
  size?: number;
  /** Stroke width in pixels (default: 4) */
  strokeWidth?: number;
  /** Optional label rendered in the center (e.g. "72%") */
  label?: string;
  /** Tailwind color class for the filled arc (default: "stroke-foreground") */
  colorClass?: string;
}
```

Implementation notes:
- Uses SVG `stroke-dasharray` / `stroke-dashoffset` to render arc
- Background ring at `opacity-10`, progress arc at full opacity
- `label` rendered as a `<text>` element centered at `cx cy`
- No animation on mount (static export constraint means no heavy JS)

---

### `DomainCard.tsx`

Card displaying a single CCNA domain with summary stats and a link to the Study page filtered to that domain.

```typescript
interface DomainCardProps {
  domain: Domain;
  /** Number of topics in this domain that are marked complete */
  completedCount: number;
  /** Total topics in this domain */
  totalTopics: number;
  /** Overall quiz accuracy for this domain (0–100), or null if no attempts */
  quizAccuracy: number | null;
}
```

Implementation notes:
- Layout: thin `border border-foreground/20` card, `font-mono` throughout
- Top row: domain name (left), exam weight badge `[20%]` (right)
- Center: `ProgressRing` (topics completed / total) next to a vertical stat list
- Stat list: "N / M topics", accuracy bar (if quizAccuracy is not null)
- Bottom: link "Study this domain →" pointing to `/lessons/ccna/study/?domain=<id>`
- `hover:border-foreground/60 transition-colors`

---

### `FlashCard.tsx`

A single flashcard with a CSS 3D flip animation. Shows term on front, definition + context on back. Does not manage its own queue — the parent page handles which card is shown and SM-2 rating submission.

```typescript
interface FlashCardProps {
  card: Flashcard;
  /** Whether the card is currently showing the back (definition) face */
  isFlipped: boolean;
  /** Called when the user clicks the card to flip it */
  onFlip: () => void;
  /** Called when the user submits a quality rating (0–5) */
  onRate: (quality: 0 | 1 | 2 | 3 | 4 | 5) => void;
  /** Whether rating buttons should be visible (only after flip) */
  showRating: boolean;
}
```

Implementation notes:
- CSS `transform-style: preserve-3d` and `rotateY(180deg)` for flip
- Front face: `term` in `font-mono text-lg`, domain badge at top-right
- Back face: `definition` bold, then `context` at `opacity-60 text-sm`
- Rating row (only when `showRating`): 6 buttons labeled "0 – Again", "1 – Hard", "2 – Difficult", "3 – Good", "4 – Easy", "5 – Perfect"
- Buttons styled with `border border-foreground/30 font-mono text-xs`

---

### `QuizQuestion.tsx`

Renders a single multiple-choice question. Shows answer options as radio-style buttons. After the user selects an answer and submits, reveals correct/incorrect state and the explanation.

```typescript
interface QuizQuestionProps {
  question: Question;
  /** The user's selected option index, or null if unanswered */
  selectedOption: number | null;
  /** Whether the answer has been submitted and feedback should be shown */
  isSubmitted: boolean;
  /** Called when the user selects an option (before submission) */
  onSelect: (optionIndex: number) => void;
  /** Called when the user confirms their selection */
  onSubmit: () => void;
  /** Called when the user proceeds to the next question */
  onNext: () => void;
  /** 1-based question number for display */
  questionNumber: number;
  /** Total questions in session for display */
  totalQuestions: number;
}
```

Implementation notes:
- Question text in `font-mono`
- Options as `<button>` elements, full-width, left-aligned text
- Unselected: `border border-foreground/30 opacity-60`
- Selected (pre-submit): `border border-foreground`
- Correct (post-submit): `border border-foreground bg-foreground/10`
- Incorrect (post-submit): `border border-foreground/30 opacity-40` with a strikethrough indicator
- Explanation block: appears below options after submission, `opacity-80 text-sm font-mono`
- Submit button hidden after submission; Next / Finish button appears instead

---

### `CommandSearch.tsx`

Searchable, filterable command reference. All filtering is client-side.

```typescript
interface CommandSearchProps {
  /** Full command dataset to search and filter */
  commands: CLICommand[];
}
```

Internal state (not in props):
- `query: string` — text search against `command`, `description`, `example`, `tags`
- `modeFilter: string` — IOS mode filter ("" = all)
- `domainFilter: string` — domain id filter ("" = all)
- `tagFilter: string` — single tag filter ("" = all)

Implementation notes:
- Search input: `border border-foreground/30 font-mono bg-background text-foreground`
- Filter row: `<select>` elements for mode and domain, styled to match
- Results: each command rendered as a block with `command` in large mono, `syntax` in `opacity-60`, description, then `example` in a `<pre>` block with copy button
- Copy button: uses `navigator.clipboard.writeText(command.example)`, shows "copied" confirmation for 1.5s
- No results state: "No commands match your search." at `opacity-60`

---

### `StatBar.tsx`

A simple horizontal accuracy bar. Used in `DomainCard` and the Progress page.

```typescript
interface StatBarProps {
  /** Label shown to the left of the bar (e.g. "Accuracy") */
  label: string;
  /** Value from 0 to 100 */
  percent: number;
  /** Whether to show the percentage number to the right of the bar (default true) */
  showPercent?: boolean;
  /** Optional extra context displayed at opacity-60 (e.g. "42 / 50 correct") */
  subLabel?: string;
}
```

Implementation notes:
- Track: `border border-foreground/20 h-1.5 w-full`
- Fill: `bg-foreground h-full` at width `${percent}%`
- Both label and percent rendered in `font-mono text-xs`

---

### `StreakBadge.tsx`

Displays the user's current consecutive-day study streak. Uses no emoji — renders the count and the word "day streak" in styled mono text.

```typescript
interface StreakBadgeProps {
  /** Current streak count in days */
  streak: number;
  /** Whether the user has already studied today (affects color/text) */
  studiedToday: boolean;
}
```

Implementation notes:
- Large mono number (e.g. `text-2xl font-mono`) + small label "day streak"
- `studiedToday` true: full opacity; false: `opacity-60` with "(study today to continue)"
- No icon — the count itself is the visual emphasis
- Renders as an inline block suitable for placement in the Dashboard header area

---

## 5. localStorage Schema

### Existing Key — Do Not Overwrite

```
"ccna-completed-weeks"  →  string[]  (array of week slugs, e.g. ["week-1-network-fundamentals"])
```

This key is written by the existing `app/lessons/ccna/page.tsx` implementation. The new app must not read from or write to this key. Backward compatibility: the old weekly-completion UI may be removed or archived, but the key is preserved in localStorage to avoid data loss if users have existing progress.

### New Keys

```
"ccna-user-progress"  →  JSON string of UserProgress
```

Full schema:

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
      "id": "3f2a1b4c-...",
      "date": "2026-04-19T14:32:00Z",
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

### Key Naming Convention

All new keys are prefixed `"ccna-"`. No other keys are used. If future features require additional persistence (e.g. per-session draft state), new prefixed keys must be documented here.

### Backward Compatibility Note

When `getProgress()` is called and `"ccna-user-progress"` is absent from localStorage, return a `DEFAULT_PROGRESS` object (all arrays empty, streak 0, weeklyGoal 50). Never throw on missing or malformed data — catch JSON parse errors and return the default.

---

## 6. State Management — `lib/ccna-progress.ts`

This module is the single source of truth for all progress reads and writes. All page components call these functions — no component writes directly to localStorage.

```typescript
import type { UserProgress, CardSchedule, QuizResult } from "@/src/types/ccna";

const STORAGE_KEY = "ccna-user-progress";

const DEFAULT_PROGRESS: UserProgress = {
  completedTopics: [],
  flashcardSchedule: {},
  quizHistory: [],
  streak: 0,
  lastStudyDate: "",
  weeklyGoal: 50,
  totalQuestionsAnswered: 0,
  totalCorrect: 0,
};

/**
 * Read UserProgress from localStorage.
 * Returns DEFAULT_PROGRESS if the key is absent or the value is malformed.
 * Never throws.
 */
export function getProgress(): UserProgress

/**
 * Write a UserProgress object to localStorage as JSON.
 * Replaces the entire stored value — callers must read first, mutate, then save.
 */
export function saveProgress(p: UserProgress): void

/**
 * Mark a topic as complete by adding its ID to completedTopics (idempotent).
 * Also calls updateStreak() internally.
 */
export function markTopicComplete(topicId: string): void

/**
 * Update the SM-2 schedule for a single flashcard.
 * Merges into the existing flashcardSchedule record.
 * Also calls updateStreak() internally.
 */
export function updateCardSchedule(cardId: string, schedule: CardSchedule): void

/**
 * Append a completed QuizResult to quizHistory (newest first).
 * Increments totalQuestionsAnswered and totalCorrect.
 * Also calls updateStreak() internally.
 */
export function addQuizResult(result: QuizResult): void

/**
 * Compute and persist the current study streak.
 * Logic:
 *   - Compare today's date (YYYY-MM-DD) to lastStudyDate.
 *   - If lastStudyDate === today: no change (already counted).
 *   - If lastStudyDate === yesterday: streak += 1, lastStudyDate = today.
 *   - If lastStudyDate is older or empty: streak = 1, lastStudyDate = today.
 * Called internally by markTopicComplete, updateCardSchedule, addQuizResult.
 */
export function updateStreak(): void

/**
 * Serialize the current UserProgress to a formatted JSON string.
 * Suitable for writing to a file or copying to clipboard.
 */
export function exportProgress(): string

/**
 * Deserialize a JSON string produced by exportProgress() and write it
 * to localStorage, replacing current progress.
 * Validates that the parsed object has the expected shape; throws on invalid input.
 */
export function importProgress(json: string): void

/**
 * Restore DEFAULT_PROGRESS to localStorage.
 * Does NOT remove "ccna-completed-weeks" (the old weekly key).
 */
export function resetProgress(): void
```

### Usage Pattern in Page Components

```typescript
// Inside a "use client" component, typically in a useEffect or event handler:
import { getProgress, markTopicComplete } from "@/lib/ccna-progress";
import { useState, useEffect } from "react";

const [progress, setProgress] = useState<UserProgress | null>(null);

useEffect(() => {
  setProgress(getProgress());
}, []);

function handleComplete(topicId: string) {
  markTopicComplete(topicId);
  setProgress(getProgress()); // re-read after write to trigger re-render
}
```

No global state store (Redux, Zustand, Context) is needed. The pattern is: read once on mount, write via lib functions, re-read after write to sync local state.

---

## 7. SM-2 Algorithm — `lib/ccna-sm2.ts`

The SuperMemo 2 algorithm computes the next review schedule for a flashcard based on the user's quality rating.

### Inputs

| Parameter | Type | Range | Description |
|-----------|------|-------|-------------|
| `quality` | number | 0 – 5 | User's self-assessed recall quality |
| `schedule` | CardSchedule | — | Current schedule for the card (or initial defaults) |

Quality rating semantics:
- 0 — Complete blackout, no recall
- 1 — Incorrect, but remembered on seeing the answer
- 2 — Incorrect, easy to recall in hindsight
- 3 — Correct with significant difficulty
- 4 — Correct after brief hesitation
- 5 — Perfect, immediate recall

### Outputs

Returns a new `CardSchedule` with updated `interval`, `easeFactor`, `dueDate`, and `repetitions`.

### Algorithm

```typescript
export function computeSchedule(
  quality: 0 | 1 | 2 | 3 | 4 | 5,
  current: CardSchedule
): CardSchedule {
  // If quality < 3: reset repetitions to 0, interval to 1, ease factor unchanged
  // If quality >= 3: apply SM-2 formula
  //
  // New ease factor:
  //   EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  //   Floor: 1.3
  //   Ceiling: none (can grow arbitrarily)
  //
  // New interval:
  //   repetitions == 0: interval = 1
  //   repetitions == 1: interval = 6
  //   repetitions >= 2: interval = round(previous_interval * EF')
  //
  // New repetitions:
  //   quality < 3: 0
  //   quality >= 3: previous_repetitions + 1
  //
  // Due date: today + interval days (ISO 8601 date string)
}
```

### Initial State for New Cards

```typescript
const INITIAL_SCHEDULE: CardSchedule = {
  interval: 1,
  easeFactor: 2.5,
  dueDate: todayISOString(),  // due immediately
  repetitions: 0,
};
```

### Edge Cases

- **Quality 0 or 1**: Card is reset. `interval = 1`, `dueDate = today`. The card will reappear in the same or next session depending on session end logic.
- **Quality 2**: Card is reset. Same behavior as 0–1.
- **Ease factor floor**: Never allow `easeFactor < 1.3`. Cards that are consistently hard will stabilize at ~1.3.
- **Very long intervals**: No ceiling is enforced. Cards reviewed as "5 – Perfect" for many consecutive sessions will eventually have intervals of months — this is correct SM-2 behavior.
- **Cards never reviewed**: If `flashcardSchedule[cardId]` is absent, treat as `INITIAL_SCHEDULE`. This ensures new cards always appear.
- **Due date calculation**: Use date-only strings (`YYYY-MM-DD`), not datetimes, to avoid timezone edge cases. A card is due if `dueDate <= todayDateString()`.

---

## 8. Quiz Engine — `lib/ccna-quiz-engine.ts`

### Session Creation

```typescript
export function createQuizSession(
  allQuestions: Question[],
  config: QuizConfig
): QuizSession
```

1. Filter `allQuestions` by `config.domainIds` (if empty, include all).
2. Shuffle the filtered pool using a Fisher-Yates shuffle.
3. Take the first `config.questionCount` questions (or all if pool is smaller).
4. Return a `QuizSession` with `status: "active"`, empty `answers`, `startedAt: Date.now()`, `endedAt: 0`.

### Answering a Question

```typescript
export function submitAnswer(
  session: QuizSession,
  questionId: string,
  optionIndex: number
): QuizSession
```

Returns an updated `QuizSession` with the answer recorded in `session.answers`. Does not advance `currentIndex` — that is handled by the UI (the user sees feedback before proceeding).

### Advancing

```typescript
export function advanceQuestion(session: QuizSession): QuizSession
```

Increments `currentIndex`. If `currentIndex >= questions.length - 1` after the final question is answered, the caller should call `endSession`.

### Ending the Session

```typescript
export function endSession(session: QuizSession): {
  session: QuizSession;
  result: QuizResult;
}
```

1. Sets `session.status = "complete"` and `session.endedAt = Date.now()`.
2. Computes `score` (count of correct answers), `wrongIds` (question IDs where the user's answer !== correct).
3. Constructs and returns a `QuizResult`.
4. Does NOT persist — the caller passes `result` to `addQuizResult()`.

### Immediate Per-Question Feedback

Feedback is driven by the UI layer (`QuizQuestion.tsx`), not the engine. After `submitAnswer()` is called, the page reads `session.answers[question.id]` and compares to `question.correct` to determine which option to highlight. The engine remains stateless with respect to visual state.

### Final Summary

The Quiz page reads the returned `QuizResult` after `endSession()` to render:
- Score: "N / M correct"
- Accuracy: `(score / total * 100).toFixed(0)%`
- Time: formatted duration (e.g. "5m 12s")
- Wrong answers: list of questions with the correct answer highlighted
- Domain breakdown: if multiple domains were included, accuracy per domain
- CTA buttons: "Try again" (re-creates session with same config), "Review wrong answers" (creates session using only `wrongIds`), "Return to Dashboard"

### Timer Behavior

When `config.timed === true`:
- The Quiz page displays a countdown per question: `config.secondsPerQuestion` seconds.
- When the countdown reaches 0, the question is auto-submitted with no selection (treated as incorrect, quality 0 for any SM-2 update).
- The engine itself does not manage time — timing is handled in the page component with `setInterval`, and auto-submission calls `submitAnswer` with a sentinel value of `-1` to indicate timeout.
- `timeSeconds` in `QuizResult` is `Math.round((endedAt - startedAt) / 1000)`.

---

## Design Tokens Reference

All components must use only these Tailwind tokens (no arbitrary values except where unavoidable):

| Purpose | Token |
|---------|-------|
| Background | `bg-background` |
| Text | `text-foreground` |
| Border subtle | `border-foreground/20` |
| Border normal | `border-foreground/40` |
| Border active | `border-foreground` |
| Muted text | `opacity-60` |
| Very muted | `opacity-40` |
| Monospace | `font-mono` |
| Transition | `transition-colors duration-200` |
| Card padding | `p-4` or `p-6` |
| Gap | `gap-4` or `gap-6` |

No additional CSS files should be created. All styling is done with Tailwind utility classes in JSX.

---

## Static Export Constraints Checklist

Every new file must pass this checklist before it can be considered complete:

- [ ] No `fetch()` calls to internal API routes
- [ ] No `getServerSideProps`, `getStaticProps`, or server actions
- [ ] All `useEffect`, `useState`, and localStorage calls are inside `"use client"` components
- [ ] No `next/headers`, `next/cookies`, or any server-only Next.js APIs
- [ ] All dynamic data is either imported from `src/content/` files or read from localStorage
- [ ] Images use `<img>` or `next/image` with `unoptimized` prop (the config already sets this globally)
- [ ] No `useSearchParams()` without wrapping in `<Suspense>` (required in Next.js 14 static export)

---

## File Creation Order for Build Agents

Agents should create files in this order to avoid import errors:

1. `src/types/ccna.ts` — all interfaces
2. `src/content/ccna-domains.ts` — Domain[] and Topic[] data
3. `src/content/ccna-flashcards.ts` — Flashcard[] data
4. `src/content/ccna-questions.ts` — Question[] data
5. `src/content/ccna-commands.ts` — CLICommand[] data
6. `lib/ccna-sm2.ts` — pure algorithm, no imports from app
7. `lib/ccna-progress.ts` — localStorage functions, imports from types
8. `lib/ccna-quiz-engine.ts` — session logic, imports from types
9. `components/ccna/ProgressRing.tsx`
10. `components/ccna/StatBar.tsx`
11. `components/ccna/StreakBadge.tsx`
12. `components/ccna/DomainCard.tsx` (depends on ProgressRing, StatBar)
13. `components/ccna/FlashCard.tsx`
14. `components/ccna/QuizQuestion.tsx`
15. `components/ccna/CommandSearch.tsx`
16. `components/ccna/CCNALayout.tsx`
17. `app/lessons/ccna/page.tsx` — Dashboard (depends on all above)
18. `app/lessons/ccna/study/page.tsx`
19. `app/lessons/ccna/flashcards/page.tsx`
20. `app/lessons/ccna/quiz/page.tsx`
21. `app/lessons/ccna/commands/page.tsx`
22. `app/lessons/ccna/progress/page.tsx`
