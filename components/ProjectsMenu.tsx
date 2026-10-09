"use client";

import Link from "next/link";
import { siteContent } from "@/src/content/site";

// Projects with their own page get a dropdown entry under "Projects"
export const projectPages = siteContent.projects
  .filter((p) => p.page)
  .map((p) => ({ label: p.name, href: p.page! }));

interface ProjectsMenuProps {
  active: boolean;
  // On the homepage, "All Projects" scrolls in place instead of navigating
  onAllProjects?: () => void;
  style?: React.CSSProperties;
}

const itemClass =
  "block w-full text-left px-4 py-2 text-sm font-medium tracking-wide opacity-60 hover:opacity-100 hover:bg-foreground/5 focus-visible:opacity-100 focus-visible:bg-foreground/5 outline-none transition-all duration-200";

export default function ProjectsMenu({ active, onAllProjects, style }: ProjectsMenuProps) {
  return (
    <div className="relative group" style={style}>
      {onAllProjects ? (
        <button
          onClick={onAllProjects}
          aria-haspopup="true"
          className={`text-sm lg:text-base font-medium tracking-wide transition-all duration-300 group-hover:opacity-100 ${
            active ? "opacity-100 border-b border-foreground" : "opacity-60"
          }`}
        >
          Projects
        </button>
      ) : (
        <Link
          href="/#projects"
          aria-haspopup="true"
          className={`text-sm lg:text-base font-medium tracking-wide transition-all duration-300 group-hover:opacity-100 ${
            active ? "opacity-100 border-b border-foreground" : "opacity-60"
          }`}
        >
          Projects
        </Link>
      )}

      {/* pt-3 bridges the gap so the menu stays open while the cursor moves into it */}
      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-all duration-200">
        <div className="min-w-[180px] py-2 bg-background border border-foreground/10 rounded-sm shadow-lg">
          {onAllProjects ? (
            <button onClick={onAllProjects} className={itemClass}>
              All Projects
            </button>
          ) : (
            <Link href="/#projects" className={itemClass}>
              All Projects
            </Link>
          )}
          {projectPages.map((page) => (
            <Link key={page.href} href={page.href} className={itemClass}>
              {page.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
