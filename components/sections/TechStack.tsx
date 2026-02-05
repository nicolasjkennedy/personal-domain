"use client";

import { useState, useEffect, useRef } from "react";
import { siteContent } from "@/src/content/site";
import AnimateOnScroll from "@/components/AnimateOnScroll";

// Extract all unique tech from experience and projects
function getAllTech(): { name: string; count: number; sources: string[] }[] {
  const techMap = new Map<string, { count: number; sources: Set<string> }>();

  siteContent.experience.forEach((exp) => {
    exp.tech?.forEach((tech) => {
      const existing = techMap.get(tech) || { count: 0, sources: new Set<string>() };
      existing.count++;
      existing.sources.add(exp.company);
      techMap.set(tech, existing);
    });
  });

  siteContent.projects.forEach((proj) => {
    proj.tech?.forEach((tech) => {
      const existing = techMap.get(tech) || { count: 0, sources: new Set<string>() };
      existing.count++;
      existing.sources.add(proj.name);
      techMap.set(tech, existing);
    });
  });

  return Array.from(techMap.entries())
    .map(([name, data]) => ({
      name,
      count: data.count,
      sources: Array.from(data.sources),
    }))
    .sort((a, b) => b.count - a.count);
}

// Categorize technologies
function categorizeTech(allTech: { name: string; count: number; sources: string[] }[]) {
  const categories: Record<string, string[]> = {
    "Languages": ["Python", "JavaScript", "TypeScript", "HTML", "CSS"],
    "Infrastructure & Networking": ["Cisco IOS", "TCP/IP", "VLANs", "Network Infrastructure", "Network Configuration", "Network Automation", "SSH/Telnet", "Configuration Management", "IP Camera Systems"],
    "Data & AI": ["PostgreSQL", "Vector Search", "LLMs", "Web Scraping", "Data Processing", "File Processing"],
    "Frameworks & Tools": ["Backend Architecture", "Web APIs", "CLI Tools", "OBS Studio", "Helpdesk Support"],
  };

  const categorized: { category: string; techs: { name: string; count: number; sources: string[] }[] }[] = [];
  const assigned = new Set<string>();

  for (const [category, techNames] of Object.entries(categories)) {
    const techs = allTech.filter((t) => techNames.includes(t.name));
    if (techs.length > 0) {
      categorized.push({ category, techs });
      techs.forEach((t) => assigned.add(t.name));
    }
  }

  // Catch any unassigned tech
  const unassigned = allTech.filter((t) => !assigned.has(t.name));
  if (unassigned.length > 0) {
    categorized.push({ category: "Other", techs: unassigned });
  }

  return categorized;
}

function TechPill({ tech, index }: { tech: { name: string; count: number; sources: string[] }; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<"above" | "below">("above");
  const pillRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isHovered && pillRef.current) {
      const rect = pillRef.current.getBoundingClientRect();
      if (rect.top < 120) {
        setTooltipPos("below");
      } else {
        setTooltipPos("above");
      }
    }
  }, [isHovered]);

  // Scale based on usage count
  const sizeClass =
    tech.count >= 3
      ? "px-5 py-2.5 text-sm"
      : tech.count >= 2
      ? "px-4 py-2 text-sm"
      : "px-3 py-1.5 text-xs";

  const glowIntensity =
    tech.count >= 3
      ? "hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
      : tech.count >= 2
      ? "hover:shadow-[0_0_12px_rgba(255,255,255,0.1)]"
      : "hover:shadow-[0_0_8px_rgba(255,255,255,0.05)]";

  return (
    <div className="relative inline-block">
      <button
        ref={pillRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className={`
          ${sizeClass}
          font-mono border border-white/20 rounded-sm
          cursor-default select-none
          transition-all duration-300 ease-out
          hover:border-white/50 hover:bg-white/5 hover:scale-110
          ${glowIntensity}
          ${isHovered ? "text-white border-white/50 bg-white/5" : "text-white/70"}
        `}
        style={{
          animationDelay: `${index * 40}ms`,
        }}
        aria-label={`${tech.name} - used in ${tech.sources.join(", ")}`}
      >
        {tech.name}
      </button>

      {/* Tooltip */}
      {isHovered && (
        <div
          className={`
            absolute left-1/2 -translate-x-1/2 z-50
            px-3 py-2 bg-[#1a1a1a] border border-white/20 rounded-md
            text-xs font-mono text-white/80 whitespace-nowrap
            shadow-lg pointer-events-none
            animate-fade-in
            ${tooltipPos === "above" ? "bottom-full mb-2" : "top-full mt-2"}
          `}
        >
          <div className="text-white/50 mb-1">Used in:</div>
          {tech.sources.map((source, i) => (
            <div key={i} className="text-white/80">
              {source}
            </div>
          ))}
          {/* Arrow */}
          <div
            className={`
              absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1a1a1a] border-white/20 rotate-45
              ${tooltipPos === "above" ? "bottom-0 translate-y-1/2 border-r border-b" : "top-0 -translate-y-1/2 border-l border-t"}
            `}
          />
        </div>
      )}
    </div>
  );
}

export default function TechStack() {
  const allTech = getAllTech();
  const categorized = categorizeTech(allTech);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredCategories = activeFilter
    ? categorized.filter((c) => c.category === activeFilter)
    : categorized;

  return (
    <section
      id="skills"
      className="py-20 lg:py-32 px-6 sm:px-8 lg:px-12 border-t border-white/5"
    >
      <div className="max-w-5xl mx-auto">
        <AnimateOnScroll>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            Tech Stack
          </h2>
          <p className="text-base opacity-50 font-mono mb-12 lg:mb-16">
            {allTech.length} technologies across {siteContent.experience.length + siteContent.projects.length} projects &amp; roles
          </p>
        </AnimateOnScroll>

        {/* Category Filters */}
        <AnimateOnScroll delay={100}>
          <div className="flex flex-wrap gap-3 mb-12">
            <button
              onClick={() => setActiveFilter(null)}
              className={`
                px-4 py-2 text-xs font-mono border rounded-sm transition-all duration-300
                ${!activeFilter
                  ? "border-white/50 bg-white/10 text-white"
                  : "border-white/15 text-white/50 hover:border-white/30 hover:text-white/80"
                }
              `}
            >
              All
            </button>
            {categorized.map((cat) => (
              <button
                key={cat.category}
                onClick={() =>
                  setActiveFilter(activeFilter === cat.category ? null : cat.category)
                }
                className={`
                  px-4 py-2 text-xs font-mono border rounded-sm transition-all duration-300
                  ${activeFilter === cat.category
                    ? "border-white/50 bg-white/10 text-white"
                    : "border-white/15 text-white/50 hover:border-white/30 hover:text-white/80"
                  }
                `}
              >
                {cat.category}
                <span className="ml-2 opacity-50">{cat.techs.length}</span>
              </button>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Tech Grid by Category */}
        <div className="space-y-10">
          {filteredCategories.map((cat, catIndex) => (
            <AnimateOnScroll key={cat.category} delay={150 + catIndex * 100}>
              <div>
                <h3 className="text-sm font-mono text-white/40 mb-4 tracking-wider uppercase">
                  {cat.category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {cat.techs.map((tech, techIndex) => (
                    <TechPill
                      key={tech.name}
                      tech={tech}
                      index={catIndex * 10 + techIndex}
                    />
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Usage Legend */}
        <AnimateOnScroll delay={400}>
          <div className="mt-12 pt-8 border-t border-white/5">
            <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-white/30">
              <span>Size = frequency of use</span>
              <span className="hidden sm:inline">•</span>
              <span>Hover for context</span>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
