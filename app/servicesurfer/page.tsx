import Link from "next/link";
import type { Metadata } from "next";
import BlogNavigation from "@/components/BlogNavigation";
import { serviceSurferStory } from "@/src/content/servicesurfer";

export const metadata: Metadata = {
  title: "ServiceSurfer | Nicolas Kennedy",
  description: serviceSurferStory.subtitle,
};

export default function ServiceSurferPage() {
  const story = serviceSurferStory;

  return (
    <main className="min-h-screen">
      <BlogNavigation />

      <article className="pt-32 lg:pt-40 pb-20 lg:pb-32 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-mono opacity-50 hover:opacity-80 transition-opacity mb-10 animate-fade-in"
          >
            ← Back to Projects
          </Link>

          <header className="mb-12 lg:mb-16 animate-fade-in-up max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              {story.title}
            </h1>
            <p className="text-lg opacity-80 mb-6">{story.subtitle}</p>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="text-sm font-mono opacity-50">{story.role}</span>
              <span className="text-sm font-mono opacity-50">· {story.years}</span>
            </div>
            <div className="border-b border-foreground/10" />
          </header>

          <div className="font-mono animate-fade-in-up stagger-2 max-w-3xl">
            {story.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="mb-14 scroll-mt-28"
              >
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-xs opacity-40">{section.label}</span>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                    {section.title}
                  </h2>
                </div>
                {section.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-sm sm:text-base opacity-80 leading-relaxed mb-6"
                  >
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="space-y-2 mb-6 pl-4">
                    {section.bullets.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm sm:text-base opacity-80 leading-relaxed"
                      >
                        <span className="opacity-40 mt-1.5 text-xs">●</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <div className="mt-16 pt-8 border-t border-foreground/10">
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 text-sm font-mono opacity-50 hover:opacity-80 transition-opacity"
              >
                ← Back to Projects
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
