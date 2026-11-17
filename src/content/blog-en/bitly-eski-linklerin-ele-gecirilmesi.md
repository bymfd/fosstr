---
title: 'Old Bitly links in Burger King and McDonald’s tweets were hijacked'
description: 'On November 15, 2026, back-halves of old bit.ly URLs were re-registered. 2011 tweets pointed to Nazi camp and 9/11 pages; Bitly confirmed the issue and suspended accounts.'
pubDate: '2026-11-16'
heroImage: ../../assets/bitly-hero.jpg
tags: ['security', 'bitly', 'link-hijacking', 'social-media', 'privacy']
translationOf: 'bitly-eski-linklerin-ele-gecirilmesi'
---

On November 15, 2026, something strange happened on X: a Burger King tweet from 2011 started redirecting not to a restaurant locator, but to Wikipedia’s list of **Nazi concentration camps**. A 2011 McDonald’s tweet began pointing to the **September 11 attacks** article.

Neither account was compromised. The tweets weren’t edited. What changed was **where the Bitly short links inside them resolved**. Someone re-registered the back-halves of old links.

This post explains how it happened, how widespread it was, and why old short links remain a risk.

## Quick summary

| Field | Value |
|---|---|
| Date | November 15, 2026 |
| Affected | Burger King, McDonald’s, Donald Trump; per CNN reports also Bill Gates, Justin Trudeau, Mike Pence, FBI, U.S. Department of Defense (among others) |
| Root cause | Re-registration/takeover of short-link back-halves |
| Fix/response | Bitly confirmed and suspended accounts involved |

![Old short link, new destination](/diagrams/bitly-hijack.svg)

## How short-link hijacking works

Shorteners map a short path (back-half) to a destination URL. If a service ever allowed back-halves to become available again—or if an attacker can claim/abuse them—then any historical content embedding that short link (tweets, blogs, emails, QR codes) can silently start pointing somewhere else. The original publisher loses control without any change on their side.

## Why this matters

- **Reputation and harm:** Trusted brands’ old posts can be weaponized to spread offensive or malicious content.
- **Persistence:** Short links live forever in archives and screenshots; the blast radius is long-tailed.
- **Phishing/malware risk:** The same mechanism can redirect to credential theft or drive-by downloads.

## What to do

- **Audit historical short links** you still rely on; migrate critical ones to domains/redirects you control.
- **Prefer first-party redirects** for evergreen links.
- **Monitor** high-visibility old posts for unexpected destination changes.
- Shortener providers should treat back-half lifecycle and reclamation as a security boundary, not just a namespace feature.
