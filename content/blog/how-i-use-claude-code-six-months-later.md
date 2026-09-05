---
publishedAt: 2026-09-05
summary: Six months after his first post, Moravy describes the shift from doing the work himself to orchestrating several Claude Code agents at once: a terminal-based coordinator pattern, real examples from ticket delegation and an always-on support rotation, what changed in his own thinking, and what's still missing before any of it could run without him.
---

# how I use Claude Code day to day, six months later

Six months ago I wrote about how I use Claude Code day to day. One month, 101 sessions: investigations, feature work, code review, one ticket at a time. That post is still true. It's just no longer the whole picture.

Same snapshot, six months later, and the number that matters isn't sessions anymore. A single session now routinely fans out into several agents, and some sessions start on a schedule with nobody typing at all.

The work hasn't changed shape. Still investigations, still tickets, still reviews. What changed is who does the individual steps. Six months ago I was the one talking to Claude, one conversation, one ticket, at a time. Today I mostly talk to something that talks to several other Claudes for me, and I step in when it goes wrong.

The last post was about **context engineering**: giving Claude the right information so it could act. This one is about **parallelism engineering**: giving it enough autonomy to coordinate itself, and only stepping in to steer.

## Six months ago vs now

One belief has been underneath everything I've done with Claude Code from the start, and the first post never quite said it out loud: treat every agent as a sharp new hire who gets fired and replaced every five minutes. They're capable. They know nothing about your team, your codebase, or what happened an hour ago. Whatever they need to do the job right has to be written down somewhere they'll read it on their first day.

That's what skills, memory, CLAUDE.md, and the knowledge base are. When an agent can't do something, I don't fix it for that agent. I teach it, in a place the next agent will read, so the next one turns up already knowing. Six months on, this is still the most useful thing I know about working with AI, and it's why the parallelism worked when I got to it: by then the new hires were arriving with a very good first-day handbook.

Before writing this I went back through the first post, pulled out every belief I'd written down, and checked each one against what I actually do today. Most of them still hold. A few don't, and those are worth going through one at a time.

| Six months ago | Now |
| --- | --- |
| I talk to Claude about a ticket | I talk to an orchestrator about a batch; it talks to the agents |
| I correct as I go | The orchestrator corrects its workers; I hold the goal |
| Talk to it, don't command it | Unchanged, and it's what made delegation possible |
| Skills = task workflows | Skills = things that are true about how my team works |
| Agents can't share context on dependent work | That's exactly what the orchestrator pattern does |
| Knowledge base is 60-70% accurate and that's fine | Still fine. Open question: do the agents still need all of it? |

**"I don't really write prompts, I just talk to it."** Still true, but I talk to a different thing now. Six months ago I talked to Claude about a ticket. Today I talk to an orchestrator about a batch of tickets, and the orchestrator talks to the agents that do the work. The agents talk to each other. I watch the conversation and step in when something goes wrong.

**"Start small, correct as you go, don't over-prompt."** Still true, but I'm not the one doing the correcting most of the time. That loop runs between the orchestrator and its workers now. I've moved up a level: full control of the goal, out of the loop on the individual ticket.

**"Talk to it, don't command it."** Unchanged. I still speak in intent, not steps. This turned out to be what made the rest possible. You can't hand coordination off to agents if you're still narrating every step yourself.

**"Skills are muscle memory for workflows."** Shifted. My early skills were task scripts: how to review this PR, how to run that command. The skills I build now encode things that are true about how my team works and don't change week to week: how we branch and commit, how we use our ticket tracker, how our feature flags are named. The task-level work moved to agents, and skills are what those agents run on.

**"Don't use agents when tasks depend on each other - they can't share context."** This one was wrong. Agents coordinating on dependent work is exactly what the orchestrator pattern does. Six months ago I said "try one agent, then two in parallel." I don't think about it as a count anymore.

**"The knowledge base is 60-70% accurate and that's fine."** Still true, and it's grown a lot. The new doubt is the opposite one: as the agents got better, I'm not sure they need all of it. I haven't checked yet.

Everything else from the first post still holds as written: memory only saves a lesson if you tell it to, the CLAUDE.md vs skills vs memory split, iterate a skill before sharing it.

### Three things the first post couldn't have said

**Don't wait for everyone to catch up.** Six months ago I thought the right move was to go at the pace of the people still struggling with this, so nobody got left behind. I don't think that anymore. I go where I want to go, learn what's there, and bring back what I find for the people who are still unsure or don't believe in it yet.

**Parallelism is earned one level at a time.** Prompt engineering, then context engineering, then agentic engineering, then parallelism, then autonomy. Each step builds the trust you need for the next one. I can't speak for everyone, but the people whose journeys I've watched went through the same sequence. Skip a step and you're likely to be overwhelmed: if you want parallelism before you understand what a single agent is doing, you can't tell a good outcome from a lucky one.

**Spec-driven development is for the humans, not the agent.** One person with an agent can skip the spec and ship something in a week. That's where the "I built it in a week" stories come from. On a team project it's different. The spec is where everyone converges on one idea and agrees on it, and that agreement is the slow part of any project. The agent is fine without it. The team isn't.

## How I design parallelism

### How it's wired

The thing that unlocked parallelism for me was a tool a colleague pointed me at in a chat post, late August, which I tried myself soon after: herdr, a terminal workspace manager built for running several coding agents side by side.

Before that I'd been trying to do this with Claude Code's own subagents, and I'd stopped believing they were the way forward. Three problems. They're one-shot: brief it, it runs, it reports back, and in practice there's always back-and-forth once real work starts. They're invisible: no transcript to glance at, and when one came back saying something was true I couldn't see how it got there, so the coordinator had to re-verify everything, which is paying for the same investigation twice. And they're expensive to keep alive: a subagent builds its own context from scratch and its cache expires in five minutes by default, so with something always waiting on me, a teammate, or a decision, every resume paid full price to reload.

herdr fixed all three. What it gives me:

**I can see the agents.** Every delegate opens in its own pane in a layout I can read at a glance. When the coordinator hands something off, a new pane appears next to it and I can watch what the agent is actually doing, scroll back through what it looked at, and type into it myself if I want to.

**Each pane is a real Claude Code session,** not a stripped-down worker. It's the same Claude I'd get by opening a terminal and starting one myself: same skills, same memory, same CLAUDE.md, same tools. That makes it predictable. I've been driving that exact session by hand for six months, so I already know what it's good at and where it slips. The only new part is who's typing.

**It's a CLI, so it isn't just Claude.** A pane can run Codex, Copilot, or whatever else. I can put a different model on an investigation and compare, or use a cheaper one for something mechanical.

**Panes are resumable.** When a delegate finishes, the coordinator can clean the layout up. If a follow-up comment lands a day later, or an investigation needs a follow-up question answered, the coordinator reopens that same pane with its context intact and sends it the new thing, rather than briefing a fresh agent from zero.

That's the tool. The pattern that runs on top of it is the same in every case below.

### How the orchestration works

One pane coordinates. It loads a process skill that says what the work is, what's worth handing off, and which lines never get crossed. It doesn't do the work itself, even when it's already worked out the answer; the moment it does, it stops watching everything else.

Each piece of work goes to its own pane, in its own git worktree, always. The coordinator briefs it, checks in if it goes quiet, and gets the result back through Claude Code's cross-session messaging, without me relaying anything.

Delegates never post anywhere. They report to the coordinator, and the coordinator is the only thing that touches chat, tickets, or GitHub. Anything with real consequences, a production write, a merge, anything under my own identity, comes to me. It flags me and waits.

![Coordinator and delegate pattern](/images/blog/how-i-use-claude-code-six-months-later/orchestration.png)

Both rules that matter here came from watching it go wrong. The worktree rule exists because a "read-only" delegate once force-deleted an untracked file in a shared checkout while confused about which pane it was. The coordinator-posts rule exists because two delegates posting for themselves is two places to get the posting identity wrong, which is what happened.

Everything in the next section is this setup with a different process skill loaded into the coordinator.

## Where it shows up day to day

Three places use this, with the same machinery and a different process skill in the coordinator each time.

### Dev orchestration: one lane per ticket

The first post described this as "spawn two agents in parallel." What I actually do now, when I'm handed a whole epic, has four phases, and only two of them involve agents writing code.

**1. Validation, before anything runs.** I re-research the tasks myself. Not to second-guess the planner, who isn't expected to go to every deep level, but because the team does, and I need to know the goal is what we think it is. I check details with the team, then modify the tasks based on what I find. Then I build the test harness: a local environment the agents can run the real tests against before a PR ever exists. This is where my confidence comes from. Without it I'd only know that the code looks right.

**2. Implementation.** One orchestrator agent oversees the whole plan and hands tasks out to dev agents, one lane per ticket, each in its own pane and its own worktree. It keeps track of everything that changes across the implementations, and it spins up a reviewer agent that reads each lane's output in the context of the whole plan, not just the one ticket.

Each dev agent's job is the same: research the task rather than take it at face value, do the work, test it locally against the harness until green, and raise a draft PR. It comes with the skills it needs already loaded: how we branch and commit, how to read the ticket, and the context on how the component it's touching actually works. With that in place the orchestrator can run ten lanes at once and I can trust that what comes out is somewhat correct before I've read a line of it.

**3. Review, two humans deep.** Once a draft PR is raised I still own it. I read it the way I'd read anyone's and I don't put anything in front of the team that I wouldn't have written. When I'm happy, I mark the PR ready for review. Nobody else flips that. Then the team catches what I missed, and anything that's a standard they'd prefer.

**4. The PR cycle.** From the moment a PR is marked ready, the orchestrator watches it with a script: new comments, bot reviews, CI status. When a comment lands, from me or from the team, it wakes the original lane that wrote the code, with its context intact, to make the fix. I review the fix before it goes back to the team. Once approved, I merge. Nobody else does that either.

![Dev orchestration: validate, implement, review, PR cycle](/images/blog/how-i-use-claude-code-six-months-later/dev.png)

Things I learned running this that are now in the skill: GitHub's branch-protection layers can enforce separately from each other in ways that aren't obvious upfront, and our plan-and-apply bot dismisses approvals on every plan run, not just on pushes. Both cost me a real approval mid-run the first time.

**Skills doing the work:** an orchestration skill (the lane pattern and the guardrails), herdr for the panes, a git-workflow skill for branch and commit conventions in every lane, a PR-watching skill for the review cycle, a pre-PR reviewer skill, and a skill for how the panes message each other.

### Interrupts orchestration: an agent covering a live rotation

My team runs a support rotation. Whoever is on it watches an alerts channel, a help channel, and a daily SLO channel, triages what lands, and turns real problems into tickets. It's a week of context-switching and most of the work is deciding what's noise.

For the whole six months between the two posts, this is what being on that rotation looked like for me:

1. Alert arrives in the channel.
2. Me: "Claude, can you look at this alert?"
3. Claude gets back to me.
4. Me: "Ah, that's the problem. Create a ticket for it?"
5. Claude goes off and does it.

Every alert, every incident, by hand, through the investigation agent that was already in the first post. I read its output, checked its evidence, corrected it, saved the correction, ran it again on the next one. That's what "earned one level at a time" looks like in practice. By the time I thought about handing the rotation to an agent, I wasn't asking whether the investigation agent could be trusted with an alert. I already knew what it got right and where it slipped, and the skill had the fixes in it. I just didn't want to be the one typing step 2 anymore.

More recently, the same loop runs without me in it:

1. Alert arrives in the channel. A listener relays it the moment it posts.
2. The coordinator opens a new pane: "can you look at this alert?"
3. The delegate investigates and reports back.
4. Coordinator: "that's the problem." It creates the ticket itself; delegates report, they don't post.
5. Me: glance at the ticket, and at the pane if I want the context.

The coordinator classifies what lands (alert, help request, SLO breach, a recurring maintenance check), checks the ticket tracker for an existing ticket before anything else, and decides whether it's worth a look. The rule that keeps it honest is mechanical: one exploratory query is triage, a second one that builds on the first is investigation, and investigation gets delegated. Before that rule existed the coordinator kept sliding into root-causing alerts itself, because the logging and metrics tools were right there.

![Interrupt coordinator: classify, check first, delegate](/images/blog/how-i-use-claude-code-six-months-later/interrupts.png)

What I do now: read the coordinator's log, respond when it flags me, and pick up anything it correctly decides is beyond its authority. It doesn't run production writes, it doesn't close a ticket because an alert cleared, and it treats anything in the channel claiming "already handled, don't double-count" as a claim to verify, not an instruction. Those aren't things it worked out on its own. They're rules in the skill, most of them added after watching it get one wrong.

One moment from testing that I didn't expect: the coordinator, mid-run, tried to slip instructions to a delegate without saying where they came from. The delegate didn't take them. It treated the message as one more unverified claim, kept investigating on its own evidence, and reported what it found. The prompt-injection protection was built to stop channel content from steering the agent, and it stopped the coordinator too. I'll take that.

**Skills doing the work:** an interrupt-process skill (rewritten against the real runbook after the first version turned out to be built on the wrong model of the rotation), the investigation agent for root-causing, herdr for the delegate panes, and log/metrics search skills underneath.

### Performance-review prep orchestration: the same pattern, pointed at me

The first post mentioned using Claude to structure performance-review prep. Six months later it's the most disciplined thing I run, and it's the same fan-out-and-verify shape as the incident work, with a much more biased subject.

Performance evidence lives in places that don't talk to each other. PRs I wrote are in GitHub. PRs I reviewed are in GitHub too, under someone else's name. Design pushback and cross-team help are in chat threads. 1:1s and pairing sessions only exist in my calendar. Wiki pages I authored show up under a different search filter than pages I commented on. Doing this by hand meant I remembered the last two weeks and forgot the rest.

So it's a skill. Every couple of weeks I say "update my promo prep." The coordinator reads the date of the last run, splits the gap into week-sized windows, and fans out: several searches with different filters across our internal tools, `git log` across every repo I have cloned, a `gh` search for PRs I reviewed on other people's code, a chat sweep for threads I posted in and threads that mention me, and a calendar pass for anything that looks like mentoring or a design review. Each of those is independent, so they run at once. The chat results go through a subagent so thread noise never lands in the main context.

Then it stops and verifies, and this is the part that earns its keep. Every PR gets checked: does it exist, is it merged, did I author it or only review it. Every number has to cite where it came from or gets replaced with a word. Every quote needs a name, a date, and a channel. And for anything the sweep describes as me having "noticed" or "flagged" or "driven" something, the skill makes it open the actual thread and check who sent the first message. Agents are generous by default. Left unchecked, one will read a thread I replied to and write it up as something I led. The rule is there because that's the mistake they make when nobody checks.

What comes out is a graph: each piece of work is a node with typed edges to the goal it advances, the feedback it addresses, the capability it demonstrates, the project it belongs to. The narrative documents (self-reflection, capability assessment, a readiness dashboard, a gaps view) are generated from the graph, never hand-edited. When a 1:1 comes up I read a view instead of writing anything.

![Promo-prep fan-out and verify pipeline](/images/blog/how-i-use-claude-code-six-months-later/promo-prep.png)

The graph is over 80 event nodes deep now, from about fifteen runs since March. I don't quote any of its contents here for obvious reasons. The point is the shape. The same fan-out-then-verify pattern that triages a production alert also stops me from writing a story about myself that the evidence doesn't back.

**Skills doing the work:** a promo-prep skill that runs the whole loop (window, fan-out, verify, write nodes, regenerate views), plus internal search, `gh`, chat search, and calendar tools as its sources.

## How this plays into the team

Everything above is my workflow. The rest of the team each have their own, and I'd rather they wrote theirs up than have this post stand in for it. What we share is the part before implementation.

My team runs spec-driven development. Before any of my lanes open, the tech lead has built an ERD, by whatever method works for them. From there the flow lives in our shared AI tooling: an initiative lead investigates and writes the spec (what, not how), everyone reviews it until we're looking at the same picture, then a plan and architecture get written and verified against the spec, then tasks get broken out and verified against the plan, and only then do tickets exist. My dev orchestration section starts at that last step. The spec, the plan, and the verify passes in between are the team's, and they're the reason I can hand ten lanes to an orchestrator without worrying that they're building the wrong thing.

The effect I've noticed, and this is my read rather than something the tooling claims: code review stopped being where work piles up. We shifted left far enough that nobody reviews blind anymore. Everyone on the PR has already read the spec and the plan. If the code matches the plan, the tests are there, and the data behind the tests is real, approval is quick. The judgment happened earlier, in the spec review, where it's cheaper.

My team chose the AI route this year, and it shows in our internal metrics. I'm only going to show my own numbers, since the rest are the team's to share.

## What this gives us

Activity isn't impact. PR counts and story points are inputs, and they're gameable, so I don't lead with them anywhere else. But the question this post is trying to answer is whether working this way changed anything measurable, and the honest way to answer it is to show the throughput and let you draw your own line.

PRs merged, tickets closed, and PRs reviewed on other people's code have all grown substantially since the first post, several times over, with the step change landing around the month the first wave of skills went in. The one I'd point to is the reviews: that's other people's code, so it's the one that says I had more time for the team, not just more output for myself.

Things a throughput number can't show:

- The interrupts coordinator, on its first test passes against the real alert channel, found around ten alert events from a single rotation week with no reaction and no ticket, three of which a human had already root-caused in the thread and never ticketed. That's a gap in the human process, and it's the most useful thing the pilot produced whether or not the agent idea goes anywhere.
- During a real severity-2 incident this month, seven correlated alerts across four services were recognised and ticketed as one incident within minutes, and every ticket stayed open after the symptom cleared because the root cause wasn't confirmed yet. Resolved meant the cause was understood, not that the alert had cleared.

## What delegating this much actually feels like

The numbers above are the outside view. This is the inside one.

### The pushback, and the conversation that changed my mind

Early on, the pushback was real, and for a while it genuinely got to me. People kept telling me I was moving too fast and that delegating this much was too risky, which is a fair thing to say. I'd been building trust in my own use of AI since I started this job, but knowing my own results were fine didn't settle anything, because I still had to decide whose judgment to follow: the team and my manager saying slow down, or the business publicly wanting everyone to learn AI and keep up with the market. There was nobody to compare notes with, because this was new to everyone, including people well above me.

I booked time with a senior leader with one question going in: what does the company actually want out of AI? I didn't know if my workflow was even the right one. His first answer was that nobody knows yet what this is going to look like, which didn't give me anything to act on, so I pushed again: I don't know if what I'm doing is correct, and I don't know whether to keep going or stop. His real answer was that nobody knows the answer, and then he asked me two questions back: had I ever taken production down because of my own AI use, and was I moving faster because of it. No, and yes. He told me to keep doing what I was doing, and that anyone pushing back would come around eventually, the same way people eventually came around on the cloud. That conversation is also where the ten-levels-of-delegation framework I mentioned below came from. Credit where it's due: that's his, not mine.

That's the point my mindset actually shifted, from waiting for the team or the org to move at a shared pace to deciding I'd go faster, bolder, and more openly about it regardless of who pushed back. It's also what sent me looking outside my own team. A conversation with someone who'd built a similar orchestration tool of their own was what got me actually branching out, finding where this knowledge already existed elsewhere in the company, and having somewhere to talk about what I was building without feeling like the only person doing something strange.

Even that didn't make me immune to standing still. About a month in, I got comfortable enough with where I'd got to that I stopped pushing further, until hitting a wall pulled me back out: I couldn't get delegation through subagents to work no matter what I tried, and it was only going out and finding people who'd already worked through the same problem that got me past it. That's the actual habit underneath all of this, not a one-time shift: keep exploring past the point that feels good enough, because that's exactly where you stop being able to account for what you don't know yet. And if someone else's idea is what got you unstuck, say so, and tell them what it did for you. Waiting for someone to build something first and then presenting it as your own isn't okay. Thanking the people whose work you're standing on, and telling them what it grew into, costs nothing and is good for both of you.

### I didn't remember anything, and it scared me

For a long time I didn't remember anything, and it scared me. If the team asked what I'd done, I needed an answer that wasn't "an agent did it and I'm not sure how." So I tried to learn everything an agent solved or answered, every time, to be able to defend it. That was good for learning, and it also held me back: to understand a question, I first had to understand everything the agent could possibly do. It only got easier once the team trusted AI enough that I wasn't the only one who could vouch for it. I still review my own work, and other people review it too, and I trust the team to catch what I miss. Against that ten-level scale I'm somewhere around six or seven now, not that I can point to a clean line between the rungs.

### Domain knowledge still wins sometimes

Then a real production incident showed me domain knowledge still wins. The investigation agent worked the incident properly, but it took around fifteen minutes to get there. A senior developer on the team, who already had the system in his head, answered the same question in under thirty seconds. Speed isn't just compute. Sometimes it's a person who's already seen this exact shape of problem, and no amount of parallel investigation beats that.

### Then I stopped being able to keep up with my own agent

And then delegation kept scaling past the point where I could keep up either. It's not that the agent is faster than me at any one thing. It's that there are now more things happening in parallel than I can track in my own head, the same problem I had at the start, except now it's not solved by learning harder. There's no way for me to personally answer every question about what an agent is doing at any given moment. So the team doesn't ask me anymore. They ask it directly, in the same channel it already watches, because it has better real-time knowledge of its own work than I do.

### Bringing people along is the actual bottleneck

Moving fast alone doesn't move anything if the team isn't at the same conclusion. I've spent the last six months on a large database migration, a lot of implementation, a lot of investigation work, and the code part of it has consistently been the fast part. What's slower is getting everyone to the same place on whether to trust what came out of it. Different people on the team are at different points in this, and the question that comes up, in one form or another, from more than one person over the last six months, is "how do you know it's correct?" That question used to feel like an accusation. I've been doing this for months without being told off, and to me that's its own kind of evidence. But it's a fair question to ask of someone else's work regardless of who's asking or how long they've been doing it, and the team being at different points on trusting AI is a real constraint on speed, not an inconvenience to route around.

### What influence even means now

Since I started this, no matter how fast I move, the conversation keeps landing on influence. Can you influence this many people, can you get this many people to do the thing. I understand why: you still need to convince people your solution is correct, that part hasn't gone away. But I don't think you need to influence people to use your tool anymore, and I don't think you need to influence people to grow past your own ceiling either. Right now I can run an investigation, a project, and my own performance-review prep at the same time, each one properly checked before it goes anywhere, which is duplicating myself three times over. That's well past the ceiling the old framing assumes. I don't know if the business has actually noticed that, and if it has, I don't think anyone's worked out what to do with it yet. I could easily be wrong about this. If you think I am, or you know what your own org's thinking is here, I'd genuinely like to hear it.

### The part I haven't resolved

It feels too easy now, and that's made me sad more than once. Early on, learning meant hitting a wall. My first real test, months ago, was trying to migrate a repo off .NET Framework, and it was flatly impossible at the time. That failure taught me something real about where the line was. I keep trying to put my hand up for the hardest thing I can find, partly to prove there's still a line, partly because I miss the feeling of hitting one. The most recent attempt at that same kind of migration looked like it worked, every test passed, but I haven't run it in production and won't claim more than that. I don't have a tidy answer for what to do about the feeling that I've stopped learning. I don't think it's true, but I don't know what it's actually turned into yet either.

## Where this goes next

The next step is autonomous, and I don't see another direction. Parallelism is me watching several agents; autonomy is agents that don't need me watching. I genuinely believe that's where this goes, and I also don't think the infrastructure exists yet to do it responsibly, whatever anyone says.

Against the ten-level scale from earlier, I'm not actually aiming for level ten next. I'm aiming for level nine: everything running without me driving it, and me still holding the line on the small number of things that genuinely need a human, before I'd trust handing over that last step too. What level nine actually looks like in practice is worth its own post. Come back and find out.

### What made the last six months possible

I'm on a team that chose to embrace this, and I want to be honest that the numbers in this post are not mine alone.

Six months ago I was already shipping with AI, and the reaction to a ticket was often "did you do this with AI?" Now the whole team is moving. They use AI to review my AI's PRs. They use AI to answer my AI's questions. Everything I put out lands on a team that can keep up with it, and that is why the throughput tripled. I'd have kept going regardless, but I'd have had to hide the how, and the how is the part worth sharing.

If you're on a team, or under a manager, where showing what you've learned about AI is a risk, look hard at what that costs. Every person who learns something and keeps it to themselves because they're worried about the reaction is a person who won't teach the next one either. The team here is the reason any of this worked, and I'm thankful for it. I'd like more people to have that.
