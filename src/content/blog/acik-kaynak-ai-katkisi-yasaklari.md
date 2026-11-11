---
title: '22 açık kaynak proje neden AI katkısı kabul etmiyor?'
description: 'immich''ten QEMU''ya, Zig''den Gentoo''ya kadar 22 proje AI üretimi katkıları yasaklıyor. Politikaların ortak noktaları, gerekçeleri ve katkıcılar için pratik sonuçları.'
pubDate: '2026-11-11'
heroImage: ../../assets/blog-placeholder-4.jpg
tags: ['open-source', 'ai', 'llm', 'github', 'community', 'ethics']
---

Açık kaynak dünyasında 2026'nın en tartışmalı konularından biri, AI ile üretilmiş katkıların kabul edilip edilmeyeceği. Bazı projeler "AI desteği serbest, sorumluluk katkıcıda" derken, bazıları kapıyı tamamen kapatıyor.

[Open Source Says No](https://osssaysno.com/) adlı site, bu politikaları tek yerde topluyor. 11 Kasım 2026 itibarıyla sitede **22 proje** "Banned" kategorisinde listeleniyor; yani üretken AI ile oluşturulmuş katkıları kabul etmiyor. Site, politikaları kendi yorumuyla değil, projelerin resmî metinlerinden alıntılayarak ve doğrulama tarihiyle birlikte yayınlıyor.

Bu yazı, listenin öne çıkan örneklerini, yasakların ortak gerekçelerini ve bir katkıcı olarak ne yapmanız gerektiğini anlatıyor.

## Liste nasıl oluşuyor?

Sitenin [hakkında sayfasına](https://osssaysno.com/about) göre bir proje listeye girmek için iki koşuldan birini sağlamalı:

- En az **5.000 GitHub yıldızı** olmalı, veya
- Yıldız sayısından bağımsız olarak **yaygın kullanılan altyapı** olmalı (dağıtım, dil çalışma zamanı, büyük kütüphane, forge).

Her giriş, projenin resmî politika metnine veya o politikayı belirten sayfaya bağlanıyor ve ilgili pasajı **birebir alıntılıyor**. Etiketleme, politikanın kendi ifadesine göre yapılıyor; site etiketi yukarı veya aşağı çekmiyor. Üç kategori var:

| Kategori | Anlamı |
|---|---|
| **Banned** | AI ile üretilmiş katkılar tamamen veya büyük ölçüde yasak |
| **Restricted** | AI desteği yalnızca koşullarla serbest (bildirim, kapsam sınırı, insan incelemesi) |
| **Assist allowed** | AI desteği serbest, sorumluluk katkıcıda |

Yazı sırasında "Banned" listesinde 22 proje var. Bu sayı sabit değil; politikalar değiştikçe güncelleniyor.

## Öne çıkan projeler

| Proje | Yıldız (yaklaşık) | Politika özeti |
|---|---|---|
| **immich** | 118.800 | "LLM ile üretilmiş PR açmayın" |
| **Meilisearch** | 59.800 | Kod, test, doküman, PR/issue metni dahil AI üretimi kabul edilmiyor |
| **okhttp** | 47.100 | Kaynak kodda ve dokümanda LLM/üretken araç kullanılmıyor |
| **Servo** | 38.100 | LLM veya olasılıksal araçlarla üretilmiş içerik yasak |
| **stb** | 34.900 | AI ile üretilmiş kod, doküman ve hatta AI ile incelenmiş hata raporu yasak |
| **Redox OS** | 16.600 | LLM üretimi katkı kabul edilmiyor |
| **MonoGame** | 14.600 | Yeni kod, doküman, hata düzeltmesi ve sanat dahil tüm AI içeriği yasak |
| **QEMU** | 13.800 | AI üretimi olduğu düşünülen katkılar reddediliyor |
| **Zig** | 6.800 | "Yama / pull request için LLM yok" |
| **Gentoo Linux** | — | NLP/AI aracıyla üretilmiş her türlü içerik açıkça yasak |

Listede ayrıca Fyrox, libvips, pdfcpu, endless-sky, Veloren, Flask-SocketIO, fast-check, gh-dash, ArchiveTune, Modern-CPP-Programming, awesome-claude-skills ve sebastianbergmann/recursion-context gibi projeler var. Zig Codeberg'de, Gentoo kendi altyapısında; geri kalanı ağırlıklı olarak GitHub'da.

## Ortak gerekçeler

Politikaların metinlerine bakınca birkaç tema öne çıkıyor.

**1. İnceleme yükü.** Bir AI ajanı saatler içinde yüzlerce satırlık PR üretebiliyor. Bunu incelemek, test etmek ve doğrulamak yine insan zamanı istiyor. Projeler, "üretmek kolay, incelemek zor" dengesinin kendi aleyhlerine bozulduğunu söylüyor. Özellikle küçük ekipler için bu, gönüllü bakımcıların tükenmesine yol açıyor.

**2. Sorumluluk ve anlayış.** Bir katkının altına imza atan kişinin, o kodu anladığını ve savunabileceğini varsaymak istiyorlar. AI ile üretilmiş bir yamayı gönderen kişi, hata çıktığında ne olduğunu açıklayamıyorsa, bakım yükü yine projeye kalıyor. stb'nin politikası bunu sert biçimde ifade ediyor: AI ile incelenmiş hata raporları bile kabul edilmiyor; çünkü raporun doğruluğu ve bağlamı kaybolabiliyor.

**3. Telif ve kaynak (provenance).** AI çıktısının hangi eğitim verisinden türediği çoğu zaman bilinmiyor. Projeler, lisans uyumluluğu ve telif riski taşıyan kodu kabul etmek istemiyor. Bu, özellikle hukuki olarak temkinli projelerde öne çıkan bir gerekçe.

**4. Kalite ve güvenlik.** AI, ikna edici görünen ama yanlış kod üretebiliyor. Güvenlik açığı, bellek hatası veya sessiz mantık hatası içeren bir yama, inceleme sürecinden geçse bile üretime sızabiliyor. QEMU gibi düşük seviyeli projelerde bunun maliyeti yüksek.

**5. Topluluk kültürü.** Bazı projeler açıkça "el yapımı" olmayı bir değer olarak görüyor. Fyrox'un "AI-generated slop kabul edilmez, bu el yapımı bir oyun motoru" ifadesi bunun örneği. Bu, teknik bir gerekçeden çok kültürel bir tercih.

## "AI desteği" ile "AI üretimi" aynı şey değil

Politikaların çoğu, "AI'ı hiç kullanmayın" demiyor; **AI ile üretilmiş içeriği göndermeyin** diyor. Aradaki fark önemli:

- Yerel olarak AI'dan fikir almak, kod okumak, hata ayıklamak veya test senaryosu üretmek genellikle yasak değil.
- Ama ürettiğiniz kodu anlamadan, test etmeden, kendi cümlelerinizle açıklamadan PR olarak göndermek birçok projede yasak.
- Bazı projeler AI kullanımının **bildirilmesini** istiyor; bazıları hiçbir şekilde kabul etmiyor.
- "AI ile incelenmiş" veya "AI ile özetlenmiş" katkılar bile bazı projelerde sorunlu; çünkü inceleme sürecinin kendisi AI'a devredilmiş oluyor.

Yani soru "AI kullandım mı?" değil, "gönderdiğim katkının sahibi ve sorumlusu ben miyim?" olmalı.

## Katkıcı olarak ne yapmalı?

**1. Önce CONTRIBUTING dosyasını okuyun.** Projenin politikası README'de değil, `CONTRIBUTING.md`, `CONTRIBUTING` veya kendi web sitesindeki "contribute" sayfasında olabilir. QEMU gibi projelerde GitHub PR'ları kapalı; süreç tamamen farklı işliyor.

**2. Politikayı yorumlamaya çalışmayın.** "Küçük bir düzeltme, AI sayılmaz" veya "sadece doküman, kod değil" gibi esnetmeler çoğu politikada açıkça yasak. Meilisearch örneğinde doküman, test, PR açıklaması ve issue yorumu dahil her şey kapsamda.

**3. AI'ı yerel araştırma için kullanın, teslimatta kullanmayın.** Kod tabanını anlamak, olası çözümleri karşılaştırmak veya test yazmak için AI'dan yardım alabilirsiniz; ama gönderdiğiniz metni ve kodu kendi kelimelerinizle yeniden yazın, satır satır anlayın ve savunabileceğinizden emin olun.

**4. Açıkça bildirin.** Politika AI kullanımını yasaklamıyorsa bile, katkı açıklamasında AI'dan nasıl yararlandığınızı belirtmek güven oluşturur. Bazı projeler bunu zorunlu tutuyor; bazıları teşvik ediyor.

**5. Saygılı olun.** Bakımcıların zamanı sınırlı. "Sadece bir PR" diye ısrar etmek, politikayı sorgulamak veya AI ile yeniden denemek, kalıcı yasakla sonuçlanabilir. recursion-context politikası bunu açıkça söylüyor: büyük ölçüde AI üretimi bir PR göndermek, projeden yasaklanmanıza yol açar.

## Bakımcılar için not

Politika yazmak, uygulamaktan kolay. Birkaç pratik öneri:

- Politikayı `CONTRIBUTING.md` içinde, kısa ve net tutun; "AI" kelimesini açıkça kullanın.
- Hangi kapsamın yasak olduğunu belirtin: kod, test, doküman, issue, çeviri, sanat.
- AI kullanımının bildirilmesini mi istiyorsunuz, tamamen mi yasaklıyorsunuz, yoksa koşullu mu izin veriyorsunuz? Bunu örneklerle yazın.
- Tespit zor; ama tutarlı bir politika, en azından beklentiyi netleştirir ve tartışmayı azaltır.
- Katkıyı reddederken gerekçeyi politikaya bağlayın; kişisel yargı gibi görünmesin.

## Büyük resim

Bu liste, açık kaynağın AI karşısında tek bir tavır almadığını gösteriyor. Bazı projeler AI'ı bir üretkenlik aracı olarak görüp kurallara bağlıyor; bazıları ise inceleme yükü, telif belirsizliği ve kültürel nedenlerle kapıyı kapatıyor.

Türkiye'de açık kaynağa katkı veren geliştiriciler için pratik sonuç şu: **hedef projenin politikasını okumadan AI destekli PR göndermeyin.** Küçük bir doküman düzeltmesi bile, projenin kuralına takılırsa hem emeğiniz boşa gider hem de hesabınız riske girer.

Liste 22 projeyle sınırlı değil; siteye yeni projeler ekleniyor ve mevcut politikalar değişiyor. Katkı göndermeden önce bir kez daha kontrol etmek, en ucuz önlem.
