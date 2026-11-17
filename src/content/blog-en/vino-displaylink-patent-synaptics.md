---
title: 'Vino: how Synaptics patent letters shut down an open-source DisplayLink driver'
description: 'The Rust-based open-source Vino driver for DisplayLink DL3 was taken down from GitHub after Synaptics patent letters. Timeline, legal debate, and implications for Linux users.'
pubDate: '2026-11-11'
heroImage: ../../assets/vino-driver-hero.jpg
tags: ['linux', 'displaylink', 'patent', 'rust', 'kernel', 'open-source']
translationOf: 'vino-displaylink-patent-synaptics'
---

DisplayLink is one of the most common ways to connect external displays over USB. On Windows you install a driver and forget it; on Linux the story has been the same for years: the open-source `udl` driver works for older USB2 generations, while newer DL3 docks require Synaptics’ out-of-tree kernel module and closed-source `DisplayLinkManager` daemon.

In mid-2026 a project called **Vino** emerged to fill that gap: a clean-room reverse-engineered, in-kernel DRM driver written in Rust. Months later, Vino faced patent letters from Synaptics and the GitHub repository went offline. This post recounts the timeline without hype.

## What was Vino?

Announced via Phoronix (June 17, 2026), Vino targeted **DisplayLink DL3** docks (e.g., Dell Universal Dock D6000). Developed by Mike Lothian, it aimed to live in the DRM/KMS stack in-kernel—no separate closed userspace daemon.

Key points:
- **Clean room:** claimed independent implementation based on observed behavior, not copied source.
- **AI assistance:** parts written with help from Claude Code/Opus 4.8—relevant to public narrative, not central to patent/licensing questions.

![Vino driver and patent timeline](/diagrams/vino-driver.svg)

## What happened

Patent correspondence from Synaptics reportedly raised infringement concerns. Regardless of technical merit, legal risk can be existential for individual maintainers; the repo was removed.

## Implications for Linux users

- DL3 support on Linux remains constrained without vendor cooperation.
- Clean-room work reduces copyright risk but does not eliminate patent exposure.
- Sustainable paths often require vendor engagement, licensing, or collective legal support—none easy.

The episode is another reminder that hardware enablement can be as much a legal challenge as an engineering one.
