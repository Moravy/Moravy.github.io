import type { CSSProperties } from "react";
import Link from "next/link";
import AskProvider from "@/components/AskProvider";
import AskInline from "@/components/AskInline";
import ScrollReveal from "@/components/ScrollReveal";
import CohortStanding from "@/components/CohortStanding";
import SiteFooter from "@/components/SiteFooter";
import { HERO, HIGHLIGHTS, SOCIAL, STATS, TESTIMONIALS } from "@/lib/profile";
import { getAllPosts } from "@/lib/posts";

export default function Page() {
  const posts = getAllPosts();

  return (
    <>
      <AskProvider>
        <div className="page">
          <header className="masthead">
            <span className="mark">Moravy Oum</span>
            <nav className="mast-nav">
              <span>
                {SOCIAL.role} · {SOCIAL.location}
              </span>
              <Link className="mast-link" href="/writing">
                Writing
              </Link>
              <a className="mast-resume" href={SOCIAL.resume} target="_blank" rel="noopener noreferrer">
                Résumé ↗
              </a>
            </nav>
          </header>

          <ScrollReveal />
          <main>
            <section className="hero">
              <p className="eyebrow">{HERO.eyebrow}</p>
              <h1 className="headline">
                {HERO.headline.split(" ").flatMap((w, i) => [
                  i ? " " : null,
                  <span className="word" key={i} style={{ ["--wi"]: i } as CSSProperties}>
                    {w}
                  </span>,
                ])}{" "}
                <em
                  className="word"
                  style={{ ["--wi"]: HERO.headline.split(" ").length } as CSSProperties}
                >
                  {HERO.headlineAccent}
                </em>
              </h1>
              <p className="lede">{HERO.lede}</p>
              <AskInline />
            </section>

            <section className="block">
              <p className="section-label" data-reveal>
                Selected work, 8 months at Xero
              </p>
              <ol className="highlights">
                {HIGHLIGHTS.map((h, i) => (
                  <li className="hl" key={h.title} data-reveal style={{ ["--ri"]: i } as CSSProperties}>
                    <span className="hl-num">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="hl-kicker">{h.kicker}</p>
                      <h2 className="hl-title">{h.title}</h2>
                      <p className="hl-body">{h.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="block">
              <p className="section-label" data-reveal>
                By the numbers
              </p>
              <div className="stats">
                {STATS.map((s, i) => (
                  <div className="stat" key={s.cap} data-reveal style={{ ["--ri"]: i } as CSSProperties}>
                    <span className="stat-fig">{s.fig}</span>
                    <span className="stat-cap">{s.cap}</span>
                  </div>
                ))}
              </div>
              <CohortStanding />
            </section>

            <section className="block">
              <p className="section-label" data-reveal>
                What people say
              </p>
              <div className="kudos">
                {TESTIMONIALS.map((t, i) => (
                  <figure
                    className="kudo"
                    key={t.who + t.quote.slice(0, 16)}
                    data-reveal
                    style={{ ["--ri"]: i } as CSSProperties}
                  >
                    <blockquote className="kudo-q">{t.quote}</blockquote>
                    <figcaption className="kudo-who">{t.who}</figcaption>
                  </figure>
                ))}
              </div>
            </section>

            {posts.length > 0 ? (
              <section className="block">
                <p className="section-label" data-reveal>
                  Writing, on building with AI
                </p>
                <ol className="post-list">
                  {posts.slice(0, 3).map((p, i) => (
                    <li className="post-row" key={p.slug} data-reveal style={{ ["--ri"]: i } as CSSProperties}>
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
                <p className="more-row">
                  <Link className="more-link" href="/writing">
                    All writing →
                  </Link>
                </p>
              </section>
            ) : null}
          </main>

          <SiteFooter fine="Built by Moravy Oum. You can ask this page anything about his work." />
        </div>
      </AskProvider>
    </>
  );
}
