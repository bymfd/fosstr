---
title: 'Neden her şey 2shell oluyor?'
description: 'Her bug 2shell olmaz; ama auth öncesi native parser/runtime hataları zincirlenince shell çıkar. Pazarlama etiketi ile gerçek örüntüyü ayıran saha rehberi.'
pubDate: '2026-11-19'
heroImage: ../../assets/neden-her-sey-2shell-oluyor-hero.jpg
tags: ['security', 'rce', 'cve', 'memory-corruption', 'open-source']
---

Son haftalarda PHP, Ruby, Java, NGINX, QUIC, WordPress ve control-plane katmanları için aynı bitirme cümlesini gördük: `...2Shell` ya da `...2Root`. Bu bir tesadüf değil, ama bir teşhis de değil. **2shell bir kök neden değil, zincirin sonundaki çıktı.**

Kısa cevap: pazarlama var, ama sorun da gerçek. Araştırmacılar akılda kalan isimler veriyor; satıcılar ise CVE, CVSS ve yama sürümü yayınlıyor. İki anlatımı karıştırmak, "her Java uygulaması RCE olur" gibi yanlış bir sonuca götürüyor. Doğru soru şu: **hangi güven sınırında, hangi primitive oluşuyor, hangi ayrıcalıkla sonlanıyor?**

```text
2shell = herkese açık erişim
       + memory-safety primitive
       + saldırganın kontrol ettiği heap düzeni
       + pointer leak / ASLR bypass
       + callable gadget / callback
       + ayrıcalıklı process
```

Bu halkalardan biri eksikse ortaya çıkan şey genelde DoS, bilgi sızdırma veya yerel privesc olur; shell çıkmaz.

![2shell zinciri: erişim, primitive, layout, leak, gadget, ayrıcalıklı process](/diagrams/neden-her-sey-2shell-oluyor.svg)

## 1. İsim pazarlama, mekanizma mühendislik

`Ruby2Shell`, `Java4Shell`, `php2shell`, `Broccoli2Shell`, `nginx2root` gibi adlar bir bulgunun kısa etiketi. Satıcı advisory'lerinde bu isimler genelde geçmez; orada `CVE-2026-132825`, `GHSA-34m4-m9fh-gqp5` veya `CVE-2026-119618` yazar.

Bu ayrım önemli:

| Etiket | Ne anlatır | Ne anlatmaz |
|---|---|---|
| `2shell` / `2root` | Elde edilen sonucu | Hatanın sınıfını |
| CVE / GHSA | Spesifik açığı ve yama kapsamını | Hangi uygulamanın tetiklediğini |
| CVSS | Teknik etki vektörünü | Sizin ortamınızda istismar edilebilirliğini |
| PoC | Bir tetikleme yolunu | Herkese açık, kararlı bir exploit olduğunu |

Aynı "2shell" başlığı altında çok farklı hatalar toplanabiliyor:

- [Ruby2Shell](/blog/ruby2shell-cve-2026-132825): eski encoding'lerde case conversion sırasında tek baytlık heap taşması.
- [php2shell](/blog/herkes-phpye-dalmisken): engine seviyesinde OOM corruption ve stale global state.
- [Broccoli2Shell](/blog/broccoli2shell-brotli-acigi): Brotli decoder'da sınır dışı yazma.
- [nginx2root](/blog/nginx2root-cve-2026-123007): HTTP/2 flow-control underflow ve worker heap corruption.
- [mod_http2](/blog/apache-mod-http2-cve-2026-119618): paylaşılan HPACK durumunda race.

Yani "her şey 2shell oluyor" cümlesi doğru değil; doğrusu **"aynı güven sınırındaki farklı memory-safety hataları aynı sonuç sınıfına yakınsıyor."**

## 2. Ortak zincirin altı halkası

### 2.1 Erişim: parser, kimlikten önce çalışır

Bir sunucu bir isteği authentication'dan önce okumak zorundadır. Header, HTTP/2 frame'i, QUIC paketi, TLS uzantısı, sıkıştırılmış body, Base64 credential, görsel metadata veya XML-RPC payload; hepsi kimlik doğrulanmadan önce parse edilir.

Bu yüzden en tehlikeli yüzey "giriş sayfası" değil, **trust boundary'nin kendisidir**. cPanel'deki WP Toolkit proxy vakasında da olduğu gibi, panel arayüzüne giriş yapmış olmak gerekmiyor; public proxy katmanı panel seviyesinde bir aksiyona köprü kuruyor. Bkz. [cPanel WP Toolkit proxy](/blog/cpanel-wptk-proxy-rce).

### 2.2 Primitive: okuma/yazma yetkisi kazanmak

Memory corruption tek başına RCE değildir. Önce bir primitive gerekir:

- heap buffer overflow,
- use-after-free,
- integer/flow-control underflow,
- race kaynaklı stale state,
- deserialize edilen gadget chain,
- JIT veya native intrinsic içinde yanlış bounds check.

Ruby2Shell'de `ß → SS` dönüşümü bir bayt fazla yazdırıyor. MsQuic'te `CVE-2026-105016` / `GHSA-v2xv-r72g-h8j2` kaydında IPv6 üzerinde send allowance manipülasyonu `uint16_t` underflow'a, ardından stream framing sırasında heap out-of-bounds write'a gidiyor. Brotli vakasında decoder'ın 8 baytlık internal buffer'ı taşıyor. Farklı kod, aynı ilk halka.

### 2.3 Layout control: heap'i saldırganın şekillendirmesi

Modern heap exploitasyonu "bir bayt taşırdım, shell aldım" kadar basit değil. Saldırgan genelde istek boyutları, lifecycle ve allocation sırasıyla heap düzenini kontrol eder; boşlukları doldurur, aynı boyutlı objeleri yan yana getirir, freed chunk'ı geri kazanır.

Bu nedenle bazı PoC'ler yüksek kaynak tüketir. nginx2root PoC'si yaklaşık 119 GiB plaintext ve özel bir resource profile kullanıyor; bu, açığın ciddiyetini azaltmaz ama "tek paketle her yerde patlar" demek de doğru olmaz.

### 2.4 Leak: adresleri bilinir hale getirmek

ASLR/PIE ayarlı bir process'te keyifli bir OOB write bile hedefi bulamayabilir. Bu yüzden zincirde çoğu zaman bir bilgi sızıntısı olur: freed pointer, function pointer, vtable veya başka bir heap adresinin okunması.

Ruby2Shell'in aynı duyuru setindeki bazı Regexp açıkları tam olarak bu yüzden ayrı önem taşıyor: biri yazma primitive'i verirken diğeri sınır dışı okuma ile adresleri görünür kılabiliyor. Tek başına "bilgi sızdırma" gibi görünen bug, zincirin kilit halkası olabilir.

### 2.5 Gadget: kontrol akışına dokunmak

Son adım, bozulan belleği kod çalıştırmaya çevirmektir. Klasik C/C++ hedeflerinde function pointer, vtable, return address veya allocator metadata değiştirilir. JIT'li runtime'larda mesele biraz daha karmaşıktır: Java örneğinde tartışılan yol, HotSpot'un x86-64 AVX-512 VBMI için ürettiği `java.util.Base64.Decoder` intrinsics/instance kodunda malformed Base64 girdisiyle tetiklenen memory corruption.

Burada dikkatli olmak gerekiyor. OpenJDK'nın 17 Kasım 2026 advisory'si `CVE-2026-114938`'u `hotspot/compiler` bileşeninde CVSS 8.1 olarak listeliyor; Red Hat'in technote'u ise etkiyi Base64 decoder'ın AVX-512 VBMI yolu olarak tarif ediyor. "C2 compiler'ın tamamı patladı" demek kaynakların desteklemediği bir genelleme olur.

### 2.6 Ayrıcalık: shell kimin shell'i?

`RCE` ile `2root` aynı şey değil. PHP-FPM worker, nginx worker, Rails app user, cPanel panel process'i veya root helper farklı yetkilerle çalışır. Hangi process'in control flow'u ele geçirilirse "shell" çıktısı onun kimliğini taşır.

Bu yüzden exploit zinciri kadar process modeli de önemli. Seccomp, jailed worker, non-root service user, read-only filesystem ve privilege separation, primitive'i ortadan kaldırmaz ama son halkayı kırpar.

## 3. Neden bu kadar çok örnek var?

### Native hız yolları trust boundary'ye taşındı

Compression, regex, HTTP/2/3 framing, Base64 decoding, media analysis ve crypto hızlı olmak zorunda. Bu yüzden C/C++, SIMD intrinsics ve JIT-generated code en dış katmanda çalışıyor. Hız kazandıran optimizasyon, aynı zamanda bounds check'in kaçabileceği yer.

### "Memory-safe dil" runtime'ı güvenli anlamına gelmiyor

Ruby, Java ve Go gibi diller uygulama kodunda pointer'ı gizler; ama runtime'ın kendisi hâlâ native bellek yönetiyor. Ruby case-map döngüsü, Java Base64 intrinsic'i, PHP engine allocation mantığı bu kategoriye girer. Dil güvenliği, runtime güvenliğinin yerine geçmez.

### Auth'dan önce parse etmek zorunlu

Kimlik doğrulaması, isteğin bir kısmını okuduktan sonra yapılabilir. Parser, authentication middleware'inden önce çalışır. Bu yapısal zorunluluk, pre-auth memory corruption sınıfını özel olarak tehlikeli kılar.

### Fuzzing ve sanitizer'lar primitive'leri görünür kıldı

ASan/UBSan/fuzzing ile bulunan bir OOB write artık birkaç saat içinde CVE'ye, birkaç gün içinde de akılda kalan bir isme dönüşebiliyor. Bu iyi bir şey: erken bulunuyor. Ama isimlendirme hızı, bağlamın hızını geçtiği için yanlış genellemeler de artıyor.

### Patch gap: upstream yaması ürün yaması değil

GitLab'ın Ekim 2026 patch release notu bunu net gösteriyor: resmi Linux paketleri ve container image'ları Ruby yamasını içeriyor; kendi Ruby runtime'ını kullanan kurulumların `3.3.13`, `3.4.12`, `4.0.9+` gibi sürümlere ayrıca yükseltilmesi gerekiyor. Yani "Ruby güncellendi" ile "GitLab güncellendi" aynı cümle olsa da aynı operasyon değil.

## 4. Vaka notları: doğrulanmış örnekler

| İsim / kimlik | Doğrulanmış çekirdek | Tetikleme koşulu | Not |
|---|---|---|---|
| `php2shell`, `CVE-2026-109618/109619` | Engine-level OOM corruption / stale global state | Request path | Heap engineering gerekir |
| `Broccoli2Shell`, `CVE-2026-111497` | Brotli decoder OOB write | Untrusted compressed stream | 1.2.1 / 1.1.1 / 1.0.10 düzeltir |
| `Ruby2Shell`, `CVE-2026-132825` | Case conversion'da 1-byte heap overflow | Eski encoding + case conversion | Ruby resmi dili: "some scenarios" |
| `nginx2root`, `CVE-2026-123007` | HTTP/2 flow-control underflow → heap OOB write | Pre-auth HTTP/2 client | PoC kaynak yoğun |
| `Java4Shell`, `CVE-2026-114938` | HotSpot/compiler, CVSS 8.1; Base64 AVX-512 VBMI yolu | Özel x86-64 CPU + malformed Base64 | Her Java uygulaması değil |
| `MsQuic`, `CVE-2026-105016` | IPv6 send allowance underflow → heap OOB write | Remote peer | Fix: 2.5.12 / 2.6.3 |
| GitLab `CVE-2026-110264` | Critical 10.0, pre-auth, render path | `.org` render yolu | Patch: 19.5.1 ve eşdeğerleri |
| Rails `GHSA-v924-7rp8-4mxh` | Active Storage dosya okuma + RCE | `PR:L`, yani authenticated | Pre-auth değil |
| WordPress 7.1.5 | Unauth privesc; multisite'da admin → Super Admin | İlgili endpoint'ler | "privesc → RCE" olası, garanti değil |
| cPanel WP Toolkit | Public proxy üzerinden panel aksiyonu | Açık proxy | CVE/CVSS/root cause yayınlanmadı |

Able2Shell, wp2shell ve benzeri bazı etiketler dolaşıyor; bu yazıda birincil kaynakla doğrulayabildiğim çekirdekleri tuttum. Bir isim popüler diye CVE eşleştirmesini doğru kabul etmek, güvenlik notlarını bozan en hızlı yollardan biri.

## 5. Bir olayı "2shell" diye okurken sorulacak sorular

1. **Erişim nerede?** Authentication'dan önce mi, yoksa oturum açtıktan sonra mı?
2. **Primitive ne?** OOB read mi, OOB write mi, UAF mı, race mi, deserialize gadget mı?
3. **Layout kontrolü var mı?** Saldırgan allocation sırasını ve boyutlarını etkileyebiliyor mu?
4. **Leak var mı?** ASLR/PIE bypass edilecek bir adres okunabiliyor mu?
5. **Gadget ne?** Function pointer, vtable, callback, JIT stub veya framework hook'u mu?
6. **Hangi process ele geçiriliyor?** Worker mı, panel mi, root helper mı?
7. **Yama nerede?** Ürün paketinde mi, runtime'da mı, container image'ında mı?
8. **Kanıt ne?** PoC var mı, herkese açık mı, KEV'de mi, vahşi istismar bildirildi mi?

Bu sekiz soru, bir başlığın ne kadar ciddi olduğunu isimden daha iyi anlatır.

## 6. Operasyonel çıkarımlar

1. **Runtime ve ürünü birlikte yamayın.** Self-hosted ürünler kendi runtime'ını paketliyorsa sistem `ruby`/`java`/`php` ikilisini güncellemek tek başına yeterli olmayabilir.
2. **Process'leri yeniden başlatın, image'ları yeniden derleyin.** Eski bellekten çıkmamış bir process, dosya sisteminde yeni sürümü görmüş olabilir.
3. **Pre-auth yüzeyi küçültün.** Kullanılmıyorsa HTTP/2, QUIC, XML-RPC, uzaktan preview/analysis, public proxy ve legacy codec yollarını kapatın.
4. **Bellek savunmalarını katmanlandırın.** ASLR, PIE, RELRO, CFI, seccomp, non-root worker ve privilege separation son halkayı kırpabilir.
5. **Crash telemetry'sini ciddiye alın.** Tek bir segfault, zincirin ilk halkasının habercisi olabilir.
6. **Sınıflandırmayı primitive'e göre yapın.** "2shell mi?" yerine "OOB write mı, leak mi, auth bypass mı?" diye sorun.

## 7. Ne yazmamalı?

- "Her Java uygulaması etkilenir" — hayır; CPU, kod yolu ve girdi şekli önemli.
- "CVSS 10 ise istismar ediliyor" — skor, vahşi istismar kanıtı değil.
- "PoC var, herkese açık exploit var" — researcher demo'su ile public weaponized exploit aynı şey değil.
- "Admin paneli kapalıysa güvendeyiz" — parser auth'dan önce çalışıyorsa panel değil, proxy/parser yüzeyi değerlendirilir.
- "Memory-safe dile geçtik, bitti" — runtime hâlâ native bellek kullanıyor.
- "Ruby2Shell = GitLab CVE" — aynı ekosistemde farklı hatalar olabilir; CVE kimliklerini karıştırmayın.

## Kapanış

`2shell` iyi bir hikaye başlığı, kötü bir tehdit modeli. İyi soru şu değil: "Bu da mı 2shell?" İyi soru şu: **"Hangi trust boundary'de, hangi primitive oluştu ve hangi ayrıcalıkla sonlandı?"**

Zinciri bu şekilde okumaya başlayınca isimler azalıyor, ama anlama artıyor.

## Bu seriden

- [Herkes PHP'ye dalmışken: php2shell](/blog/herkes-phpye-dalmisken)
- [Broccoli2Shell: Brotli decoder taşması](/blog/broccoli2shell-brotli-acigi)
- [Ruby2Shell: case conversion taşması](/blog/ruby2shell-cve-2026-132825)
- [nginx2root: HTTP/2 flow-control underflow](/blog/nginx2root-cve-2026-123007)
- [Apache mod_http2: paylaşılan HPACK state](/blog/apache-mod-http2-cve-2026-119618)
- [cPanel WP Toolkit proxy RCE](/blog/cpanel-wptk-proxy-rce)

## Kaynaklar

- [OpenJDK: Vulnerability Advisory 2026/11/17](https://openjdk.org/groups/vulnerability/advisories/2026-11-17)
- [Red Hat: CVE-2026-114938 — OpenJDK memory corruption on AVX-512 VBMI systems](https://access.redhat.com/security/cve/CVE-2026-114938)
- [GitHub Advisory: GHSA-v2xv-r72g-h8j2 — MsQuic packet framing over IPv6](https://github.com/microsoft/msquic/security/advisories/GHSA-v2xv-r72g-h8j2)
- [GitLab: Patch Release 19.5.1, 19.4.3, 19.3.6, 19.2.9, 19.1.9, 19.0.10, 18.11.13](https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-5-1-released/)
- [Ruby: Regexp compilation fixes for GitLab CVEs](https://www.ruby-lang.org/en/news/2026/10/23/regexp-fixes-for-gitlab-cves/)
- [GitHub Advisory: GHSA-v924-7rp8-4mxh — Active Storage video preview RCE](https://github.com/rails/rails/security/advisories/GHSA-v924-7rp8-4mxh)
- [WordPress: WordPress 7.1.5 Release](https://wordpress.org/news/2026/11/wordpress-7-1-5-release/)
- [cPanel: Security Vulnerability in WP Toolkit Proxy](https://support.cpanel.net/hc/en-us/articles/45133380394135-Security-Vulnerability-in-cPanel-WHM-s-WP-Toolkit-Proxy-November-18-2026)
