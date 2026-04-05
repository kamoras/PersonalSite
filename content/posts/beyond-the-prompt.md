---
title: "Beyond the Prompt"
date: "2026-03-30"
description: "The fear about AI in software engineering is that it replaces engineers. The more immediate risk runs in the opposite direction."
tags: ["software engineering", "AI", "craft"]
---

Software engineers have always been hired to think. Code is just the artifact of that thinking, not the work itself. That distinction feels obvious—until tools make it easy to skip straight to the artifact.

Much of the conversation around AI in software is driven by fear of replacement: that language models will eventually write code well enough to make engineers redundant. Maybe they will, someday. But that's not what's happening right now.

What's happening instead is almost the inverse. The human parts of engineering—judgment, context, accountability—aren't being diminished by capable models. They're being exposed.

When the doing is automated, the deciding becomes the entire job. AI doesn't remove that responsibility. It just makes it harder to hide from.

The real risk isn't replacement. It's that the path of least resistance now runs straight past the thinking.

In early 2025, Andrej Karpathy put a name to this pattern: "vibe coding."[^1] Describe what you want, accept what comes back, iterate until it looks right, and ship it.

For personal projects, that's often enough. At professional scale, it quietly changes what an engineer actually owns.

This isn't entirely new. Large systems have always outgrown any single person's understanding. That's why teams build shared mental models, why testing and monitoring exist, why rollback mechanisms are treated as essential rather than optional. Even engineers who know their systems well design for the fact that they don't know everything. It's always been this way, to some degree.

But historically, that complexity accumulated slowly. Systems became hard to understand because they were built piece by piece, over time. Even if you didn't understand everything, you remembered building most of it.

AI changes the rate at which that gap can open. An engineer working with capable models can now move through weeks of implementation in a single session. Complexity arrives before understanding has any chance to catch up.

When that happens, the failures that matter aren't the obvious ones. Bugs get caught. Tests fail. The real damage is structural: a change colliding with some part of the system that nobody fully mapped.

Speed is only part of the problem. AI also removes one of the earliest signals we've always relied on: the act of writing code itself.

Writing code pulls you into the system. You can't touch a deprecated path without eventually having to reckon with what it does. That friction is useful. Writing is a form of inquiry.

Prompting doesn't require the same reckoning. Neither does reviewing something that already looks finished. The gap between what the code does and what you think it does can open before anyone has had to close it.

## What Only You Know

The engineers I've seen handle this well treat design as the work.

They decide what should exist, how it should behave, and where it's likely to fail before the model is involved. The model handles implementation; the engineer remains responsible for the outcome.

That responsibility depends on something the model doesn't have: context. You know the constraints of your deployment process. You know which parts of the system are fragile, which assumptions only hold in staging, which dependencies belong to other teams. That knowledge doesn't live in the repository. It lives in you.

A model doesn't know that your silent retry will trigger a double-billing event in your payment pipeline. It doesn't know your deployment window is narrow and there's no rollback. That knowledge doesn't come from the codebase. It comes from having lived with the system.

What gets lost in vibe coding is exactly this moment: when someone understands the system well enough to define what should and shouldn't be built. Fast iteration without that grounding isn't just speed. It's directionless speed. You're moving quickly, but you don't actually know where you are.

There's an assumption that engineers will review what comes out before it ships. But there's a difference between reviewing code and understanding it. Automation bias, the tendency to over-trust automated outputs, makes people more likely to miss errors in generated code than in code they wrote themselves.[^2]

Part of the reason is that generated code doesn't look like a draft. It's clean, consistent, free of the rough edges that signal uncertainty. It looks finished.

That's the trap.

It's much harder to find a flaw in something that already looks correct than to catch it while you're mid-sentence writing it. By the time you're reviewing, the decisions have already been made. The moment where understanding should have shaped those decisions has passed.

## What Stays Human

There's a common assumption embedded in a lot of AI discourse: that software engineering is primarily about producing code.

That's getting harder to believe.

When a model produces the implementation, what remains is the part that was always hardest to define: judgment. Understanding what to build, deciding how it should behave, taking responsibility for the consequences.

Those things don't disappear. They become visible.

In a pre-AI world, thinking and doing were tightly coupled. You wrote the code, so your understanding was embedded in the act of producing it. AI pulls them apart. What remains is what you bring: context, architectural judgment, a sense of where things are likely to break.

The difference between engineers is no longer hidden in how they type. It's exposed in how they think.

That also changes what it means to do the job well. An engineer with real understanding can use these tools to move with a level of speed and clarity that used to require a team. Without that grounding, the same tools produce complexity just as quickly, with no one able to catch it.

The tool amplifies what the engineer brings, in both directions.

Speed is one way to think about what these tools offer. But there's another reading worth sitting with: if implementation takes less time, that time doesn't just disappear. It can go into understanding the problem before any code exists, or into actually testing and verifying the result before it ships. The engineers who handle this well aren't just moving faster. They're moving the time: out of implementation and into the parts of the job that mattered more anyway.

The people who built the foundations we rely on—operating systems, protocols, the infrastructure most software runs on—understood what they built not as a side effect of shipping, but as the work itself. Code was a record of thought: something they could explain and stand behind.

That standard has never been universal. What's new is how easy it is to bypass it.

Engineers who truly understand their systems—not just whether tests pass, but how things behave under load, what happens when something unexpected arrives, where the edges are—are more valuable now, not less. That kind of clarity can't be prompted into existence.

AI doesn't answer the question of what it means to be an engineer. It sharpens it.

These tools don't resolve the tension. They make it harder to ignore. They make a new level of speed and leverage possible for engineers who bring real understanding. But they also make it just as easy to build systems that outpace anyone's ability to reason about them.

The question I keep coming back to is simple: does knowing what you've built still count as part of the job?

And if it does, do we still insist on it?

[^1]: Andrej Karpathy, post on X, February 2, 2025. https://x.com/karpathy/status/1886192184808149383

[^2]: Perry, N., Srivastava, M., Kumar, D., & Boneh, D. (2023). Do users write more insecure code with AI assistants? In *Proceedings of the 2023 ACM SIGSAC Conference on Computer and Communications Security* (CCS '23), pp. 2785–2799. https://doi.org/10.1145/3576915.3623157
