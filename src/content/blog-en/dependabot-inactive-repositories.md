---
title: 'Dependabot pauses on inactive repositories on Dec 8'
description: 'From Dec 8 2026 GitHub turns off Dependabot alerts on most repos with no activity for a year. Alerts are archived, not deleted, and a push restores them.'
pubDate: '2026-11-24'
heroImage: ../../assets/dependabot-inactive-repositories-hero.jpg
tags: ['security', 'github', 'dependabot', 'supply-chain', 'open-source']
translationOf: 'dependabot-inactive-repositories'
---

GitHub announced in its November 10, 2026 changelog that Dependabot alerts will be turned off starting December 8, 2026 on most repositories with no activity in the past year. This is not a vulnerability; it is a product decision that changes where alerts are generated. The key detail: existing alerts are archived, not deleted, and any push to the repository turns them back on and restarts the one-year clock.

## Quick summary

| Field | Value |
|---|---|
| Change | Dependabot alerts pause on inactive repositories |
| Effective | December 8, 2026 |
| Activity definition | Push to any branch or tag, create repository, enable Dependabot alerts |
| Existing alerts | Archived, not deleted, restorable |
| Restore | Any push or enabling alerts in repository settings |
| Exceptions | Enforced security configuration or enterprise policy blocking admin control |
| Scope | All plans on github.com and GitHub Enterprise Cloud with data residency |
| Out of scope | GitHub Enterprise Server |

![Dependabot alert lifecycle](/diagrams/dependabot-inactive-repositories.svg)

## Technical view

GitHub's rationale is the growing rate of vulnerability discovery and alert volume; the goal is to keep Dependabot fast and reliable for actively developed repositories. The decision is worded as "most repositories" because there are two exceptions. Repositories with an enforced security configuration that enables Dependabot alerts are not turned off. Repositories in enterprises whose Dependabot alerts policy does not allow repository administrators to enable or disable alerts are also skipped.

The activity definition is narrow and mechanical. GitHub counts exactly three things: a push to any branch or tag, creating the repository, and turning on Dependabot alerts. Issues, pull requests, comments, and stars are not listed. A repository with no code push in a year can therefore be in scope even if other kinds of activity occurred.

Pausing alerts is not data loss. GitHub says existing alerts are archived and can be restored. Any push to the repository automatically turns alerts back on and restarts the one-year period. Enabling them manually in repository settings has the same effect. For data residency customers, archived alerts are stored in the same region as the rest of the enterprise's data.

The scope is specific: all plans on github.com and GitHub Enterprise Cloud with data residency. GitHub Enterprise Server is not affected. The announcement does not describe a change to Dependabot version updates or the dependency graph; only alerts pause. Keeping that distinction matters, because a Dependabot is shut down headline would be misleading.

## What to do

1. **Inventory repositories.** Before December 8, list repos whose last push is older than a year; separate accepted archives from active but quiet repos.
2. **Push once to active-but-quiet repos.** A small change to a maintained repository restores alerts and resets the one-year clock.
3. **Use an enforced security configuration.** If the organization does not want repository administrators to turn alerts off, apply a configuration that enables them.
4. **Check archives after work resumes.** When starting work on a paused repository after December 8, verify that alerts returned automatically and review the archived ones.
5. **Document the policy.** Record the Dependabot alerts policy and data residency requirements for the fleet outside GHES.

## What not to claim

- Do not say alerts were deleted. GitHub says they are archived and restorable.
- Do not say Dependabot is being shut down. The change concerns alerts; no version-update or dependency-graph change is announced.
- Do not say every repository is affected. The announcement says most, defines two exceptions, and excludes GHES entirely.
- Do not say an issue or pull request counts as activity. Only push, repository creation, and enabling alerts are listed.
- Do not say reinstalling is required to restore alerts. Any push or settings change is enough.
- Do not call this a security vulnerability. The source is a product behaviour announcement with no CVE or exploit.

## Status

As of November 24, 2026, this change is **verified from GitHub's changelog** and contains no CVE. Verified facts: the December 8, 2026 effective date, the three-item activity definition, alert archival without deletion, automatic restoration on push, two exceptions, github.com/GHE Cloud scope, and the GHES exclusion. Open questions: the exact boundary of "most repositories" is not defined; how long archived alerts are retained is not stated; no separate behaviour is described for Dependabot version updates or the dependency graph; GHE Cloud deployments without data residency are not addressed separately. Headlines such as alerts permanently deleted, Dependabot is shutting down, or GHES is affected are not supported by this record.

## From this series

- [Brotli 2shell: the pip-audit and Dependabot blind spot](/en/blog/broccoli2shell-brotli-acigi)
- [Flowintel CVE-2026-133648](/en/blog/flowintel-tls-cve-2026-133648)
- [Apache Axis 1.x CVE-2026-90436](/en/blog/apache-axis-cve-2026-90436)

## Sources

- [GitHub Changelog: Dependabot alerts will pause on inactive repositories](https://github.blog/changelog/2026-11-10-dependabot-alerts-will-pause-on-inactive-repositories/)
