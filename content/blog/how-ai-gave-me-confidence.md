---
summary: Moravy, an average developer stuck on a basic concept for years, describes how asking AI questions rebuilt his understanding and confidence. After running failed .NET migration experiments, he learned AI's real limits, presented his findings at his company, and now treats AI as a colleague while owning every output.
---
# How AI Gave Me Confidence (From Your Average Developer)

For years, I couldn't figure out how interfaces decouple code.

A simple concept. Taught in university. And I was stuck. Not for weeks - for years. I used interfaces because that's what you do, but I never understood why.

I never told anyone.

## The Wall

I graduated with okay grades. Nothing special. And when I started working, I was surrounded by senior developers who seemed to know everything.

How does a garbage collector work? How is an object stored in memory? How should code be structured? Threading? CPU processes? The gang of four? TCP layers? Containerisation?

If these are easy for you - congratulations. You were someone I want to become. You were also the wall I couldn't get past.

Every topic I didn't understand revealed three more I'd never heard of. The mountain kept growing. And I couldn't ask questions because they seemed too basic. How could I not know this already?

After a while, I made peace with being average. I stopped trying. I stopped sharing ideas in meetings because if a senior questioned me, my default was "yeah, he's probably right." I stayed quiet. I stayed safe. I stayed stuck.

## The Turning Point

Like many people, I started with ChatGPT - mostly to fix my grammar (still do).

But one day, I asked it that question: Why do interfaces decouple code? What are dependencies, really?

I spent the whole day learning. And then something happened and it finally clicked.

I went back to a senior developer - the same kind of person who used to intimidate me - and this time, I actually understood what they were saying. I could follow the conversation. I could ask real follow-up questions.

That felt incredible.

But then I stepped away from AI for a while. Early versions weren't impressive. Everything AI could do, I could do better. Nothing special.

## The Fire

A well-known consulting company came to our company.

They presented a demo claiming they could migrate .NET Framework to .NET Core using AI orchestration - moving Jira tickets around automatically as tasks completed, AI manager assigning tickets, AI developer coding, and AI test validating.

I watched that demo and thought: I was scared. I call BS. There is no way. What if it can though? I am cooked...

I had two choices: believe them and fear for my job, or figure out how it actually works.

I chose the second.

## The Experiments

Shoutout to a staff engineer's blog, which perfectly summarized what I'd learned through trial and error: "Try getting AI to do impossible things. Once you find what it cannot do, you know where the line is."

I didn't learn this from reading - I discovered it by failing. But seeing someone else put it into words made me realize I was onto something.

I took on my own migration project: .NET Framework to .NET Core.

**Attempt 1: "AI, do the upgrade"**

What I learned:
- AI is non-deterministic
- It couldn't track what it was doing
- All it is is input in and input out

**Attempt 2: "AI, let's plan first"**

What I learned:
- Spending time upfront helped
- Structure and planning made a real difference
- But context limits are brutal - when you lose context, you lose everything

**Attempt 3: "AI as contractor"**

What I learned:
- Talking-style prompting (less startup cost for me)
- Human feedback loop is needed
- AI is not taking my job if I am there to use it

But here's what shifted: Each failure taught me something. I was no longer scared that AI would take my job. The human feedback loop is definitely needed.

## The Confidence Shift

Even though my project failed, I learned what AI could and couldn't do. And apparently, someone noticed.

A staff engineer approached me and asked me to present my findings to the company.

Little old me. Presenting to the whole company. Terrifying.

But I did it. And after that, people started coming to me with questions. "How do I use AI for this?" "Can AI do that?"

I went from the person afraid to ask questions to the person people asked.

That gave me confidence to dive deeper. I started helping with real work:

- Automating feature flag cleanup
- Writing unit tests
- Scaling AI prompts across the team
- Analyzing codebases and creating documentation

Now I challenge ideas. I back up my thinking. I explore options freely - because exploring costs almost nothing anymore.

## Continuous AI Experiments

Since that initial project, I've tried various other things just to see what AI can do:

- Convert ASP.Net to React code (GPT-4) - didn't work
- Creating new UI components using pure Claude Code (Claude Sonnet 4) - feasible
- Automate feature flag removal by our standards - experimental
- Building a knowledge base to quickly load context - works great
- Complete a development cycle using pure AI - works
- Building a budgeting app (Claude Code, Claude Opus 4.5) - works
- Proper code reviews (find the best reviewer mentality and write it down) - not started yet

## My AI Mentality

**Talk to AI like a colleague, not a command line.**
You don't need massive prompts. Just explain your thinking like you would to another person.

**Treat AI like a new contractor.**
They're talented but they don't know your codebase. You wouldn't throw a new hire into a massive legacy system on day one. Same with AI. Take time and it will yield better results.

**Phrase everything as a question.**
AI treats your words as gospel. If you give hints, it stops thinking and works backward from your answer. Instead, ask questions. You do this with other engineers - why not here? Anthropic found this out by examining how the model actually "thinks."

**Treat AI output as my own.**
AI wrote the code, but validating it is still my job. Saying "AI did this" makes everyone nervous. Instead, put your name on the line. Own it. This changes your perspective - you care more about the result. And others spend less time validating because they already know you did.

## How I Use the Tools

I use AI for everything - from work all the way to personal projects.

**AI as an onboarding buddy:** When I joined a new company with a massive stack, asking AI to help me understand the codebase and build a mental model was incredibly useful. It's like having an infinite onboarding buddy who never gets tired of your questions.

This also helps me verify if AI is doing the right thing. When you have a mental model, you can spot when it's going off track.

**Copilot:** My daily driver. I build knowledge bases so I can spin up the "contractor" quickly.

I have a knowledge base repo which contains all the information about our platform. When I work on a repo, I add it as a workspace. This way, I maintain one prompt in one repo instead of duplicating across 100 repos.

Load the context to a fresh AI session and it works - it follows your existing code patterns.

If the code is already there, it'll do the same. So clean code is good.

If the existing code is bad? Write unit tests first to validate the old behaviour. Then rewrite. If the tests pass, you're good.

*Side note: AI writes tests like it has unlimited tokens. The coverage is insane.*

**Claude Code:** The best AI tool for development right now, in my opinion. I spend my own money on it. It is just good - I don't know how to describe it.

**Cursor:** Currently exploring.

**5-minute rule:** If a task takes 5 minutes to do, try it with AI. Build a reusable prompt and you can scale it out to everyone. 5 minutes across 100 people is 500 minutes (8 hours).

## How I Prompt

Everything as a question. Wording matters. Wrong wording makes AI execute literally instead of understanding. One approach makes it think. The other just does.

When I craft a prompt, I try not to write too much in one go. If I do, I get lazy and give it bad information. Instead I like to talk to it, so that we both can learn.

Once the context has been loaded, I keep the task open to interpretation and let it go on its way. This yields far better results than step-by-step prompting.

## What I Am Still Learning

**When we dismiss AI too quickly.**
I get it. A lot of AI output can be low-quality, and in a big codebase the risk is real. But when experienced engineers ignore it entirely, we lose a huge opportunity to scale our knowledge. With the right guardrails, AI can help turn "expensive experience" into reusable patterns, examples, and learning for everyone.

**Companies replacing juniors (and missing the point).**
AI can produce code fast, but junior engineers still matter because they bring curiosity, energy, and momentum. What worries me is treating AI as a reason to stop investing in juniors, instead of giving juniors the tools and mentorship to grow faster. Outside big companies, people are already doing this and shipping real products by failing, learning, and iterating.

It's not about giving juniors the tools and letting them run wild - it's about guiding them on how to use those tools properly, documenting it, and showing that it's okay to use AI to achieve your goals.

**Taking ownership.**
You are responsible for your AI output.

I've heard people say "AI wrote this" as if that makes it safer to share. In practice, it does the opposite. If you share AI output without validating it, you are asking someone else to do the validation for you.

I've also noticed that once people see unvalidated auto-generated answers often enough, they stop trusting them and start skipping them. Trust is hard to earn and easy to lose. Protect your credibility by validating before you share.

## Has AI Been Good or Bad for Me?

Honestly? AI bridges the gap.

I'm still not as smart as the senior developers around me. But I can keep up now. I can understand conversations I used to get lost in. I can challenge ideas and hold my ground.

The downside? I learn by making mistakes. AI helps me avoid mistakes. So is my memory retention suffering? Maybe. Only time will tell.

But here's what I know: I went from "stopped trying to be a senior developer" to "people come to me for help." That's worth the trade-offs.

## If You're On the Fence

Try until you fail. Seriously. Find something impossible and throw AI at it. You'll learn where the limits are. You'll learn how to prompt. You'll learn what works.

## For Juniors

This is your space to take. It is one of the only things where nobody knows what is going on - not even its creators.

While everyone else is hesitant, you can embrace the uncertainty. Use AI to solidify your knowledge. Build your AI mentality now.

If it works, your career will prosper.

If it's a bubble? We just go back to coding. No loss there.
</content>
</invoke>
