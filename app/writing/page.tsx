import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { SOCIAL } from "@/lib/profile";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Writing · Moravy Oum",
  description:
    "Notes on AI-assisted software engineering: the patterns, the workflows, and the honest trade-offs from real work.",
};

export default function WritingIndex() {
  const posts = getAllPosts();

  return (
    <div className="page">
      <header className="masthead">
        <Link className="mark" href="/">
          Moravy Oum
        </Link>
        <nav className="mast-nav">
          <Link className="mast-link" href="/">
            ← Home
          </Link>
          <a className="mast-resume" href={SOCIAL.resume} target="_blank" rel="noopener noreferrer">
            Résumé ↗
          </a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <p className="eyebrow">Writing</p>
          <h1 className="headline">
            On building <em>with AI.</em>
          </h1>
          <p className="lede">
            Notes on AI-assisted software engineering: the patterns, the workflows, and the honest
            trade-offs from real work.
          </p>
        </section>

        <section className="block">
          <ol className="post-list">
            {posts.map((p, i) => (
              <li className="post-row" key={p.slug}>
                <Link className="post-link" href={`/writing/${p.slug}`}>
                  <span className="post-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="post-main">
                    <span className="post-title">{p.title}</span>
                    <span className="post-excerpt">{p.excerpt}</span>
                  </span>
                  <span className="post-cta">Read ↗</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
