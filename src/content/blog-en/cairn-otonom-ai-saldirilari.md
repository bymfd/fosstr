---
title: 'Cairn and CL-STA-1238: autonomous AI attacks on 19 organizations'
description: 'Unit 42 reports that China-linked CL-STA-1238 combined the open-source Cairn framework with Zhipu GLM and DeepSeek to run 25 autonomous operations. Unauthorized access was confirmed at 10 organizations.'
pubDate: '2026-11-16'
heroImage: ../../assets/cairn-hero.jpg
tags: ['security', 'ai', 'agents', 'threat-intelligence', 'unit42', 'china']
translationOf: 'cairn-otonom-ai-saldirilari'
---

In research published November 12, 2026, Unit 42 described a concrete case of autonomous AI agents used in targeted attacks. CL-STA-1238, assessed with moderate confidence as China-linked, combined the open-source penetration-testing framework [Cairn](https://github.com/oritera/Cairn) with Zhipu GLM and DeepSeek models.

The result: **at least 25 operations against 19 organizations** between August and September 2026. **Unauthorized access or data exfiltration was confirmed in 10** of them. Targets included semiconductor manufacturing, U.S. defense policy, and civil society organizations.

This post explains how the campaign worked, what Cairn does, and what it means for defenders.

## Quick summary

| Field | Value |
|---|---|
| Actor | CL-STA-1238 (Unit 42: moderate confidence China-linked) |
| Period | August–September 2026 |
| Tooling | Cairn + Zhipu GLM/DeepSeek |
| Scale | 25 ops, 19 orgs targeted, 10 confirmed compromises |

## What Cairn brings

Cairn is an offensive security automation framework: it can help chain recon, exploitation steps, and post-exploitation actions. Paired with capable LLMs, parts of an intrusion workflow can be planned and executed with less human-in-the-loop time—especially for repeatable tasks.

![Cairn agentic intrusion chain](/diagrams/cairn-chain.svg)

## Defender takeaways

- **Assume faster iteration:** AI-assisted operators can try more paths quickly; detection must focus on behaviors (lateral movement, credential abuse, anomalous data flows), not just known signatures.
- **Harden identity and egress:** Least privilege, MFA, token hygiene, and monitored outbound channels reduce blast radius.
- **Threat intel ≠ silver bullet:** Track actor TTPs, but prioritize controls that break common kill chains.

Autonomy in attacks is a spectrum; this case is a signal that “agentic” tooling is moving from demos into real operations.
