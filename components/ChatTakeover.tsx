"use client";

import { useEffect, useRef, useState } from "react";
import { nextSuggestions, themeIndex } from "@/lib/qa";
import { SOCIAL } from "@/lib/profile";
import type { Turn } from "./AskProvider";

// "The Record" — a fully curated dossier interview. No text input / no AI:
// you arrive on a question, the answer surfaces the best next ones, and a
// "Browse all" index lets you jump anywhere. Progressive disclosure.
export default function ChatTakeover({
  open,
  browseReq,
  turns,
  onAsk,
  onBack,
}: {
  open: boolean;
  browseReq: number;
  turns: Turn[];
  onAsk: (q: string) => void;
  onBack: () => void;
}) {
  const [showIndex, setShowIndex] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevLen = useRef(0);

  // "Browse all" intent opens the index
  useEffect(() => {
    if (browseReq > 0) setShowIndex(true);
  }, [browseReq]);

  // a newly asked question leaves the index and returns to the transcript
  useEffect(() => {
    if (turns.length > prevLen.current) setShowIndex(false);
    prevLen.current = turns.length;
  }, [turns.length]);

  // reset when the takeover closes
  useEffect(() => {
    if (!open) setShowIndex(false);
  }, [open]);

  // bring the newest entry into view
  useEffect(() => {
    if (!open || showIndex) return;
    scrollRef.current
      ?.querySelector(".entry:last-child")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [turns, open, showIndex]);

  const asked = new Set(turns.map((t) => t.qaId));
  const lastId = turns[turns.length - 1]?.qaId;
  const suggestions = nextSuggestions(asked, lastId, 6);
  const indexView = showIndex || turns.length === 0;

  return (
    <section
      className="record"
      data-open={open}
      aria-hidden={!open || undefined}
      aria-label="The record, interactive Q&A"
    >
      <div className="record-grain" aria-hidden="true" />

      <div className="record-frame">
        <header className="record-head">
          <button className="record-back" type="button" onClick={onBack}>
            <span aria-hidden="true">←</span> Overview
          </button>
          <span className="record-file">
            <span className="record-dot" aria-hidden="true" />
            The Record
          </span>
        </header>

        <div className="record-scroll" ref={scrollRef}>
          {indexView ? (
            <div className="record-col record-index">
              <p className="index-title">All questions</p>
              <p className="index-sub">
                Every answer is hand-written. Pick any to begin; answered ones are checked.
              </p>
              {themeIndex().map((cat) => (
                <section className="index-cat" key={cat.category}>
                  <h3 className="index-cat-label">{cat.label}</h3>
                  {cat.themes.map((t) => (
                    <div className="index-theme" key={t.key}>
                      <p className="index-theme-label">{t.label}</p>
                      <ul className="index-list">
                        {t.items.map((q) => {
                          const done = asked.has(q.id);
                          return (
                            <li key={q.id}>
                              <button
                                className="index-q"
                                type="button"
                                data-asked={done || undefined}
                                onClick={() => onAsk(q.q)}
                              >
                                <span className="index-q-mark" aria-hidden="true">
                                  {done ? "✓" : "→"}
                                </span>
                                {q.q}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </section>
              ))}
            </div>
          ) : (
            <div className="record-col">
              {turns.map((t, i) => (
                <article className="entry" key={t.id}>
                  <div className="entry-index" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="entry-main">
                    <p className="entry-label">Question</p>
                    <h2 className="entry-q">{t.q}</h2>
                    <p className="entry-label accent">On the record</p>
                    <div className="entry-a">
                      {t.a}
                      {!t.done && <span className="caret" />}
                    </div>
                    {t.done && t.followups.length > 0 && (
                      <div className="entry-more">
                        <span className="entry-more-label">Continue</span>
                        {t.followups.map((f) => (
                          <button
                            key={f.id}
                            className="chip"
                            type="button"
                            onClick={() => onAsk(f.q)}
                          >
                            {f.q}
                            <span aria-hidden="true">→</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <footer className="record-foot">
          {indexView ? (
            turns.length > 0 ? (
              <button className="record-allbtn" type="button" onClick={() => setShowIndex(false)}>
                <span aria-hidden="true">←</span> Back to the answer
              </button>
            ) : (
              <p className="record-hint">Pick any question above to begin.</p>
            )
          ) : (
            <>
              {suggestions.length > 0 && (
                <div className="foot-next">
                  <span className="foot-next-label">Where to next</span>
                  <div className="foot-next-list">
                    {suggestions.map((s) => (
                      <button key={s.id} className="chip" type="button" onClick={() => onAsk(s.q)}>
                        {s.q}
                        <span aria-hidden="true">→</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <button className="record-allbtn" type="button" onClick={() => setShowIndex(true)}>
                Browse all questions <span aria-hidden="true">→</span>
              </button>
            </>
          )}
          <a className="record-dm" href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer">
            Question not answered here? <span>Message me on LinkedIn →</span>
          </a>
        </footer>
      </div>
    </section>
  );
}
