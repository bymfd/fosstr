---
title: 'iPhone Duo ilk gününde iki kez kırıldı: ekran çatlağı ve jailbreak'
description: 'iPhone Duo çıktığı gün Calif tarafından jailbreak''lendi; ekran çatlakları raporlandı. iOS 27.1, 27.2 yaması ve iFixit''in hinge analizi ne anlama geliyor?'
pubDate: '2026-10-26'
heroImage: ../../assets/iphone-duo-jailbreak-hero.jpg
tags: ['apple', 'ios', 'jailbreak', 'security', 'donanim']
---

23 Ekim 2026 Cuma, Apple'ın ilk katlanabilir telefonu iPhone Duo'nun çıkış günüydü. Aynı gün iki ayrı "kırılma" haberi geldi. Önce MacRumors, "Crackgate?" başlığıyla [ekranı hinge boyunca çatlayan iPhone Duo fotoğraflarını](https://www.macrumors.com/2026/10/23/iphone-duo-screen-cracks/) yayımladı. Ardından Calif ekibi, [iOS 27.1 çalıştıran bir iPhone Duo'yu jailbreak'lediğini](https://www.macrumors.com/2026/10/23/iphone-duo-jailbreak/) gösteren videolar paylaştı.

Bu iki olayı aynı cümlede kurmak kolay: Apple'ın yeni telefonu hem fiziksel hem yazılımsal olarak kırıldı. Ama aynı şey değiller. Biri ilk nesil donanımın bilinen riski; diğeri Apple'ın bellek güvenliği mimarisine çıkış gününde yapılmış bir itiraz. Ve ikincisi, haftanın en az konuşulan güvenlik hikâyesi.

## Calif ne gösterdi?

Calif'in [paylaştığı videoda](https://x.com/calif_io/status/2113578130543882697) iPhone Duo'nun ikonları ve widget'ları ekranda zıplıyor, cihaza bir anime karakteri ekleniyor. Bu bir kullanıcı aracı değil; bir araştırma gösterimi. Ekip bir hafta önce de iPhone 18 Pro üzerinde iOS 27.0.1'i jailbreak'lemiş, cihazın yeniden başlatıldıktan sonra da root erişimini koruduğunu göstermişti.

Bu kısım önemli: jailbreak **untethered**. Yani cihazı her açtığınızda bilgisayara bağlayıp yeniden exploit çalıştırmanız gerekmiyor. Heise'in ifadesiyle bu, iOS 9'dan bu yana reboot'a dayanan ilk jailbreak. Apple'ın son yıllarda jailbreak sahnesini neredeyse tamamen kapattığı düşünülürse, iddia tek başına manşetlik.

Ama Calif'in kendi anlatımına göre ortada indirilecek bir araç yok. Şirketin güvenlik araştırmacılarından Stefan Esser, Heise'e [şunları söyledi](https://www.heise.de/en/news/Calif-io-jailbreak-How-the-untethered-tool-cracks-iOS-27-0-1-11492321.html): son kullanıcılar için bir jailbreak aracı yayımlamayı planlamıyorlar; açıkların bir kısmı Apple'a bildirildi, bir kısmı da bildirilecek. Bir proof of concept yayımlanabilir. Yani "iPhone Duo jailbreak indir" arayan biri, büyük ihtimalle sahte veya zararlı bir şey bulacak.

## MIE'nin anlamı ne?

Calif'in gösterimi, Apple'ın son dönemde en çok güvendiği savunmalardan birini de hedef alıyor: **Memory Integrity Enforcement (MIE)**. Apple, MIE'yi ARM'in Enhanced Memory Tagging Extension (EMTE) üzerine kuruyor ve bellek bozulması hatalarının sömürülmesini zorlaştırmayı vaat ediyor. Heise'e göre Calif, bu korumayı da atlatan bir zincir gösterdi.

Bu, "bütün iPhone'lar ele geçirildi" demek değil. Ortada herkese açık bir exploit zinciri yok; videolar bir araştırma ekibinin laboratuvar sonucu. Ama "MIE varsa bellek açığı pratikte sömürülemez" varsayımının mutlak olmadığını gösteriyor. Güvenlikte "atlatılamaz" katman yoktur; sadece maliyeti ve gereken uzmanlık artar. Calif'in gösterdiği şey, o maliyetin launch gününde bile ödenebildiği.

## 27.2 gelene kadar

iPhone Duo, iOS 27.1 ile kutudan çıkıyor. Esser'e göre açıkların **çoğu** iOS 27.2 beta'sında kapatıldı. "Çoğu" kelimesinin altını çizmek gerekiyor: bu, hepsinin kapandığı anlamına gelmiyor. Ayrıca yama beta'da olsa bile genel kullanıma çıkana kadar birçok cihaz 27.1'de kalacak.

Calif'in videolarında gösterilen giriş noktaları da rahatsız edici: iMessage ve Signal üzerinden gönderilen, kullanıcının tıkladığı kötü niyetli PDF dosyaları; özel bir uygulama; ve reboot sonrası kalıcılık. Yani teoride kullanıcının bir "jailbreak" kurması gerekmiyor; yanlış dosyaya dokunması yetiyor. Pratikte ise bu zincir kamuya açık olmadığı için risk, sıradan bir kullanıcı için düşük. İki cümle arasındaki fark, güvenlik açıklarının neden bu kadar zor anlatıldığının da cevabı.

En somut tavsiye basit: iOS 27.2 yayınlandığında geciktirmeden kurun. Apple'ın yama takvimi ile araştırmacının zaman çizelgesi arasındaki yarış, bu tür açıklarda en belirleyici değişken.

## AI, exploit ve "bilim kurgu" sınırı

Esser, jailbreak'in geliştirilmesinde AI'ın da kullanıldığını söyledi ama nasıl kullanıldığını açıklamadı. Verdiği çerçeve, "AI iPhone'u hackledi" manşetinden çok daha ilginç:

> "Bir modele iPhone'u gösterip 'hackle' demek hâlâ bilim kurgu."

Esser'e göre AI, zafiyet bulma tarafında ciddi bir hız kazandırıyor; ancak bir çökme bulmak ile MTE altında çalışan, kararlı bir exploit yazmak arasında büyük fark var. Son modeller birkaç ay öncesine göre büyük sıçrama yapmış olsa da, "zor hedeflerde" insan uzmanlığı hâlâ merkezde. Bu, geçen hafta [Broccoli2Shell yazısında](/blog/broccoli2shell-brotli-acigi/) konuştuğumuz tablonun devamı: AI'ın bulduğu hata sayısı artıyor, ama sömürülebilir "unicorn"ları seçip kararlı exploit'e dönüştürmek ayrı bir iş.

Calif'in AI'ı hangi aşamada, ne kadar kullandığını bilmiyoruz. Bu yüzden "AI jailbreak yaptı" demek yanlış olur. Söylenebilecek doğru şey şu: AI, exploit araştırmasının maliyetini düşürüyor; bu da launch ile ilk ciddi saldırı arasındaki süreyi kısaltıyor.

## Crackgate: fiziksel kırılma

Jailbreak haberinden önce gelen çatlak haberleri, tüketici tarafında daha fazla yankı uyandırdı. MacRumors'a göre çatlakların neredeyse tamamı hinge boyunca ve çoğu, ekranın bir tarafında parlak bir piksel çizgisi olarak görünüyor. Avustralya'daki bir kullanıcı, cihazı **20'den az** açıp kapattıktan sonra çatladığını, öncesinde görünür bir hasar olmadığını söyledi. Apple Store'a gittiğinde cihazı hemen değiştirmişler.

Çin'deki demo cihazlarında da kırık ekran fotoğrafları paylaşıldı; ancak bu fotoğrafların arka planı bilinmiyor ve kullanıcı hasarı ihtimali var. MacRumors da yaygınlığın bilinmediğini, bazı arızaların normal olduğunu ve erken inceleme yapan bazı kişilerin sorun yaşamadığını not ediyor. Yani "her iPhone Duo çatlıyor" demek için elimizde yeterli veri yok; "ilk partide hinge tarafında bir sorun var" demek için ise yeterince rapor var.

Kamuoyunun ilgisi de bunu doğruluyor: 26 Ekim itibarıyla MacRumors'un jailbreak haberinde 49 yorum varken çatlak haberinde 596 yorum var. [Hacker News'te jailbreak başlığı](https://news.ycombinator.com/item?id=50206680) yalnızca 4 puan aldı. İnsanlar iPhone'un hacklenmesinden çok, kırılmasını merak ediyor. Bu, güvenlik araştırmasının değersiz olduğu anlamına gelmiyor; sadece tüketici haberinin merceğinin farklı olduğunu gösteriyor.

## iFixit ne buldu?

iFixit, iPhone Duo'yu [söküp inceledi](https://www.ifixit.com/News/119895/iphone-duo-teardown). Toz testinde cihazın içine çok fazla parçacık girmemiş; ancak hinge'e ulaşan toz, açıp kapatırken çıtırtıya yol açmış. iFixit'e göre bu, ekran hasarına zemin hazırlayabilir. Sonuç, Galaxy Z Fold8 ve Pixel 11 Pro Fold'a göre daha iyi; yine de plaj gibi ortamlar için ideal değil. JerryRigEverything'in toz testinde ise hinge'e giren parçacıklar, telefonu kapalı tutan mıknatısları devre dışı bırakmıştı.

Çatlakların kesin nedeni yok. iFixit'in 3D hinge modeli, hasarın flex kablonun geçtiği boşluk ile merkezi hinge desteği arasındaki geçiş bölgesinde yoğunlaştığını gösteriyor. Birkaç kenarın birleştiği bu noktada ince ekranın desteklenme biçimi değişiyor; bu da stresi tek bir yerde topluyor olabilir. iFixit ayrıca kavisli rayların kapanma sırasında düz plakaların üzerine kalkmasını ve geri çekilmesi gereken bir parçanın bunu yapmamasını olası nedenler arasında sayıyor. Ekran fiziksel olarak "kopmamış" da olabilir; bir kablolama sorunu aynı görüntüyü üretebilir.

iFixit, iPhone Duo'ya geçici olarak **10 üzerinden 5** onarım puanı verdi. Ekranın üst katmanını AppleCare+ ile 19 dolara, onsuz 49 dolara değiştirmek mümkün. Ama asıl mesaj şu: en onarılabilir katlanabilir telefon bile hâlâ zor bir onarım.

## İki kırılma aynı şeyi söylüyor

Apple, iPhone Duo ile iki vaatte bulundu: katlanabilir bir telefonun dayanıklı olabileceği ve bellek güvenliği katmanlarının iPhone'u sömürülemez kıldığı. İlk hafta, iki vaat de sınırlarında test edildi.

Donanım tarafında sorun, demo cihazlarında değil, günlük kullanımda ortaya çıktı. Katlanabilir ekranların zayıf noktası zaten hinge; Apple'ın ilk denemesi de bu gerçeği değiştirmedi. Yazılım tarafında ise sorun, "MIE var, o halde güvendeyiz" cümlesinin fazla rahat olması. Katmanlı savunma, saldırıyı imkânsız değil pahalı yapar. Calif'in gösterimi, o maliyetin launch gününde ödenebildiğini kanıtladı.

Bu, iPhone Duo'nun kötü bir telefon olduğu anlamına gelmiyor. Ama ilk nesil bir cihazı almanın ne anlama geldiğini gösteriyor: üreticinin en çok övündüğü iki özellik, ilk hafta gerçek dünyayla tanışıyor.

## Ne yapmalı?

- **iOS 27.2'yi yayınlandığında kurun.** 27.1'de kalmak, bilinen açıkları kabul etmek demek. Beta'da "çoğu" düzeltilmiş olsa da, genel sürüm çıkana kadar cihazın güncel kalması en temel önlem.
- **Bilinmeyen göndericilerden gelen PDF ve bağlantılara dikkat edin.** iMessage ve Signal dahil. Bu, yalnızca iPhone Duo için değil, her iPhone için geçerli bir alışkanlık.
- **"Jailbreak aracı" indirmeyin.** Calif kamuya açık bir araç yayımlamadı. Bu ad altında dolaşan dosyaların büyük kısmı ya sahte ya da zararlı.
- **Hinge'i gözlemleyin.** Açıp kapatırken çıtırtı, takılma veya ekranda parlak bir çizgi fark ederseniz Apple'a başvurun. Normal kullanımda hinge arızası bir yıllık garanti kapsamında; yeni alınan cihazlarda 14 günlük iade hakkı da var. AppleCare+ düşünülebilir.
- **Yedek alın.** Hangi cihaz olursa olsun, launch haftası yedek almak için en kötü zaman değil.

"Jailbreak sahnesi geri döndü" cümlesi manşet olarak güzel. Ama asıl dönüşen şey, bir cihazın çıkış günü ile ilk ciddi saldırı arasındaki süre. Apple yazılım tarafını 27.2 ile kapatabilir; hinge tarafında ise üretim toleransı ve garanti süreci konuşulacak. iPhone Duo'nun ilk haftası, ilk nesil bir Apple ürününün hem en merak edilen hem en kırılgan yerlerini aynı anda gösterdi.

*Bu yazıdaki veriler 26 Ekim 2026 itibarıyla MacRumors, Heise, Calif'in blogu, iFixit ve Hacker News'ten doğrulanmıştır. iOS 27.2 yayınlandığında bu yazı güncellenecektir.*
