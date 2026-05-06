---
title: "Nine Years in the Kernel"
date: "2026-05-05"
description: "Copy Fail (CVE-2026-31431) isn't a story about a maintainer who made a mistake. It's a story about what happens when complexity accumulates faster than anyone can reason about it."
tags: ["security", "linux", "software engineering"]
---

The bug that became Copy Fail was introduced in 2017, when a developer added an in-place processing optimization to `algif_aead.c`. The change made sense: avoid an extra allocation, process the input buffer directly. It landed, passed review, and worked correctly in every case the author had in mind.

What the author couldn't easily have held in mind was the interaction with two other subsystems that had arrived years earlier: the `authencesn` AEAD cryptographic template, added in 2011 for IPsec, and AF_ALG AEAD socket support, added in 2015. Neither was wrong. The optimization wasn't wrong. Together, they produced a logic flaw in scatter-gather list handling that lets any unprivileged local user write four controlled bytes into the page cache of any readable file on the system — including setuid binaries like `/usr/bin/su`.

Four bytes. Root shell. No race condition required.

That last part is what separates Copy Fail from most kernel local privilege escalation bugs. Dirty Cow required winning a race, which makes exploitation probabilistic — you run it enough times and it eventually works, which is bad, but it's a different category of bad. Dirty Pipe was considerably more reliable, but exploiting it still required arranging specific pipe buffer state. Copy Fail needs neither. The 732-byte Python script that the Theori researchers published works unmodified across every mainstream distribution built since 2017, with a reliability that sits closer to "it will work" than "it might work."[^1] That's the gap between a vulnerability that lives in a threat model and one that belongs in an incident response playbook.

## Three Right Moves, One Wrong System

What's worth sitting with here is that every individual decision in the timeline was defensible. `authencesn` filled a real need in the IPsec stack. AF_ALG AEAD sockets extended the kernel's userspace crypto API in a direction that made sense. The 2017 in-place optimization saved allocations on a hot path. Each change was reviewed by people who understood the code they were reading.

The problem is that "understood the code they were reading" is not the same as "understood how this interacts with everything else touching the same data structures." The Linux kernel's crypto subsystem is not a sealed module. It intersects with memory management, socket interfaces, and scatter-gather I/O in ways that aren't visible in a patch diff unless you're specifically looking for them — and you can't be specifically looking for every possible interaction on every patch that lands.

This is what complexity accumulation looks like from the inside. The system grew past the point where any individual contributor can reason about cross-subsystem interactions by reading diffs, and no single change along the way was the obvious mistake. The upstream fix reverts the 2017 optimization.[^2] That's the right call.

## The Actual Risk

CVSS 7.8 puts Copy Fail in the "high" tier, not critical. That's accurate in a narrow sense: local code execution is a genuine prerequisite. You can't get here remotely on its own.

But "requires local access" covers more ground than it sounds. A compromised service account. A developer with SSH access. Any shared-hosting or multi-tenant environment. For enterprises where lateral movement is a realistic threat, the local-only qualifier is less of a mitigation than it might appear in an advisory.

One detail that matters for incident response: the exploit leaves no on-disk modifications and disappears after a reboot. That's not reassuring — it means post-compromise detection is harder, not easier.

Patched versions landed in Linux 7.0, 6.19.12, and 6.18.22, with distribution-specific backports following. Affected distributions include Ubuntu 24.04 LTS, RHEL 10.1, Amazon Linux 2023, and SUSE 16.[^3][^4] The gap between upstream patches landing and your distribution shipping them gets less coverage than the initial advisory — and for a vulnerability this exploitable, it's the number that actually matters for your exposure.

## What This Keeps Asking Us

The Linux kernel has more review, more tooling, and more experienced contributors than most software projects will ever have. Copy Fail survived nine years of that not because those defenses failed, but because the gap it exploited was smaller than any of them were designed to catch. That's not an indictment of the kernel. It's a description of what complex software does over time, in any organization, at any scale.

The Linux kernel is the ceiling of what open source software security looks like at scale. That ceiling still produced a reliable local privilege escalation that lived undetected for nine years. Most production teams operate with a fraction of the kernel's review depth, tooling, and institutional memory.

Code that makes cross-subsystem assumptions explicit — documented invariants at interface boundaries, tests that encode expected behavior rather than relying on someone remembering why a constraint exists — narrows that distance. The 2017 optimization's dependency on scatter-gather behavior from a 2011 IPsec template was nowhere a reviewer crossing that boundary could find it. It didn't have to be invisible. Most projects make that choice by default, without noticing they're making it.

[^1]: Xint Code Research Team, Theori. CVE-2026-31431 (Copy Fail) discovery and coordinated disclosure. April 30, 2026. https://theori.io/

[^2]: NVD. CVE-2026-31431 Detail. The upstream fix (mainline commit a664bf3d603d) reverts the 2017 in-place optimization in `algif_aead.c`. https://nvd.nist.gov/vuln/detail/CVE-2026-31431

[^3]: Ubuntu Security Team. "Fixes available for CVE-2026-31431 (Copy Fail) Linux Kernel Local Privilege Escalation Vulnerability." April 30, 2026. https://ubuntu.com/blog/copy-fail-vulnerability-fixes-available

[^4]: Help Net Security. "Nine-year-old Linux kernel flaw enables reliable local privilege escalation (CVE-2026-31431)." April 30, 2026. https://www.helpnetsecurity.com/2026/04/30/copyfail-linux-lpe-vulnerability-cve-2026-31431/
