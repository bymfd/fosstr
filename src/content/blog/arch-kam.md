---
title: 'arch-kam: Arch Linux İçin Şamanik Bash Ritüelleri'
description: 'Hibernate, pil ömrü, bootloader, teşhis ve temizlik işlerini tek menüde toplayan "şamanik" bash araç seti'
pubDate: '2026-09-10'
updatedDate: '2026-10-26'
heroImage: ../../assets/blog-placeholder-5.jpg
tags: ['linux', 'arch', 'bash', 'automation']
type: project
repo: 'https://github.com/bymfd/arch-kam'
---

Arch Linux kullanan herkes bilir: her şey elle yapılır, her şeyi sen kurarsın. Bu güzel ama bazen tekrarlayan işler can sıkıyor. `arch-kam` tam olarak bu noktada devreye giriyor.

## Neden İhtiyaç Duydum?

Yıllar boyunca Arch Linux kurdum, sildim, tekrar kurdum. Her seferinde aynı adımlar: swap oluştur, grub düzenle, mkinitcpio hook ekle, TLP kur, bootloader temayı değiştir. Bir gün dedim ki — bunları elle yapmaktan bıktım. Özellikle hibernate kurulumu, BTRFS ile uğraşırken bir keresinde boot etmemiştim. O günden sonra "bir daha olmasın" diye scriptleri yazmaya başladım.

## Nedir?

`arch-kam`, Arch tabanlı dağıtımlar için yazılmış bir dizi bash script. "Kam" kelimesi eski Türkçede "şaman" anlamına geliyor — ve proje de tam olarak şamanlık yapıyor: sistemi "iyileştirir", "kötü ruhları kovar" ve "kozmik dengeyi" sağlar.

## Ritüeller

### Menü: `arch-kam.sh`

Tüm ritüelleri tek bir menüden çalıştırabilirsin. Menüyü açmak için:

```bash
sudo ./arch-kam.sh
```

Doğrudan bir ritüel de çağırabilirsin:

```bash
sudo ./arch-kam.sh doctor
sudo ./arch-kam.sh hibernate --size 32768
sudo ./arch-kam.sh battery
sudo ./arch-kam.sh boot
sudo ./arch-kam.sh clean --dry-run
```

### 1. Hibernate Enabler (Uyku Ritüeli)

Swap dosyası oluşturur, GRUB veya systemd-boot ayarlarını ve mkinitcpio hook'larını yapılandırır. BTRFS ve EXT4 destekliyor. Varsayılan swap boyutu RAM + 2 GB; `--size` ile değiştirilebilir. Mevcut swap dosyasını `--force` olmadan ezmez, disk alanını ve RAM'i kontrol eder. `resume` hook'unu `block`/`udev` sonrasına, `filesystems` öncesine ekler. Önce yedek alır, sonra değişiklik yapar.

```bash
sudo ./hibernate-enabler.sh
sudo ./hibernate-enabler.sh --size 32768
sudo ./hibernate-enabler.sh --force
sudo ./hibernate-enabler.sh --restore
```

`--restore`, resume parametrelerini, hook'u ve swap dosyasını kaldırır.

### 2. ARKUN: Dayanıklılık Ruhu (Pil Optimizasyonu)

TLP kurarak pil ömrünü uzatır. Kurulum, kaldırma, durum görüntüleme ve şarj eşiği ayarlama aynı menüde. `power-profiles-daemon` çalışıyorsa TLP ile çakışmayı algılar ve devre dışı bırakmayı önerir.

```bash
sudo ./battery.sh
```

Şarj eşikleri `/etc/tlp.d/99-arch-kam.conf` dosyasına yazılır; her cihazda desteklenmeyebilir, `tlp-stat -b` ile doğrulanmalı.

### 3. TIN: Vizyon ve Boşluk (Bootloader Arkaplanı)

GRUB için özel arkaplan resmi ayarlar. PNG doğrudan kullanılır; JPG, ImageMagick varsa PNG'ye çevrilir. Ya da tamamen siyah, "pure" bir arayüz için temizler. systemd-boot arkaplan görselini desteklemediği için bu ritüel yalnızca GRUB'da çalışır.

```bash
sudo ./bootloader-bg.sh
```

### 4. Doctor (Teşhis Ritüeli)

Salt okunur teşhis. Dağıtımı, bootloader'ı, kök dosya sistemini, disk alanını, swap/zram durumunu, hibernate desteğini, `resume` parametrelerini, mkinitcpio hook sırasını, TLP çakışmasını, başarısız systemd unit'lerini ve yetim paketleri raporlar. Root gerektirmez ve hiçbir şeyi değiştirmez.

```bash
./doctor.sh
```

### 5. Clean (Temizlik Ritüeli)

`paccache` ile paket önbelleğini temizler, journal'ı 14 günle sınırlar, yetim paketleri gösterip kaldırır ve `systemd-tmpfiles --clean` çalıştırır. Önce `--dry-run` ile ne yapılacağını görebilirsin.

```bash
sudo ./clean.sh --dry-run
sudo ./clean.sh
```

## Kurulum

```bash
git clone https://github.com/bymfd/arch-kam.git
cd arch-kam
chmod +x *.sh
sudo ./arch-kam.sh
```

Menü yerine doğrudan bir ritüel çalıştırmak için `sudo ./arch-kam.sh <ritüel>` kullanabilirsin.

## Gereksinimler

- Arch tabanlı bir dağıtım (`pacman`)
- BTRFS hibernate için `btrfs-progs`
- `paccache` için `pacman-contrib`
- JPG boot arkaplanı için ImageMagick

## Neden "Şamanik"?

Çünkü Arch Linux kullanıcısı zaten biraz şaman: logları okur, hataları yorumlar, çözümü bulur. Bu scriptler sadece bu işi otomatikleştiriyor. Sistem "hastalandığında" ilk yardım çantanız gibi düşünün.

---

**Repo:** [github.com/bymfd/arch-kam](https://github.com/bymfd/arch-kam)
**Lisans:** MIT
