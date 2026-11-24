---
title: 'Dependabot 8 Aralikta sessiz repo larda duruyor'
description: 'GitHub 8 Aralik 2026dan itibaren bir yil push olmayan repo larda Dependabot uyarilarini kapatacak. Uyarilar silinmiyor, arsivleniyor ve her push ile geri geliyor.'
pubDate: '2026-11-24'
heroImage: ../../assets/dependabot-inactive-repositories-hero.jpg
tags: ['security', 'github', 'dependabot', 'supply-chain', 'open-source']
---

GitHub, 10 Kasım 2026 changelog'unda Dependabot uyarılarının 8 Aralık 2026'dan itibaren "son bir yılda etkinlik olmayan" çoğu depoda kapatılacağını duyurdu. Bu bir güvenlik açığı değil; uyarı üretiminin kapsamını değiştiren bir ürün kararı. Önemli ayrıntı şu: mevcut uyarılar silinmiyor, arşivleniyor; depoya yapılacak herhangi bir push uyarıları yeniden açıyor ve bir yıllık sayacı sıfırlıyor.

## Kısa özet

| Alan | Değer |
|---|---|
| Değişiklik | Etkin olmayan depolarda Dependabot alerts kapanıyor |
| Geçerlilik | 8 Aralık 2026 |
| "Etkinlik" tanımı | Herhangi bir branch/tag'a push, repo oluşturma, Dependabot uyarılarını açma |
| Mevcut uyarılar | Arşivleniyor, silinmiyor, geri yüklenebiliyor |
| Geri açma | Herhangi bir push veya repo ayarlarından açma |
| İstisna | Zorunlu security configuration veya kurum politikası engelse kapanmıyor |
| Kapsam | github.com'un tüm planları ve data residency'li GitHub Enterprise Cloud |
| Kapsam dışı | GitHub Enterprise Server |

![Dependabot uyarı yaşam döngüsü](/diagrams/dependabot-inactive-repositories.svg)

## Teknik görünüm

GitHub'ın verdiği gerekçe, güvenlik açığı keşfinin ve uyarı hacminin hızla artması; amacı aktif geliştirilen depolarda Dependabot'u hızlı ve güvenilir tutmak. Karar "çoğu depo" ifadesiyle yazılmış, çünkü iki istisna var. Zorunlu security configuration ile Dependabot uyarılarını açan depolarda uyarılar kapanmıyor. Ayrıca kurumunda Dependabot uyarılarını açıp kapatmayı repo yöneticilerinin kararına bırakmayan bir politika varsa, o depolar da atlanıyor.

Etkinlik tanımı dar ve mekanik. GitHub yalnızca üç durumu sayıyor: herhangi bir branch veya tag'a push yapmak, depoyu oluşturmak, Dependabot uyarılarını açmak. Duyuruda issue, pull request, yorum veya yıldız gibi etkinlikler sayılmıyor. Yani bir depoda son bir yılda kod push'u yoksa, başka tür hareket olsa bile kapsama girebiliyor.

Uyarıların kapanması veri kaybı değil. GitHub mevcut uyarıların arşivlendiğini ve istenildiğinde geri yüklenebileceğini yazıyor. Depoya yapılacak herhangi bir push uyarıları otomatik olarak yeniden açıyor ve bir yıllık süreyi baştan başlatıyor. Repo ayarlarından elle açmak da aynı sonucu veriyor. Veri residency kullanan kurumlar için arşivlenen uyarılar kurumun diğer verileriyle aynı bölgede tutuluyor.

Kapsam net: github.com üzerindeki tüm planlar ve GitHub Enterprise Cloud data residency. GitHub Enterprise Server bu değişiklikten etkilenmiyor. Duyuru Dependabot version updates veya dependency graph davranışında bir değişiklik anlatmıyor; yalnızca alerts kapanıyor. Bu ayrımı korumak önemli, çünkü "Dependabot kapandı" başlığı yanlış bir izlenim verir.

## Ne yapmalı?

1. **Depo envanterini çıkarın.** 8 Aralık öncesinde son push tarihi bir yıldan eski olan depoları listeleyin; arşivlenmiş kabul edilen depolarla aktif ama sessiz depoları ayırın.
2. **Aktif kabul edilen depolara tek push atın.** Bakımı süren ama bir yıldır push olmayan depoya küçük bir değişiklik göndermek uyarıları geri açar ve sayacı sıfırlar.
3. **Zorunlu security configuration kullanın.** Kurumda repo yöneticilerinin uyarıları kapatmasını istemiyorsanız, uyarıları açan zorunlu bir security configuration uygulayın.
4. **Arşivleri kontrol edin.** 8 Aralık sonrası bir depoda çalışmaya başlarken uyarıların otomatik geri geldiğini doğrulayın; eski uyarıları yeniden keşfetmeyin.
5. **Kurum politikasını gözden geçirin.** GHES dışındaki filo için Dependabot alerts politikanızı ve data residency gereksinimlerinizi kaydedin.

## Ne yapmamalı?

- "Uyarılar silindi" demeyin. GitHub arşivlendiğini ve geri yüklenebileceğini yazıyor.
- "Dependabot tamamen kapatılıyor" demeyin. Değişiklik alerts kapsamı; version updates veya dependency graph için açıklama yok.
- "Tüm depolar etkileniyor" demeyin. Duyuru "çoğu depo" diyor ve iki istisna tanımlıyor; GHES tamamen dışarıda.
- "Issue veya PR açmak yeterli" demeyin. Etkinlik listesinde yalnızca push, repo oluşturma ve uyarıları açma var.
- "Geri açmak için yeniden kurulum gerekir" demeyin. Herhangi bir push veya ayar değişikliği yeterli.
- "Bu bir güvenlik açığı" demeyin. Kaynak bir ürün davranış duyurusu; CVE veya exploit içermiyor.

## Durum

24 Kasım 2026 itibarıyla bu değişiklik **GitHub'ın changelog kaydıyla doğrulanmış**, CVE içermeyen bir ürün kararı. Doğrulanan bilgiler: 8 Aralık 2026 geçerlilik tarihi, üç maddelik etkinlik tanımı, uyarıların arşivlenip silinmemesi, push ile otomatik geri açılma, iki istisna, github.com/GHE Cloud kapsamı ve GHES dışlama. Belirsizlikler: "çoğu depo" ifadesinin kesin sınırı duyuruda yok; arşivlenen uyarıların arşivde ne kadar süre tutulduğu belirtilmiyor; Dependabot version updates ve dependency graph için ayrı bir davranış açıklanmıyor; data residency dışı GHE Cloud dağıtımları için ayrı bir not yok. "Uyarılar kalıcı olarak silindi", "Dependabot kapanıyor" veya "GHES de etkileniyor" başlıkları bu kayıtla desteklenmiyor.

## Bu seriden

- [Brotli 2shell: pip-audit ve Dependabot kör noktası](/blog/broccoli2shell-brotli-acigi)
- [Flowintel CVE-2026-133648](/blog/flowintel-tls-cve-2026-133648)
- [Apache Axis 1.x CVE-2026-90436](/blog/apache-axis-cve-2026-90436)

## Kaynaklar

- [GitHub Changelog: Dependabot alerts will pause on inactive repositories](https://github.blog/changelog/2026-11-10-dependabot-alerts-will-pause-on-inactive-repositories/)
