"use client";
import { useState, useEffect, useRef } from "react";
import CCNALayout from "@/components/ccna/CCNALayout";
import {
  getProgress,
  exportProgress,
  importProgress,
  resetProgress,
} from "@/lib/ccna-progress";
import { ccnaDomains, ccnaTopics } from "@/src/content/ccna-domains";
import { ccnaFlashcards } from "@/src/content/ccna-flashcards";
import { ccnaQuestions } from "@/src/content/ccna-questions";
import type { UserProgress } from "@/src/types/ccna";

function Bar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 bg-foreground/10 rounded-full overflow-hidden">
        <div
          className="h-1.5 bg-foreground/50 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-mono opacity-40 w-16 text-right">
        {value}/{max} ({pct}%)
      </span>
    </div>
  );
}

export default function ProgressPage() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [importError, setImportError] = useState("");
  const [importOk, setImportOk] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    setProgress(getProgress());
  }, []);

  function refresh() {
    setProgress(getProgress());
  }

  function handleExport() {
    const json = exportProgress();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ccna-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const ok = importProgress(text);
      if (ok) {
        setImportOk(true);
        setImportError("");
        refresh();
        setTimeout(() => setImportOk(false), 2000);
      } else {
        setImportError("Invalid file format.");
      }
    };
    reader.readAsText(file);
  }

  function handleReset() {
    resetProgress();
    setConfirmReset(false);
    refresh();
  }

  if (!mounted || !progress) {
    return (
      <CCNALayout>
        <div className="font-mono text-sm opacity-40">Loading…</div>
      </CCNALayout>
    );
  }

  const accuracy =
    progress.totalQuestionsAnswered > 0
      ? Math.round((progress.totalCorrect / progress.totalQuestionsAnswered) * 100)
      : 0;

  const totalTopics = ccnaTopics.length;
  const doneTopics = progress.completedTopics.length;

  return (
    <CCNALayout>
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight mb-1">
          Progress
        </h1>
        <p className="text-xs font-mono opacity-40">
          Your study stats, history, and data controls
        </p>
      </header>

      {/* Overview stats */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {[
          {
            label: "Streak",
            value: `${progress.streak}d`,
            sub: "consecutive days",
          },
          {
            label: "Accuracy",
            value: `${accuracy}%`,
            sub: `${progress.totalQuestionsAnswered} answered`,
          },
          {
            label: "Topics",
            value: `${doneTopics}/${totalTopics}`,
            sub: "completed",
          },
          {
            label: "Quizzes",
            value: progress.quizHistory.length,
            sub: "sessions",
          },
        ].map(({ label, value, sub }) => (
          <div key={label} className="border border-foreground/10 p-4">
            <div className="text-xs font-mono opacity-40 mb-1 uppercase tracking-widest">
              {label}
            </div>
            <div className="text-2xl font-bold font-mono">{value}</div>
            <div className="text-xs font-mono opacity-30 mt-0.5">{sub}</div>
          </div>
        ))}
      </section>

      {/* Domain completion */}
      <section className="mb-10">
        <h2 className="text-xs font-mono uppercase tracking-widest opacity-40 mb-4">
          Domain Completion
        </h2>
        <div className="space-y-4">
          {ccnaDomains.map((domain) => {
            const topics = ccnaTopics.filter((t) => t.domainId === domain.id);
            const done = progress.completedTopics.filter((id) =>
              topics.some((t) => t.id === id)
            ).length;
            const cards = ccnaFlashcards.filter(
              (f) => f.domainId === domain.id
            );
            const cardsDone = Object.keys(progress.flashcardSchedule).filter(
              (id) => cards.some((c) => c.id === id)
            ).length;
            const questions = ccnaQuestions.filter(
              (q) => q.domainId === domain.id
            );

            return (
              <div key={domain.id}>
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="opacity-70">{domain.name}</span>
                  <span className="opacity-30">{domain.examWeight}% of exam</span>
                </div>
                <Bar value={done} max={topics.length} />
                <div className="flex gap-4 mt-1 text-xs font-mono opacity-30">
                  <span>{cardsDone}/{cards.length} flashcards seen</span>
                  <span>{questions.length} questions available</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quiz history */}
      {progress.quizHistory.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xs font-mono uppercase tracking-widest opacity-40 mb-4">
            Recent Quizzes
          </h2>
          <div className="space-y-2">
            {progress.quizHistory.slice(0, 10).map((result) => {
              const pct = Math.round((result.score / result.total) * 100);
              const date = new Date(result.date).toLocaleDateString();
              return (
                <div
                  key={result.id}
                  className="flex items-center gap-4 border border-foreground/8 px-4 py-3 text-xs font-mono"
                >
                  <span className="opacity-40">{date}</span>
                  <span
                    className={`font-semibold ${
                      pct >= 80
                        ? "text-green-400/70"
                        : pct >= 60
                        ? "text-yellow-400/70"
                        : "text-red-400/60"
                    }`}
                  >
                    {pct}%
                  </span>
                  <span className="opacity-40">
                    {result.score}/{result.total}
                  </span>
                  {result.wrongIds.length > 0 && (
                    <span className="opacity-30">
                      {result.wrongIds.length} wrong
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Data controls */}
      <section>
        <h2 className="text-xs font-mono uppercase tracking-widest opacity-40 mb-4">
          Data
        </h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleExport}
            className="text-xs font-mono px-4 py-2 border border-foreground/20 opacity-60 hover:opacity-100 transition-opacity"
          >
            Export JSON
          </button>

          <button
            onClick={() => fileRef.current?.click()}
            className="text-xs font-mono px-4 py-2 border border-foreground/20 opacity-60 hover:opacity-100 transition-opacity"
          >
            Import JSON
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleImport}
          />

          {!confirmReset ? (
            <button
              onClick={() => setConfirmReset(true)}
              className="text-xs font-mono px-4 py-2 border border-red-500/30 text-red-400/60 hover:text-red-400/80 hover:border-red-500/50 transition-all"
            >
              Reset Progress
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono opacity-50">Are you sure?</span>
              <button
                onClick={handleReset}
                className="text-xs font-mono px-3 py-2 border border-red-500/50 text-red-400/80 hover:bg-red-500/10 transition-all"
              >
                Yes, reset
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="text-xs font-mono px-3 py-2 border border-foreground/15 opacity-50 hover:opacity-80 transition-opacity"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {importOk && (
          <p className="text-xs font-mono text-green-400/70 mt-3">
            ✓ Progress imported successfully.
          </p>
        )}
        {importError && (
          <p className="text-xs font-mono text-red-400/60 mt-3">
            {importError}
          </p>
        )}
      </section>
    </CCNALayout>
  );
}
