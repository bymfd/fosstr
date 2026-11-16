---
title: 'NTP was unsigned for 40 years: Meta makes time verifiable with nts.meta.com'
description: 'Meta added RFC 8915 NTS support to its public time service. Time packets can now be authenticated; servers are stateless. Delay attacks and mobile clients remain open challenges.'
pubDate: '2026-11-12'
heroImage: ../../assets/blog-placeholder-1.jpg
tags: ['security', 'ntp', 'nts', 'meta', 'time', 'tls', 'open-source']
translationOf: 'meta-nts-dogrulanabilir-saat'
---

If a device’s clock is wrong, security decisions can be wrong too. TLS certificate validity windows, token lifetimes, replay protection, and log ordering all depend on local time. Yet NTP—the internet’s time protocol—has largely run **unsigned** since 1985: a client sends 48 bytes, gets 48 bytes back, and trusts it.

In October 2026 Meta announced a step to close this gap on its public time service: **nts.meta.com** now speaks Network Time Security (NTS, RFC 8915). The announcement resurfaced on Hacker News in early November. This post explains what NTS does, Meta’s stateless server design, and what it doesn’t solve.

## Quick summary

| Field | Value |
|---|---|
| Service | `nts.meta.com` (key exchange), `time.meta.com` (time responses) |
| Protocol | NTS / RFC 8915 |
| Key exchange | TLS 1.3, TCP/4460, ALPN `ntske/1` |
| Time traffic | NTPv4, UDP/123 + NTS extension fields |

## What NTS provides

NTS adds cryptographic authentication to NTP exchanges (via NTS-KE over TLS and NTS-protected NTP packets), helping clients detect spoofed or tampered time responses on-path.

## What it doesn’t solve

- **Delay attacks:** an attacker who can delay packets can still skew perceived time within limits.
- **Client adoption:** many devices/OS stacks don’t enable NTS by default yet.
- **Availability/trust:** you still rely on the service’s correctness and reachability.

## Why it matters

Authenticated time raises the bar for attackers who rely on clock manipulation to bypass certificate checks or replay protections. Wider NTS deployment is a meaningful infrastructure hardening step.
