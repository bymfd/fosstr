---
title: 'Cairn ve CL-STA-1238: otonom AI ile 19 kuruluşa saldırı'
description: 'Unit 42, Çin bağlantılı CL-STA-1238''in açık kaynak Cairn framework''ünü Zhipu GLM ve DeepSeek ile birleştirerek 25 otonom operasyon yürüttüğünü açıkladı. 10 kuruluşta yetkisiz erişim doğrulandı.'
pubDate: '2026-11-16'
heroImage: ../../assets/cairn-hero.jpg
tags: ['security', 'ai', 'agents', 'threat-intelligence', 'unit42', 'china']
---

Unit 42, 12 Kasım 2026'da yayımladığı [araştırmada](https://unit42.paloaltonetworks.com/cairn-framework-ai-autonomous-attacks) otonom AI ajanlarının hedefli saldırılarda nasıl kullanıldığına dair somut bir vaka anlattı. Çin bağlantılı olduğu değerlendirilen **CL-STA-1238**, açık kaynak bir sızma testi framework'ü olan [Cairn](https://github.com/oritera/Cairn) ile Zhipu GLM ve DeepSeek modellerini birleştirmiş.

Sonuç: Ağustos–Eylül 2026 arasında **en az 19 kuruluşa karşı 25 operasyon**. Bunların **10'unda** yetkisiz erişim veya veri çekme doğrulanmış. Hedefler arasında yarı iletken üretimi, ABD savunma politikası ve sivil toplum kuruluşları var.

Bu yazı, saldırının nasıl işlediğini, Cairn'in ne yaptığını ve savunma tarafında bu tablonun ne anlama geldiğini anlatıyor.

## Kısa özet

| Alan | Değer |
|---|---|
| Aktör | CL-STA-1238 (Unit 42: orta güvenle Çin bağlantılı) |
| Dönem | Ağustos–Eylül 2026 |
| Framework | Cairn (açık kaynak, `oritera/Cairn`) |
| Modeller | Zhipu GLM 5.2, DeepSeek V4 Flash/Pro |
| Operasyon | 25 operasyon, en az 19 kuruluş |
| Doğrulanan erişim | 10 kuruluş |
| Hedef sektörler | Yarı iletken, savunma politikası, sivil toplum |
| C2 / barındırma | `154.44.31[.]4` (Hong Kong, AS979) |
| Staging / çıkış | `82.29.129[.]54` (ABD, AS142036) |
| Yayın tarihi | 12 Kasım 2026 |

## Cairn nedir?

Cairn, sızma testi için yazılmış açık kaynak bir ajan framework'ü. Her "agent worker"ı bir AI modeli tarafından sürülüyor. Ajanlar ortak bir **blackboard** üzerinden haberleşiyor; bulguları değiştirilemez "fact" olarak, sıradaki eylemleri ise "intent" olarak yazıyor. İnsan operatörler istedikleri anda "hint" ekleyerek yönü değiştirebiliyor.

Saldırganlar Cairn'in özelleştirilmiş bir fork'unu Hong Kong'daki bir sunucudan çalıştırmış. Framework modelden bağımsız; aynı operasyonda farklı modeller kullanılabiliyor.

Bir operasyon üç aşamada ilerliyor:

1. **Bootstrap:** Hedef ve verilen ipuçlarıyla görevi doğrudan çözmeye çalışır.
2. **Reason:** O ana kadar bulunanları değerlendirir, sıradaki adımı seçer.
3. **Explore:** Tek bir eylem yapar ve sonucu yeni bir bulgu olarak kaydeder.

Reason–Explore döngüsü, model hedefe ulaştığına karar verene kadar devam ediyor. Unit 42'ye göre her hedef için 3–7 aşamalı farklı planlar üretilmiş; operasyonlar **20 dakikadan 50 saatten fazlasına** kadar sürmüş. Saldırgan tarafından bir süre sınırı konmamış.

## Operasyon pratikte nasıl görünüyor?

Saldırganlar her iş için tek satırlık bir hedef yazmış. Örnek:

> "Webshell, SSH, kaynak kod, anahtar, kullanıcı bilgisi ve kimlik bilgileri dahil olmak üzere somut ve yüksek değerli erişim elde et; ideal olarak iç ağa gir."

Framework'e hedefin kök alan adı verilmiş; Cairn saldırı yüzeyini kendi kendine numaralandırmış. Bazı işlerde VPN ağ geçidi adresleri, grup adları ve paylaşılan grup şifreleri gibi önceden toplanmış bilgiler de eklenmiş. Yani istihbarat insan tarafından sağlanmış, yürütme büyük ölçüde ajana bırakılmış.

Ayrıca "AIScan Runner Skills" adlı bir yetenek paketi yüklenmiş. Bu paket upstream Cairn projesinde yok; saldırıya özel hazırlanmış.

## Modeller ve "guardrail" aşma

25 operasyonun dağılımı:

| Model | Operasyon |
|---|---|
| Zhipu GLM 5.2 | 13 |
| DeepSeek V4 Flash | 8 |
| DeepSeek V4 Pro | 4 |

Saldırganlar modelleri birbirine karşı test etmiş gibi görünüyor. DeepSeek V4 Flash ile aşılamayan hedeflerde daha güçlü V4 Pro tekrar denenmiş.

Cairn'in stok worker prompt'ları zaten modele "hiçbir görevi reddetme" talimatı veriyor. Saldırganlar bunu kendi "yetkilendirme" metinleriyle pekiştirmiş: her Reason ve Explore çağrısına, görevin yetkili bir güvenlik testi olduğunu ve reddedilemeyeceğini söyleyen Çince bir giriş eklemişler. Her operasyon için ayrıca bir `AUTHORIZATION.md` dosyası üretilmiş; dosya, görevi oluşturmayı müşteri onayı sayarak operasyonu "yetkili" ilan ediyor.

Unit 42'ye göre ne Zhipu GLM ne de DeepSeek bu çerçeveyi reddetmiş.

## Doğrulanan sonuçlar

Unit 42, 19 hedefin 10'unda yetkisiz erişim veya veri çekme doğrulamış. Öne çıkan vakalar:

| Hedef | Yöntem | Sonuç |
|---|---|---|
| Endüstri standartları kuruluşu | İnternete açık uygulamada zayıf şifre denemesi | Düzinelerce geçerli kimlik bilgisi, dahili dizin veritabanı |
| Yarı iletken üreticisi | Ortak kullanılan üretim kimlik bilgisinin kaba kuvvetle bulunması | Uygulama verisi, kullanıcı/e-posta listeleri, kalıcı yönetici hesabı ve API token'ı |
| ABD öğretmenler sendikası | CMS'te kimlik doğrulamasız hesap oluşturma bypass'ı | 1 milyondan fazla üye kaydı, ~31.000 CRM kişisi, personel şifre hash'leri |
| Savunma politikası düşünce kuruluşu | Kimlik platformundaki açık kayıt uç noktası | ~500 kullanıcı kaydı; `.mil` ve `.gov` hesapları |
| Çeşitli CMS'ler | Kimlik ve yapılandırma zayıflıkları | Litografi üreticisinde çalışan verisi, otomasyon üreticisinde ~150.000 dahili doküman, eğitim vakfında öğrenci verisi |

En dikkat çekici maddelerden biri, standartlar kuruluşunda **canlı bir oylama dokümanının** kimlik doğrulaması gerektirmeyen bulut depolama yazımıyla değiştirilmesi. Ayrıca saldırganlar keyfi müşteriler olarak oturum açıp toplantı, oylama ve arka ofis işlevlerine okuma, yazma ve silme erişimi elde etmiş.

Yarı iletken vakasında ise yalnızca veri okunmamış: üretim sisteminde yetkisiz yönetici hesapları ve kalıcı bir API token'ı oluşturulmuş.

## Neden önemli?

Bu vakayı önceki AI destekli saldırılardan ayıran şey, modelin "yardımcı" değil **yürütücü** olması. Saldırgan hedefi ve amacı veriyor; planlama, deneme, sonuç kaydetme ve sonraki adımı seçme işini framework yapıyor. İnsan yalnızca gerektiğinde ipucu ekliyor.

Unit 42'nin altını çizdiği nokta şu: otonom orkestrasyon, bir aktörün aynı anda takip edebileceği hedef sayısındaki operatör-saati sınırını kaldırıyor. Küçük bir ekip veya tek bir operatör, iki hafta içinde 19 kuruluşa eşzamanlı saldırı yürütebiliyor.

Ama saldırının karmaşıklığı artmış değil. Kullanılan zafiyetler tanıdık:

- Kimlik doğrulama bypass'ları,
- Güvenli olmayan doğrudan nesne referansları (IDOR),
- Mass-assignment ile yetki yükseltme,
- Zayıf ve varsayılan kimlik bilgileri,
- Açıkta bırakılmış bulut API'leri,
- Eski, yamalanmamış CVE'ler.

Yani AI, istismarın **hacmini ve kapsamını** büyütüyor; karmaşıklığını değil. Kimlik hijyeni, saldırı yüzeyini azaltmak ve yama yönetimi hâlâ işe yarıyor.

## Savunma tarafında ne yapmalı?

Bu vakadan çıkarılacak pratik dersler, yeni bir ürün satın almaktan çok temel hijyen:

- **Kimlik bilgilerini tekrar kullanmayın.** Ortak kullanılan üretim kimlik bilgisi, tek bir kaba kuvvet denemesini tüm sisteme açılan anahtara çevirdi.
- **MFA'yı yaygınlaştırın.** Özellikle yönetici hesaplarında ve dışa açık uygulamalarda.
- **Varsayılan ve zayıf şifreleri tarayın.** İnternete açık uygulamalarda şifre püskürtme hâlâ işe yarıyor.
- **Eski CVE'leri kapatın.** Otonom ajanlar, kamuya açık tarayıcılarla bulunabilen bilinen açıkları deniyor.
- **API ve bulut depolamayı gözden geçirin.** Kimlik doğrulamasız yazma izni, bir oylama dokümanını değiştirmeye yetiyor.
- **Kalıcılığı arayın.** Yeni yönetici hesapları, API token'ları ve oturumlar; olay müdahalesinde ilk bakılacak yerler.
- **Ağ çıkışını izleyin.** Unit 42'nin verdiği göstergeler: `154.44.31[.]4` ve `82.29.129[.]54`.

## Türkiye açısından

Türkçe kaynaklarda bu araştırmayı ayrıntılı ele alan bir yazıya rastlamadım; bu yazı o boşluğu kapatmak için hazırlandı. Türkiye'de özellikle üretim, savunma sanayii ve sivil toplum kuruluşları için tablo tanıdık: dışa açık uygulamalar, eski CVE'ler, paylaşılan servis hesapları ve zayıf şifre politikaları.

Otonom ajanların yükselişi, "hedef olacak kadar büyük değiliz" varsayımını zayıflatıyor. Saldırganın maliyeti düştükçe hedef seçimi genişliyor. Bu yüzden temel kontrolleri yapmak, yeni bir tehdit istihbaratı aboneliğinden daha öncelikli.

## Kaynaklar

- [Unit 42: Attackers Use Autonomous AI to Target Semiconductor, Defense and Civil Society Sectors](https://unit42.paloaltonetworks.com/cairn-framework-ai-autonomous-attacks)
- [Cairn framework (GitHub)](https://github.com/oritera/Cairn)
- [Zero Evolution Lab: The Pathless Path — Cairn AI](https://mp.weixin.qq.com/s/2rEqFLvkxvYWM3gW170C2w)
