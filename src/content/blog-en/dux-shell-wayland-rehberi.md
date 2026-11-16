---
title: 'Dux Shell: unify a fragmented Wayland setup into one package'
description: 'Tired of assembling panel, launcher, lock screen, and notifications piece by piece on Wayland? A Dux Shell guide: setup with niri, Hyprland, and Sway, v2.1 highlights, pros and cons.'
pubDate: '2026-11-09'
heroImage: ../../assets/blog-placeholder-4.jpg
tags: ['linux', 'wayland', 'arch', 'desktop', 'open-source']
translationOf: 'dux-shell-wayland-rehberi'
---

Linux desktops have long been an art of building a desktop from parts. Moving to Wayland multiplied the pieces: Waybar for panels, Rofi/Fuzzel for launchers, Mako for notifications, swaylock for locking, swayidle for idle, separate tools for theming and wallpapers. Each works, but none is aware of the others.

**Dux Shell** aims to bundle that sprawl into a single package. Renamed from DankMaterialShell in October 2026, the project released **2.1 “Stormborn”** on November 4, 2026. There’s little Turkish coverage; this post explains what it is and how to install it on Arch Linux.

## What is Dux Shell?

[Dux Shell](https://duxlabs.dev/) is a desktop shell that runs on top of Wayland compositors. It takes on a role similar to GNOME Shell or KDE Plasma: app launching, window/session UX, notifications, system tray, audio, network, Bluetooth, brightness, wallpaper, and lock screen.

Technically it consists of two parts:

- A QML interface built with **Quickshell**
- A **Go** backend (`dms`)

## Who is it for?

- Users of tiling/Wayland compositors (niri, Hyprland, Sway) who want an integrated layer without adopting a full DE.
- People who prefer a cohesive look/behavior over mixing many independent utilities.

## Install (Arch-focused)

Check the official docs for current packages and dependencies. Typical flow: install Quickshell/runtime deps, install Dux Shell packages, then enable/start components per compositor session.

## v2.1 notes, strengths, weaknesses

**Strengths:** unified UX, fewer moving parts to theme/configure, active development.  
**Tradeoffs:** another abstraction layer, compositor-specific quirks, and you inherit the project’s opinions and release cadence.

## Bottom line

If your Wayland setup feels like a toolbox explosion, Dux Shell is worth a try. If you already have a minimal, stable stack you like, the consolidation benefit may not outweigh the switch.
