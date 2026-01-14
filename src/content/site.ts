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
  headline: "Computer Engineering Undergraduate | Aspiring Full-Stack Developer | Systems & Web Engineering",
  summary: [
    "Computer Engineering B.S. student at the University of Rhode Island (GPA: 3.7)",
    "IT Network Technician with hands-on systems and infrastructure experience",
    "Strong foundation in programming, networking, and web development",
    "Actively building skills as a full-stack developer through projects and applied work"
  ],
  location: "Kingston, Rhode Island",
  currently: "IT Network Technician at University of Rhode Island",
  socials: {
    linkedin: "https://linkedin.com/in/nicolasjkennedy",
    email: "mailto:nicolasjameskennedy@gmail.com",
    resume: "/Nicolas_Kennedy_Resume_Personal_Domain.pdf"
  },
  education: [
    {
      school: "University of Rhode Island",
      degree: "B.S. Computer Engineering",
      dates: "Expected May 2028",
      highlights: [
        "GPA: 3.7",
        "Relevant Coursework: Electricity & Magnetism, Differential Equations, Computer Systems, Digital Circuit Design, Engineering 105 & 106, AP Computer Science A"
      ]
    },
    {
      school: "Rogers High School / Busan Foreign School",
      degree: "High School Diploma",
      dates: "Graduated May 2024",
      highlights: [
        "Weighted GPA: 4.3 | Class Rank: 12/151 | SAT: 1210"
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
        "Document configurations and operational procedures"
      ],
      tech: ["Cisco IOS", "TCP/IP", "VLANs", "Network Infrastructure"]
    },
    {
      company: "City of Newport IT Department",
      role: "Network Engineering Intern",
      dates: "2022",
      bullets: [
        "Supported configuration and maintenance of routers, switches, and endpoints",
        "Managed live broadcasting of city meetings using OBS and IP camera systems",
        "Responded to helpdesk tickets involving hardware and network troubleshooting",
        "Assisted with system recovery following a major cyber incident"
      ],
      tech: ["Network Configuration", "OBS Studio", "IP Camera Systems", "Helpdesk Support"]
    },
    {
      company: "Easy Does It Entertainment",
      role: "Event Coordinator / Logistics Operator",
      dates: "2025",
      bullets: [
        "Coordinated logistics for large-scale events",
        "Managed scheduling, inventory, and client communication"
      ]
    },
    {
      company: "Brick Alley Pub & Flo's Clam Shack",
      role: "Server / Busser",
      dates: "2023–2024",
      bullets: []
    }
  ],
  projects: [
    {
      name: "Service Surfer",
      oneLiner: "AI-powered search platform for finding local and online service providers",
      description: "Service Surfer is an AI-powered search platform that helps users quickly find local and online service providers. It aggregates service data from multiple public sources, automatically organizes businesses by category and location, and generates clean, concise summaries. The goal is to replace fragmented searches across Yelp, Google, and social media with a single, fast, structured interface. Key focus areas include web scraping and data ingestion, structured databases and vector search, AI-generated summaries and categorization, and scalable backend architecture for continuous data updates.",
      tech: ["Python", "PostgreSQL", "Vector Search", "LLMs", "Web Scraping", "Data Processing"],
      links: {
        live: "https://servicesurfer.co"
      },
      featured: true
    },
    {
      name: "Network Infrastructure Automation Scripts",
      oneLiner: "Python automation tools for campus network device management and optimization",
      description: "Developed a suite of Python scripts to automate repetitive network infrastructure tasks, significantly reducing manual configuration time and human error. Scripts handle access point factory resets and provisioning, switch configuration optimization and validation, bulk device management across multiple campus buildings, and automated backup and restore procedures. These tools streamline day-to-day operations for the IT team and ensure consistent configurations across hundreds of network devices.",
      tech: ["Python", "Cisco IOS", "Network Automation", "SSH/Telnet", "Configuration Management"],
      featured: true
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
      date: "2024"
    },
    {
      name: "Python Programming",
      issuer: "Certified",
      date: "2024"
    },
    {
      name: "IC3 Digital Literacy",
      issuer: "Certified",
      date: "2023"
    },
    {
      name: "Web Development",
      issuer: "Certified",
      date: "2023"
    },
    {
      name: "National Honor Society",
      issuer: "Rogers High School",
      date: "2023"
    }
  ]
};
