// Cleaned, public-safe metrics drawn from the knowledge base.

// Cohort standing, sourced from the DX Data Cloud export (personal-metrics
// snapshot). Anonymized, domain-level percentiles (n=38) — no named peers, no
// internal cost figures. Ordered strongest-first.
//
// "Top quartile" delivery row is deliberately conservative: he's #4-#5 of 38
// (p89-p92, actually ~top 10%) across PRs merged, tickets, story points, and
// deploys — top quartile is the claim true for ALL of them, so it can't be read
// as cherry-picked, and it avoids the story-points "of 29" denominator.
export const COHORT = {
  // Org-wide headline (1,300+ engineers) — the differentiator, on-thesis.
  headline: {
    fig: "Top 1%",
    rest: "for AI-assisted development, across Xero's 1,300+ engineers.",
  },
  head: "And within my 38-engineer domain",
  note: "Bank Feeds domain · 38 engineers · Oct 2025 to May 2026",
  rows: [
    { label: "0 reverts across 93 merged pull requests", pos: "#1 of 38", top: true },
    { label: "Shipped to 29 repositories", pos: "#1 of 38", top: true },
    { label: "Used AI tools 210 days, nearly every workday", pos: "#1 of 38", top: true },
    { label: "170+ story points delivered", pos: "Top quartile", top: false },
  ],
};
