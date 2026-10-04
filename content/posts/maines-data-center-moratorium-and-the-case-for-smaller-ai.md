---
title: "Maine's Data Center Moratorium and the Case for Smaller AI"
date: "2026-04-15"
description: "Maine's legislature passed the first US moratorium on large data centers, before a veto stopped it. Some read it as a blow to AI. I think it pointed the other way."
pullquote: "But for many human-scale problems, the bottleneck isn't a lack of parameters. It's a lack of thoughtful application."
tags: ["software engineering", "AI", "edge computing"]
---

*Editor's note (May 2026, updated October 2026): Governor Janet Mills vetoed this bill on April 27, 2026. The Maine Legislature failed to override the veto on April 29. The moratorium did not become law. The post describes Civitas as it was in April 2026; its scoring, model, and workload have since changed. In October 2026 the Pi's power and electricity figures were updated to the measurements Civitas now publishes, the cloud-cost estimate was recalculated with its assumptions stated, and three citations were corrected.*

Maine became the first U.S. state to pass a moratorium on large data centers this week, covering new facilities that consume more than 20 megawatts of power for the next eighteen months.[^1] For context, 20 megawatts is a mid-sized facility; the largest AI campuses now plan for hundreds of megawatts or more. The concerns are straightforward: electricity costs, water usage, and land use. Communities that hadn't expected to host the infrastructure powering the internet's next chapter pushed back, and their legislature listened.

That seems reasonable. It's also not obvious that this is a problem for AI.

Some will read it that way, as a statement that slowing data center expansion means slowing AI. That worry tends to assume that AI and data centers are basically the same thing. They're tangled together right now, but not necessarily because they have to be.

Hyperscalers are on track to spend something like $650 billion on data center infrastructure in 2026 alone.[^5] That level of spending is hard to read as purely demand-driven. It looks more like a race to secure capacity ahead of consolidation, a hedge against being caught short if demand materializes as projected. Much of this hardware will be depreciated within a few years, even if it remains operational beyond that.[^6] Companies understand this and are building anyway, because the upside of owning that capacity is enormous if demand meets expectations. The result is a buildout shaped as much by financial positioning as by technical necessity.

Training frontier models genuinely requires enormous compute. Runs for models like GPT-4, Gemini, and Claude are widely understood to consume millions of GPU-hours. Inference, by contrast, is often far less demanding. While some large-scale products benefit from centralized infrastructure, many inference workloads run comfortably on a single machine or small cluster. Training is an episodic cost; inference is the day-to-day use, and for many tasks its requirements are far more modest than the current conversation suggests. Not every application needs to be built at that scale.

If anything, restrictions like Maine's could be good for the field, not because they limit AI, but because they force more careful use of infrastructure.

In practice, constraints force better questions. When compute isn't effectively unlimited, you have to ask what the task actually requires instead of defaulting to the largest available model. That shift tends to produce more efficient systems, not worse ones.

There's also a sustainability case. Data centers are already among the fastest-growing sources of electricity demand, and that demand is accelerating.[^4] While they can bring real economic benefits to some regions, those benefits are unevenly distributed. Slowing the buildout can limit the extent to which those costs are externalized onto communities that didn't choose to bear them.

And then there's trust. The pushback in Maine wasn't about AI. It was about power bills, water tables, and land repurposed without anyone asking. AI infrastructure that can operate at smaller, more distributed scales doesn't impose those tradeoffs in the same way. That makes it easier to argue, genuinely, rather than rhetorically, that AI is working for people rather than extracting from them. A 2023 Pew Research study found that 52% of Americans feel more concerned than excited about AI, up from 38% in late 2022.[^7] Building systems that don't need to commandeer local infrastructure is one concrete way to address that anxiety.

That question of what AI actually needs ended up shaping how I approached a project of my own.

## What I Built on a Pi

I've been working on a project called [Civitas](https://civitas-research.org/), a platform that scores U.S. senators and House representatives on how closely they represent their constituents. It pulls from voting records, campaign finance data, floor speeches, and stated platforms, and produces scores across four dimensions: funding independence, promise persistence, independent voting, and funding diversity. The scoring system is necessarily imperfect, more a structured lens than an objective measure.

It runs on a Raspberry Pi 5 with 16GB of RAM, sitting on my desk at home. It pulls data from government APIs like Congress.gov, the FEC, and GovInfo, but all AI inference happens locally. No cloud compute. No GPU. No calls to OpenAI or Anthropic or anyone else.

The main model is `all-MiniLM-L6-v2`, a compact sentence-transformer with a model size of about 90 megabytes.[^2] About 95 percent of the classification work runs through it: bill policy areas, donor industries, party alignment, stance direction. A batch of 64 documents takes around 100 milliseconds. It earns its keep.

The remaining five percent goes to Qwen 2.5 at 1.5 billion parameters, running via llama.cpp compiled for ARM. It handles the things that genuinely need generation: senator narrative summaries, promise evaluations, issue summaries for the action center. About 500 calls a day, three seconds each.

At cloud API rates, 180,000 LLM calls per year would run somewhere between about $1,300 and $8,000 depending on the model and pricing tier.[^3] On the Pi, it's roughly $12 in electricity.[^8]

## Doing More with Less

The 1.5B model is a tradeoff, but one the project's requirements made easy to accept. Civitas uses the LLM for structured extraction, completing templates rather than open-ended generation. Before each call, the pipeline retrieves the relevant context (key votes, campaign finance data, platform positions) and injects it directly into the prompt. The model doesn't need to store knowledge; it just needs to reason over what it's given. That's the core advantage of retrieval: a smaller model performing above its weight because the hard work of finding the right information has already been done. It raises the question: does a two-sentence summary of a voting record truly benefit from a trillion parameters, or is it simply a matter of feeding the right context to a smaller, more efficient engine?

The same thinking shaped the classification approach. It's tempting to pipe everything through a capable language model, but for something like categorizing a bill as "Labor" or "Healthcare," a sentence-transformer with cosine similarity is faster, cheaper, and more explainable. You can trace exactly why a classification happened. Send the same question to an LLM and you'll often arrive at a similar answer, but with significantly more compute and less transparency.

## The Models We Already Have

We often act as if the utility of AI depends on the next training run. But for many human-scale problems, the bottleneck isn't a lack of parameters. It's a lack of thoughtful application. The models powering Civitas are not new, they didn't require retraining, and they're already doing useful work. Many of the most interesting applications haven't been built yet, and a lot of them won't need larger models either, just engineers willing to structure the problem so a smaller one can do the job.

None of this is to say scale doesn't matter. There are real applications that need it. But it's not obvious that another hundred gigawatts of new capacity is the only way forward.

Maine's moratorium targets facilities over 20 megawatts. The Pi runs on a budget of 7 watts.

[^1]: "Maine Legislature Approves First U.S. Moratorium on Big Data Centers," Reuters, April 14, 2026. https://www.reuters.com/sustainability/boards-policy-regulation/maine-legislature-approves-first-us-moratorium-big-data-centers-2026-04-14/

[^2]: Reimers, N., & Gurevych, I. (2019). Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks. *Proceedings of the 2019 Conference on Empirical Methods in Natural Language Processing (EMNLP)*. https://arxiv.org/abs/1908.10084. The `all-MiniLM-L6-v2` model is a later distillation fine-tuned on the same sentence-transformer framework; the 2019 paper describes the foundational architecture.

[^3]: Assumes about 2,000 input tokens of retrieved context and 200 output tokens per call, 180,000 calls a year, at list prices of roughly $2.50 and $10 per million input and output tokens for a mid-tier model (about $1,300) and $15 and $75 for a frontier model (about $8,000). Actual cost varies by provider and pricing tier.

[^4]: Goldman Sachs Research estimated that data center power demand could increase 160% by 2030, driven primarily by AI workloads. "AI Is Poised to Drive 160% Increase in Data Center Power Demand," Goldman Sachs, May 14, 2024. https://www.goldmansachs.com/insights/articles/AI-poised-to-drive-160-increase-in-power-demand.html

[^5]: 2026 capital expenditure guidance announced in February: Amazon about $200 billion, Alphabet $175 to $185 billion, and Meta $115 to $135 billion, with Microsoft bringing the four to around $650 billion. "Investors worried after Big Tech plans $650bn spend in 2026," Silicon Republic, February 6, 2026. https://www.siliconrepublic.com/business/big-tech-650bn-capital-expense-bill-2026-meta-amazon-google-microsoft

[^6]: "The Dirty Secret Behind Big Tech's AI Arms Race: Massive Hardware Investments That Are Obsolete in 3 Years," Fortune, April 15, 2026. https://fortune.com/2026/04/15/data-centers-hyperscalers-spending-billions-on-hardware-thats-worthless-in-3-years/

[^7]: Tyson, A., & Kikuchi, E. (2023). "Growing public concern about the role of artificial intelligence in daily life." Pew Research Center. https://www.pewresearch.org/short-reads/2023/08/28/growing-public-concern-about-the-role-of-artificial-intelligence-in-daily-life/

[^8]: Civitas, "Environmental impact," last reviewed September 29, 2026. The whole machine is budgeted at 7 watts around the clock, about 61 kWh a year (about $12 at an assumed 19 cents per kWh), set above the 3.3-watt average and 6.9-watt peak measured on the board during the nightly pipeline. https://civitas-research.org/environmental
