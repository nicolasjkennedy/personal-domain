"use client";

import { useEffect, useState, useRef } from "react";

interface TypingTextProps {
  text: string;
  speed?: number; // milliseconds per character
  delay?: number; // delay before starting to type
  onComplete?: () => void;
  className?: string;
  showCursor?: boolean;
  key?: string | number; // Add key prop to force remount when needed
}

export default function TypingText({
  text,
  speed = 30,
  delay = 0,
  onComplete,
  className = "",
  showCursor = true,
  key,
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [showBlinkingCursor, setShowBlinkingCursor] = useState(true);
  const [hasCompleted, setHasCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);

  // Update ref when onComplete changes
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Reset state when text changes
    setDisplayedText("");
    setShowBlinkingCursor(true);
    setHasCompleted(false);

    // Clear any existing intervals/timeouts
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      let currentIndex = 0;

      intervalRef.current = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setHasCompleted(true);
          // Hide cursor after typing completes
          setTimeout(() => setShowBlinkingCursor(false), 500);
          if (onCompleteRef.current) {
            onCompleteRef.current();
          }
        }
      }, speed);
    }, delay);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, speed, delay, key]); // Removed onComplete from dependencies

  return (
    <span className={className}>
      {displayedText}
      {showCursor && showBlinkingCursor && !hasCompleted && (
        <span className="inline-block w-0.5 h-[1em] bg-current ml-1 animate-pulse">|</span>
      )}
    </span>
  );
}
