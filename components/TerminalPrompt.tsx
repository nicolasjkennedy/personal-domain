"use client";

import { useEffect, useState, useRef } from "react";
import { siteContent } from "@/src/content/site";

interface TerminalPromptProps {
  onEnter?: () => void;
  onSkip?: () => void;
  autoTrigger?: boolean;
  autoTriggerDelay?: number;
}

interface TerminalCommand {
  command: string;
  output: string;
  type: "command" | "comment" | "empty";
}

export default function TerminalPrompt({
  onEnter,
  onSkip,
  autoTrigger = false,
  autoTriggerDelay = 1500,
}: TerminalPromptProps) {
  const [showPrompt, setShowPrompt] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentCommandText, setCurrentCommandText] = useState("");
  const [currentOutputText, setCurrentOutputText] = useState("");
  const [isTypingCommand, setIsTypingCommand] = useState(true);
  const [isTypingOutput, setIsTypingOutput] = useState(false);
  const [showPressEnter, setShowPressEnter] = useState(false);
  const [completedCommands, setCompletedCommands] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Terminal commands with actual command syntax
  const terminalCommands: TerminalCommand[] = [
    { type: "command", command: "echo 'Initializing portfolio system...'", output: "Initializing portfolio system..." },
    { type: "empty", command: "", output: "" },
    { type: "command", command: "whoami", output: siteContent.name },
    { type: "empty", command: "", output: "" },
    { type: "command", command: "load_portfolio", output: "" },
    { type: "empty", command: "", output: "" },
    { type: "command", command: "read -p 'Press Enter to continue...'", output: "Press Enter to continue..." },
  ];

  const handleSkip = () => {
    // Clear all intervals
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Mark all commands as completed
    const allCommandIndices = terminalCommands.map((_, idx) => idx);
    setCompletedCommands(allCommandIndices);
    setCurrentCommandIndex(terminalCommands.length);
    setCurrentCommandText("");
    setCurrentOutputText("");
    setIsTypingCommand(false);
    setIsTypingOutput(false);
    setHasTriggered(true);
    setShowCursor(false);
    setShowPressEnter(false);

    // Hide terminal and trigger skip
    setTimeout(() => {
      setShowPrompt(false);
      if (onSkip) {
        onSkip();
      } else if (onEnter) {
        onEnter();
      }
    }, 100);
  };

  // Type out commands sequentially
  useEffect(() => {
    if (currentCommandIndex >= terminalCommands.length) {
      setIsTypingCommand(false);
      setShowPressEnter(true);
      return;
    }

    const currentCmd = terminalCommands[currentCommandIndex];
    
    if (currentCmd.type === "empty") {
      // Skip empty lines quickly
      setTimeout(() => {
        setCompletedCommands(prev => [...prev, currentCommandIndex]);
        setCurrentCommandIndex(prev => prev + 1);
      }, 67); // 2x faster (133 / 2)
      return;
    }

    if (isTypingCommand && currentCmd.command) {
      // Type out the command
      let cmdIndex = 0;
      setCurrentCommandText("");
      setCurrentOutputText("");
      
      intervalRef.current = setInterval(() => {
        if (cmdIndex < currentCmd.command.length) {
          setCurrentCommandText(currentCmd.command.slice(0, cmdIndex + 1));
          cmdIndex++;
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          
          // Wait a bit, then show output
          setTimeout(() => {
            if (currentCmd.output) {
              setIsTypingOutput(true);
              let outputIndex = 0;
              
              intervalRef.current = setInterval(() => {
                if (outputIndex < currentCmd.output.length) {
                  setCurrentOutputText(currentCmd.output.slice(0, outputIndex + 1));
                  outputIndex++;
                } else {
                  if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                  }
                  setIsTypingOutput(false);
                  
                  // Move to next command after a delay
                  setTimeout(() => {
                    setCompletedCommands(prev => [...prev, currentCommandIndex]);
                    setCurrentCommandIndex(prev => prev + 1);
                    setCurrentCommandText("");
                    setCurrentOutputText("");
                  }, 133); // 2x faster (267 / 2)
                }
              }, 6.5); // 2x faster output typing (13 / 2)
            } else {
              // No output, move to next command
              setTimeout(() => {
                setCompletedCommands(prev => [...prev, currentCommandIndex]);
                setCurrentCommandIndex(prev => prev + 1);
                setCurrentCommandText("");
              }, 100); // 2x faster (200 / 2)
            }
          }, 100); // 2x faster (200 / 2)
        }
      }, 10); // 2x faster command typing (20 / 2)

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [currentCommandIndex, isTypingCommand]);

  useEffect(() => {
    if (autoTrigger && !hasTriggered && !isTypingCommand && showPressEnter) {
      timeoutRef.current = setTimeout(() => {
        handleEnter();
      }, autoTriggerDelay);

      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
  }, [autoTrigger, autoTriggerDelay, hasTriggered, isTypingCommand, showPressEnter]);

  const handleEnter = () => {
    if (hasTriggered || isTypingCommand) return;
    setHasTriggered(true);
    setShowCursor(false);
    setShowPressEnter(false);
    setTimeout(() => {
      setShowPrompt(false);
      if (onEnter) {
        onEnter();
      }
    }, 300);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !hasTriggered) {
        handleSkip();
      } else if (e.key === "Enter" && !hasTriggered && !isTypingCommand) {
        handleEnter();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [hasTriggered, isTypingCommand]);

  if (!showPrompt) return null;

  return (
    <div className="relative bg-[#0a0a0a] border border-white/20 rounded-lg shadow-2xl overflow-hidden animate-fade-in max-w-2xl w-full">
      {/* Title Bar */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#1a1a1a] border-b border-white/10">
        <div className="flex items-center gap-2">
          {/* Window Controls */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#28ca42]"></div>
          </div>
          <span className="ml-3 text-xs font-mono text-white/60">Terminal — Portfolio Loader</span>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-6 bg-[#0a0a0a] min-h-[400px]">
        <div className="font-mono text-sm space-y-1">
          {/* Completed Commands */}
          {completedCommands.map((cmdIdx) => {
            const cmd = terminalCommands[cmdIdx];
            if (cmd.type === "comment") {
              return (
                <div key={cmdIdx} className="text-blue-400/70">
                  {cmd.command}
                </div>
              );
            } else if (cmd.type === "empty") {
              return <div key={cmdIdx} className="h-1"></div>;
            } else if (cmd.type === "command") {
              return (
                <div key={cmdIdx} className="space-y-0.5">
                  <div className="flex items-center">
                    <span className="text-green-400">$</span>
                    <span className="ml-2 text-white">{cmd.command}</span>
                  </div>
                  {cmd.output && (
                    <div className="text-white/80 ml-4">{cmd.output}</div>
                  )}
                </div>
              );
            }
            return null;
          })}

          {/* Currently Typing Command */}
          {currentCommandIndex < terminalCommands.length && (
            <div className="space-y-0.5">
              {terminalCommands[currentCommandIndex].type === "comment" ? (
                <div className="text-blue-400/70">
                  {currentCommandText}
                  {isTypingCommand && (
                    <span className="inline-block w-0.5 h-[1em] bg-blue-400/70 ml-1 animate-pulse">|</span>
                  )}
                </div>
              ) : terminalCommands[currentCommandIndex].type === "command" ? (
                <>
                  <div className="flex items-center">
                    <span className="text-green-400">$</span>
                    <span className="ml-2 text-white">
                      {currentCommandText}
                      {isTypingCommand && !isTypingOutput && (
                        <span className="inline-block w-0.5 h-[1em] bg-white ml-1 animate-pulse">_</span>
                      )}
                    </span>
                  </div>
                  {currentOutputText && (
                    <div className="text-white/80 ml-4">
                      {currentOutputText}
                      {isTypingOutput && (
                        <span className="inline-block w-0.5 h-[1em] bg-white/80 ml-1 animate-pulse">|</span>
                      )}
                    </div>
                  )}
                </>
              ) : null}
            </div>
          )}
          
          {showPressEnter && !hasTriggered && (
            <div className="mt-3 pt-2 border-t border-white/10">
              <button
                onClick={handleEnter}
                className="px-3 py-1.5 bg-white/5 border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300 text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-white/40 rounded flex items-center justify-center gap-1.5 group"
                aria-label="Press Enter to continue"
              >
                <span>Press Enter</span>
                <span className="text-xs opacity-60 group-hover:opacity-100 transition-opacity">↵</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Skip Button - Always visible at bottom */}
      <div className="px-6 pb-4 pt-3 border-t border-white/10 flex items-center justify-between">
        <button
          onClick={handleSkip}
          className="px-4 py-2 text-xs font-mono text-white/60 hover:text-white hover:bg-white/10 border border-white/15 hover:border-white/40 transition-all duration-300 rounded-sm flex items-center gap-2 group"
          aria-label="Skip animations"
        >
          <span>Skip intro</span>
          <svg
            className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
        <span className="text-[10px] font-mono text-white/25 hidden sm:inline">ESC or click to skip</span>
      </div>
    </div>
  );
}
