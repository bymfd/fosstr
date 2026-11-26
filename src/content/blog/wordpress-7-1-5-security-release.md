---
title: 'WordPress 7.1.5: 20 güvenlik düzeltmesi ve geri taşıma'
description: 'WordPress 7.1.5 güvenlik sürümü: 20 düzeltme, Patchstack ikincil analizi, 4.7 dahil geri taşımalar ve güncelleme adımları.'
pubDate: '2026-11-26'
heroImage: ../../assets/wordpress-7-1-5-security-release-hero.jpg
tags: ['security', 'wordpress', 'core', 'security-release', 'patchstack']
---

26 Kasım 2026 itibarıyla WordPress 7.1.5, WordPress.org'un 18 Kasım 2026'da duyurduğu bir güvenlik sürümü. Duyuru 20 güvenlik maddesi sıralıyor; Patchstack'in aynı gün yayınlanan **ikincil analizi** bunlardan 18'inin veritabanına eklendiğini, 2'sinin sertleştirme olduğunu ve 5 düzeltmenin Gutenberg paket yükseltmesiyle geldiğini yazıyor. Aşağıda WordPress.org birincil kayıtları, WordPress projesinin güvenlik danışma notu, Patchstack ikincil analizi ve CISA KEV kontrolü var; PoC, payload, kurban veya IOC uydurulmadı.

## Kısa özet

| Alan | Değer |
|---|---|
| Sürüm | WordPress 7.1.5 |
| Yayın tarihi | 18 Kasım 2026 |
| Tür | Güvenlik sürümü, kısa döngü |
| Düzeltme sayısı | 20, WordPress.org duyurusu |
| Patchstack veritabanı | 18 kayıt, ikincil analiz |
| Sertleştirme | 2 değişiklik, ikincil analiz |
| Gutenberg | 5 düzeltme paket yükseltmesinde, ikincil analiz |
| Geri taşıma | 4.7 dahil uygun dallara; 4.6 ve öncesi destek dışı |
| Öne çıkan zincir | Template Part block öznitelikleri, yönetici tarayıcısında eklenti yükleme ve olası RCE |
| Çoklu site | Site yöneticisinden Super Admin'a yükseltme, Customizer menü önizlemeleri |
| SQL enjeksiyonu | `WP_Meta_Query` iç içe relation değerleri ve Customizer front page ayarı |
| Bilgi açığa çıkma | REST arama, REST yorumlar ve XML-RPC `wp.getComments` |
| CVE durumu | Patchstack yayınında CVE yok; danışma notunda `No known CVE` |
| KEV | 2026.11.25 katalog sürümünde bu sürüme ait kayıt yok |
| Sonraki sürüm | 7.2, 8 Aralık 2026 için planlandı |

![WordPress 7.1.5 güvenlik düzeltmeleri şeması](/diagrams/wordpress-7-1-5-security-release.svg)

## Teknik görünüm

WordPress.org duyurusu 20 maddelik bir liste yayımladı. Liste, kimlik doğrulamasız başlayan Template Part block ayrıcalık yükseltmesinden Contributor+ XSS varyantlarına, XML-RPC pingback hizmet reddinden REST üzerinden bilgi açığa çıkarmaya kadar geniş bir aralığı kapsıyor. İki madde açıkça sertleştirme olarak yazıldı: JSON medya türü eşleşmesini genişleten hatalı düzenli ifade düzeltmesi ve sunucu tarafı sağlayıcısı kalmadığı için blok editöründen Imgur embed varyantının kaldırılması. Duyuru, güvenlik sürümü olduğu için sitelerin hemen güncellenmesini öneriyor.

WordPress.org sürüm belgesi aynı 20 maddeleri tekrarlıyor ve dal dal yama listesi veriyor: 7.0.9, 6.9.12, 6.8.13, 6.7.12, 6.6.12, 6.5.15, 6.4.15, 6.3.15, 6.2.16, 6.1.17, 6.0.19, 5.9.21, 5.8.20, 5.7.22, 5.6.24, 5.5.25, 5.4.26, 5.3.28, 5.2.31, 5.1.29, 5.0.32, 4.9.36, 4.8.35 ve 4.7.40. Duyuru geri taşımaların 4.7'ye kadar yapıldığını, 4.6 ve öncesinin artık güvenlik güncellemesi almadığını söylüyor. Belge ayrıca yalnızca en yeni sürümün aktif olarak desteklendiğini hatırlatıyor.

Patchstack'in **ikincil analizi** 20 düzeltmeden 18'inin veritabanına kaydedildiğini, 2'sinin sertleştirme olduğunu ve 5'inin Gutenberg paket yükseltmesinden geldiğini yazıyor. WordPress.org belgesi "No package was revised" diyor; ikincil analize göre bu satır yalnızca çekirdek PHP listesini anlatıyor. Maruziyet değerlendirmesi yapılırken paket farkları da kapsanmalı.

En kritik kayıt Template Part block ile ilgili. WordPress projesinin GHSA-pmp8-6cv8-q323 notuna göre `theme` ve `slug` öznitelikleri yönetici editörünün aynı sitede başka bir URL'e istek göndermesine yol açabiliyor. Author+ bu öznitelikleri bir gönderide ayarlayabiliyor; kimlik doğrulamasız saldırgan yöneticiye hazırlanmış bir editör bağlantısı gönderebiliyor veya yöneticiyi böyle bir bağlantıya yönlendirebiliyor. Yönetici bağlantıyı açtığında saldırgan için yönetici hesabı oluşabiliyor ve eklenti yüklemesiyle kod çalıştırma kapısı açılıyor. Not High diyor ve `No known CVE` yazıyor. Patchstack ikincil analizi, REST yolunun bu özniteliklerden dizildiğini ve yamanın `isSafeEntityKey()` eklediğini belirtiyor; payload yok.

Çoklu site kaydında WordPress.org, site yöneticisinin Customizer menü önizlemeleriyle Super Admin hesabını ele geçirebildiğini doğruluyor. Patchstack ikincil analizi, menü ve widget önizlemelerinin aynı hash biçimini kullanmasının iki alanı ayırt edilemez kıldığını yazıyor; sınır çoklu sitede anlam kazanıyor.

SQL enjeksiyonu iki kayıtla geliyor: `WP_Meta_Query` iç içe `relation` değerleri ve Customizer changeset önizlemelerinde front page ayarı. Patchstack ikincil analizine göre ilki, çağıran kod istek verisini `meta_query` içine geçirdiğinde anlam kazanıyor; WordPress.org ikincisi için yönetici gerektiğini yazıyor. Yama önizleme değerini de `sanitize_option()` ile temizliyor ve `$wpdb->prepare()` ekliyor.

XSS kayıtları geniş: yorum shortcode öznitelikleriyle kimlik doğrulamasız depolanan, eski medya popup'ında yansıyan, Contributor+ oEmbed/Comment Date/medya dosya adı, yönetici Customizer, Openverse metaverisi ve `wp_interactivity_data_wp_context()` alan adı. Patchstack ikincil analizi ilki için Latest Comments block'u, yansıyan kayıt için kurban tıklaması, interactivity kaydı için güvenilmeyen veriyi namespace olarak geçiren kod gerektiğini yazıyor. Tetikleyici koşullar bunlar; payload değil.

Bilgi açığa çıkma kayıtları da benzer bir ayrım taşıyor: REST arama endpoint'i üzerinden özel taksonomi terimleri kimlik doğrulamasız görülebiliyor; REST yorumlar endpoint'i Author+ için kullanıcı e-posta adreslerini açığa çıkarıyor; REST üzerinden gönderi ve şablon yazarı ataması Editor+ bilgisi veriyor; XML-RPC `wp.getComments` ise Subscriber+ için yorumcu e-postalarını ve IP adreslerini döndürüyor. XML-RPC toplu pingback'ler ise kimlik doğrulamasız hizmet reddi kaydı.

## Ne yapmalı?

1. **7.1.5'e güncelleyin.** WP Admin > Updates yolunu veya WordPress.org indirme sayfasını kullanın. Otomatik arka plan güncellemesi açık siteler yamayı kendiliğinden alır; yine de sürümü doğrulayın.
2. **Dal eşlemenizi kontrol edin.** Ana sürüme geçemiyorsanız WordPress.org belgesindeki karşılık gelen yamalı sürüme geçin. 4.6 ve öncesi için yama yok; bu dalları desteklenen bir sürüme taşıyın.
3. **Multisite rollerini gözden geçirin.** Site yöneticisi listesini ve Super Admin atamalarını denetleyin. Bu sürümde site yöneticisi bazı kayıtlarda kurban değil, başlangıç rolü.
4. **Contributor+ hesaplarını denetleyin.** Altı düzeltme bu rollerin erişebildiği alanlarla ilgili. Gereksiz yazarlık hesaplarını kaldırın ve editörlerden gelen block içeriklerini gözden geçirin.
5. **Özel kodu tarayın.** İstek verisini `meta_query` içine geçiren eklenti veya tema kodunu arayın; REST ve XML-RPC endpoint'lerini gereksiz açıklık açısından gözden geçirin. Pingback'ler gereksizse kapatın; bu yamanın yerine geçmez.
6. **Güncelleme sonrası kontrol edin.** Sürümü doğrulayın; yama öncesi dönem için yeni yönetici hesapları, beklenmeyen eklenti kurulumları, olağandışı REST/XML-RPC trafiği ve dosya değişiklikleri açısından loglara bakın.

## Ne yapmamalı?

- "Aktif istismar görüldü" demeyin. Birincil duyuruda ve danışma notunda sahada istismar iddiası yok; KEV kataloğünde bu sürüme ait kayıt yok.
- "Patchstack 18 CVE yayınladı" demeyin. 18 sayısı Patchstack veritabanı kaydıdır; Patchstack yayın sırasında CVE atanmadığını yazıyor.
- "CVSS 9.8 gibi bir skor var" demeyin. Danışma notu High diyor, fakat birincil kayıtlarda bu sürüm için sayısal CVSS skoru yok.
- "Gutenberg tarafında düzeltme yok" demeyin. Beş düzeltmenin paket yükseltmesinde olduğu ikincil analizde yer alıyor; belgedeki dosya listesi yalnızca çekirdek PHP kapsamını gösteriyor.
- "4.6 güvende" demeyin. 4.6 ve öncesi güvenlik güncellemesi almıyor.
- "Tüm açıklar kimlik doğrulamasız" demeyin. Bazı kayıtlar admin, Author+, Editor+ veya Contributor+ gerektiriyor.
- "PoC veya payload yayımlandı" demeyin. Birincil kayıtlar ve danışma notu böyle bir içerik içermiyor.
- "RCE kesin gerçekleşti" demeyin. WordPress.org "could lead to remote code execution" diyor; bu bir olasılık ifadesi.

## Durum

26 Kasım 2026 itibarıyla WordPress 7.1.5, WordPress.org duyurusu, HelpHub belgesi ve WordPress projesinin Template Part danışma notuyla doğrulanmış güvenlik sürümü. Duyuru 18 Kasım'da 20 maddeyi yayımladı; danışma notu High ve `No known CVE` diyor. Patchstack ikincil analizi 18 kayıt, 2 sertleştirme ve 5 Gutenberg düzeltmesi bildiriyor. CISA KEV 2026.11.25 kataloğunda bu sürüme ait kayıt yok.

Belirsizlikler net: birincil kayıtlar PoC, payload, kurban listesi, kampanya adı veya IOC içermiyor. Patchstack ikincil analizi kod farkına dayanıyor ve somut bir istek parametresi yayımlamıyor. Bu yazı sahada istismar iddiası taşımıyor ve sayısal CVSS skoru üretmiyor. Yama kararı, sürüm ve rol verilerine dayanıyor.

## Bu seriden

- [cPanel WP Toolkit proxy RCE](/blog/cpanel-wptk-proxy-rce)
- [Neden her şey 2shell oluyor](/blog/neden-her-sey-2shell-oluyor)
- [CISA BOD 26-04 ve SSVC](/blog/cisa-bod-26-04-ssvc)

## Kaynaklar

- [WordPress.org - WordPress 7.1.5 Release](https://wordpress.org/news/2026/11/wordpress-7-1-5-release/)
- [WordPress.org - Version 7.1.5 HelpHub belgesi](https://wordpress.org/documentation/wordpress-version/version-7-1-5/)
- [WordPress/wordpress-develop - GHSA-pmp8-6cv8-q323](https://github.com/WordPress/wordpress-develop/security/advisories/GHSA-pmp8-6cv8-q323)
- [Patchstack - WordPress 7.1.5 Security Release, ikincil analiz](https://patchstack.com/articles/wordpress-7-1-5-security-release/)
- [CISA KEV JSON feed'i](https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json)
