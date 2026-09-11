#!/usr/bin/env node
// Creates a new post skeleton in src/posts.
//
//   npm run new -- "Read Structure and Interpretation of Computer Programs" --type book --tags sicp,lisp
//   npm run new -- "Finished a Rust course" -t course -d 2026-10-01
//
// Options: --type/-t <type>  --tags <a,b,c>  --date/-d <YYYY-MM-DD>
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { POST_TYPES } from "../eleventy.config.js";

const args = process.argv.slice(2);
const opts = { type: "note", tags: [], date: new Date().toISOString().slice(0, 10) };
const words = [];
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--type" || a === "-t") opts.type = args[++i];
  else if (a === "--tags") opts.tags = args[++i].split(",").map((s) => s.trim()).filter(Boolean);
  else if (a === "--date" || a === "-d") opts.date = args[++i];
  else words.push(a);
}
const title = words.join(" ").trim();
if (!title) {
  console.error('Usage: npm run new -- "Post title" [--type project|course|book|concept|article|talk|milestone|note] [--tags a,b] [--date YYYY-MM-DD]');
  process.exit(1);
}
if (!POST_TYPES[opts.type]) {
  console.error(`Unknown type "${opts.type}". Known types: ${Object.keys(POST_TYPES).join(", ")}`);
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .normalize("NFKD")
  .replace(/[^\w\s-]/g, "")
  .trim()
  .replace(/[\s_]+/g, "-")
  .slice(0, 60);

const dir = join("src", "posts", opts.date.slice(0, 4));
mkdirSync(dir, { recursive: true });
const file = join(dir, `${opts.date}-${slug}.md`);
if (existsSync(file)) {
  console.error(`${file} already exists`);
  process.exit(1);
}

const frontMatter = [
  "---",
  `title: ${JSON.stringify(title)}`,
  `date: ${opts.date}`,
  `type: ${opts.type}`,
  `summary: ""`,
  `tags: [${opts.tags.join(", ")}]`,
  "links:",
  "  # - label: Repository",
  "  #   url: https://github.com/pharick/...",
  "---",
  "",
  "Write about it here.",
  "",
].join("\n");

writeFileSync(file, frontMatter);
console.log(`Created ${file}`);
