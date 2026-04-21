"use client";
import { useState, useEffect, useCallback } from "react";
import CCNALayout from "@/components/ccna/CCNALayout";
import { addQuizResult } from "@/lib/ccna-progress";
import {
  createQuizSession,
  submitCurrentAnswer,
  advanceQuestion,
  endSession,
} from "@/lib/ccna-quiz-engine";
import { ccnaQuestions } from "@/src/content/ccna-questions";
import { ccnaDomains } from "@/src/content/ccna-domains";
import type { QuizSession, QuizConfig } from "@/src/types/ccna";

const COUNT_OPTIONS = [10, 20, 30];

function ConfigScreen({
  onStart,
}: {
  onStart: (config: QuizConfig) => void;
}) {
  const [domainIds, setDomainIds] = useState<string[]>([]);
  const [questionCount, setQuestionCount] = useState(10);

  function toggleDomain(id: string) {
    setDomainIds((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  }

  function start() {
    onStart({
      domainIds,
      questionCount,
      timed: false,
      secondsPerQuestion: 90,
    });
  }

  return (
    <>
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight mb-1">
          Quiz
        </h1>
        <p className="text-xs font-mono opacity-40">
          Configure your session, then begin
        </p>
      </header>

      <div className="max-w-lg">
        {/* Domain filter */}
        <div className="mb-6">
          <div className="text-xs font-mono uppercase tracking-widest opacity-40 mb-3">
            Domains (leave blank for all)
          </div>
          <div className="flex flex-wrap gap-2">
            {ccnaDomains.map((d) => {
              const active = domainIds.includes(d.id);
              return (
                <button
                  key={d.id}
                  onClick={() => toggleDomain(d.id)}
                  className={`text-xs font-mono px-3 py-1.5 border transition-all ${
                    active
                      ? "border-foreground/50 opacity-100"
                      : "border-foreground/15 opacity-40 hover:opacity-70"
                  }`}
                >
                  {d.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question count */}
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-widest opacity-40 mb-3">
            Questions
          </div>
          <div className="flex gap-2">
            {COUNT_OPTIONS.map((n) => (
              <button
                key={n}
                onClick={() => setQuestionCount(n)}
                className={`text-xs font-mono px-4 py-2 border transition-all ${
                  questionCount === n
                    ? "border-foreground/50 opacity-100"
                    : "border-foreground/15 opacity-40 hover:opacity-70"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={start}
          className="text-sm font-mono px-6 py-2.5 border border-foreground/30 opacity-80 hover:opacity-100 transition-opacity"
        >
          Start Quiz →
        </button>
      </div>
    </>
  );
}

function QuizScreen({
  session: initialSession,
  onDone,
}: {
  session: QuizSession;
  onDone: () => void;
}) {
  const [session, setSession] = useState(initialSession);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [savedResult, setSavedResult] = useState(false);

  const question = session.questions[session.currentIndex];
  const isLast = session.currentIndex === session.questions.length - 1;

  function choose(idx: number) {
    if (revealed) return;
    setSelectedOption(idx);
    setSession((s) => submitCurrentAnswer(s, idx));
    setRevealed(true);
  }

  function next() {
    if (isLast) {
      const { result } = endSession(session);
      if (!savedResult) {
        addQuizResult(result);
        setSavedResult(true);
      }
      setSession((s) => ({ ...s, status: "complete" }));
    } else {
      setSession((s) => advanceQuestion(s));
      setSelectedOption(null);
      setRevealed(false);
    }
  }

  if (session.status === "complete") {
    const answered = session.questions.length;
    let correct = 0;
    for (const q of session.questions) {
      if (session.answers[q.id] === q.correct) correct++;
    }
    const pct = Math.round((correct / answered) * 100);

    const wrong = session.questions.filter(
      (q) => session.answers[q.id] !== q.correct
    );

    return (
      <div className="max-w-lg">
        <div className="border border-foreground/10 p-6 mb-8">
          <div className="text-xs font-mono uppercase tracking-widest opacity-40 mb-4">
            Results
          </div>
          <div className="text-4xl font-bold font-mono mb-1">{pct}%</div>
          <div className="text-sm font-mono opacity-50">
            {correct} / {answered} correct
          </div>
        </div>

        {wrong.length > 0 && (
          <div className="mb-8">
            <div className="text-xs font-mono uppercase tracking-widest opacity-40 mb-4">
              Review Wrong Answers
            </div>
            <div className="space-y-4">
              {wrong.map((q) => (
                <div
                  key={q.id}
                  className="border border-foreground/8 p-4 text-sm font-mono"
                >
                  <p className="opacity-70 mb-3 leading-relaxed">{q.question}</p>
                  <p className="text-green-400/70 text-xs mb-1">
                    ✓ {q.options[q.correct]}
                  </p>
                  {session.answers[q.id] != null && (
                    <p className="text-red-400/60 text-xs mb-2">
                      ✗ {q.options[session.answers[q.id] as number]}
                    </p>
                  )}
                  <p className="text-xs opacity-40 leading-relaxed border-t border-foreground/8 pt-2">
                    {q.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={onDone}
          className="text-xs font-mono px-4 py-2 border border-foreground/20 opacity-60 hover:opacity-100 transition-opacity"
        >
          ← New Quiz
        </button>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className="max-w-lg">
      {/* Progress */}
      <div className="flex items-center justify-between text-xs font-mono opacity-40 mb-6">
        <span>
          Question {session.currentIndex + 1} of {session.questions.length}
        </span>
        <div className="w-32 h-1 bg-foreground/10 rounded-full overflow-hidden">
          <div
            className="h-1 bg-foreground/50 rounded-full"
            style={{
              width: `${((session.currentIndex + 1) / session.questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="border border-foreground/10 p-5 mb-4">
        <p className="text-sm font-mono leading-relaxed opacity-80">
          {question.question}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-2 mb-4">
        {question.options.map((opt, i) => {
          let cls =
            "w-full text-left text-xs font-mono px-4 py-3 border transition-all leading-relaxed";
          if (!revealed) {
            cls +=
              selectedOption === i
                ? " border-foreground/50 opacity-100"
                : " border-foreground/10 opacity-60 hover:opacity-90 hover:border-foreground/25";
          } else if (i === question.correct) {
            cls += " border-green-500/40 bg-green-500/5 text-green-400/80";
          } else if (i === selectedOption) {
            cls += " border-red-500/40 bg-red-500/5 text-red-400/70";
          } else {
            cls += " border-foreground/8 opacity-30";
          }

          return (
            <button key={i} className={cls} onClick={() => choose(i)}>
              <span className="opacity-50 mr-2">
                {["A", "B", "C", "D"][i]}.
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {revealed && (
        <div className="border border-foreground/8 p-4 mb-4 bg-foreground/[0.02]">
          <div className="text-xs font-mono uppercase tracking-widest opacity-30 mb-1">
            Explanation
          </div>
          <p className="text-xs font-mono opacity-50 leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}

      {revealed && (
        <button
          onClick={next}
          className="text-xs font-mono px-4 py-2 border border-foreground/20 opacity-60 hover:opacity-100 transition-opacity"
        >
          {isLast ? "Finish →" : "Next →"}
        </button>
      )}
    </div>
  );
}

export default function QuizPage() {
  const [session, setSession] = useState<QuizSession | null>(null);

  function start(config: QuizConfig) {
    const s = createQuizSession(ccnaQuestions, config);
    setSession(s);
  }

  return (
    <CCNALayout>
      {session ? (
        <QuizScreen session={session} onDone={() => setSession(null)} />
      ) : (
        <ConfigScreen onStart={start} />
      )}
    </CCNALayout>
  );
}
