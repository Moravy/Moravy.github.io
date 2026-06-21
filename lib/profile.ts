// CLIENT-SAFE content for the editorial layout. There is no AI/server knowledge
// layer; the Ask experience is fully curated in lib/qa.ts. Altitude here: real
// outcomes only, no internal IDs, service/repo names, or coworkers' names.

export const SOCIAL = {
  name: "Moravy Oum",
  role: "Software Engineer",
  location: "Auckland, NZ",
  linkedin: "https://linkedin.com/in/moravy-oum",
  github: "https://github.com/Moravy",
  email: "moravy22@gmail.com",
  portfolio: "https://moravy.github.io/Moravy_Oum",
  resume: "/moravy-oum-cv.pdf",
};

export const HERO = {
  eyebrow: "Moravy Oum · Interactive résumé",
  // headline is split so "Ask." can carry the accent
  headline: "Don’t take my word for it.",
  headlineAccent: "Ask.",
  lede:
    "I’m a software engineer at Xero. In eight months I’ve taken a new service from empty repo to production, owned incidents end-to-end, and helped drive production alerts from 258 a month to around 54, with AI as a force-multiplier, not a crutch. This page knows the details. Ask it anything.",
};

export const HIGHLIGHTS = [
  {
    kicker: "Ownership",
    title: "Took a new service from empty repo to production",
    body:
      "Scaffolded the infrastructure-as-code, the event handlers, encrypted secrets and network connectivity, structured logging and metrics, the operational-readiness review, and the rollout runbook. The whole lifecycle, not a feature on someone else's platform.",
  },
  {
    kicker: "Judgment",
    title: "Headed off a million-request-a-day problem before it shipped",
    body:
      "Caught at design time that his new service would hammer another team's API ~1M+ times a day for data it didn't need. He quantified the risk, proposed a leaner endpoint, drove the cross-team redesign to agreement, and held his own rollout until it was resolved.",
  },
  {
    kicker: "Reliability",
    title: "Drove production alerts from 258 to ~54 a month",
    body:
      "By fixing root causes and deleting dead code, not muting alarms: SQL retry/backoff, defunct infrastructure removed, thresholds tuned. Investigated every alert on-call and hit two consecutive zero-alert days.",
  },
  {
    kicker: "Influence",
    title: "AI-native engineering that spread beyond his team",
    body:
      "A division-wide talk on treating AI as a contractor that needs context: knowledge bases, automated workflows, and subagents that run multi-source incident investigations. His manager picked up one of his tools, a partner-team lead asked for his knowledge-base template to build their own, and he mentors an engineer on another team.",
  },
];

// Absolute headline figures. Kept distinct from the cohort standings below
// (which own the ranked metrics: reverts, repos, reviews, PRs, AI adoption).
export const STATS = [
  { fig: "8", cap: "months at Xero" },
  { fig: "258→54", cap: "monthly production alerts, on his watch" },
  { fig: "48K→7K", cap: "bank records deduped in a 3-day build" },
  { fig: "1", cap: "service shipped, empty repo to production" },
];

// Anonymized to role, real recognition from his knowledge base.
export const TESTIMONIALS = [
  {
    quote: "In my team, you are the most prolific Claude user.",
    who: "An SVP of engineering",
  },
  {
    quote: "Thank you Moravy for being my AI mentor. I've learnt so much, and I'll keep learning more.",
    who: "A mentee, on another team",
  },
  {
    quote: "That's awesome!!! Thanks for sharing it.",
    who: "His engineering manager, on a tool he then adopted",
  },
  {
    quote: "Your repo is so comprehensive I literally don't know how you get there. It's simply amazing.",
    who: "An engineer he paired with",
  },
];

export const FOOTER_LINE = "AI didn’t replace me. It multiplied me.";
