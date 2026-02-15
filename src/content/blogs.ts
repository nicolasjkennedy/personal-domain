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

//blog posting area so that I can show what im doing, or like what events i went to, projects etc.
export const blogPosts: BlogPost[] = [
  {
    slug: "first-blog-post",
    title: "First Blog Post",
    description:
      "This is my first blog post, testing it out.",
    date: "2026-02-14",
    tags: ["Testing"],
    content: `
This is my first blog post. 

Testing testing, 1, 2, 3...

Okay I think its working.

On a side note, I am going to use this blog for technical things but also just whatever is on my mind. More than likely more technical and life lessons than anything else.
    `.trim(),
  }
];
