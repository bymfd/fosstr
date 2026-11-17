---
title: 'OpenShell: NVIDIA’s agent sandbox moves to the CNCF'
description: 'NVIDIA donated OpenShell—policy-constrained runtime for autonomous AI agents—to the CNCF Sandbox. Kernel-level isolation, Cedar policies, and setup overview.'
pubDate: '2026-11-11'
heroImage: ../../assets/openshell-policy-hero.jpg
tags: ['ai', 'agents', 'cncf', 'kubernetes', 'security', 'nvidia', 'open-source']
translationOf: 'openshell-cncf-ajan-guvenligi'
---

AI agents no longer just chat; they read files, install packages, call APIs, and run shell commands. Those capabilities are valuable—and dangerous when a mistake or prompt injection occurs. The credentials you give an agent, the files it can reach, and the networks it can talk to define your security boundary.

On November 10, 2026 at KubeCon + CloudNativeCon North America, NVIDIA announced it donated **OpenShell** to the Cloud Native Computing Foundation (CNCF). The project was accepted at **Sandbox** level. This post covers what OpenShell does, how it’s set up, and what to trust—and not trust.

## What is OpenShell?

[OpenShell](https://github.com/NVIDIA/OpenShell) is infrastructure for running autonomous AI agents in a secure, policy-controlled runtime. It doesn’t change the agent; it controls the environment around it.

Core idea: the agent shouldn’t directly access the filesystem, network, or credentials. Instead it runs in an isolated sandbox where file access, syscalls, and network connections pass through policy checks. The agent never sees real secrets; OpenShell injects credentials only into approved requests to approved endpoints.

![OpenShell policy-gated agent runtime](/diagrams/openshell-policy.svg)

## Defense layers

- **Isolation:** sandbox boundaries (containers/namespaces/seccomp-like controls depending on configuration).
- **Policy:** fine-grained allow/deny rules (e.g., Cedar-style policies) for actions and egress.

## Practical notes

- Evaluate fit for your threat model (prompt injection, tool abuse, data exfiltration).
- Keep policies minimal and auditable; log decisions.
- Sandbox is not a substitute for secure agent design and secret hygiene.

Moving to CNCF can broaden governance and adoption—useful for teams standardizing agent runtimes in cloud-native stacks.
