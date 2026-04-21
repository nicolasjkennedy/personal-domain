"use client";
import { useState, useEffect } from "react";
import CCNALayout from "@/components/ccna/CCNALayout";
import { getProgress, updateCardSchedule } from "@/lib/ccna-progress";
import {
  createInitialSchedule,
  reviewCard,
  getCardsDueToday,
} from "@/lib/ccna-sm2";
import { ccnaFlashcards } from "@/src/content/ccna-flashcards";
import { ccnaDomains } from "@/src/content/ccna-domains";
import type { Flashcard, CardSchedule } from "@/src/types/ccna";

const QUALITY_LABELS: { q: number; label: string; color: string }[] = [
  { q: 1, label: "Again", color: "border-red-500/40 text-red-400/80 hover:bg-red-500/10" },
  { q: 2, label: "Hard", color: "border-orange-500/40 text-orange-400/80 hover:bg-orange-500/10" },
  { q: 3, label: "Good", color: "border-blue-500/40 text-blue-400/80 hover:bg-blue-500/10" },
  { q: 5, label: "Easy", color: "border-green-500/40 text-green-400/80 hover:bg-green-500/10" },
];

export default function FlashcardsPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [schedule, setSchedule] = useState<Record<string, CardSchedule>>({});
  const [deck, setDeck] = useState<Flashcard[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sessionDone, setSessionDone] = useState(false);
  const [reviewed, setReviewed] = useState(0);

  useEffect(() => {
    setMounted(true);
    const p = getProgress();
    setSchedule(p.flashcardSchedule);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    buildDeck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, selectedDomain, schedule]);

  function buildDeck() {
    const pool =
      selectedDomain === "all"
        ? ccnaFlashcards
        : ccnaFlashcards.filter((f) => f.domainId === selectedDomain);

    // Cards due today first, then new cards (no schedule entry)
    const dueIds = new Set(getCardsDueToday(schedule).map((s) => s[0]));
    const due = pool.filter((f) => dueIds.has(f.id));
    const newCards = pool.filter((f) => !schedule[f.id]);

    setDeck([...due, ...newCards]);
    setIndex(0);
    setFlipped(false);
    setSessionDone(false);
    setReviewed(0);
  }

  function rate(quality: number) {
    if (deck.length === 0) return;
    const card = deck[index];
    const existing = schedule[card.id] ?? createInitialSchedule();
    const next = reviewCard(existing, quality);

    const newSchedule = { ...schedule, [card.id]: next };
    setSchedule(newSchedule);
    updateCardSchedule(card.id, next);

    const nextIndex = index + 1;
    setReviewed((r) => r + 1);

    if (nextIndex >= deck.length) {
      setSessionDone(true);
    } else {
      setIndex(nextIndex);
      setFlipped(false);
    }
  }

  if (!mounted) {
    return (
      <CCNALayout>
        <div className="font-mono text-sm opacity-40">Loading…</div>
      </CCNALayout>
    );
  }

  const card = deck[index];

  return (
    <CCNALayout>
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight mb-1">
          Flashcards
        </h1>
        <p className="text-xs font-mono opacity-40">
          SM-2 spaced repetition · due cards shown first
        </p>
      </header>

      {/* Domain filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedDomain("all")}
          className={`text-xs font-mono px-3 py-1.5 border transition-all ${
            selectedDomain === "all"
              ? "border-foreground/50 opacity-100"
              : "border-foreground/15 opacity-40 hover:opacity-70"
          }`}
        >
          All
        </button>
        {ccnaDomains.map((d) => (
          <button
            key={d.id}
            onClick={() => setSelectedDomain(d.id)}
            className={`text-xs font-mono px-3 py-1.5 border transition-all ${
              selectedDomain === d.id
                ? "border-foreground/50 opacity-100"
                : "border-foreground/15 opacity-40 hover:opacity-70"
            }`}
          >
            {d.name}
          </button>
        ))}
      </div>

      {/* Session complete */}
      {sessionDone && (
        <div className="border border-foreground/10 p-8 text-center">
          <div className="text-2xl font-mono font-bold mb-2">
            Session Complete
          </div>
          <p className="text-sm font-mono opacity-50 mb-6">
            You reviewed {reviewed} card{reviewed !== 1 ? "s" : ""}.
          </p>
          <button
            onClick={() => buildDeck()}
            className="text-xs font-mono px-4 py-2 border border-foreground/20 opacity-60 hover:opacity-100 transition-opacity"
          >
            Start New Session
          </button>
        </div>
      )}

      {/* No cards */}
      {!sessionDone && deck.length === 0 && (
        <div className="border border-foreground/10 p-8 text-center">
          <div className="text-sm font-mono opacity-50">
            No cards due for this domain. Well done!
          </div>
        </div>
      )}

      {/* Card */}
      {!sessionDone && card && (
        <>
          {/* Progress */}
          <div className="flex items-center justify-between text-xs font-mono opacity-40 mb-4">
            <span>
              {index + 1} / {deck.length}
            </span>
            <span>{reviewed} reviewed this session</span>
          </div>

          {/* Card face */}
          <div
            className="border border-foreground/15 p-8 min-h-[200px] flex flex-col justify-center cursor-pointer hover:border-foreground/25 transition-colors mb-4 select-none"
            onClick={() => setFlipped(!flipped)}
          >
            {!flipped ? (
              <>
                <div className="text-xs font-mono uppercase tracking-widest opacity-30 mb-4">
                  Term
                </div>
                <div className="text-lg font-mono font-semibold leading-relaxed">
                  {card.term}
                </div>
                <div className="text-xs font-mono opacity-30 mt-6">
                  Click to reveal →
                </div>
              </>
            ) : (
              <>
                <div className="text-xs font-mono uppercase tracking-widest opacity-30 mb-4">
                  Definition
                </div>
                <div className="text-base font-mono opacity-80 leading-relaxed mb-4">
                  {card.definition}
                </div>
                {card.context && (
                  <div className="text-xs font-mono opacity-40 border-t border-foreground/10 pt-4 leading-relaxed">
                    {card.context}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Rating buttons (only after flip) */}
          {flipped && (
            <div className="flex gap-2 flex-wrap">
              {QUALITY_LABELS.map(({ q, label, color }) => (
                <button
                  key={q}
                  onClick={() => rate(q)}
                  className={`flex-1 min-w-[70px] text-xs font-mono px-3 py-2 border transition-all ${color}`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {!flipped && (
            <p className="text-xs font-mono opacity-30 text-center">
              Tap the card to flip it, then rate how well you knew it
            </p>
          )}
        </>
      )}
    </CCNALayout>
  );
}
