/**
 * ccna-types.ts
 *
 * Re-exports all shared CCNA TypeScript interfaces from the canonical
 * source of truth at src/types/ccna.ts.
 *
 * Import from here OR from "@/src/types/ccna" — both resolve identically.
 * This file exists so that content files in src/content/ can use a
 * sibling-relative import path if preferred.
 */

export type {
  Domain,
  Topic,
  Flashcard,
  Question,
  CLICommand,
  CardSchedule,
  QuizResult,
  UserProgress,
  QuizConfig,
  QuizSession,
} from "@/src/types/ccna";
