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
    caseStudy?: string;
  };
  featured?: boolean;
  sourceType?: "open" | "closed";
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
      name: "Cisco Switch Automated Configuration",
      oneLiner: "Open-source Python tool for automated Cisco switch provisioning and management",
      description: "An open-source automation tool built to streamline Cisco switch configuration at scale. Automates the full provisioning workflow — from factory reset to production-ready config — eliminating manual CLI work and reducing human error across campus network deployments. Handles bulk switch configuration, VLAN setup, port security policies, and backup/restore procedures, enabling consistent and repeatable infrastructure management across hundreds of devices.",
      tech: ["Python", "Cisco IOS", "Network Automation", "SSH/Telnet", "Configuration Management"],
      links: {
        github: "https://github.com/nicolasjkennedy/cisco-switch-automated-config"
      },
      featured: true,
      sourceType: "open"
    },
    {
      name: "Network Configuration Parser",
      oneLiner: "CLI tool for analyzing and validating Cisco IOS configurations",
      description: "Created a Python utility to parse Cisco router and switch configurations, identify potential issues, and generate reports. Helps network engineers quickly audit configurations and ensure compliance with best practices.",
      tech: ["Python", "CLI Tools", "Network Configuration", "File Processing"],
      featured: false
    },
    {
      name: "Event Management System",
      oneLiner: "Web application for coordinating event logistics and scheduling",
      description: "Built a web application to streamline event coordination workflows. Features include calendar integration, inventory tracking, and automated client communication. Designed to handle multiple concurrent events with real-time updates.",
      tech: ["JavaScript", "HTML", "CSS", "Web APIs"],
      featured: false
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
