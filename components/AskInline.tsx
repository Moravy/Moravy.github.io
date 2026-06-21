"use client";

import { useEffect, useState } from "react";
import { ENTRY_GROUPS, CYCLE } from "@/lib/qa";
import { useAsk } from "./AskProvider";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Hero entry. No free-text / no AI: a prefilled prompt cycles through real
// questions (click to ask), with the curated entry questions below.
export default function AskInline() {
  const { ask, browse, open } = useAsk();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (open || paused || reduced()) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % CYCLE.length), 3600);
    return () => window.clearInterval(t);
  }, [open, paused]);

  const current = CYCLE[i] ?? CYCLE[0];

  return (
    <div className="ask-inline" data-open={open || undefined} aria-hidden={open || undefined}>
      <p className="ask-cue">Pick a question. Every answer is pre-written, no AI guessing</p>

      <button
        className="ask-prompt"
        type="button"
        onClick={() => ask(current.q)}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-label={`Ask: ${current.q}`}
      >
        <span key={current.id} className="ask-prompt-text">
          {current.q}
        </span>
        <span className="ask-prompt-go" aria-hidden="true">
          Ask →
        </span>
      </button>

      <div className="ask-suggest-groups">
        {ENTRY_GROUPS.map((group) => (
          <div className="ask-group" key={group.label}>
            <span className="ask-group-label">{group.label}</span>
            <div className="ask-suggest">
              {group.items.map((s) => (
                <button key={s.id} className="ask-pill" type="button" onClick={() => ask(s.q)}>
                  {s.q}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="ask-browse" type="button" onClick={browse}>
        Browse all questions <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
