import Link from "next/link";
import { blogPosts } from "@/src/content/blogs";
import BlogNavigation from "@/components/BlogNavigation";

export const metadata = {
  title: "Blog | Nicolas Kennedy",
  description: "Thoughts on engineering, networking, and building things.",
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogsPage() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="min-h-screen">
      <BlogNavigation />

      <section className="pt-32 lg:pt-40 pb-20 lg:pb-32 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4 animate-fade-in-up">
            Blog
          </h1>
          <p className="text-lg sm:text-xl opacity-60 mb-16 lg:mb-20 animate-fade-in-up stagger-2">
            Thoughts on engineering, networking, and building things.
          </p>

          {sortedPosts.length === 0 ? (
            <p className="text-lg opacity-50">No posts yet. Check back soon.</p>
          ) : (
            <div className="space-y-8">
              {sortedPosts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}/`}
                  className="group block border border-white/10 p-8 lg:p-10 hover:border-white/25 hover:scale-[1.01] transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${(index + 2) * 100}ms`, opacity: 0 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight group-hover:opacity-90 transition-opacity">
                      {post.title}
                    </h2>
                    <time className="text-sm font-mono opacity-50 whitespace-nowrap pt-1">
                      {formatDate(post.date)}
                    </time>
                  </div>
                  <p className="text-base sm:text-lg opacity-70 leading-relaxed mb-4">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-mono border border-white/20 rounded-sm opacity-60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-block mt-4 text-sm opacity-50 group-hover:opacity-80 transition-opacity">
                    Read more →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
