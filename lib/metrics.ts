// Cleaned, public-safe metrics drawn from the knowledge base.

// Cohort standing, sourced from the DX Data Cloud export (personal-metrics
// snapshot). Anonymized, domain-level percentiles (n=38) — no named peers, no
// internal cost figures. Ordered strongest-first.
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
    { label: "664 reviews given on teammates' pull requests", pos: "#3 of 38", top: false },
  ],
};
