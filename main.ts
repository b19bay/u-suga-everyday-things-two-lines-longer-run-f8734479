// Everyday Things, Two Lines, Longer Run — u-suga-everyday-things-two-lines-longer-run-f8734479
// Writes exactly two lines to /output/entry.txt:
// Line 1 explains rain to a 10-year-old with a sponge analogy.
// Line 2 says what the analogy maps and what it leaves out.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE_1 =
  "Rain is the sky wringing out a giant sponge, and every drop is the water it squeezes loose.";
const LINE_2 =
  "It maps how clouds hold water and let it go in drops, but leaves out that no hands do the squeezing and the sky never gets tired.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (outDir === undefined || outDir === "") {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

const text = LINE_1 + "\n" + LINE_2;
if (text.length < 1 || text.length > 400) {
  throw new Error("entry must be 1-400 characters, got " + text.length);
}
if (text.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
const lines = text.split("\n");
if (lines.length !== 2) {
  throw new Error("entry must be exactly two lines, got " + lines.length);
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, text, "utf8");
// Read back and confirm the written bytes are exactly the entry.
const written = readFileSync(outPath, "utf8");
if (written !== text) {
  throw new Error("entry.txt read-back does not match the entry");
}
