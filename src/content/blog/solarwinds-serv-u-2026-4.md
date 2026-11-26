---
title: 'SolarWinds Serv-U 2026.4: Linux kök ayrıcalığı zinciri'
description: 'Serv-U 2026.4: 18 SolarWinds CVE''si + 11 üçüncü taraf CVE''si, dokuz Critical, CVE-2026-123172 ve 123168 için PR:H, 123166 Windows komut enjeksiyonu ve KEV durumu.'
pubDate: '2026-11-26'
heroImage: ../../assets/solarwinds-serv-u-2026-4-hero.jpg
tags: ['security', 'solarwinds', 'serv-u', 'cve', 'privilege-escalation', 'nvd']
---

26 Kasım 2026 itibarıyla SolarWinds Serv-U 2026.4, 24 Kasım 2026'da yayınlanan sürüm notlarında 18 SolarWinds CVE'sini ve 11 üçüncü taraf CVE'sini kapatıyor; SolarWinds tablosundaki dokuzu 9.1 Critical olarak listeleniyor. Odak iki kayıt: CVE-2026-123172 ve CVE-2026-123168. İkisi de Linux kurulumlarda root ayrıcalığına yükseltmeyi anlatıyor, satıcı CVSS 3.1 skoru 9.1 ve vektör `PR:H` taşıyor. Windows tarafında etki satıcıya göre daha düşük. CVE-2026-123166 ise yalnızca Windows'ta görülen bir komut enjeksiyonu. Aşağıda SolarWinds Trust Center danışma notları, sürüm notları, NVD API ve CISA KEV kontrolü var; aktif istismar, PoC veya IOC uydurulmadı.

## Kısa özet

| Alan | Değer |
|---|---|
| Sürüm | SolarWinds Serv-U 2026.4 |
| Yayın tarihi | 24 Kasım 2026, sürüm notları |
| Etkilenen | Serv-U 2026.3 ve altı |
| Düzeltme sürümü | Serv-U 2026.4 |
| Toplam | 18 SolarWinds CVE'si + 11 üçüncü taraf CVE'si; 9 Critical (SolarWinds tablosu), satıcı sürüm notları |
| Odak kayıtlar | CVE-2026-123172, CVE-2026-123168 |
| Etki | Linux'ta root'a yükseltme; Windows'ta daha düşük risk |
| CVSS | 9.1 Critical, CVSS 3.1 secondary, kaynak `psirt@solarwinds.com` |
| Vektör | `CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:C/C:H/I:H/A:H` |
| Windows vektörü | `AV:N/AC:L/PR:H/UI:N/S:U/C:L/I:L/A:L` |
| Gerekli ayrıcalık | `PR:H`; yüksek ayrıcalıklı Serv-U bağlamı |
| Windows komut enjeksiyonu | CVE-2026-123166, 7.2 High, yalnızca Windows |
| NVD durumu | `Undergoing Analysis`; skor secondary |
| SSVC | CISA Coordinator: `exploitation: none`, `automatable: no`, `technicalImpact: total` |
| KEV | 2026.11.25 katalog sürümünde bu CVE'ler yok |
| Kredi | Intigriti Bug Bounty Program |

![Serv-U 2026.4 ayrıcalık yükseltme şeması](/diagrams/solarwinds-serv-u-2026-4.svg)

## Teknik görünüm

SolarWinds'ün 2026.4 sürüm notları, SolarWinds CVE tablosunda 18 kayıt listeliyor; dokuzu 9.1 Critical satırı taşıyor. Tablo CVE-2026-82322'yi domain group yöneticisinin sunucu yöneticisi seviyesine çıkabildiği IDOR olarak anlatıyor; CVE-2026-123167 yol traversal üzerinden ayrıcalıklı dosya erişimi, CVE-2026-82315, 82316 ve 82319 TOCTOU, CVE-2026-82320 ve 82321 type confusion, CVE-2026-82317 ise Linux'a özel ve yöneticileri etkileyen 6.8 Medium depolanan XSS olarak geçiyor. Bu ayrıntıların kaynağı satıcı sürüm notlarıdır; NVD kayıtlarından doğrulanmadıkları için burada yalnızca Notlar'daki haliyle aktarılıyor.

CVE-2026-123172 ve CVE-2026-123168, Trust Center danışma notlarında benzer bir dille tanımlanıyor. İlkinde ayrıcalık yükseltmesi Linux kurulumlarda root'a çıkabiliyor; ikincisinde yetersiz doğrulama Linux'ta root kullanıcıya yükseltmeye yol açabiliyor. İki not da Windows için riskin daha düşük olduğunu söylüyor, etkilenen ürünü `Serv-U 2026.3 and below`, düzeltmeyi `2026.4` olarak veriyor ve Intigriti Bug Bounty Program'ı kredi olarak gösteriyor. Her iki danışma notunda Linux vektörü `AV:N/AC:L/PR:H/UI:N/S:C/C:H/I:H/A:H`, Windows vektörü `AV:N/AC:L/PR:H/UI:N/S:U/C:L/I:L/A:L` şeklinde.

Burada `PR:H` belirleyici. NVD API kayıtları her iki CVE için 9.1 skoru `Secondary` olarak ve kaynak olarak `psirt@solarwinds.com` gösteriyor; NVD durumu `Undergoing Analysis`. Yani 9.1, satıcının skorudur ve NVD analiz skoru değildir. `PR:H`, saldırganın zaten yüksek ayrıcalıklı bir Serv-U bağlamına sahip olmasını gerektirir. Bu nedenle "kimlik doğrulamasız root RCE" ifadesi kayıtlarla uyuşmuyor. `S:C` alanı Linux tarafında etkinin Serv-U sınırını aşarak işletim sistemine geçtiğini gösteriyor; Windows'ta `S:U` ve düşük gizlilik, bütünlük, erişilebilirlik etkileri var.

CVE-2026-123166 ayrı bir Windows kaydı. Danışma notu, kullanıcı tarafından kontrol edilen argümanların yeterince temizlenmediğini ve komut enjeksiyonuna açık olduğunu yazıyor; yalnızca Windows kurulumlarını etkiliyor. Satıcı 7.2 High ve `CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:H` vektörünü veriyor. NVD kaydı aynı skoru secondary olarak taşıyor, CWE-78'i gösteriyor ve Windows platformunu doğruluyor. `PR:H` burada da geçerli; bu kaydı Linux root zincirleriyle aynıymış gibi sunmak yanlış olur.

NVD'nin SSVC v2.0.3 alanları üç odak CVE için CISA Coordinator kaynağından geliyor: `exploitation: none`, `automatable: no`, `technicalImpact: total`. Bu kombinasyon, kayıtlı bir istismar kanıtı olmadığını, otomasyonun mevcut veriyle desteklenmediğini ve teknik etkinin ciddi olduğunu söylüyor. CISA KEV JSON akışının 2026.11.25 sürümünde CVE-2026-123172, 123168, 123166 veya 82322 için kayıt bulunmuyor. Satıcı notlarında da kurban listesi, kampanya adı, PoC veya IOC yok.

## Ne yapmalı?

1. **Envanteri çıkarın.** Serv-U sürümünü ve platformu her sunucuda doğrulayın. 2026.3 ve altındaki tüm kurulumları 2026.4'e taşıyın.
2. **Linux'u önceleyin.** Yüksek ayrıcalıklı Serv-U hesapları, domain yöneticileri ve servis hesapları olan Linux sistemleri ilk sırada; `PR:H` saldırganın bu bağlamlardan birini zaten elde ettiğini varsayar.
3. **Windows'u atlamayın.** Linux root başlığı öne çıksa da CVE-2026-123166 Windows'a özel komut enjeksiyonu. Windows kurulumları da aynı yama ile kapanıyor.
4. **Ayrıcalıkları gözden geçirin.** Domain group admin, domain admin ve server admin rollerini listeleyin. Satıcı tablosundaki IDOR, TOCTOU ve type confusion kayıtları bu rollerin sınırlarıyla ilgili.
5. **Kimlik doğrulama kontrollerini denetleyin.** Sürüm notları TOTP brute force, ilk faktör şifre brute force ve kullanıcı adı numaralandırma kayıtlarını da içeriyor. Çok faktörlü ayarları ve deneme sınırlarını gözden geçirin.
6. **Yama sonrası bakın.** Sürümü doğrulayın; yama öncesi dönemde yeni yönetici hesapları, beklenmeyen dosya değişiklikleri, olağandışı komut çalıştırma izleri ve Serv-U oturumları için logları tarayın. Paylaşılmış bir IOC olmadığı için kendi ortamınızdan kanıt üretin.

## Ne yapmamalı?

- "Kimlik doğrulamasız root RCE var" demeyin. Vektör `PR:H` diyor; başlangıçta yüksek ayrıcalıklı bağlam gerekiyor.
- "Aktif istismar görüldü" demeyin. SSVC `exploitation: none` diyor ve KEV'de kayıt yok.
- "NVD 9.1 skorunu onayladı" demeyin. Skor NVD'de `Secondary` ve kaynağı SolarWinds.
- "Windows'ta da root etkisi var" demeyin. Satıcı Windows vektörünü `S:U` ve düşük etkilerle veriyor.
- "CVE-2026-123166 Linux'u da etkiliyor" demeyin. Danışma notu yalnızca Windows diyor.
- "Dokuz critical aynı açık" demeyin. Sürüm notları ayrı CVE kimlikleri ve ayrı mekanizmalar listeliyor.
- "82322 ve 823xx ailesini NVD doğruladı" demeyin. Bu yazıdaki ayrıntılar satıcı sürüm notlarından geliyor; NVD'yi yalnızca üç odak CVE için kullandık.
- "PoC veya IOC yayımlandı" demeyin. Birincil kayıtlar böyle bir içerik içermiyor.

## Durum

26 Kasım 2026 itibarıyla Serv-U 2026.4, SolarWinds sürüm notları ve Trust Center danışma notlarıyla doğrulanmış bir yama sürümü. Sürüm notları 18 SolarWinds CVE'si ve 11 üçüncü taraf CVE'si listeliyor; SolarWinds tablosundaki dokuzunu Critical olarak işaretliyor. CVE-2026-123172 ve CVE-2026-123168 danışma notlarında Linux root yükseltmesi olarak tanımlanıyor; her ikisi de 2026.3 ve altını etkiliyor, 2026.4'te kapanıyor ve Intigriti'ye kredi veriyor. CVE-2026-123166 danışma notunda Windows'a özel komut enjeksiyonu olarak geçiyor. NVD API üç kayıt için satıcıdan gelen secondary CVSS metriğini ve CISA Coordinator SSVC alanlarını gösteriyor; kayıtlar `Undergoing Analysis` durumunda.

Belirsizlikler net: birincil kayıtlarda istismar kanıtı, kurban bilgisi, kampanya adı, PoC veya IOC yok. 82322 ve 823xx ailesine ait mekanizma anlatımları satıcı sürüm notlarına dayanıyor ve NVD tarafından ayrıca analiz edilmiş değil. "Kimlik doğrulamasız root RCE" ve "aktif istismar" iddiaları bu kaynaklarla desteklenmiyor. Yama kararı sürüm, platform ve ayrıcalık verilerine dayanıyor.

## Bu seriden

- [CISA BOD 26-04 ve SSVC](/blog/cisa-bod-26-04-ssvc)
- [WP Rocket CVE-2026-125812](/blog/wp-rocket-cve-2026-125812)
- [Neden her şey 2shell oluyor](/blog/neden-her-sey-2shell-oluyor)

## Kaynaklar

- [SolarWinds - Serv-U 2026.4 release notes](https://documentation.solarwinds.com/en/success_center/servu/content/release_notes/servu_2026-4_release_notes.htm)
- [SolarWinds Trust Center - CVE-2026-123172](https://www.solarwinds.com/trust-center/security-advisories/CVE-2026-123172)
- [SolarWinds Trust Center - CVE-2026-123168](https://www.solarwinds.com/trust-center/security-advisories/CVE-2026-123168)
- [SolarWinds Trust Center - CVE-2026-123166](https://www.solarwinds.com/trust-center/security-advisories/CVE-2026-123166)
- [NVD API - CVE-2026-123172](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-123172)
- [NVD API - CVE-2026-123168](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-123168)
- [NVD API - CVE-2026-123166](https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2026-123166)
- [CISA KEV JSON feed'i](https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json)
