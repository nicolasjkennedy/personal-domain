"use client";
import { useState, useMemo } from "react";
import CCNALayout from "@/components/ccna/CCNALayout";
import { ccnaCommands } from "@/src/content/ccna-commands";
import { ccnaDomains } from "@/src/content/ccna-domains";

const MODE_LABELS: Record<string, string> = {
  user: "User EXEC",
  privileged: "Privileged EXEC",
  "global-config": "Global Config",
  "interface-config": "Interface Config",
};

export default function CommandsPage() {
  const [query, setQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [selectedMode, setSelectedMode] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const modes = Array.from(new Set(ccnaCommands.map((c) => c.mode)));

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return ccnaCommands.filter((cmd) => {
      if (
        q &&
        !cmd.command.toLowerCase().includes(q) &&
        !cmd.description.toLowerCase().includes(q) &&
        !cmd.tags.some((t) => t.toLowerCase().includes(q))
      )
        return false;
      if (selectedDomain !== "all" && cmd.domainId !== selectedDomain)
        return false;
      if (selectedMode !== "all" && cmd.mode !== selectedMode) return false;
      return true;
    });
  }, [query, selectedDomain, selectedMode]);

  function copy(text: string, id: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    });
  }

  return (
    <CCNALayout>
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight mb-1">
          Commands
        </h1>
        <p className="text-xs font-mono opacity-40">
          Cisco IOS CLI reference · {ccnaCommands.length} commands
        </p>
      </header>

      {/* Search */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search commands, descriptions, tags…"
        className="w-full max-w-lg mb-6 px-4 py-2.5 text-sm font-mono border border-foreground/20 bg-transparent focus:outline-none focus:border-foreground/40 placeholder:opacity-30"
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setSelectedDomain("all")}
          className={`text-xs font-mono px-3 py-1.5 border transition-all ${
            selectedDomain === "all"
              ? "border-foreground/50 opacity-100"
              : "border-foreground/15 opacity-40 hover:opacity-70"
          }`}
        >
          All Domains
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

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedMode("all")}
          className={`text-xs font-mono px-3 py-1.5 border transition-all ${
            selectedMode === "all"
              ? "border-foreground/50 opacity-100"
              : "border-foreground/15 opacity-40 hover:opacity-70"
          }`}
        >
          All Modes
        </button>
        {modes.map((m) => (
          <button
            key={m}
            onClick={() => setSelectedMode(m)}
            className={`text-xs font-mono px-3 py-1.5 border transition-all ${
              selectedMode === m
                ? "border-foreground/50 opacity-100"
                : "border-foreground/15 opacity-40 hover:opacity-70"
            }`}
          >
            {MODE_LABELS[m] ?? m}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="text-xs font-mono opacity-30 mb-4">
        {filtered.length} command{filtered.length !== 1 ? "s" : ""}
      </div>

      {/* Command list */}
      <div className="space-y-3">
        {filtered.map((cmd) => {
          const domain = ccnaDomains.find((d) => d.id === cmd.domainId);
          return (
            <div
              key={cmd.id}
              className="border border-foreground/10 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-4 px-4 py-3 bg-foreground/[0.03] border-b border-foreground/8">
                <div>
                  <code className="text-sm font-mono font-semibold">
                    {cmd.command}
                  </code>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-xs font-mono opacity-30">
                      {MODE_LABELS[cmd.mode] ?? cmd.mode}
                    </span>
                    {domain && (
                      <span className="text-xs font-mono opacity-30">
                        · {domain.name}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => copy(cmd.command, cmd.id)}
                  className="flex-shrink-0 text-xs font-mono opacity-40 hover:opacity-80 transition-opacity border border-foreground/15 px-2.5 py-1"
                >
                  {copiedId === cmd.id ? "Copied!" : "Copy"}
                </button>
              </div>

              {/* Body */}
              <div className="px-4 py-3">
                <p className="text-xs font-mono opacity-60 mb-3 leading-relaxed">
                  {cmd.description}
                </p>

                {/* Syntax */}
                <div className="mb-3">
                  <div className="text-xs font-mono uppercase tracking-widest opacity-30 mb-1">
                    Syntax
                  </div>
                  <code className="text-xs font-mono opacity-60 bg-foreground/5 px-2 py-1 block">
                    {cmd.syntax}
                  </code>
                </div>

                {/* Example */}
                <div className="mb-3">
                  <div className="text-xs font-mono uppercase tracking-widest opacity-30 mb-1">
                    Example
                  </div>
                  <pre className="text-xs font-mono opacity-50 bg-foreground/5 px-3 py-2 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                    {cmd.example}
                  </pre>
                </div>

                {/* Tags */}
                {cmd.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {cmd.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono opacity-30 border border-foreground/10 px-1.5 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-sm font-mono opacity-40 text-center py-12">
            No commands match your filters.
          </div>
        )}
      </div>
    </CCNALayout>
  );
}
