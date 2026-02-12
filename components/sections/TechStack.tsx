"use client";

import { useState, useEffect, useRef } from "react";
import { siteContent } from "@/src/content/site";
import AnimateOnScroll from "@/components/AnimateOnScroll";

type TechItem = { name: string; count: number; sources: string[] };

// ─── Data helpers ─────────────────────────────────────────────────────────────

// Normalize source names so "Service Surfer LLC" and "Service Surfer" collapse
function normalizeSource(name: string): string {
  return name.replace(/\s+(LLC|Inc|Ltd|Corp)\.?$/i, "").trim();
}

function getAllTech(): TechItem[] {
  const techMap = new Map<string, { count: number; sources: Set<string> }>();

  siteContent.experience.forEach((exp) => {
    exp.tech?.forEach((tech) => {
      const existing = techMap.get(tech) || { count: 0, sources: new Set<string>() };
      existing.count++;
      existing.sources.add(normalizeSource(exp.company));
      techMap.set(tech, existing);
    });
  });

  siteContent.projects.forEach((proj) => {
    proj.tech?.forEach((tech) => {
      const existing = techMap.get(tech) || { count: 0, sources: new Set<string>() };
      existing.count++;
      existing.sources.add(normalizeSource(proj.name));
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

const allTechData = getAllTech();
const categorizedData = categorizeTech(allTechData);

// ─── Inline SVG icons (monochrome, matches site palette) ─────────────────────
// Only for techs that have recognizable logos. Returns null for others.

function TechIcon({ name }: { name: string }) {
  const cls = "w-5 h-5 sm:w-6 sm:h-6 shrink-0";

  switch (name) {
    case "Python":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.789 0 11.969c0 6.18 3.403 5.96 3.403 5.96h2.03v-2.867s-.109-3.42 3.35-3.42h5.766s3.24.052 3.24-3.148V3.202S18.28 0 11.914 0zM8.708 1.85a1.06 1.06 0 110 2.12 1.06 1.06 0 010-2.12z" />
          <path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.122S24 18.211 24 12.031c0-6.18-3.403-5.96-3.403-5.96h-2.03v2.867s.109 3.42-3.35 3.42H9.451s-3.24-.052-3.24 3.148v5.292S5.72 24 12.086 24zm3.206-1.85a1.06 1.06 0 110-2.12 1.06 1.06 0 010 2.12z" />
        </svg>
      );

    case "JavaScript":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.405-.6-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.585-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
        </svg>
      );

    case "TypeScript":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 011.306.34v2.458a3.95 3.95 0 00-.643-.361 5.093 5.093 0 00-.717-.26 5.453 5.453 0 00-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 00-.623.242c-.17.104-.3.229-.393.374a.888.888 0 00-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 01-1.012 1.085 4.38 4.38 0 01-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 01-1.84-.164 5.544 5.544 0 01-1.512-.493v-2.63a5.033 5.033 0 003.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 00-.074-1.089 2.12 2.12 0 00-.537-.5 5.597 5.597 0 00-.807-.444 27.72 27.72 0 00-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 011.47-.629 7.536 7.536 0 011.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
        </svg>
      );

    case "HTML":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.071-.787.168-1.94.063-.726H6.383l.672 7.626h7.295l-.339 3.528-2.011.546-2.005-.546-.143-1.486H7.769l.24 3.26L12 17.813l3.985-1.063.652-7H8.531z" />
        </svg>
      );

    case "CSS":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.002l5.355-1.12.744-13.469z" />
        </svg>
      );

    case "PostgreSQL":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.128 0a10.134 10.134 0 00-2.755.403l-.063.02A10.922 10.922 0 0012.6.258C11.422.238 10.41.524 9.594 1 8.79.721 7.122.24 5.364.336 4.14.403 2.804.775 1.814 1.82.828 2.862.392 4.394.535 6.428c.04.582.156 1.486.4 2.617.244 1.13.624 2.48 1.16 3.758.537 1.28 1.22 2.468 2.14 3.288.458.41 1.01.726 1.64.807a2.148 2.148 0 001.633-.468c.32-.28.55-.634.727-1.005l.003.006c.317.41.693.67 1.097.823a3.345 3.345 0 001.266.243c.493 0 .952-.15 1.322-.39.006.06.008.114.017.173.09.672.2 1.29.37 1.844.17.556.405 1.067.779 1.46.373.393.926.627 1.555.627.564 0 1.052-.192 1.45-.467.4-.276.726-.637 1.013-1.038.576-.805 1.004-1.853 1.375-3.085.08-.263.15-.54.224-.828l.286.237c.453.366.958.646 1.526.77a3.58 3.58 0 001.773-.012c1.17-.327 1.955-1.15 2.386-2.108.43-.96.575-2.04.548-3.098a7.463 7.463 0 00-.096-.874c.164-.253.314-.518.44-.796.396-.887.603-1.9.468-2.94C23.638 3.24 22.56 1.628 20.478.864a7.594 7.594 0 00-2.488-.542l-.065-.005A8.97 8.97 0 0017.128 0zM16.95 1.307c.31.005.617.035.917.088h.002c.034.005.063.018.096.024l-.004.026c-.025.388.05.715.1 1.078.05.362.034.765-.18 1.196a1.07 1.07 0 01-.087.138c-.063-.02-.118-.048-.185-.065a3.146 3.146 0 00-.807-.12c-.067-.004-.13.004-.196.004-.218-.32-.48-.588-.773-.8a3.248 3.248 0 00-.73-.407 2.556 2.556 0 012.063-.092c-.09-.027-.177-.055-.27-.076l.056-.015a8.18 8.18 0 00-.002.02zm-5.037.262a4.397 4.397 0 011.678.437c.499.262.916.616 1.222 1.098-.254.1-.478.233-.665.404a3.324 3.324 0 00-.457.49 5.036 5.036 0 00-.718-.244c-.487-.125-1.02-.19-1.607-.175a6.611 6.611 0 00-1.6.262c-.16-.328-.376-.602-.63-.822l.005-.003c.417-.368.986-.638 1.68-.816a7.2 7.2 0 011.092-.19z" />
        </svg>
      );

    case "Cisco IOS":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1 7h2v4h-2V7zm-4 2h2v2H7V9zm8 0h2v2h-2V9zm-7 4h10v2H8v-2z" />
        </svg>
      );

    case "TCP/IP":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="2" />
          <circle cx="5" cy="19" r="2" />
          <circle cx="19" cy="19" r="2" />
          <path d="M12 7v4m0 0l-5.5 6M12 11l5.5 6" />
        </svg>
      );

    case "VLANs":
    case "Network Infrastructure":
    case "Network Configuration":
    case "Network Automation":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="22" height="6" rx="1" />
          <rect x="1" y="15" width="22" height="6" rx="1" />
          <path d="M12 9v6M6 9v6M18 9v6" />
          <circle cx="5" cy="6" r="1" fill="currentColor" stroke="none" />
          <circle cx="5" cy="18" r="1" fill="currentColor" stroke="none" />
        </svg>
      );

    case "SSH/Telnet":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="18" rx="2" />
          <path d="M6 8l4 4-4 4" />
          <path d="M12 16h6" />
        </svg>
      );

    case "Configuration Management":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
      );

    case "IP Camera Systems":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      );

    case "Vector Search":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
          <path d="M8 8l6 6M14 8l-6 6" />
        </svg>
      );

    case "LLMs":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a4 4 0 014 4c0 1.5-.8 2.7-2 3.4V12h3a4 4 0 014 4v1h-2v-1a2 2 0 00-2-2H7a2 2 0 00-2 2v1H3v-1a4 4 0 014-4h3V9.4A4 4 0 018 6a4 4 0 014-4z" />
          <circle cx="7" cy="20" r="2" />
          <circle cx="17" cy="20" r="2" />
          <circle cx="12" cy="20" r="2" />
        </svg>
      );

    case "Web Scraping":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      );

    case "Data Processing":
    case "File Processing":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        </svg>
      );

    case "Backend Architecture":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" />
          <circle cx="6" cy="6" r="1" fill="currentColor" stroke="none" />
          <circle cx="6" cy="18" r="1" fill="currentColor" stroke="none" />
        </svg>
      );

    case "Web APIs":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 18l6-6-6-6" />
          <path d="M8 6l-6 6 6 6" />
          <path d="M14.5 4l-5 16" />
        </svg>
      );

    case "CLI Tools":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="18" rx="2" />
          <path d="M6 8l4 4-4 4" />
          <path d="M12 16h6" />
        </svg>
      );

    case "OBS Studio":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12zm-1.326-8.246c.844.542 1.94.588 2.845.096L18.39 13.2a2.76 2.76 0 001.395-2.392v-1.62c0-.975-.528-1.87-1.38-2.346l-.222-.125a2.717 2.717 0 00-.32-.138c-1.092-.387-2.324-.12-3.166.648l-.01.01a3.252 3.252 0 00-.598-.628c-.86-.686-2.034-.853-3.06-.405l-4.9 2.65a2.76 2.76 0 00-1.473 2.44v1.563c0 .975.528 1.87 1.38 2.346a2.76 2.76 0 002.695.105L12 13.5l-1.326 2.254z" />
        </svg>
      );

    case "Helpdesk Support":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      );

    default:
      return null;
  }
}

// ─── Tech Card ────────────────────────────────────────────────────────────────

function TechCard({
  tech,
  index,
}: {
  tech: TechItem;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<"above" | "below">("above");
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHovered && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setTooltipPos(rect.top < 140 ? "below" : "above");
    }
  }, [isHovered]);

  const icon = TechIcon({ name: tech.name });

  return (
    <div className="relative" ref={cardRef}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        tabIndex={0}
        role="button"
        aria-label={`${tech.name} — used in ${tech.sources.join(", ")}`}
        className={`
          flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5
          font-mono border rounded-sm cursor-default select-none
          transition-all duration-300 ease-out
          ${
            isHovered
              ? "border-white/30 bg-white/[0.06] text-white"
              : "border-white/10 bg-white/[0.02] text-white/60"
          }
        `}
        style={{ animationDelay: `${index * 30}ms` }}
      >
        {icon && (
          <span
            className={`transition-colors duration-300 ${
              isHovered ? "text-white/80" : "text-white/30"
            }`}
          >
            {icon}
          </span>
        )}
        <span className="text-sm tracking-wide">{tech.name}</span>
      </div>

      {/* Tooltip */}
      {isHovered && (
        <div
          className={`
            absolute left-1/2 -translate-x-1/2 z-50
            px-3 py-2 bg-[#141414] border border-white/15 rounded-md
            text-xs font-mono text-white/70 whitespace-nowrap
            shadow-lg pointer-events-none animate-fade-in
            ${tooltipPos === "above" ? "bottom-full mb-2" : "top-full mt-2"}
          `}
        >
          <div className="text-white/40 mb-1">Used in:</div>
          {tech.sources.map((source, i) => (
            <div key={i} className="text-white/70">
              {source}
            </div>
          ))}
          <div
            className={`
              absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-[#141414] border-white/15 rotate-45
              ${tooltipPos === "above" ? "bottom-0 translate-y-1/2 border-r border-b" : "top-0 -translate-y-1/2 border-l border-t"}
            `}
          />
        </div>
      )}
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function TechStack() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredCategories = activeFilter
    ? categorizedData.filter((c) => c.category === activeFilter)
    : categorizedData;

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
                    <TechCard
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

        {/* Legend */}
        <AnimateOnScroll delay={400}>
          <div className="mt-12 pt-8 border-t border-white/5">
            <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-white/30">
              <span>Hover for context</span>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
