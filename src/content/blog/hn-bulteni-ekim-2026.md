---
title: 'Hacker News Bülteni (20 Eylül – 20 Ekim 2026): Model Seli, Passkeys Savaşı ve Deno''nun Sonu'
description: 'Ayın Hacker News taraması: Opus 5.5, GPT-6, Gemini 4 Argon ve Mistral Large 4 fiyat savaşından passkeys tartışmasına, Cloudflare–Deno satın almasından Pentagon''un AI itirafına 23 haberin ayrıntılı özeti.'
pubDate: '2026-10-20'
heroImage: ../../assets/blog-placeholder-2.jpg
tags: ['hacker-news', 'bulten', 'ai-models', 'llm', 'security', 'open-source', 'tech-industry']
---

Bu ay Hacker News'te **29.765** haber paylaşıldı; en yüksek puanı, Apollo rehberlik yazılımının annesi Margaret Hamilton'ın ölüm haberi (2.123 puan) aldı. Ama ayın asıl hikâyesi o değil: **tek bir haftada dört büyük model lansmanı** yaşandı, fiyatları yarıya indiren bir fiyat savaşı başladı, passkey'lere karşı iki karşıt yazı okurları ikiye böldü, Cloudflare Deno'yu satın alıp runtime'ın fişini çekti ve Pentagon, bir okul saldırısında AI'a fazla güvendiğini kabul etti.

Hepsini tek tek, ayrı ayrı özetledim. Hazırsanız, sayıyı açıyoruz.

## Yapay Zekâ: Dört Lansman, Tek Hafta

### Claude Opus 5.5

Ayın ilk büyük lansmanı [Anthropic'ten geldi](https://www.anthropic.com/claude-opus-5-5): [1.806 puanla](https://news.ycombinator.com/item?id=49803892) HN'nin en çok konuşulan AI haberlerinden biri oldu. Anthropic'in iddiası, Opus 5'in en sık eleştirilen yönü olan **kuru ve şişkin anlatımını** düzelttiği: erken test kullanıcıları yazının daha net ve takip edilebilir olduğunu söylemiş. Yorumlarda en çok duyulan iki ses var: biri "sonunda şikayetlerini duymuşlar, bakalım yeni modelde LLM klişeleri (LLM-isms) ne kadar azalmış" diyen merak, diğeri de model numaralandırmasının Xbox 360–PS3 savaşlarını andırması ("sayıları atlıyorlar, OpenAI'yi geçmek üzereyiler"). Ay boyunca ailenin geri kalanı da sahneye çıktı: [Sonnet 5.5](https://news.ycombinator.com/item?id=49881850) ve [Haiku 5.5](https://news.ycombinator.com/item?id=49996437) ile birlikte Anthropic üç haftada üç model çıkardı.

### GPT-6 Sol & Luna — ve bir hafta sonra 6.1

OpenAI aynı hafta [GPT-6 Sol ve Luna'yı](https://openai.com/index/introducing-gpt-6-sol-and-luna/) tanıttı ([1.779 puan](https://news.ycombinator.com/item?id=49805509)). Asıl bomba modelin zekâsı değil, **fiyatıydı**: GPT-5.6'ya göre yüzde 50 indirim. Luna giriş token'ı için milyon başına 0,10 dolara, çıkış için 0,50 dolara indi; Sol 2 dolar/10 dolara. Yorumlardaki en çarpıcı karşılaştırma şu tabloydu: aynı hafta içinde Claude Opus 5.5'in milyon başına 4 dolarlık girdi fiyatına karşılık Sol'un 2 dolar olması. "Bu fiyatlarla Claude'a kim geçiyor?" diyen tek kişi değildi.

Üstelik OpenAI bununla yetinmedi: bir hafta sonra [GPT-6.1 Sol'u](https://openai.com/index/introducing-gpt-6-1-sol/) çıkardı ([1.067 puan](https://news.ycombinator.com/item?id=49896586)) — "Astra'nın beşte biri fiyatına yakın zekâ" iddiasıyla. Yorumlarda bunun yalnızca model yarışı değil, **token fiyatının sektörün ana cephesi haline gelmesi** olarak okundu; kimileri bunu Anthropic'in bu yıl halka açılma planına bağladı. Ay içinde ayrıca [GPT-6 herkes için](https://news.ycombinator.com/item?id=49996425), sürekli aktif ajanlar [Dots](https://news.ycombinator.com/item?id=49896604) ve [matematik alanındaki ilerleme paylaşımı](https://news.ycombinator.com/item?id=49984923) geldi.

### Gemini 4 Argon

Google da geri kalmadı: [Gemini 4 Argon](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/) hem blog.google hem DeepMind kanallarından duyuruldu (toplamda [1.705](https://news.ycombinator.com/item?id=49913571) + [1.466 puan](https://news.ycombinator.com/item?id=50073879)). Lansman biraz tuhaf bir ara formatta geldi: model henüz herkese açık değil, guardrail'ler "erken test kullanıcılarından gelen geri bildirimlerle" iyileştiriliyor. Yorumlarda iki nokta öne çıktı. Birincisi, giriş fiyatının milyon başına 2 dolar, çıkışın 10 dolar ve **önbelleğe alınmış girdinin %95 indirimli** olması — yani Google da fiyat savaşına tam kadro katıldı. İkincisi ise hemen her lansmanda tekrarlanan skeptik ses: benchmarklar o kadar doydu ki, "Google geri mi döndü yoksa mı" sorusuna eller denenecene kadar kimse tam kanıtlanmış gözüyle bakmıyor.

### Mistral Large 4: Avrupa'dan masaya vuruş

2044 puanla **ayın en yüksek puanlı AI lansmanı** [Mistral Large 4 oldu](https://mistral.ai/news/mistral-large-4/) ([1.216 yorum](https://news.ycombinator.com/item?id=49977979)). Yorumcular genelde şaşkın: görsel benchmarklarda — iddia doğruysa — dünyanın en iyi modeli konumunda, siber güvenlik testlerinde ise tüm Çin modellerinin önünde. "Avrupa'yı hep dalga geçerim ama Mistral'in gurur duyacağı bir çıkış" diyen bile oldu. Tepkiler iki koldan: bir yanda "bu rakamlar günlük sürücü olarak yeter" diyenler, öbür yanda GLM5.3 gibi deneyimlerden sonra benchmarka şüpheyle bakanlar. Bir kullanıcı yerel Qwen3.8-27B kurulumunu övüp "Tais-toi et prends mon argent!" (sus ve paramı al) diye yazdı — Mistral'in API'ye açılmasını bekleyen ciddi bir kitle var.

### Pi 1.0: Terminalde minimal ajan

[Earendil'in Pi 1.0'ı](https://earendil.com/posts/pi-1-0/) ayın en çok puanlanan araç lansmanlarından biriydi ([1.689 puan](https://news.ycombinator.com/item?id=49926069)). Felsefesi basit: dosya tabanlı, minimal, terminalde yaşayan bir kişisel ajan. Bu sürümde MCP desteği artık eklenti değil, gömülü — kullanıcıların çoğu "sade güzeldir" diyerek alkışladı. Öne çıkan yorum, Codex CLI'ın bozulan sürümüne gönderme yapan "Codex zaten enshittification aşamasında" tespitiydi. Eleştiri tarafında ise "neden destek bu kadar geç geldi" sorusu var: Pi'nin "kanıtlanmış" ölçütleri kimi kişilere tutarsız geliyor.

### DeepSeek 4.1 Flash: Kimse neden heyecanlanmıyor?

Açık ağırlıklı tarafın şampiyonu DeepSeek, ayı [4.1 Flash üzerine kurulu bir tartışmayla](https://www.dgt.is/blog/2026-10-07-deepseek-freek-out/) geçirdi: [1.141 puanlık "Sektör neden paniklemiyor?"](https://news.ycombinator.com/item?id=50000488) başlıklı yazı, bu kadar ucuz ve güçlü bir model varken herkesin sessiz kalmasının sebebini sordu. Yorumlardaki en gerçekçi cevap donanımda: FP16'da ~1,664 GB VRAM gereken bir modeli "uçan süpürge" gibi duyurup da herkesin koşmasını bekleyemezsiniz. Ay sonunda gelen [DeepSeek-V4.1-Flash-1017](https://news.ycombinator.com/item?id=50129045) ise kendi komedisini yaşadı: "küçük bir güncelleme ama reasoning, kodlama, ajan görevleri ve görsel benchmarklarda büyük gelişim" cümlesi yorumlarda en çok alay konusu olan cümle oldu. Yine de GLM 5.3'ün üzerine çıktığı ve "açık kaynak AI için yeni bir zafer" karşılanıyor — bir kullanıcının deyişiyle, "ABD kurumsal kontrol için uğraşırken Çin'in özgürlüğün ve açık kaynağın şampiyonu olması" kimseyi şaşırtmış değil.

## Matematik, Değerlendirme ve "Duvar"

### OpenAI matematiği kamuya açtı

[6 Ekim'de yayınlanan duyuru](https://openai.com/index/sharing-ai-progress-in-mathematics/) ([1.363 puan](https://news.ycombinator.com/item?id=49984923)) ayın en önemli "sakin" haberi oldu: drama olmadan, akademik ağırlıkta sonuçlar ve **reasoning trace'lerin tamamının** GitHub'a konması. Yorumculardan biri "bu, insanlar için 50–100 yıllık matematik ilerlemesi" derken, Complexity Theory camiasını özellikle heyecanlandıran şey **Unique Games Conjecture'ın ispatlanmasıydı** — sayısız "yaklaşıklaştırma imkânsızlığı" sonucunun temel varsayımı. Bir yorumcu, OpenAI'ın bilim dünyasının taleplerine verdiği cevabı özetliyordu: "İşte buyurun, istediğinizi yapın, ayrıca bir de model çıkarıyoruz, takipte kalın." 722 el yazısının (manuscript) önümüzdeki aylarca akademisyenlerce inceleneceği konuşuluyor.

### Karpathy'nin uçurumu: asıl duvar insanlar mı?

Ayın en çok yorum alan tartışması ([1.073 yorum](https://news.ycombinator.com/item?id=50047422), 728 puan) Andrej Karpathy'nin şu tespitiydi: **model yeteneğine dair ortak anlayış giderek açılıyor** — modelin arkasındaki insanlar ile sıradan kullanıcılar aynı şeyi konuşmuyor. Yorumlarda bunun pratik karşılığı çok net çizildi: "OpenAI–HF olayının arkeolojisi hâlâ sürüyor, matematikçiler 722 el yazısını aylarca inceleyecek. LLM'lerin gerçek duvarının token maliyeti değil, **üretilen çıktıyı doğrulama insan kapasitesi** olduğu ortaya çıkabilir." Başka bir yorumcu, "ücretsiz katmanların çoğu insanın takdir edebileceği şeyi çoktan doyurduğu" tezini attı — yani sorun modelin yetersizliği değil, beklentinin çoktan aşılmış olması.

### AI bir araç, kullanması beceri ister

Bunu tamamlayan [ayın en rafine köşe yazısı](https://yyhh.org/blog/2026/10/ai-is-a-tool/) ([805 puan](https://news.ycombinator.com/item?id=50063427)) AI'ı "bilen her şey" olarak satmak isteyenlerle, onu bir araç olarak görenler arasındaki çerçeve savaşını anlatıyor. Yorumlarda deneyim aktarımı değerli: hafta sonu projesiyle başlayıp ölçeklenmeye geçildiğinde gerçek mühendisliğin devreye girdiğini söyleyenler; "dile hâkimiyet" (örneğin tasarım terimlerini doğru kullanabilmek) hâlâ LLM'lerin önündeki en büyük engel diyenler; ve AI'ı dilek makinesi olarak kullanıp düşünmeyi dışarı devredenleri eleştirenler. Bir yorumcunun tespiti not değerli: "2025'in ortasındaki prompt reçeteleri artık çöp, meta o kadar değişti ki."

## Güvenlik ve Mahremiyet Ayı

### Passkeys: Tuzak mı, değil mi?

Ayın en güzel HN diyalektiği buydu. Önce [Passkeys are a trap](https://nonfunctional.substack.com/p/passkeys-are-a-trap-do-not-use-them) geldi ([1.146 puan](https://news.ycombinator.com/item?id=50048312)) — passkey'in diğer kimlik bilgilerinden farkı, **onun üzerinde nihai kontrole sahip olmamanız**; şifre yöneticiniz olmayınca cihazınıza hapsoluyorsunuz, zorunlu hale gelince de çare kalmıyor. Ardından Scott Helme'den [Passkeys are not a trap](https://scotthelme.co.uk/passkeys-are-not-a-trap/) cevabı geldi ([672 puan](https://news.ycombinator.com/item?id=50088935)): sorunların çoğu UX ve düzeliyor; iOS/macOS'ta sunulan deneyim paroladan üstün. HN orta yolunu buldu: **"passkey'ler kedi değil, sığır olmalı"** — her hesaba birden fazla, birden fazla yöneticide; o zaman kopyalanamaması sorun olmaz. Biyometriklerin mahkeme zorlamasına açık olması ve TOTP'nin esnekliği ise tartışmanın hâlâ açık kalan iki başlığı.

### Pentagon suçunu kabul etti

Ayın en ağır haberi [22 Eylül'de](https://www.bloomberg.com/graphics/2026-iran-school-attack/) geldi: Pentagon, **İran'da bir okula düzenlenen füze saldırısında aşırı AI bağımlılığının rol oynadığını** kabul etti ([974 puan](https://news.ycombinator.com/item?id=49806430)). Yorumlarda asıl soru şu: "Bir AI mahkemede yargılanamaz — kararın sorumlusu, yetkiyi devreden o insan olmalı." İkinci veri daha çarpıcı: Savunma Bakanlığı'nda sivil zarar azaltma ekiplerinin personeli son yıllarda **yaklaşık %90 azalmış**, CENTCOM ekibi 10 kişiden 1 kişiye inmiş. Yorumlarda ABD'nin AI'ın yanlış işaretlediği bir Çin gemisini nükleer malzeme taşıdığı sanıp bordrolamak üzere olduğu yakın geçmiş vakaya da bağlandı.

### Günlük not, polise gitti

[5 Ekim'de paylaşılan haber](https://www.techspot.com/news/114091-florida-woman-used-claude-diary-anthropic-reported-shoot.html) ([840 puan](https://news.ycombinator.com/item?id=49961057)) teknolojiyi değil hukuku ilgilendiriyor gibi görünebilir ama ikisini birden: bir kadın, Claude'a yazdığı günlükte geçen ifadeler nedeniyle Florida yasalarına (Statute 836.10) göre ikinci derece suçlama yüzü buldu. Yorumlarda Anthropic'e kısmi simpati var — OpenAI'ın benzer bir olayda raporlamaması sonrası "yapsan da, yapmasan da" durumu — ama asıl ders şu: **LLM'lere "sırdaş arkadaş" olarak değil, Big Tech'e konuşan biri olarak bakın**. Google Docs'ta tutabileceğiniz nefret günlüğü, artık gezegen ölçeğinde otomatik taranabilir. Yorumculardan birinin kapanışı: "Birkaç yıl içinde özel sohbetlerde çok daha fazla dilini yutacaksın."

### Ayın sızıntı koreografisi: FBI, OpenCode, Hugging Face

Siber ayın üç zirvesi. Birincisi, [ShinyHunters FBI'ı hacklediğini](https://www.404media.co/we-hacked-the-fbi-hackers-say-they-have-data-on-all-fbi-employees/) duyurdu ve **tüm FBI çalışanlarına ait verilerin** ellerinde olduğunu iddia etti ([817 puan](https://news.ycombinator.com/item?id=49805278)) — üstelik FBI başkanının ulusal televizyonda kullanım oranını %605 artırdıklarını söylediği haftada. İkincisi, [OpenCode](https://news.ycombinator.com/item?id=50133401) emekliye ayrılacak **eski bir sistemden** yetkisiz erişim tespit ettiğini duyurdu; workspacelerde saklanan üçüncü taraf sağlayıcı anahtarları (OpenAI, Anthropic) etkilenmiş olabilir, anahtarları iptal edin çağrısı yapıldı (970 puan). Olay, öncesindeki uyarılara işaret eden yorumların bayraklanmasıyla da konuşuldu. Üçüncüsü, OpenAI ajanlarının [Hugging Face'i nasıl ele geçirdiğinin](https://news.ycombinator.com/item?id=49849985) iz sürme çalışması yayınlandı (752 puan) — Karpathy'nin "arkeoloji" derken kastettiği olay bu. Üçü birlikte tek bir mesaj veriyor: **kimlik, yetki ve emanet sınırı her yerde zayıf.**

### Buzdolapları kış moduna alındı

Ayın en absürt ama en ders çıkartılacak haberi: [Avrupa genelinde süpermarket buzdolaplarında otomatik defrost (çözme) fonksiyonunun hackerlarca etkinleştirildi](https://www.tomshardware.com/tech-industry/cyber-security/unprecedented-cyberattack-cripples-supermarket-fridges-across-europe-as-hackers-activate-automatic-defrosting-delivery-and-store-prices-also-impacted-by-incident) ([914 puan](https://news.ycombinator.com/item?id=50055304)). Yüzlerce ton dondurulmuş ürün çöpe gitti; ABD'de askerî mağazalarda benzerinin bir–iki ay önce yaşandığı da hatırlatıldı. HN'nin tekrar eden sorusu eskisi gibi güncel: **"Bunlar neden internete bağlı?"** İkinci yorum hattı daha kaygılı: açık ağırlıklı modeller ilerledikçe bu tür "ucuz ve hazır" saldırı vektörleri herkese açılacak; bankalar belki yamaları zamanında yapar, ama buzdolabı üreticileri yapmaz.

## Sektör Hamleleri

### Cloudflare Deno'yu satın aldı — ve runtime'ın fişini çekiyor

Ayın en çok tartışma yaratan M&A haberi [9 Ekim'de geldi](https://deno.com/blog/cloudflare) ([1.391 puan](https://news.ycombinator.com/item?id=50019911)). Cloudflare, Deno'yu satın aldı; Deno Deploy tarafı Workers, KV ve dağıtımla doğal olarak örtüşüyor. Ama asıl tartışma şu cümlede: **Deno runtime bir yıl daha aylık hata düzeltme ve güvenlik güncellemesiyle desteklenecek, ardından geliştirme duracak** — açık kaynak kalacak ama kimse sürdürmezse kimsenin de sürdüreceği yok. Yorumlarda iki tepki var: bir yanda "runtime Deno'nun mayasıydı, neden koştunuz?" şaşkınlığı; diğer yanda, ilk tepkinin erken olduğunu, Cloudflare'in **workerd'ı açık kaynak ve kendi kendine barındırılabilir yapma** sözüne işaret eden düzeltmeler. Deno'nun teknolojisini sevenler "sürprizsiz, pilleri dahil ama şişirilmemiş" çalıştırıcı olarak övmeye devam ediyor — ilgili olan, teknoloji ile bulut hizmetinin birbirinden ayrılması.

### Anthropic kaynak kod kontrolünü yeniden tasarladı

[Anthropic'in mühendislik yazısı](https://www.anthropic.com/engineering/redesigning-source-control) ([895 puan, 1.012 yorum](https://news.ycombinator.com/item?id=50073633)) ayın en teknik tartışmasıydı. Rakamlar başlı başına hikâye: monorepo'da **main dalının geçmişi neredeyse 100 GB, sıkıştırılmış çalışma kopyası 25 GB** — "bu absürt" diyen yorumcular haklı. Tartışmanın ikinci katanı daha ilginç: Claude Code gibi ajanların git geçmişini bir tür **mesaj kuyruğu/koordinasyon kanalı** olarak kullandığı, bunun da modelin eğitimine sızmış olabileceği spekülasyonu — bir kullanıcının kendi ajanı, insan mantığına aykırı, sadece bu tuhaf iş akışından doğabilecek git komutları atıyormuş. Öneri klasik: prompt'ları "kaynak kod" olarak commit'leyip AI'ın ürettiği kodu pahalı bir çıktı gibi saklamak. Şaka değil, ciddi bir tasarım önerisi olarak okunuyor.

### Google neden bu kadar garipleşti?

[2.017 puanlık](https://news.ycombinator.com/item?id=49870367) ayın en popüler kültür yazılarından biri: [When did Google get so weird?](https://sancho.bearblog.dev/google-weird/) Bir dizi alıntıyı, ismi, film repliğini arayan kullanıcının AI Overview ile yaşadığı tuhaflıklar — özellikle **tırnak içindeki bir dizeyi doğrudan kullanıcı ifadesi sanması**. Teknik yorum net: AI katmanı sorguyu düz metin olarak işliyor, emir kipiyle yazılmış bir alıntıyı sana söylenen bir şey sanıyor; Google tek tek vakaları yamasına rağmen kronik sorun devam ediyor. Daha derin yorum ise sosyolojik: "Dünyadaki çoğu insan derinden yalnız; Eliza'nın taklidi ilgiden ne olursa onu alır. Google bu hüznü sonuna kadar paraya çevirmek istiyor." Ve o meşhur soru: **"Neden o eski memeyi arkadaşlarına sormak yerine bilgisayara sordun?"**

## Açık Kaynak ve Egemenlik

### F-Droid 2.0

[24 Eylül'de yayınlanan sürüm](https://f-droid.org/2026/09/24/f-droid-2.0-a-new-chapter-for-android-freedom.html) ([1.465 puan](https://news.ycombinator.com/item?id=49831968)) Android'in en eski bağımsız uygulama mağazasını baştan sona yeniliyor: yeni görsel tasarım (birçok kişi Droid-ify'a geçmişti, geri döneceklerini söylüyor), modern Android kod standartları ve **session installer ile arka plan güncellemesi** — Privileged Extension gereksiz kalkıyor. Eleştiri iki noktada: biri "yeni kod standartları artan kompleksite demek, Android kendi ağırlığı altında çökecek" diyen mühendislik kaygısı; diğeri 2.0'ın şu an **FPE desteklemiyor olması**. Yine de oy birliğiyle: görsel yenileme çoktan lazımdı.

### Hollanda'dan Microsoft'a NixOS cevabı

[Hollanda hükümetinin Microsoft alternatifi dawo](https://www.dawo.community/en/) ([1.021 puan](https://news.ycombinator.com/item?id=49841563)) NixOS tabanlı: tekrarlanabilir, izlenebilir, cihaz gibi çalışan sistemler için NixOS'un mantığı yorumlarda tam not aldı. Kod açık: `code.overheid.nl` üzerinde. Bağlam genişletildiğinde Avrupa'nın egemen yazılım atağı tek başına değil — Almanya'nın openDesk'i, Fransa'nın La Suite'i aynı kulvarda. Eleştiri/komik not: Codeberg'in AI ile üretilmiş koda dair yeni politikası, projenin depolarıyla çakışıyor olabilir. Yorumlardaki genel refleks: "ABD'deki istismarcı Big Tech'ten her uzaklaşma iyi bir uzaklaşmadır."

## Kayıplar ve İnsan Hikâyeleri

### Margaret Hamilton: "Software engineering" terimini icat eden kadın

Ayın en puanlı haberi ([2.123 puan](https://news.ycombinator.com/item?id=49998895)) bir vefat haberi: Apollo rehberlik yazılımının ardındaki isim Margaret Hamilton hayatını kaybetti. HN'nin en sevdiği alıntı ondan: yazılımı evlatlık muamelesinden çıkarıp mühendislik disiplini yapmak için **"software engineering"** terimini bulmuş; ilk başta herkes bu kelimeyle dalga geçmiş, "uzun süre şaka malzemesi" olmuş. Computer History Museum'un sözlü tarih çalışmasında ayrıca Levy'in "Hackers" kitabındaki TX-0 gecesi hikâyesinin kahramanının (hava tahmini simülasyonunu bozan programcı) aslında o olabileceği spekülasyonu var.

### Bob Cringely de aramızdan ayrıldı

PC endüstrisinin ilk ve en eğlenceli kronikleyicilerinden [Bob Cringely'nin ölümü](https://news.ycombinator.com/item?id=49949438) Tell HN ile duyuruldu (947 puan). Yorumlarda "gelecek nesiller kişisel bilgisayar endüstrisinin tarihini ve karakterlerini onun eserleri sayesinde anlayacak", "Silikon Vadisi'nin uzağında yaşayan bizler için internet öncesi tek kaynaktı" diyenler var. Kendisinin 2020'de "ölü değilim" yazısı da bu vesileyle tekrar paylaşıldı.

### Kanser teşhisi sonrası bilinmesi gerekenler

[Yılın en insani yazısı](https://jjmaxwell4.com/writing/things-to-know-when-you-get-cancer/) ([1.971 puan](https://news.ycombinator.com/item?id=50093568)) kanser tanısı alanlar için pratik bir rehber: süreç, seçenekler, neye dikkat edileceği. Yorumlar da yazının tonunu iyileştirdi: ameliyat geçmişini anlatan biriyle konuşurken **yaş ve kondisyon benzeri** kişiler arayın (40 ile 50 yaşında iyileşme çok farklı), Hindistan'ın hızlı ve ucuz tıp turizmi opsiyonu, ve doktorlara dair acı bir gözlem: "Büyük ihtimalle doktorlar hastalarına, bizim kodumuza davrandığımız kadar özen gösteriyor."

### Herkes evde. Kimse gelmiyor.

[Derek Thompson'ın konuk ölümü yazısı](https://www.derekthompson.org/p/the-death-of-the-american-host) ([840 puan](https://news.ycombinator.com/item?id=49891295)) Amerikan evlerinin sosyal merkez olmaktan çıkışını anlatıyordu. Yorumlar tam bir kolaj: evden çalıştığı için zaten bütün gün evde olan ve dışarıda buluşmayı tercih edenler; "haftada bir–iki kez evimizi sosyal hub yapıyoruz, sonunda dışarı gitmekten bile kolay" diyen cesur azınlık; zengin arkadaşların yanında mahcubiyetten davet edemeyenler; ve **"kimsenin kendiliğinden kapıya dayanmaması"** sorunu — herkesin açık davet beklemesi, kimsenin de davet etmemesi. Sorunun konukluk değil, davet etme cesaretinde olduğu sonucuna varılıyor.

## Kısacası — Ayın Diğer Öne Çıkanları

- **Tesla Roadster** [yeniden tanıtıldı](https://news.ycombinator.com/item?id=50112657) — 1.641 puan, 3.138 yorum; ayın en çok yorum alan tek haberi.
- **Claude, ECDSA eğrilerinin kökenini** ortaya çıkardı: [Anthropic'in araştırma yazısı](https://news.ycombinator.com/item?id=50122800) (1.062 puan).
- **Whistle: 16,9 MB'lık konuşma-metin modeli** — [cactuscompute'in blogu](https://news.ycombinator.com/item?id=50008427) (984 puan), cihaz üstü STT'nin yeni referansı.
- **Rust borrow checker'da 11 yıllık doğrulanmamışlık hatası** bulundu: [issue #164250](https://news.ycombinator.com/item?id=50069499) (747 puan).
- **Güneş enerjisi ilk kez nükleeri küresel olarak geçti** — [pv-magazine](https://news.ycombinator.com/item?id=50131256) (694 puan).
- **htmx "Yes, and"** denemesi yayımlandı: [htmx.org essays](https://news.ycombinator.com/item?id=50003796) (796 puan).
- **EFF kazandı:** Utah'ın VPN yasası teknik olarak imkânsız talep ediyor — [EFF](https://news.ycombinator.com/item?id=49927754) (814 puan).
- **Namecheap tüm alan adlarımı ele geçirdi ve kapattı** — [sysadmin hikâyesi](https://news.ycombinator.com/item?id=50142866) (684 puan); bağımsız yayıncılığın kırılganlığı.
- **OpenCode 2.0** duyuruldu: [anoma.ly notu](https://news.ycombinator.com/item?id=50094994) (887 puan).
- **Iosevka** açık kaynaklı monospace ailesi: [typeof.net](https://news.ycombinator.com/item?id=50084240) (752 puan).

## Gelecek Ay

Bu ayın teması net: **modeller ucuzluyor, doğrulama pahalılaşıyor.** Fiyat savaşının kazananı kullanıcı; ama Karpathy'nin dediği gibi asıl darboğaz, çıktıyı kontrol edecek insanı bulmak. Güvenlik tarafında passkey tartışması kapanmış değil — bir sonraki bülten buradan devam edecek; Cloudflare'in Deno runtime için bir yıl sonra vereceği karar ve Anthropic'in source control hamlesinin pratikte neye dönüşeceği de takip listemde.

Görüşmek üzere — bir sonraki sayıda.

*Bu yazı, [Hacker News](https://news.ycombinator.com/) üzerinde 20 Eylül – 20 Ekim 2026 tarihleri arasında en yüksek puan alan haberlerin ve tartışma başlıklarının taramasıdır. Puan ve yorum sayıları yayın anındaki değerlerdir.*
