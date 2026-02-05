"use client";

import { siteContent } from "@/src/content/site";
import { useState } from "react";
import Portrait from "@/components/Portrait";
import TypingText from "@/components/TypingText";
import TerminalPrompt from "@/components/TerminalPrompt";
import { useTyping } from "@/contexts/TypingContext";

export default function Hero() {
  const { setHasStarted } = useTyping();
  const [startTyping, setStartTyping] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showHeadline, setShowHeadline] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [currentSummaryIndex, setCurrentSummaryIndex] = useState(0);
  const [showCurrently, setShowCurrently] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showPortrait, setShowPortrait] = useState(false);
  const [skipAnimations, setSkipAnimations] = useState(false);

  const handlePromptEnter = () => {
    setStartTyping(true);
    setShowPortrait(true);
    setShowName(true); // Start showing name immediately
    setHasStarted(true); // Enable navigation and scrolling
  };

  const handleSkip = () => {
    // Skip all animations - show everything immediately
    setSkipAnimations(true);
    setStartTyping(true);
    setShowPortrait(true);
    setShowName(true);
    setShowHeadline(true);
    setShowSummary(true);
    setCurrentSummaryIndex(siteContent.summary.length - 1);
    setShowCurrently(true);
    setShowButtons(true);
    setHasStarted(true); // Enable navigation and scrolling
  };

  const handleNameComplete = () => {
    if (!skipAnimations) {
      setTimeout(() => setShowHeadline(true), 300);
    }
  };

  const handleHeadlineComplete = () => {
    if (!skipAnimations) {
      setTimeout(() => setShowSummary(true), 500);
    }
  };

  const handleSummaryComplete = (index: number) => {
    if (!skipAnimations) {
      if (index < siteContent.summary.length - 1) {
        setTimeout(() => {
          setCurrentSummaryIndex(index + 1);
        }, 400);
      } else {
        setTimeout(() => setShowCurrently(true), 500);
      }
    }
  };

  const handleCurrentlyComplete = () => {
    if (!skipAnimations) {
      setTimeout(() => setShowButtons(true), 500);
    }
  };

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
              showPortrait ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
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
            {/* Terminal Prompt */}
            <TerminalPrompt onEnter={handlePromptEnter} onSkip={handleSkip} autoTrigger={false} />

            {/* Name */}
            {startTyping && showName && (
              <div className="space-y-4 lg:space-y-6">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
                  {skipAnimations ? (
                    siteContent.name
                  ) : (
                    <TypingText
                      key="name"
                      text={siteContent.name}
                      speed={25}
                      delay={0}
                      onComplete={handleNameComplete}
                      className=""
                    />
                  )}
                </h1>

                {/* Headline */}
                {showHeadline && (
                  <p className="text-xl sm:text-2xl lg:text-3xl font-light opacity-90 tracking-wide">
                    {skipAnimations ? (
                      siteContent.headline
                    ) : (
                      <TypingText
                        key="headline"
                        text={siteContent.headline}
                        speed={15}
                        delay={0}
                        onComplete={handleHeadlineComplete}
                        className=""
                      />
                    )}
                  </p>
                )}

                {/* Summary Bullets */}
                {showSummary && (
                  <div className="space-y-3 pt-4">
                    {siteContent.summary.map((bullet, index) => {
                      if (index <= currentSummaryIndex) {
                        return (
                          <div
                            key={index}
                            className="flex items-start gap-3"
                          >
                            <span className="text-foreground/40 mt-2">—</span>
                            <p className="text-base sm:text-lg opacity-80 leading-relaxed">
                              {skipAnimations || index < currentSummaryIndex ? (
                                bullet
                              ) : (
                                <TypingText
                                  key={`summary-${index}`}
                                  text={bullet}
                                  speed={10}
                                  delay={0}
                                  onComplete={() => handleSummaryComplete(index)}
                                  className=""
                                />
                              )}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                )}

                {/* Currently */}
                {showCurrently && (
                  <div className="pt-4">
                    <p className="text-sm opacity-60 font-mono">
                      {skipAnimations ? (
                        `Currently: ${siteContent.currently}`
                      ) : (
                        <TypingText
                          key="currently"
                          text={`Currently: ${siteContent.currently}`}
                          speed={15}
                          delay={0}
                          onComplete={handleCurrentlyComplete}
                          className=""
                        />
                      )}
                    </p>
                  </div>
                )}

                {/* CTA Buttons */}
                {showButtons && (
                  <div className="flex flex-wrap gap-4 pt-6 animate-fade-in">
                    <a
                      href="#projects"
                      className="px-6 py-3 border border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 text-sm font-medium tracking-wide"
                    >
                      View Projects
                    </a>
                    {siteContent.socials.github && (
                      <a
                        href={siteContent.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 border border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 text-sm font-medium tracking-wide"
                      >
                        View GitHub
                      </a>
                    )}
                    <a
                      href="#contact"
                      className="px-6 py-3 border border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 text-sm font-medium tracking-wide"
                    >
                      Contact
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
