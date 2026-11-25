// Fridge Roast: One Line, Biggest Laugh
// Writes the single-line entry to /output/entry.txt.
// Run: node main.ts            (write the entry)
//      node main.ts --self-test (check validation + round-trip)

import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ENTRY =
  "The door alarm shrieks after thirty seconds, so my fridge is a smoke detector that's decided I'm the fire.";
const MAX_LENGTH = 200;

// Guard: every entry passes through here before anything touches the disk.
// Returns the text unchanged so callers can write `write(assertEntry(x))`.
function assertEntry(text: unknown): string {
  if (typeof text !== "string") {
    throw new TypeError(`entry must be a string, got ${typeof text}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is blank: nothing to submit");
  }
  if (text.length > MAX_LENGTH) {
    throw new Error(
      `entry is ${text.length} characters, ${text.length - MAX_LENGTH} over the ${MAX_LENGTH}-character limit`,
    );
  }
  const newline = text.search(/[\r\n]/);
  if (newline !== -1) {
    throw new Error(`entry must be a single line: newline found at index ${newline}`);
  }
  return text;
}

function writeEntry(text: string, outDir: string): string {
  assertEntry(text);
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, text);
  // Read back: the file on disk must match the entry exactly, byte for byte.
  if (!readFileSync(target).equals(Buffer.from(text, "utf8"))) {
    throw new Error(`read-back mismatch: ${target} differs from the entry`);
  }
  return target;
}

function rejects(text: string): boolean {
  try {
    assertEntry(text);
    return false;
  } catch {
    return true;
  }
}

function selfTest(): void {
  const checks: Array<[string, boolean]> = [
    ["rejects empty", rejects("")],
    ["rejects whitespace only", rejects("   ")],
    ["rejects newline (LF)", rejects("a\nb")],
    ["rejects newline (CR)", rejects("a\rb")],
    ["accepts 200 chars", !rejects("x".repeat(MAX_LENGTH))],
    ["rejects 201 chars", rejects("x".repeat(MAX_LENGTH + 1))],
  ];

  const dir = mkdtempSync(join(tmpdir(), "fridge-roast-"));
  try {
    const file = writeEntry(ENTRY, dir);
    checks.push(["round-trip byte-identical", readFileSync(file).equals(Buffer.from(ENTRY))]);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }

  let failed = 0;
  for (const [name, ok] of checks) {
    console.log(`${ok ? "PASS" : "FAIL"}  ${name}`);
    if (!ok) failed++;
  }
  if (failed > 0) {
    console.error(`${failed} check(s) failed`);
    process.exit(1);
  }
  console.log(`all ${checks.length} checks passed`);
}

if (process.argv.includes("--self-test")) {
  selfTest();
} else {
  const written = writeEntry(ENTRY, "/output");
  console.log(`wrote ${written} (${ENTRY.length} chars)`);
}
