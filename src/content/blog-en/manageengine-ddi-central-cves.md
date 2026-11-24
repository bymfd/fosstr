---
title: 'ManageEngine DDI Central: two command injection flaws'
description: 'DDI Central before build 6500 lets IPv6 scope IDs and blocked-domain values reach PowerShell. CVE-2026-95643 and 95645, vendor advisories, NVD status and the absence of KEV evidence.'
pubDate: '2026-11-24'
heroImage: ../../assets/manageengine-ddi-central-cves-hero.jpg
tags: ['security', 'manageengine', 'ddi', 'cve', 'command-injection', 'windows']
translationOf: 'manageengine-ddi-central-cves'
---

ManageEngine published two command injection records for DDI Central on November 18, 2026: CVE-2026-95643 and CVE-2026-95645. Both were fixed in build 6500 on September 17, 2026, two months before the CVE records appeared. The vendor advisories label the severity "High" while the CNA metric is 9.1 Critical; NVD still marks both `Awaiting Analysis` and CISA SSVC says `exploitation: none`. Patching is urgent, but an active-exploitation claim is not supported by these records.

## Quick summary

| Field | Value |
|---|---|
| CVE | CVE-2026-95643 (`/ipam/telnet/`) and CVE-2026-95645 (`clear_blocked_domains`) |
| Product | ManageEngine DDI Central, 6.3.1 / build 6301 and earlier (NVD: before 6500) |
| Fix | Build 6500, September 17, 2026 per vendor |
| Weakness | CWE-78 (OS command injection), secondary CNA classification |
| CVSS v3.1 | Both 9.1 Critical, `AV:N/AC:L/PR:H/UI:N/S:C/C:H/I:H/A:H` — Zohocorp CNA, not an NVD analysis |
| NVD status | Both Awaiting Analysis; no NVD score |
| SSVC (CISA) | Both exploitation: none, automatable: no, technicalImpact: total |
| KEV | Neither CVE is in the CISA KEV JSON (checked November 24) |
| Vendor rating | Advisories say "High"; CNA metric says "Critical" |

![ManageEngine DDI Central command injection chain](/diagrams/manageengine-ddi-central-cves.svg)

## Technical view

CVE-2026-95643 affects DDI Central's `/ipam/telnet/` connectivity feature. Per the vendor advisory, an IPv6 scope identifier (zone identifier) can pass the existing IP validation and be embedded in a PowerShell command executed on a managed Windows node. Insufficient character validation means a crafted value can escape the expected PowerShell string context. The fix validates scope identifiers and rejects unsafe ones, adds an allow-list for command inputs, and converts port values to integers before processing. The vendor says these controls sit at the command execution layer, so every caller of the feature is covered.

CVE-2026-95645 is in the Windows DDI Agent's blocked-domain management, specifically `clear_blocked_domains`. Domain values from the blocking policy were not validated before processing on Windows; crafted input could be interpreted as part of a system command instead of domain data. The fix validates domain values from the JSON payload before processing, rejects invalid requests with an error, and restricts invocation of `clear_blocked_domains` to the DDI Central application server. Agent servers can no longer trigger the function on their own.

The impact is bounded by the privileges of the Windows service account running the command. The vendor classifies both outcomes as RCE, but the NVD vectors say `PR:H`: an authenticated, highly privileged user is required. The advisories phrase this as "an attacker with the ability to invoke the affected functionality" for 95645 and "a user with access to the affected telnet connectivity functionality" for 95643. Neither is a claim of unauthenticated internet access.

Three inconsistencies are worth keeping in view. First, the vendor advisory gives the affected scope as "6.3.1 / build 6301 and below" while NVD says "before 6500." Second, the vendor's security-updates index and the title of the 95643 advisory label that CVE an "unauthenticated GSS-TSIG keytab update in Linux Node Agent," while the detail section on the same page describes PowerShell command injection against a managed Windows node. Third, the vendor advisories say "High" while the Zohocorp CNA metric is 9.1 "Critical"; NVD has both records at `Awaiting Analysis` and has produced no score. The November 24, 2026 KEV JSON check found neither CVE in the catalog.

## What to do

1. **Upgrade the console and agents to build 6500 or later.** The vendor asks for the DDI Central Console and the relevant Node Agent and Windows DDI Agent instances to be updated through the service pack.
2. **Restrict access.** Audit accounts that can use `/ipam/telnet/` and manage blocked-domain policies; remove users who do not need that administration.
3. **Review the Windows service account.** Reduce the privileges of the account running the DDI Agent and telnet operations to limit what injected commands could reach.
4. **Search PowerShell logs.** On managed Windows nodes, look for unusual PowerShell calls, telnet operations carrying IPv6 scope identifiers, and `clear_blocked_domains` use.
5. **Do not wait for KEV.** These CVEs are not listed, but the fix has been available since September 2026; prioritise the patch on that basis.

## What not to claim

- Do not call this unauthenticated RCE. Both vectors say `PR:H`, and the GSS-TSIG title in the vendor index conflicts with the 95643 detail text.
- Do not say exploitation has been observed. SSVC says `exploitation: none`, there is no KEV entry, and the vendor advisories report no misuse.
- Do not say NVD assigned 9.1. It is Zohocorp CNA's secondary metric; NVD is `Awaiting Analysis`.
- Do not add a ransomware claim. There is no such field or record.
- Do not say all ManageEngine products are affected. The advisories cover DDI Central only.
- Do not say code ran on a Linux node. The detail text puts the commands on the managed Windows node.
- Do not turn the vendor's "High" into "not critical." The CNA metric is 9.1 and NVD has not analysed the records yet; the two labels come from different scoring exercises.
- Do not confuse the fix date with disclosure. Build 6500 shipped September 17, 2026; the CVE records appeared November 18.

## Status

As of November 24, 2026, these flaws are **verified through vendor advisories and NVD records, and absent from KEV**. The ManageEngine advisories for CVE-2026-95643 and CVE-2026-95645, the NVD records (`Awaiting Analysis`, CWE-78, Zohocorp CNA CVSS v3.1 9.1, CISA SSVC `exploitation: none`/`automatable: no`/`technicalImpact: total`), and the November 24 KEV JSON check agree. Open questions: the vendor says "build 6301 and below" where NVD says "before 6500"; the 95643 title and detail text describe different flaws; the vendor says "High" while the CNA says "Critical"; NVD has no analysis; there is no field evidence, actor, or affected-organization detail; the exact Windows service account is deployment-specific. Headlines such as actively exploited, unauthenticated RCE, or ransomware confirmed are not supported by these records.

## From this series

- [IBM Guardium CVE-2026-84236](/en/blog/ibm-guardium-cve-2026-84236)
- [VMware vCenter CVE-2026-123890](/en/blog/vmware-vcenter-cve-2026-123890)
- [SonicWall CVE-2026-19868](/en/blog/sonicwall-gen6-cve-2026-19868)

## Sources

- [ManageEngine: CVE-2026-95643 advisory](https://www.manageengine.com/dns-dhcp-ipam/security-updates/cve-2026-95643.html)
- [ManageEngine: CVE-2026-95645 advisory](https://www.manageengine.com/dns-dhcp-ipam/security-updates/cve-2026-95645.html)
- [ManageEngine DDI Central security updates index](https://www.manageengine.com/dns-dhcp-ipam/security-updates/security-updates.html)
- [NVD - CVE-2026-95643](https://nvd.nist.gov/vuln/detail/CVE-2026-95643)
- [NVD - CVE-2026-95645](https://nvd.nist.gov/vuln/detail/CVE-2026-95645)
- [CISA KEV JSON feed (version 2026.11.23)](https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json)
