---
title: 'Burger King ve McDonald''s tweet''lerindeki eski Bitly linkleri ele geçirildi'
description: '15 Kasım 2026''da eski bit.ly adreslerinin arka yarıları yeniden kaydedildi. 2011 tweet''leri Nazi kampları ve 11 Eylül sayfalarına yönlendi; Bitly sorunu doğruladı ve hesapları askıya aldı.'
pubDate: '2026-11-16'
heroImage: ../../assets/blog-placeholder-5.jpg
tags: ['security', 'bitly', 'link-hijacking', 'social-media', 'privacy']
---

15 Kasım 2026'da X'te tuhaf bir şey oldu: Burger King'in 2011'de attığı bir tweet, restoran bulucu yerine Wikipedia'nın **Nazi toplama kampları** listesine gitmeye başladı. McDonald's'ın 2011 tarihli bir tweet'i ise **11 Eylül saldırıları** maddesine yönleniyordu.

İki hesap da ele geçirilmedi. Tweet'ler de değiştirilmedi. Değişen şey, tweet'lerin içindeki **Bitly kısa linklerinin nereye gittiği** oldu. Birileri, eski linklerin arka yarılarını yeniden kaydettirdi.

Bu yazı, olayın nasıl gerçekleştiğini, ne kadar yaygın olduğunu ve eski kısa linklerin neden hâlâ bir risk olduğunu anlatıyor.

## Kısa özet

| Alan | Değer |
|---|---|
| Tarih | 15 Kasım 2026 |
| Etkilenenler | Burger King, McDonald's, Donald Trump; CNN'e göre Bill Gates, Justin Trudeau, Mike Pence, FBI, ABD Savunma Bakanlığı |
| Yöntem | Eski Bitly linklerinin arka yarısının yeniden kaydedilmesi |
| Burger King linki | `bit.ly/19BFiM`, 05:32 UTC'de yeniden oluşturuldu |
| McDonald's linki | `bit.ly/mLWJO0`, 05:14 UTC'de yeniden oluşturuldu |
| Trump taraması | 97 link: 40 orijinal, 49 yeniden oluşturulmuş ama doğru yere gidiyor, 7 başka yere, 1 engelli |
| Bitly açıklaması | 19:13 UTC'de sorun doğrulandı; hesaplar askıya alındı, linkler devre dışı bırakılıyor |

## Ne oldu?

Burger King, 24 Temmuz 2011'de restoran bulucusunu tanıtan bir tweet attı. Tweet'in içindeki `bit.ly/19BFiM` linki, 2026'da yeniden kaydedildi ve Wikipedia'nın Nazi toplama kampları listesine yönlendirildi. Linkin Bitly bilgi sayfası, oluşturulma zamanını **15 Kasım 2026, 05:32 UTC** olarak gösteriyor.

Aynı sabah, 18 dakika önce, McDonald's'ın 7 Haziran 2011 tarihli tweet'indeki `bit.ly/mLWJO0` de yeniden oluşturulmuş ve 11 Eylül saldırıları maddesine yönlendirilmişti.

Hiçbir markanın hesabından yeni bir paylaşım yapılmadı. Eski tweet'ler olduğu gibi duruyor; yalnızca linkin hedefi değişti. Burger King'in tweet'i kısa süre içinde erişilemez hale geldi; McDonald's tweet'i ise 404 döndü. Bunu markaların mı yoksa X'in mi kaldırdığı bilinmiyor.

Olayı ilk fark edenlerden Alex Greenland, iki değişikliğin zamanlamasına dikkat çekti: 05:14 ve 05:32. Aynı kişi veya grubun işi olabilir; ancak bunu kanıtlayan bir veri yok.

## Sadece iki marka değil

Ransomnews, Donald Trump'ın 2009–2013 arasındaki tweet'lerinden 97 Bitly linkini inceledi. Sonuç:

| Durum | Link sayısı |
|---|---|
| Hâlâ orijinal | 40 |
| Yeniden oluşturulmuş, tweet'in işaret ettiği yere gidiyor | 49 |
| Yeniden oluşturulmuş, başka yere gidiyor | 7 |
| Bitly tarafından zararlı/spam olarak engellenmiş | 1 |

49 linkin 48'i, 26 Mayıs 2023'te 17 dakikalık bir aralıkta yeniden oluşturulmuş. Bu, linklerin nereye gittiğini bilen birinin yaptığı bir onarım işi gibi görünüyor. Yani arka yarılar en az 2023'ten beri yeniden alınabiliyormuş.

15 Kasım'da yeniden oluşturulan yedi linkten dördü, bir Roblox profiline, bir YouTube videosuna (iki kez) ve Trump–Jeffrey Epstein maddesine gidiyor. İki link ise kripto hizmetlerinin adını taklit eden alan adlarına yönleniyor: `worldlibertyfinancial-ai[.]com` ve `dappradars[.]website`.

CNN, aynı akşam Bill Gates, Justin Trudeau, Mike Pence, FBI ve ABD Savunma Bakanlığı'nın eski paylaşımlarında da yönlendirilmiş Bitly linkleri bulunduğunu bildirdi. Ransomnews bu hesapları kendisi doğrulamadı.

## Bitly linki nasıl ele geçirilir?

Bitly linkinin sonundaki kısma **back-half** deniyor. Bitly bunu rastgele üretiyor veya kullanıcı özel bir ad seçiyor. Eski link ortadan kalktığında ve arka yarı yeniden alınabildiğinde, o linki taşıyan her tweet, e-posta, PDF veya basılı QR kod yeni sahibinin seçtiği yere gidiyor.

Bu iş için şifre çalmak veya hesaba girmek gerekmiyor. Marka tarafında hiçbir uyarı oluşmuyor; çünkü markanın hesabında bir değişiklik yok.

Bitly'in kendi yardım sayfası, hesap silinse bile linklerin çalışmaya devam ettiğini ve arka yarıların "yeniden kullanılamayacağını" söylüyor. Ayrı bir sayfa ise üç yıl hareketsiz kalan hesapların silindiğini belirtiyor. 15 Kasım'da toplanan oluşturulma tarihleri ilk ifadeyle çelişiyor: 2009–2012 tweet'lerinde görünen arka yarılar, 2023'ten bugüne oluşturulmuş linklere ait.

Bu ilk kez de olmuyor. Şubat 2025'te Disruptionist, kripto para tanıtımcılarının Trump ve Melania Trump'ın 2013 paylaşımlarındaki Bitly linklerini token listelerine yönlendirdiğini bildirmişti. O dönemde bir hata nedeniyle arka yarıların, orijinal link veya hesap silindiğinde yeniden alınabildiği ve Bitly'in bunu düzelttiği söylenmişti. 15 Kasım 2026'da oluşturulan linkler, aynı şeyin hâlâ mümkün olduğunu gösteriyor.

## Zaman çizelgesi

| UTC | Olay |
|---|---|
| 14 Kasım, 23:52 | 2013 tarihli bir Trump tweet'indeki link yeniden kaydedildi (Steam sayfası) |
| 15 Kasım, 01:04 | 2012 tarihli bir Trump tweet'indeki link yeniden kaydedildi (YouTube) |
| 05:14 | McDonald's linki yeniden kaydedildi (11 Eylül maddesi) |
| 05:32 | Burger King linki yeniden kaydedildi (Nazi kampları listesi) |
| 06:51 | Bir X kullanıcısı Burger King tweet'ini alıntıladı; gönderi milyonlarca görüntülenme aldı |
| 07:49–09:57 | Dört Trump linki daha yeniden kaydedildi |
| 19:13 | Bitly sorunu doğruladı |
| 19:22 | Etkilenen linkler "Link Deactivated" sayfası döndürmeye başladı |

Bitly, 19:13 UTC'de X üzerinden yaptığı açıklamada "eski ve aktif olmayan belirli linklerin kötü niyetli aktörler tarafından yeniden kullanılmasına izin veren bir sorun" tespit ettiklerini söyledi. İlgili hesapların askıya alındığını ve etkilenen linklerin devre dışı bırakıldığını ekledi. Kaç linkin ele geçirildiği veya bunun nasıl olduğu açıklanmadı.

## Bu neden önemli?

15 Kasım'daki örnekler şaka gibi görünüyor: Wikipedia sayfası, oyun profili, video. Ama aynı yöntem dolandırıcılık için de çalışıyor.

- Eski bir tweet'teki link, doğrulanmış bir markanın, bankanın, bakanlığın veya haber sitesinin hesabından geliyor gibi görünüyor. X, gönderiyi yazıldığı gibi gösteriyor; okuyucunun şüphelenmesi için bir neden yok.
- Aynı kısa linkler eski e-postalarda, PDF'lerde, sunumlarda, basılı QR kodlarda ve yardım sayfalarında duruyor.
- Link bir kez ele geçirildiğinde, arkasındaki alan adı düştüğünde bir kez daha el değiştirebiliyor.

Güvenlik literatüründe buna **broken link hijacking** (kırık link ele geçirme) deniyor: link, işaret ettiği şeyden daha uzun yaşıyor ve yerine başkası geçiyor. 2025'teki dalga kripto token'larına yönelikti; 2026'daki dalganın bir kısmı da kripto hizmetlerini taklit eden alan adlarına gidiyor.

## Kendinizi nasıl korursunuz?

**Linkin nereye gittiğini kontrol edin.** Bir `bit.ly` linkinin sonuna `+` ekleyin. Bitly, linkin hedefini ve oluşturulma tarihini gösterir. Tarih, linkin bulunduğu paylaşımdan sonraysa link artık orijinal değildir. Ancak devre dışı bırakılmış linklerde bu bilgi görünmeyebilir.

**Eski linkleri envanterleyin.** Kurumsal hesaplarda yıllar önce paylaşılmış kısa linkleri dışa aktarın ve tek tek kontrol edin. Değiştirilmiş linkleri taşıyan paylaşımları kaldırın veya Bitly'e bildirin.

**Yeni linklerde kendi alan adınızı kullanın.** `marka.co/kampanya` gibi kendi kontrolünüzdeki bir kısa alan adı, üçüncü tarafın arka yarısını yeniden dağıtmasını engeller.

**Eski veya doğrulanmış hesap diye linke güvenmeyin.** Hesap sahibi, linkin bugün nereye gittiğini kontrol etmiyor olabilir. Özellikle oturum açmanızı veya kripto cüzdan bağlamanızı isteyen sayfalarda dikkatli olun.

## Belirsizlikler

- Bitly, sorunun kök nedenini ve kaç linkin etkilendiğini açıklamadı.
- Etkilenen linklerin bir kısmı devre dışı bırakıldı; ancak 26 Mayıs 2023'te yeniden oluşturulan 49 link hâlâ çalışıyor.
- Burger King ve McDonald's'tan konuya ilişkin bir açıklama yok.
- CNN'in bildirdiği diğer hesaplar Ransomnews tarafından bağımsız olarak doğrulanmadı.

Yine de tablo net: Kısa link bir kez yayımlandığında, arkasındaki hizmetin onu sonsuza kadar koruyacağını varsaymak doğru değil. Eski paylaşımlar, bugünün yönlendirme altyapısıyla çalışmaya devam ediyor.

## Kaynaklar

- [Ransomnews: Old Bitly links hijacked in Burger King, McDonald's and Trump tweets](https://ransomnews.com/burger-king-tweet-bitly-link-hijack-2026/)
- [Bitly'nin X açıklaması (15 Kasım 2026)](https://twitter.com/bitly/status/2122045450786152588)
- [CNN: Past X posts with links redirecting to unrelated websites](https://edition.cnn.com/2026/11/15/business/political-and-corporate-x-posts-have-links-redirecting-to-vulgar-racist-or-random-websites)
- [Disruptionist: Crypto scammers hacked Trump's tweets via a bug (Şubat 2025)](https://www.disruptionist.com/p/crypto-scammers-hacked-trumps-tweets-via-bug)
- [Bitly Help: Hesap silindikten sonra linkler ne olur?](https://support.bitly.com/hc/en-us/articles/360059651871-What-happens-to-my-personal-information-links-and-QR-Codes-after-my-account-is-deleted)
- [Acunetix: What is broken link hijacking](https://www.acunetix.com/blog/web-security-zone/broken-link-hijacking/)
