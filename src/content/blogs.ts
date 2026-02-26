export interface BlogImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
  images?: BlogImage[];
}
/*
================================================================================
  BLOG POST GUIDE
================================================================================

FIELDS
------
slug        - URL path (must be unique, e.g. "my-first-post")
title       - Post title shown on the page
description - Short summary shown in previews/listings
date        - Publish date in YYYY-MM-DD format
tags        - Array of relevant tags, e.g. ["open-source", "project"]
content     - Full post body written in Markdown (see below)
images      - Optional array of { src, alt, caption? } objects

HOW TO ADD A POST
-----------------
Copy this template and add it to the top of the blogPosts array:

  {
    slug: "your-slug-here",
    title: "Your Title Here",
    description: "A short summary of the post.",
    date: "YYYY-MM-DD",
    tags: ["tag1", "tag2"],
    content: `
Your content here...
    `.trim(),
  },

MARKDOWN FORMATTING (for the content field)
--------------------------------------------
The content field supports Markdown. Here are the most useful patterns:

  ## Section Header       →  <h2>
  ### Smaller Header      →  <h3>

  **bold text**           →  bold
  *italic text*           →  italic

  - item one              →  bullet list
  - item two

  1. first                →  numbered list
  2. second

  `inline code`           →  inline code snippet

  ```bash                 →  fenced code block (specify language for highlighting)
  pip install something
  ```

  [link text](https://url)  →  hyperlink

  Leave a blank line between paragraphs — single line breaks are ignored.

================================================================================
*/

//This is a function that calculates the reading time.
export function getReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 230));
  return `${minutes} min read`;
}

//blog posting area so that I can show what im doing, or like what events i went to, projects etc.
export const blogPosts: BlogPost[] = [
  {
    slug: "introduction",
    title: "whoami",
    description:" ",
    date: "2026-02-15",
    tags: ["intro"],
    content: `
Hello, my name is Nicolas as you can probably guess since you are on my website.

I made this website because I plan to make things, and I want to showcase them in one place that isn't linkedin, because, I hate Linkedin.

If you know me personally, then you know I am always talking about something. The truth is, my brain is always running at full speed. Most of the time its nonsense, but sometimes its really great ideas.
For awhile now, I've had ideas but didn't really understand how to take the next step. I always tried to do these things on my own, and I always failed. In my sophmore year of uni, I made a good friend
and when I came to him with a business idea, he had the technical know-how to help me figure out how we are going to make it work. 

My current position in life is that I am trying to figure out what God's purpose is for me on this earth. Is it to make a product that improves peoples lives? Is it to become a chaplain like my father? (I dont think I would be a very good one, my dad is amazing at what he does)
 Is it to have a successful career in network engineering and do something on top of that? I don't know. But, I am doing everything I can right now to make sure that I live up to my potential.

I am currently getting my BS in Computer Engineering doing 18 credits right now (I already had 60 credits done by freshman year), working in the schools IT networking department as a level 2 network technician, and starting a company from scratch with a close friend of mine. 
Needless to say, I am very busy, but I am blessed. 

I am excited for my future, I want to make real impact and improve lives in a way that glorifies Jesus. I am still growing in my faith and I do want to make sure that my priorities are focused on the correct things.

Also I feel like if I can keep this of a log of what I am doing throughout my life, I think it will be really cool to look back when I am old and all of that.

Internet archive type of thing, hopefully if I keep it updated, if I die someone can keep it running.

I guess I have to be an exceptional person for that to happen, but hey, you never know.



    `.trim(),
  }, 
  {
  slug: "n0conflict",
  title: "pip install n0conflict",
  description: "n0conflict - an AI powered merge conflict resolver",
  date: "2026-02-26",
  tags: ["open-source","n0conflict"],
  content:`
I am excited to announce the release of my first open-source software project, **n0conflict** — an AI-powered merge conflict resolver that automatically resolves merge conflicts to minimize the risk of introducing bugs or errors.

## How It Works

\`\`\`
START: Developer has a merge conflict in a file

         ↓

  Run: n0conflict resolve app.py --write

         ↓

  Opens the file and finds the conflict markers

         ↓

  Pulls out both versions of the conflicting code

         ↓

  Sends both versions to Claude (Anthropic's AI) with instructions

         ↓

  Claude reads both sides and writes a merged version that preserves both

         ↓

  Writes the result back to the file

         ↓

END: The conflict is gone
\`\`\`

## Why Open Source?

I've been really interested in open-source software recently, and I wanted to create something useful for other developers. Merge conflicts are a pain point everyone hits on collaborative projects — I wanted to make resolving them easier and less error-prone.

The idea of open-source is such a cool thing to me: people volunteering to make the world a better place. What most people don't realize is that the entire internet is basically propped up on software that people weren't even paid to create or maintain.

## Getting Started

n0conflict is designed to be easy to use and drop into existing workflows. It works as a standalone tool or alongside Git.

\`\`\`bash
pip install n0conflict
\`\`\`

I'm really proud of this project and I hope it's useful to other developers. If you're interested in learning more or want to contribute, check out the GitHub repository.

If you want to talk about it, I'd love to chat — reach out at nicolasjameskennedy@gmail.com
`.trim(),

  
  }
  
];
