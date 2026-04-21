# CODEBASE AUDIT

_Completed: 2026-04-19 — Step 0 mandatory orientation_

---

## Framework

**Next.js 14** with the **App Router** (not Pages Router). All routes live under `app/`.

## Rendering / Deployment

**Static export** (`output: "export"` in `next.config.mjs`, `trailingSlash: true`). This means:
- **No API routes** (they won't run in a static export)
- **No server-side rendering at request time**
- All state must be localStorage or in-memory client-side
- Image optimization is disabled (`images: { unoptimized: true }`)
- Deployed as flat HTML/JS/CSS files — likely Netlify or Vercel static hosting

## Styling System

- **Tailwind CSS v3** with custom CSS variables
- Two fonts: `Inter` (sans) and `JetBrains Mono` (mono), both loaded via `next/font/google`
- CSS variables defined in `app/globals.css`:
  - `--background` / `--foreground` for theme colors
  - `--bg-rgb` / `--fg-rgb` for alpha-value Tailwind utilities
- **Dark mode**: controlled via `.dark` class on `<html>` (toggled by `ThemeContext`)
- Tailwind tokens: `bg-background`, `text-foreground`, `border-foreground/N` (opacity fractions)
- Design language: **monospace-heavy, minimal, high contrast** — everything is `font-mono`, thin borders, muted opacity
- Animations: `fadeInUp`, `fadeIn`, `slideInRight`, `slideInLeft` with `.stagger-N` delay classes

## Navigation Components

Two nav components exist:

| Component | Used by | Notes |
|-----------|---------|-------|
| `components/Navigation.tsx` | `app/page.tsx` (homepage) | Scroll-based section links + Blog/Lessons page links |
| `components/BlogNavigation.tsx` | All sub-pages (`/blogs/*`, `/lessons/*`) | Full page navigation, `isActive` detects current path |

The `BlogNavigation` nav items include `Lessons → /lessons/` and that tab becomes active for any path starting with `/lessons`.

## Route Structure

```
app/
  page.tsx                    → / (homepage, single-page scroll)
  layout.tsx                  → Root layout (ThemeProvider + DotFieldBackground)
  globals.css
  blogs/
    page.tsx                  → /blogs/
    [slug]/page.tsx           → /blogs/:slug
  lessons/
    page.tsx                  → /lessons/ (course listing — KEEP)
    ccna/
      page.tsx                → /lessons/ccna/ ← REPLACE THIS
```

## Existing CCNA Content Location

- **`src/content/ccna.ts`** — 16 weeks of structured content (TypeScript). Data includes per-week: title, slug, objectives, video resources, key concepts block, lab exercise, practice questions, real-world connection.
- **`app/lessons/ccna/page.tsx`** — Current UI: sidebar with week nav + scroll-tracking + progress via localStorage. Uses `BlogNavigation`. The existing state key is `"ccna-completed-weeks"` in localStorage.

## Layout / Context

- **`contexts/ThemeContext.tsx`** — provides `ThemeProvider`, toggles `.dark` class on `<html>`
- **Root layout** wraps everything in `ThemeProvider` + `DotFieldBackground` (animated canvas)
- Pages in `/lessons/ccna/` must use `BlogNavigation` (not `Navigation`)

## Constraints Summary

1. Static export — no API routes, no server-side logic
2. All persistence via `localStorage`
3. Do NOT touch `app/page.tsx`, `app/blogs/`, or any homepage sections
4. Only modify `/lessons/ccna/` route and sub-routes
5. Match existing design: monospace, thin borders, `foreground/N` opacity, dark-first
6. Use Tailwind only (no new CSS frameworks or libraries)
7. Minimal dependencies — current deps are just React + Next.js + Tailwind

## Key Files Quick Reference

```
app/layout.tsx                  Root layout
app/globals.css                 Global styles + CSS variables
app/lessons/page.tsx            Lessons listing (KEEP — update CCNA card link only if needed)
app/lessons/ccna/page.tsx       ← REPLACE with Dashboard
components/BlogNavigation.tsx   Nav for sub-pages (USE THIS in all new CCNA pages)
src/content/ccna.ts             Existing 16-week content data
tailwind.config.ts              Tailwind config with custom tokens
```
