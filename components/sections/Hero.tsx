"use client";

import { siteContent } from "@/src/content/site";
import { useState, useEffect } from "react";
import Portrait from "@/components/Portrait";
import { useTyping } from "@/contexts/TypingContext";

export default function Hero() {
  const { setHasStarted } = useTyping();
  const [ready, setReady] = useState(false);

  // Skip the terminal prompt — show everything immediately on mount
  useEffect(() => {
    setHasStarted(true);
    setReady(true);
  }, [setHasStarted]);

  return (
    <section
      id="about"
      className="min-h-screen flex items-center pt-24 lg:pt-32 px-6 sm:px-8 lg:px-12 py-20 lg:py-32"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Portrait */}
          <div
            className={`order-2 lg:order-2 flex justify-center lg:justify-start transition-all duration-1000 ease-out ${
              ready ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <Portrait
                src="/me.png"
                alt={`${siteContent.name} headshot`}
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-1 space-y-8 lg:space-y-10">
            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-none animate-fade-in-up">
                {siteContent.name}
              </h1>

              {/* Headline */}
              <p className="text-xl sm:text-2xl lg:text-3xl font-light opacity-90 tracking-wide animate-fade-in-up stagger-1">
                {siteContent.headline}
              </p>

              {/* Summary Bullets */}
              <div className="space-y-3 pt-4">
                {siteContent.summary.map((bullet, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 animate-fade-in-up stagger-${Math.min(index + 2, 6)}`}
                  >
                    <span className="text-foreground/40 mt-2">—</span>
                    <p className="text-base sm:text-lg opacity-80 leading-relaxed">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>

              {/* Currently */}
              <div className="pt-4 animate-fade-in-up stagger-5">
                <p className="text-sm opacity-60 font-mono">
                  Currently: {siteContent.currently}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-6 animate-fade-in-up stagger-6">
                <a
                  href="#projects"
                  className="px-6 py-3 border border-foreground/20 hover:border-foreground/40 hover:scale-105 transition-all duration-300 text-sm font-medium tracking-wide"
                >
                  View Projects
                </a>
                {siteContent.socials.github && (
                  <a
                    href={siteContent.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-foreground/20 hover:border-foreground/40 hover:scale-105 transition-all duration-300 text-sm font-medium tracking-wide"
                  >
                    View GitHub
                  </a>
                )}
                <a
                  href="#contact"
                  className="px-6 py-3 border border-foreground/20 hover:border-foreground/40 hover:scale-105 transition-all duration-300 text-sm font-medium tracking-wide"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
