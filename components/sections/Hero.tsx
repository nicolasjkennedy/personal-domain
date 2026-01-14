"use client";

import { siteContent } from "@/src/content/site";
import { useEffect, useState } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen flex items-center pt-24 lg:pt-32 px-6 sm:px-8 lg:px-12 py-20 lg:py-32"
    >
      <div className="max-w-4xl mx-auto w-full">
        <div className="space-y-8 lg:space-y-10">
            <div className={`space-y-4 lg:space-y-6 transition-all duration-1000 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
                {siteContent.name}
              </h1>
              <p className={`text-xl sm:text-2xl lg:text-3xl font-light opacity-90 tracking-wide transition-all duration-1000 ease-out delay-200 ${
                mounted ? "opacity-90 translate-y-0" : "opacity-0 translate-y-4"
              }`}>
                {siteContent.headline}
              </p>
            </div>

            <div className={`space-y-3 pt-4 transition-all duration-1000 ease-out delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              {siteContent.summary.map((bullet, index) => (
                <div 
                  key={index} 
                  className={`flex items-start gap-3 transition-all duration-700 ease-out ${
                    mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <span className="text-foreground/40 mt-2">—</span>
                  <p className="text-base sm:text-lg opacity-80 leading-relaxed">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>

            <div className={`pt-4 transition-all duration-1000 ease-out delay-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              <p className="text-sm opacity-60 font-mono">
                Currently: {siteContent.currently}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-wrap gap-4 pt-6 transition-all duration-1000 ease-out delay-800 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              <a
                href="#projects"
                className="px-6 py-3 border border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 text-sm font-medium tracking-wide"
              >
                View Projects
              </a>
              {siteContent.socials.resume && (
                <a
                  href={siteContent.socials.resume.startsWith("/") ? `/personal-domain${siteContent.socials.resume}` : siteContent.socials.resume}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 text-sm font-medium tracking-wide"
                >
                  Download Resume
                </a>
              )}
              <a
                href="#contact"
                className="px-6 py-3 border border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 text-sm font-medium tracking-wide"
              >
                Contact
              </a>
            </div>
        </div>
      </div>
    </section>
  );
}
