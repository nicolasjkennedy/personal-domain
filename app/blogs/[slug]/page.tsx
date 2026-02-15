import Link from "next/link";
import { blogPosts } from "@/src/content/blogs";
import BlogNavigation from "@/components/BlogNavigation";
import BlogImageGallery from "@/components/BlogImageGallery";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface BlogPostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Nicolas Kennedy`,
    description: post.description,
  };
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentParagraph: string[] = [];
  let currentList: string[] = [];
  let key = 0;

  const processInline = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\))/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      if (match[2]) {
        parts.push(
          <strong key={`b-${match.index}`} className="font-semibold text-[#f5f5f5]">
            {match[2]}
          </strong>
        );
      } else if (match[3]) {
        parts.push(<em key={`i-${match.index}`}>{match[3]}</em>);
      } else if (match[4] && match[5]) {
        parts.push(
          <a
            key={`a-${match.index}`}
            href={match[5]}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-white/30 hover:border-white/60 transition-colors"
          >
            {match[4]}
          </a>
        );
      }
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    return parts.length > 0 ? parts : [text];
  };

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(" ");
      if (text.trim()) {
        elements.push(
          <p key={key++} className="text-sm sm:text-base opacity-80 leading-relaxed mb-6">
            {processInline(text)}
          </p>
        );
      }
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={key++} className="space-y-2 mb-6 pl-4">
          {currentList.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm sm:text-base opacity-80 leading-relaxed"
            >
              <span className="text-white/40 mt-1.5 text-xs">●</span>
              <span>{processInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === "") {
      flushList();
      flushParagraph();
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushList();
      flushParagraph();
      elements.push(
        <h2 key={key++} className="text-xl sm:text-2xl font-bold tracking-tight mt-10 mb-4">
          {trimmed.slice(3)}
        </h2>
      );
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushList();
      flushParagraph();
      elements.push(
        <h3 key={key++} className="text-lg sm:text-xl font-bold tracking-tight mt-8 mb-3">
          {trimmed.slice(4)}
        </h3>
      );
      continue;
    }

    if (trimmed.startsWith("- ")) {
      flushParagraph();
      currentList.push(trimmed.slice(2));
      continue;
    }

    flushList();
    currentParagraph.push(trimmed);
  }

  flushList();
  flushParagraph();

  return elements;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const hasImages = post.images && post.images.length > 0;

  return (
    <main className="min-h-screen">
      <BlogNavigation />

      <article className="pt-32 lg:pt-40 pb-20 lg:pb-32 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Back link */}
          <Link
            href="/blogs/"
            className="inline-flex items-center gap-2 text-sm font-mono opacity-50 hover:opacity-80 transition-opacity mb-10 animate-fade-in"
          >
            ← Back to Blog
          </Link>

          {/* Header — always full width */}
          <header className="mb-12 lg:mb-16 animate-fade-in-up max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <time className="text-sm font-mono opacity-50">
                {formatDate(post.date)}
              </time>
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
            </div>
            <div className="border-b border-white/10" />
          </header>

          {/* Mobile images — shown above content on small screens */}
          {hasImages && (
            <div className="xl:hidden mb-12 animate-fade-in-up stagger-2">
              <BlogImageGallery images={post.images!} layout="horizontal" />
            </div>
          )}

          {/* Content + Sidebar layout */}
          <div
            className={`${
              hasImages
                ? "xl:grid xl:grid-cols-[1fr_360px] xl:gap-16"
                : ""
            }`}
          >
            {/* Blog content — monospaced */}
            <div className="font-mono animate-fade-in-up stagger-2 max-w-3xl">
              {renderMarkdown(post.content)}

              {/* Footer */}
              <div className="mt-16 pt-8 border-t border-white/10">
                <Link
                  href="/blogs/"
                  className="inline-flex items-center gap-2 text-sm font-mono opacity-50 hover:opacity-80 transition-opacity"
                >
                  ← Back to Blog
                </Link>
              </div>
            </div>

            {/* Desktop image sidebar — sticky */}
            {hasImages && (
              <aside className="hidden xl:block animate-fade-in-up stagger-3">
                <div className="sticky top-28">
                  <BlogImageGallery images={post.images!} layout="vertical" />
                </div>
              </aside>
            )}
          </div>
        </div>
      </article>
    </main>
  );
}
