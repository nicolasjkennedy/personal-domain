# CLAUDE.md — CCNA Study App Build

This file defines the multi-agent development team structure for building the CCNA interactive study app inside nicolaskennedy.com/lessons/ccna.

---

## Project Context

- **Codebase**: Next.js 14 App Router, static export, Tailwind CSS, localStorage state
- **Goal**: Replace `app/lessons/ccna/page.tsx` with a full interactive CCNA 200-301 study app
- **Constraint**: Static site — no API routes, no server DB. All state is localStorage.
- **Design**: Match existing monospace/minimal aesthetic exactly. Use `BlogNavigation` component.
- **Scope**: Only touch `/lessons/ccna/` and sub-routes. Do not modify homepage, blogs, or navigation beyond adding CCNA sub-nav links.

---

## Agent Roles

### 🏗️ Architect Agent
**Responsibility**: Design the complete app structure before any code is written.
**Input**: `docs/CODEBASE_AUDIT.md`, this file
**Output**: `docs/ARCHITECTURE.md`
**Tasks**:
- Define the full route structure under `/lessons/ccna/`
- Design TypeScript interfaces for all data types (Domain, Topic, Flashcard, Question, CLICommand, UserProgress)
- Define the component tree
- Specify localStorage schema and key names
- Map the 6 CCNA exam domains to existing week content
- Document the SM-2 spaced repetition data model
**Rules**: Produce documentation only. No code files.

### 📚 Content Agent
**Responsibility**: Generate all CCNA study content as TypeScript data files.
**Input**: `docs/ARCHITECTURE.md`, `src/content/ccna.ts` (existing weeks for reference)
**Output**: `src/content/ccna-domains.ts`, `src/content/ccna-flashcards.ts`, `src/content/ccna-questions.ts`, `src/content/ccna-commands.ts`, `docs/CONTENT_MAP.md`
**Tasks**:
- Create domain/topic structure for all 6 CCNA exam domains
- Generate 15–20 flashcards per domain (90–120 total)
- Generate 10–15 multiple-choice questions per domain (60–90 total)
- Generate CLI command reference organized by topic
- Include "Lab Connection" notes tying to real Cisco IOS workflows
- Weight content toward IP Connectivity (25%) and Network Fundamentals (20%)
**Rules**: All content must be accurate to CCNA 200-301 v1.1. Reference Nick's real-world work (URI ITS: VLANs, trunks, AP deployment, structured cabling). No code other than TypeScript data exports.

### ⚙️ Backend Agent
**Responsibility**: Implement all client-side logic and state management.
**Input**: `docs/ARCHITECTURE.md`
**Output**: `lib/ccna-progress.ts`, `lib/spaced-repetition.ts`, `lib/quiz-engine.ts`, `docs/BACKEND_GUIDE.md`
**Tasks**:
- localStorage progress manager: read/write/reset UserProgress
- SM-2 spaced repetition algorithm: calculate next review interval
- Quiz engine: randomize questions, score answers, track history
- Streak tracker: daily study streak based on last study date
- Export/import progress as JSON
**Rules**: Pure TypeScript functions. No React. No side effects except localStorage.

### 🎨 Frontend Agent
**Responsibility**: Build all UI components and pages.
**Input**: `docs/ARCHITECTURE.md`, `docs/BACKEND_GUIDE.md`, all content data files
**Output**: All component files, page files, `docs/FRONTEND_GUIDE.md`
**Tasks**:
- Build CCNA layout wrapper with sub-navigation (Dashboard, Study, Flashcards, Quiz, Commands, Progress)
- Build Dashboard page (`app/lessons/ccna/page.tsx`)
- Build Study Mode page (`app/lessons/ccna/study/page.tsx`)
- Build Flashcard Mode page (`app/lessons/ccna/flashcards/page.tsx`)
- Build Quiz Mode page (`app/lessons/ccna/quiz/page.tsx`)
- Build Command Reference page (`app/lessons/ccna/commands/page.tsx`)
- Build Progress page (`app/lessons/ccna/progress/page.tsx`)
- Match existing design: `font-mono`, `border-foreground/N`, `opacity-60` patterns, `BlogNavigation`
**Rules**: Use existing Tailwind tokens only. No new CSS files. Use `BlogNavigation`. All pages must be "use client" or use client components where state is needed.

### 🔍 QA Agent
**Responsibility**: Review all output, find issues, apply fixes.
**Input**: All docs + all code files
**Output**: `docs/QA_REPORT.md`
**Tasks**:
- Verify CCNA content accuracy against exam blueprint
- Check TypeScript types compile correctly
- Verify localStorage keys don't conflict with existing `"ccna-completed-weeks"` key
- Check all routes resolve correctly for static export
- Verify mobile responsiveness (no horizontal overflow, touch-friendly)
- Check ARIA labels and keyboard navigation
- Check dark/light mode compatibility
- Verify no imports break the static build
**Rules**: Fix issues directly in files. Document all findings in QA_REPORT.md.

---

## Orchestration Order

```
1. Architect  →  produces ARCHITECTURE.md
                        ↓
         ┌──────────────┴──────────────┐
2a. Content (parallel)        2b. Backend (parallel)
    → data files                  → lib/ files
         └──────────────┬──────────────┘
                        ↓
3. Frontend  →  all pages + components
                        ↓
4. QA  →  review + fixes
```

---

## Handoff Protocol

- Each agent reads the docs listed under its **Input** before writing any code
- Each agent updates `docs/PROGRESS.md` when it finishes
- Agents do NOT modify files owned by other agents without noting it in PROGRESS.md
- Frontend agent must wait for both Content and Backend agents to complete
- QA agent runs last and may modify any file

---

## File Ownership

| Agent | Owns |
|-------|------|
| Architect | `docs/ARCHITECTURE.md` |
| Content | `src/content/ccna-domains.ts`, `src/content/ccna-flashcards.ts`, `src/content/ccna-questions.ts`, `src/content/ccna-commands.ts`, `docs/CONTENT_MAP.md` |
| Backend | `lib/ccna-progress.ts`, `lib/spaced-repetition.ts`, `lib/quiz-engine.ts`, `docs/BACKEND_GUIDE.md` |
| Frontend | `app/lessons/ccna/**`, `components/ccna/**`, `docs/FRONTEND_GUIDE.md` |
| QA | `docs/QA_REPORT.md`, may patch any file |

---

## Session Continuity

When resuming with "continue CCNA build":
1. Read ALL files in `docs/`
2. Read this CLAUDE.md
3. Check `docs/PROGRESS.md` for "Resume From Here" section
4. Confirm with user before proceeding
