---
title: 'GitHub security advisory permissions GA: maintainers need no admin'
description: 'GitHub added four Security permissions to custom repository roles on Nov 20 2026. Coordinated disclosure and private reports can be handled without repo admin; the limits are explicit.'
pubDate: '2026-11-24'
heroImage: ../../assets/github-security-advisory-permissions-hero.jpg
tags: ['security', 'github', 'open-source', 'maintainers', 'advisory', 'supply-chain']
translationOf: 'github-security-advisory-permissions'
---

GitHub made security advisory permissions generally available on November 20, 2026. This is not a CVE or a new vulnerability; it changes who can run coordinated disclosure in open source projects. You can now give a maintainer access to draft advisories, private vulnerability reports, and publishing without making them a repository administrator or an organization-wide security manager. GitHub also states the limits clearly: merging from a temporary private fork still needs an admin or security manager.

## Quick summary

| Field | Value |
|---|---|
| Change | Security advisory permissions GA in custom repository roles |
| Announced | November 20, 2026, GitHub Changelog |
| Permissions | View; Create/Edit/Manage; Accept reports & close/reopen; Publish & request CVEs |
| Scope | Repository security advisories and private vulnerability reports |
| Assignment | To users and teams, only on the repositories they need |
| Plans | Plans supporting custom repository roles, including GitHub Enterprise Cloud |
| Remaining admin work | Temporary private fork merge, fork deletion, write needed for confidential comments |
| Type | Process/product change, not a CVE |

![GitHub security advisory permission flow](/diagrams/github-security-advisory-permissions.svg)

## Technical view

GitHub defines four permissions in a hierarchy. `View security advisories` shows draft advisories, their status, and comments. `Create, Edit, and Manage security advisories` adds creating and editing advisories, commenting, managing collaborators, and creating a temporary private fork. `Accept private vulnerability reports and close or reopen security advisories` requires View or Create/Edit/Manage, then adds report acceptance and reopening. `Publish security advisories and request CVEs` builds on the same base and covers publication and CVE requests.

The practical result is repo-scoped assignment. GitHub recommends assigning the role to users and teams only on the repositories they maintain, so advisory information does not spread across the whole organization. The permissions apply to both repository security advisories and private vulnerability reports. A maintainer can therefore work on their own repository's private reports without holding an organization-wide security manager role.

The boundaries are explicit. Holding one of the new permissions does not allow merging changes from a temporary private fork; that still requires a repository administrator or security manager. People with these permissions cannot delete a temporary private fork. Confidential comments are available only to holders of Create/Edit/Manage who also have write access to the repository. The new roles cover most of disclosure work, but final merge and repository write remain separate grants.

GitHub says the feature is available on plans that support custom repository roles, including GitHub Enterprise Cloud. The announcement gives no GitHub Enterprise Server version, so claiming GHES support either way would go beyond the source. It also does not say CVE requests are automatically approved or that advisories become public automatically; it only grants permission to trigger those actions.

## What to do

1. **Map roles per repository.** List which teams receive private reports and write draft advisories in each repository; review organization-wide grants.
2. **Separate least privilege.** Give most maintainers View + Create/Edit/Manage, give Accept only to report handlers, and reserve Publish and CVE requests for release owners.
3. **Keep an admin path.** Keep at least one repository administrator or security manager for merges from temporary private forks; the new permissions do not replace that.
4. **Remember the confidential-comment rule.** Create/Edit/Manage alone does not show confidential comments; the person also needs write access on the repository.
5. **Remove old grants.** Replace repo admin or organization security manager roles that were only given for advisory work, then revoke them.

## What not to claim

- Do not say every GitHub user can publish advisories. The feature is limited to custom repository roles and supporting plans.
- Do not say admins are no longer needed. Temporary private fork merges and fork deletion still require an admin or security manager.
- Do not say CVE requests are auto-approved. The announcement only grants permission to request.
- Do not say private reports became public. What changed is who can access them; confidentiality remains.
- Do not claim the same behavior in GHES. The source gives no GHES version or date.
- Do not say the organization security manager role was removed. It merely stops being mandatory for this work.

## Status

As of November 24, 2026, this change is **verified from GitHub's own changelog**; it is not a CVE, exploit, or security incident. Verified facts: the November 20, 2026 announcement date, the four new permissions, their dependency rules, user/team repo-scoped assignment, private vulnerability report coverage, the plan note, and the three limits (merge, fork deletion, confidential comments plus write). Open questions: no GitHub Enterprise Server version is given; the full plan matrix is not in the announcement; CVE approval flow and rules for creating advisories without private reports are not described. Headlines such as a new security flaw was found, anyone can publish advisories, or the admin role is gone are not supported by this record.

## From this series

- [OpenShell and CNCF agent security](/en/blog/openshell-cncf-ajan-guvenligi)
- [Open source AI contribution and bans](/en/blog/acik-kaynak-ai-katkisi-yasaklari)
- [Flowintel CVE-2026-133648](/en/blog/flowintel-tls-cve-2026-133648)

## Sources

- [GitHub Changelog: Security advisory permissions are now generally available](https://github.blog/changelog/2026-11-20-security-advisory-permissions-are-now-generally-available)
