---
title: 'cPanel WP Toolkit proxy açığı: kimlik doğrulamasız RCE ve yama sürümleri'
description: 'cPanel & WHM WP Toolkit proxy açığı: kimlik doğrulamasız uzaktan kod çalıştırma, etkilenen sürümler, yama ve geçici wptk.proxypass önlemi.'
pubDate: '2026-11-19'
heroImage: ../../assets/cpanel-wptk-proxy-hero.jpg
tags: ['security', 'cpanel', 'wordpress', 'rce', 'open-source']
---

cPanel, 18 Kasım 2026 akşamı tüm desteklenen cPanel & WHM sürümlerini etkileyen bir WP Toolkit proxy açığı yayınladı. Şirketin duyurusu kısa ama etki cümlesi net: başarılı istismar, **kimlik doğrulamasız uzaktan kod çalıştırma (RCE)** ve sunucunun ele geçirilmesiyle sonuçlanabiliyor. 19 Kasım itibarıyla cPanel bir CVE numarası, CVSS skoru, teknik kök neden veya istismar durumu yayınlamadı; aşağıda yalnızca doğrulanmış bilgiler var.

## Kısa özet

| Alan | Değer |
|---|---|
| Yayın | 18 Kasım 2026, cPanel Security |
| CVE / CVSS | Henüz yayınlanmadı |
| Etki | Kimlik doğrulamasız RCE; sunucu kontrolü |
| Yüzey | cPanel & WHM WP Toolkit proxy (`wptk.proxypass`) |
| Etkilenen | Tüm desteklenen cPanel & WHM sürümleri |
| Düzeltilen | 110.0.159+, 134.0.72+, 136.0.52+, 138.0.25+; WP2 138.1.19 |
| Geçici önlem | WP Toolkit proxy'yi devre dışı bırakmak |
| Saha istismarı | cPanel duyurusunda belirtilmedi |

![cPanel WP Toolkit proxy RCE şeması](/diagrams/cpanel-wptk-proxy.svg)

## Neyi biliyoruz, neyi bilmiyoruz?

cPanel'in güvenlik makalesi yalnızca "WP Toolkit proxy'sini etkileyen bir güvenlik açığı" diyor. Yama sürümleri ve geçici önlem dışında teknik ayrıntı yok. Bu yüzden şu an için bir exploit zinciri, CWE sınıfı veya saldırı ön koşulu uydurmak mümkün değil.

Bilinen somut nokta, sorunun cPanel'in WP Toolkit proxy katmanında olduğu. Bu katman, wp-admin içindeki WordPress güvenlik ayarlarını panel tarafındaki işlemlere bağlar. Daha önceki WP Toolkit açıkları — örneğin Haziran 2026'daki CVE-2026-47365, Eylül'deki CVE-2026-87899/CVE-2026-87900 ve Ekim'deki CVE-2026-93699 — çoğunlukla kimlik doğrulamalı bir hesabın başka bir müşteri hesabına geçmesine odaklanıyordu. Bu duyuru ise **kimlik doğrulamasız** diyor ve etkiyi doğrudan sunucu kontrolü olarak tanımlıyor. Geçmiş açıklarla aynı kök nedeni varsaymak için elimizde kanıt yok; ama yüzeyin tekrar eden WP Toolkit proxy alanı olması, yamayı ertelemenin iyi bir fikir olmadığını gösteriyor.

## Etkilenen ve düzeltilen sürümler

| Ürün | Etkilenen | Düzeltilen |
|---|---|---|
| cPanel & WHM 110 | Tüm desteklenen 110.x derlemeleri | 110.0.159 veya üzeri |
| cPanel & WHM 134 | Tüm desteklenen 134.x derlemeleri | 134.0.72 veya üzeri |
| cPanel & WHM 136 | Tüm desteklenen 136.x derlemeleri | 136.0.52 veya üzeri |
| cPanel & WHM 138 | Tüm desteklenen 138.x derlemeleri | 138.0.25 veya üzeri |
| WP Squared | Düzeltilmemiş derlemeler | 138.1.19 |

"All Supported Versions" ifadesi, desteklenen her şubenin etkilendiği anlamına geliyor. EOL şubeler için yama yok; onlar için tek gerçek çözüm desteklenen bir sürüme geçmek.

## Hemen yapılacaklar

Önce kurulu derlemeyi doğrulayın:

```bash
/usr/local/cpanel/cpanel -V
```

Ardından WHM'de **Upgrade to Latest Version** yolunu kullanın veya SSH üzerinden güncelleyin:

```bash
/usr/local/cpanel/scripts/upcp --force
```

Güncelleme sonrası `cpanel -V` çıktısını yeniden kontrol edin. "Otomatik güncelleme açıktı" varsayımı yeterli değil; özellikle sürüm sabitlemiş veya güncellemeleri kapalı tutan sunucularda derleme numarasını görmek gerekir. WP Squared kullanıyorsanız 138.1.19 ayrıca doğrulanmalı.

## Yamaya kadar geçici önlem

cPanel, yama uygulanamıyorsa WP Toolkit proxy'sini kapatmayı öneriyor. Duyurudaki komut:

```bash
/usr/local/cpanel/3rdparty/bin/perl -MCpanel::Leika -e 'Cpanel::Leika::set_leika_override("wptk.proxypass", "false")'
```

Bu ayar, wp-admin içinden WP Toolkit'in **WordPress Security Settings** bölümünü tam olarak yönetme yeteneğini kapatır. cPanel'in notuna göre sitelerin kendilerini, cPanel veya WHM arayüzlerini ve cPanel içindeki WP Toolkit arayüzünü etkilemez. Yine de bu bir geçici çözümdür: yama sonrası proxy davranışını gözden geçirin ve bu override'ı kalıcı bir yapılandırma gibi bırakmayın.

## Neden önemli?

Paylaşımlı barındırmada cPanel, tek bir müşteri hesabının ötesine geçen yetkilere sahip bir kontrol düzlemidir. Kimlik doğrulamasız RCE iddiası, saldırganın çalınmış bir cPanel şifresine bile ihtiyacı olmadığını gösterir. Teknik ayrıntı yayınlanmadığı için panik yerine hızlı envanter ve yama doğru tepki: hangi sunucularda WP Toolkit proxy'si açık, hangi derlemeler yamalı ve bu yüzeyler internete açık mı?

Yama öncesinde açık kalan sunucular için cPanel bir IOC yayınlamadı. Buna rağmen olağandışı süreçler, yeni cron girdileri, SSH anahtarları, cPanel hook'ları ve WP Toolkit işlem kayıtları gözden geçirilmeli; şüphe halinde panel ve veritabanı kimlik bilgileri döndürülmeli.

## Kaynaklar

- [cPanel: Security — Vulnerability in cPanel & WHM's WP Toolkit Proxy - November 18, 2026](https://support.cpanel.net/hc/en-us/articles/45133380394135-Security-Vulnerability-in-cPanel-WHM-s-WP-Toolkit-Proxy-November-18-2026)
- [cPanel: How do I update cPanel/WHM?](https://support.cpanel.net/hc/en-us/articles/1500004959421-How-do-I-update-cPanel-WHM)
