---
title: 'Broccoli2Shell: Brotli decoder''ındaki açık Node.js, Python ve 20+ projeyi vurdu'
description: 'CVE-2026-111497, Google''ın Brotli C decoder''ında aylar boyunca sessizce duran bir sınır dışı yazma hatası. Node.js, Python ve gömülü kopya taşıyan 20''den fazla proje etkilendi; aynı hafta sonu eMudhra global SSL/TLS işini kapattı, Calif iPhone demolarını gösterdi, Roku GitLab''a taşındı, OpenSSL 4.1.0 ve Kimi K3.1 Pro çıktı.'
pubDate: '2026-10-26'
heroImage: ../../assets/broccoli2shell-hero.jpg
tags: ['security', 'open-source', 'nodejs', 'teknoloji-haberleri']
---

23 Ekim Cuma günü Hacker News'te [394 puan ve 212 yorum alan bir başlık](https://news.ycombinator.com/item?id=50219177) vardı: **Broccoli2Shell**. Bir hafta önce aynı sitede PHP'nin motorundaki iki kritik açık konuşuluyordu; şimdi konu yine uygulamanın kendisi değil, altındaki bir kütüphaneydi. Bu kez bir sıkıştırma decoder'ı: Google'ın Brotli C implementasyonu.

İsim biraz şaka gibi. Açık önce "Node2Shell" olarak anıldı, sonra Juliano Rizzo [itiraz etti](https://x.com/julianor/status/2113746351817216068): *"Brotli açığı (20 yıl önceki zlib'i düşünün) PHP2Shell'den daha büyük bir mesele. Node2Shell berbat bir isim. Ben buna Broccoli diyorum."* Broccoli2Shell adı buradan kaldı. Ama açığın kendisi şaka değil: **CVE-2026-111497**, GitHub tarafından **CVSS 4.0 ile 9.2**, Node.js tarafından "High" olarak derecelendirildi.

Açık, Brotli decoder'ının **1.0.3–1.2.0** sürümlerinde. Düzeltme **1.0.10, 1.1.1 ve 1.2.1**'de. Etki alanı ise Brotli'nin nerede kullanıldığı kadar geniş: Node.js, Python paketleri, .NET, Ruby, PHP eklentisi, DuckDB, Apache Arrow, 7-Zip-zstd, p7zip, EDK II, woff2 ve daha fazlası.

## 1. Açık: sekiz baytlık bir tampon ve yanlış anlaşılan bir dönüş değeri

Brotli akışı bloklara ayrılır ve decoder okurken blok tipleri arasında geçiş yapar. Düzeltmeden önce `DecodeBlockTypeAndLength()` fonksiyonu `c/dec/decode.c` içinde düz bir `boolean` döndürüyordu. Yani çağıran taraf, **bozuk bir akış ile "daha fazla girdi lazım" durumunu birbirinden ayıramıyordu.** Hızlı yolda decoder dönüş değerini tamamen görmezden geliyordu.

Saldırganın hazırladığı akış, gerçekleşmesi imkânsız bir blok geçişi talep edebiliyor. Decoder bunu "daha fazla girdi lazım" sanıp saldırganın baytlarını **sekiz baytlık iç tampona** eklemeye devam ediyor ve tamponun sonunu aşıyor. Taşma, decoder'ın yakınındaki durumu bozuyor; buradan bellek sızıntısına, çökmeye veya kod çalıştırmaya giden bir yol açılıyor.

Düzeltme, çağıran tarafa sert bir format hatası döndürüyor: `BROTLI_DECODER_ERROR_FORMAT_BLOCK_SWITCH` (**−17**). Hata sınıfı **CWE-252** (kontrol edilmeyen dönüş değeri) ve **CWE-787** (sınır dışı yazma). Üst kaynaktaki düzeltme `google/brotli` commit'leri `0ed4268`, `50a9b70`, `b418fa8` ve `da98063`.

Bu açığı bu kadar ciddi yapan şey, tetiklenmesi için **kimlik doğrulaması gerekmemesi**. Saldırganın kontrolündeki bir Brotli akışını çözen herhangi bir yol yeterli: bir HTTP yanıtı, bir istek gövdesi, bir arşiv veya bir kuyruk mesajı.

## 2. Saldırı yüzeyi: URL fetch eden her servis

Brotli, HTTP'de `Content-Encoding: br` olarak standart. Bu yüzden risk, doğrudan `brotliDecompress()` çağıran kodla sınırlı değil.

**Node.js tarafında** yerleşik `fetch()` gelen `Content-Encoding: br` yanıtlarını otomatik açıyor. Yani uygulamanız kullanıcının verdiği bir URL'yi fetch ediyorsa — webhook, link önizleme, RSS okuyucu, crawler, "URL'den içe aktar" özelliği — saldırganın sunucusu payload'ı gönderebilir. Express **5.0.0–5.3.0** ve body-parser **2.0.0–2.3.0** ise `raw()` ve `json()` gibi parser'larda Brotli istek gövdelerini açıyor. Çıplak bir `node:http` sunucusu gövdeleri kendi başına açmıyor.

Burada önemli bir ayrım var: **Express ve body-parser açığı içermiyor.** Onlar sadece açığa giden yol. Bu yüzden onları güncellemek tek başına hiçbir şeyi düzeltmiyor. Node.js kendi Brotli kopyasını taşıdığı için sistemdeki `libbrotli` sürümü de Node'u kurtarmıyor; belirleyici olan Node.js'in kendisi.

**Python tarafında** `Brotli` ve `brotlicffi` aynı C decoder'ı derliyor. Kodunuz bu paketleri import etmese bile, kurulu olmaları yeterli:

- **urllib3** ve dolayısıyla **requests**, `Accept-Encoding: br` bildiriyor ve Brotli yanıtlarını açıyor.
- **aiohttp** paket kuruluysa Brotli kullanıyor.
- **httpx**, `httpx[brotli]` ekstrasıyla kullanıyor.
- **Scrapy** ve diğer crawler'lar; bazı sürümler Brotli'yi bağımlılık olarak kuruyor.

Imperva Red Team, resmî ve değiştirilmemiş **Node.js 24.22.0** Linux arm64 imajında saldırgan kodunu çalıştırdı. Payload'ı hem fetch edilen bir yanıt hem de Express istek gövdesi üzerinden verdi. Birkaç deneme gerekti ve exploit'i yayımlamadılar. 22 Ekim'de GitHub'da çıkan herkese açık PoC ise yalnızca **bilerek zayıflatılmış bir derlemede** kod çalıştırmaya ulaşıyor; standart derlemede çökme ve sınırlı bir bellek okuması üretiyor.

Python'da araştırmacılar hatayı AddressSanitizer ile doğruladı: **1.2.0** yaklaşık **23 MB**'lık hazırlanmış bir akışı kabul etti, **1.2.1** aynı akışı **−17** hatasıyla reddetti. 22 Ekim itibarıyla vahşi istismar bildirilmedi; ama herkese açık PoC'ler çıktıktan sonra bunun değişmesi beklenir.

## 3. Dokuz aylık sessizlik ve gömülü kopyalar

İşin en rahatsız edici kısmı zaman çizelgesi. Düzeltme **Şubat 2026'da** Brotli kaynağına girdi. CVE ise **22 Ekim 2026'da** yayımlandı. Aradaki dokuz ayda Node.js, Python ve sayısız proje, hâlâ savunmasız decoder'ı taşıyan sürümler yayımladı.

Bu, "yama yoktu" hikâyesi değil; **"yama vardı ama güvenlik duyurusu olarak görünmüyordu"** hikâyesi. Sonuç, tedarik zincirinin klasik kör noktası: kaynakta düzeltilmiş bir hata, dağıtılmış kopyalarda aylarca yaşamaya devam ediyor.

Python tarafında bu kör nokta daha da belirgin. CVE kaydı başlangıçta **Google deposunu** adresliyordu, PyPI paketlerini değil. Bu yüzden ifşaat anında `pip-audit`, Dependabot ve Safety, etkilenen PyPI sürümlerini güvenilir biçimde işaretlemedi. GitHub'ın danışma kaydı sonradan `Brotli` ve `brotlicffi` paketlerini de ekledi (**PYSEC-2026-4322** ve **PYSEC-2026-4323**). Yani "scanner'ım temiz dedi" bu vakada yeterli bir cevap değil.

İkinci kör nokta **gömülü kopyalar**. Brotli küçük ve taşınması kolay bir C kütüphanesi; birçok proje sistem kütüphanesini kullanmak yerine kendi kopyasını taşıyor. Dağıtımınız `libbrotlidec`'i güncellese bile bu projeler kendi kopyalarını güncellemedikçe açık kalıyor.

**26 Ekim itibarıyla yamalanmamış gömülü kopyalar:**

| Proje | Gömülü sürüm | Açtığı saldırgan verisi |
|---|---|---|
| DuckDB | yamalanmamış | Brotli sıkıştırmalı Parquet dosyaları; düzeltme PR #27791'de |
| Apache Arrow (bundled build) | 1.0.9 | Brotli sıkıştırmalı Parquet; PR #55167 onaylı ama birleştirilmedi |
| v8-jsi | 1.2.0 | Node.js ile aynı yollar |
| 7-Zip-zstd | 1.2.0 | Kullanıcının açtığı arşivler ve `.br` dosyaları |
| p7zip | 1.0.9 | Kullanıcının açtığı arşivler ve `.br` dosyaları |
| EDK II | 1.2.0 | Sıkıştırılmış firmware bölümleri |
| woff2 (Makefile build) | 1.0.3 | `woff2_decompress`'e verilen WOFF2 fontları |

Bu liste eksik olabilir: GitHub kod araması submodule'leri ve bazı çok büyük depoları atlıyor; özel veya derleme sırasında gömülen kopyalar hiç görünmüyor. Yani "listede yokum" güvenli olduğunuz anlamına gelmiyor.

Dilin kendi portları ayrı bir konu: Java, JavaScript ve C# portları bu hataya ulaşamıyor. Go portunda aynı mantık hatası vardı ama yalnızca çökmeye yol açıyordu ve 23 Ekim'de düzeltildi. Rust'ın `brotli-decompressor`'ı koşulu yakalayıp hata döndürüyor. **Kod çalıştırma yalnızca C decoder'da mümkün.**

## 4. Kim yamaladı, kim yamalamadı

**Yamalananlar:**

- **Node.js:** 22.23.4, 24.22.1 ve 26.12.1. Node 25, 23, 20 ve daha eskileri EOL; yama yok, 22/24/26'ya geçmek gerekiyor.
- **Python:** `Brotli` 1.2.1 (22 Ekim), `brotlicffi` 1.2.1.0 (23 Ekim).
- **Ruby `brotli` gem:** 0.9.1, 24 Ekim.
- **.NET runtime:** 8.0.33, 9.0.22 ve 10.0.14, 25 Ekim; ayrıca 11.0.0-rc.3. `BrotliStream`, `BrotliDecoder`, `HttpClient` otomatik açma ve ASP.NET Core request decompression kapsanıyor. Ancak genel GitHub dalları iç düzeltmenin gerisinde; GitHub kaynağından yapılan derlemeler hâlâ savunmasız.
- **PHP brotli eklentisi:** 0.21.1, 24 Ekim.
- **UEFITool:** A76, 24 Ekim.
- **MuPDF:** 1.28.0. Brotli fork'u düzeltmeyi Nisan 2026'da almış; 1.27.x hâlâ savunmasız decoder'ı taşıyor.

**Sadece master/main dalında düzeltilenler:** ClickHouse (26.10'a backport yapıldı ama son sürüm 26.10.2.103 düzeltmeden önce çıktı), NanaZip, GraalJS, YDB ve libjxl. Bunların hiçbirinde düzeltme henüz yayımlanmış bir sürümde değil.

Buradaki ders şu: **sürüm numarası tek başına yetmiyor.** Node.js'te belirleyici olan runtime; Python'da paket; sistem kütüphanesinde dağıtımın backport'u; gömülü kopyalarda ise projenin kendi sürümü. Dördü ayrı ayrı takip edilmek zorunda.

## 5. Ne yapmalı

1. **Node.js'i 22.23.4, 24.22.1 veya 26.12.1'e yükseltin.** `node --version` ve `node -p "process.versions.brotli"` ile doğrulayın. Node 20/23/25 EOL; yama beklemeyin.
2. **Python'da `Brotli` ve `brotlicffi`'yi güncelleyin.** `pip show Brotli brotlicffi`, `pipdeptree -r -p Brotli` ve `poetry.lock`/`uv.lock`/`requirements*.txt` ile kimin getirdiğini bulun. İhtiyaç yoksa **kaldırmak** en basit çözüm: requests, urllib3 ve aiohttp gzip/deflate'a geri döner. `httpx[brotli]` gibi ekstraları da kaldırın.
3. **Çalışan süreci yeniden başlatın.** Güncelleme tek başına yetmez; süreç eski decoder'ı bellekte tutmaya devam eder. Konteynerlerde imajı yamalı tabandan yeniden derleyip dağıtın.
4. **Sistem kütüphanesini denetleyin.** `dpkg -l | grep -i brotli`, `rpm -qa | grep -i brotli` veya `apk info -v | grep -i brotli`. Hangi süreçlerin decoder'ı yüklediğini görmek için `sudo grep -l brotlidec /proc/*/maps`.
5. **Gömülü kopyaları arayın.** Lockfile'larda, SBOM'da ve konteyner imajlarında Brotli'yi arayın; DuckDB, Arrow, 7-Zip-zstd, p7zip, EDK II ve woff2 gibi projeleri ayrıca kontrol edin. Dağıtım güncellemesi bu kopyaları düzeltmez.
6. **Gelen `Content-Encoding: br` gövdelerini proxy, load balancer veya WAF'ta reddedin.** Vercel gibi sağlayıcılar ifşaat günü WAF kuralı yayımladı. Ama bu yalnızca gelen trafiği kapatır; **giden fetch yolunu kapatmaz.** `Accept-Encoding`'den `br` çıkarmak da yeterli değil, çünkü kötü niyetli sunucu yine Brotli gönderebilir. Node.js için tam çözüm runtime'ı yükseltmek.
7. **Herkese açık PoC'leri hesaba katın.** 22 Ekim itibarıyla vahşi istismar yoktu; ama PoC var. Brotli hataları, beklenmeyen çökmeler ve bellek tüketimi için loglarınızı izleyin.

## 6. Hafta sonu kısa haberler

### eMudhra: "Sosyal medya abarttı" dedi, global işi kapattı

Geçen haftanın sertifika otoritesi eMudhra, [22 Ekim'de yayımladığı basın açıklamasıyla](https://emudhra.com/en/press-release/emudhra-to-exit-global-ssl-tls-certificate-business) global SSL/TLS sertifika işinden çekildiğini duyurdu. [HN'de 1.155 puan ve 748 yorum](https://news.ycombinator.com/item?id=50195110) aldı.

Açıklamanın en çok konuşulan cümlesi şu: *"Bu olay etrafındaki sosyal medya yaygarası, SSL/TLS'nin işimizdeki yerine göre orantısız bir inceleme getirdi."* Şirket, global SSL/TLS'in cirosunun yaklaşık **%1'i** olduğunu, veri egemenliği ve uyum maliyetlerinin arttığını, büyük oyuncuların sertifikaları ücretsiz dağıttığını söylüyor. G1 RSA kökleri geçiş tamamlanana kadar hizmet vermeye devam edecek; etkilenen müşterilerin sertifikaları ücretsiz değiştirilecek; iptal ve durum servisleri her sertifika süresi dolana veya değiştirilene kadar çalışacak. Şirket ayrıca tarayıcı kök programlarına karşı taahhütlerini ve tam bir kök neden raporunu tamamlayacağını belirtiyor.

eMudhra'nın verdiği rakamlar ile Mozilla kaydı arasında bir çelişki yok ama iki anlatım arasında büyük bir boşluk var. Şirket, etkilenen CA'ları keşiften **14 saat içinde** iptal ettiğini, bu CA'lardan **hiçbir son kullanıcı sertifikası verilmediğini**, altyapının ele geçirilmediğini ve veri sızıntısı olmadığını söylüyor. Mozilla kaydında ise **sekiz ara sertifika**, **30 Nisan 2025'te** tek bir anahtar töreninde üretilmiş ve **tek baytlık** özel anahtarlar var; yani **17 aylık** bir pencere. Bir güven sağlayıcısı için asıl soru, anahtarların nasıl bu hale geldiği ve neden aylarca fark edilmediği. Basın açıklaması bu soruya cevap vermiyor; işi kapatmayı cevap olarak sunuyor.

### Calif: iPhone demoları

PHP denetimini yapan Calif, [16 Ekim'de yayımladığı kısa yazıyla](https://blog.calif.io/p/iphone) Hexacon Paris'te iPhone'a yönelik demolar gösterdiğini açıkladı. [HN'de 1.108 puan ve 724 yorum](https://news.ycombinator.com/item?id=50211474) aldı. Gösterilen başlıklar: *"1/ Signal 1-click"*, *"2/ But who cares about a third-party app when everyone uses iMessage, right?"*, *"3/ Can your iPhone do this?"*, *"4/ APT stands for Apple Persistent Threat"*.

Yazının tamamı dört satır: *"Everything will be released in due time."* Yani teknik detay, CVE veya Apple'dan bir doğrulama yok. Calif'in PHP açığını bağımsız olarak doğrulamış bir ekip olması iddiayı ciddiye aldırıyor, ama **demo ile kanıtlanmış exploit zinciri aynı şey değil.** Gerçek olsaydı, iMessage veya Signal üzerinden sıfır tıklamalı bir iPhone zinciri bu yılın en büyük mobil güvenlik haberi olurdu. Şimdilik elde olan, bir konferans gösterimi ve yayın sözü.

### Roku: GitHub'dan GitLab'a

Roku, geliştirici repolarını GitHub'dan GitLab'a taşıdı. [HN'de 306 puan ve 220 yorum](https://news.ycombinator.com/item?id=50222622) alan başlık, Roku'nun [developer blog yazısına](https://blog.roku.com/developer/gitlab-move) dayanıyor. Şirket taşınma gerekçesini kamuya açıklamadı; blog da JavaScript gerektirdiği için düz metin olarak okunamıyor. Son haftalarda GitHub Actions tedarik zinciri saldırıları ve eMudhra gibi olaylar gündemdeyken büyük bir şirketin bu kararı dikkat çekti, ama **"GitHub'dan kaçtı" yorumu şu an spekülasyon.** Elde olan sadece taşınma ve tarih.

### OpenSSL 4.1.0: DTLS 1.3 ve Itanium'a veda

[23 Ekim'de OpenSSL 4.1.0 yayımlandı](https://github.com/openssl/openssl/releases/tag/openssl-4.1.0). [HN'de 188 puan ve 67 yorum](https://news.ycombinator.com/item?id=50208099) aldı. Bu bir güvenlik sürümü değil, özellik sürümü: **DTLS 1.3** ([RFC 9147](https://datatracker.ietf.org/doc/html/rfc9147)), **GREASE** desteği ([RFC 8701](https://datatracker.ietf.org/doc/html/rfc8701)), DTLS listener API'sinde DTLS desteği, IKEv2 KDF ve Elbrus2000 (`e2k`) mimarisine ilk destek.

Kaldırılanlar da var: Windows-on-Itanium (`VC-WIN64I`) ve Windows CE (`VC-CE`) hedefleri, ayrıca gerçekte hiçbir şeyi devre dışı bırakmayan `no-ecdsa` ve `no-ecdh` seçenekleri. Bilinen sorunların tamamı DTLS 1.3 tarafında: KeyUpdate sonrası bekleyen kayıtların yeniden iletim tamponundan düşmesi (#32878), kalıcı bir alma hatasının `SSL_ERROR_WANT_READ` olarak raporlanması (#33277), yazma hatasının `SSL_ERROR_SYSCALL` olarak görünmesi (#33278) ve ilk flight'ı erken onaylayan istemcilerde `unexpected_message` uyarısı (#33242). DTLS 1.3 kullanmıyorsanız bu sürümün pratik etkisi çoğunlukla yeni özellikler ve mimari temizliği.

### Kimi K3.1 Pro: 3T sınıfı model, açık ağırlık sözü ve siber yetenek freni

Moonshot AI, 23 Ekim'de Kimi K3.1 Pro'yu duyurdu; [HN'de 1.083 puan ve 673 yorum](https://news.ycombinator.com/item?id=50212065) aldı. Şirket modeli "3T sınıfı açık ağırlıklı" olarak tanımlıyor, **1 milyon token** bağlam penceresi veriyor ve K3'ün post-training'ini büyük ölçüde artırdığını söylüyor. Tam model ağırlıkları **4 Kasım 2026'ya kadar** yayımlanacak; bugün itibarıyla ağırlıklar çıkmadığı için Artificial Analysis modeli hâlâ "proprietary" olarak listeliyor ve parametre sayısını **2,8 trilyon** veriyor — Moonshot'ın "3T sınıfı" ifadesiyle küçük bir tanım farkı var.

Benchmark tarafında iddialar güçlü: Terminal-Bench 4.0'da **%65,7** (GPT-6 Astra %58,2, Claude Opus 5.5 %66,4), BenchCAD'de araçlarla **%92,7**, OfficeQA Pro v2'de **64,4**. Kendi halüsinasyon testlerinde iddia düzeyindeki hata oranı K3'te %23,4 iken K3.1 Pro'da **%8,3**'e düşmüş. Ayrıca 2-3 kat hızlı bir "Highspeed" varyantı da var.

Yazının konusu açısından en ilginç kısım **siber yetenek** bölümü. Moonshot, post-training ölçeklendikçe modelin zafiyet araştırma performansının kendiliğinden arttığını fark etmiş; cyber verisini hem mid-training korpusundan hem RL ortamlarından çıkarmış. Filtresiz kontrol noktası xdev-bench-hard'ta **%90,5** çözerken nihai model **%81,0**'da kalmış. Şirket, açık ağırlıkların "siber yeteneğin mutlak sınırını ileri taşımaması"nı ilke edindiğini söylüyor. Yani bir yandan modeli açıyor, diğer yandan hangi yeteneğin açılacağını seçiyor. Brotli ve PHP açıklarının konuşulduğu bir haftada, model üreticisinin "exploit yazma" yeteneğini bir politika kaldıracı olarak ele alması tesadüf değil.

### GrapheneOS: bankalar tek tek izin vermeye başladı

GrapheneOS, 23 Ekim'de [Mastodon'da](https://grapheneos.social/@GrapheneOS/117492375462459244) bankacılık uygulamalarıyla ilgili kısa bir durum özeti paylaştı; [HN'de 678 puan ve 330 yorum](https://news.ycombinator.com/item?id=50217495) aldı. Projenin söylediğine göre bankacılık uygulamalarının çoğu GrapheneOS'ta çalışıyor, ama bir kısmı bellek bozulması hataları ve hatalı anti-tamper kodu içerdiği için uygulama başına exploit koruma uyumluluk anahtarını açmak gerekiyor. Uygulamaların **yaklaşık %10'u** ise Google onaylı olmayan işletim sistemlerini yasakladığı için hiç çalışmıyor.

Asıl haber şu: **yaklaşık bir düzine bankacılık uygulaması**, Google onaylı bir işletim sistemine ek olarak GrapheneOS'a da açıkça izin vermeye başlamış ve bu sayı artıyor. GrapheneOS, kullanıcı bildirimlerine dayanan güncel listeyi [privsec.dev'de](https://privsec.dev/posts/android/banking-applications-compatibility-with-grapheneos/) tutuyor. HN tartışmasında iki taraf var: bankanın paraya erişimi kendi uygulamasına kilitlemesini "senin altyapın olmak zorunda mıyım" diye eleştirenler ve uygulamanın pratiklik sağladığını söyleyenler. Mekanizma uygulamaya göre değişiyor; ama Play Integrity gibi kontrollerin artık bazı bankalarda "GrapheneOS'u da tanı" istisnasına kapı açması, özel ROM'ların bankacılıkta görünürlük kazanmasının somut bir örneği.

### Apple Music: 404 sayfasında çalışan bir iPod

Apple Music'in web sitesi, var olmayan bir adrese gidince normal bir 404 göstermiyor: karşınıza **birinci nesil bir iPod** çıkıyor. [MacRumors'un 23 Ekim tarihli haberine](https://www.macrumors.com/2026/10/23/apple-music-has-a-hidden-ipod-you-can-play-with/) göre `music.apple.com/macrumors` gibi bir adres "Page Not Found — Give this a spin instead" diyor ve click wheel ile gezilebilen, 90 saniyelik şarkı önizlemeleri çalan bir iPod açılıyor. `music.apple.com/ipod` ise "Looking for something?" diyor. [HN'de 931 puan ve 273 yorum](https://news.ycombinator.com/item?id=50207910) aldı.

Yumurta içinde yumurta da var: iPod'da **Settings → About** ekranına gidip click wheel'in orta tuşunu basılı tutarsanız klasik **Breakout** oyunu açılıyor. MacRumors, bunun iPod'un tanıtımının 25. yıl dönümüne denk geldiğini not ediyor. Yalnızca tarayıcıda çalışıyor; Apple Music uygulamasına yönlendirilmemek için Mac'te Command tuşuyla, iOS'ta basılı tutup "Open" ile açmak gerekiyor. Haftanın en ciddi güvenlik haberlerinin yanında küçük bir nefes alma molası.

### Dan Luu: "Yazılımda daha iddialı olmalıyız"

Dan Luu, [yeni yazısında](https://danluu.com/ambitious/) yapay zekâ ile yazılım geliştirmenin "slop" tarafıyla ilgili haklı şüpheyi kabul edip tersini savunuyor: araçlar artık eskiden mantıksız pahalı olan projeleri mümkün kılıyor. [HN'de 787 puan ve 704 yorum](https://news.ycombinator.com/item?id=50225695) aldı.

Yazının somut örneği **pgrust**: Michael Malis'in Postgres'i Rust'ta yeniden yazma projesi. Luu, bu tür "AI ile yeniden yazım" projelerinin çoğunun çöp olduğunu söylüyor; ama pgrust'ın testleri o kadar ciddi ki Postgres'te gerçek hatalar bulmuş: SP-GiST işlemlerini bozan sayısal bir hata, JSONPath'te yanlış sonuç üreten format cache hatası, pgcrypto'da sonraki işlemleri bozan bir hata, dictionary loader'da bellek güvenliği hataları ve money taşması. Projenin asıl iddiası performans; Luu'ya göre başarısız olsa bile bu testler Postgres'i kalıcı olarak iyileştirmiş durumda. Yazı yayımlanmadan önce pgrust'ın ClickHouse benchmark'ı tartışma çıkarmış; Luu, hile suçlamalarının yanlış olduğunu, erken gönderimin ise Malis tarafından kabul edildiğini yazıyor.

Luu kendi deneyimlerini de ekliyor: regex motoru, ripgrep fork'u, Rust için yazdığı yorumlayıcı ve Azul için yaptığı yapay zekâ. Bunların çoğu birkaç saatini almış; birkaç yıl önce aynı işler aylar sürerdi. Yazının sonunda Yossi Kreinin'in karşı görüşü de var: çoğu insan için doğru cevap daha **az** iddialı olmak, çünkü agentic döngüler net geçme/kalma kriteri olmayan işlerde kötü sonuç veriyor ve AI hızlıca bakımı zor, teste aşırı uyumlu kod üretebiliyor. Luu bu itirazı yayımlamış ama sonuçta aynı yerde kalıyor: başkalarının slop üretmesi, sizin de öyle yapmanız gerektiği anlamına gelmiyor.

---

Geçen hafta PHP'nin motoru, bu hafta Brotli'nin decoder'ı. İkisinde de kırılma uygulamanın içinde değil, altındaki ortak koddaydı. Broccoli2Shell'in asıl dersi "Node.js'i güncelle" değil; **hangi decoder'ın, hangi sürümle, hangi imajın içinde çalıştığını bilmek.** Şubat'ta kaynağa giren bir düzeltme, Ekim'de hâlâ gömülü kopyalarda dolaşıyorsa, sorun yamanın kendisi değil, yamanın nereye ulaştığını görememektir.

Geçen haftanın php2shell yazısına [buradan](/blog/herkes-phpye-dalmisken/), Ekim ayının genel HN görünümüne ise [bülten sayfasından](/blog/hn-bulteni-ekim-2026/) ulaşabilirsiniz.

*Bu yazıdaki puan ve yorum sayıları 26 Ekim 2026 tarihli Hacker News verileridir; teknik detaylar broccoli2shell.com, Node.js'in Ekim 2026 güvenlik duyurusu, GitHub'ın GHSA-9v8h-qqgm-4m35 kaydı, Imperva, OpenSourceMalware, Aikido, eMudhra'nın basın açıklaması, Kimi'nin teknik blogu, MacRumors, GrapheneOS'un Mastodon gönderisi ve Dan Luu'nun yazısından doğrulanmıştır.*
