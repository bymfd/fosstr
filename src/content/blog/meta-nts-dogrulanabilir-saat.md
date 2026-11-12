---
title: 'NTP 40 yıldır imzasızdı: Meta nts.meta.com ile saati doğrulanabilir yaptı'
description: 'Meta, genel saat servisine RFC 8915 NTS desteği ekledi. Saat paketleri artık kimlik doğrulanabiliyor; sunucular durum tutmuyor. Ancak gecikme saldırıları ve mobil istemciler hâlâ açık.'
pubDate: '2026-11-12'
heroImage: ../../assets/blog-placeholder-1.jpg
tags: ['security', 'ntp', 'nts', 'meta', 'time', 'tls', 'open-source']
---

Bir cihazın saati yanlışsa, güvenlik kararları da yanlış olur. TLS sertifikalarının geçerlilik penceresi, erişim token'larının süresi, replay koruması ve log sıralaması; hepsi yerel saate göre değerlendirilir. Ama internetin saat protokolü NTP, 1985'ten beri büyük ölçüde **imzasız** çalışıyor: istemci 48 bayt gönderiyor, karşı taraf 48 bayt döndürüyor ve istemci buna inanıyor.

Meta, Ekim 2026'da bu açığı kendi genel saat servisinde kapatma adımını duyurdu: **nts.meta.com** artık Network Time Security (NTS, RFC 8915) konuşuyor. Duyuru, Kasım başında Hacker News'te yeniden gündeme geldi. Bu yazı, NTS'in ne yaptığını, Meta'nın durumsuz (stateless) sunucu tasarımını ve çözmediği sorunları anlatıyor.

## Kısa özet

| Alan | Değer |
|---|---|
| Servis | `nts.meta.com` (anahtar değişimi), `time.meta.com` (zaman yanıtları) |
| Protokol | NTS / RFC 8915 |
| Anahtar değişimi | TLS 1.3, TCP/4460, ALPN `ntske/1` |
| Zaman trafiği | NTPv4, UDP/123 + NTS uzantı alanları |
| Sunucu durumu | İstemci başına kayıt yok; çerez anahtarı günlük türetiliyor |
| İstemci tarafı | chrony, ntpsec |
| Kod | [github.com/facebook/time](https://github.com/facebook/time) (açık kaynak) |
| Duyuru | 6 Ekim 2026 |

## Neden saat güvenliği önemli?

NTP'nin imzasız olması uzun süre "kabul edilebilir" görüldü; çünkü saat birkaç saniye kaydığında bu bir operasyonel rahatsızlıktı, güvenlik olayı değildi. Bugün durum farklı:

- **Sertifika doğrulama:** `notBefore` ve `notAfter` yerel saate göre kontrol edilir. Saat yanlışsa cevap da yanlıştır.
- **Token ve kimlik bilgisi süresi:** "15 dakika geçerli" ifadesi, bir saate dair iddiadır.
- **Replay pencereleri:** "N saniyeden eski isteği reddet" demek, şu anın ne olduğunu bilmeyi gerektirir.
- **Log korelasyonu:** Saatleri uyuşmayan iki host, hiç yaşanmamış bir zaman çizelgesi üretir.

Ve kontrol döngüseldir: X.509 süre doğrulaması yapmak için zaten doğru saate ihtiyacınız var. İki yaygın geçici çözüm de kötü. Birincisi, saat ayarlanana kadar sertifika doğrulamasını kapatmak; cihazı en savunmasız olduğu anda korumasız bırakır. İkincisi, her iki tarafa da tolerans payı koymak; herkes karşısındakinin ne kadar yanlış olduğunu tahmin etmeye çalışır.

Bu, sertifikalar 398 gün geçerliyken katlanılabilirdi. CA/Browser Forum'un SC-081v3 takvimiyle yeni sertifikaların azami geçerliliği Mart 2026'da 200 güne, Mart 2027'de 100 güne, Mart 2029'da 47 güne iniyor. 47 günde manuel sertifika yönetimi ölçekte sürdürülemez; yenileme ayda bir, genellikle ACME ile ve gözetimsiz çalışır. Saati kaymış bir host'ta otomatik yenileme döngüsü bilet açmaz; ya yeniden imzalar ya da kimsenin izlemediği bir takvimde başarısız olur.

## NTS nasıl çalışıyor?

NTS, kimlik doğrulamayı iki aşamaya ayırıyor. Bu ayrım, protokolü dağıtılabilir kılan şey.

**1. Anahtar değişimi (NTS-KE).** İstemci, TCP/4460 üzerinden TLS 1.3 ile bağlanır ve `ntske/1` ALPN kimliğini kullanır. Taraflar bir AEAD algoritması üzerinde anlaşır; iki yönlü oturum anahtarları (C2S ve S2C) TLS oturumundan RFC 5705 exporter ile türetilir. Sunucu sekiz çerez (cookie) verir, istemciye hangi NTP sunucusunu kullanacağını bir "server negotiation" kaydıyla söyler ve bağlantıyı kapatır. Bu işlem her paket için değil, bir kez yapılır.

Meta üç AEAD müzakere ediyor: RFC 8915'in zorunlu tuttuğu **AES-SIV-CMAC-256** (ID 15), **AES-SIV-CMAC-512** (17) ve **AES-128-GCM-SIV** (30). İstemcinin tercihi kazanıyor.

**2. Kimlik doğrulanmış NTP.** Standart NTPv4, UDP/123 üzerinden ve NTS uzantı alanlarıyla. İstek benzersiz bir tanımlayıcı, bir çerez ve bir authenticator taşır. Authenticator kendinden önceki her şeyi kapsar ama hiçbir şeyi şifrelemez. Sunucu çerezi açıp oturum anahtarlarını çıkarır, authenticator'ı doğrular ve yanıtlar: tanımlayıcı geri yansıtılır, yeni çerezler yanıtın authenticator'ının içinde şifreli olarak gönderilir.

Sahte bir paket doğrulamadan geçemez ve düşer. Meta, NTS NAK göndermiyor; böylece başarısızlık paket kaybından ayırt edilemiyor ve saldırgan istemciyi yeni bir anahtar değişimine zorlayamıyor. Tekrarlanan (replayed) yanıt yanlış tanımlayıcı taşıdığı için eşleşmiyor. Yeni çerezler açıkta değil, yanıt authenticator'ının içinde gittiği için gözlemci her alışverişte farklı bir opak blob görüyor ve istemciyi ağlar arasında takip edemiyor.

## Durumsuz çerezler: kopyalanan anahtar yok

Bir çerez, sunucunun istemciye emanet ettiği durumdur. Oturum anahtarlarını AES-SIV ile mühürleyerek taşır; yalnızca sunucu açabilir. Akla gelen ilk uygulama, her sunucuya kopyalanan bir anahtar halkasıdır; ama bu, saat servisini dağıtık bir durum problemi haline getirir.

Meta anahtar kopyalamıyor. Her sunucu, mühürleme anahtarını paylaşılan bir master secret ve **o günün** değerinden türetiyor:

```text
key = HKDF-SHA256(master, salt = BE32(day), info = "fbnts-cookie-seal-v1")
```

`day`, Unix epoch'tan bu yana tam 24 saatlik periyotlar olarak ölçülüyor; takvim günü değil. Yani saat dilimi ve yaz saati yok; aynı an için her host aynı tamsayıyı hesaplıyor. Bu tamsayı, çerezin anahtar kimliği olarak açıkça taşınıyor. Daha önce hiç görmediği bir sunucudan çerez alan bir makine bile anahtarı yeniden türetip açabiliyor. Meta, dönüş sınırındaki sapmalar için iki gün geriye ve bir gün ileriye tolerans veriyor.

Sonuç: anahtar halkası yok, replikasyon yok, oturum tablosu yok, senkronizasyondan çıkacak paylaşılan durum yok. Anahtar değişimi sunucusu ile zaman sunucuları farklı makinelerde ve hiçbir şey paylaşmıyor. Sunucu eklemek, sadece sunucu eklemek oluyor.

## Nasıl kullanılır?

chrony için tek satır:

```text
pool nts.meta.com nts iburst maxsources 5
```

`nts.meta.com` yalnızca anahtar değişimi yapıyor. El sıkışma sırasında bir server negotiation kaydıyla `time.meta.com`'daki bir NTP yanıtlayıcısını işaret ediyor. Yani yapılandırdığınız host, sonunda konuştuğunuz host değil.

Bu yönlendirme yüzünden `server` yerine `pool` kullanılıyor. Tek bir `server` satırı tek bir ilişki ve tek bir yanıtlayıcı verir; bu da tek hata noktası demek. NTP ise kötü bir kaynağı çoğunlukla saf dışı bırakabilmek için birkaç kaynak ister. `pool` ile `maxsources` kadar bağımsız ilişki kuruluyor; her biri kendi TLS oturumunda kendi anahtar değişimini yapıyor ve farklı oturum anahtarlarına sahip oluyor. Meta'ya göre beş kaynak yaklaşık 20 dakikada ayağa kalkıyor.

Durumu kontrol etmek için:

```bash
chronyc authdata
```

Çıktıda her kaynak için `NTS`, anahtar kimliği, AEAD tipi ve elde kalan çerez sayısı görünür. `NAK 0` reddedilen çerez olmadığını gösterir.

## Neyi çözüyor, neyi çözmüyor?

NTS, yoldaki bir saldırganın **yanıtı uydurmasını** engelliyor. Klasik bir MITM saldırısı kriptografi kırmak zorunda değil; gerçek sunucudan önce cevap vermesi yeterli. Saldırgan saati geri alırsa süresi dolmuş sertifikalar yeniden geçerli görünebilir, iptal edilmiş token'lar çalışabilir. Saati ileri alırsa her şey aynı anda süresini doldurur. Meta'nın örneğiyle: cihazı 2037'ye ikna eden bir saldırgan, NTP'nin 2036'da sarmalanan 32 bitlik alanı yüzünden düzeltmeyi yanlış döneme yazdırabilir; cihazın tüm sertifikaları süresiz hale gelir, TLS çalışmaz, güncelleme servisine ulaşılamaz. Kurtarma, fabrika ayarı veya servis merkezi demektir.

Ama NTS'in kapsamı dar ve bunu açıkça söylemek gerekiyor:

- **Gecikme saldırıları.** RFC 8915 açık: paketleri tutan bir saldırgan saatinizi gecikmenin yarısına kadar kaydırabilir. Her bayt gerçek olduğu için kriptografi bunu tespit etmez. Kimlik doğrulama, paketi kimin yazdığını söyler; ne kadar süre yolda kaldığını söylemez. Çözüm yine birden fazla bağımsız kaynak, mantıklı sınırlar ve sınırlı adımlar.
- **Önyükleme (bootstrapping).** NTS-KE TLS üzerinden çalışır; TLS ise çalışan bir saat ister. RTC'si ölü bir cihaz yine de ilk el sıkışmadan önce kabaca doğru saate ihtiyaç duyar.
- **Yanlış sunucu.** NTS yolu doğrular, cevabı değil. Doğru yapılandırılmış, doğru kimlik doğrulanmış ama saati yanlış bir sunucu, size kusursuz imzalı yanlış zaman verebilir. Quorum, akıl sağlığı kontrolleri ve izleme hâlâ gerekli.
- **Monotonluk.** Kimlik doğrulanmış zaman yine duvar saatidir ve duvar saatleri geri gidebilir: artık saniyede veya bir düzeltme geldiğinde. Geçen süreyi ölçen kod monotonik saat kullanmalı.

## Asıl eksik: mobil

Sunucu tarafında NTS yaygınlaşıyor. chrony ve ntpsec RFC 8915'i uyguluyor. Kamuya açık NTS sunucuları listesinde çoğunlukla ulusal metroloji enstitüleri ve altyapı operatörleri var: PTB, Netnod, time.nl gibi. Cloudflare, RFC yayınlanmadan önce 2019'da NTS'li servisini açmıştı.

Sorun istemci tarafında. Android'in platform saat senkronizasyonu düz SNTP: UDP/123 üzerinden sabit 48 baytlık paket, uzantı alanı yok. Apple cihazlar `timed` ile `time.apple.com`'a bağlanıyor ve Meta'nın bildiği kadarıyla orada da NTS desteği yok. Milyarlarca telefon, saat ve kulaklığın saatini kuran bu iki yığın, hâlâ kimlik doğrulanmamış bir UDP paketine güveniyor.

Bir cihaz üreticisi bugün ayrı bir NTS istemcisi gönderebilir; chrony Android'de çalışıyor. Ama bu, platformun kendisinin yapması gereken bir işin etrafından dolaşmak demek. Meta'nın çağrısı da buraya: protokol hazır, sunucular çoğalıyor, istemci uygulamaları var. Eksik olan mobil.

## Sonuç

Meta'nın NTS hamlesi, saat servisini "doğru saat" vermekten "doğrulanabilir saat" vermeye taşıyor. Durumsuz çerez tasarımı, ölçeklenebilir ve dağıtık bir servis için zekice bir çözüm: anahtar halkası yok, oturum tablosu yok, sunucu eklemek kolay.

Ama tek başına sihir değil. Gecikme saldırıları, önyükleme sorunu, yanlış sunucu ve monotonluk hâlâ sizin sorununuz. NTS, "bu zamanı kim gönderdi ve yolda değişti mi?" sorusunu cevaplıyor; "bu zaman doğru mu?" sorusunu değil.

Yine de yön doğru. Saat, her güvenlik kararının ölçüldüğü girdi; onu imzasız bir UDP paketine emanet etmek 2026 için fazla iyimser. Kendi altyapınızda chrony veya ntpsec kullanıyorsanız NTS'li bir kaynak eklemek tek satırlık bir iş. Yapmaya değer.

## Kaynaklar

- [Engineering at Meta: NTS: Authenticated Time at Meta](https://engineering.fb.com/2026/10/06/production-engineering/nts-authenticated-time-at-meta/)
- [Meta Time kütüphanesi (GitHub)](https://github.com/facebook/time)
- [RFC 8915: Network Time Security for the Network Time Protocol](https://datatracker.ietf.org/doc/html/rfc8915)
- [CA/Browser Forum SC-081v3](https://cabforum.org/2025/04/11/ballot-sc081v3-introduce-schedule-of-reducing-validity-and-data-reuse-periods/)
