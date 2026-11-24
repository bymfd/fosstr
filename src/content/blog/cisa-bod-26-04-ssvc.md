---
title: 'CISA BOD 26-04: CVSS etiketi yerine SSVC ve sure'
description: 'CISA BOD 26-04 uygulama rehberi FCEB ajanslarinda CVSS critical-high etiketlerini SSVC, maruziyet ve otomasyon ile degistiriyor. Forensic triage ve KEV due date mantigi.'
pubDate: '2026-11-24'
heroImage: ../../assets/cisa-bod-26-04-ssvc-hero.jpg
tags: ['security', 'cisa', 'bod', 'ssvc', 'vulnerability-management']
---

CISA'nın BOD 26-04 uygulama rehberi 10 Haziran 2026'da yayınlandı ve 25 Ağustos 2026'da güncellendi. Yeni değil, ama son haftalardaki KEV kayıtlarındaki "forensic triage Yes" ve kısa son tarihlerin nereden geldiğini anlamak için kritik. Direktif, BOD 19-02 ve BOD 22-01'i yürürlükten kaldırıyor; FCEB ajansları için CVSS kullanım zorunluluğunu kaldırıyor ve yerine SSVC decision point'lerini, varlık maruziyetini ve adli üçlaj adımlarını koyuyor.

## Kısa özet

| Alan | Değer |
|---|---|
| Kaynak | CISA BOD 26-04 implementation guidance |
| Yayın / güncelleme | 10 Haziran 2026 / 25 Ağustos 2026 |
| Kaldırılan | BOD 19-02 ve BOD 22-01; FCEB'de CVSS zorunluluğu |
| Yeni girdiler | Publicly exposed, automatable, technical impact, KEV durumu |
| Açık örnek | Maruz + total impact + automatable ise 3 günlük yama süresi |
| Adli üçlaj | 2 saat içinde kapsam; 2-24 saat kanıt; 24-48 saat analiz; 48-72 saat karar |
| Kapsam | FCEB ajansları; özel sektör için bağlayıcı değil |
| Yanlış okuma | "KEV'de = şu an aktif istismar" değil |

![BOD 26-04 SSVC ve adli üçlaj akışı](/diagrams/cisa-bod-26-04-ssvc.svg)

## Teknik görünüm

Rehber, "publicly exposed" tanımını geniş tutuyor: ajansın sahip olduğu veya yönettiği bir varlık, fiziksel veya mantıksal konumuna bakılmaksızın public network üzerinden kimlik doğrulamamış veya güvenilmeyen taraflarca erişilebiliyorsa maruz sayılıyor. "Technical impact: total" için verilen sezgisel örnekler: saldırgan keyfi yazılım kurup çalıştırabiliyor, bileşenin tüm eylemlerini tetikleyebiliyor, tam ayrıcalıklı hesap elde ediyor veya CVSS gizlilik ve bütünlük etkileri ikisi de High. "Automatable" için örnek, güvenilir biçimde RCE elde eden herkese açık bir PoC'un varlığı.

KEV katalog kriterleri de ayrı yazıyor: CVE ID atanmış olması, sahada aktif istismara dair güvenilir kanıt, net bir yama veya hafifletme olması ve ABD hükümet sistemleri için önemli risk taşıması. CISA, KEV eklemesinin "şu anda aktif istismar görülüyor" anlamına gelmediğini; PoC'nin zorunlu olmadığını ve eski veya EOL ürünlerdeki açıkların da eklenebileceğini belirtiyor. Bu, son günlerdeki 3 günlük teslim tarihlerinin "yeni bir saldırı dalgası" demek olmadığını gösteriyor.

Süreler tek bir CVSS skorundan değil, SSVC alanlarından ve varlık bağlamından hesaplanıyor. Rehberin verdiği örnekte varlık public exposed, technical impact total ve automatable yes ise KEV due date 3 günlük yama süresine karşılık geliyor. Karar ajans tarafında varlık bazında veriliyor; CISA, KEV catalog due date hesaplamasında elindeki veriyi kullanıyor ama nihai maruziyet değerlendirmesi ajansta.

Adli üçlaj altı adımda tanımlı. Kapsam belirleme HEDEF olarak KEV eklenmesinden sonraki ilk iki saat; uçucu veriyi koruma ve kritik yama 2-24 saat; containment 6-24 saat; kanıt analizi 24-48 saat; yükseltme raporu 48-72 saat. CISA bu süreleri "tavsiye edilen en iyi uygulama" olarak etiketliyor; zorunlu olan şey uygun bir forensic triage analizinin yapılması. Sıra önemli: mümkünse kanıt toplanmadan yama atmayın, erken containment kritik delilleri yok edebiliyor ve containment saldırganı tetiklemeyecek biçimde yürütülmeli.

Rehber ayrıca bulgu yok / doğrulandı / şüpheli olmak üzere üç sonuç tanımlıyor. Bulgu yoksa yüksek izleme ve normal yama; doğrulanırsa CISA Incident Reporting System'e bildirim ve tam olay müdahalesine geçiş; şüpheliyse IOC ve anomali çalışmasına devam. Cloud tarafında sorumluluk paylaşılıyor: on-prem ve IaaS'ta ajans tam sorumlu; PaaS'ta ajans kimlik, operasyon, guest OS/veri/içerik ve audit logging'den, CSP ağ güvenliğinden; SaaS'ta CSP web uygulaması, kimlik, operasyon ve ağdan, ajans erişim/kimlik doğrulama, guest OS/veri/içerik ve audit logging'den sorumlu.

## Ne yapmalı?

1. **CVSS skor listesini bırakın.** FCEB kapsamındaki ekibinizde önceliklendirmeyi SSVC alanları, maruziyet ve varlık kritikliğiyle yeniden kurun.
2. **Adli üçlaj planı yazın.** KEV eklenmesi geldiğinde kimin kanıt toplayacağı, hangi out-of-band kanalın kullanılacağı ve kimin yükseltme kararı verdiği önceden tanımlı olsun.
3. **Kanıtı yamadan önce alın.** Uçucu veriyi (bellek, cache, registry, uçuş halindeki veri) önce toplayın; yama sonrası delil kaybını kaydedin.
4. **Maruziyet etiketlerini CDM'de güncelleyin.** Çeyrekta bir veya CISA istediğinde public IP'leri ve domain'leri bildirin; scanning trafiğini engellemeyin.
5. **Cloud SLA'larını gözden geçirin.** FedRAMP'te VDR/VER kurallarının 7 Aralık 2026'da zorunlu olacağını ve sorumluluk ayrımını sözleşmelere yansıtın.

## Ne yapmamalı?

- "KEV'ye girdi = şu an aktif istismar" demeyin. Rehber açıkça aksini söylüyor; kriterler geçmişteki güvenilir kanıtı da kapsıyor.
- "PoC yoksa KEV'ye giremez" demeyin. PoC zorunlu değil.
- "CVSS 9.8 ise önce o" demeyin. Direktif CVSS use zorunluluğunu kaldırıyor; skor tek başına risk kararı değil.
- "Özel sektör için yasal süre" demeyin. BOD 26-04 FCEB ajanslarına yönelik; diğer kurumlar için rehber niteliği taşır.
- "Önce yama, sonra kanıt" demeyin. Rehber, mümkün olduğunda kanıt toplamayı önce istiyor; erken containment delilleri yok edebiliyor.
- "Tüm bulgular doğrulandı sayılır" demeyin. Üç ayrı sonuç var: no evidence, confirmed, suspected.
- "Cloud tamamen CSP'nin işi" demeyin. SaaS'ta bile erişim, guest OS/veri ve audit logging ajansın sorumluluğunda.

## Durum

24 Kasım 2026 itibarıyla bu rehber **CISA'nın kendi sitesinden doğrulanmış**; bir CVE değil, FCEB ajanslarına yönelik uygulama kılavuzu. Yayın 10 Haziran 2026, güncelleme 25 Ağustos 2026. Doğrulanan bilgiler: BOD 19-02 ve 22-01'in yürürlükten kaldırılması, CVSS zorunluluğunun kalkması, SSVC decision point tanımları, KEV katalog kriterleri, 3 günlük örnek, altı adımlı forensic triage ve üç sonuç kategorisi, cloud sorumluluk paylaşımı ve FedRAMP 7 Aralık 2026 tarihi. Belirsizlikler: tam remediation timeline tablosu bu sayfada özetlenmemiş; ajans içi risk kararları ve HVA muafiyetleri kuruma özel; rehber zaman çizelgelerini zorunlu değil tavsiye olarak etiketliyor. "KEV = anlık istismar", "CVSS artık kullanılmayacak" veya "herkes için yasal 3 gün" başlıkları bu kayıtla desteklenmiyor.

## Bu seriden

- [SonicWall CVE-2026-19868](/blog/sonicwall-gen6-cve-2026-19868)
- [VMware vCenter CVE-2026-123890](/blog/vmware-vcenter-cve-2026-123890)
- [N-able MailAssure CVE-2026-134624](/blog/nable-mailassure-cve-2026-134624)

## Kaynaklar

- [CISA: BOD 26-04 Implementation Guidance for Prioritizing Security Updates Based on Risk](https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk)
