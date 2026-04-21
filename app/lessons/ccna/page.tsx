"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import CCNALayout from "@/components/ccna/CCNALayout";
import { getProgress } from "@/lib/ccna-progress";
import { ccnaDomains, ccnaTopics } from "@/src/content/ccna-domains";
import { ccnaFlashcards } from "@/src/content/ccna-flashcards";
import { getDueCount } from "@/lib/ccna-sm2";

const SECTION_LINKS = [
  {
    href: "/lessons/ccna/study",
    label: "Study",
    desc: "Domain & topic browser with key concepts",
    icon: "📖",
  },
  {
    href: "/lessons/ccna/flashcards",
    label: "Flashcards",
    desc: "Spaced-repetition review with SM-2",
    icon: "🃏",
  },
  {
    href: "/lessons/ccna/quiz",
    label: "Quiz",
    desc: "Multiple-choice practice questions",
    icon: "✏️",
  },
  {
    href: "/lessons/ccna/commands",
    label: "Commands",
    desc: "Searchable Cisco IOS command reference",
    icon: "⌨️",
  },
  {
    href: "/lessons/ccna/progress",
    label: "Progress",
    desc: "Stats, history, export & reset",
    icon: "📊",
  },
  {
    href: "/lessons/ccna/weekly",
    label: "Weekly Guide",
    desc: "Original 16-week study schedule",
    icon: "📅",
  },
];

function StatBox({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="border border-foreground/10 p-4">
      <div className="text-xs font-mono opacity-40 mb-1 uppercase tracking-widest">
        {label}
      </div>
      <div className="text-2xl font-bold font-mono">{value}</div>
      {sub && <div className="text-xs font-mono opacity-40 mt-0.5">{sub}</div>}
    </div>
  );
}

export default function CCNADashboard() {
  const [mounted, setMounted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [flashcardsDue, setFlashcardsDue] = useState(0);

  useEffect(() => {
    setMounted(true);
    const p = getProgress();
    setStreak(p.streak);
    setTotalAnswered(p.totalQuestionsAnswered);
    setTotalCorrect(p.totalCorrect);
    setCompletedTopics(p.completedTopics);
    setFlashcardsDue(getDueCount(p.flashcardSchedule));
  }, []);

  const accuracy =
    totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const totalTopics = ccnaTopics.length;
  const doneTopics = mounted ? completedTopics.length : 0;

  return (
    <CCNALayout>
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold font-mono tracking-tight mb-2">
          CCNA 200-301
        </h1>
        <p className="text-sm font-mono opacity-50">
          Interactive study app · Exam weight breakdown below
        </p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        <StatBox
          label="Streak"
          value={mounted ? `${streak}d` : "—"}
          sub="consecutive days"
        />
        <StatBox
          label="Accuracy"
          value={mounted ? `${accuracy}%` : "—"}
          sub={mounted ? `${totalAnswered} answered` : "no quizzes yet"}
        />
        <StatBox
          label="Topics"
          value={mounted ? `${doneTopics}/${totalTopics}` : "—"}
          sub="completed"
        />
        <StatBox
          label="Due"
          value={mounted ? flashcardsDue : "—"}
          sub="flashcards today"
        />
      </div>

      {/* Domain cards */}
      <section className="mb-10">
        <h2 className="text-xs font-mono uppercase tracking-widest opacity-40 mb-4">
          Exam Domains
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ccnaDomains.map((domain) => {
            const domainTopics = ccnaTopics.filter(
              (t) => t.domainId === domain.id
            );
            const domainFlashcards = ccnaFlashcards.filter(
              (f) => f.domainId === domain.id
            );
            const done = mounted
              ? completedTopics.filter((id) =>
                  domainTopics.some((t) => t.id === id)
                ).length
              : 0;
            const pct =
              domainTopics.length > 0
                ? Math.round((done / domainTopics.length) * 100)
                : 0;

            return (
              <Link
                key={domain.id}
                href={`/lessons/ccna/study?domain=${domain.id}`}
                className="block border border-foreground/10 p-4 hover:border-foreground/25 transition-colors group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="font-mono text-sm font-semibold group-hover:opacity-100 opacity-80 transition-opacity">
                    {domain.name}
                  </div>
                  <span className="text-xs font-mono px-1.5 py-0.5 border border-foreground/15 opacity-50 flex-shrink-0 ml-2">
                    {domain.examWeight}%
                  </span>
                </div>
                <p className="text-xs font-mono opacity-40 mb-3 leading-relaxed">
                  {domain.description}
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1 bg-foreground/10 rounded-full overflow-hidden">
                    <div
                      className="h-1 bg-foreground/50 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono opacity-40 flex-shrink-0">
                    {done}/{domainTopics.length} topics
                  </span>
                </div>
                <div className="text-xs font-mono opacity-30 mt-1.5">
                  {domainFlashcards.length} flashcards
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Section links */}
      <section>
        <h2 className="text-xs font-mono uppercase tracking-widest opacity-40 mb-4">
          Sections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SECTION_LINKS.map(({ href, label, desc, icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-start gap-3 border border-foreground/10 p-4 hover:border-foreground/25 transition-colors group"
            >
              <span className="text-base flex-shrink-0 opacity-60">{icon}</span>
              <div>
                <div className="text-sm font-mono font-semibold opacity-80 group-hover:opacity-100 transition-opacity mb-0.5">
                  {label}
                </div>
                <div className="text-xs font-mono opacity-40 leading-relaxed">
                  {desc}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </CCNALayout>
  );
}
