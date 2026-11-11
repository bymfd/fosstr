---
title: 'OpenShell: NVIDIA''nın ajan kum havuzu CNCF''ye geçti'
description: 'NVIDIA, otonom AI ajanlarını politika ile sınırlayan OpenShell''i CNCF Sandbox''a bağışladı. Çekirdek seviyesinde izolasyon, Cedar politikaları ve kurulum rehberi.'
pubDate: '2026-11-11'
heroImage: ../../assets/blog-placeholder-5.jpg
tags: ['ai', 'agents', 'cncf', 'kubernetes', 'security', 'nvidia', 'open-source']
---

AI ajanları artık yalnızca sohbet etmiyor; dosya okuyor, paket kuruyor, API çağırıyor, kabuk komutu çalıştırıyor. Bu yetenekler işe yaradığı için değerli, ama aynı yetenekler bir hata veya istem enjeksiyonu (prompt injection) durumunda felakete dönüşebiliyor. Ajanın eline verdiğiniz kimlik bilgileri, erişebildiği dosyalar ve konuşabildiği ağ, onun güvenlik sınırınızı belirliyor.

10 Kasım 2026'da KubeCon + CloudNativeCon North America'da NVIDIA, bu sınırı yönetmek için geliştirdiği **OpenShell** projesini Cloud Native Computing Foundation'a (CNCF) bağışladığını duyurdu. Proje, CNCF **Sandbox** seviyesine kabul edildi. Bu yazı, OpenShell'in ne yaptığını, nasıl kurulduğunu ve neye güvenip neye güvenmemek gerektiğini anlatıyor.

## OpenShell nedir?

[OpenShell](https://github.com/NVIDIA/OpenShell), otonom AI ajanlarını güvenli ve politika denetimli bir çalışma zamanında çalıştıran bir altyapı. Ajanın kendisini değiştirmiyor; ajanın etrafındaki ortamı kontrol ediyor.

Temel fikir şu: Ajan, dosya sistemine, ağa ve kimlik bilgilerine doğrudan erişmesin. Bunun yerine izole bir kum havuzunda (sandbox) çalışsın; her dosya erişimi, sistem çağrısı ve ağ bağlantısı politika kontrolünden geçsin. Ajan gerçek kimlik bilgilerini hiç görmesin; OpenShell, kimlik bilgisini yalnızca onaylı bir uç noktaya giden isteğe eklesin.

İki katmanlı bir savunma var:

- **Çekirdek seviyesinde zorlama.** Her ajan ayrı bir kum havuzunda çalışıyor. Hangi dosyalara erişebileceği ve hangi sistem çağrılarını yapabileceği çekirdek kontrolleriyle sınırlanıyor. Her ağ bağlantısı, kum havuzundan çıkmadan önce politika kontrolünden geçiyor.
- **Biçimsel doğrulamalı politika değişiklikleri.** Bir politika değişikliği onaylanmadan önce OpenShell, bu değişikliğin hangi yeni erişimleri açacağını biçimsel doğrulama ile işaretliyor. Örneğin yeni bir host'a kimlik bilgisiyle erişim veya yeni bir API metodunun çağrılması, insan incelemesi bekliyor.

Politika dili olarak **Cedar** kullanılıyor. Cedar da CNCF projesi; yani OpenShell, başka bir CNCF projesinin üzerine inşa edilmiş oluyor. Bu, CNCF ekosisteminde beklenen bir olgunluk işareti.

## Neden CNCF'ye taşındı?

OpenShell'in ilk commit'i 29 Ocak 2026. Yani proje bir yıldan kısa sürede 21 binin üzerinde GitHub yıldızına ve 2.700'den fazla katkıcıya ulaştı. Bu hız, tek bir şirketin kontrolündeki bir güvenlik katmanı için hem başarı hem de risk.

NVIDIA'nın açıklamasına göre proje, NVIDIA, Red Hat, Docker ve Canonical'dan çekirdek katkıcılarla başladı. CNCF Sandbox'a geçişle birlikte geliştirme, **ai-openshell** adlı tarafsız GitHub organizasyonuna taşınıyor. Geçiş tamamlanana kadar kod, issue ve pull request'ler NVIDIA/OpenShell deposunda kalıyor.

[CNCF duyurusu](https://www.cncf.io/blog/2026/11/10/welcoming-openshell-to-the-cncf-open-governance-to-secure-agentic-ai/) şunu vurguluyor: "Ajanların altyapı katmanı ortak, satıcıdan bağımsız ve ona bağlı olan herkese açık olmalı." Bu, özellikle ajan güvenliği gibi hassas bir konuda önemli. Politikayı tek bir satıcının yol haritası belirlememeli.

## Kurulum

OpenShell; Linux, Apple Silicon üzerinde macOS veya WSL 2 ile Windows'ta çalışıyor. Docker, Podman veya ana makine sanallaştırması gerekiyor. Hızlı başlangıç:

```bash
curl -LsSf https://raw.githubusercontent.com/NVIDIA/OpenShell/main/install.sh | sh
openshell sandbox create --name demo
```

Kurulum betiği CLI'yı ve yerel bir ağ geçidini (gateway) kuruyor. Varsayılan kum havuzu imajı, ajan yüklü olmayan minimal bir Ubuntu. Gerçek bir ajan çalıştırmak için [Run Your First Agent](https://docs.nvidia.com/openshell/latest/about/run-your-first-agent) rehberi, ücretsiz bir OpenRouter modeliyle OpenCode'u çalıştırıyor ve ajan yeni erişim istedikçe nasıl onay verileceğini gösteriyor.

Not: `curl | sh` her zaman riskli. Betiği indirip inceleyerek de kurabilirsiniz:

```bash
curl -LsSf https://raw.githubusercontent.com/NVIDIA/OpenShell/main/install.sh -o install.sh
less install.sh
sh install.sh
```

Kodlama ajanınıza OpenShell kullanmayı öğretmek için:

```bash
npx skills add NVIDIA/OpenShell
```

SDK'lar da var: Python (`uv add openshell`), TypeScript (`@nvidia/openshell-sdk`), Go ve Rust. SDK'lar uygulamanızı bir OpenShell ağ geçidine bağlıyor; CLI'yı kurmuyor.

## Mimari

OpenShell üç parçadan oluşuyor:

| Bileşen | Görevi |
|---|---|
| **Gateway** | Kontrol düzlemi: kum havuzları, politika ve erişim yönetimi |
| **Supervisor** | Kum havuzunun dışında çalışır; her isteği politikaya göre denetler ve kaydeder |
| **Sandbox** | Ajanın çalıştığı izole ortam |

Ajan, kum havuzundan dışarı doğrudan ağ erişimi yapamıyor. Her istek supervisor'dan geçiyor; supervisor politikayı uyguluyor ve kararı kaydediyor. Kimlik bilgileri yalnızca onaylı uç noktalara giden isteklerde ekleniyor.

Kubernetes üzerinde çalıştırmak için Helm chart'ı var. Ancak önemli bir şart: CNI'nizin `NetworkPolicy` uygulaması gerekiyor. Aksi halde ağ politikaları kâğıt üzerinde kalır.

## Ajan güvenliğinde neyi çözüyor?

Klasik yaklaşım, ajana bir konteyner vermek ve içine ihtiyacı olan her şeyi koymak. Ama konteyner izolasyonu, ajanın konteyner içinde yapabileceklerini sınırlamaz. Ajan, konteynerdeki tüm dosyaları okuyabilir, tüm ağa çıkabilir ve ortam değişkenlerindeki tüm sırları görebilir.

OpenShell bunu üç noktada daraltıyor:

- **Dosya erişimi**: Ajan yalnızca politikada izin verilen yolları görüyor.
- **Ağ erişimi**: Yalnızca izin verilen host'lar ve portlar; her bağlantı denetleniyor.
- **Kimlik bilgileri**: Ajan sırrı görmüyor; sır, onaylı uç noktaya giden isteğe supervisor tarafından ekleniyor.

Bu, özellikle şu senaryolarda anlamlı:

- Kodlama ajanlarına depo erişimi vermek, ama üretim sırlarına erişim vermemek,
- Ajanın dış API'lere çıkmasını kontrol etmek,
- Çok kiracılı (multi-tenant) bir ortamda her ekibin ajanını ayrı politika ile sınırlamak,
- Ajanın çalıştırdığı komutları denetlemek ve tekrarlanabilir hale getirmek.

## Neye dikkat etmeli?

OpenShell ilginç bir proje, ama sihirli bir güvenlik katmanı değil. Birkaç sınırı var:

**1. Sandbox seviyesi.** CNCF Sandbox, "deneysel, üretimde yaygın test edilmemiş" anlamına geliyor. OpenShell henüz olgunluk seviyelerinin en altında. Üretimde kullanacaksanız kendi risk değerlendirmenizi yapın.

**2. Genç proje.** İlk commit Ocak 2026. Altı ayda 21 bin yıldız etkileyici, ama aynı zamanda hızlı değişen bir API ve olgunlaşmamış kenar durumları demek.

**3. Politika doğru yazılmalı.** Yanlış yapılandırılmış bir politika, ajanı gereğinden fazla serbest bırakabilir. Biçimsel doğrulama yardımcı oluyor, ama "onayladım" demek "güvenli" demek değil. Değişiklikleri gözden geçirin.

**4. Kimlik bilgisi yine de güçlü.** OpenShell sırrı ajandan saklıyor, ama onaylı uç noktaya giden isteğe ekliyor. Ajan, o uç noktayı kötüye kullanacak bir istek üretebilirse sır hâlâ risk altında. Yetki kapsamını dar tutun.

**5. Telemetri.** OpenShell anonim telemetri topluyor. Kum havuzu adları, dosya yolları, istemler veya kimlik bilgileri toplanmıyor; yalnızca operasyonel kategoriler ve sayılar. Yine de kapatmak isterseniz ağ geçidinde `OPENSHELL_TELEMETRY_ENABLED=false`, Helm kurulumunda `server.telemetryEnabled=false` ayarlayabilirsiniz.

**6. Taşınma süreci.** Proje şu an ai-openshell organizasyonuna taşınıyor. Dokümantasyon ve depo adresleri değişebilir; otomasyon yazarken sabit URL'lere değil, sürümlenmiş referanslara bağlanın.

## Kim denemeli?

Kendi ajanlarını çalıştıran ve "bu ajan tam olarak neye erişebiliyor?" sorusuna net cevap vermek isteyen ekipler için OpenShell ciddi bir aday. Özellikle Kubernetes üzerinde çok sayıda ajan çalıştırıyorsanız, ağ politikası ve kimlik bilgisi yönetimini tek bir katmanda toplamak işleri kolaylaştırabilir.

Basit bir yerel kurulum için ise hızlı başlangıç yeterli: bir kum havuzu oluşturun, içine OpenCode kurun, ajanın hangi erişimleri istediğini görün ve tek tek onaylayın. Bu deneme, ajan güvenliğinin neden "konteynere koy ve unut" olmadığını hızlıca gösteriyor.

OpenShell'in CNCF'ye geçişi, ajan güvenliğinin tek bir satıcının kontrolünden çıkıp ortak bir altyapı sorununa dönüştüğünün işareti. Proje henüz genç; ama yön doğru. Ajanlara kabuk erişimi veriyorsanız, en azından politikayı nerede uyguladığınızı bilmeniz gerekiyor.
