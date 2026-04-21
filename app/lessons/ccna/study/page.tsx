"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CCNALayout from "@/components/ccna/CCNALayout";
import { getProgress, markTopicComplete, markTopicIncomplete } from "@/lib/ccna-progress";
import { ccnaDomains, ccnaTopics } from "@/src/content/ccna-domains";
import type { Topic } from "@/src/types/ccna";

function StudyContent() {
  const searchParams = useSearchParams();
  const initialDomain = searchParams.get("domain") ?? "all";

  const [selectedDomain, setSelectedDomain] = useState(initialDomain);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const p = getProgress();
    setCompletedTopics(new Set(p.completedTopics));
  }, []);

  const filteredTopics =
    selectedDomain === "all"
      ? ccnaTopics
      : ccnaTopics.filter((t) => t.domainId === selectedDomain);

  function toggleComplete(topic: Topic) {
    const next = new Set(completedTopics);
    if (next.has(topic.id)) {
      next.delete(topic.id);
      markTopicIncomplete(topic.id);
    } else {
      next.add(topic.id);
      markTopicComplete(topic.id);
    }
    setCompletedTopics(next);
  }

  return (
    <>
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight mb-1">
          Study
        </h1>
        <p className="text-xs font-mono opacity-40">
          Browse domains and topics · mark each one complete as you go
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
            <span className="ml-1.5 opacity-50">{d.examWeight}%</span>
          </button>
        ))}
      </div>

      {/* Progress for selected domain */}
      {mounted && (
        <div className="mb-6 text-xs font-mono opacity-40">
          {filteredTopics.filter((t) => completedTopics.has(t.id)).length} /{" "}
          {filteredTopics.length} topics completed
        </div>
      )}

      {/* Topic list */}
      <div className="space-y-2">
        {filteredTopics.map((topic) => {
          const domain = ccnaDomains.find((d) => d.id === topic.domainId);
          const isExpanded = expandedTopic === topic.id;
          const isDone = mounted && completedTopics.has(topic.id);

          return (
            <div
              key={topic.id}
              className="border border-foreground/10 hover:border-foreground/20 transition-colors"
            >
              {/* Topic header */}
              <button
                onClick={() =>
                  setExpandedTopic(isExpanded ? null : topic.id)
                }
                className="w-full flex items-center gap-3 px-4 py-3 text-left"
              >
                <span
                  className={`flex-shrink-0 w-4 h-4 border flex items-center justify-center ${
                    isDone
                      ? "border-green-500/40 bg-green-500/10"
                      : "border-foreground/25"
                  }`}
                >
                  {isDone && (
                    <span className="text-green-400 text-[9px] leading-none">
                      ✓
                    </span>
                  )}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-mono font-medium opacity-80">
                    {topic.name}
                  </div>
                  {domain && (
                    <div className="text-xs font-mono opacity-30">
                      {domain.name} · {domain.examWeight}%
                    </div>
                  )}
                </div>
                <span className="text-xs font-mono opacity-30 flex-shrink-0">
                  {isExpanded ? "▲" : "▼"}
                </span>
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-foreground/8">
                  <p className="text-sm font-mono opacity-60 leading-relaxed mt-4 mb-4">
                    {topic.summary}
                  </p>

                  {/* Key concepts */}
                  <div className="mb-4">
                    <div className="text-xs font-mono uppercase tracking-widest opacity-30 mb-2">
                      Key Concepts
                    </div>
                    <ul className="space-y-1.5">
                      {topic.keyConcepts.map((concept, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs font-mono opacity-60 leading-relaxed"
                        >
                          <span className="opacity-40 flex-shrink-0 mt-0.5">
                            ·
                          </span>
                          {concept}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Lab connection */}
                  <div className="mb-4 p-3 bg-foreground/[0.03] border border-foreground/8">
                    <div className="text-xs font-mono uppercase tracking-widest opacity-30 mb-1">
                      Lab Connection
                    </div>
                    <p className="text-xs font-mono opacity-50 leading-relaxed">
                      {topic.labConnection}
                    </p>
                  </div>

                  {/* Mark complete */}
                  <button
                    onClick={() => toggleComplete(topic)}
                    className={`text-xs font-mono px-3 py-1.5 border transition-all ${
                      isDone
                        ? "border-green-500/40 text-green-400/70 bg-green-500/5 hover:bg-green-500/10"
                        : "border-foreground/20 opacity-60 hover:opacity-100"
                    }`}
                  >
                    {isDone ? "✓ Completed" : "Mark Complete"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default function StudyPage() {
  return (
    <CCNALayout>
      <Suspense fallback={<div className="font-mono text-sm opacity-40">Loading…</div>}>
        <StudyContent />
      </Suspense>
    </CCNALayout>
  );
}
