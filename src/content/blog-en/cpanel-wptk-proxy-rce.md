---
title: 'cPanel WP Toolkit proxy flaw: unauthenticated RCE and patched builds'
description: 'A cPanel & WHM WP Toolkit proxy flaw allows unauthenticated remote code execution: affected builds, patches, and the temporary wptk.proxypass mitigation.'
pubDate: '2026-11-19'
heroImage: ../../assets/cpanel-wptk-proxy-hero.jpg
tags: ['security', 'cpanel', 'wordpress', 'rce', 'open-source']
translationOf: 'cpanel-wptk-proxy-rce'
---

On the evening of November 18, 2026, cPanel published a WP Toolkit proxy vulnerability affecting all supported cPanel & WHM versions. The advisory is short, but the impact line is clear: successful exploitation can lead to **unauthenticated remote code execution (RCE)** and takeover of the server. As of November 19, cPanel has not published a CVE ID, CVSS score, technical root cause, or exploitation status. Everything below is limited to verified facts.

## Quick summary

| Field | Value |
|---|---|
| Published | November 18, 2026, cPanel Security |
| CVE / CVSS | Not published yet |
| Impact | Unauthenticated RCE; server takeover |
| Surface | cPanel & WHM WP Toolkit proxy (`wptk.proxypass`) |
| Affected | All supported cPanel & WHM versions |
| Fixed | 110.0.159+, 134.0.72+, 136.0.52+, 138.0.25+; WP2 138.1.19 |
| Mitigation | Disable WP Toolkit proxying |
| Exploitation | Not stated in the cPanel advisory |

![cPanel WP Toolkit proxy RCE](/diagrams/cpanel-wptk-proxy.svg)

## What we know, and what we do not

The cPanel advisory only says a security issue was found in the cPanel WP Toolkit proxy. It gives no technical details beyond patched builds and a workaround. There is no basis right now to claim an exploit chain, a CWE class, or a specific attack precondition.

The concrete point is the location: cPanel's WP Toolkit proxy layer, which bridges WordPress security settings in wp-admin to panel-side operations. Earlier WP Toolkit advisories — CVE-2026-47365 in June 2026, CVE-2026-87899/CVE-2026-87900 in September, and CVE-2026-93699 in October — mostly involved an authenticated account crossing into another customer's account. This advisory says **unauthenticated** and describes server control as the impact. There is no evidence that the root cause is the same; the repeated WP Toolkit proxy surface is still a good reason not to delay the patch.

## Affected and fixed builds

| Product | Affected | Fixed |
|---|---|---|
| cPanel & WHM 110 | All supported 110.x builds | 110.0.159 or later |
| cPanel & WHM 134 | All supported 134.x builds | 134.0.72 or later |
| cPanel & WHM 136 | All supported 136.x builds | 136.0.52 or later |
| cPanel & WHM 138 | All supported 138.x builds | 138.0.25 or later |
| WP Squared | Unpatched builds | 138.1.19 |

"All Supported Versions" means every supported branch is in scope. End-of-life branches get no fix; moving to a supported release is the only real answer there.

## What to do now

Check the installed build first:

```bash
/usr/local/cpanel/cpanel -V
```

Then use **Upgrade to Latest Version** in WHM, or update over SSH:

```bash
/usr/local/cpanel/scripts/upcp --force
```

Check `cpanel -V` again after the update. "Automatic updates are on" is not enough, especially on servers pinned to a version or with updates disabled. If you use WP Squared, verify 138.1.19 separately.

## Temporary mitigation until patching

If you cannot patch immediately, cPanel recommends disabling the WP Toolkit proxy. The command from the advisory is:

```bash
/usr/local/cpanel/3rdparty/bin/perl -MCpanel::Leika -e 'Cpanel::Leika::set_leika_override("wptk.proxypass", "false")'
```

This disables full management of **WordPress Security Settings** from wp-admin in WP Toolkit. According to cPanel, it does not affect the sites themselves, cPanel or WHM, or WP Toolkit interfaces inside cPanel. It is still a temporary workaround: review proxy behavior after patching and do not treat the override as permanent configuration.

## Why it matters

On shared hosting, cPanel is a control plane with reach beyond any single customer account. An unauthenticated RCE claim means the attacker may not even need a stolen cPanel password. With no technical details published yet, the right response is fast inventory and patching: where WP Toolkit proxying is enabled, which builds are fixed, and whether those surfaces are reachable from the internet.

cPanel published no IOCs for servers exposed before patching. Even so, review unusual processes, new cron entries, SSH keys, cPanel hooks, and WP Toolkit activity logs; rotate panel and database credentials if anything looks wrong.

## Sources

- [cPanel: Security — Vulnerability in cPanel & WHM's WP Toolkit Proxy - November 18, 2026](https://support.cpanel.net/hc/en-us/articles/45133380394135-Security-Vulnerability-in-cPanel-WHM-s-WP-Toolkit-Proxy-November-18-2026)
- [cPanel: How do I update cPanel/WHM?](https://support.cpanel.net/hc/en-us/articles/1500004959421-How-do-I-update-cPanel-WHM)
