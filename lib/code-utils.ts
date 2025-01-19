const BRACKETS: Record<string, string> = {
  "(": ")",
  "[": "]",
  "{": "}",
  '"': '"',
  "'": "'",
  "`": "`",
};

export function getMatchingBracket(char: string): string | null {
  return BRACKETS[char] || null;
}

export function shouldAddIndentation(code: string): boolean {
  const lastChar = code[code.length - 1];
  return lastChar === "{" || lastChar === ":" || lastChar === "(";
}

export function getPreviousLineIndentation(code: string): string {
  const lines = code.split("\n");
  if (lines.length <= 1) return "";

  const previousLine = lines[lines.length - 2];
  const match = previousLine.match(/^(\s*)/);
  return match ? match[1] : "";
}
