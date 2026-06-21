---
summary: Moravy describes becoming an AI-first engineer, where AI is the default starting point across the whole development cycle, not a last resort. He explains how he learns codebases, works tickets, packages context into reusable knowledge, validates and owns AI output, and argues judgment, context, and accountability matter more, not less.
---
# AI-First / AI-Native Engineer: The Defaults I Changed

As I mentioned in my [last blog](./how-ai-gave-me-confidence.md), senior has always felt like a wall.

Not because of the title. Because of the people behind it. Smart, fast, well-read, confident. Every time I thought I was getting closer, I would realise there were three more things I did not know. The mountain kept growing.

For a long time, I thought reaching that level was about accumulating enough knowledge. Read enough, work long enough, survive enough incidents, and eventually the gap closes.

Then AI arrived and quietly changed the question.

Not "do you know enough?" but "how fast can you learn, adapt, and produce outcomes you stand behind?"

All the things I thought made someone qualified shifted. And when that happened, AI stopped being a curiosity and became something I could not afford to ignore. It is now in every part of how I work, and this blog is about what that actually looks like day to day.

---

## What AI-first means (and does not mean)

An AI-first or AI-native engineer is one that uses AI in every part of the development cycle. It is almost the default before you go and do anything.

**What it does not mean** is that when you get stuck, you ask AI. That is not it.

For me, AI is a default. After a lot of experiments, I think I have built a mental model of what AI is capable of creating and building. That mental model is the reason AI can handle most of my daily tasks. Without it, you are just throwing prompts at a wall and hoping something sticks.

And in every phase, my default behaviour changed:

- I start by asking AI for questions and options, not answers
- I keep changes small and verifiable, not heroic and sweeping
- I treat AI output as my output, so I validate it and I own it

---

## How I Work Now

I never knew I was AI-native until I started writing this blog.

AI had already become my default. My natural starting point. It was only when I sat down to document how I actually use it that I thought, hmmm, that description seems to fit the box.

Here is what my day to day actually looks like.

**Getting up to speed on a new codebase**

When I joined my current team and started working on a complex multi-service codebase, there were 50+ components to learn. That would normally take months.

AI is great at this. I used it to build mental models, generate Mermaid diagrams, understand each component at a high level, and see how they interact. And I still had my team to validate what I was learning, which made it even better. I was able to move faster than I ever had before.

Over time I packaged all of that context into a knowledge base repo. Instead of rebuilding context every time I start a new session, I load it in and AI already knows the components, the patterns, and how things interact. It is one of the things I am most glad I built. It saves me time every single day.

**End to end development, given a ticket**

Our current development cycle exists because of human constraints. All of it is valid and makes sense. But some of it may no longer be needed. Here is how I work through a ticket now:

1. I start by understanding the ticket myself, to see if this is even a real problem. Can AI do this? Generally yes, and it is a good gut check.
2. Once I understand it, I pretend I do not know the problem and ask AI to explain it back to me. This is always an open question. I do not want to go into commanding mode, I want it to think.
3. Once we have agreement on the problem, I ask it to do the work. Sometimes it gets it right, sometimes it needs help. That is fine, because I would have done the same. And as new models come out, that gap keeps shrinking.

    1. **One thing worth noting**: planning does not work too well for me unless it is a large task. And even then, I keep the plan broad. No implementation details. The moment a plan gets too specific, AI just executes it literally instead of thinking.

4. After it is done, I review the code and own it like it is mine. If I just say "AI did this," that gives us nothing. It kills the conversation because the output is so new that nobody knows what to say or how to trust it. I also use AI to review my own code, sometimes with a different model to get a different perspective.

After that is when I follow the normal team process: write up the ticket and implementation plan, fill out acceptance criteria, raise a PR, and ship. This makes me question **is some process necessary anymore**?

**Packaging what you know**

The other thing I changed is that I stopped keeping knowledge in my head and started packaging it. If I had to explain something to AI once, I wrote it down so I never had to again. That is what the knowledge base repo is. Load it in, and the "new contractor" already knows the codebase.

AI follows patterns. The more context you give it upfront, the less time you spend correcting it later.

---

## There Is No Magic Prompt

If you read this and thought "okay but how do you actually talk to it," the honest answer is: nothing special.

I do not have a secret prompt. I do not spend 20 minutes crafting the perfect instruction. Generally I just go:

> "Hey can you do this ticket?"

And if the ticket is written as implementation steps, I try to reverse it. Instead of feeding it the steps, I reframe it as:

> "I have X and I want Y. Can we explore and figure out how to get there?"

That is genuinely it. The difference is not the wording. It is giving AI room to think instead of just execute.

**My stack, based on tokens**

People sometimes ask how I use so much. I genuinely do not understand how you do not. AI is in every part of my life, not just work.

Here is how I prioritise:

- My preferred tool is Claude Code. It is the best for deep development work right now, in my opinion.
- My daily driver is Copilot, because we have a lot of tokens there and it is always open in the editor.
- Once I run out of those two, I go to Claude Sonnet.

Right now I am already building out my performance review prep repo ahead of review season. That is the kind of thing I mean when I say AI is always on the desk. It is not just for tickets.

---

## Does It Actually Work?

I am not just describing a mindset. Here is what it looks like in practice:

- Most if not all of my tickets are done by AI from start to finish now. Grabbing the ticket, understanding it, writing the code, drafting the PR description, raising the PR. All of it.
- I can create tickets, ORRs, implementation plans, and acceptance criteria in a fraction of the time it used to take.
- My help requests are faster. I can get a well-reasoned response back quickly instead of waiting to find the right person or digging through docs.
- Outside of work, I built a budgeting app that connects to Akahu. Not pretty, but it works and it is mine.
- I also built a web app that aggregates complaints and does invoice OCR. Built on a weekend.

None of these are things I would have attempted before. Not because I lacked the skill, but because the cost of starting felt too high. AI lowered that cost enough that I just did them.

---

## What did not change (and got more valuable)

Even with agents, even with better models, these did not go away:

- Judgment: knowing what to build, what to ignore, what is risky
- Context: history, constraints, why the system is weird
- Accountability: AI does not get paged at 2AM. We do.

AI compresses execution. That makes judgment, context, and accountability more important, not less.

---

## The wall is still there. I just have a different way up.

Senior is still a wall. The people are still smarter and faster and better read.

But "qualified" used to mean you already knew the answers. Now it means you can find them, validate them, and own what you ship.

That is a game I can play.

AI did not close the gap for me. It changed what the gap is made of.

If you are on the fence, do not start by trying to do everything with AI. Just pick one task you do often and try the loop: clarify, options, constraints, small diff, validate, document.

Do that a few times and your mindset will shift on its own.

---

## So If AI Is Doing Your Work, What Are You Doing?

This is a fair question.

No matter how fast I move, I am one person with limited tokens. There is always more work to do, more to research, more to figure out. But it is different now. It is work I actually want to do. The stuff I want to explore, I explore. The stuff I want to offload, I offload.

There is only so much one person can do. We still have dependencies. We still need to wait. There are still people, processes, and decisions that cannot be accelerated by a better prompt.

But here is the thing: if everyone moved like this, I genuinely do not know what happens next. Maybe we solve harder problems faster. Maybe the bar just rises. Maybe I go back to farming.

For now though, the answer to "what are you doing?" is the same as it has always been: figuring out what matters, making decisions, owning the outcome.

AI just removed the parts in between that were slowing me down.
