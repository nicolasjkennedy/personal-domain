"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { siteContent } from "@/src/content/site";
import AnimateOnScroll from "@/components/AnimateOnScroll";

type TechItem = { name: string; count: number; sources: string[] };

// Extract all unique tech from experience and projects
function getAllTech(): TechItem[] {
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
function categorizeTech(allTech: TechItem[]) {
  const categories: Record<string, string[]> = {
    Languages: ["Python", "JavaScript", "TypeScript", "HTML", "CSS"],
    "Infrastructure & Networking": [
      "Cisco IOS", "TCP/IP", "VLANs", "Network Infrastructure",
      "Network Configuration", "Network Automation", "SSH/Telnet",
      "Configuration Management", "IP Camera Systems",
    ],
    "Data & AI": [
      "PostgreSQL", "Vector Search", "LLMs", "Web Scraping",
      "Data Processing", "File Processing",
    ],
    "Frameworks & Tools": [
      "Backend Architecture", "Web APIs", "CLI Tools",
      "OBS Studio", "Helpdesk Support",
    ],
  };

  const categorized: { category: string; techs: TechItem[] }[] = [];
  const assigned = new Set<string>();

  for (const [category, techNames] of Object.entries(categories)) {
    const techs = allTech.filter((t) => techNames.includes(t.name));
    if (techs.length > 0) {
      categorized.push({ category, techs });
      techs.forEach((t) => assigned.add(t.name));
    }
  }

  const unassigned = allTech.filter((t) => !assigned.has(t.name));
  if (unassigned.length > 0) {
    categorized.push({ category: "Other", techs: unassigned });
  }

  return categorized;
}

// Pre-compute static data at module scope (siteContent is a static import)
const allTechData = getAllTech();
const categorizedData = categorizeTech(allTechData);

// ─── 3D Wheel Component ──────────────────────────────────────────────────────

function TechWheel({ items }: { items: TechItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const autoRotateRef = useRef(true);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const frameRef = useRef<number>();

  const [renderRotation, setRenderRotation] = useState(0);
  const [frontIndex, setFrontIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const itemCount = items.length;
  const angleStep = itemCount > 0 ? 360 / itemCount : 360;

  // Responsive radius — scales with item count so cards don't overlap
  const getRadius = useCallback(() => {
    if (typeof window === "undefined") return 300;
    const width = window.innerWidth;
    const itemWidth = width < 640 ? 110 : 145;
    const computed = (itemWidth * itemCount) / (2 * Math.PI);
    const minRadius = width < 640 ? 140 : width < 1024 ? 220 : 280;
    return Math.max(minRadius, computed);
  }, [itemCount]);

  const [radius, setRadius] = useState(300);

  useEffect(() => {
    setRadius(getRadius());
    const handleResize = () => setRadius(getRadius());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getRadius]);

  // Find the item closest to front center (angle ≈ 0°)
  const getFrontIndex = useCallback(
    (rot: number) => {
      if (itemCount === 0) return 0;
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < itemCount; i++) {
        const angle = (((i * angleStep + rot) % 360) + 360) % 360;
        const dist = Math.min(angle, 360 - angle);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      }
      return best;
    },
    [itemCount, angleStep]
  );

  // ── Animation loop ────────────────────────────────────────────────────────
  useEffect(() => {
    const animate = () => {
      if (!isDraggingRef.current) {
        if (autoRotateRef.current) {
          rotationRef.current -= 0.12; // slow clockwise drift
        } else {
          // Momentum with friction
          velocityRef.current *= 0.95;
          if (Math.abs(velocityRef.current) > 0.05) {
            rotationRef.current += velocityRef.current;
          } else {
            velocityRef.current = 0;
            // Gentle snap to nearest item when momentum dies
            const nearest = getFrontIndex(rotationRef.current);
            const targetAngle = -(nearest * angleStep);
            const current = rotationRef.current;
            const normalizedTarget =
              targetAngle + Math.round((current - targetAngle) / 360) * 360;
            const diff = normalizedTarget - current;
            if (Math.abs(diff) > 0.1) {
              rotationRef.current += diff * 0.06;
            }
          }
        }
      }

      setRenderRotation(rotationRef.current);
      setFrontIndex(getFrontIndex(rotationRef.current));
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [getFrontIndex, angleStep]);

  // Reset rotation when the filtered items change
  const itemsKey = useMemo(() => items.map((i) => i.name).join(","), [items]);
  useEffect(() => {
    rotationRef.current = 0;
    velocityRef.current = 0;
    autoRotateRef.current = true;
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
  }, [itemsKey]);

  // ── Pointer handlers ──────────────────────────────────────────────────────
  const handlePointerDown = useCallback((clientX: number) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    lastXRef.current = clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    autoRotateRef.current = false;
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
  }, []);

  const handlePointerMove = useCallback((clientX: number) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dx = clientX - lastXRef.current;
    const dt = now - lastTimeRef.current;
    const sensitivity = 0.3;

    rotationRef.current += dx * sensitivity;

    if (dt > 0) {
      velocityRef.current = (dx * sensitivity) / Math.max(dt / 16.67, 0.5);
    }

    lastXRef.current = clientX;
    lastTimeRef.current = now;
  }, []);

  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
    pauseTimeoutRef.current = setTimeout(() => {
      autoRotateRef.current = true;
    }, 5000);
  }, []);

  // Window-level mouse listeners so drag continues outside the container
  useEffect(() => {
    const onMove = (e: MouseEvent) => handlePointerMove(e.clientX);
    const onUp = () => {
      if (isDraggingRef.current) handlePointerUp();
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  // Touch listeners (non-passive touchmove to prevent page scroll while dragging)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) =>
      handlePointerDown(e.touches[0].clientX);
    const onTouchMove = (e: TouchEvent) => {
      if (isDraggingRef.current) e.preventDefault();
      handlePointerMove(e.touches[0].clientX);
    };
    const onTouchEnd = () => handlePointerUp();

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [handlePointerDown, handlePointerMove, handlePointerUp]);

  // ── Nudge (arrow buttons / keyboard) ──────────────────────────────────────
  const nudge = useCallback((direction: number) => {
    velocityRef.current += direction * 3;
    autoRotateRef.current = false;
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      autoRotateRef.current = true;
    }, 5000);
  }, []);

  if (itemCount === 0) {
    return (
      <div className="text-center py-20 text-white/30 font-mono text-sm">
        No technologies found
      </div>
    );
  }

  const frontItem = items[frontIndex];

  return (
    <div className="relative">
      {/* ── 3D Wheel viewport ─────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative mx-auto overflow-hidden select-none outline-none"
        style={{ height: "300px", cursor: isDragging ? "grabbing" : "grab" }}
        tabIndex={0}
        role="region"
        aria-label="Interactive tech stack carousel — drag or use arrow keys to spin"
        onMouseDown={(e) => {
          e.preventDefault();
          handlePointerDown(e.clientX);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") { nudge(1); e.preventDefault(); }
          if (e.key === "ArrowRight") { nudge(-1); e.preventDefault(); }
        }}
      >
        {/* Edge-fade gradients for depth illusion */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-28 lg:w-36 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-28 lg:w-36 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent z-20 pointer-events-none" />

        {/* Subtle ground-plane line */}
        <div className="absolute bottom-[42%] left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none" />

        {/* Carousel items arranged in a circle */}
        <div className="relative h-full flex items-center justify-center">
          {items.map((item, i) => {
            const angleDeg = i * angleStep + renderRotation;
            const angleRad = (angleDeg * Math.PI) / 180;
            const x = Math.sin(angleRad); // -1 (left) to 1 (right)
            const z = Math.cos(angleRad); // -1 (back) to 1 (front)
            const normalizedZ = (z + 1) / 2; // 0 (back) to 1 (front)
            const translateX = x * radius;
            const scale = 0.5 + normalizedZ * 0.5;
            const opacity = 0.06 + normalizedZ * 0.94;
            const isFront = i === frontIndex;

            // Slight vertical offset creates a subtle arc
            const translateY = (1 - normalizedZ) * 12;

            return (
              <div
                key={item.name}
                className="absolute will-change-transform"
                style={{
                  transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
                  opacity,
                  zIndex: Math.round(normalizedZ * 100),
                }}
              >
                <div
                  className={`
                    px-5 py-3 sm:px-7 sm:py-4 font-mono border rounded-md whitespace-nowrap
                    transition-[border-color,background-color,box-shadow] duration-500
                    ${
                      isFront
                        ? "border-white/50 bg-white/[0.08] text-white shadow-[0_0_40px_rgba(255,255,255,0.08),0_0_80px_rgba(255,255,255,0.03)]"
                        : "border-white/[0.08] bg-white/[0.02] text-white/60"
                    }
                  `}
                >
                  <div className="text-sm sm:text-base font-medium tracking-wide">
                    {item.name}
                  </div>
                  {isFront && (
                    <div className="text-[10px] sm:text-xs text-white/30 mt-1 text-center">
                      {item.count === 1
                        ? "1 project/role"
                        : `${item.count} projects & roles`}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Controls + front-item detail ──────────────────────────────────── */}
      <div className="mt-6 flex flex-col items-center gap-5">
        <div className="flex items-center gap-6">
          {/* Left arrow */}
          <button
            onClick={() => nudge(1)}
            className="group p-2.5 border border-white/10 rounded-sm text-white/30 hover:text-white/70 hover:border-white/25 transition-all duration-300 font-mono text-sm"
            aria-label="Spin left"
          >
            <span className="group-hover:-translate-x-0.5 inline-block transition-transform duration-200">
              &#8592;
            </span>
          </button>

          {/* Front item info */}
          {frontItem && (
            <div className="text-center min-w-[200px]">
              <div className="text-base sm:text-lg font-mono text-white tracking-wide">
                {frontItem.name}
              </div>
              <div className="text-[11px] sm:text-xs text-white/35 font-mono mt-1.5">
                {frontItem.sources.join(" · ")}
              </div>
            </div>
          )}

          {/* Right arrow */}
          <button
            onClick={() => nudge(-1)}
            className="group p-2.5 border border-white/10 rounded-sm text-white/30 hover:text-white/70 hover:border-white/25 transition-all duration-300 font-mono text-sm"
            aria-label="Spin right"
          >
            <span className="group-hover:translate-x-0.5 inline-block transition-transform duration-200">
              &#8594;
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function TechStack() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const displayTech = useMemo(() => {
    if (!activeFilter) return allTechData;
    const cat = categorizedData.find((c) => c.category === activeFilter);
    return cat ? cat.techs : allTechData;
  }, [activeFilter]);

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
            {allTechData.length} technologies across{" "}
            {siteContent.experience.length + siteContent.projects.length}{" "}
            projects &amp; roles
          </p>
        </AnimateOnScroll>

        {/* Category Filters */}
        <AnimateOnScroll delay={100}>
          <div className="flex flex-wrap gap-3 mb-12">
            <button
              onClick={() => setActiveFilter(null)}
              className={`
                px-4 py-2 text-xs font-mono border rounded-sm transition-all duration-300
                ${
                  !activeFilter
                    ? "border-white/50 bg-white/10 text-white"
                    : "border-white/15 text-white/50 hover:border-white/30 hover:text-white/80"
                }
              `}
            >
              All
            </button>
            {categorizedData.map((cat) => (
              <button
                key={cat.category}
                onClick={() =>
                  setActiveFilter(
                    activeFilter === cat.category ? null : cat.category
                  )
                }
                className={`
                  px-4 py-2 text-xs font-mono border rounded-sm transition-all duration-300
                  ${
                    activeFilter === cat.category
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

        {/* 3D Spinning Wheel */}
        <AnimateOnScroll delay={200}>
          <TechWheel items={displayTech} />
        </AnimateOnScroll>

        {/* Interaction hint */}
        <AnimateOnScroll delay={400}>
          <div className="mt-10 pt-8 border-t border-white/5">
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-white/25">
              <span>Drag to spin</span>
              <span className="hidden sm:inline">·</span>
              <span>Use arrows to navigate</span>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
