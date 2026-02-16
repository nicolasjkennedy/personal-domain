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
    slug: "introduction",
    title: "whoami",
    description:
      "whoami",
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

    `.trim(),
  }
];
