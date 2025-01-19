"use client";

import React, { useEffect, useState } from "react";
import { useCursor } from "@/hooks/use-cursor";
import {
  getMatchingBracket,
  shouldAddIndentation,
  getPreviousLineIndentation,
} from "@/lib/code-utils";

const BRACKETS: Record<string, string> = {
  "(": ")",
  "[": "]",
  "{": "}",
  '"': '"',
  "'": "'",
  "`": "`",
};

interface CodeDisplayProps {
  code: string;
  typedCode: string;
  onUpdate: (newCode: string) => void;
}

export function CodeDisplay({ code, typedCode, onUpdate }: CodeDisplayProps) {
  const [manualCursorPosition, setManualCursorPosition] = useState<
    number | undefined
  >(undefined);
  const { cursorPosition, showCursor, setCursorPosition } = useCursor(
    typedCode,
    manualCursorPosition
  );
  const [characters, setCharacters] = useState<
    Array<{ char: string; status: string }>
  >([]);

  useEffect(() => {
    const chars = code.split("").map((char, index) => ({
      char,
      status: !typedCode[index]
        ? "waiting"
        : typedCode[index] === char
        ? "correct"
        : "incorrect",
    }));
    setCharacters(chars);
  }, [code, typedCode]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      onUpdate(typedCode + "    ");
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      let indent = getPreviousLineIndentation(typedCode);
      if (shouldAddIndentation(typedCode)) {
        indent += "    ";
      }
      onUpdate(typedCode + "\n" + indent);
      return;
    }

    if (e.key in BRACKETS) {
      e.preventDefault();
      const closingBracket = BRACKETS[e.key as keyof typeof BRACKETS];
      onUpdate(typedCode + e.key + closingBracket);
      setManualCursorPosition(typedCode.length + 1);
      return;
    }

    if (
      e.key === "ArrowRight" &&
      typedCode[cursorPosition] ===
        BRACKETS[typedCode[cursorPosition - 1] as keyof typeof BRACKETS]
    ) {
      e.preventDefault();
      setManualCursorPosition(cursorPosition + 1);
      return;
    }

    setManualCursorPosition(undefined);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [typedCode, cursorPosition]);

  return (
    <pre className="font-mono text-lg leading-relaxed p-8 rounded-lg bg-gray-950 relative">
      <code>
        {characters.map((char, index) => (
          <React.Fragment key={index}>
            {index === cursorPosition && showCursor && (
              <span
                className="absolute w-[2px] h-[1.2em] bg-primary-foreground animate-pulse"
                style={{ left: `${index * 0.6}em` }}
              />
            )}
            <span
              className={`${
                char.status === "waiting"
                  ? "text-gray-600"
                  : char.status === "correct"
                  ? "text-green-500"
                  : "text-red-500 bg-red-900/50"
              }`}
            >
              {char.char}
            </span>
          </React.Fragment>
        ))}
      </code>
    </pre>
  );
}
