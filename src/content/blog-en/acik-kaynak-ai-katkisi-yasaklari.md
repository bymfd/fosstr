---
title: '22 open-source projects that reject AI contributions: reasons and consequences'
description: 'From immich to QEMU, Zig to Gentoo, 22 projects ban AI-generated contributions. Common themes in their policies, motivations, and practical implications for contributors.'
pubDate: '2026-11-11'
heroImage: ../../assets/ai-contrib-hero.jpg
tags: ['open-source', 'ai', 'llm', 'github', 'community', 'ethics']
translationOf: 'acik-kaynak-ai-katkisi-yasaklari'
---

One of the most contentious topics in open source in 2026 is whether AI-generated contributions should be accepted. Some projects say “AI assistance is fine, responsibility stays with the contributor,” while others shut the door entirely.

The site [Open Source Says No](https://osssaysno.com/) collects these policies in one place. As of November 11, 2026, it lists **22 projects** in the “Banned” category—meaning they do not accept contributions created with generative AI. The site publishes policies based on official project texts (with verification dates), not interpretations.

This post covers notable examples from the list, the common reasons behind the bans, and what you should do as a contributor.

![AI contribution policy decision flow](/diagrams/ai-contrib.svg)

## How the list is built

According to the site’s [about page](https://osssaysno.com/about), a project qualifies if it meets one of two criteria:

- At least **5,000 GitHub stars**, or
- Widely used infrastructure regardless of star count (distributions, language runtimes, major libraries, forges).

Policies are categorized as “Banned,” “Restricted,” or “Disclosed” depending on how strictly AI use is handled. The focus here is the strictest group.

## Notable examples

A few patterns show up repeatedly:

- **Quality and review burden:** Maintainers argue AI-generated code/patches often shift the cost to reviewers—subtle bugs, incorrect assumptions, or low-signal changes.
- **Licensing and provenance:** Concerns about training data, copyright, and whether generated output can be reliably attributed or licensed.
- **Security and correctness:** For infrastructure projects (compilers, hypervisors, distros), “plausible but wrong” changes are unacceptable.
- **Community trust:** Some projects want to preserve human authorship norms and accountability.

Projects spanning photo management (immich), virtualization (QEMU), programming languages/toolchains (Zig), and distributions (Gentoo) illustrate that this is not niche—it touches user apps and core infrastructure alike.

## What it means for contributors

- **Read the CONTRIBUTING/policy docs first.** Don’t assume AI help is allowed because it’s common elsewhere.
- **Disclose tool use when required.** Even projects that allow assistance may require disclosure.
- **Own the change.** If you submit it, you must understand, test, and stand behind it—AI or not.
- **Prefer human-reviewed, minimal patches.** Especially in sensitive codebases, small and well-explained beats large generated diffs.

## Bottom line

The split isn’t “pro-AI vs anti-AI” so much as “who bears the verification cost?” For many maintainers, banning AI-generated contributions is a pragmatic way to protect review capacity and trust. For contributors, the rule is simple: follow the project’s policy, and optimize for correctness and clarity over speed.
