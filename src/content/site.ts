export interface SocialLinks {
  linkedin?: string;
  github?: string;
  email?: string;
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
  // Internal route for a dedicated project page; makes the project card clickable
  page?: string;
  sourceType?: "open" | "closed" | "inDevelopment" | "startup";
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialLink?: string;
  inProgress?: boolean;
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
  name: "Nicolas Kennedy",
  headline: "Network Engineer | Computer Engineering Student at URI",
  summary: [
    "Network Engineer with hands-on infrastructure experience across enterprise and campus environments — VLANs, switching, routing, and automation",
    "IT Network Technician at the University of Rhode Island, deploying and maintaining campus networking infrastructure",
    "Co-founded ServiceSurfer LLC — a startup that grew from a local services directory into an AI phone line connecting homeowners with the right provider",
  ],
  location: "Kingston, Rhode Island",
  currently: "IT Network Technician at University of Rhode Island",
  socials: {
    linkedin: "https://linkedin.com/in/nicolasjkennedy",
    email: "mailto:nicolasjameskennedy@gmail.com",
    github: "https://github.com/nicolasjkennedy",
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
      tech: ["Cisco IOS", "TCP/IP", "VLANs", "Trunking", "Switch Stacking", "Network Infrastructure", "Network Automation", "SSH", "Cable Termination & Testing", "Rack Mounting", "Cable Management", "Data Closet Buildout", "Wireless AP Deployment"]
    },
    {
      company: "ServiceSurfer LLC",
      role: "Co-Founder",
      dates: "2025 – 2026",
      bullets: [
        "Co-founded ServiceSurfer LLC, a startup connecting homeowners with local service providers, first through a web platform and then through an AI phone line",
        "Came up with the idea and led product design from the first version through the pivot",
        "Built most of the core logic behind the matching platform and the AI phone line that talks with callers and routes them to a local provider",
        "Designed the business model: affordable featured listings as an alternative to traditional small business advertising",
        "Led provider outreach, partnerships, and go-to-market strategy across both sides of the marketplace",
        "Pitched at URI RISE-UP pitch night and presented at a business convention at Bryant University"
      ],
      tech: []
    },
    {
      company: "Newport City Hall",
      role: "Network Technician Intern",
      dates: "May 2022 – Aug 2022",
      bullets: [
        "Assisted with configuration and maintenance of routers, switches, and endpoints",
        "Assisted with system recovery and repair following a major cybersecurity incident",
        "Performed structured cabling and patch panel maintenance across network racks supporting city government operations — traced and terminated copper runs, managed cable pathways, and ensured proper connectivity across switches and distribution frames",
        "Managed live broadcast systems for city court hearings and public council meetings, including real-time monitoring of audio/video feeds, camera switching, and on-the-fly troubleshooting to maintain uninterrupted streams",
        "Responded to helpdesk tickets involving hardware and network troubleshooting",
      ],
      tech: ["Routing & Switching", "Network Configuration", "Patch Panel Management", "Cable Termination & Testing"]
    }
    
  ],
  projects: [
    {
      name: "ServiceSurfer",
      oneLiner: "From a local services directory to an AI phone line that connects homeowners with the right provider",
      description: "ServiceSurfer started with two problems: people couldn't find local service providers in one place, and small businesses were overpaying for ads that didn't convert. I came up with the idea, led product design, and built most of the core logic: first a web platform that pulled every local provider into one search, with affordable featured listings for businesses. After feedback from our URI RISE-UP mentors, we pivoted to an AI phone line that talks with callers, understands their home issue, and routes them straight to a local provider. Along the way I led provider outreach and go-to-market, formed ServiceSurfer LLC, and pitched it at RISE-UP pitch night and a business convention at Bryant University.",
      tech: [],
      page: "/servicesurfer/",
      featured: true,
      sourceType: "startup"
    },
    {
      name: "n0conflict",
      oneLiner: "AI-powered CLI that resolves Git merge conflicts by analyzing both sides and preserving intent",
      description: "n0conflict is a published Python CLI tool that intelligently resolves Git merge conflicts using AI. Instead of forcing a manual pick between two versions, it analyzes the intent of each conflicting side and produces a merged result that preserves the logic of both. Supports resolve, scan, and explain commands across Python, TypeScript, Go, Rust, and more. Operates safely without writing to disk unless explicitly instructed. Available on PyPI.",
      tech: ["Python", "CLI"],
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
      tech: ["Python", "Cisco IOS", "SSH", "Network Automation", "CLI"],
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
      tech: [],
      links: {
        github: "https://github.com/nicolasjkennedy/personal-domain",
        live: "https://nicolaskennedy.com"
      },
      featured: false,
      sourceType: "open"
    },
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
    {
      name: "Cisco Certified Network Associate (CCNA)",
      issuer: "Cisco",
      date: "In Progress",
      inProgress: true
    },
    {
      name: "CompTIA Security+ (Network)",
      issuer: "CompTIA",
      date: "In Progress",
      inProgress: true
    },
  ]
};
