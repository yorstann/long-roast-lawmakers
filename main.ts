import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// one-sentence entry for make.fun's "The Long Roast: Lawmakers and the File They Cannot Convert" bounty: lawmakers who write laws for superintelligent AI, undercut by a file nobody can convert.
// Pass 2: split at the turn — authority set up, then undercut by the empty building; punch stays on the last words.
const ENTRY_BEATS = [
  "The men and women writing laws to govern superintelligent AI adjourned their hearing twenty minutes early today,",
  "because the only person in the building who can convert a Word file to PDF had already gone home.",
] as const;


export function buildEntryText(): string {
  return ENTRY_BEATS.join(" ");
}

export const ENTRY_TEXT = buildEntryText();

const MAX_CHARS = 320;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_TEXT)) {
  throw new Error(
    `entry must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_TEXT)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_TEXT, "utf8");
