---
title: 'Vino: Synaptics patent mektupları DisplayLink''in açık kaynak sürücüsünü nasıl kapattı'
description: 'DisplayLink DL3 için Rust ile yazılan açık kaynak Vino sürücüsü, Synaptics''in patent mektuplarının ardından GitHub''dan kalktı. Olayın kronolojisi, hukuki tartışma ve Linux kullanıcıları için sonuçları.'
pubDate: '2026-11-11'
heroImage: ../../assets/blog-placeholder-1.jpg
tags: ['linux', 'displaylink', 'patent', 'rust', 'kernel', 'open-source']
---

DisplayLink, USB üzerinden harici ekran bağlamanın en yaygın yollarından biri. Windows'ta sürücüyü kurup unutuyorsunuz; Linux'ta ise yıllardır aynı hikâye var: eski USB2 nesli için açık kaynak `udl` sürücüsü çalışır, yeni DL3 nesli için ise Synaptics'in ağaç dışı (out-of-tree) çekirdek modülü ve kapalı kaynak `DisplayLinkManager` daemon'u gerekir.

2026'nın ortasında bu boşluğu kapatmak için **Vino** adında bir proje çıktı: temiz oda (clean-room) yöntemiyle tersine mühendislik yapılmış, çekirdek içinde çalışan, Rust ile yazılmış bir DRM sürücüsü. Aradan geçen aylarda Vino, Synaptics'in patent mektuplarıyla karşılaştı ve GitHub deposu yayından kalktı. Bu yazı, olayı tarih sırasıyla ve abartmadan anlatıyor.

## Vino nedir?

[Phoronix'in 17 Haziran 2026'daki haberiyle](https://www.phoronix.com/news/Experimental-Vino-DRM-Driver) duyurulan Vino, Dell Universal Dock D6000 gibi **DisplayLink DL3** yuvalarına yönelik deneysel bir sürücüydü. Geliştiricisi Mike Lothian. Sürücü, Rust ile yazılmış ve çekirdek içinde DRM/KMS katmanına oturuyor; yani kullanıcı alanında ayrı bir kapalı daemon çalıştırmaya ihtiyaç duymuyor.

İki nokta önemli:

- **Temiz oda**: Lothian, Synaptics'in kaynak kodunu kopyalamadığını, cihazın davranışını gözlemleyerek bağımsız bir uygulama yazdığını söylüyor.
- **AI desteği**: Sürücünün bir kısmı Claude Code ve Opus 4.8 modeliyle yazıldı. Bu, lisans veya patent tartışmasının merkezinde değil; ama projenin kamuoyunda "AI ile yazılmış sürücü" olarak anılmasına yol açtı.

Haziran ayındaki ilk sunumda sürücü henüz tam değildi. Lothian cihaz kurulumunu ve iletişimi doğrulamış, ancak şifreli kontrol kanalındaki yanıtları çözememişti; yani gerçek bir görüntü çıkışı test edilmemişti. Yine de hedef netti: Synaptics'in ağaç dışı sürücüsü ve kapalı daemon'una bağımlılığı kaldırmak ve ileride ana çekirdeğe girebilecek bir alternatif üretmek.

## Kronoloji

| Tarih | Olay |
|---|---|
| 17 Haziran 2026 | Vino, dri-devel posta listesinde tanıtıldı; Phoronix haber yaptı. |
| 17 Ağustos 2026 | Lothian, Open Invention Network (OIN) lisansı aldı. |
| 17 Ağustos 2026 | Synaptics tarafından ilk "cease and desist" mektubu gönderildi. |
| 5 Ekim 2026 | Takip mektubu: GB2484736 ve GB2485613 numaralı patentlerin 11. istemleri öne sürüldü. |
| 11 Ekim 2026 | Mektupta verilen yanıt süresi doldu. |
| 14 Ekim 2026 | J A Kemp avukatı Clive So, patent kopyalarını ve mektubu LKML'e ekledi; Lothian aynı gün yanıt verdi. |
| 4 Kasım 2026 | Phoronix, Vino deposunun artık erişilebilir olmadığını duyurdu. |

Tarihlerin bir kısmı ikincil kaynaklara dayanıyor; özellikle 5 Ekim takip mektubundaki 11. istem iddiası ve 25.000 dolarlık haftalık ceza tehdidi, Joho no Todai'nin [haberinde](https://joho-todai.com/synaptics-vino-driver-linux-development-halt/) aktarılıyor. Birincil kaynak olarak elimizde LKML'e düşen 14 Ekim yazışması var.

## Synaptics ne istedi?

LKML arşivindeki [14 Ekim 2026 tarihli ileti](https://lkml.rescloud.iu.edu/hypermail/linux/kernel/2610.1/14966.html), J A Kemp LLP'den Clive So imzalı bir mektubun eklerini içeriyor. Mektupta iki Birleşik Krallık patentine atıf var:

- **GB2484736**
- **GB2485613**

Lothian'ın yanıtına göre Synaptics'in pozisyonu, patentlerin hâlâ yürürlükte olduğu ve "buluşun kolay veya tanıdık olmasının önemli olmadığı" yönünde. Şirket, Vino'nun bu patentlerdeki yöntemleri uyguladığını iddia ediyor. Mektupta ayrıca 125 patentlik daha geniş bir liste bulunduğu, ancak bunların ilk aşamada kodla tek tek eşleştirilmediği belirtiliyor.

Synaptics'in kendi kamuoyu açıklaması yok. Elimizdeki metinlerde şirketin görüşü yalnızca karşı tarafın mektubu ve Lothian'ın özeti üzerinden aktarılıyor. Bu, bir mahkeme kararı değil; bir hukuki tehdit ve müzakere süreci.

## Lothian'ın savunması

Lothian, 14 Ekim'deki yanıtında üç ana argüman kuruyor.

**1. Yetki ve yer.** Kendisinin İskoçya'da yerleşik olduğunu, İngiltere ve Galler'de değil; dolayısıyla olası bir davanın İskoçya'da, Court of Session'da açılması gerektiğini söylüyor.

**2. Patentlerin geçersizliği.** İngiltere Patent Yasası'nın 74(1)(a) maddesi uyarınca geçersizliğin tam bir savunma olduğunu, ayrıca 72. madde kapsamında iptal karşı talebi açacağını belirtiyor. Dayandığı noktalar:

- GB2484736'nın 2011 tarihli arama raporunda yedi belgenin, GB2485613'ün raporunda altı belgenin bağımsız istemlere karşı "X" kategorisinde cite edildiğini söylüyor.
- Her iki patentte de bağımsız istemlerin başlangıçta ağ/taşıma sınırlaması içermediğini; istemlerin ancak "genel amaçlı veri ağı" ve "taşıma protokolü" eklenerek kabul edildiğini savunuyor.
- Bu eklenen özelliğin de yeni olmadığını; RFB/VNC protokolünün 1998'de benzer bir akışı tanımladığını ve US5835082 ile US6272180 gibi önceki patentlerin sıkıştırılmış çerçeve tamponu ve Haar kodlu döşeme özelliklerini açıkladığını ileri sürüyor.
- Patentlerin kendi açıklamasının, USB üzerinden ek ekran bağlamanın zaten yaygın olduğunu kabul ettiğini not ediyor.

**3. OIN lisansı.** Synaptics'in OIN üyesi olduğunu, kendisinin de 17 Ağustos 2026'dan beri OIN lisansı sahibi olduğunu söylüyor. OIN tanımında "Affiliate" kavramının "şimdi veya gelecekte" bir yan kuruluşu kapsadığını, DisplayLink'in Temmuz 2020'de Synaptics'e katıldığını hatırlatıyor. Synaptics'in DisplayLink patentlerini OIN kapsamı dışında tuttuğunu düşündüğünü, bunun hangi hükme veya sınırlama seçimine dayandığını soruyor.

**4. İşlemi kim yapıyor?** Son olarak, istemlerdeki yöntemlerin kullanıcının kendi cihazında, yani Synaptics'in ürettiği DisplayLink donanımında gerçekleştiğini savunuyor. Bu, patent hukukunda "doğrudan ihlal" tartışmasını donanım satıcısına kaydırma girişimi.

Bu argümanların hiçbiri bir mahkeme veya patent ofisi tarafından doğrulanmadı. Yazıda yer almalarının nedeni, tartışmanın taraflarını göstermek; hukuki bir sonuç ilan etmek değil.

## Temiz oda neden korumuyor?

En sık karıştırılan nokta bu: **telif hakkı ve patent farklı şeyler.**

Telif hakkı, kodun kendisini korur. Kaynak kodu kopyalamadıysanız, bağımsız yazdıysanız telif ihlali iddiası zayıflar. Patent ise **yöntemi** korur. Aynı davranışı sıfırdan, farklı kodla, hatta farklı dille uygulasanız bile patentteki istemler kapsamına giriyorsanız ihlal iddiası doğabilir. Bu yüzden "temiz oda" bir patent kalkanı değil.

Vino özelinde tartışma tam olarak burada düğümleniyor: Synaptics, kodun kopyalanmasını değil, DisplayLink protokolünün belirli adımlarının patentli yöntemlere girdiğini iddia ediyor. Lothian ise yöntemlerin zaten bilinen teknikler olduğunu ve istemlerin geçersiz olması gerektiğini savunuyor.

OIN tarafı da otomatik bir koruma değil. OIN, üyelerine belirli Linux ile ilgili patentlerde çapraz lisans sağlar; ancak kapsam, tanımlar ve istisnalar dikkatle okunmalı. Synaptics'in DisplayLink patentlerinin bu kapsama girip girmediği tartışmalı. Lothian'ın mektubu, bu belirsizliği kapatmak için şirketten somut hüküm istiyor.

## Linux kullanıcıları için ne değişiyor?

Kısa vadede fazla bir şey değişmiyor; çünkü Vino zaten deneysel ve tamamlanmamıştı. Ama uzun vadede etkisi büyük:

- **DL3 için açık kaynak sürücü yok.** Kullanıcılar Synaptics'in ağaç dışı modülüne ve kapalı `DisplayLinkManager` daemon'una bağımlı kalmaya devam ediyor.
- **Çekirdek güncellemeleri kırılgan.** Ağaç dışı modüller her yeni çekirdek sürümünde yeniden derlenmek zorunda; DKMS veya benzeri çözümler her zaman sorunsuz değil.
- **Denetlenebilirlik yok.** Kapalı daemon, ağ erişimi ve ekran verisi üzerinde ne yaptığını dışarıdan incelemeye izin vermiyor.
- **ARM ve alternatif platformlar.** Resmî sürücü ağırlıklı olarak x86 için dağıtılıyor; ARM tabanlı Linux cihazlarında DisplayLink desteği daha da sınırlı.
- **Upstream umudu ertelendi.** Vino'nun ana çekirdeğe girme hedefi, hukuki süreç çözülmeden gerçekçi değil.

Synaptics'in resmî sürücüsü çalışmaya devam ediyor. Eğer DisplayLink yuvanız varsa pratik tavsiye şu: çalışan çekirdek ve sürücü sürümünü sabitleyin, büyük dağıtım yükseltmelerinden önce yuvanın çalıştığını test edin ve yedek bir ekran bağlantınız olsun.

## Bu olay neden önemli?

Çünkü açık kaynak donanım desteğinin önündeki engel her zaman teknik değil. Bazen lisans, bazen patent, bazen de "kamuoyuna duyurulsa bile davayı göze alamayacak bireysel geliştirici" gerçeği devreye giriyor.

Vino'nun hikâyesi, tersine mühendisliğin ve temiz oda geliştirmenin yasal bir sihir olmadığını gösteriyor. Bir sürücüyü sıfırdan yazmak, o sürücünün patent riskinden muaf olduğu anlamına gelmiyor. Aynı şekilde, bir şirketin mektup göndermesi de patentlerin geçerli olduğu veya ihlalin kanıtlandığı anlamına gelmiyor. Ortada şu an bir mahkeme kararı yok; yalnızca bir çekişme var.

Türkiye'de DisplayLink yuva kullanan Linux kullanıcıları için bu, doğrudan bir günlük sorun değil. Ama donanım üreticilerinin Linux desteğini nasıl gönülsüz yürüttüğünü ve açık kaynak topluluğunun hukuki baskıyla nasıl geri çekilebildiğini görmek için iyi bir örnek. Vino geri dönerse, muhtemelen sessizce değil; bir lisans anlaşması veya patent istisnasıyla döner. O zamana kadar DL3 Linux desteği, satıcının insafına kalmış durumda.
