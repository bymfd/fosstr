---
title: 'Cyberleek, GTA 6 and Leonida: from leak to static recompilation'
description: 'Cyberleek 209 GB Xbox build and exe claims, the Leonida static recompilation project, RDNA2 SPIR-V and D3D12 Vulkan progress as of Nov 24 2026.'
pubDate: '2026-11-24'
heroImage: ../../assets/cyberleek-gta6-leonida-hero.jpg
tags: ['security', 'gta6', 'reverse-engineering', 'vulkan', 'open-source']
translationOf: 'cyberleek-gta6-leonida'
---

"Cyberleek", "cyberleek gta 6" and "leonida" searches are rising around one story: Cyberleek's claim to have leaked the GTA 6 Xbox build, and the open-source Leonida project aiming to run those files on Windows. This is not a CVE. It is the intersection of a leak economy, static recompilation, and malicious "ready PC port" downloads. There are no download links below, only the technical state that can be verified.

## Quick summary

| Field | Value |
|---|---|
| Subject | Cyberleek leak + Leonida static recompilation |
| Nov 19 | Cyberleek claims a 209 GB Xbox build; exe withheld |
| Nov 20 | Leonida appears on GitHub; no game, keys, or executable |
| Nov 23 | Exe published; 15M to 6M token threshold claims not reached |
| Nov 24 | Project and Discord taken offline; reason unconfirmed |
| Technical route | Native x86-64, GDK/XMem shims, RDNA2 to SPIR-V, D3D12 to Vulkan |
| Shader status | 26,503 / 26,503 shaders pass `spirv-val`; no rendered frame |
| Boot status | First attempts reach a black screen, audio stops |
| Main risk | Leaked files, malware, copyright and token incentives |

![Cyberleek leak to Leonida boot attempt](/diagrams/cyberleek-gta6-leonida.svg)

## Technical view

Cyberleek has been posting GTA 6 gameplay clips since August 2026; PC Gamer reports that some carried QR codes and CYBERLEEK promotion. Eurogamer's November 19 record describes the site claiming a "November 2026 build" and a 209 GB download, with the executable held back and tied to a token threshold. Eurogamer could not verify that the files exist. IT-Connect reports that vx-underground inspected the torrent and said it contains real GTA 6 files; that is a second-hand account and says nothing about safety.

The token is part of the technical story, not a side note. Cyberleek published a roadmap tying leaks to the market cap of a Solana memecoin. PC Gamer says the coin peaked near $23 million in late August and then collapsed, while IT-Connect reports roughly $250,000 in transaction fees. Read alongside Eurogamer's "at least £200,000" estimate, there is no single verified financial figure; what is verified is the incentive structure.

Leonida appeared on GitHub on November 20, 2026. The README is explicit: this is a **static recompilation** project intended to run the Xbox Series build natively on Windows, not an emulator. Because the Xbox Series CPU is x86-64, the game code is loaded directly while console system software is rebuilt as shims. GDK, XMem, and Xbox D3D12 imports are mapped to PC implementations; the repository contains no game files, keys, or executable and describes no protection bypass.

Graphics is the largest piece. The console's compiled RDNA2 GPU programs are translated to SPIR-V with LLVM's AMDGPU disassembler. PCGH's November 24 table says all 26,503 shaders pass `spirv-val`; that establishes formal validity, not correct rendering. The D3D12-to-Vulkan layer has working devices, queues, command lists, fences, descriptor heaps, resources, views, and copies, while mesh draws, indirect draws, stream output, pipelines/swapchain, and ray-tracing BVH serialization remain open. 23,841 shaders use Wave64; Radeon maps that directly, while some shader classes run only approximately on GeForce and Intel.

Boot has not reached a playable state. The README says the PE loader has only been tested end to end with a stand-in executable. PCGH reports that the first runs with the real executable reached a black screen before audio stopped; a single X post claiming the prologue started has no verifiable detail. In an update at 02:30 on November 24, PCGH reported that the GitHub repository and Discord were taken offline following the lead developer's announcement. The reason is unknown, and a DMCA claim is not verified here.

PCGH counted 10,958 commits and roughly 32,400 stars within three days, with Claude listed among contributors. The project's `AGENTS.md` rules forbid game data and protection bypasses and require AI usage plus GPU/test details in each pull request. A high commit rate is therefore not a measure of playability. The executable's password-protected ZIP and SHA-256 checksums carry the same trap: a hash proves a file matches a published digest, not that its source is trustworthy or the file is clean.

## What to do

1. **Follow official channels only.** Leonida has published no installer, ready-made exe, or "GTA 6 PC setup"; especially while the project is offline.
2. **Do not treat hashes as safety.** SHA-256 is an integrity check, not malware scanning or provenance verification.
3. **Separate claims from state.** "26,503 shaders passed" and "GTA 6 runs on PC" are different statements; a Vulkan graphics layer and rendered output sit between them.
4. **Do not run leaked files.** Avoid unknown archives; if one was executed, isolate the device and scan it.
5. **Keep code review bounded.** README, design notes, and open issues are technical sources; game files, keys, and cracked copies are not.
6. **Wait for an official PC release.** Rockstar and Take-Two have not announced a date in these records; "playable within a week" is Cyberleek's claim, not a verification.

## What not to claim

- Do not say GTA 6 is playable on PC; the records show a black screen and stopped audio.
- Do not call Leonida an emulator; it is a static recompilation project.
- Do not say passing `spirv-val` guarantees an image; it only validates shader form.
- Do not say a matching hash means a file is safe; it only matches a published digest.
- Do not say the takedown proves DMCA; the reason is unconfirmed.
- Do not present Cyberleek as a consumer hero; the event is tied to token incentives and promotion.
- Do not say the repository contains the game or the executable; the README says it does not.
- Do not share a ready port link; those downloads carry malware and copyright risk.

## Status

As of November 24, 2026, this is not a CVE; the record tracks Cyberleek's leak claims alongside Leonida's open-source work. Verified facts: the November 19 209 GB build claim and withheld exe, the November 23 executable release, Leonida's November 20 GitHub publication, the README statement that no game, keys, or executable are included, 26,503 shaders translated to SPIR-V with formal validation, open pieces in the D3D12-to-Vulkan layer, first boot attempts reaching a black screen, and the November 24 repository/Discord shutdown. Open questions: the shutdown reason, end-to-end provenance of the files, the executable's origin, any future official PC date, and exact financial gains. Rockstar and Take-Two made no statement in these records; DMCA confirmed, port finished, or exact coin profit headlines are not supported.

## From this series

- [Windows 11 lock screen bypass via Narrator](/en/blog/windows-fastunlock-narrator)
- [Malware embedded in the Rank Math SEO plugin](/en/blog/herkes-phpye-dalmisken)
- [OpenShell: policy-gated agent runtime](/en/blog/openshell-cncf-ajan-guvenligi)

## Sources

- [GitHub: ItsNotRexed/Leonida README](https://github.com/ItsNotRexed/Leonida)
- [GitHub: Leonida docs/design.md](https://github.com/ItsNotRexed/Leonida/blob/main/docs/design.md)
- [GitHub: Leonida docs/d3d12_vulkan.md](https://github.com/ItsNotRexed/Leonida/blob/main/docs/d3d12_vulkan.md)
- [GitHub: Leonida issue #313, D3D12 to Vulkan critical path](https://github.com/ItsNotRexed/Leonida/issues/313)
- [PC Games Hardware: Leonida after the exe leak, Nov 24 2026](https://www.pcgameshardware.de/GTA-6-Spiel-55239/News/PC-Port-Leonida-KI-Exe-Leak-Xbox-1560883/)
- [Eurogamer: CyberLeek claims a full development build, Nov 19 2026](https://www.eurogamer.net/cyberleek-gta-6-dev-build)
- [IT-Connect: Leonida recompiles the leaked Xbox build, Nov 23 2026](https://www.it-connect.tech/gta-6-on-pc-leonida-tries-to-recompile-the-leaked-xbox-build/)
- [PC Gamer: Who is Cyberleek?, Aug 20 2026](https://www.pcgamer.com/games/grand-theft-auto/who-is-cyberleek-what-we-know-about-the-gta-6-leaker)
