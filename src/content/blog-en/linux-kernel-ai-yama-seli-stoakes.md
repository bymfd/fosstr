---
title: 'AI patch flood in the Linux kernel: Lorenzo Stoakes steps back from some review roles'
description: 'Linux MM expert Lorenzo Stoakes stepped down from core/reclaim/Rust/THP/misc review duties amid an influx of AI-generated patches—highlighting a bottleneck in the kernel’s development model.'
pubDate: '2026-11-12'
heroImage: ../../assets/blog-placeholder-4.jpg
tags: ['linux', 'kernel', 'ai', 'open-source', 'maintainers']
translationOf: 'linux-kernel-ai-yama-seli-stoakes'
---

The Linux kernel has one of the strictest quality processes in open source. Patches pass through subsystem maintainer review, and review often takes longer than writing the patch. In recent years a new variable entered the process: AI-generated patches.

In early November 2026, **Lorenzo Stoakes**, one of the most experienced names in memory management (MM), announced on the Linux kernel mailing list (LKML) that he was stepping back from certain review responsibilities. The reason: an AI-driven influx consuming review capacity.

This is not a “developer got tired” story. It’s a concrete signal of a scaling problem in the kernel’s development model.

## Quick summary

| Field | Value |
|---|---|
| Person | Lorenzo Stoakes (Arm) |
| Contribution | Linux kernel since 2014; memory management / `mm/` subsystems |
| Change | Reduced review scope due to patch/review load dynamics |

## Why review is the bottleneck

Maintainers must ensure correctness, performance, security, and long-term maintainability. High-volume, low-signal submissions—whether human or AI-assisted—tax scarce expert attention.

## What it implies

- **Contribution quality bar matters more:** tests, rationale, and minimal diffs help.
- **Tooling and triage:** better automation may filter obvious issues, but deep review remains human.
- **Sustainability:** maintainer burnout is an ecosystem risk, not an individual failure.
