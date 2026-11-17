---
title: 'Broccoli2Shell: Brotli decoder bug hits Node.js, Python, and 20+ projects'
description: 'CVE-2026-111497, an out-of-bounds write in Google’s Brotli C decoder that lingered for months. Node.js, Python, and 20+ projects carrying embedded copies were affected.'
pubDate: '2026-10-26'
heroImage: ../../assets/broccoli2shell-hero.jpg
tags: ['security', 'open-source', 'nodejs', 'teknoloji-haberleri']
translationOf: 'broccoli2shell-brotli-acigi'
---

On Friday, October 23, a headline hit Hacker News with 394 points and 212 comments: **Broccoli2Shell**. A week earlier the discussion was about two critical bugs in PHP’s engine; now the subject was again not the application itself but a library underneath it—this time a compression decoder: Google’s Brotli C implementation.

The name sounds like a joke. The bug was first labeled “Node2Shell,” then Juliano Rizzo objected: a Brotli bug (think zlib 20 years ago) is a bigger deal than PHP2Shell, and he dubbed it “Broccoli.” The name stuck. The bug is not a joke: **CVE-2026-111497**, rated **9.2 (CVSS 4.0)** by GitHub and “High” by Node.js.

The vulnerability affects Brotli decoder versions **1.0.3–1.2.0**. Fixes shipped in **1.0.10, 1.1.1, and 1.2.1**. The blast radius matches Brotli’s reach: Node.js, Python packages, .NET, Ruby, PHP extensions, DuckDB, Apache Arrow, 7-Zip-zstd, p7zip, EDK II, woff2, and more.

## 1. The bug: an 8-byte buffer and a misunderstood return value

A Brotli stream is split into blocks, and the decoder transitions between block types while reading. Before the fix, `DecodeBlockTypeAndLength()` in `c/dec/decode.c` returned a plain `boolean`. Callers could not distinguish a **corrupted stream** from a **“need more input”** state. On the fast path, the decoder ignored the return value entirely.

A crafted stream can request an impossible block transition. The decoder misreads this as “need more input,” keeps appending attacker bytes into an **8-byte internal buffer**, and overruns it. The overflow corrupts adjacent decoder state, opening paths to memory disclosure, crashes, or code execution depending on context.

![Brotli decoder buffer overflow flow](/diagrams/brotli-buffer.svg)

## 2. Why it spread so far

Brotli is embedded or vendored widely (browsers, runtimes, archives, fonts). A single upstream C bug becomes many downstream CVEs/advisories when copies aren’t tracked and updated.

## 3. What to do

- **Update** Brotli to fixed versions (or downstream releases that bundle them).
- **Inventory** vendored/embedded copies in your dependency tree and images.
- **Treat decompression of untrusted input** as an attack surface (fuzzing, sandboxing, memory-safe boundaries where possible).

Supply-chain reality: the “boring” codec in your stack can be the one that matters.
