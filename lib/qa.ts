// The Record, a fully curated Q&A. No AI, no free-text matching: every answer
// is hand-written and every entry point is a click. Questions are grouped into
// themed "journeys" and each carries `followups` so the experience discloses
// progressively, it knows what you've asked and what's worth asking next.

export type Category = "recruiter" | "engineer";
export type Theme =
  | "fit"
  | "proof"
  | "person"
  | "logistics"
  | "reliability"
  | "build"
  | "ai"
  | "craft";

export interface QA {
  id: string;
  q: string; // display question
  category: Category;
  theme: Theme;
  a: string; // hand-written answer
  followups?: string[]; // ids of the best next questions
  suggested?: boolean; // entry question shown on the landing
}

// Journey themes, in the order they should read.
export const THEMES: { key: Theme; label: string; category: Category }[] = [
  { key: "fit", label: "Is he a fit?", category: "recruiter" },
  { key: "proof", label: "The proof", category: "recruiter" },
  { key: "person", label: "The person", category: "recruiter" },
  { key: "logistics", label: "Practicalities", category: "recruiter" },
  { key: "reliability", label: "Reliability & ops", category: "engineer" },
  { key: "build", label: "What he's built", category: "engineer" },
  { key: "ai", label: "AI-native engineering", category: "engineer" },
  { key: "craft", label: "Craft & judgment", category: "engineer" },
];

export const QA: QA[] = [
  // ════════ RECRUITERS ════════
  // ── Fit ──────────────────────────────────────────────────────────
  {
    id: "summary",
    q: "Give me the 30-second summary",
    category: "recruiter",
    theme: "fit",
    suggested: true,
    followups: ["shipped-service", "senior", "achievements"],
    a: "Moravy is a software engineer in Auckland with 5+ years' experience, now on Xero's Bank Feeds team, one of the company's most complex, high-stakes domains. In his first eight months he's taken a brand-new service from empty repo to production, owned a bank-feed restore end-to-end, wrote the problem statement and data analysis for a Sev3 privacy incident, helped drive production alerts from 258 a month to around 54, and presented an AI-native engineering approach to a division-wide audience. He's known for using AI as a genuine force-multiplier. Next step: Senior Engineer.",
  },
  {
    id: "senior",
    q: "Is he ready for a senior role?",
    category: "recruiter",
    theme: "fit",
    suggested: true,
    followups: ["influence", "growth", "achievements"],
    a: "The evidence points that way. He's owned incidents end-to-end (including running a post-incident review as incident owner and liaising directly with a bank), drove a cross-codebase security migration across 6+ components, led a full-stack feature, catching a spec error that saved a rework, and influenced beyond his team with a division-wide talk. His honest growth edges are deliberate mentorship and broadening his technical influence, both of which he's actively building. Net: a strong senior trajectory with a clear-eyed view of the gaps.",
  },
  {
    id: "growth",
    q: "What are his growth areas?",
    category: "recruiter",
    theme: "fit",
    followups: ["mistake", "mentoring", "senior"],
    a: "He'd tell you straight: his growth edges are deliberate mentorship and broadening his technical influence beyond his immediate team, both things he's actively working on, from a division-wide talk to starting to mentor an engineer on another team. He's also working on picking the highest-impact work earliest rather than getting drawn into lower-leverage tasks.",
  },
  {
    id: "different",
    q: "What makes him different?",
    category: "recruiter",
    theme: "fit",
    followups: ["ai-workflow", "collaboration", "achievements"],
    a: "Two things. First, operational ownership: he runs toward incidents, fixes root causes instead of muting alarms, and documents so the next person isn't stuck. Second, he's genuinely AI-native: not just 'I use an assistant,' but building knowledge bases, agents, and workflows that change how fast a team can move, then sharing them across the division. He pairs that with full-stack delivery and a habit of catching problems early.",
  },

  // ── Proof ────────────────────────────────────────────────────────
  {
    id: "achievements",
    q: "What are his biggest achievements?",
    category: "recruiter",
    theme: "proof",
    suggested: true,
    followups: ["shipped-service", "influence", "alerts"],
    a: "A few stand out from his first eight months at Xero:\n• Took a brand-new event-driven service from empty repo to production: infrastructure, handlers, encrypted secrets, observability and rollout, owned end-to-end.\n• Helped drive production alerts from ~258 to ~54 a month by fixing root causes, not muting alarms, with two consecutive zero-alert days.\n• Owned incidents end-to-end: as incident commander on one (developing the datafix and running the post-incident review), and a bank key expiry where he liaised directly with the bank to restore a live feed. On a separate Sev3 privacy incident he wrote the problem statement and the SQL that identified the affected records.\n• Shipped a full-stack feature in ~11 days and caught a spec error mid-build that prevented a costly rework.\n• Presented AI-native engineering to a division-wide audience.",
  },
  {
    id: "background",
    q: "What's his background and experience?",
    category: "recruiter",
    theme: "proof",
    followups: ["different", "built", "stack"],
    a: "Before Xero, Moravy spent a year at Pushpay on the identity microservice that powered authentication across the company (he became the team's GraphQL go-to), and two and a half years at Vista Entertainment on a high-traffic cinema ticketing API, where he cut CPU usage 15% and new-engineer onboarding time ~60%. He started as a graduate developer at Enlighten Designs in 2021. He holds a Bachelor of Information Science (Computer Science & IT) from Massey University.",
  },
  {
    id: "teammate",
    q: "What would his teammates say?",
    category: "recruiter",
    theme: "proof",
    followups: ["influence", "collaboration", "mentoring"],
    a: "Their actual words: a mentee on another team calls him \"my AI mentor\" and said his knowledge base was \"so comprehensive I literally don't know how you get there, it's simply amazing.\" His manager's reaction to a tool he shared was \"that's awesome!!!\", then adopted it. A peer: \"I love the knowledge share and the initiative you've shown.\" Underneath the quotes: low-ego, generous with what he learns, high-initiative, and the kind of engineer who leaves things noticeably quieter than he found them.",
  },

  // ── The person ───────────────────────────────────────────────────
  {
    id: "collaboration",
    q: "What's he like to work with?",
    category: "recruiter",
    theme: "person",
    followups: ["mentoring", "teammate", "ambiguity"],
    a: "Collaborative and low-ego. He partners across teams to unblock people, fixing partner teams' build and test breakages proactively rather than tossing problems over the wall, and he shares what he learns (knowledge bases, AI workflows) so others move faster too. Teammates have noticed things running more smoothly since he's kept the alerts down. He's also calm in ambiguity, turning vague problems into clear paths with RFCs and design records.",
  },
  {
    id: "mentoring",
    q: "Does he mentor others?",
    category: "recruiter",
    theme: "person",
    followups: ["collaboration", "growth"],
    a: "It's an area he's deliberately growing. He's started 1:1 mentoring an engineer on another team, pairing on how to build AI knowledge bases and workflows, and he shares patterns widely, from the division talk to a shared team AI-tooling repo. He's candid that deepening mentorship is one of his focuses on the path to senior.",
  },
  {
    id: "ambiguity",
    q: "How does he handle ambiguity and pressure?",
    category: "recruiter",
    theme: "person",
    followups: ["incidents", "collaboration"],
    a: "He's calm when the path isn't obvious, he turns vague problems into clear ones. On the technical side that means RFCs and design records to align people before code; under live pressure it means methodical triage. When a bank's PGP key expired and broke a live feed, he didn't flail: he liaised directly with the bank, exchanged a new key, scripted the renewal, restored the feed, and documented it for the next person. Ambiguity gets a plan; incidents get a checklist.",
  },

  // ── Practicalities ───────────────────────────────────────────────
  {
    id: "contact",
    q: "How do I get in touch?",
    category: "recruiter",
    theme: "logistics",
    suggested: true,
    followups: ["looking", "summary", "whynow"],
    a: "The fastest way to reach Moravy is LinkedIn or email (moravy22@gmail.com), both linked at the bottom of the page. You can grab his résumé from the top. He's based in Auckland, New Zealand.",
  },
  {
    id: "looking",
    q: "What's he looking for next?",
    category: "recruiter",
    theme: "logistics",
    followups: ["senior", "contact"],
    a: "A Senior Engineer role where complex, high-stakes domains and real operational ownership are valued (the kind of work he's been doing on Bank Feeds), on a team that treats AI as a serious force-multiplier rather than a novelty. He's based in Auckland, New Zealand.",
  },
  {
    id: "whynow",
    q: "Why build this site? Why post now?",
    category: "recruiter",
    theme: "logistics",
    followups: ["different", "ai-workflow"],
    a: "Because the loudest take on AI is that it's overhyped and doesn't deliver, and his lived experience over eight months is the opposite. Rather than argue it, he built proof you can interrogate: a record of real outcomes you can question directly. The thesis is simple: don't take his word for it, ask. This page is itself an example of what he builds.",
  },
  {
    id: "writing",
    q: "Does he write or blog?",
    category: "recruiter",
    theme: "logistics",
    followups: ["ai-workflow", "talk"],
    a: 'Yes, Moravy writes about AI-assisted software engineering: the patterns he uses in real work, the workflows, and the honest trade-offs. You can read his posts in the Writing section of this site (link in the top nav), including "How AI Gave Me Confidence" and "How I Use Claude Code Day to Day".',
  },

  // ════════ ENGINEERS ════════
  // ── Reliability & ops ────────────────────────────────────────────
  {
    id: "alerts",
    q: "How did you cut alerts in half?",
    category: "engineer",
    theme: "reliability",
    suggested: true,
    followups: ["incidents", "oncall", "testing"],
    a: "Not by muting anything. During on-call rotations he investigated every alert, tracing root causes through logs and monitoring. Then he fixed the sources: removed defunct infrastructure for a collapsed bank source, traced recurring socket errors back to a connection-handling change, added SQL connection resilience (retry with exponential backoff) so transient DB blips stopped paging anyone, deleted ~500+ lines of dead code and 7+ stale feature flags, and tuned alert thresholds and aggregation windows so real incidents still fire reliably. The decline was a team signal he helped drive: ~258 alerts a month down to ~54, with two consecutive zero-alert days.",
  },
  {
    id: "incidents",
    q: "Tell me about an incident you owned",
    category: "engineer",
    theme: "reliability",
    followups: ["debugging", "hardest", "oncall"],
    a: "An incident he owned as commander for the first time: he developed the datafix and ran the post-incident review end-to-end. A bank PGP key expiry that broke a live feed, owned solo: he liaised directly with the external bank, exchanged a new cryptographic key, scripted the renewal, restored the feed, and documented the whole process. And on a Sev3 privacy incident (customers were receiving transactions that weren't theirs), he wrote the problem statement and the SQL to identify the affected records, supporting the incident team.",
  },
  {
    id: "oncall",
    q: "What's your approach to on-call and monitoring?",
    category: "engineer",
    theme: "reliability",
    followups: ["alerts", "incidents"],
    a: "Run toward the alerts, then make them stop firing for real. On rotation he investigated every alert and traced root causes through logs and monitoring rather than muting anything, fixing connection-handling bugs, adding SQL retry/backoff, removing defunct infrastructure, and tuning thresholds and aggregation so genuine incidents still page reliably. The payoff: monthly alerts fell from ~258 to ~54, with two consecutive zero-alert days.",
  },

  // ── What he's built ──────────────────────────────────────────────
  {
    id: "built",
    q: "What have you actually built?",
    category: "engineer",
    theme: "build",
    suggested: true,
    followups: ["shipped-service", "hardest", "testing"],
    a: "At Xero, the headline build is a full-stack 'Accounts' feature: a React/Redux UI through a .NET backend-for-frontend, with typed HTTP clients, a user-resolution endpoint covering every status path, and integration tests for each, mock endpoint to production-ready in ~11 days. Alongside that: a security migration moving feature-flag SDK keys into a shared secrets manager across 6+ components (cleanly removing a dependency chain rather than patching around it), 5 components migrated to GitHub Actions, SQL connection resilience with retry + backoff and a test suite, ~500+ lines of dead code and 7+ stale flags removed, and a new event-consumer service scaffolded for the team.",
  },
  {
    id: "stack",
    q: "What's his tech stack?",
    category: "engineer",
    theme: "build",
    followups: ["built", "ai-workflow"],
    a: "Day to day: C# and .NET (Core and Framework), AWS, Terraform, and GitHub Actions, with React/Redux and TypeScript on the front end. Data: SQL Server, DynamoDB, PostgreSQL, and GraphQL. On top of that, a deep practical toolkit for AI-assisted engineering: the Anthropic SDK, agent workflows, and context / knowledge-base engineering.",
  },
  {
    id: "hackathon",
    q: "What did you build at the hackathon?",
    category: "engineer",
    theme: "build",
    followups: ["ai-workflow", "built"],
    a: "At a banking hackathon he built a tool that creates a unified global bank registry (there's no single list of every bank in the world). It scrapes 60 financial regulators across 14 regions in parallel using six extraction methods (CSV, HTML + AI, browser automation, PDF, custom scrapers, and a Wikipedia fallback), then turns ~48,000 raw records into ~7,000 deduplicated institutions with AI-powered dedup, behind a searchable UI. Built and presented to the division in three days.",
  },
  {
    id: "projects",
    q: "What do you build outside work?",
    category: "engineer",
    theme: "build",
    followups: ["ai-workflow", "whynow"],
    a: "His side project is Zero-AI, a Claude-agent app that eliminates manual data entry for NZ accountants: upload a financial document, an agent classifies it and maps it to the right account, you approve, and it pushes. Built with Next.js, TypeScript, Prisma, the Anthropic SDK, and PostgreSQL. (This page you're reading is another one, a record you can talk to.)",
  },

  // ── AI-native engineering ────────────────────────────────────────
  {
    id: "ai-workflow",
    q: "What does your AI workflow look like?",
    category: "engineer",
    theme: "ai",
    suggested: true,
    followups: ["ai-incident", "kb", "subagents"],
    a: "Three layers. (1) Context: markdown knowledge bases that give an assistant real, retrievable context on a gnarly domain; this is what made his own onboarding fast. (2) Automation: reusable Skills that handle the repetitive scaffolding, like git branching, ticket linking, and feature-flag handling. (3) Investigation: subagents that pull from logs, metrics, and chat to run multi-source incident analysis; in one case the AI-written report matched the official root-cause analysis. He built a diagnostic investigation agent and shares it in the team's AI-tooling repo.",
  },
  {
    id: "just-ai",
    q: "Does he just let AI write everything?",
    category: "engineer",
    theme: "ai",
    followups: ["verify", "testing", "ai-workflow"],
    a: "Yes and no. Yes, he uses AI for almost everything he does on a computer: this site, his knowledge bases, drafting tickets, code, incident investigations, start to finish. But he never just lets it run unchecked, and that's the whole point. Reliability comes from how he verifies, and he reaches for whatever fits the task: spinning up several subagents to cross-check the work, reviewing it himself by hand, or building a dedicated checker that validates the output for him. AI writes a lot of the first draft; making sure it's correct is his job. As he puts it: AI didn't replace him; it multiplied him.",
  },
  {
    id: "kb",
    q: "What's an AI knowledge base, concretely?",
    category: "engineer",
    theme: "ai",
    followups: ["subagents", "ramp"],
    a: "Markdown files that give an assistant real, retrievable context about a gnarly domain, so the knowledge isn't trapped in a few people's heads. He built one for Bank Feeds early so the domain's context was retrievable instead of tribal: instead of interrupting teammates, he (and an assistant) can pull accurate context on demand. It's the foundation layer his workflows and agents sit on top of.",
  },
  {
    id: "subagents",
    q: "How does he use subagents?",
    category: "engineer",
    theme: "ai",
    followups: ["ai-workflow", "incidents"],
    a: "For multi-source investigation. He wires up subagents that pull from logs, metrics, and chat to run an incident analysis end-to-end; in one case the AI-written report matched the official root-cause analysis. He's packaged it into a diagnostic investigation agent shared in the team's AI-tooling repo, so the whole team can get a faster first read on what's happening.",
  },
  {
    id: "verify",
    q: "How does he keep AI from making things up?",
    category: "engineer",
    theme: "ai",
    followups: ["just-ai", "testing"],
    a: "He treats AI output as a draft to be verified, never a final answer. That means checking against primary sources (how he caught a spec encoding the wrong model), backing changes with tests, and keeping a human approval step in the loop: his Zero-AI side project literally classifies a document, then waits for you to approve before it pushes. Trust, but verify, with the tests and primary sources doing the verifying.",
  },
  {
    id: "talk",
    q: "Tell me about the AI talk he gave",
    category: "engineer",
    theme: "ai",
    followups: ["ai-workflow", "hackathon", "writing"],
    a: "He presented an AI-native engineering strategy to a division-wide audience at the engineering Community of Practice. The thesis: treat AI as a contractor that needs context. He walked through markdown knowledge bases, automating workflows with reusable Skills, and running multi-source incident investigations with subagents, with a live case study where the AI-generated incident report matched the official root-cause analysis. It sparked follow-on collaboration across teams and a proposal for a recurring division-wide AI-sharing forum.",
  },

  // ── Craft & judgment ─────────────────────────────────────────────
  {
    id: "hardest",
    q: "What's the hardest thing you've solved?",
    category: "engineer",
    theme: "craft",
    suggested: true,
    followups: ["scale-save", "built", "mistake"],
    a: "Two candidates. Technically gnarliest: mid-delivery on the Accounts feature he realised the spec encoded the wrong data-derivation model. He verified how the data is actually tagged against primary sources, reformalised the interface contract, and reshaped the architecture and plans, preventing a costly Phase-2 rework. Operationally hardest: a bank's PGP key expired and broke a live feed; he liaised directly with the bank, generated and exchanged a new cryptographic key, scripted the renewal, restored the feed, and documented the process for the next on-call.",
  },
  {
    id: "testing",
    q: "How do you approach testing and code quality?",
    category: "engineer",
    theme: "craft",
    followups: ["built", "verify", "stack"],
    a: "Tests come with the work, not after it. The user-resolution endpoint shipped with 16 unit + 8 integration tests covering every status path; the SQL resilience work added 9 unit tests for the retry logic; new code lands Sonar-clean. He also sped up CI without losing safety, isolating test type-checking and parallelising lint, so the whole team gets faster signal on every PR.",
  },
  {
    id: "ramp",
    q: "How did you ramp up on such a complex domain?",
    category: "engineer",
    theme: "craft",
    followups: ["kb", "built"],
    a: "Bank Feeds is a big, intricate domain. He built an AI knowledge base for it early so context was retrievable instead of tribal, took interrupts and on-call rotations sooner rather than later to learn by doing, and ran focused investigations and spikes to build depth. He was soon contributing across multiple repos, and within a couple of quarters was shaping technical direction with an RFC and a design record.",
  },
  {
    id: "mistake",
    q: "What's something he got wrong and learned from?",
    category: "engineer",
    theme: "craft",
    followups: ["growth", "senior"],
    a: "He'll tell you straight: early on he sometimes got pulled into lower-leverage work instead of the highest-impact task. The lesson, and what he's actively practising, is choosing the work that matters most, earliest, and being deliberate about where his time goes. He's candid about growth edges rather than papering over them; it's part of how he's approaching the step up to senior.",
  },

  // ════════ Senior-scope stories (mined from his knowledge base) ════════
  {
    id: "shipped-service",
    q: "Have you shipped a service end to end?",
    category: "engineer",
    theme: "build",
    suggested: true,
    followups: ["scale-save", "security", "incidents"],
    a: "Yes, a brand-new event-driven service, taken from an empty repo to production largely on his own. He scaffolded the infrastructure-as-code (the Lambda, queues, IAM), built the handler routing, wired up encrypted secrets and the network/streaming connectivity, added structured logging and metrics, wrote the operational-readiness review, and shipped behind feature flags with a rollout runbook and instant rollback. Not a feature on someone else's platform: the whole lifecycle, code to go-live.",
  },
  {
    id: "scale-save",
    q: "When did you stop a problem before it shipped?",
    category: "engineer",
    theme: "craft",
    followups: ["shipped-service", "influence", "hardest"],
    a: "His new service had to enrich every refresh event by calling another team's API, which, at the expected volume, would have hit that service over a million times a day for data it didn't actually need. Instead of shipping it, he quantified the load, proposed a leaner endpoint that read the datastore directly (performant on the key), and confirmed, rather than assumed, that the cheaper path held the right data. He drove the cross-team redesign to agreement while his lead was away, and held his own production rollout until it was resolved. A systemic load problem on another team's service, headed off at design time.",
  },
  {
    id: "ai-incident",
    q: "What's the most impressive thing your AI tooling has done?",
    category: "engineer",
    theme: "ai",
    followups: ["subagents", "debugging", "ai-workflow"],
    a: "During another team's Sev1, one he wasn't even on, he pointed his investigation agent at it, and it surfaced a likely root cause: a one-second liveness-probe timeout cascading into thread-pool saturation, which hadn't come up in the incident channel yet. He validated it and shared it, and the incident commander asked him to post it to the channel, where it pointed the platform team toward the caching config. The agent pulls from logs, metrics and chat to produce a multi-source root-cause read in minutes, always verified by a human before it's trusted.",
  },
  {
    id: "debugging",
    q: "What's the gnarliest bug you've debugged?",
    category: "engineer",
    theme: "reliability",
    followups: ["incidents", "ai-incident", "oncall"],
    a: "A slow-loading internal tool that turned out to have nothing to do with the code. He ruled out a malicious cause with the security team, then traced the request path across cloud topology: an Auckland gateway egressing via Singapore, hitting an Australian CDN edge, stalling on a 48 MB response. He wrote it up for the network team, owned the post-incident review, and added an alert so any web request over 30 seconds pages the team instead of silently hurting users. Debugging well below the application layer.",
  },
  {
    id: "security",
    q: "How does he think about security?",
    category: "engineer",
    theme: "craft",
    followups: ["shipped-service", "verify", "testing"],
    a: "As a design decision, not an afterthought. A confidential account number flowed through his new service into the data warehouse, so he built KMS envelope-encryption around it, and chose the failure modes deliberately: the producer is fail-closed (if encryption fails, the message dead-letters rather than ever publishing plaintext), while the consumer is fail-soft (it degrades gracefully without leaking ciphertext or breaking the request). Scoped IAM, per-environment keys, verified end-to-end with tests.",
  },
  {
    id: "influence",
    q: "How does he influence beyond his own team?",
    category: "recruiter",
    theme: "proof",
    suggested: true,
    followups: ["ai-incident", "talk", "teammate"],
    a: "Mostly by example, not by talking. His AI investigation agents run on his own team's work, but he's also honed them on other teams' incidents, which is where the cross-team reach comes from. He pointed an agent at another team's Sev1 he wasn't even on, surfaced a root cause the channel hadn't found, and helped resolve a problem that was never his to fix, all with AI. That firsthand demonstration is deliberate: it's how he pulls AI adoption along across the company. And the influence compounds instead of creating dependency: rather than getting teams to adopt his tools, he hands them the means to build their own. He shared a clonable knowledge-base template so any team could stand up its own KB, which a partner-team lead asked to bring to their people, and a metrics-querying shortcut he posted spread to teammates and up to his manager. Beyond engineering, he helped a designer speed up her work significantly. He also drove a cross-team API redesign to agreement, took an AI-direction question to an SVP who engaged and accepted a workflow walkthrough, and his first mentee, on another team, calls him \"my AI mentor.\"",
  },
];

// ── lookups ────────────────────────────────────────────────────────
const BY_ID = new Map(QA.map((item) => [item.id, item]));
const BY_TEXT = new Map(QA.map((item) => [item.q.toLowerCase(), item]));

export const getById = (id: string) => BY_ID.get(id);
export const byText = (text: string) => BY_TEXT.get(text.trim().toLowerCase());

function followupsFor(item: QA): QA[] {
  return (item.followups ?? [])
    .map((id) => BY_ID.get(id))
    .filter((x): x is QA => Boolean(x));
}

// Curated click → exact answer (no guessing). Falls back to the summary.
export function answerFor(text: string): { id: string; answer: string; followups: QA[] } {
  const item = byText(text) ?? BY_ID.get("summary")!;
  return { id: item.id, answer: item.a, followups: followupsFor(item) };
}

// Landing entry pills, grouped by audience.
export const ENTRY_GROUPS: { label: string; items: QA[] }[] = [
  { label: "Recruiters & hiring", items: QA.filter((q) => q.suggested && q.category === "recruiter") },
  { label: "For engineers", items: QA.filter((q) => q.suggested && q.category === "engineer") },
];

// Questions the prefilled prompt cycles through on the landing.
export const CYCLE: QA[] = ["summary", "senior", "shipped-service", "achievements", "alerts", "ai-incident", "ai-workflow", "just-ai", "influence", "contact"]
  .map((id) => BY_ID.get(id))
  .filter((x): x is QA => Boolean(x));

// Full index for "Browse all questions", grouped by audience → theme.
export function themeIndex(): {
  category: Category;
  label: string;
  themes: { key: Theme; label: string; items: QA[] }[];
}[] {
  const cats: { key: Category; label: string }[] = [
    { key: "recruiter", label: "Recruiters & hiring" },
    { key: "engineer", label: "For engineers" },
  ];
  return cats.map((c) => ({
    category: c.key,
    label: c.label,
    themes: THEMES.filter((t) => t.category === c.key).map((t) => ({
      key: t.key,
      label: t.label,
      items: QA.filter((q) => q.theme === t.key),
    })),
  }));
}

// Progressive "what to ask next": the last answer's follow-ups, then the rest
// of its theme, then other entry questions, always skipping what's been asked.
export function nextSuggestions(asked: Set<string>, lastId?: string, limit = 5): QA[] {
  const out: QA[] = [];
  const push = (item?: QA) => {
    if (item && !asked.has(item.id) && !out.some((o) => o.id === item.id)) out.push(item);
  };
  const last = lastId ? BY_ID.get(lastId) : undefined;
  if (last) {
    (last.followups ?? []).forEach((id) => push(BY_ID.get(id)));
    QA.filter((q) => q.theme === last.theme).forEach(push);
  }
  QA.filter((q) => q.suggested).forEach(push);
  QA.forEach(push);
  return out.slice(0, limit);
}
