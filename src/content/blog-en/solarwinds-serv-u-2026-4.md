---
title: 'SolarWinds Serv-U 2026.4: Linux root privilege chain'
description: 'Serv-U 2026.4: 18 SolarWinds CVEs plus 11 third-party CVEs, nine critical, PR:H for CVE-2026-123172 and 123168, Windows CVE-2026-123166, and KEV status.'
pubDate: '2026-11-26'
heroImage: ../../assets/solarwinds-serv-u-2026-4-hero.jpg
tags: ['security', 'solarwinds', 'serv-u', 'cve', 'privilege-escalation', 'nvd']
translationOf: 'solarwinds-serv-u-2026-4'
---

As of November 26, 2026, SolarWinds Serv-U 2026.4 closes 18 SolarWinds CVEs and 11 third-party CVEs in release notes published on November 24, 2026; nine SolarWinds entries are listed as 9.1 Critical. The two records in focus are CVE-2026-123172 and CVE-2026-123168. Both describe elevation to root on Linux installations, carry a vendor CVSS 3.1 score of 9.1, and include `PR:H` in the vector. Vendor impact on Windows is lower. CVE-2026-123166 is a Windows-only command injection. Below are the SolarWinds Trust Center advisories, release notes, NVD API records, and the CISA KEV check; no active exploitation, PoC, or IOC has been invented.

## Quick summary

| Field | Value |
|---|---|
| Version | SolarWinds Serv-U 2026.4 |
| Release date | November 24, 2026, per release notes |
| Affected | Serv-U 2026.3 and below |
| Fixed release | Serv-U 2026.4 |
| Total | 18 SolarWinds CVEs + 11 third-party CVEs; 9 Critical (SolarWinds table), per vendor release notes |
| Focus records | CVE-2026-123172, CVE-2026-123168 |
| Impact | Root elevation on Linux; lower risk on Windows |
| CVSS | 9.1 Critical, secondary CVSS 3.1, source `psirt@solarwinds.com` |
| Vector | `CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:C/C:H/I:H/A:H` |
| Windows vector | `AV:N/AC:L/PR:H/UI:N/S:U/C:L/I:L/A:L` |
| Privileges required | `PR:H`; an already privileged Serv-U context |
| Windows command injection | CVE-2026-123166, 7.2 High, Windows only |
| NVD status | `Undergoing Analysis`; score is secondary |
| SSVC | CISA Coordinator: `exploitation: none`, `automatable: no`, `technicalImpact: total` |
| KEV | No entries for these CVEs in catalog version 2026.11.25 |
| Credit | Intigriti Bug Bounty Program |

![Serv-U 2026.4 privilege escalation diagram](/diagrams/solarwinds-serv-u-2026-4.svg)

## Technical view

SolarWinds' 2026.4 release notes list 18 entries in the SolarWinds CVE table; nine carry a 9.1 Critical line. The table describes CVE-2026-82322 as an IDOR that lets a domain group administrator escalate to server administrator, CVE-2026-123167 as path traversal to files that otherwise require elevated privileges, CVE-2026-82315, 82316, and 82319 as TOCTOU issues, CVE-2026-82320 and 82321 as type confusion issues, and CVE-2026-82317 as a Linux-only stored XSS affecting administrators at 6.8 Medium. These details come from vendor release notes and were not separately verified in NVD records, so they are reproduced here only as the notes state them.

CVE-2026-123172 and CVE-2026-123168 are described in similar terms in their Trust Center advisories. The first says privilege escalation can lead to root on Linux installations; the second says insufficient validation can lead to elevation to the root user on Linux. Both advisories say the risk is lower for Windows installations, list affected products as `Serv-U 2026.3 and below` and the fixed release as `2026.4`, and credit the Intigriti Bug Bounty Program. Both advisories give the Linux vector as `AV:N/AC:L/PR:H/UI:N/S:C/C:H/I:H/A:H` and the Windows vector as `AV:N/AC:L/PR:H/UI:N/S:U/C:L/I:L/A:L`.

`PR:H` is the decisive field. The NVD API records show 9.1 as `Secondary` with source `psirt@solarwinds.com` for both CVEs, and the NVD status is `Undergoing Analysis`. The 9.1 is therefore the vendor's score, not an NVD analytical score. `PR:H` means the attacker is assumed to already hold a high-privilege Serv-U context. Calling this unauthenticated root RCE does not match the records. `S:C` on Linux means the technical effect crosses the Serv-U boundary to the host operating system; on Windows the vector uses `S:U` with low confidentiality, integrity, and availability impact.

CVE-2026-123166 is a separate Windows record. Its advisory says Serv-U fails to properly sanitize user-controlled arguments, which could allow command injection, and that it only affects Windows installations. The vendor lists 7.2 High with `CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:H`. The NVD record carries the same secondary score, shows CWE-78, and confirms the Windows platform. `PR:H` applies here too; presenting this record as the same as the Linux root chains would be wrong.

The NVD SSVC v2.0.3 fields for all three focus CVEs come from a CISA Coordinator source: `exploitation: none`, `automatable: no`, `technicalImpact: total`. That combination says no exploitation evidence is recorded, automation is not supported by the available data, and technical impact is serious. The CISA KEV JSON feed, catalog version 2026.11.25, has no entries for CVE-2026-123172, 123168, 123166, or 82322. The vendor notes also contain no victim list, campaign name, PoC, or IOC.

## What to do

1. **Build the inventory.** Verify the Serv-U version and platform on every server. Move all 2026.3 and earlier installations to 2026.4.
2. **Prioritize Linux.** Linux systems with privileged Serv-U accounts, domain administrators, or service accounts come first; `PR:H` assumes the attacker already holds one of those contexts.
3. **Do not skip Windows.** The Linux root headline overshadows CVE-2026-123166, a Windows-only command injection. Windows installations are fixed in the same release.
4. **Review privileges.** List domain group admin, domain admin, and server admin roles. The IDOR, TOCTOU, and type confusion records in the vendor notes concern the boundaries between those roles.
5. **Check authentication controls.** The release notes also include TOTP brute force, first-factor password brute force, and username enumeration records. Review MFA settings and attempt limits.
6. **Check after patching.** Verify the version and review logs from before the patch for new administrator accounts, unexpected file changes, unusual command execution traces, and Serv-U sessions. No shared IOC exists, so derive evidence from your own environment.

## What not to claim

- Do not say unauthenticated root RCE is available. The vector says `PR:H`; a privileged starting context is required.
- Do not say active exploitation was observed. SSVC says `exploitation: none` and KEV has no entries.
- Do not say NVD confirmed a 9.1 score. The NVD score is `Secondary` and sourced from SolarWinds.
- Do not say the root impact applies to Windows. The vendor gives a `S:U` vector with low impact for Windows.
- Do not say CVE-2026-123166 affects Linux. Its advisory says Windows only.
- Do not say the nine critical records are one flaw. The release notes list separate CVE IDs and mechanisms.
- Do not say NVD verified 82322 and the 823xx family. Those details here come from vendor release notes; NVD was used only for the three focus CVEs.
- Do not say a PoC or IOC was published. The primary records contain no such material.

## Status

As of November 26, 2026, Serv-U 2026.4 is a verified fixed release through the SolarWinds release notes and Trust Center advisories. The release notes list 18 SolarWinds CVEs and 11 third-party CVEs and mark nine SolarWinds entries as Critical. CVE-2026-123172 and CVE-2026-123168 are described in advisories as root elevation on Linux; both affect 2026.3 and below, are fixed in 2026.4, and credit Intigriti. CVE-2026-123166 is a Windows-only command injection in its advisory. The NVD API shows vendor-sourced secondary CVSS metrics and CISA Coordinator SSVC fields for all three records, which remain `Undergoing Analysis`.

The open questions are clear: the primary records provide no exploitation evidence, victim data, campaign name, PoC, or IOC. Mechanism details for 82322 and the 823xx family come from vendor release notes and have not been separately analyzed in NVD. Neither unauthenticated root RCE nor active exploitation is supported by these sources. Patching decisions rest on version, platform, and privilege data.

## From this series

- [CISA BOD 26-04 and SSVC](/en/blog/cisa-bod-26-04-ssvc)
- [WP Rocket CVE-2026-125812](/en/blog/wp-rocket-cve-2026-125812)
- [Why everything is turning into 2shell](/en/blog/neden-her-sey-2shell-oluyor)

## Sources

- [SolarWinds - Serv-U 2026.4 release notes](https://documentation.solarwinds.com/en/success_center/servu/content/release_notes/servu_2026-4_release_notes.htm)
- [SolarWinds Trust Center - CVE-2026-123172](https://www.solarwinds.com/trust-center/security-advisories/CVE-2026-123172)
- [SolarWinds Trust Center - CVE-2026-123168](https://www.solarwinds.com/trust-center/security-advisories/CVE-2026-123168)
- [SolarWinds Trust Center - CVE-2026-123166](https://www.solarwinds.com/trust-center/security-advisories/CVE-2026-123166)
- [NVD API - CVE-2026-123172](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-123172)
- [NVD API - CVE-2026-123168](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-123168)
- [NVD API - CVE-2026-123166](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-123166)
- [CISA KEV JSON feed](https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json)
