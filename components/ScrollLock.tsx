"use client";

import { useEffect } from "react";
import { useTyping } from "@/contexts/TypingContext";

export default function ScrollLock() {
  const { hasStarted } = useTyping();

  useEffect(() => {
    if (!hasStarted) {
      // Prevent scrolling
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      // Enable scrolling
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      // Cleanup: ensure scrolling is enabled when component unmounts
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [hasStarted]);

  return null;
}
