---
title: 'EnterpriseDB PEM: three agent privilege flaws'
description: 'Postgres Enterprise Manager flaws before 10.6.1 in CVE-2026-132658, CVE-2026-132659 and CVE-2026-132660. EDB advisories, CVSS source, and NVD status.'
pubDate: '2026-11-22'
heroImage: ../../assets/edb-pem-agent-cves-hero.jpg
tags: ['security', 'enterprisedb', 'postgres', 'pem', 'cve', 'privilege-escalation']
translationOf: 'edb-pem-agent-cves'
---

EnterpriseDB published three Postgres Enterprise Manager (PEM) advisories on November 19, 2026. The NVD records were created on November 20 and are still `Received`. All three are fixed in 10.6.1, but the 9.4 CVSS scores belong to EDB, not to an NVD analysis.

## Quick summary

| Field | Value |
|---|---|
| CVE | CVE-2026-132658, CVE-2026-132659, CVE-2026-132660 |
| Product | Postgres Enterprise Manager (PEM), before 10.6.1 |
| Weaknesses | CWE-269 (improper privilege management), CWE-863 (incorrect authorization), CWE-426 (untrusted search path) |
| CVSS v4.0 | 9.4 Critical — all three from EDB CNA; no CVSS v3.1 record at NVD |
| NVD status | All three Received (analysis not complete) |
| SSVC (CISA Coordinator) | exploitation: none, automatable: no, technicalImpact: total |
| CISA KEV | These three CVEs are not in the KEV catalog |
| Fix | PEM 10.6.1 or later |

![EnterpriseDB PEM agent privilege chain](/diagrams/edb-pem-agent-cves.svg)

## Technical view

**CVE-2026-132658 — file access.** The `pem_agent` role, inherited by every PEM agent login, is a member of `pg_read_server_files` and `pg_write_server_files` on the PEM backend database. An attacker controlling any monitored host, and therefore its agent certificate, can read and write files on the PEM server host as the `postgres` OS user. That includes the PEM CA key, which allows issuing certificates for other agents. Affected: 10.5.0 and later before 10.6.1.

**CVE-2026-132659 — job boundary.** Row-level security policies on `pem.job` and `pem.jobstep` do not restrict an agent to its own jobs. An attacker controlling one monitored host can create, change, or delete jobs for every other agent, including the agent on the PEM server. SQL job steps run with the monitored server's database credentials, and shell job steps run when batch jobs are enabled. EDB states that compromising one host can grant superuser SQL access to every monitored database and to the PEM backend. Affected: 7.3.0 and later before 10.6.1.

**CVE-2026-132660 — search path.** Several `SECURITY DEFINER` functions in the `pem` schema are owned by a superuser and do not set a safe `search_path`. Any PEM user able to connect to the backend database can create objects that shadow the intended ones and run arbitrary SQL with superuser privileges. Temporary objects work on every supported PostgreSQL version; `public` schema objects work on PostgreSQL 14 backends and backends upgraded from 14. Affected: 7.6.0 and later before 10.6.1.

All three advisories credit kta1kri via the EDB vulnerability disclosure program.

## What to do

1. **Upgrade to 10.6.1.** All three advisories name 10.6.1 as the first fixed release. PEM 9.8 gets no fix; 9.x users must move to 10.6.1 or later.
2. **Protect agent certificates.** Until you upgrade, protect the agent certificate and key on every monitored host and limit root access to trusted administrators; this is EDB's stated mitigation.
3. **Keep shell job steps off where unneeded.** For CVE-2026-132659, EDB recommends disabling batch (shell) job steps on agents that do not need them.
4. **Restrict backend access.** For CVE-2026-132660, limit hosts that can connect to the backend database in `pg_hba.conf` and run `REVOKE CREATE ON SCHEMA public FROM PUBLIC`. EDB explicitly notes this does not close the temporary-object path and does not replace upgrading.
5. **Reissue certificates if compromise is suspected.** EDB warns that upgrading does not undo earlier file access and asks for reissuing the CA and all agent certificates if a monitored host was compromised.

## What not to claim

- Do not say NVD assigned 9.4. The score is EDB's CVSS v4.0; the NVD records are Received with no v3.1 analysis.
- Do not say these are actively exploited or in KEV. All three are absent from KEV and SSVC says `exploitation: none`. That is not proof that exploitation is impossible.
- Do not stop at "10.6.1 fixes everything." EDB separately requires certificate reissuance where compromise is suspected.
- Do not treat `REVOKE CREATE ON SCHEMA public FROM PUBLIC` as a complete fix; the temporary-object path remains.
- Do not add port, attack-surface, or PoC details that the primary advisories do not contain.

## Status

As of November 22, 2026, these three flaws are **verified by vendor advisories with fixes published, but NVD analysis is incomplete**. The NVD records are Received; the 9.4 scores and vectors come from EDB, and the SSVC fields come from the CISA Coordinator. The three CVEs are not in CISA KEV, and no primary record contains exploitation evidence or a PoC. Open questions: no independent NVD score yet, and the advisories give no network port or remote attack-surface detail. Headlines claiming PEM servers were compromised or ransomware was confirmed are not supported by these records.

## From this series

- [IBM Guardium CVE-2026-84236](/en/blog/ibm-guardium-cve-2026-84236)
- [VMware vCenter CVE-2026-123890](/en/blog/vmware-vcenter-cve-2026-123890)
- [Apache Axis CVE-2026-90436](/en/blog/apache-axis-cve-2026-90436)

## Sources

- [EDB advisory CVE-2026-132658](https://www.enterprisedb.com/docs/security/advisories/cve2026132658/)
- [EDB advisory CVE-2026-132659](https://www.enterprisedb.com/docs/security/advisories/cve2026132659/)
- [EDB advisory CVE-2026-132660](https://www.enterprisedb.com/docs/security/advisories/cve2026132660/)
- [NVD - CVE-2026-132658](https://nvd.nist.gov/vuln/detail/CVE-2026-132658)
- [NVD - CVE-2026-132659](https://nvd.nist.gov/vuln/detail/CVE-2026-132659)
- [NVD - CVE-2026-132660](https://nvd.nist.gov/vuln/detail/CVE-2026-132660)
- [CISA KEV catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)
