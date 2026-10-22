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
  coursework?: string[];
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

export interface Award {
  name: string;
  issuer: string;
  date?: string;
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
  awards: Award[];
}

export const siteContent: SiteContent = {
  name: "Nicolas Kennedy",
  headline: "Incoming Network Engineer Intern @ Citizens | Computer Engineering @ URI",
  summary: [
    "Driven Computer Engineering student at URI, building toward a career in network engineering",
    "IT Network Technician at the University of Rhode Island, supporting hundreds of access points and switches across dozens of campus buildings",
    "Joining the Enterprise & Security team at Citizens as a Network Engineer Intern in Summer 2027",
    "Co-founded ServiceSurfer LLC, a startup that grew from a local services directory into an AI phone line connecting homeowners with the right provider",
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
        "GPA: 3.42",
        "Dean's List",
        "Taking ELE 492: IoT System Design, a graduate-level course, as a junior"
      ],
      coursework: [
        "Digital Circuit Design",
        "Introduction to Computer Systems",
        "Computer Programming",
        "Data Structures & Abstractions",
        "Discrete Mathematical Structures",
        "Linear Circuit Theory",
        "Signals & Systems",
        "Electronics I",
        "Digital Design with FPGAs",
        "Computer Architecture",
        "Linear Algebra",
        "Probability & Statistics",
        "IoT System Design (Graduate)"
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
      company: "Citizens Bank · Johnston, RI (HQ Campus)",
      role: "Network Engineer Intern, Enterprise & Security",
      dates: "Upcoming · Summer 2027",
      bullets: [
        "Joining the Enterprise & Security network team after a multi-round interview process"
      ]
    },
    {
      company: "University of Rhode Island",
      role: "IT Network Technician",
      dates: "2025 – Present · 20 hrs/week during the semester, full-time on breaks",
      bullets: [
        "Deploy and maintain campus network infrastructure across dozens of residential and administrative buildings, including hundreds of Aruba access points and Cisco Catalyst 9300 switches",
        "Write automation scripts that wipe and reset access points and push configurations to switches, replacing repetitive manual work",
        "Monitor and troubleshoot the network with SolarWinds and Aruba AirWave, and work connectivity issues for staff and students through ServiceNow",
        "Collaborate with engineers on VLANs, cabling, and switch stacking across buildings",
        "Document configurations and operational procedures"
      ],
      tech: ["Cisco IOS", "Cisco Catalyst 9300", "Aruba APs", "Aruba AirWave", "SolarWinds", "ServiceNow", "VLANs", "Trunking", "Switch Stacking", "Network Automation", "SSH", "Cable Termination & Testing", "Rack Mounting", "Data Closet Buildout"]
    },
    {
      company: "ServiceSurfer LLC",
      role: "Co-Founder",
      dates: "2025 – 2026",
      bullets: [
        "Co-founded ServiceSurfer LLC with Briac, a startup connecting homeowners with local service providers, first through a web platform and then through an AI phone line",
        "Came up with the idea and led product design from the first version through the pivot",
        "Built most of the core logic behind the matching platform and the AI phone line that talks with callers and routes them to a local provider",
        "Designed the business model: affordable featured listings as an alternative to traditional small business advertising",
        "Led provider outreach, partnerships, and go-to-market strategy across both sides of the marketplace",
        "Grew to a few dozen users, with numerous local businesses lined up to register as providers",
        "Pitched at URI RISE-UP pitch night and presented at a business convention at Bryant University",
        "Handed the company over to Briac in 2026 to focus on networking and my studies"
      ],
      tech: ["Next.js", "Supabase", "Claude", "ElevenLabs"]
    },
    {
      company: "Newport City Hall",
      role: "IT Intern",
      dates: "May 2022 – Aug 2022",
      bullets: [
        "Assisted with configuration and maintenance of routers, switches, and endpoints",
        "Helped the city recover from a major cybersecurity incident by replacing hard drives and reimaging devices",
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
      description: "ServiceSurfer started with two problems: people couldn't find local service providers in one place, and small businesses were overpaying for ads that didn't convert. I came up with the idea, led product design, and built most of the core logic: first a web platform that pulled every local provider into one search, with affordable featured listings for businesses. After feedback from our URI RISE-UP mentors, we pivoted to an AI phone line that talks with callers, understands their home issue, and routes them straight to a local provider. Along the way I led provider outreach and go-to-market, formed ServiceSurfer LLC, and pitched it at RISE-UP pitch night and a business convention at Bryant University. ServiceSurfer reached a few dozen users before I handed the company to my co-founder, Briac.",
      tech: ["Next.js", "Supabase", "Claude", "ElevenLabs"],
      page: "/servicesurfer/",
      featured: true,
      sourceType: "startup"
    },
    {
      name: "NetTest",
      oneLiner: "An open-source, build-it-yourself network tester inspired by the NetAlly LinkSprinter",
      description: "NetTest is a pocket-sized ESP32 network tester you plug into any Ethernet port to see whether the drop works and how it's configured. Powered over PoE, it runs a full test sequence automatically (link, switch and port, VLAN, DHCP, gateway, DNS, and internet) and shows the results, IP details, and port info on a small built-in screen. The goal is everything the LinkSprinter can do for under $100 in parts, with open-source hardware, firmware, and a custom 3D-printed case so anyone can build their own.",
      tech: ["ESP32", "PoE", "Embedded", "LLDP / CDP", "3D Printing"],
      links: {
        github: "https://github.com/nicolasjkennedy/NetTest"
      },
      page: "/nettest/",
      featured: true,
      sourceType: "inDevelopment"
    },
    {
      name: "Cisco Switch Provisioning CLI",
      oneLiner: "Zero-to-production switch provisioning tool with dry-run support and modular config sections",
      description: "A lightweight, dependency-free Python CLI that takes a Cisco switch from factory reset to fully production-ready in a single command. Supports granular section targeting — VLANs, interfaces, routing, and ACLs can each be applied independently or together. Features a built-in dry-run mode that previews every command before it touches the switch, making it safe to iterate on configurations in live environments. Leverages PuTTY's plink for SSH transport, keeping the tool portable with zero pip dependencies. Used at URI to provision more than ten production switches.",
      tech: ["Python", "Cisco IOS", "SSH", "Network Automation", "CLI"],
      links: {
        github: "https://github.com/nicolasjkennedy/cisco-switch-automated-config"
      },
      featured: false,
      sourceType: "open"
    },
  ],
  certifications: [
    {
      name: "Cisco Certified Network Associate (CCNA)",
      issuer: "Cisco",
      date: "In Progress",
      inProgress: true
    },
    {
      name: "CompTIA Security+",
      issuer: "CompTIA",
      date: "In Progress",
      inProgress: true
    },
    {
      name: "Python Programming",
      issuer: "CodeHS",
      date: "2021"
    },
  ],
  awards: [
    {
      name: "Dean's List",
      issuer: "University of Rhode Island"
    },
    {
      name: "1st Place — Web Design",
      issuer: "SkillsUSA Rhode Island State Championship",
      date: "2022"
    },
  ]
};
