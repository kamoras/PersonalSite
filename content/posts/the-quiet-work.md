---
title: "The Quiet Work"
date: "2026-04-17"
description: "The software industry has produced some of the most celebrated fortunes in history. The people who built its foundations are mostly unknown. That gap is worth sitting with."
pullquote: "The tool exists because of the foundation. The people who maintain the foundation have to apply to use it."
tags: ["software engineering", "open source", "tech culture"]
---

*Corrected October 2026: the original version misnamed the author of the ProPublica story, described GnuPG's funding as it was before 2022, and understated who received access to Mythos and what Anthropic committed. The argument is unchanged; the facts under it are now right.*

In 2015, ProPublica ran a story about Werner Koch under the headline: "The World's Email Encryption Software Relies on One Guy, Who Is Going Broke."[^1] Koch had been maintaining GnuPG, the software that encrypts email for journalists, governments, and security researchers worldwide, for nearly two decades, earning about $25,000 a year from it. After the story ran, donations surged and institutional support followed. He kept going.

That story is eleven years old now. And Koch is far from alone.

cURL transfers data on an estimated 20 billion devices, including, at one point, the helicopter NASA sent to Mars.[^2][^3] Daniel Stenberg has been maintaining it since 1996. OpenSSL is one of the most widely used implementations of TLS, the protocol that encrypts most web traffic.[^4] SQLite is probably the most deployed database engine on earth.[^5] OpenSSH, maintained by the OpenBSD project under Theo de Raadt, is how nearly every Linux and BSD server is administered remotely.[^6] Koch's GnuPG only became self-sustaining in 2022, through commercial support contracts, a quarter century after he started it.[^8]

These aren't niche tools. They are the foundation. And they run on stubbornness, donation income, and institutional memory that can't be replaced.

## The Gap

Tech has produced some of the most celebrated fortunes in history. The people who built the foundations beneath those fortunes are mostly unknown.

The celebrated ones share a profile. They built something people could see. They raised money. They scaled. Steve Jobs got a movie. Bill Gates got a documentary. The people maintaining the infrastructure both of their companies run on got a pull request backlog and a donation button.

That's a selection effect, not a coincidence. The things that attract capital are the same things that attract coverage, and capital is how the industry measures importance. Foundational work rarely attracts much of either. It attracts users, quietly, in the hundreds of millions, and the person maintaining it is still doing it because they care.

The economics are strange enough to be worth stating plainly. A library running on 20 billion devices and underpinning billions of dollars of commercial software might generate a few thousand dollars a year in donations for its author. The companies adding a UI layer and a subscription model on top of it capture the value. The author gets attribution. That was always the deal. What nobody anticipated was the scale at which it would play out.

This arrangement held together for a long time. It was never fair, but it was stable: maintainers kept the lights on, companies kept building on top, and most of the time nothing catastrophic happened. Werner Koch nearly going broke in 2015 was a warning. The industry read it as an anomaly.

## The Consequences

A piece in the New York Times this week made clear what that complacency has cost.[^7]

Raffi Krikorian, the CTO of Mozilla, wrote about Anthropic's Claude Mythos, an AI model capable enough at finding software vulnerabilities that Anthropic decided not to release it publicly. Instead, it launched a defensive security initiative called Project Glasswing and gave access to its launch partners, including Amazon Web Services, Apple, Microsoft, Google, JPMorganChase, and the Linux Foundation, and to more than 40 other organizations that build or maintain critical software.[^9] (Cisco, where I work, is one of the launch partners.)

What Mythos found: a 27-year-old vulnerability in OpenBSD, and a 16-year-old one in FFmpeg, in a line of code that automated testing tools had hit five million times without catching it. Both projects are maintained by small volunteer teams, who fixed the issues after being told about them. Neither team had access to Mythos when those vulnerabilities were found.

There's a particular irony in how tools like Mythos get built. Anthropic, like every major AI company, built its models and infrastructure on top of the same open source foundations we've been talking about: Linux, OpenSSL, and dozens of other projects maintained by people like Koch and Stenberg. The capability being used to probe these projects runs on code those maintainers wrote and were never paid for. Maintainers outside the chosen organizations can request access through Anthropic's Claude for Open Source program. The tool exists because of the foundation. The people who maintain the foundation have to apply to use it.

Alongside the announcement, Anthropic committed up to $100 million in usage credits for these efforts and $4 million in direct donations to open-source security organizations. Krikorian noted it's more than anyone else in the industry has done. The $4 million in cash is also less than what most of the companies in Project Glasswing spend on engineering in a single day, for infrastructure those same companies have relied on for decades without meaningfully funding it.

## What It Means

A company with access to a tool like Mythos finds a vulnerability in an open source library, patches their own product, and moves on. The underlying library stays vulnerable. Every startup, every nonprofit, every small business that grabbed the same dependency is still exposed. Responsible disclosure to volunteer maintainers has always been inconsistent. The incentive is to fix your own stack. The harder work of actually fixing the foundation so it's safe for everyone requires a kind of cross-industry cooperation that has never been the default.

And the people at the end of that chain have no idea any of this is happening. The shop owner running software built on these libraries, the clinic whose firewall runs on the same OpenBSD that Mythos just found a 27-year-old hole in. They've never heard of any of it. They don't need to. But the security of what they're running depends on whether the people maintaining these projects ever get access to the same tools being used to find what's broken in them.

In 2015 the industry's answer to Werner Koch was a round of grants. In 2026 its answer to Mythos was a launch list that includes Amazon, Apple, Google, and Microsoft, and, for the volunteers who maintain the code beneath all four, an application form.

[^1]: Angwin, Julia. "The World's Email Encryption Software Relies on One Guy, Who Is Going Broke." ProPublica, February 5, 2015. https://www.propublica.org/article/the-worlds-email-encryption-software-relies-on-one-guy-who-is-going-broke

[^2]: "The World Runs 20 Billion Instances of Curl. Where's the Support?" The New Stack, 2023. https://thenewstack.io/the-world-runs-20-billion-instances-of-curl-wheres-the-support/

[^3]: Stenberg, Daniel. "Why curl is used everywhere, even on Mars." daniel.haxx.se, December 3, 2021. https://daniel.haxx.se/blog/2021/12/03/why-curl-is-used-everywhere-even-on-mars/

[^4]: OpenSSL Project. "OpenSSL Library." https://openssl-library.org/

[^5]: "Most Widely Deployed and Used Database Engine." SQLite.org. https://sqlite.org/mostdeployed.html

[^6]: "OpenSSH." OpenBSD.org. https://www.openssh.com/

[^7]: Krikorian, Raffi. "It's the End of the Internet as We Know It." The New York Times, April 15, 2026. https://nytimes.com/2026/04/15/opinion/mythos-open-souce-internet.html

[^8]: Koch, Werner. "A New Future for GnuPG." gnupg.org, January 2, 2022. https://gnupg.org/blog/20220102-a-new-future-for-gnupg.html

[^9]: Anthropic. "Project Glasswing." https://www.anthropic.com/glasswing
