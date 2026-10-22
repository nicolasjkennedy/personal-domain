"use client";

import { useState } from "react";
import { siteContent } from "@/src/content/site";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const mailto = siteContent.socials.email;
  const address = mailto?.replace("mailto:", "");

  const copyEmail = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = mailto!;
    }
  };

  return (
    <section
      id="contact"
      className="py-20 lg:py-32 px-6 sm:px-8 lg:px-12 border-t border-foreground/5"
    >
      <div className="max-w-4xl mx-auto">
        <AnimateOnScroll>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-12 lg:mb-16 tracking-tight">
            Contact
          </h2>
        </AnimateOnScroll>

        {mailto && address && (
          <AnimateOnScroll delay={100}>
            <div className="flex flex-wrap items-center gap-4">
              {/* Spinning gradient ring behind a solid face reads as an animated border */}
              <a
                href={mailto}
                className="email-button group relative inline-flex overflow-hidden rounded-full p-px hover:scale-[1.03] hover:opacity-100 transition-transform duration-300"
              >
                <span className="email-button-ring absolute inset-[-200%]" aria-hidden="true" />
                <span className="relative flex items-center gap-3 rounded-full bg-background px-6 sm:px-8 py-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0" aria-hidden="true">
                    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67z"/>
                    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908z"/>
                  </svg>
                  {/* Label slides up to reveal the address on hover */}
                  <span className="relative block h-7 overflow-hidden text-base sm:text-lg font-medium">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-7 group-focus-visible:-translate-y-7">
                      <span className="block h-7 leading-7">Send me an email</span>
                      <span className="block h-7 leading-7 font-mono text-sm sm:text-base">{address}</span>
                    </span>
                  </span>
                  <span className="opacity-50 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
                </span>
              </a>

              <button
                onClick={copyEmail}
                className="text-sm font-mono opacity-60 hover:opacity-100 border-b border-foreground/20 hover:border-foreground/40 transition-all duration-300"
                aria-live="polite"
              >
                {copied ? "Copied ✓" : "Copy address"}
              </button>
            </div>
          </AnimateOnScroll>
        )}
      </div>
    </section>
  );
}
