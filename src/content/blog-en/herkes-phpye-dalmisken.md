---
title: 'While everyone focused on PHP: October’s overlooked security stories'
description: 'PHP shipped an emergency patch on Oct 21—but Node.js released ten CVEs the same day; GitLab’s regex compiler, a backdoored LiteLLM PyPI release, nginx fixes, and eMudhra’s predictable CA keys also hit within ~36 hours.'
pubDate: '2026-10-22'
heroImage: ../../assets/php2shell-hero.jpg
tags: ['teknoloji-haberleri', 'security', 'open-source', 'tech-industry']
translationOf: 'herkes-phpye-dalmisken'
---

October 21, 2026 was one of the busiest security days of the year. The headline was PHP: two bugs in the engine, 14-year-old code paths, millions of exposed installs, and an urgent patch. PHP 8.5.12, 8.4.27, 8.3.36 and 8.2.35 landed at 14:00 UTC.

But in the same window, other layers caught fire: a JavaScript runtime, a Python package, a GitLab CI compiler component. Nginx had fixed five issues a week earlier; days before that, a CA’s key material raised predictability concerns. The common thread: breaks below the application layer.

## 1. php2shell context

Two critical CVEs in core PHP paths (memory/error handling) drove emergency updates. If you run PHP, patching supported branches was the priority; EOL branches required mitigations/backports where available.

## 2. Node.js: 10 CVEs the same day

Runtime and dependency updates reminded teams that “not PHP” doesn’t mean “not urgent.”

## 3. GitLab regex/compiler issues

CI and pipeline tooling remain high-leverage targets: compromise build logic and you compromise everything downstream.

## 4. LiteLLM PyPI backdoor

A poisoned package release is a classic supply-chain event: pin, verify, and monitor package integrity.

## 5. nginx and CA ecosystem notes

Web frontends and trust anchors (CAs) are foundational; their failures cascade broadly.

**Takeaway:** Patch across the stack, not just the loudest CVE. Track runtimes, CI, package registries, and TLS/PKI with the same urgency as app frameworks.
