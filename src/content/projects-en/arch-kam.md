---
title: 'arch-kam: run hibernate, bootloader and cleanup tasks on Arch Linux with one command'
description: 'Tired of repeating swap, GRUB, mkinitcpio and TLP setup? arch-kam bundles recurring Arch maintenance tasks into a single, menu-driven bash toolkit.'
pubDate: '2026-09-10'
updatedDate: '2026-10-26'
heroImage: ../../assets/arch-kam-menu-hero.jpg
tags: ['linux', 'arch', 'bash', 'automation']
type: project
repo: 'https://github.com/bymfd/arch-kam'
translationOf: 'arch-kam'
---

Anyone who uses Arch Linux knows the drill: you install and configure everything yourself. That's great, until the same repetitive jobs start eating time. `arch-kam` exists for exactly that point.

## Why I built it

Over the years I installed, wiped and reinstalled Arch many times. Every time the same steps: create swap, edit GRUB, add mkinitcpio hooks, set up TLP, change the bootloader theme. Hibernate setup was the breaking point for me — once it failed to boot on BTRFS. After that I started scripting it so it would not happen again.

## What it is

`arch-kam` is a set of bash scripts for Arch-based distributions. "Kam" means "shaman" in old Turkic — and the project leans into that: it "heals" the system, "banishes bad spirits", and restores balance.

![arch-kam menu options](/diagrams/arch-kam-menu.svg)

## Rituals

### Menu: `arch-kam.sh`

Run all rituals from a single menu:

```bash
sudo ./arch-kam.sh
```

Or call a ritual directly:

```bash
sudo ./arch-kam.sh doctor
sudo ./arch-kam.sh hibernate --size 32768
sudo ./arch-kam.sh battery
sudo ./arch-kam.sh boot
sudo ./arch-kam.sh clean --dry-run
```

### 1. Hibernate Enabler

Creates a swap file and configures GRUB or systemd-boot and mkinitcpio hooks. Supports BTRFS and EXT4. Default swap size is RAM + 2 GB (overridable with `--size`). It refuses to overwrite an existing swap file without `--force`, checks disk space and RAM, and places the `resume` hook after `block`/`udev` and before `filesystems`. It backs up before making changes.

```bash
sudo ./hibernate-enabler.sh
sudo ./hibernate-enabler.sh --size 32768
sudo ./hibernate-enabler.sh --force
sudo ./hibernate-enabler.sh --restore
```

`--restore` removes resume parameters, the hook and the swap file.

### 2. ARKUN: Battery optimization

Installs and manages TLP to extend battery life. Install, remove, status and charge-threshold controls live in one menu. If `power-profiles-daemon` is running it detects the conflict and offers to disable it.

```bash
sudo ./battery.sh
```

Charge thresholds are written to `/etc/tlp.d/99-arch-kam.conf`; not supported on every device (check with `tlp-stat -b`).

### 3. TIN: Bootloader background

Sets a custom GRUB background image. PNG is used directly; JPG is converted if ImageMagick is available. Can also set a pure black background. systemd-boot does not support background images, so this ritual only works with GRUB.

```bash
sudo ./bootloader-bg.sh
```

### 4. Doctor

Read-only diagnostics. Reports distro, bootloader, root filesystem, disk space, swap/zram, hibernate support, `resume` parameters, mkinitcpio hook order, TLP conflicts, failed systemd units and orphan packages. No root required and it changes nothing.

```bash
./doctor.sh
```

### 5. Clean

Cleans the package cache with `paccache`, trims the journal to 14 days, lists/removes orphan packages and runs `systemd-tmpfiles --clean`. Use `--dry-run` first to see what will happen.

```bash
sudo ./clean.sh --dry-run
sudo ./clean.sh
```

## Install

```bash
git clone https://github.com/bymfd/arch-kam.git
cd arch-kam
chmod +x *.sh
sudo ./arch-kam.sh
```

## Requirements

- Arch-based distro (`pacman`)
- `btrfs-progs` for BTRFS hibernate
- `pacman-contrib` for `paccache`
- ImageMagick for JPG boot backgrounds

## Why "shamanic"?

Because an Arch user is already a bit of a shaman: reads logs, interprets errors, finds the cure. These scripts just automate that first-aid kit.

---

**Repo:** [github.com/bymfd/arch-kam](https://github.com/bymfd/arch-kam)  
**License:** MIT
