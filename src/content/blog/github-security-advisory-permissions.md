---
title: 'GitHub security advisory izinleri GA: maintainer admin olmadan da calisabilir'
description: 'GitHub 20 Kasim 2026da custom repository rollerine dort security advisory izni ekledi. ASEI bildirimi ve ozel raporlar artik repo admini olmadan yonetilebiliyor; sinirlar net.'
pubDate: '2026-11-24'
heroImage: ../../assets/github-security-advisory-permissions-hero.jpg
tags: ['security', 'github', 'open-source', 'maintainers', 'advisory', 'supply-chain']
---

GitHub, 20 Kasım 2026'da güvenlik danışmanlığı (security advisory) izinlerini genel kullanıma açtı. Bu bir CVE veya yeni bir açık değil; açık kaynak projelerinde koordinatlı açık yönetiminin kimler tarafından yürütülebileceğini değiştiren bir yetki güncellemesi. Artık bir kişiyi repo yöneticisi ya da organizasyon geneli security manager yapmadan, yalnızca ilgili depoda taslak advisory görebilme, özel güvenlik raporunu kabul etme ve advisory yayınlama yetkisi verebilirsiniz. GitHub'ın duyurusu sınırları da açıkça yazıyor: geçici özel fork'tan birleştirme hâlâ admin istiyor.

## Kısa özet

| Alan | Değer |
|---|---|
| Değişiklik | Security advisory izinleri custom repository rollerinde GA |
| Duyuru tarihi | 20 Kasım 2026, GitHub Changelog |
| Yeni izinler | View; Create/Edit/Manage; Accept reports & close/reopen; Publish & request CVEs |
| Kapsam | Repository security advisories ve private vulnerability reports |
| Atama | Kullanıcı ve takımlara, yalnızca ihtiyaç duyulan depolarda |
| Plan | Custom repository rollerini destekleyen planlar; GitHub Enterprise Cloud dahil |
| Kalan admin işi | Geçici özel fork'tan merge; fork silme; gizli yorumlarda write gereksinimi |
| Tür | Süreç/ürün güncellemesi, CVE değil |

![GitHub security advisory izin akışı](/diagrams/github-security-advisory-permissions.svg)

## Teknik görünüm

GitHub, dört izni özel bir hiyerarşiyle tanımlıyor. `View security advisories`, taslak advisory'leri, durumlarını ve yorumları görmeyi sağlıyor. `Create, Edit, and Manage security advisories`, görüntülemenin üzerine advisory oluşturma ve düzenleme, yorum yapma, iş birlikçileri yönetme ve geçici özel fork oluşturma yetkilerini ekliyor. `Accept private vulnerability reports and close or reopen security advisories`, özel raporları kabul etme ve advisory'leri kapatıp yeniden açma için View veya Create/Edit/Manage iznini gerektiriyor. `Publish security advisories and request CVEs` da aynı temel izinlere dayanıyor ve yayın/CVE talebini kapsıyor.

Pratik sonuç, rolün repo bazında verilebilmesi. GitHub, kullanıcılara ve takımlara yalnızca bakımını yaptıkları depolarda rol atamanızı öneriyor; böylece advisory bilgisi organizasyonun tamamına açılmıyor. İzinler hem repo security advisory'leri hem private vulnerability reports için geçerli. Yani bir bakımcı, organizasyon genelinde security manager olmadan kendi deposunun özel raporlarını görebiliyor.

Sınırlar duyuruda net. Yeni izinlerden birine sahip olmak, geçici özel fork'tan gelen değişiklikleri birleştirme yetkisi vermiyor; merge için repo yöneticisi veya security manager gerekiyor. Bu izinlere sahip kişiler geçici özel fork'u silemiyor. Gizli yorumlar ise yalnızca Create/Edit/Manage iznine ek olarak depoda write yetkisi olanlarda görünüyor. Kısacası yeni roller açık yönetimin büyük kısmını kapsıyor ama son onay ve depo yazımı hâlâ ayrı yetkiler.

GitHub, özelliğin custom repository rollerini destekleyen planlarda, GitHub Enterprise Cloud dahil kullanılabildiğini yazıyor. Duyuru GitHub Enterprise Server sürüm bilgisi vermiyor; dolayısıyla GHES tarafı için "var" veya "yok" demek kaynağın ötesine geçmek olur. Yine duyuru, CVE talebinin otomatik onaylandığını veya advisory'nin herkese açık hale geldiğini söylemiyor; yalnızca bu işlemleri tetikleyebilecek izinden bahsediyor.

## Ne yapmalı?

1. **Rolleri depo bazında haritalayın.** Hangi takımın hangi depolarda özel rapor aldığını ve taslak advisory yazdığını listeleyin; organizasyon geneli yetkileri gözden geçirin.
2. **En az yetkiyle ayrın.** Çoğu bakımcıya View + Create/Edit/Manage; rapor kabulü gereken kişilere Accept; yayın ve CVE talebini yalnızca sürüm sorumlularına verin.
3. **Admin hattını koruyun.** Geçici özel fork birleştirmeleri için en az bir repo yöneticisi veya security manager ataması bırakın; yeni izinler bunu değiştirmiyor.
4. **Gizli yorum kuralını göz önünde bulundurun.** Create/Edit/Manage yetkisi tek başına gizli yorumları göstermiyor; o kişinin depoda write yetkisi de olmalı.
5. **Eski yetkileri temizleyin.** Yalnızca advisory çalışması için verilmiş eski repo admin veya organization security manager rollerini, yeni custom role ile değiştirip kaldırın.

## Ne yapmamalı?

- "Tüm GitHub kullanıcıları advisory yayınlayabilir" demeyin. Özellik custom repository rolleri ve destekleyen planlarla sınırlı.
- "Artık admin gerekmiyor" demeyin. Geçici özel fork'tan merge ve fork silme hâlâ yönetici/security manager işi.
- "CVE talebi otomatik onaylanıyor" yazmayın. Duyuru yalnızca izin verildiğini söylüyor, onay sürecini değiştirdiğini söylemiyor.
- "Özel raporlar herkese açıldı" demeyin. Değişen şey kimin erişebileceği; gizlilik kuralı korunuyor.
- "GHES 3.x'te de aynı" demeyin. Kaynakta GHES sürüm bilgisi yok.
- "Organization security manager rolü kaldırıldı" demeyin. Yalnızca bu iş için zorunlu olmaktan çıktığı anlatılıyor.

## Durum

24 Kasım 2026 itibarıyla bu değişiklik **GitHub'ın kendi changelog kaydıyla doğrulanmış**; bir CVE, exploit veya güvenlik olayı değil. Doğrulanan bilgiler: duyuru tarihi 20 Kasım 2026, dört yeni izin, izinlerin dependency ilişkisi, repo/takım bazında atama, private vulnerability reports kapsamı, plan notu ve üç sınır (merge, fork silme, gizli yorum + write). Belirsizlikler: GitHub Enterprise Server için sürüm veya tarih verilmemiş; plan matrisinin tamamı duyuruda yok; CVE onay akışının detayları ve özel raporuz advisory oluşturma kuralları bu kayıtta yer almıyor. "Yeni bir güvenlik açığı bulundu", "herkes advisory yayınlayabilir" veya "admin rolü tamamen kalktı" başlıkları bu kayıtla desteklenmiyor.

## Bu seriden

- [OpenShell ve CNCF ajan güvenliği](/blog/openshell-cncf-ajan-guvenligi)
- [Açık kaynak AI katkısı ve yasaklar](/blog/acik-kaynak-ai-katkisi-yasaklari)
- [Flowintel CVE-2026-133648](/blog/flowintel-tls-cve-2026-133648)

## Kaynaklar

- [GitHub Changelog: Security advisory permissions are now generally available](https://github.blog/changelog/2026-11-20-security-advisory-permissions-are-now-generally-available)
