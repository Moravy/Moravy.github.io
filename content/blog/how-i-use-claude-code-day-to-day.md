---
publishedAt: 2026-07-07
summary: Moravy describes how he uses Claude Code across 101 work sessions, covering production investigations, parallel agent teams for feature work, code review, and career prep. He explains his approach to prompting conversationally, saving lessons to a memory file, building reusable skills, and grounding everything in a domain knowledge base.
---
# how I use Claude Code day to day

Here's a snapshot of what I've been doing with Claude Code over the last month across **101 sessions**:

I investigated production outages and traced root causes across multiple systems, built features using parallel agent teams, reviewed PRs across 10+ repos, and built a knowledge base that teaches Claude our entire domain.

### Investigations & Support

- Investigated a bank file that silently failed processing for an entire month
- Investigated missing bank feed files, no statements received for 2 days
- Investigated a bank feed outage, no statements imported
- Debugged intermittent SFTP service health check and S3 failures
- Triaged New Relic production alerts directly from alert URLs
- Helped reprocess a file from a team help request
- Used our internal search tool to pull context from an incident channel and draft a PIR

### Feature Development

- Spawned 2 parallel agents to work on separate Jira tickets simultaneously
- Built an internal admin tool across multiple git worktrees: landing page, org view, search bar
- Upgraded our UI component library across the admin UI, a large dependency update touching many components
- Implemented a service performance fix using an agent team (BFF worker + UI worker running in parallel)
- Built specs from a Jira epic, then assigned agents to implement each ticket on its own branch

### Code Review

- Reviewed PRs across multiple repos
- Reviewed an auth implementation by tracing the difference between two auth module approaches
- Validated a plan PR against the actual database schema

### Bug Investigation

- Traced service homepage slowness to a single API call averaging 29 seconds, connected to UAT DB to verify missing indexes
- Investigated a UTC vs Local timezone bug in date handling, traced the full stacktrace for US and NZ users
- Investigated monthly file visibility quirks where files don't appear on the expected date
- Validated Confluence bug documentation against actual source code and storage key paths

### Tooling & Knowledge Base

- Built a dedicated knowledge base repo to teach Claude about our domain: architecture diagrams, 50+ term glossary, system deep-dives, mental models
- Built custom Claude skills for investigations, research, PR reviews, Jira management, and Confluence updates
- Built an investigation agent that spawns parallel searches across Slack, Confluence, logs, and New Relic
- Created a collaborative-prompt hook that makes Claude discuss approaches before jumping into execution
- Set up Atlassian CLI, Sumo Logic CLI, and improved RDP scripts with environment selection

### Career Development

- Used Claude to structure my performance review prep: goal setting, accomplishments in STAR format, capability assessments

---

## How I Actually Use Claude Code

People ask me the same questions when they see my setup. Here's what I've found works for me.

### "How do I get started?"

Honestly, just open Claude Code on your next task and try it. You don't need to read a guide or set up anything fancy first, just start using it. My first sessions were literally just testing if it could read my repos.

The more you use it, the more natural it gets. Your first few sessions will be clunky, that's fine.

### "How should I prompt?"

I don't really write prompts. I just talk to it.

When I need Claude to follow a specific workflow, I don't even write the instructions myself. I tell Claude to generate them. If it can generate a skill, it's probably going to follow those instructions better than something I wrote. That's how most of my skills were built.

This blog post is the same. I told Claude to go through my past sessions and pull out what I've been doing. It read through 101 sessions and surfaced everything you see in the intro. I didn't write that list from memory.

### "My prompts aren't working"

A pattern I've seen (and done myself early on) is over-prompting: writing out every instruction and constraint upfront. When it doesn't work, it's easy to get frustrated and give up.

What works better for me: start small, see what happens, correct as you go. Just tell it what went wrong.

### Talk to it, don't command it

I've noticed a difference between:

- "Remove this feature flag"
- "Can we remove this feature flag?"

The second one tends to give better results. "Can we?" makes Claude think about whether it's safe, what steps are involved, what to check first. The first one just makes it go.

I even built a hook for this: if I accidentally write a command, Claude reminds itself to talk through the approach first.

### You're not stuck behind knowledge anymore

This is probably the biggest thing for me. I don't know how to use New Relic properly. I just tell Claude to query it for me. I don't know Figma's component API. I just screenshot a design and tell Claude to build it. I don't know the Atlassian REST API. I just built a Confluence skill and now I update pages from my terminal.

If you know what you want to build or fix, Claude can usually figure out the how.

---

## Memory: The "Don't Do That Again" File

Claude Code has a persistent memory file that survives across sessions. Think of it as a shared notebook between you and Claude, except Claude is the one writing in it.

Here's how I use it: anytime Claude makes a mistake and it doesn't fit neatly into a skill (it's more of an intuition thing), I tell it to remember. It saves the lesson, and next session it doesn't repeat the mistake.

Some real examples from my memory file:

| Memory | What happened |
| --- | --- |
| **"Use yarn start, NOT npm start"** | npm broke CSS CDN loading in our UI project. Wasted time debugging a blank page. Claude now always uses yarn. |
| **"Local repos first"** | Claude kept using `gh api` to fetch files remotely when I had the repo cloned locally. Slower and unnecessary. |
| **"No em dashes"** | I hate em dashes. Claude loves them. Told it once, never again. |
| **"Ghostty tab titles: don't attempt"** | Claude tried to set terminal tab titles, failed (sandboxed shell), and saved "don't try this again" so it stops wasting time on it. |
| **"Use the correct saga import pattern"** | Claude kept using the wrong import pattern for our sagas. Saved the correct pattern so it gets it right every time. |
| **"Check the correct launch profile"** | Spent a session debugging why the BFF wouldn't start. Wrong launch profile. Now it's in memory. |

### Memory vs Skills vs CLAUDE.md

The way I think about it:

- **CLAUDE.md**: project-level context that anyone working on the repo should know. Architecture, conventions, reading order.
- **Skills**: repeatable workflows with clear steps. "When reviewing a PR, do X, Y, Z."
- **Memory**: everything else. Personal preferences, gotchas, patterns that are too specific for a skill but too important to forget. The stuff you'd tell a new team member over coffee.

The key insight: **Claude learns from its mistakes, but only if you tell it to save the lesson.** If you just correct it in the moment, it'll make the same mistake next session. If you say "remember this", it won't.

---

## Skills: The Real Multiplier

Skills are reusable prompts that Claude loads when you type a slash command. Think of them as muscle memory for Claude: instead of explaining the same workflow every time, you teach it once and trigger it with a command.

Without skills, every session starts from scratch. "Hey Claude, when you review PRs, make sure you check X, Y, Z and follow our conventions for..." Every single time. Skills fix that.

I have 15+ skills. Here are the ones I actually use:

### Daily drivers

| Skill | What it does | Why I need it |
| --- | --- | --- |
| `/git-workflow` | Team branching and commit conventions: GitHub Flow, one ticket per branch, PR title format | Claude kept creating branches with wrong naming. Now it just follows our team's standard every time. |
| `/jira-cli` | Create, update, transition, and comment on Jira issues from the terminal | I never leave the terminal to manage tickets. Create a ticket, assign it, move it to In Progress, done. |
| `/review-pr` | Fetches a PR, runs code review, cross-references with source code and project conventions | Consistent review quality. It checks things I'd forget to check manually. |
| `/investigation` | Spawns parallel agents to search Slack, Confluence, local docs, logs, and New Relic all at once | When someone posts a help request, I need answers from 5 sources simultaneously, not one at a time. |
| `/confluence-cli` | Read and update Confluence pages from the terminal | Update docs without context-switching to a browser. This blog post was written with it. |

### Regular use

| Skill | What it does | Why I need it |
| --- | --- | --- |
| `/feature-flags` | Team LaunchDarkly conventions: naming, implementation, testing, cleanup | Consistent flag naming and proper cleanup when removing flags. |
| `/figma-to-component` | Takes a screenshot or Figma design and generates component code | Screenshot in, working component code out. |
| `/feature-dev` | Guided feature development: understands the codebase first, then architects, then implements | For bigger features where you want Claude to plan before coding, not just start writing. |
| `/sumo-search` | Search Sumo Logic logs using CLI | Log investigation without leaving Claude. Search by correlation ID, error patterns, time ranges. |

### The meta-skill: `/skill-creator`

This one deserves its own callout. `/skill-creator` lets you create new skills, modify existing ones, and (this is the good part) **run evaluations to test how well your skills actually work**. It measures triggering accuracy and performance so you're not just guessing whether a skill is useful.

Most of my skills were built or refined using this. It's skills all the way down.

### Honest take: not every skill stuck

- `/quick-context`: aliases to load docs for any area of the codebase. Turns out Claude just finds the right docs on its own. I built the map but Claude doesn't need directions.
- `/research`: Progressive disclosure research across GitHub, docs, and Confluence. It spawns sometimes automatically, but I never invoke it manually.
- `/verify-claim`: Verifies documentation claims against source code. Good idea, but I just review the output myself.

The lesson: **don't over-engineer skills upfront**. Build what you need when you feel the pain of repeating yourself. If Claude handles something fine without a skill, let it.

---

## The Foundation: A Knowledge Base

All of this runs on top of a dedicated documentation repo I built to teach Claude about our domain. It contains architecture diagrams, a glossary with 50+ terms, system deep-dives for every component, and mental models that explain how everything connects.

Claude reads this context before every task, so it already understands our domain. I don't have to re-explain core concepts every session.

**Is the knowledge base 100% accurate?** No. Probably 60-70%. But here's the thing: I'll take 60-70% accuracy as a starting point when the alternative is spending hours just getting oriented. It gets me to a working understanding in minutes instead of days. The important part is that I always verify the details that matter before acting on them. Claude gets me close, and I confirm what counts. And when something is wrong, I correct it, so the knowledge base goes from 60% to 61% that day. It's incremental. You don't need perfection upfront, you just need to keep improving it as you go.

This isn't about Claude being smart. It's about giving it the right context so it can actually help with real work, across many repositories, every day.

---

## Custom Agents: When One Claude Isn't Enough

Skills tell Claude _how_ to do something. Agents are separate Claude instances that do things _in parallel_. Think of it like this: skills are your playbook, agents are your team.

### The Investigation Agent

This is the one I use the most. When a help request comes in, the investigation agent:

1. Classifies the request (knowledge question? outage? escalation?)
2. Spawns up to 5 subagents **in parallel**:
   - **Slack search**: searches team help channels
   - **Docs search**: searches the knowledge base for relevant architecture and troubleshooting
   - **Confluence search**: searches for component-specific config and known issues
   - **New Relic search**: queries for errors, throughput anomalies, and entity health
   - **Sumo search**: searches application logs
3. Synthesizes all findings into a structured response with root cause analysis and recommended actions

What used to involve a lot of tab-switching between Slack, Confluence, New Relic, and Sumo now happens in one place. And it doesn't miss things I would have forgotten to check.

### Agent Teams for Feature Work

For a service performance epic, I spawned an agent team:

- **Team lead** (me + Claude): broke the epic into tasks from Jira tickets
- **BFF worker**: implemented backend changes
- **UI worker**: implemented frontend changes
- **Code reviewer**: reviewed each agent's output

They worked in parallel, each on their own branch, each following the git-workflow skill conventions. I was steering the whole time ("each ticket needs its own branch", "don't implement them all under the epic"), but the actual coding was distributed.

For a larger UI project, I used **worktrees**, isolated git copies so multiple agents could work on different features without stepping on each other.

### When to use agents vs doing it yourself

**Use agents when:**

- You need information from multiple sources at once (investigations)
- You have independent tasks that can run in parallel (feature work)
- The task is big enough that one context window isn't enough

**Don't use agents when:**

- The task is straightforward and sequential
- You need tight control over every step
- The tasks depend on each other (agents can't easily share context)

---

## Getting Started

You don't need all of this on day one. Here's roughly the order I'd suggest:

- **First**: just use Claude Code. Use it for your normal work. Notice what you keep repeating and what Claude gets wrong.
- **Then**: make your first skill. Whatever you find yourself explaining to Claude most often. Use `/skill-creator` to build it.
- **Then**: start telling Claude to remember things when it makes mistakes. Check your memory file occasionally.
- **When you're comfortable**: try agents. Start with a single research agent, then try two in parallel. Build up from there.

The goal isn't to copy my setup. It's to make Claude better at **your** work, one small thing at a time. Start with what annoys you most, fix that, and keep going.
