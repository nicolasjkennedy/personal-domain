"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

const sectionItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const pageItems = [
  { label: "Blog", href: "/blogs/" },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = sectionItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-foreground/5 animate-fade-in">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {sectionItems.map((item, index) => (
              <button
                key={item.href}
                onClick={() => handleClick(item.href)}
                className={`text-sm lg:text-base font-medium tracking-wide transition-all duration-300 hover:opacity-100 hover:scale-105 ${
                  activeSection === item.href
                    ? "opacity-100 border-b border-foreground"
                    : "opacity-60"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
                aria-label={`Navigate to ${item.label} section`}
              >
                {item.label}
              </button>
            ))}
            {pageItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm lg:text-base font-medium tracking-wide transition-all duration-300 hover:opacity-100 hover:scale-105 opacity-60"
                style={{ animationDelay: `${(sectionItems.length + index) * 50}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side: theme toggle + mobile menu */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              className="md:hidden opacity-80 hover:opacity-100 transition-opacity"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-foreground/5 pt-4">
            {sectionItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleClick(item.href)}
                className={`block w-full text-left text-sm font-medium tracking-wide transition-opacity hover:opacity-70 ${
                  activeSection === item.href
                    ? "opacity-100 border-l-2 border-foreground pl-3"
                    : "opacity-60 pl-3"
                }`}
              >
                {item.label}
              </button>
            ))}
            {pageItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left text-sm font-medium tracking-wide transition-opacity hover:opacity-70 opacity-60 pl-3"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
