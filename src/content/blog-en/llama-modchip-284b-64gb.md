---
title: 'llama-modchip: run a 284B model on 64 GB RAM without a GPU'
description: 'DeepSeek-V4-Flash 284B won’t fit in 64 GB DDR5? llama-modchip claims 1.71 bpw quantization down to ~56 GB: ~9–14 tok/s, no swap.'
pubDate: '2026-11-09'
heroImage: ../../assets/blog-placeholder-3.jpg
tags: ['llm', 'local-ai', 'deepseek', 'cpu', 'quantization', 'linux']
translationOf: 'llama-modchip-284b-64gb'
---

On November 8, 2026 a Hacker News post scored 412 points: **“Llama-modchip: 284B DeepSeek on 64GB RAM, no GPU.”** On one side a 284-billion-parameter model; on the other a laptop CPU with only 64 GB DDR5. Normally that equation ends in OOM. The project claims it doesn’t.

The claim is intriguing—and unverified. All numbers come from the project’s own README with no independent measurements at the time of writing. Here’s what it says, how it might fit, and where to be cautious.

## What it does

[llama-modchip](https://github.com/synchopate/llama-modchip) is a set of kernel patches, a quantization converter, and runtime tooling on top of `llama.cpp`/`ggml`. The goal: run Mixture-of-Experts (MoE) models entirely in system memory, without a GPU.

The showcase model is **DeepSeek-V4-Flash**: ~284.33B total parameters, ~13.17B active per token, 43 MLA layers and 256 routed experts.

Standard `UD-IQ1_S` quantization reportedly puts the model at **~76.87 GiB**—above usable RAM on a 64 GB Linux machine. llama-modchip claims **~56.56 GiB** for the same model, with process memory around **57.6–58.9 GiB** at 256K context and no swap.

## Caveats

- **Reproducibility:** wait for third-party benchmarks and clear configs.
- **Quality/speed tradeoffs:** extreme quantization can affect accuracy; tok/s varies by CPU, memory bandwidth, and kernels.
- **Security/supply chain:** kernel/runtime patches warrant careful review before use.

If validated, it’s a notable step for CPU-only local inference; until then, treat as promising but experimental.
