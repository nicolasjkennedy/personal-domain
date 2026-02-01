"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface TypingContextType {
  hasStarted: boolean;
  setHasStarted: (value: boolean) => void;
}

const TypingContext = createContext<TypingContextType | undefined>(undefined);

export function TypingProvider({ children }: { children: ReactNode }) {
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <TypingContext.Provider value={{ hasStarted, setHasStarted }}>
      {children}
    </TypingContext.Provider>
  );
}

export function useTyping() {
  const context = useContext(TypingContext);
  if (context === undefined) {
    throw new Error("useTyping must be used within a TypingProvider");
  }
  return context;
}
