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
||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
slug:               #this is what is in the url, so it has to be unique, and it should be something that describes the content of the blog post, and it should be easy to remember.
title:              #this is the title of the blog post, it should be something that grabs the attention of the reader and makes them want to read the post.
description:        #this is a short summary of the blog post, it should be something that gives the reader an idea of what the post is about and makes them want to read it.
date:               #this is the date that the blog post was published, it should be in the format of YYYY-MM-DD, and it should be the date that the post was actually published, not the date that it was written.
tags:               #this is an array of tags that are relevant to the blog post, it should be something that describes the content of the post and makes it easier for people to find the post when they are searching for something related to it.
content:            #this is the actual content of the blog post, it should be something that is well written and easy to read, it should be something that provides value to the reader and makes them want to read more of your posts.
images:             #this is an array of images that are relevant to the blog post, it should be something that enhances the content of the post and makes it more visually appealing, it should be something that is relevant to the content of the post and adds value to the reader, it should also have a caption that describes the image and its relevance to the content of the post.
||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
this is how to make the actual blog post: fill out all of the fields in the BlogPost interface, and then add it to the blogPosts array. Make sure that the slug is unique and that the date is in the correct format. Also, make sure that the content is well written and provides value to the reader. If you want to add images, make sure that they are relevant to the content of the post and that they have a caption that describes their relevance to the content of the post.
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
I am excited to announce the release of my first open-source software project, n0conflict. n0conflict is an AI-powered merge conflict resolver that uses machine learning algorithms to analyze code changes and automatically resolve merge conflicts in a way that minimizes the risk of introducing bugs or errors.

I've been really interested in open-source software recently, and I wanted to create something that could be useful to other developers. Merge conflicts are a common problem that developers face when working on collaborative projects, and I wanted to create a tool that could help make the process of resolving them easier and more efficient.

n0conflict is designed to be easy to use and integrate into existing workflows. It can be used as a standalone tool or integrated into popular version control systems like Git. The tool uses machine learning algorithms to analyze code changes and automatically resolve merge conflicts in a way that minimizes the risk of introducing bugs or errors.

I am really proud of this project and I hope that it can be useful to other developers. If you're interested in learning more about n0conflict or want to contribute to the project, you can check out the GitHub repository.

You can install n0conflict using pip: pip install n0conflict
    
`.trim(),

  
  }
  
];
