"use client";

import { siteContent } from "@/src/content/site";
import Portrait from "@/components/Portrait";

export default function Hero() {

  return (
    <section
      id="about"
      className="min-h-screen flex items-center pt-24 lg:pt-32 px-6 sm:px-8 lg:px-12 py-20 lg:py-32"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Portrait */}
          <div className="order-2 lg:order-2 flex justify-center lg:justify-start">
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

              {/* Social Icons */}
              <div className="flex items-center gap-5 pt-6 animate-fade-in-up stagger-6">
                {siteContent.socials.linkedin && (
                  <a
                    href={siteContent.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
                {siteContent.socials.github && (
                  <a
                    href={siteContent.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                  </a>
                )}
                {siteContent.socials.email && (
                  <a
                    href={siteContent.socials.email}
                    aria-label="Email"
                    className="opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67z"/>
                      <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908z"/>
                    </svg>
                  </a>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
