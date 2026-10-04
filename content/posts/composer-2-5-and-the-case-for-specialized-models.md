---
title: "Composer 2.5 and the Case for Specialized Models"
date: "2026-05-22"
description: "Cursor's new in-house coding model comes within a few points of the frontier at a tenth to a sixtieth of the cost. It made me wonder whether the era of the do-everything model is starting to crack."
pullquote: "If you can drastically cut cost while nearly matching performance on the one task you actually care about, that seems like the better trade."
tags: ["AI", "software engineering", "Cursor", "LLMs"]
---

A few days ago I sat down to start a task in a fresh Cursor Agent session and didn't think twice about the model picker. I write code with Cursor constantly. What drew me to it in the first place was having one tool where I could swap between all the latest frontier models, so for a long stretch my workflow was just Cursor wired up to Claude Opus or Sonnet, and I'd go from there.

This time was different. When I checked, the session had quietly defaulted to Cursor's own model, **Composer 2.5**. And here's the part that genuinely caught me off guard: I hadn't noticed. The output was good enough that I'd assumed I was talking to something from Anthropic or OpenAI the whole time. That small moment of mistaken identity sent me down a rabbit hole.

## What Composer 2.5 actually is

Composer is the model Cursor's team (the company Anysphere) builds specifically to power its coding agent. Cursor began life as an AI-native IDE, but over the past year it has turned into a company doing serious frontier-model research of its own. Composer 2.5 shipped on May 18, 2026, the fourth Composer release in roughly seven months, and Cursor describes it as a substantial step up over Composer 2 in both raw intelligence and day-to-day behavior on long-running tasks.[^cursor][^newstack]

Crucially, it is *not* a general-purpose chatbot. It's an agent built to read files, edit across a codebase, run terminal commands, execute tests, and iterate on its own failures inside the editor.[^apidog] That narrow focus turns out to be the whole story.

## The benchmarks held up, and so did the price

When I went looking for the numbers, my first instinct was skepticism. "Matches the frontier at a fraction of the cost" is exactly the kind of line every model launch reaches for. But the independent data comes close to backing it up.

On Artificial Analysis's Coding Agent Index (a composite of SWE-Bench-Pro-Hard, Terminal-Bench, and a repository Q&A benchmark), Composer 2.5 scored 62, a 14-point jump over Composer 2's 48. That landed it in **third place overall**, behind only a maximum-effort Claude Opus 4.7 running in Claude Code (66) and a high-reasoning GPT-5.5 in Codex (65).[^aa] On Cursor's own reporting it also hits 79.8% on SWE-Bench Multilingual and 63.2% on CursorBench v3.1, putting it in the same neighborhood as Opus 4.7 and GPT-5.5.[^decoder]

Now the cost. The two models ranked above Composer 2.5 cost roughly **$4.10 and $4.82 per task**. Composer 2.5 runs about **$0.44 per task** in its fast configuration and **$0.07 per task** in its standard one, which is where the headline "10× to 60× cheaper" figure comes from. It isn't a vague marketing range; it's the literal per-task spread against the only two agents that beat it.[^aa] At the token level, Cursor prices it at $0.50 per million input tokens and $2.50 per million output, with a faster same-quality variant at $3.00/$15.00.[^cursor]

So this is a model sitting third on a respected leaderboard, a few points off the absolute best, while costing somewhere between one-tenth and one-sixtieth as much to run. That's the win-win that got my attention.

## How they pulled it off

After all this, I wanted to understand the *how*. The short version is that Cursor didn't try to build a better everything-machine. They built a better coding machine.

The foundation isn't a proprietary API at all. Composer 2.5 is built on **Moonshot AI's open-weights Kimi K2.5 checkpoint**, the same base as Composer 2.[^cursor] Kimi K2.5 is a mixture-of-experts model with roughly a trillion total parameters but only about 32 billion active per inference, which is a big part of why it's cheap to serve in the first place.[^buildfast] Starting from strong open weights instead of training a giant general model from scratch lets the team spend their budget where it matters: reportedly around 85% of the total compute for Composer 2.5 went into post-training rather than the base.[^decoder]

That post-training is heavily software-specific. Cursor trained on 25× more synthetic coding tasks than Composer 2, dynamically generating harder problems as the model got better, including a clever "feature deletion" setup where the agent strips working features out of a real codebase and then has to reimplement them, with the existing test suite serving as a verifiable reward.[^cursor] They also introduced **targeted textual feedback** during reinforcement learning: instead of relying on a single noisy reward at the end of a hundred-thousand-token rollout, they insert a short corrective hint at the exact moment the model made a bad call (a wrong tool invocation, a confusing explanation) and nudge its behavior there specifically.[^cursor]

This is the part I find genuinely compelling. OpenAI's and Anthropic's flagship models pitch themselves as general-purpose: capable across writing, math, analysis, code, and everything else. Cursor took a general open-weights base and spent most of its compute turning it into a master of one trade. At this stage of the field, I think it's fair to start asking *why* a model I'm using purely to write code needs to be trained to be world-class at sonnets and tax law too. If you can drastically cut cost while nearly matching performance on the one task you actually care about, that seems like the better trade.

## A note on efficiency

The most concrete efficiency wins Cursor describes are in its **training** stack, not inference. Using a technique they call Sharded Muon with a dual-mesh setup, they keep expert-parallel and context-parallel work on separate layouts, letting configurations that would normally need 16 GPUs run on 8, with less communication overhead.[^cursor] That's a real efficiency story, but it's about how the model is *built*, not a per-query energy number.

Running it cheaply comes from the architecture: in a sparse MoE base only ~32B of ~1T parameters fire per token, so specialized coding reasoning doesn't light up frontier-class compute on every request.[^buildfast] The 10× to 60× figures are price gaps, not measured compute, but the architecture is why Cursor can charge that little.

## So, are we on the right track?

To be fair to the other side, the picture isn't as tidy as "small specialized models win." Benchmarks are not the same as your codebase: one early user report already has Composer 2.5 losing the plot mid-task and stalling.[^newstack] This is not an ad for Cursor, and I'm not claiming the model is perfect.

The most telling detail came in the same announcement. Cursor said it is training a much larger model from scratch with SpaceXAI, on 10× more total compute across the Colossus 2 cluster's million H100-equivalents; SpaceX had already announced plans to acquire Cursor for $60 billion.[^cursor][^decoder] The company making the strongest case for specialized models is training its next one on one of the largest clusters ever built.

[^cursor]: Cursor Team, "Introducing Composer 2.5," *Cursor Blog*, May 18, 2026. <https://cursor.com/blog/composer-2-5>
[^aa]: Artificial Analysis, "Cursor's Composer 2.5: third on the Coding Agent Index and ~10–60x lower cost than rivals." <https://artificialanalysis.ai/articles/cursor-composer-2-5-coding-agent-index>
[^decoder]: "Cursor's Composer 2.5 matches Opus 4.7 and GPT-5.5 benchmarks at a fraction of the cost," *The Decoder*. <https://the-decoder.com/cursors-composer-2-5-matches-opus-4-7-and-gpt-5-5-benchmarks-at-a-fraction-of-the-cost/>
[^newstack]: "Cursor bets on cheaper coding with Composer 2.5 and Kimi K2.5," *The New Stack*. <https://thenewstack.io/cursor-composer-benchmarks/>
[^apidog]: "Cursor Composer 2.5: What It Is, How to Use It, and How to Access It," *Apidog Blog*. <https://apidog.com/blog/cursor-composer-2-5/>
[^buildfast]: "Cursor Composer 2.5: Benchmarks, Pricing & Full Review," *Build Fast with AI*. <https://www.buildfastwithai.com/blogs/cursor-composer-2-5-review-2026>
