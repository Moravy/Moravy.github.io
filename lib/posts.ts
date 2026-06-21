// SERVER-ONLY. Reads the blog markdown in content/blog and renders it.
// Each post opens with a small frontmatter block (`summary:`, `publishedAt:`)
// then an `# H1`.
//
// Scheduled publishing (the weekly drip): a post stays hidden until its
// `publishedAt` date has arrived, compared at BUILD time. The deploy workflow
// re-runs on a daily schedule, so a future-dated post goes live on its date with
// no one touching the repo. A post with no `publishedAt` is always visible.

import fs from "node:fs";
import path from "node:path";
import { Marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

// Curated order, used only to break ties between posts that share a date.
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
  publishedAt: string; // "YYYY-MM-DD", or "" if unset
  dateLabel: string; // human label, e.g. "20 Jun 2026"
}
export interface Post extends PostMeta {
  html: string;
  toc: TocItem[];
}

function readRaw(slug: string): string {
  return fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8");
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function formatDate(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return "";
  return `${parseInt(m[3], 10)} ${MONTHS[parseInt(m[2], 10) - 1]} ${m[1]}`;
}

// A post is live once its publish date has arrived (UTC, at build time). No date
// means always live, and an unparseable date never hides a post.
function isPublished(publishedAt: string): boolean {
  if (!publishedAt) return true;
  const t = Date.parse(`${publishedAt}T00:00:00Z`);
  if (Number.isNaN(t)) return true;
  return t <= Date.now();
}

function parseFrontmatter(raw: string): { body: string; summary: string; publishedAt: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { body: raw, summary: "", publishedAt: "" };
  const fm = m[1];
  const summary = fm.match(/^summary:\s*(.+)$/m)?.[1].trim() ?? "";
  const publishedAt = fm.match(/^publishedAt:\s*(.+)$/m)?.[1].trim() ?? "";
  return { body: raw.slice(m[0].length), summary, publishedAt };
}

interface SlugInfo {
  slug: string;
  publishedAt: string;
}

function allSlugInfo(): SlugInfo[] {
  let files: string[] = [];
  try {
    files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }
  return files.map((f) => {
    const slug = f.replace(/\.md$/, "");
    return { slug, publishedAt: parseFrontmatter(readRaw(slug)).publishedAt };
  });
}

// Live posts only, newest first; curated ORDER breaks ties on an equal date.
function publishedSlugs(): string[] {
  return allSlugInfo()
    .filter((s) => isPublished(s.publishedAt))
    .sort((a, b) => {
      const ta = a.publishedAt ? Date.parse(a.publishedAt) : 0;
      const tb = b.publishedAt ? Date.parse(b.publishedAt) : 0;
      if (ta !== tb) return tb - ta;
      const ia = ORDER.indexOf(a.slug);
      const ib = ORDER.indexOf(b.slug);
      if (ia === -1 && ib === -1) return a.slug.localeCompare(b.slug);
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    })
    .map((s) => s.slug);
}

function parse(slug: string, raw: string) {
  const { body: afterFm, summary, publishedAt } = parseFrontmatter(raw);
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

  return { title, body, excerpt, summary, publishedAt, dateLabel: formatDate(publishedAt) };
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
  return publishedSlugs().map((slug) => {
    const { title, excerpt, summary, publishedAt, dateLabel } = parse(slug, readRaw(slug));
    return { slug, title, excerpt, summary, publishedAt, dateLabel };
  });
}

export function getPostSlugs(): string[] {
  return publishedSlugs();
}

export function getPost(slug: string): Post | null {
  let raw: string;
  try {
    raw = readRaw(slug);
  } catch {
    return null;
  }
  const { title, body, excerpt, summary, publishedAt, dateLabel } = parse(slug, raw);
  if (!isPublished(publishedAt)) return null; // not live yet
  const { html, toc } = render(body);
  return { slug, title, excerpt, summary, publishedAt, dateLabel, html, toc };
}
