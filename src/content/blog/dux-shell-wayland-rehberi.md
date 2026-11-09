---
title: 'Dux Shell: Waybar, Rofi ve swaylock''u tek pakette değiştiren Wayland kabuğu'
description: 'Wayland masaüstünü parça parça kurmaktan sıkılanlar için Dux Shell rehberi: niri, Hyprland ve Sway ile kurulum, v2.1 yenilikleri, güçlü ve zayıf tarafları.'
pubDate: '2026-11-09'
heroImage: ../../assets/blog-placeholder-4.jpg
tags: ['linux', 'wayland', 'arch', 'desktop', 'open-source']
---

Linux masaüstü uzun zamandır "parçalardan masaüstü kurma" sanatı. Wayland'e geçince bu parçalar daha da çoğalıyor: panel için Waybar, uygulama menüsü için Rofi veya Fuzzel, bildirimler için Mako, kilit ekranı için swaylock, boşta kalma için swayidle, renk teması için ayrı bir araç, duvar kağıdı için bir başkası. Hepsi çalışır, ama hiçbiri diğerinden haberdar değildir.

**Dux Shell**, tam olarak bu dağınıklığı tek pakete toplama iddiasıyla geliyor. Ekim 2026'da DankMaterialShell adından Dux Shell'e geçen proje, 4 Kasım 2026'da **2.1 "Stormborn"** sürümünü yayınladı. Türkçe kaynak neredeyse yok; bu yazı hem ne olduğunu hem de Arch Linux'ta nasıl kurulacağını anlatıyor.

## Dux Shell nedir?

[Dux Shell](https://duxlabs.dev/), Wayland kompozitörlerinin üzerinde çalışan bir masaüstü kabuğu. GNOME Shell veya KDE Plasma'ya benzer bir görev üstleniyor: uygulama başlatma, pencere yönetimi, bildirimler, sistem tepsisi, ses, ağ, Bluetooth, parlaklık, duvar kağıdı ve kilit ekranı.

Teknik olarak iki parçadan oluşuyor:

- **Quickshell** ile yazılmış QML arayüzü,
- **Go** ile yazılmış `dms` arka ucu.

Arka uç, D-Bus ve Wayland ile konuşuyor; arayüzle Unix soketi üzerinden haberleşiyor. Yani Dux Shell bir kompozitör değil. niri, Hyprland, Sway gibi bir kompozitörün üzerine oturuyor.

Projenin [GitHub deposu](https://github.com/duxlabs-dev/dux-shell) MIT lisanslı ve Kasım 2026 itibarıyla yaklaşık 8,7 bin yıldıza sahip. Proje, 602 katkıcı ve 63 çevirmen tarafından sürdürülüyor.

### Tek pakette gelenler

Dux Shell tek bir uygulama değil, bir suite:

| Bileşen | Görevi |
|---|---|
| **Dux Shell (dms)** | Panel, widget'lar, başlatıcı, bildirimler, kilit ekranı |
| **Dux Greeter** | greetd için giriş ekranı |
| **Dux GOP** | Sistem ve süreç izleme (TUI, CLI, REST API) |
| **Dux Search** | Dosya sistemi arama servisi |
| **Dux Calendar** | Yerel, Google, Microsoft, CalDAV ve iCloud takvimleri |
| **Dux Files** | Sekmeler, bölünmüş görünüm ve ağ paylaşımları olan dosya yöneticisi |
| **Dux Installer** | Kurulum ve yönetim aracı |

Kabaca Waybar + Rofi + Mako + swaylock + swayidle + polkit + duvar kağıdı aracının yerini dolduruyor.

## Hangi kompozitörlerle çalışıyor?

Desteklenen kompozitörler:

- **niri** (proje ekibinin tercihi, en derin entegrasyon),
- **Hyprland** (0.55 veya üzeri),
- **MangoWC** (mangowm 0.18 veya üzeri),
- **Sway**,
- **labwc**,
- **Miracle WM**.

niri, Hyprland ve MangoWC için `dms setup` hazır yapılandırma üretiyor. Sway, labwc ve Miracle WM destekleniyor ancak yapılandırmayı elle yapmanız gerekiyor. Diğer Wayland kompozitörlerinde çalışma alanı geçişi, genel bakış ve monitör yönetimi gibi özellikler kısıtlanabiliyor. Yani "her Wayland kompozitöründe tam deneyim" beklememek gerekiyor.

## 2.1 "Stormborn" ile gelenler

[2.1 sürümü](https://duxlabs.dev/blog/v2-1-release) 4 Kasım 2026'da çıktı. Öne çıkan yenilikler:

- **Sistem monitörü:** CPU, bellek, GPU, disk ve ağ için yeni izleme widget'ları.
- **Video duvar kağıtları:** Statik görsel yerine video arka plan desteği.
- **Yenilenmiş medya oynatıcı.**
- **Arayüz yoğunluğu ayarı:** Daha kompakt veya daha ferah yerleşim.
- **Dux Files iyileştirmeleri.**

Bunlar 2.0'ın üzerine geliyor. 2.0 ise projenin kimlik değişimiydi: DankMaterialShell adı Dux Shell oldu, Dux Labs organizasyonu kuruldu, Dash plugin'leri, özelleştirilebilir kilit ekranı ve Dux Files eklendi.

### Tema tarafı

Dux Shell'in en çok konuşulan özelliklerinden biri **dank16** algoritması. Tek bir temadan 16 renk üretip bunları GTK3, GTK4, Qt, terminal ve editörlere uyguluyor. Amaç, uygulamalar arasında renk tutarlılığı sağlamak.

Bu, Waybar + Rofi + GTK temasını ayrı ayrı elle uyumlamaya çalışanlar için ciddi bir kolaylık. Yine de her uygulama kendi temasını zorluyorsa (örneğin bazı Nautilus eklentileri) sonuç karışık olabiliyor. Projenin kendi docs'u da bunu kabul ediyor.

## Arch Linux'ta kurulum

Dux Shell artık Arch'ın resmi **extra** deposunda. Yani AUR'a gerek yok:

```bash
sudo pacman -S dux-shell
```

Geliştirme sürümünü denemek isterseniz AUR paketi var:

```bash
paru -S dux-shell-git
```

Yanına bir kompozitör kurmanız gerekiyor. niri veya Hyprland en iyi desteklenen seçenekler:

```bash
sudo pacman -S niri
# veya
sudo pacman -S hyprland
```

Kurulumdan sonra:

```bash
dms setup
```

Bu komut, seçtiğiniz kompozitör için başlangıç yapılandırmasını ve Dux Shell kısayollarını oluşturuyor. Ardından systemd servisini etkinleştirmek en temiz yol:

```bash
dms systemd enable
systemctl --user status dms
```

### niri ile otomatik başlatma

niri'nin systemd oturum entegrasyonu var. Dux Shell'i yalnızca niri oturumunda başlatmak için:

```bash
systemctl --user add-wants niri.service dms
```

### Hyprland ile otomatik başlatma

Hyprland 0.57 ve sonrası `hyprland-session.target` hedefini kendisi başlatıyor. Dux Shell'i bu hedefe bağlayın:

```bash
systemctl --user add-wants hyprland-session.target dms
```

Hyprland 0.55/0.56 kullanıyorsanız önce oturum hedefini elle oluşturmanız ve ortam değişkenlerini systemd'ye aktarmanız gerekir. Ayrıntısı [kurulum dokümanında](https://duxlabs.dev/docs/dms/installation) var.

> **Hyprland notu:** DMS 2.1 artık yalnızca Lua yapılandırmasını okuyor. `dms setup` yeni bir `hyprland.lua` ve `dms/*.lua` parçaları yazar; eski `hyprland.conf` kullanılmaz. Hyprland 0.55 veya üzeri gerekiyor.

> **Dikkat:** systemd ile otomatik başlatma kullanıyorsanız kompozitör yapılandırmanızdan `dms run` satırını kaldırın. Aksi halde Dux Shell iki kez başlar.

### Günlük kullanım komutları

```bash
dms run                      # Kabuğu elle başlat
dms ipc call spotlight toggle
dms ipc call audio setvolume 50
dms plugins search           # Plugin registry'de ara
dms brightness list
```

Dux Shell'in CLI ve IPC yüzeyi geniş. Bu, hem kısayollara hem de script'lere iyi bir entegrasyon sunuyor. Plugin yöneticisi ayrıca `~/.config/dms/plugins.lock.json` dosyasında kurulu plugin'lerin tam Git commit'lerini tutuyor; yani aynı düzeni başka bir makinede tekrarlayabiliyorsunuz.

## Artıları

- **Bütünlük:** Panel, başlatıcı, bildirim, kilit ekranı ve tema aynı tasarım dilini paylaşıyor.
- **Tema tutarlılığı:** dank16 sayesinde GTK/Qt/terminal renkleri tek yerden yönetiliyor.
- **Dağıtım desteği:** Fedora, Debian, Ubuntu, openSUSE, Gentoo, NixOS, Solus, Void ve Arch için paketler var.
- **CLI ve IPC:** Her şeyi fareyle yapmak zorunda değilsiniz.
- **Aktif geliştirme:** 2.0'dan 2.1'e iki haftada geçildi; hata düzeltmeleri hızlı.
- **Hazır imajlar:** Zirconium ve Fedora Miracle Spin, Dux Shell önceden kurulu geliyor.

## Eksileri

- **Genç ve hızlı değişen proje.** İki haftada bir sürüm, her sürümde yeni özellik demek. Bu heyecan verici ama kararlılık arayanlar için riskli.
- **Yeniden markalama izleri.** Eski Dank Linux depolarından gelenler için `dms migrate dux` gerekiyor. Eski `avengemedia` COPR/PPA/OBS adresleri hâlâ dolaşımda; yanlış dokümana denk gelmek kolay.
- **Quickshell/Qt bağımlılığı.** Hafif bir Waybar kurulumundan daha fazla bağımlılık ve daha fazla hareketli parça var.
- **Wayland'a özel.** X11'de çalışmıyor. X11 kullanıyorsanız bu yazı sizin için değil.
- **Kompozitör bilgisi hâlâ gerekli.** Dux Shell kompozitörün yerini almıyor; niri veya Hyprland'i yine siz yapılandırıyorsunuz.
- **Tek pakete bağlılık.** Her şeyi tek suite'ten yönetmek rahat, ama bir parçayı değiştirmek istediğinizde diğerleriyle uyum sorunu çıkabilir.

## Kimin için?

Dux Shell şu kişiler için mantıklı:

- Waybar + Rofi + Mako + swaylock kombinasyonunu elle kurmaktan yorulmuş,
- niri veya Hyprland kullanan,
- GNOME/KDE'nin ağırlığını istemeyen ama onlar kadar bütünlüklü bir görünüm isteyen,
- Tema tutarlılığına önem veren.

Şunlar için değil:

- X11 kullanan,
- "Kur, unut, hiç dokunma" isteyen,
- Tek bir panel widget'ı için tüm suite'i kurmak istemeyen,
- Kararlılık ve uzun destek döngüsü önceliği olan.

## Sonuç

Dux Shell, Wayland masaüstünün "parçalardan kurma" sorununa makul bir cevap. Özellikle niri ve Hyprland kullanıcıları için Waybar/Rofi/Mako yığınını tek elden yönetmek büyük kolaylık. 2.1 ile gelen sistem monitörü, video duvar kağıtları ve tema iyileştirmeleri de projenin sadece bir panel olmadığını gösteriyor.

Ama hızlı değişen, genç bir proje. Mevcut çalışan masaüstünüzü silmeden, ayrı bir kullanıcı veya ayrı bir oturumda denemek en doğrusu. Beğenmezseniz `dms systemd disable` ile servisi kapatıp eski yapılandırmanıza dönebilirsiniz.

*Bu yazıdaki bilgiler 9 Kasım 2026 itibarıyla Dux Labs dokümanları, GitHub deposu, sürüm notları ve bağımsız haber kaynaklarından derlenmiştir. Paket adları ve komutlar dağıtımdan dağıtıma değişebilir; kurulumdan önce kendi dağıtımınızın paketini doğrulayın.*
