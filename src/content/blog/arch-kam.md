---
title: 'arch-kam: Arch Linux İçin Şamanik Bash Ritüelleri'
description: 'Hibernate, pil ömrü ve bootloader ayarlarını otomatikleştiren, "şamanik" bir bash script koleksiyonu'
pubDate: '2026-09-10'
heroImage: ../../assets/blog-placeholder-1.jpg
tags: ['linux', 'arch', 'bash', 'automation']
---

Arch Linux kullanan herkes bilir: her şey elle yapılır, her şeyi sen kurarsın. Bu güzel ama bazen tekrarlayan işler can sıkıyor. `arch-kam` tam olarak bu noktada devreye giriyor.

## Neden İhtiyaç Duydum?

Yıllar boyunca Arch Linux kurdum, sildim, tekrar kurdum. Her seferinde aynı adımlar: swap oluştur, grub düzenle, mkinitcpio hook ekle, TLP kur, bootloader temayı değiştir. Bir gün dedim ki — bunları elle yapmaktan bıktım. Özellikle hibernate kurulumu, BTRFS ile uğraşırken bir keresinde boot etmemiştim. O günden sonra "bir daha olmasın" diye scriptleri yazmaya başladım.

## Nedir?

`arch-kam`, Arch tabanlı dağıtımlar için yazılmış bir dizi bash script. "Kam" kelimesi eski Türkçede "şaman" anlamına geliyor — ve proje de tam olarak şamanlık yapıyor: sistemi "iyileştirir", "kötü ruhları kovar" ve "kozmik dengeyi" sağlar.

## Ritüeller

### 1. Hibernate Enabler (Uyku Ritüeli)

Swap dosyası oluşturur, GRUB ve mkinitcpio'yu yapılandırır, sistemi hibernate moduna hazırlar. BTRFS ve EXT4 destekliyor. Önce yedek alır, sonra değişiklik yapar.

```bash
sudo ./hibernate-enabler.sh
```

### 2. ARKUN: Dayanıklılık Ruhu (Pil Optimizasyonu)

TLP kurarak pil ömrünü uzatır. Kur/kaldır komutu tek bir satır.

```bash
sudo ./battery.sh grant-kut   # Kur
sudo ./battery.sh recall-kut  # Kaldır
```

### 3. TIN: Vizyon ve Boşluk (Bootloader Arkaplanı)

GRUB veya systemd-boot için özel arkaplan resmi ayarlar. Ya da tamamen siyah, "pure" bir arayüz için temizler.

```bash
sudo ./bootloader-bg.sh
```

## Kurulum

```bash
git clone https://github.com/bymfd/arch-kam.git
cd arch-kam
chmod +x *.sh
sudo ./*.sh
```

## Neden "Şamanik"?

Çünkü Arch Linux kullanıcısı zaten biraz şaman: logları okur, hataları yorumlar, çözümü bulur. Bu scriptler sadece bu işi otomatikleştiriyor. Sistem "hastalandığında" ilk yardım çantanız gibi düşünün.

---

**Repo:** [github.com/bymfd/arch-kam](https://github.com/bymfd/arch-kam)
**Lisans:** MIT
