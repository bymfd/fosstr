---
title: 'fcm: macOS İçin Fan Kontrol Menü Uygulaması'
description: 'Intel ve Apple Silicon Maclerde fan hızını kontrol eden, menü çubuğunda çalışan hafif bir uygulama'
pubDate: '2026-09-10'
heroImage: ../../assets/blog-placeholder-3.jpg
tags: ['macos', 'swift', 'smc', 'fan-control', 'menu-bar']
---

MacBook'unuz aşırı ısınıyor, fan hiç mi hiç açılmıyor ve aniden kapanıyor? macOS fan yönetimi bazen gerçekten kötü çalışıyor. `fcm` tam bu sorunu çözmek için var.

## Neden İhtiyaç Duydum?

2019 model MacBook Pro'im vardı — "i9" denen şey. O bilgisayar yazılım derlerken eriyordu. Fan 6000 RPM'e çıkıyor, sesi uçak kalkışı gibiydi. Ama bazen de hiç açmıyor! Bir gün video render ederken aniden kapandı. SSD'den veri kaybettim. O gün dedim ki: "macOS fan kontrolü benim işime yaramıyor, ben yazıyorum."

Başka uygulamalar denedim — smcFanControl, Macs Fan Control. Hepsi iyi ama ya çok karmaşıktı ya da menü çubuğunda güzel görünmüyordu. Ben istedim: basit, güvenli, tek seferlik şifre girişi, ve menü çubuğunda sade bir görünüm.

## Özellikler

- **Menü çubuğunda** anlık RPM ve sıcaklık gösterimi
- **MAX / MIN / AUTO** modları
- **Sıcaklık eğrisi:** 50-88°C arası otomatik fan kontrolü
- **Özel hız ayarı:** İstediğin RPM değerini yaz
- **Tüm sensörler:** CPU, RAM, depolama, kablosuz — her sensörü listeler
- **Watchdog:** Hedif hızı her 1.5 saniyede bir yeniden uygular
- **Intel ve Apple Silicon** desteği (Universal binary)

## Kurulum (Terminal Gereksiz)

1. [Releases](https://github.com/bymfd/fcm/releases) sayfasından `FCM.app` indir
2. `/Applications` klasörüne taşı
3. Uygulamayı aç
4. Şifreni bir kez gir — privileged helper kurulup hazır

## Terminal ile Kullanım

```bash
./scripts/fcm.sh status   # Durum
./scripts/fcm.sh max      # Maksimum hız
./scripts/fcm.sh min      # Minimum hız
./scripts/fcm.sh auto     # Otomatik
./scripts/fcm.sh set 3000 # 3000 RPM
```

## Teknik Detaylar

- Uygulama normal kullanıcı olarak çalışır, SMC'yi okur
- Yazma işlemleri için root launch daemon (`com.fcm.helper`) kullanır
- FIFO üzerinden iletişim kurar
- Çıkışta fanı MAX'a çeker (güvenlik önlemi)

## Uyarı

SMC'ye doğrudan yazıyorsun. Eğer donanımın bozulursa, garantin düşerse, günlün mahvolursa — bu senin sorumluluğun. Fanı sürekli minimumda bırakma.

---

**Repo:** [github.com/bymfd/fcm](https://github.com/bymfd/fcm)
**Lisans:** MIT
