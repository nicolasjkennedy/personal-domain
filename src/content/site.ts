export interface SocialLinks {
  linkedin?: string;
  github?: string;
  email?: string;
  resume?: string;
  website?: string;
}

export interface Education {
  school: string;
  degree: string;
  dates: string;
  highlights: string[];
}

export interface Experience {
  company: string;
  role: string;
  dates: string;
  bullets: string[];
  tech?: string[];
}

export interface Project {
  name: string;
  oneLiner: string;
  description: string;
  tech: string[];
  links?: {
    github?: string;
    live?: string;
    pypi?: string;
    caseStudy?: string;
  };
  featured?: boolean;
  sourceType?: "open" | "closed" | "inDevelopment";
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialLink?: string;
}

export interface SiteContent {
  name: string;
  headline: string;
  summary: string[];
  location: string;
  currently: string;
  socials: SocialLinks;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
}

export const siteContent: SiteContent = {
  name: "Nicolas James Kennedy",
  headline: "Co-Founder at Service Surfer | Computer Engineering @ URI",
  summary: [
    "Computer Engineering B.S. student at the University of Rhode Island (GPA: 3.7)",
    "Co-Founder of Service Surfer LLC, an AI-powered search platform for service providers",
    "IT Network Technician with large scale network infrastructure experience",
    "Strong foundation in programming, networking, and web development with a focus on automation and efficiency"
  ],
  location: "Kingston, Rhode Island",
  currently: "Co-Founder at Service Surfer LLC | IT Network Technician at University of Rhode Island",
  socials: {
    linkedin: "https://linkedin.com/in/nicolasjkennedy",
    email: "mailto:nicolasjameskennedy@gmail.com",
    github: "https://github.com/nicolasjkennedy",
    resume: "/Nicolas_Kennedy_Resume_Personal_Domain.pdf"
  },
  education: [
    {
      school: "University of Rhode Island",
      degree: "B.S. Computer Engineering",
      dates: "Expected May 2028",
      highlights: [
        "GPA: 3.7",
        "Division 1 Collegiate Athlete: Track and Field (2024-2025)",
        "Organizations: URI Cybersecurity Club, Rhody Exchange, Rhody Christian Fellowship"
      ]
    },
    {
      school: "Rogers High School (Newport, RI) / Busan Foreign School (Busan, South Korea)",
      degree: "High School Diploma",
      dates: "Graduated May 2024",
      highlights: [
        "GPA: 4.3 | Class Rank: 12/151"
        
      ]
    }
  ],
  experience: [
    {
      company: "Service Surfer LLC",
      role: "Co-Founder",
      dates: "Founded 2026",
      bullets: [
        "Co-founded and launched an AI-powered search platform for finding local and online service providers",
        "Lead development user experience and interface design, backend architecture, and database design",
        "Architected scalable backend infrastructure using PostgreSQL and vector search technologies",
        "Aggregate service data from multiple sources and generate clean, concise business summaries",
        "Built platform to replace fragmented searches across Yelp, Google, and social media with a single interface"
      ],
      tech: ["Python", "PostgreSQL", "Vector Search", "LLMs", "Web Scraping", "Data Processing", "Backend Architecture"]
    },
    {
      company: "University of Rhode Island",
      role: "IT Network Technician",
      dates: "2025–Present",
      bullets: [
        "Deploy and maintain campus networking infrastructure (switches, access points, servers)",
        "Troubleshoot connectivity and system issues for staff and students",
        "Collaborate with engineers on VLANs, cabling, and monitoring across buildings",
        "Document configurations and operational procedures",
        "Develop and maintain network automation scripts to automate repetitive tasks"
      ],
      tech: ["Cisco IOS", "TCP/IP", "VLANs", "Network Infrastructure"]
    },
    {
      company: "City of Newport IT Department",
      role: "Network Engineering Intern",
      dates: "2022-2023",
      bullets: [
        "Supported configuration and maintenance of routers, switches, and endpoints",
        "Managed live broadcasting of city meetings using OBS and IP camera systems",
        "Responded to helpdesk tickets involving hardware and network troubleshooting",
        "Assisted with system recovery following a major cybersecurity incident",

      ],
      tech: ["Network Configuration", "OBS Studio", "IP Camera Systems", "Helpdesk Support"]
    }
    
  ],
  projects: [
    {
      name: "Service Surfer",
      oneLiner: "AI-powered search platform for finding local and online service providers (Co-founded LLC)",
      description: "Service Surfer LLC is an AI-powered search platform that helps users quickly find local and online service providers. As a co-founder, I lead development of the platform's core systems including web scraping and data ingestion, structured databases and vector search, AI-generated summaries and categorization, and scalable backend architecture. The platform aggregates service data from multiple public sources, automatically organizes businesses by category and location, and generates clean, concise summaries to replace fragmented searches across Yelp, Google, and social media with a single, fast, structured interface.",
      tech: ["Python", "PostgreSQL", "Vector Search", "LLMs", "Web Scraping", "Data Processing"],
      links: {
        live: "https://servicesurfer.app"
      },
      featured: true,
      sourceType: "closed"
    },
    {
      name: "n0conflict",
      oneLiner: "AI-powered CLI that resolves Git merge conflicts by analyzing both sides and preserving intent",
      description: "n0conflict is a published Python CLI tool that intelligently resolves Git merge conflicts using AI. Instead of forcing a manual pick between two versions, it analyzes the intent of each conflicting side and produces a merged result that preserves the logic of both. Supports resolve, scan, and explain commands across Python, TypeScript, Go, Rust, and more. Operates safely without writing to disk unless explicitly instructed. Available on PyPI.",
      tech: ["Python", "Claude API", "Git", "CLI"],
      links: {
        github: "https://github.com/nicolasjkennedy/n0conflict",
        pypi: "https://pypi.org/project/n0conflict/"
      },
      featured: true,
      sourceType: "open"
    },
    {
      name: "Cisco Switch Provisioning CLI",
      oneLiner: "Zero-to-production switch provisioning tool with dry-run support and modular config sections",
      description: "A lightweight, dependency-free Python CLI that takes a Cisco switch from factory reset to fully production-ready in a single command. Supports granular section targeting — VLANs, interfaces, routing, and ACLs can each be applied independently or together. Features a built-in dry-run mode that previews every command before it touches the switch, making it safe to iterate on configurations in live environments. Leverages PuTTY's plink for SSH transport, keeping the tool portable with zero pip dependencies.",
      tech: ["Python", "Cisco IOS", "SSH (plink)", "Network Automation", "CLI"],
      links: {
        github: "https://github.com/nicolasjkennedy/cisco-switch-automated-config"
      },
      featured: false,
      sourceType: "open"
    },
    {
      name: "Personal Portfolio Website",
      oneLiner: "Personal portfolio website built with Next.js, TypeScript, and Tailwind CSS",
      description: "A minimal, modern developer portfolio built from scratch with Next.js, TypeScript, and Tailwind CSS. Designed with a focus on clean typography, smooth scroll-driven animations, and a responsive layout that works across all devices.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
      links: {
        github: "https://github.com/nicolasjkennedy/personal-domain",
        live: "https://nicolaskennedy.com"
      },
      featured: false,
      sourceType: "open"
    },
    {
      name: "AiTutorMe",
      oneLiner: "AI-powered platform that teaches you any topic through interactive slideshows and voice",
      description: "AiTutorMe is an AI-powered learning platform that takes a prompt or uploaded classwork and generates an interactive slideshow to teach you the material. It walks you through each concept step by step, and you can interrupt at any point using your voice to ask questions, request clarification, or steer the lesson. Designed to make learning feel like a one-on-one tutoring session.",
      tech: ["TypeScript", "Next.js", "React", "Tailwind CSS", "Gemini API", "Supabase", "Web Speech API", "WebSockets", "Node.js", "REST APIs", "Vercel", "OAuth 2.0", "Prisma"],
      links: {},
      featured: false,
      sourceType: "inDevelopment"
    }
  ],
  certifications: [
    {
      name: "State Champion — Web Design",
      issuer: "SkillsUSA",
      date: "2022"
    },
    {
      name: "Python Programming",
      issuer: "Certified",
      date: "2021"
    },
    {
      name: "IC3 Digital Literacy",
      issuer: "Certified",
      date: "2022"
    },

  ]
};
