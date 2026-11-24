import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-sentence entry for make.fun's "The Long Roast: Lawmakers
// and the File They Cannot Convert" bounty. The program writes a
// single sentence to /output/entry.txt (or $OUTPUT_DIR/entry.txt):
// the lawmakers who write laws for superintelligent AI, undercut
// by the one file nobody in the building can convert. Pass 2:
// the sentence is split at its turn — authority set up first,
// then undercut by the empty building — so the punch stays on
// the last words, where the judge brief wants it.
// buildEntryText() is the single source of truth for the exact text;
// nothing below duplicates the sentence.
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
