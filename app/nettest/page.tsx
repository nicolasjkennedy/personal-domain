import Link from "next/link";
import type { Metadata } from "next";
import BlogNavigation from "@/components/BlogNavigation";
import { netTest } from "@/src/content/nettest";

export const metadata: Metadata = {
  title: "NetTest | Nicolas Kennedy",
  description: netTest.subtitle,
};

const roadmapStatus = {
  active: { label: "In Progress", className: "text-green-400 border-green-400/30 bg-green-400/10" },
  next: { label: "Up Next", className: "text-blue-400 border-blue-400/30 bg-blue-400/10" },
  planned: { label: "Planned", className: "opacity-50 border-foreground/20" },
};

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-6">
      <span className="text-xs opacity-40">{label}</span>
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{title}</h2>
    </div>
  );
}

export default function NetTestPage() {
  const p = netTest;

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
              {p.title}
            </h1>
            <p className="text-lg opacity-80 mb-6">{p.subtitle}</p>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-2.5 py-0.5 text-[10px] font-mono tracking-wide rounded-sm border text-green-400 border-green-400/30 bg-green-400/10">
                {p.status}
              </span>
              <span className="px-2.5 py-0.5 text-[10px] font-mono tracking-wide rounded-sm border text-blue-400 border-blue-400/30 bg-blue-400/10">
                Open Source
              </span>
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono opacity-70 hover:opacity-100 border-b border-foreground/20 hover:border-foreground/40 transition-colors"
              >
                GitHub →
              </a>
            </div>
            <div className="border-b border-foreground/10" />
          </header>

          <div className="font-mono animate-fade-in-up stagger-2 max-w-3xl space-y-14">
            <section id="overview" className="scroll-mt-28">
              <SectionHeading label="01" title="Overview" />
              {p.overview.map((para, i) => (
                <p key={i} className="text-sm sm:text-base opacity-80 leading-relaxed mb-6">
                  {para}
                </p>
              ))}
            </section>

            <section id="specs" className="scroll-mt-28">
              <SectionHeading label="02" title="Spec Sheet" />
              <dl className="border border-foreground/10 rounded-sm divide-y divide-foreground/10">
                {p.specs.map((row) => (
                  <div key={row.label} className="grid sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 px-4 py-3">
                    <dt className="text-xs sm:text-sm opacity-50">{row.label}</dt>
                    <dd className="text-sm sm:text-base opacity-80">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="tests" className="scroll-mt-28">
              <SectionHeading label="03" title="Test Sequence" />
              <p className="text-sm sm:text-base opacity-80 leading-relaxed mb-6">
                Everything the LinkSprinter checks, run in order from the physical layer up. More tests are still being scoped.
              </p>
              <ol className="border border-foreground/10 rounded-sm divide-y divide-foreground/10">
                {p.tests.map((test, i) => (
                  <li key={test.name} className="flex gap-4 px-4 py-3">
                    <span className="text-xs opacity-40 pt-1 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-sm sm:text-base font-bold">{test.name}</p>
                      <p className="text-sm opacity-70 leading-relaxed">{test.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section id="screen" className="scroll-mt-28">
              <SectionHeading label="04" title="On the Screen" />
              <p className="text-sm sm:text-base opacity-80 leading-relaxed mb-6">
                More than pass / fail lights: the display shows the details you&apos;d normally have to log into a switch to find.
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 pl-4">
                {p.screenInfo.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm sm:text-base opacity-80 leading-relaxed">
                    <span className="opacity-40 mt-1.5 text-xs">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="how-it-works" className="scroll-mt-28">
              <SectionHeading label="05" title="How It Works" />
              {p.howItWorks.map((para, i) => (
                <p key={i} className="text-sm sm:text-base opacity-80 leading-relaxed mb-6">
                  {para}
                </p>
              ))}
            </section>

            <section id="limitations" className="scroll-mt-28">
              <SectionHeading label="06" title="Known Limitations" />
              <p className="text-sm sm:text-base opacity-80 leading-relaxed mb-6">
                Building on a sub-$100 ESP32 comes with tradeoffs. These are the ones I know about so far.
              </p>
              <ul className="space-y-4">
                {p.limitations.map((item) => (
                  <li key={item.title} className="border border-foreground/10 rounded-sm px-4 py-3">
                    <p className="text-sm sm:text-base font-bold mb-1">{item.title}</p>
                    <p className="text-sm opacity-70 leading-relaxed">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section id="roadmap" className="scroll-mt-28">
              <SectionHeading label="07" title="Roadmap" />
              <ol className="space-y-4">
                {p.roadmap.map((item) => (
                  <li key={item.title} className="border-l-2 border-foreground/10 pl-4">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <p className="text-sm sm:text-base font-bold">{item.title}</p>
                      <span
                        className={`px-2 py-0.5 text-[10px] tracking-wide rounded-sm border ${roadmapStatus[item.status].className}`}
                      >
                        {roadmapStatus[item.status].label}
                      </span>
                    </div>
                    <p className="text-sm opacity-70 leading-relaxed">{item.detail}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section id="why" className="scroll-mt-28">
              <SectionHeading label="08" title="Why I'm Building It" />
              {p.why.map((para, i) => (
                <p key={i} className="text-sm sm:text-base opacity-80 leading-relaxed mb-6">
                  {para}
                </p>
              ))}
            </section>

            <div className="pt-8 border-t border-foreground/10 flex flex-wrap gap-6">
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 text-sm opacity-50 hover:opacity-80 transition-opacity"
              >
                ← Back to Projects
              </Link>
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm opacity-50 hover:opacity-80 transition-opacity"
              >
                Follow along on GitHub →
              </a>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
