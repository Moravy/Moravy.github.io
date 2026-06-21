// SERVER-ONLY. Reads the blog markdown in content/blog and renders it.
// Each post starts with a small frontmatter block (`summary:`) then an `# H1`.

import fs from "node:fs";
import path from "node:path";
import { Marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

// Curated order — most personal / launch-worthy first.
const ORDER = [
  "how-ai-gave-me-confidence",
  "ai-first-ai-native-engineer-the-defaults-i-changed",
  "how-i-use-claude-code-day-to-day",
  "how-ai-agents-are-shifting-the-software-development-lifecycle",
];

export interface TocItem {
  id: string;
  text: string;
  level: number;
}
export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  summary: string;
}
export interface Post extends PostMeta {
  html: string;
  toc: TocItem[];
}

function readRaw(slug: string): string {
  return fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8");
}

function orderedSlugs(): string[] {
  let files: string[] = [];
  try {
    files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }
  return files
    .map((f) => f.replace(/\.md$/, ""))
    .sort((a, b) => {
      const ia = ORDER.indexOf(a);
      const ib = ORDER.indexOf(b);
      if (ia === -1 && ib === -1) return a.localeCompare(b);
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });
}

function stripFrontmatter(raw: string): { body: string; summary: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { body: raw, summary: "" };
  const sm = m[1].match(/^summary:\s*(.+)$/m);
  return { body: raw.slice(m[0].length), summary: sm ? sm[1].trim() : "" };
}

function parse(slug: string, raw: string) {
  const { body: afterFm, summary } = stripFrontmatter(raw);
  const lines = afterFm.split(/\r?\n/);
  let title = slug.replace(/-/g, " ");
  const h1 = lines.findIndex((l) => l.startsWith("# "));
  if (h1 !== -1) title = lines[h1].replace(/^#\s+/, "").trim();

  const bodyLines = h1 !== -1 ? lines.slice(h1 + 1) : lines;
  const body = bodyLines.join("\n").trim();

  const excerpt = (
    bodyLines.find((l) => {
      const t = l.trim();
      return t && !t.startsWith("#") && !t.startsWith("-") && !t.startsWith("|") && !t.startsWith(">");
    }) ?? ""
  ).trim();

  return { title, body, excerpt, summary };
}

// rewrite cross-post relative links (./slug.md) to /writing/slug
function rewriteLinks(md: string): string {
  return md.replace(/\]\(\.?\/?([a-z0-9-]+)\.md\)/gi, "](/writing/$1)");
}

function makeSlugger() {
  const seen = new Map<string, number>();
  return (raw: string): string => {
    const base =
      raw
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-") || "section";
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    return n ? `${base}-${n}` : base;
  };
}

// Render markdown → html, adding ids to headings and collecting an h2/h3 TOC.
function render(md: string): { html: string; toc: TocItem[] } {
  const slug = makeSlugger();
  const toc: TocItem[] = [];
  const m = new Marked();
  m.use({
    renderer: {
      heading(token) {
        const t = token as { depth: number; text: string; tokens: unknown[] };
        const id = slug(t.text);
        if (t.depth === 2 || t.depth === 3) {
          toc.push({ id, text: t.text, level: t.depth });
        }
        const self = this as unknown as { parser: { parseInline: (x: unknown) => string } };
        const inner = self.parser.parseInline(t.tokens);
        return `<h${t.depth} id="${id}">${inner}</h${t.depth}>\n`;
      },
    },
  });
  const html = m.parse(rewriteLinks(md)) as string;
  return { html, toc };
}

export function getAllPosts(): PostMeta[] {
  return orderedSlugs().map((slug) => {
    const { title, excerpt, summary } = parse(slug, readRaw(slug));
    return { slug, title, excerpt, summary };
  });
}

export function getPostSlugs(): string[] {
  return orderedSlugs();
}

export function getPost(slug: string): Post | null {
  let raw: string;
  try {
    raw = readRaw(slug);
  } catch {
    return null;
  }
  const { title, body, excerpt, summary } = parse(slug, raw);
  const { html, toc } = render(body);
  return { slug, title, excerpt, summary, html, toc };
}
