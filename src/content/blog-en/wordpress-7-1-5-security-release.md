---
title: 'WordPress 7.1.5: 20 security fixes and backports'
description: 'WordPress 7.1.5 security release: 20 fixes, Patchstack secondary analysis, backports through 4.7, and update steps.'
pubDate: '2026-11-26'
heroImage: ../../assets/wordpress-7-1-5-security-release-hero.jpg
tags: ['security', 'wordpress', 'core', 'security-release', 'patchstack']
translationOf: 'wordpress-7-1-5-security-release'
---

As of November 26, 2026, WordPress 7.1.5 is a security release announced by WordPress.org on November 18, 2026. The announcement lists 20 security items; Patchstack's **secondary analysis** published the same day says 18 were added to its database, 2 are hardening changes, and 5 fixes arrived through a Gutenberg package bump. Below are the WordPress.org primary records, the WordPress project security advisory, Patchstack's secondary analysis, and the CISA KEV check; no PoC, payload, victim, or IOC has been invented.

## Quick summary

| Field | Value |
|---|---|
| Version | WordPress 7.1.5 |
| Release date | November 18, 2026 |
| Type | Security release, short cycle |
| Fix count | 20, per the WordPress.org announcement |
| Patchstack database | 18 records, secondary analysis |
| Hardening | 2 changes, secondary analysis |
| Gutenberg | 5 fixes in a package bump, secondary analysis |
| Backports | Through 4.7; 4.6 and earlier unsupported |
| Main chain | Template Part block attributes, admin-browser plugin install, possible RCE |
| Multisite | Site Administrator to Super Admin via Customizer menu previews |
| SQL injection | `WP_Meta_Query` nested relation values and the Customizer front page setting |
| Information exposure | REST search, REST comments, and XML-RPC `wp.getComments` |
| CVE status | No CVE at Patchstack publication; advisory says `No known CVE` |
| KEV | No entry for this release in catalog version 2026.11.25 |
| Next version | 7.2, planned for December 8, 2026 |

![WordPress 7.1.5 security fixes diagram](/diagrams/wordpress-7-1-5-security-release.svg)

## Technical view

The WordPress.org announcement lists 20 items: an unauthenticated Template Part block privilege escalation, Contributor+ XSS variants, XML-RPC pingback denial of service, and REST information exposure. Two are hardening: a malformed regular expression that broadened JSON media type matching, and removal of the block editor's Imgur embed variation because its server-side provider is gone. WordPress.org recommends updating immediately.

The WordPress.org version page repeats the same 20 items and lists patched builds for every affected branch: 7.0.9, 6.9.12, 6.8.13, 6.7.12, 6.6.12, 6.5.15, 6.4.15, 6.3.15, 6.2.16, 6.1.17, 6.0.19, 5.9.21, 5.8.20, 5.7.22, 5.6.24, 5.5.25, 5.4.26, 5.3.28, 5.2.31, 5.1.29, 5.0.32, 4.9.36, 4.8.35, and 4.7.40. Backports were made through 4.7; 4.6 and earlier no longer receive security updates. Only the newest version is actively supported.

Patchstack's **secondary analysis** says 18 of the 20 fixes were added to its database and the remaining 2 are hardening; 5 fixes came from a Gutenberg package bump rather than the core PHP backport. The WordPress.org document says "No package was revised"; according to the secondary analysis, that line covers only the core PHP file list. Exposure checks should include package changes too.

The Template Part block record deserves the most attention. WordPress project advisory GHSA-pmp8-6cv8-q323 says a block's `theme` and `slug` attributes could make an Administrator's editor send requests to another URL on the same site. Author+ can set them in a post, and an unauthenticated attacker can send the Administrator a crafted editor link or redirect. Opening it can create an Administrator account for the attacker, leaving a path to code execution through plugin upload. The advisory says High and `No known CVE`. Patchstack's secondary analysis says the REST path was concatenated from those attributes and the fix adds `isSafeEntityKey()`; no payload is given here.

On multisite, WordPress.org confirms that a site Administrator could take over a Super Admin account via Customizer menu previews. Patchstack's secondary analysis says menu and widget previews used the same hash construction, failing to separate two domains; the boundary matters on multisite.

SQL injection arrives in two records: nested `relation` values in `WP_Meta_Query` and the front page setting in Customizer changeset previews. Patchstack's secondary analysis says the first matters when calling code passes request data into `meta_query`; WordPress.org says the second requires an administrator. The patch adds `sanitize_option()` for previews and `$wpdb->prepare()`.

XSS records span unauthenticated stored shortcode attributes in comments, reflected XSS in the legacy media popup, Contributor+ oEmbed, Comment Date format, and media filenames, plus administrator Customizer previews, Openverse metadata, and the `wp_interactivity_data_wp_context()` namespace. Patchstack's secondary analysis says the comment record needs a Latest Comments block, the reflected record needs a victim click, and the interactivity record needs code that passes untrusted input as the namespace. These are trigger conditions, not payloads.

Information exposure follows the same privilege split: private taxonomy terms via REST search without login, user emails via REST comments for Author+, post and template author assignment via REST for Editor+, and commenter emails and IPs via XML-RPC `wp.getComments` for Subscriber+. Batched XML-RPC pingbacks are the unauthenticated denial-of-service record.

## What to do

1. **Update to 7.1.5.** Use WP Admin > Updates or the WordPress.org download page. Automatic background updates should apply it, but verify the version.
2. **Check your branch.** If you cannot move to the newest version, move to the matching patched release in the WordPress.org document. There is no patch for 4.6 or earlier; move those sites to a supported version.
3. **Review multisite roles.** Audit the site Administrator list and Super Admin assignments. In several records here, the site Administrator is the starting role, not the victim.
4. **Audit Contributor+ accounts.** Six fixes concern what those roles can reach. Remove unnecessary authoring accounts and review block content submitted by editors.
5. **Inspect custom code.** Look for plugin or theme code that passes request data into `meta_query`, and review REST and XML-RPC endpoint exposure. Disable pingbacks if they are not needed; that is not a substitute for the patch.
6. **Check after patching.** Verify the version and review logs from before the patch for new administrator accounts, unexpected plugin installs, unusual REST or XML-RPC traffic, and file changes.

## What not to claim

- Do not say active exploitation was observed. The primary announcement and advisory make no such claim, and there is no KEV entry for this release.
- Do not say Patchstack published 18 CVEs. That number is Patchstack database records; Patchstack says no CVEs had been assigned at publication.
- Do not say there is a CVSS 9.8 score. The advisory says High, but the primary records give no numeric CVSS score for this release.
- Do not say there were no Gutenberg fixes. Five are attributed to the package bump in the secondary analysis; the WordPress.org file list covers only the core PHP tree.
- Do not say 4.6 is safe. It receives no security updates.
- Do not say every flaw is unauthenticated. Several require Administrator, Author+, Editor+, or Contributor+.
- Do not say a PoC or payload was published. The primary records and advisory contain no such material.
- Do not say RCE definitely occurred. WordPress.org says it "could lead to remote code execution"; that is a possibility, not a confirmed outcome.

## Status

As of November 26, 2026, WordPress 7.1.5 is verified through the WordPress.org announcement, the HelpHub version page, and the WordPress project's Template Part advisory. The November 18 announcement lists 20 items; the advisory says High and `No known CVE`. Patchstack's secondary analysis reports 18 database records, 2 hardening changes, and 5 Gutenberg fixes. CISA KEV catalog version 2026.11.25 has no entry matching this release.

The primary records provide no PoC, payload, victim list, campaign name, or IOC. Patchstack's secondary analysis works from the code diff and names no request parameter. This article makes no in-the-wild exploitation claim and produces no numeric CVSS score.

## From this series

- [cPanel WP Toolkit proxy RCE](/en/blog/cpanel-wptk-proxy-rce)
- [Why everything is turning into 2shell](/en/blog/neden-her-sey-2shell-oluyor)
- [CISA BOD 26-04 and SSVC](/en/blog/cisa-bod-26-04-ssvc)

## Sources

- [WordPress.org - WordPress 7.1.5 Release](https://wordpress.org/news/2026/11/wordpress-7-1-5-release/)
- [WordPress.org - Version 7.1.5 HelpHub page](https://wordpress.org/documentation/wordpress-version/version-7-1-5/)
- [WordPress/wordpress-develop - GHSA-pmp8-6cv8-q323](https://github.com/WordPress/wordpress-develop/security/advisories/GHSA-pmp8-6cv8-q323)
- [Patchstack - WordPress 7.1.5 Security Release, secondary analysis](https://patchstack.com/articles/wordpress-7-1-5-security-release/)
- [CISA KEV JSON feed](https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json)
