---
title: "When Everyone Can Build"
date: "2026-11-23"
description: "AI has made it easier than ever to build an application. It hasn't made it any easier to know which one is worth building."
pullquote: "The value depends on how much of the complete task you have actually taken off their hands."
tags: ["software engineering", "AI", "craft"]
---

Everyone wants to get rich quick. Open LinkedIn and it won't take you long to find creators explaining how you, too, can build a successful software business by following their steps. Increasingly, those steps involve asking an AI model to generate an application, putting it online, and charging a subscription. You can watch the whole process unfold, which makes the promise seem convincing. At the end there is working software, a landing page, and a way to collect money. It looks like the difficult parts have been taken care of.

The much more boring truth is that there is no simple formula for a successful software business. Those instructions demonstrate how to produce an application, but a business depends on people deciding it is worth paying for, and continuing to make that decision when they have other options. If following the steps were enough, everyone who followed them would have a successful business.

Part of this is genuinely good. Building software is no longer limited to people who spent years learning how. But being able to build something isn't the same as knowing what you've built, or whether it should exist. So when anyone can produce the software, what differentiates the businesses that succeed from the ones that don't?

I think a large part of the answer is the combination of systems-level engineering and a deep understanding of the customer experience. If your competitors can produce the same features as easily as you can, features stop explaining why someone should choose your product. What's left is knowing which problem matters, what a meaningful improvement would look like, and how to deliver it within the constraints of the customer's world.

There's an old saying in software engineering that the best code is the code you never had to write. It applies here because every new application asks something of the person using it. They have to learn it, fit it into their existing work, and decide whether to trust it. A feature can be useful in isolation while making that overall experience worse. Accounting for those costs can lead you to build something smaller, change an existing workflow, or recognize that another application would create more work than it removes.

Consider a tool that imports invoices into an accounting system. Getting data from one place to another might be straightforward enough to demonstrate in an afternoon. For someone processing real invoices, though, the task includes knowing which records have already been entered, identifying anything that needs attention, and making sure a failed import hasn't left the books in an uncertain state. If they still need to compare every result against the original documents, the apparent automation may offer little practical improvement. The value depends on how much of the complete task you have actually taken off their hands.

Delivering that depends on the system underneath. If the same vendor shows up under slightly different names, the import shouldn't quietly add a new vendor each time. If a batch stops halfway through, you need enough information to establish what happened and continue safely. These are questions about state, failure, and the boundaries between systems, and they determine what the interface can honestly tell the person using it. A lot of what feels seamless to a customer comes from engineering decisions they should rarely need to think about.

That's also why I expect human-computer interaction to matter more as software increasingly tries to act on someone's behalf. The person using it still has limited time and attention, so deciding what to automate also means deciding what they need to see and control. Requiring approval at every step can consume the time the automation was supposed to save. Hiding the process can leave someone unable to spot a mistake or understand its consequences. Getting that balance right takes knowledge of both the technology and the people using it.

None of this means an application built in an afternoon can't be valuable. Someone who has spent years working in a particular field might use AI to solve a problem they already know very well. The short build time says little about how long it took them to recognize that problem and know what a good solution should do. That knowledge keeps paying off after launch, in judging which requests to pursue, which failures matter, and where a change would actually help. They're using the same tools as the tutorials. What they bring to them is different.

Faster implementation can help with all of this, but only if the time it saves goes somewhere useful. It can make it cheaper to investigate a problem more carefully, test an assumption with a customer, or try a different approach before committing to one. It can just as easily make it cheaper to ship features nobody needs. The videos on LinkedIn show what an afternoon of building produces. What they can't show is whether anyone is still paying for it a year later.
