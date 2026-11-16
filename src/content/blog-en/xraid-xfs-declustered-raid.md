---
title: 'XRAID: declustered parity RAID embedded in XFS'
description: 'Christoph Hellwig unveiled XRAID for zoned XFS. Parity RAID applies only to file data; metadata stays on existing MD RAID. Writes can be up to 20x faster than mdraid.'
pubDate: '2026-11-16'
heroImage: ../../assets/xraid-hero.jpg
tags: ['linux', 'xfs', 'storage', 'raid', 'zoned', 'kernel']
translationOf: 'xraid-xfs-declustered-raid'
---

A long-awaited change on the Linux storage side became visible on November 13, 2026: Christoph Hellwig announced the first public release of **XRAID**, a declustered parity RAID implementation integrated into **XFS**. XRAID is not a separate block layer or a separate filesystem; it’s RAID embedded inside XFS.

The target is especially **zoned XFS** setups: devices with sequential-write constraints such as SMR disks. But XRAID also works on conventional HDDs and SSDs. According to Hellwig, even without SSD-specific optimizations, writes can be **up to 20x faster** than mdraid.

This post explains what XRAID does, how it differs from existing RAID approaches, and why it’s not ready for production yet.

## Quick summary

| Field | Value |
|---|---|
| Developer | Christoph Hellwig |
| Announcement | November 13, 2026, LKML |
| Scope | Declustered parity RAID for XFS (notably zoned XFS) |
| Data vs metadata | Parity for file data; metadata on existing MD RAID |
| Status | Early/public preview; not production-ready |

## Why declustered parity?

Traditional parity RAID rebuilds can be slow and disruptive. Declustered layouts spread parity/rebuild work to reduce bottlenecks and improve recovery behavior under certain workloads—at the cost of complexity.

## Why inside XFS?

Integrating with the filesystem can enable tighter coordination between allocation, write ordering (critical for zoned devices), and parity management than a generic block-layer RAID.

## Caveats

- Early code: expect rough edges, changing interfaces, and limited tooling.
- Test thoroughly before any serious use; keep backups.
- Performance claims depend heavily on workload and hardware.

XRAID is an exciting direction for Linux storage, especially for zoned media—but treat it as experimental for now.
