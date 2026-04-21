"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import BlogNavigation from "@/components/BlogNavigation";

const NAV_ITEMS = [
  { href: "/lessons/ccna", label: "Dashboard", exact: true },
  { href: "/lessons/ccna/study", label: "Study" },
  { href: "/lessons/ccna/flashcards", label: "Flashcards" },
  { href: "/lessons/ccna/quiz", label: "Quiz" },
  { href: "/lessons/ccna/commands", label: "Commands" },
  { href: "/lessons/ccna/progress", label: "Progress" },
];

export default function CCNALayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen">
      <BlogNavigation />
      <div className="pt-20 lg:pt-24">
        <nav className="border-b border-foreground/10 sticky top-16 z-30 bg-background/95 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-4 flex overflow-x-auto scrollbar-hide">
            {NAV_ITEMS.map(({ href, label, exact }) => {
              const isActive = exact
                ? pathname === href || pathname === href + "/"
                : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex-shrink-0 text-xs font-mono px-4 py-3 border-b-2 transition-all ${
                    isActive
                      ? "border-foreground/70 opacity-100"
                      : "border-transparent opacity-40 hover:opacity-70"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </nav>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
          {children}
        </div>
      </div>
    </main>
  );
}
