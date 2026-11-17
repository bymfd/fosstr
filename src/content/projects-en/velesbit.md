---
title: 'velesbit: an automatic bicycle transmission that shifts for you'
description: 'Arduino-based automatic bicycle gearbox. Reads speed and cadence and shifts gears on its own — so you don’t forget to shift on climbs or in traffic.'
pubDate: '2026-09-10'
heroImage: ../../assets/velesbit-flow-hero.jpg
tags: ['arduino', 'bicycle', 'mechatronics', 'diy']
type: project
repo: 'https://github.com/bymfd/velesbit'
translationOf: 'velesbit'
---

If you ride a bike you know the routine: shift on climbs, brake on descents, balance in turns. What if the bike did the shifting for you?

## Why I built it

Commuting by bike in Istanbul, I climbed from Kadıköy to Fenerbahçe every day. Shifting was annoying enough that I thought, "can software do this?" Then I added: if the bike decides, human error goes away. When your attention drifts in traffic, you forget to shift — an automatic system solves that.

## What it is

`velesbit` is an Arduino-based automatic transmission project compatible with existing cable-driven gear systems. It shifts automatically based on speed and RPM.

## Versions

- **Alpha 3:** 2x16 LCD, button controls
- **Alpha 6:** 0.96" OLED, more compact design

![velesbit sensor to gear-shift flow](/diagrams/velesbit-flow.svg)

## How it works

1. Sensors read speed and RPM
2. Arduino computes the right gear
3. A servo motor pulls the cable to shift

## Compatibility

Works with all cable-driven gear systems (Shimano, SRAM, etc.). A mechanical module mounts to your bike.

## Notes

Also shared on Hackaday.io, the project was designed to draw inspiration from the open-source community. 3D-printed parts, Arduino code, bike power — a full DIY build.

---

**Repo:** [github.com/bymfd/velesbit](https://github.com/bymfd/velesbit)  
**Hackaday:** [hackaday.io/project/166291](https://hackaday.io/project/166291-automatic-transmission-system-for-bicycles)  
**License:** MIT
