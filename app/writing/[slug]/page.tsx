import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getPostSlugs } from "@/lib/posts";
import { SOCIAL } from "@/lib/profile";
import Toc from "@/components/Toc";
import SiteFooter from "@/components/SiteFooter";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Writing · Moravy Oum" };
  return {
    title: `${post.title} · Moravy Oum`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="page">
      <header className="masthead">
        <Link className="mark" href="/">
          Moravy Oum
        </Link>
        <nav className="mast-nav">
          <Link className="mast-link" href="/writing">
            ← All writing
          </Link>
          <a className="mast-resume" href={SOCIAL.resume} target="_blank" rel="noopener noreferrer">
            Résumé ↗
          </a>
        </nav>
      </header>

      <main>
        <div className="post-layout">
          <article className="post">
            <p className="eyebrow">Writing</p>
            <h1 className="post-h1">{post.title}</h1>
            {post.summary ? (
              <aside className="post-summary">
                <span className="post-summary-label">The 30-second version</span>
                <p>{post.summary}</p>
              </aside>
            ) : null}
            <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
            <div className="post-foot">
              <Link className="mast-link" href="/writing">
                ← All writing
              </Link>
            </div>
          </article>
          {post.toc.length > 1 ? <Toc items={post.toc} /> : null}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
