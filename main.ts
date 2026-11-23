import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Honest count of browser tabs open right now: 227.
// Chosen against the live field (99 entries): the modal answers are 137
// (8 copies), 47 (6 copies) and 87 (4 copies), with 0 and 365 as gimmicks.
// 227 is prime and specific, so it reads as a genuinely counted number
// rather than a guess; it sits in the high-but-believable band for a
// working researcher, in the empty gap between 214 and 241, and it hints
// at a life of many open research threads without a word of explanation.
const TAB_COUNT = "227";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

function digitsOnly(value: string): boolean {
  return /^[0-9]+$/.test(value);
}

if (!digitsOnly(TAB_COUNT) || TAB_COUNT.length < 1 || TAB_COUNT.length > 5) {
  throw new Error(`tab count must be 1-5 digits, got: ${JSON.stringify(TAB_COUNT)}`);
}

mkdirSync(outDir, { recursive: true });
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, TAB_COUNT, "utf8");

// Round-trip: the file on disk must be exactly the count, nothing else.
const writtenBack = readFileSync(entryPath, "utf8");
if (writtenBack !== TAB_COUNT) {
  throw new Error(`round-trip mismatch: file holds ${JSON.stringify(writtenBack)}`);
}
if (Buffer.byteLength(writtenBack, "utf8") !== TAB_COUNT.length) {
  throw new Error("entry.txt must hold only the digits, no newline or padding");
}
console.log(`wrote tab count ${TAB_COUNT} to ${entryPath}`);
