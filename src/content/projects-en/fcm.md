---
title: 'fcm: control MacBook fan speed from the menu bar'
description: 'MacBook overheating or fans not kicking in? fcm is a lightweight macOS menu bar app to control fan speed on Intel and Apple Silicon Macs.'
pubDate: '2026-09-10'
heroImage: ../../assets/blog-placeholder-3.jpg
tags: ['macos', 'swift', 'smc', 'fan-control', 'menu-bar']
type: project
repo: 'https://github.com/bymfd/fcm'
translationOf: 'fcm'
---

MacBook overheating, fans never spin up, and it shuts down out of nowhere? macOS fan management can be unreliable. `fcm` fixes that.

## Why I built it

I had a 2019 i9 MacBook Pro. Compiling software melted it. Fans would scream at 6000 RPM — or not spin at all. One day it shut down during a video render and I lost SSD data. That was the moment I decided macOS fan control wasn't good enough for me.

I tried other apps (smcFanControl, Macs Fan Control). Good tools, but either too complex or not a clean menu bar fit. I wanted simple, safe, one-time password entry, and a minimal menu bar UI.

## Features

- Live RPM and temperature in the menu bar
- **MAX / MIN / AUTO** modes
- Temperature curve: automatic fan control across 50–88°C
- Custom speed: set any RPM
- All sensors: CPU, RAM, storage, wireless, etc.
- Watchdog: reapplies target speed every 1.5s
- Intel and Apple Silicon support (universal binary)

## Install (no Terminal required)

1. Download `FCM.app` from [Releases](https://github.com/bymfd/fcm/releases)
2. Move it to `/Applications`
3. Open the app
4. Enter your password once — the privileged helper is installed and ready

## Terminal usage

```bash
./scripts/fcm.sh status   # Status
./scripts/fcm.sh max      # Max speed
./scripts/fcm.sh min      # Min speed
./scripts/fcm.sh auto     # Auto
./scripts/fcm.sh set 3000 # 3000 RPM
```

## Technical details

- App runs as a normal user and reads SMC
- Writes go through a root launch daemon (`com.fcm.helper`)
- Communication via FIFO
- On exit it sets fans to MAX (safety measure)

## Warning

You are writing directly to the SMC. If hardware breaks, warranty is void, or your day is ruined — that's on you. Don't leave fans at minimum continuously.

---

**Repo:** [github.com/bymfd/fcm](https://github.com/bymfd/fcm)  
**License:** MIT
