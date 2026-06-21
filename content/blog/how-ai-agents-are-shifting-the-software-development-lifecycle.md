---
publishedAt: 2026-07-14
summary: Moravy argues the SDLC's phases were engineering answers to human constraints, and AI agents shift several of those costs. He examines each phase, notes where review and testing now matter more, and concludes good processes should match the constraints a team actually has.
---
# How AI Agents Are Shifting the Software Development Lifecycle

## The Cycle Was Built for Humans

Requirements. Design. Implementation. Code review. Testing. Deployment. Maintenance.

The software development lifecycle. Every variation (Waterfall, Agile, Kanban, SAFe, whatever your team calls its flavor) is a different arrangement of these phases. We treat them as fundamental. They're not. They're engineering solutions to a specific set of constraints: human ones.

AI agents have changed some of those constraints. Not all of them, and not cleanly, but enough that it's worth asking: which phases still protect us, and which are just friction we've stopped questioning?

## Why We Built the Cycle

Every phase of the SDLC exists because someone, somewhere, learned an expensive lesson. The process we have today is the accumulated wisdom of decades of shipping software. It's worth understanding what each part was solving before we ask whether anything has changed.

**Codebases outgrow any single person's ability to reason about them.** Architecture documents, modular design, separation of concerns, design reviews: these gave teams a way to work on systems too large for any one person to hold in their head. They're the reason we can onboard new developers without requiring them to read every line of code first.

**Context-switching kills deep work.** Sprint structures, no-meeting days, focus time blocks: these emerged to protect the sustained concentration that complex problem-solving requires. When you're three levels deep in a call stack, a Slack ping doesn't just cost you the interruption; it costs you the 20 minutes to rebuild the mental model.

**Coordination has real overhead.** Brooks observed in 1975 that adding people to a late project makes it later. Team boundaries, ownership models, interface contracts: these aren't bureaucracy. They're how we make it possible for multiple people to work on the same system without stepping on each other.

**Requirements are a moving target.** Waterfall assumed we could specify everything upfront. Agile was the industry's honest acknowledgment that we can't, that short feedback loops and iterative delivery beat big-bang planning in most real-world conditions.

**Humans make inconsistent mistakes.** Unit tests, integration tests, code review, QA environments, staging deployments: each layer exists because no single check catches everything. Defence in depth works because the mistakes one person misses, another catches.

These are real engineering constraints, and the process we built around them was (and still is) genuinely good engineering. The question isn't whether the cycle was right. It's whether the constraints it was designed for are still the same.

## What's Changed, Phase by Phase

AI agents don't remove those constraints. They shift the balance. They're not magic; they hallucinate, they lack business context, they can't tell you what to build. But they fundamentally change the cost of certain parts of the cycle. And when costs change, the process built around those costs deserves a second look.

### Requirements and Design

**Before:** Implementation was expensive, so you invested heavily in upfront design to avoid committing to the wrong direction. Two weeks building the wrong thing was two weeks wasted.

**Now:** An AI agent can produce a working prototype in an afternoon. It's cheaper to try three approaches than to spend a week debating which is theoretically best. The design phase compresses, not because design doesn't matter, but because the penalty for exploring a wrong direction is much lower.

**Watch out:** This cuts both ways. Cheap execution makes it easy to build the wrong thing faster. Complex system integrations, data model decisions, security architecture: these still demand careful thought before code gets written.

**Something I don't think is working as well anymore:**

With automated tasks like upgrading SDKs or removing feature flags, my team tends to write Jira tickets that tell AI step by step what to do. What I've noticed is that when we do this, AI treats it as a command and implements exactly that, often with poor results.

I think requirements should be more open rather than a step-by-step guide. Something like: "Can you upgrade the LaunchDarkly client to the latest SDK?" instead of a list of exact file changes.

Why does this work better? By giving AI the freedom to explore what's best for that repo, it does the work properly. Before AI, we used tickets as a guide and made changes when things didn't work. With AI, when you command it, it executes literally, without judgment.

Give it a go if you find step-by-step prompting isn't working. In my experience the results are significantly better.

### Implementation

**Before:** Implementation was the bottleneck. Most of the cycle's calendar time was spent here.

**Now:** AI agents generate a first draft, sometimes excellent, sometimes garbage, usually in between. The developer's role shifts from writing every line to directing, evaluating, and iterating. The last 20% (making it actually fit your system, your conventions, your performance requirements) is still yours.

**The downstream effect:** When implementation is cheap, the other phases (requirements, review, testing) become the relative bottleneck. That's a meaningful inversion of where teams spend their time.

**What I've learned:** We still tend to believe AI-generated code isn't up to our standard. While this may be true to a very small degree, I genuinely believe it's no longer the main problem. From my experience, AI will use your repo's existing standards. If you're working in an existing codebase, it follows what's already there. If you're starting greenfield, those standards don't exist yet, so it finds the quickest path. That's why an established codebase, with good conventions in place, is important for getting good AI output.

### Code Review

**Before:** You reviewed a colleague's code for defects and to spread knowledge across the team. You knew their tendencies and reviewed with those patterns in mind.

**Now:** AI-generated code has different failure modes: plausible but subtly incorrect logic, outdated patterns from training data, solutions that work in isolation but don't fit your architecture. The reviewer's job shifts from "did they miss a null check" to "does this approach make sense for our system, and does it do what we intended?"

**Why it matters more:** When a human writes code, they at least understood their own intent. When AI generates code, even the intent can be misaligned. Review becomes the primary check that the code matches what was actually needed.

### Testing

**Before:** Developers wrote tests based on their mental model of what the code should do. Biased, sure, but there was some internal model of correctness.

**Now:** AI-generated code has no such model. It's pattern-matched output that might be subtly wrong in ways that only surface under specific conditions. AI can help write tests (scaffolding, edge cases, integration boilerplate) dramatically faster. But it can also produce a suite that achieves 100% coverage and validates nothing meaningful, because the assertions share the same flawed assumptions as the code.

**The shift:** The human's role moves from writing tests to designing what to test and validating that the tests are meaningful. More code generated faster means more testing rigour, not less.

### Deployment

**Before:** Feature flags, canary deployments, rollback strategies, progressive rollouts: all built to manage the risk of changing a live system.

**Now:** Unchanged. These practices protect against all bugs regardless of origin. Higher velocity from AI-assisted development makes them more important, not less.

### Maintenance

**Before:** Debugging production issues, reading code someone wrote six months ago, understanding why a system behaves the way it does. Rarely on the SDLC diagram, but where most of the actual time goes.

**Now:** AI agents can help navigate unfamiliar codebases faster: searching, summarizing, explaining patterns. But they can't tell you why that workaround exists, or that the last time someone refactored this module it caused an outage. Institutional knowledge still lives in people, runbooks, and commit messages, not in models.

## What Doesn't Change

Across every phase, three things stay constant regardless of how much AI can do:

**Judgment.** Knowing what to build. Knowing when to stop. Knowing when the AI's output is good enough and when it's a landmine. This is the skill that gets more valuable as execution gets cheaper.

**Context.** Understanding the system's history: why that workaround exists, what happened last time someone refactored this module, which customers depend on behaviour that isn't in any spec. AI agents can read code. They can't read the room.

**Accountability.** When the system goes down at 2 AM, someone has to own it. When a product decision turns out to be wrong, someone has to course-correct. AI agents don't get paged. They don't sit in the post-mortem.

## So What Do We Do With This?

The worst response is to keep the old process unchanged and bolt AI tools onto the side: all the ceremony, none of the rethinking. The second worst is to throw out the process entirely and lose the safeguards that still protect us while AI is getting better.

The useful response is to look at your team's current workflow and ask: which parts of this were built around constraints that have actually shifted? Where is design review protecting us from real risk, and where is it protecting us from an implementation cost that no longer applies? Where are we testing because we should, and where are we testing because we always have?

The best process is the one that matches the constraints you actually have, not the ones you used to have.
