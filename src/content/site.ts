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
  headline: "Co-Founder at ServiceSurfer | Network Engineer",
  summary: [
    "Co-Founder of ServiceSurfer LLC — a platform that uses proprietary service-request data to match consumers with local providers across web and phone",
    "Operator focused on go-to-market execution, provider partnerships, and scaling two-sided marketplaces",
    "Network Engineer with hands-on infrastructure experience across enterprise and campus environments",
    "Computer Engineering B.S. student at the University of Rhode Island (GPA: 3.7)"
  ],
  location: "Kingston, Rhode Island",
  currently: "Co-Founder at ServiceSurfer LLC | IT Network Technician at University of Rhode Island",
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
      company: "ServiceSurfer LLC",
      role: "Co-Founder",
      dates: "Founded 2026",
      bullets: [
        "Co-founded ServiceSurfer LLC — a platform that uses proprietary service-request data to match consumers with local providers across web and phone",
        "Drive go-to-market strategy including consumer acquisition, provider onboarding, and market expansion",
        "Launched a web matching experience where consumers describe their problem and are connected to the right local provider",
        "Built and launched a phone channel that captures a caller's request and location, then routes them directly to a matched provider",
        "Own provider partnerships, outreach, and operational execution across both sides of the marketplace",
        "Manage company structure, positioning, and business development as an early-stage operator"
      ],
      tech: ["Go-to-Market", "Two-Sided Marketplaces", "Provider Partnerships", "Business Development", "Operations"]
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
      name: "ServiceSurfer",
      oneLiner: "Matches consumers with local service providers using proprietary service-request data — across web and phone",
      description: "ServiceSurfer LLC uses proprietary service-request data to match consumers with local providers across web and phone. As co-founder, I lead go-to-market strategy, provider partnerships, and operational execution on both sides of the marketplace. The platform serves consumers through a web experience where they describe their problem and are matched to the right local provider, and through a phone channel that captures a caller's request and location and routes them directly to a match. My focus is on growing provider supply, driving consumer demand, and building the operational foundation to scale.",
      tech: ["Go-to-Market", "Two-Sided Marketplaces", "Provider Partnerships", "Business Development", "Operations"],
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
