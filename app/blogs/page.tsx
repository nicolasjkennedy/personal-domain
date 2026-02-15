import { blogPosts } from "@/src/content/blogs";
import BlogNavigation from "@/components/BlogNavigation";
import BlogPostList from "@/components/BlogPostList";

export const metadata = {
  title: "Blog | Nicolas Kennedy",
  description: "Thoughts on engineering, networking, and building things.",
};

export default function BlogsPage() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="min-h-screen">
      <BlogNavigation />

      <section className="pt-32 lg:pt-40 pb-20 lg:pb-32 px-6 sm:px-8 lg:px-12 font-mono">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4 animate-fade-in-up">
            Blog
          </h1>
          <p className="text-base sm:text-lg opacity-60 mb-16 lg:mb-20 animate-fade-in-up stagger-2">
            Thoughts on engineering, networking, and building things.
          </p>

          <BlogPostList posts={sortedPosts} />
        </div>
      </section>
    </main>
  );
}
