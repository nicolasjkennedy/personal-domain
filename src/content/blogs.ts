export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "welcome-to-my-blog",
    title: "Welcome to My Blog",
    description:
      "A quick intro to why I'm starting this blog and what you can expect to find here.",
    date: "2026-02-02",
    tags: ["Personal", "Announcement"],
    content: `
Starting a blog has been on my to-do list for a while now. As someone who's constantly building, learning, and tinkering with new technologies, I figured it was time to start writing some of it down.

## What to Expect

This blog will be a mix of:

- **Technical deep-dives** — breakdowns of projects I'm working on, tools I'm using, and problems I've solved.
- **Lessons learned** — things I wish I knew earlier, from networking to full-stack development.
- **Project updates** — progress on Service Surfer, open-source tools, and whatever else I'm building.

## Why Write?

Writing forces you to actually understand what you're doing. If you can explain something clearly, you probably know it well. Plus, if anything I share helps someone else out — that's a win.

Stay tuned for more posts. Thanks for reading.
    `.trim(),
  }
];
