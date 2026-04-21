"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import BlogNavigation from "@/components/BlogNavigation";
import { ccnaWeeks, type CCNAWeek } from "@/src/content/ccna";

const STORAGE_KEY = "ccna-completed-weeks";

function getShortTitle(title: string): string {
  const words = title.split(" ");
  return words.slice(0, 4).join(" ");
}

function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="w-full bg-foreground/10 rounded-full h-1.5 overflow-hidden">
      <div
        className="bg-foreground/60 h-1.5 rounded-full transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function ConceptsBlock({ label, code }: { label: string; code: string }) {
  return (
    <div className="mb-6 rounded-sm overflow-hidden border border-foreground/10">
      <div className="flex items-center gap-2 px-4 py-2 bg-foreground/5 border-b border-foreground/10">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="ml-2 text-xs font-mono opacity-40">{label}</span>
      </div>
      <pre className="bg-foreground/[0.03] p-4 overflow-x-auto text-xs sm:text-sm leading-relaxed">
        <code className="text-foreground/75 whitespace-pre font-mono">{code}</code>
      </pre>
    </div>
  );
}

function WeekSection({
  week,
  completed,
  onToggleComplete,
}: {
  week: CCNAWeek;
  completed: boolean;
  onToggleComplete: (weekNum: number) => void;
}) {
  return (
    <section
      id={`week-${week.week}`}
      className="mb-16 scroll-mt-24 border-b border-foreground/8 pb-16 last:border-0"
    >
      {/* Week header */}
      <div className="flex items-start gap-4 mb-6">
        <span className="flex-shrink-0 text-xs font-mono px-2.5 py-1 border border-foreground/20 opacity-60 mt-1">
          Week {week.week}
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{week.title}</h2>
      </div>

      {/* Objectives */}
      <div className="mb-8">
        <h3 className="text-xs font-mono uppercase tracking-widest opacity-40 mb-3">
          Learning Objectives
        </h3>
        <ul className="space-y-2">
          {week.objectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-3 text-sm opacity-70 leading-relaxed">
              <span className="text-foreground/30 mt-1.5 text-xs flex-shrink-0">●</span>
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Video Resources */}
      <div className="mb-8">
        <h3 className="text-xs font-mono uppercase tracking-widest opacity-40 mb-3">
          Video Resources
        </h3>
        <div className="space-y-2">
          {week.videos.map((video, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 border border-foreground/8 hover:border-foreground/20 transition-colors"
            >
              <span className="flex-shrink-0 text-xs font-mono opacity-30 w-5">{i + 1}.</span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <span className="text-sm font-medium font-mono">{video.title}</span>
                  {video.note && (
                    <span
                      className={`text-xs font-mono px-1.5 py-0.5 ${
                        video.note === "CRITICAL"
                          ? "text-yellow-500/80 border border-yellow-500/30"
                          : video.note === "KEY" || video.note === "FOUNDATION"
                          ? "text-blue-400/70 border border-blue-400/25"
                          : video.note === "HANDS-ON"
                          ? "text-green-400/70 border border-green-400/25"
                          : "text-foreground/50 border border-foreground/15"
                      }`}
                    >
                      {video.note}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-3 text-xs opacity-40">
                  <span>{video.length}</span>
                  <span className="opacity-60">·</span>
                  <span>{video.topics}</span>
                </div>
              </div>
              <a
                href={video.url ?? `https://www.youtube.com/results?search_query=${encodeURIComponent(video.search)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 text-xs font-mono opacity-50 hover:opacity-90 transition-opacity border border-foreground/15 px-2.5 py-1 hover:border-foreground/35"
              >
                {video.url ? "Visit Site →" : "Search YouTube →"}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Key Concepts */}
      <div className="mb-8">
        <h3 className="text-xs font-mono uppercase tracking-widest opacity-40 mb-3">
          Key Concepts
        </h3>
        <ConceptsBlock label={week.conceptsLabel} code={week.concepts} />
      </div>

      {/* Lab Exercise */}
      <div className="mb-8">
        <h3 className="text-xs font-mono uppercase tracking-widest opacity-40 mb-3">
          Lab Exercise
        </h3>
        <p className="text-sm opacity-70 leading-relaxed border-l-2 border-foreground/15 pl-4">
          {week.lab}
        </p>
      </div>

      {/* Practice Questions */}
      <div className="mb-8">
        <h3 className="text-xs font-mono uppercase tracking-widest opacity-40 mb-3">
          Practice Questions
        </h3>
        <ol className="space-y-2">
          {week.practiceQuestions.map((q, i) => (
            <li key={i} className="flex items-start gap-3 text-sm opacity-70 leading-relaxed">
              <span className="flex-shrink-0 font-mono opacity-40 text-xs mt-1">
                {String(i + 1).padStart(2, "0")}.
              </span>
              <span>{q}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Real World Connection */}
      <div className="mb-8">
        <h3 className="text-xs font-mono uppercase tracking-widest opacity-40 mb-3">
          Real-World Connection
        </h3>
        <p className="text-sm opacity-70 leading-relaxed">{week.realWorld}</p>
      </div>

      {/* Mark complete */}
      <button
        onClick={() => onToggleComplete(week.week)}
        className={`flex items-center gap-2.5 text-sm font-mono px-4 py-2 border transition-all duration-200 ${
          completed
            ? "border-green-500/40 text-green-400/70 bg-green-500/5 hover:bg-green-500/10"
            : "border-foreground/20 opacity-60 hover:opacity-90 hover:border-foreground/40"
        }`}
      >
        <span
          className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 ${
            completed ? "border-green-500/50 bg-green-500/10" : "border-foreground/30"
          }`}
        >
          {completed && <span className="text-green-400 text-xs leading-none">✓</span>}
        </span>
        {completed ? "Completed" : "Mark as Complete"}
      </button>
    </section>
  );
}

export default function CCNAPage() {
  const [completedWeeks, setCompletedWeeks] = useState<Set<number>>(new Set());
  const [activeWeek, setActiveWeek] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTipsOpen, setIsTipsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: number[] = JSON.parse(stored);
        setCompletedWeeks(new Set(parsed));
      }
    } catch {
      // ignore
    }
  }, []);

  // Track active week on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 140;
      let current = 1;
      for (const week of ccnaWeeks) {
        const el = document.getElementById(`week-${week.week}`);
        if (el && el.offsetTop <= scrollY) {
          current = week.week;
        }
      }
      setActiveWeek(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleComplete = useCallback((weekNum: number) => {
    setCompletedWeeks((prev) => {
      const next = new Set(prev);
      if (next.has(weekNum)) {
        next.delete(weekNum);
      } else {
        next.add(weekNum);
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const scrollToWeek = (weekNum: number) => {
    const el = document.getElementById(`week-${weekNum}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileMenuOpen(false);
  };

  const completedCount = completedWeeks.size;
  const totalWeeks = ccnaWeeks.length;

  const SidebarContent = () => (
    <>
      {/* Course header */}
      <div className="mb-6 pb-6 border-b border-foreground/10">
        <Link
          href="/lessons/"
          className="text-xs font-mono opacity-40 hover:opacity-70 transition-opacity mb-3 block"
        >
          ← Lessons
        </Link>
        <h2 className="text-sm font-bold tracking-tight mb-1">CCNA 200-301</h2>
        <p className="text-xs opacity-40 leading-relaxed">Free 16-week study guide</p>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs font-mono opacity-50 mb-1.5">
            <span>Progress</span>
            <span>{mounted ? completedCount : 0} / {totalWeeks}</span>
          </div>
          <ProgressBar value={mounted ? completedCount : 0} max={totalWeeks} />
        </div>
      </div>

      {/* Week list */}
      <nav className="space-y-0.5">
        {ccnaWeeks.map((week) => {
          const isActive = activeWeek === week.week;
          const isDone = mounted && completedWeeks.has(week.week);
          return (
            <button
              key={week.week}
              onClick={() => scrollToWeek(week.week)}
              className={`w-full text-left flex items-start gap-2.5 px-2 py-2 rounded-sm transition-all duration-150 text-xs font-mono ${
                isActive
                  ? "bg-foreground/8 opacity-100"
                  : "opacity-50 hover:opacity-80 hover:bg-foreground/5"
              }`}
            >
              <span
                className={`flex-shrink-0 mt-0.5 w-3.5 h-3.5 border flex items-center justify-center ${
                  isDone ? "border-green-500/40 bg-green-500/10" : "border-foreground/25"
                }`}
              >
                {isDone && <span className="text-green-400 text-[8px] leading-none">✓</span>}
              </span>
              <span className="leading-snug">
                <span className="opacity-40">W{week.week} </span>
                {getShortTitle(week.title)}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );

  return (
    <main className="min-h-screen">
      <BlogNavigation />

      <div className="pt-20 lg:pt-24">
        {/* Mobile week menu toggle */}
        <div className="lg:hidden border-b border-foreground/10 bg-background/95 backdrop-blur-sm sticky top-16 z-30">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full flex items-center justify-between px-6 py-3 text-xs font-mono opacity-70 hover:opacity-100 transition-opacity"
          >
            <span>
              Week {activeWeek} of {totalWeeks}
              {mounted && completedCount > 0 && (
                <span className="ml-2 opacity-50">({completedCount} completed)</span>
              )}
            </span>
            <span className="opacity-50">{isMobileMenuOpen ? "▲ Close" : "▼ All Weeks"}</span>
          </button>

          {isMobileMenuOpen && (
            <div className="px-4 pb-4 border-t border-foreground/8 max-h-72 overflow-y-auto">
              <nav className="space-y-0.5 pt-2">
                {ccnaWeeks.map((week) => {
                  const isDone = mounted && completedWeeks.has(week.week);
                  return (
                    <button
                      key={week.week}
                      onClick={() => scrollToWeek(week.week)}
                      className="w-full text-left flex items-center gap-2.5 px-2 py-2 text-xs font-mono opacity-60 hover:opacity-90 hover:bg-foreground/5 transition-all"
                    >
                      <span
                        className={`flex-shrink-0 w-3 h-3 border flex items-center justify-center ${
                          isDone ? "border-green-500/40 bg-green-500/10" : "border-foreground/25"
                        }`}
                      >
                        {isDone && <span className="text-green-400 text-[7px]">✓</span>}
                      </span>
                      <span>
                        <span className="opacity-40">W{week.week}</span>{" "}
                        {getShortTitle(week.title)}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          )}
        </div>

        <div className="max-w-7xl mx-auto flex">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-24 self-start h-[calc(100vh-6rem)] overflow-y-auto px-6 py-8 border-r border-foreground/8">
            <SidebarContent />
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0 px-6 sm:px-8 lg:px-12 py-8 lg:py-12">
            {/* Page header */}
            <header className="mb-12 lg:mb-16 max-w-3xl">
              <Link
                href="/lessons/"
                className="text-xs font-mono opacity-40 hover:opacity-70 transition-opacity mb-6 block lg:hidden"
              >
                ← Back to Lessons
              </Link>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3 font-mono">
                CCNA 200-301 Study Guide
              </h1>
              <p className="text-base opacity-60 font-mono mb-6">
                Free, comprehensive guide to passing Cisco CCNA certification
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-x-8 gap-y-3 mb-6 text-sm font-mono">
                <div className="opacity-50">
                  <span className="opacity-60">Duration:</span>{" "}
                  <span>12–16 weeks</span>
                </div>
                <div className="opacity-50">
                  <span className="opacity-60">Exam Cost:</span>{" "}
                  <span>~$330</span>
                </div>
                <div className="opacity-50">
                  <span className="opacity-60">Prerequisites:</span>{" "}
                  <span>Basic networking knowledge</span>
                </div>
              </div>

              {/* Overall progress (mobile visible) */}
              <div className="lg:hidden mb-6 p-4 border border-foreground/10">
                <div className="flex items-center justify-between text-xs font-mono opacity-50 mb-2">
                  <span>Your Progress</span>
                  <span>{mounted ? completedCount : 0} / {totalWeeks} weeks completed</span>
                </div>
                <ProgressBar value={mounted ? completedCount : 0} max={totalWeeks} />
              </div>

              {/* Study Tips collapsible */}
              <div className="border border-foreground/10">
                <button
                  onClick={() => setIsTipsOpen(!isTipsOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-xs font-mono opacity-60 hover:opacity-90 transition-opacity"
                >
                  <span>Study Tips & How to Use This Guide</span>
                  <span className="opacity-50">{isTipsOpen ? "▲" : "▼"}</span>
                </button>
                {isTipsOpen && (
                  <div className="px-4 pb-4 border-t border-foreground/8 text-xs font-mono opacity-60 space-y-2 pt-3">
                    <p>
                      <strong className="opacity-90">Recommended pace:</strong> 5–10 hours per week.
                      Watch all videos for a week before doing the lab.
                    </p>
                    <p>
                      <strong className="opacity-90">Tools you need:</strong> GNS3 (free) or Cisco
                      Packet Tracer (free for students), Wireshark (free).
                    </p>
                    <p>
                      <strong className="opacity-90">Practice exams:</strong> Start taking them at
                      Week 12. Target 80%+ consistently before scheduling.
                    </p>
                    <p>
                      <strong className="opacity-90">Labs matter:</strong> The exam includes
                      simulations. If you can configure it in a lab, you can do it on the exam.
                    </p>
                  </div>
                )}
              </div>
            </header>

            {/* Week sections */}
            <div className="max-w-3xl font-mono">
              {ccnaWeeks.map((week) => (
                <WeekSection
                  key={week.week}
                  week={week}
                  completed={mounted && completedWeeks.has(week.week)}
                  onToggleComplete={toggleComplete}
                />
              ))}
            </div>

            {/* Footer */}
            <footer className="max-w-3xl pt-12 border-t border-foreground/10 font-mono">
              <p className="text-sm opacity-40 mb-4">
                Built by Nicolas Kennedy — Level 2 Network Technician at URI ITS
              </p>
              <div className="flex flex-wrap gap-4 text-xs">
                <a
                  href="https://www.linkedin.com/sharing/share-offsite/?url=https://nicolaskennedy.com/lessons/ccna"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-40 hover:opacity-70 transition-opacity border border-foreground/15 px-3 py-1.5"
                >
                  Share on LinkedIn
                </a>
                <a
                  href="mailto:nkennedy@uri.edu?subject=CCNA Study Guide Feedback"
                  className="opacity-40 hover:opacity-70 transition-opacity border border-foreground/15 px-3 py-1.5"
                >
                  Give Feedback
                </a>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}
