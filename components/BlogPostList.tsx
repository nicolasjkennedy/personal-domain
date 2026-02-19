"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { type BlogPost, getReadingTime } from "@/src/content/blogs";

interface BlogPostListProps {
  posts: BlogPost[];
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostList({ posts }: BlogPostListProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);

  // Collect all unique tags sorted alphabetically
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
  }, [posts]);

  // Count posts per tag
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    posts.forEach((post) =>
      post.tags.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      })
    );
    return counts;
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) return posts;
    return posts.filter((post) =>
      selectedTags.every((tag) => post.tags.includes(tag))
    );
  }, [posts, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearTags = () => setSelectedTags([]);

  return (
    <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12 xl:gap-16">
      {/* ── Sidebar (desktop) / Dropdown (mobile) ── */}
      <aside>
        {/* Mobile toggle button */}
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="lg:hidden flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity mb-6 border border-white/15 px-4 py-2"
        >
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${filterOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
          Filter by Tag
          {selectedTags.length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-white/10 border border-white/20 rounded-sm">
              {selectedTags.length}
            </span>
          )}
        </button>

        {/* Tag list — always visible on desktop, toggleable on mobile */}
        <div
          className={`${
            filterOpen ? "block" : "hidden"
          } lg:block mb-10 lg:mb-0`}
        >
          <div className="lg:sticky lg:top-28">
            <h3 className="text-xs uppercase tracking-widest opacity-40 mb-4">
              Tags
            </h3>

            {/* All / clear button */}
            <button
              onClick={clearTags}
              className={`block w-full text-left text-sm py-1.5 transition-all duration-200 ${
                selectedTags.length === 0
                  ? "opacity-100 text-[#f5f5f5]"
                  : "opacity-50 hover:opacity-80"
              }`}
            >
              All Posts
              <span className="ml-2 text-xs opacity-40">{posts.length}</span>
            </button>

            <div className="border-b border-white/5 my-2" />

            {/* Tag buttons */}
            <div className="space-y-0.5">
              {allTags.map((tag) => {
                const isActive = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`group flex items-center justify-between w-full text-left text-sm py-1.5 transition-all duration-200 ${
                      isActive
                        ? "opacity-100 text-[#f5f5f5]"
                        : "opacity-50 hover:opacity-80"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`inline-block w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                          isActive ? "bg-white" : "bg-white/25 group-hover:bg-white/50"
                        }`}
                      />
                      {tag}
                    </span>
                    <span className="text-xs opacity-40">{tagCounts[tag]}</span>
                  </button>
                );
              })}
            </div>

            {/* Active filter chips */}
            {selectedTags.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className="flex items-center gap-1.5 px-2.5 py-1 text-xs border border-white/20 bg-white/5 hover:bg-white/10 transition-colors rounded-sm"
                    >
                      {tag}
                      <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  ))}
                  <button
                    onClick={clearTags}
                    className="text-xs opacity-40 hover:opacity-70 transition-opacity underline underline-offset-2"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ── Post list ── */}
      <div>
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm opacity-50 mb-4">
              No posts match the selected tags.
            </p>
            <button
              onClick={clearTags}
              className="text-sm opacity-60 hover:opacity-100 transition-opacity border border-white/20 px-4 py-2"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}/`}
                className="group block border border-white/10 p-8 lg:p-10 hover:border-white/25 hover:scale-[1.01] transition-all duration-300 animate-fade-in-up"
                style={{
                  animationDelay: `${(index + 2) * 100}ms`,
                  opacity: 0,
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight group-hover:opacity-90 transition-opacity">
                    {post.title}
                  </h2>
                  <div className="flex items-center gap-3 whitespace-nowrap pt-1">
                    <time className="text-sm opacity-50">
                      {formatDate(post.date)}
                    </time>
                    <span className="text-xs opacity-40">
                      {getReadingTime(post.content)}
                    </span>
                  </div>
                </div>
                <p className="text-sm sm:text-base opacity-70 leading-relaxed mb-4">
                  {post.description}
                </p>
                {/* Thumbnail preview if post has images */}
                {post.images && post.images.length > 0 && (
                  <div className="flex gap-2 mb-4 overflow-hidden">
                    {post.images.slice(0, 3).map((img, i) => (
                      <div
                        key={i}
                        className="w-20 h-14 flex-shrink-0 overflow-hidden border border-white/10 opacity-60 group-hover:opacity-80 transition-opacity"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {post.images.length > 3 && (
                      <div className="w-20 h-14 flex-shrink-0 border border-white/10 flex items-center justify-center opacity-50">
                        <span className="text-xs">
                          +{post.images.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 text-xs border rounded-sm transition-colors duration-200 ${
                        selectedTags.includes(tag)
                          ? "border-white/40 opacity-90 bg-white/5"
                          : "border-white/20 opacity-60"
                      }`}
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
    </div>
  );
}
