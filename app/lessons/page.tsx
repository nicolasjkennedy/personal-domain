import Link from "next/link";
import BlogNavigation from "@/components/BlogNavigation";

export const metadata = {
  title: "Lessons | Nicolas Kennedy",
  description:
    "Free networking study guides by a working network engineer. Structured, resource-curated guides covering CCNA and beyond.",
};

export default function LessonsPage() {
  return (
    <main className="min-h-screen">
      <BlogNavigation />

      <section className="pt-32 lg:pt-40 pb-20 lg:pb-32 px-6 sm:px-8 lg:px-12 font-mono">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4 animate-fade-in-up">
            Lessons
          </h1>
          <p className="text-base sm:text-lg opacity-60 mb-16 lg:mb-20 animate-fade-in-up stagger-2">
            Structured, resource-curated study guides by a working network engineer.
          </p>

          {/* Course Cards */}
          <div className="space-y-6 animate-fade-in-up stagger-3">
            {/* CCNA Card */}
            <div className="border border-foreground/10 rounded-sm p-6 sm:p-8 hover:border-foreground/25 transition-colors duration-300">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono opacity-40 uppercase tracking-widest">
                      Course
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 border border-foreground/20 opacity-60">
                      Free
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                    CCNA 200-301 Study Guide
                  </h2>
                  <p className="text-sm sm:text-base opacity-60 leading-relaxed max-w-2xl">
                    A comprehensive, free 16-week study guide covering all CCNA exam objectives.
                    Weekly video playlists, hands-on labs, CLI references, and practice questions.
                  </p>
                </div>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-6 mb-6 border-t border-foreground/10 pt-5">
                <div>
                  <div className="text-xl font-bold tracking-tight">16</div>
                  <div className="text-xs opacity-40 uppercase tracking-widest mt-0.5">Weeks</div>
                </div>
                <div className="border-l border-foreground/10 pl-6">
                  <div className="text-xl font-bold tracking-tight">~$330</div>
                  <div className="text-xs opacity-40 uppercase tracking-widest mt-0.5">Exam Cost</div>
                </div>
                <div className="border-l border-foreground/10 pl-6">
                  <div className="text-xl font-bold tracking-tight">Free</div>
                  <div className="text-xs opacity-40 uppercase tracking-widest mt-0.5">This Guide</div>
                </div>
              </div>

              {/* Topics preview */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  "Subnetting",
                  "OSPF",
                  "VLANs",
                  "ACLs",
                  "DHCP/DNS",
                  "Wireless",
                  "Switch Security",
                  "Automation",
                ].map((topic) => (
                  <span
                    key={topic}
                    className="text-xs font-mono px-2 py-1 border border-foreground/15 opacity-50"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <Link
                href="/lessons/ccna"
                className="inline-flex items-center gap-2 text-sm font-mono font-medium border border-foreground/30 px-5 py-2.5 hover:border-foreground/60 hover:opacity-100 opacity-80 transition-all duration-200"
              >
                Start CCNA Study Guide →
              </Link>
            </div>

            {/* Placeholder for future courses */}
            <div className="border border-foreground/5 rounded-sm p-6 sm:p-8 opacity-40">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono uppercase tracking-widest">Coming Soon</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight mb-2">More guides in progress</h2>
              <p className="text-sm opacity-70">
                Network+ study guide and Python for network engineers are planned.
              </p>
            </div>
          </div>

          {/* Footer attribution */}
          <p className="text-xs opacity-30 mt-20 font-mono">
            Built by Nicolas Kennedy, Level 2 Network Technician at URI ITS &middot; Python Certified
          </p>
        </div>
      </section>
    </main>
  );
}
