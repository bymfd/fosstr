---
title: 'CISA BOD 26-04: SSVC and timelines replace CVSS labels'
description: 'CISA BOD 26-04 implementation guidance replaces CVSS critical/high labels with SSVC, exposure and automatable decision points for FCEB agencies, plus forensic triage.'
pubDate: '2026-11-24'
heroImage: ../../assets/cisa-bod-26-04-ssvc-hero.jpg
tags: ['security', 'cisa', 'bod', 'ssvc', 'vulnerability-management']
translationOf: 'cisa-bod-26-04-ssvc'
---

CISA's BOD 26-04 implementation guidance was published on June 10, 2026 and updated on August 25, 2026. It is not new, but it explains where the "forensic triage Yes" fields and short due dates in recent KEV entries come from. The directive revokes BOD 19-02 and BOD 22-01, removes the FCEB requirement to use CVSS for prioritization, and puts SSVC decision points, asset exposure, and forensic triage steps in its place.

## Quick summary

| Field | Value |
|---|---|
| Source | CISA BOD 26-04 implementation guidance |
| Published / updated | June 10, 2026 / August 25, 2026 |
| Revoked | BOD 19-02 and BOD 22-01; FCEB CVSS requirement |
| New inputs | Publicly exposed, automatable, technical impact, KEV status |
| Worked example | Exposed + total impact + automatable gives a 3-day patch window |
| Forensic triage | 2h scoping; 2-24h evidence; 24-48h analysis; 48-72h decision |
| Scope | FCEB agencies; not binding for the private sector |
| Common misread | "In KEV = actively exploited right now" is not what it says |

![BOD 26-04 SSVC and forensic triage flow](/diagrams/cisa-bod-26-04-ssvc.svg)

## Technical view

The guidance defines "publicly exposed" broadly: an agency-owned or agency-managed asset is exposed if unauthenticated or untrusted entities can reach it over a public network, regardless of physical or logical location. Heuristics for `technical impact: total` include the attacker installing and running arbitrary software, triggering all actions of the vulnerable component, gaining a full-privilege account, or both CVSS confidentiality and integrity impacts being High. For `automatable`, the example is a public proof-of-concept that reliably achieves remote code execution.

The KEV inclusion criteria are listed separately: an assigned CVE ID, reliable evidence of exploitation in the wild, clear remediation or mitigation, and significant risk to U.S. government systems. CISA explicitly says that addition to KEV does not mean active exploitation is currently observed, that a PoC is not required, and that old or end-of-life products can be added. That matters because short due dates do not by themselves signal a new wave of attacks.

Timelines are derived from SSVC inputs and asset context rather than a single CVSS score. In CISA's worked example, a publicly exposed asset with total technical impact and automatable exploitation maps to a 3-day patching deadline. The final exposure decision is made by the agency asset by asset; CISA calculates the KEV catalog due date from the data it has.

Forensic triage has six steps. Scoping has a target of the first two hours after a KEV addition; preserving volatile evidence and critical patching sit at 2-24 hours; containment at 6-24 hours; evidence analysis at 24-48 hours; the escalation report at 48-72 hours. CISA labels these timelines recommended best practice, not the requirement; what is required is an adequate triage analysis. Sequence matters: collect evidence before patching where possible, because premature containment can destroy evidence, and containment should not alert the threat actor.

The guidance defines three outcomes: no evidence of compromise, confirmed compromise, and suspected compromise. No evidence means heightened monitoring and normal remediation; confirmed means reporting through the CISA Incident Reporting System and moving to full incident response; suspected means continuing IOC and anomaly work. Cloud responsibility is split: on-premises and IaaS leave full responsibility with the agency; for PaaS the agency handles security oversight, identity, operations, guest OS/data/content, and audit logging while the CSP handles network security; for SaaS the CSP covers web application security, identity, operations, and network protection, while the agency retains access and authentication, guest OS/data/content, and audit logging.

## What to do

1. **Rebuild the priority queue.** In FCEB-scoped teams, prioritise with SSVC decision points, exposure, and asset criticality instead of a CVSS score alone.
2. **Write a triage plan.** Define who collects evidence, which out-of-band channel is used, and who makes the escalation decision before a KEV notification arrives.
3. **Collect evidence before patching.** Capture volatile data such as memory, cache, registry, and in-transit state first; document any evidence loss caused by patching.
4. **Update exposure tags in CDM.** Report public IPs and domains quarterly or on CISA request, and do not block cyber hygiene scanning traffic.
5. **Review cloud SLAs.** FedRAMP will require VDR and VER rules by December 7, 2026; reflect the responsibility split in contracts.

## What not to claim

- Do not say KEV entry means active exploitation right now. The guidance says the opposite; historical reliable evidence also qualifies.
- Do not say a KEV entry requires a public PoC. It does not.
- Do not say patch the CVSS 9.8 first. The directive removes the CVSS requirement; a base score is not a risk decision on its own.
- Do not call this a legal deadline for the private sector. BOD 26-04 targets FCEB agencies; other organizations can use it as guidance.
- Do not say patch first, collect evidence later. The guidance asks for evidence collection first where possible; early containment can destroy evidence.
- Do not treat every outcome as confirmed. There are three categories: no evidence, confirmed, and suspected.
- Do not say the cloud is entirely the CSP's job. Even in SaaS, access, guest OS/data, and audit logging stay with the agency.

## Status

As of November 24, 2026, this guidance is **verified from CISA's own site**; it is not a CVE but an implementation guide for FCEB agencies. Publication was June 10, 2026 and the update August 25, 2026. Verified facts: revocation of BOD 19-02 and 22-01, removal of the CVSS requirement, SSVC decision-point heuristics, KEV inclusion criteria, the 3-day worked example, six forensic triage steps with three outcomes, cloud responsibility split, and the FedRAMP December 7, 2026 date. Open questions: the full remediation timeline table is not summarized on this page; agency-specific risk decisions and HVA exceptions remain local; CISA labels the timelines advisory rather than mandatory. Headlines such as KEV means active exploitation, CVSS will no longer be used, or a legal 3-day deadline for everyone are not supported by this record.

## From this series

- [SonicWall CVE-2026-19868](/en/blog/sonicwall-gen6-cve-2026-19868)
- [VMware vCenter CVE-2026-123890](/en/blog/vmware-vcenter-cve-2026-123890)
- [N-able MailAssure CVE-2026-134624](/en/blog/nable-mailassure-cve-2026-134624)

## Sources

- [CISA: BOD 26-04 Implementation Guidance for Prioritizing Security Updates Based on Risk](https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk)
