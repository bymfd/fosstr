---
title: 'ManageEngine DDI Central: iki komut enjeksiyonu ve 6500 yamasi'
description: 'DDI Central 6500 oncesinde IPv6 scope kimlikleri ve bloklu domain degerleri PowerShell komutuna karisiyor. CVE-2026-95643 ve 95645, satıcı duyurulari, NVD durumu ve KEV olmamasi.'
pubDate: '2026-11-24'
heroImage: ../../assets/manageengine-ddi-central-cves-hero.jpg
tags: ['security', 'manageengine', 'ddi', 'cve', 'command-injection', 'windows']
---

ManageEngine, 18 Kasım 2026'da DDI Central için iki komut enjeksiyonu kaydı yayınladı: CVE-2026-95643 ve CVE-2026-95645. Her ikisi de 17 Eylül 2026'da build 6500 ile düzeltilmiş, ancak CVE kayıtları iki ay sonra açıldı. Satıcı duyuruları güvenliği "High" olarak işaretlerken N-able benzeri CNA metriği burada 9.1 Critical; NVD kayıtları `Awaiting Analysis` ve SSVC `exploitation: none`. Yani yamak acil, ama "aktif istismar var" iddiası bu kayıtlarla desteklenmiyor.

## Kısa özet

| Alan | Değer |
|---|---|
| CVE | CVE-2026-95643 (`/ipam/telnet/`) ve CVE-2026-95645 (`clear_blocked_domains`) |
| Ürün | ManageEngine DDI Central, 6.3.1 / build 6301 ve altı (NVD: 6500 öncesi) |
| Düzeltme | Build 6500, satıcıya göre 17 Eylül 2026 |
| Zayıflık | CWE-78 (OS komut enjeksiyonu), CNA ikincil sınıflandırması |
| CVSS v3.1 | İkisi de 9.1 Critical, `AV:N/AC:L/PR:H/UI:N/S:C/C:H/I:H/A:H` — Zohocorp CNA, NVD analizi değil |
| NVD durumu | İkisi de Awaiting Analysis; NVD skoru yok |
| SSVC (CISA) | İkisi de exploitation: none, automatable: no, technicalImpact: total |
| KEV | İki CVE de CISA KEV JSON'unda yok (24 Kasım kontrolü) |
| Satıcı değerlendirmesi | Duyurularda "High"; CNA metriği "Critical" |

![ManageEngine DDI Central komut enjeksiyonu zinciri](/diagrams/manageengine-ddi-central-cves.svg)

## Teknik görünüm

CVE-2026-95643, DDI Central'ın `/ipam/telnet/` bağlantı özelliğinde. Satıcı duyurusuna göre IPv6 adreslerindeki scope kimliği (zone identifier) mevcut IP doğrulamasından geçebiliyor ve yönetilen Windows düğümde çalıştırılan PowerShell komutuna gömülüyor. Karakter doğrulaması yetersiz olduğu için özel hazırlanmış bir değer PowerShell dize bağlamından çıkabiliyor. Düzeltme kapsam kimliklerini doğrulayıp güvenli olmayanları reddediyor, komut girdilerine ek allow-list uyguluyor ve port değerlerini işlemeden önce tamsayıya çeviriyor. Satıcı bu kontrollerin komut yürütme katmanında yapıldığını, dolayısıyla özelliği kullanan tüm çağrıyı koruduğunu yazıyor.

CVE-2026-95645, Windows DDI Agent'ın bloklu domain yönetimindeki `clear_blocked_domains` işlevinde. Bloklama politikasından gelen domain değerleri Windows'ta işlenmeden önce yeterince doğrulanmıyor; özel hazırlanmış girdi, domain verisi yerine sistem komutunun parçası olarak yorumlanabiliyor. Düzeltme JSON yükündeki domain değerlerini işlemeden önce doğruluyor, geçersiz olanları hata ile reddediyor ve `clear_blocked_domains` çağrısını yalnızca DDI Central uygulama sunucusunun başlatabildiği şekilde kısıtlıyor. Agent sunucuları işlevi kendi başlarına tetikleyemiyor.

Etkinin sınırı, komutların çalıştığı Windows hizmet hesabının yetkileri. Satıcı her iki duyuruda da sonucu RCE olarak sınıflandırıyor; ancak NVD vektörleri `PR:H` diyor, yani yüksek ayrıcalıklı kimlik doğrulamalı kullanıcı gerekiyor. Duyuru 95645 için "bu işlevi çağırabilen saldırgan", 95643 için "etkilenen telnet bağlantı özelliğine erişimi olan kullanıcı" ifadesini kullanıyor. Bu, internetten kimlik doğrulamasız erişim iddiası değil.

Kayıtlar arasında üç tutarsızlık var ve bunları gizlemek yanlış olur. Birincisi, satıcı duyurusu etkilenen sürümü "6.3.1 / build 6301 ve altı" diye yazıyor, NVD ise "6500 öncesi" diyor. İkincisi, satıcı güvenlik güncellemeleri listesi ve 95643 duyurusunun başlığı bu CVE'i "Linux Node Agent'ta kimlik doğrulamasız GSS-TSIG keytab güncellemesi" olarak etiketliyor; aynı sayfanın ayrıntı bölümü ise Windows düğümde PowerShell komut enjeksiyonunu anlatıyor. Üçüncüsü, satıcı duyuruları "High", Zohocorp CNA vektörü 9.1 "Critical" diyor; NVD her iki kaydı da `Awaiting Analysis` tutuyor ve kendi skorunu üretmedi. 24 Kasım 2026'daki KEV JSON kontrolünde iki CVE de listede yer almıyordu.

## Ne yapmalı?

1. **Konsolu ve agent'ları build 6500 veya üzerine yükseltin.** Satıcı, DDI Central Console ve ilgili Node Agent / Windows DDI Agent örneklerinin servis paketiyle güncellenmesini istiyor.
2. **Erişimi daraltın.** `/ipam/telnet/` özelliğine ve bloklu domain politikası yönetimine erişebilen hesapları denetleyin; yönetim dışı kullanıcıları çıkarın.
3. **Windows hizmet hesabını gözden geçirin.** DDI Agent ve telnet işlemlerinin çalıştığı hesabın yetkilerini azaltın; enjeksiyonun erişebileceği kaynakları sınırlayın.
4. **PowerShell günlüklerini arayın.** Yönetilen Windows düğümlerde alışılmadık PowerShell çağrıları, IPv6 scope kimliği içeren telnet işlemleri ve `clear_blocked_domains` kullanımını arayın.
5. **KEV beklemeyin.** CVE'ler KEV'de olmasa da düzeltme Eylül 2026'da yayınlandı; yama programını buna göre önceliklendirin.

## Ne yapmamalı?

- "Kimlik doğrulamasız RCE" başlığı atmayın. NVD vektörleri `PR:H` diyor; satıcı listesindeki GSS-TSIG başlığı 95643'ün ayrıntı metniyle çelişiyor.
- "Aktif istismar görüldü" demeyin. SSVC `exploitation: none`, KEV kaydı yok, satıcı duyuruları kötüye kullanım bildirmiyor.
- "9.1'i NVD verdi" yazmayın. Skor Zohocorp CNA'nın ikincil metriği; NVD `Awaiting Analysis`.
- "Ransomware doğrulandı" iddiası eklemeyin. Böyle bir alan veya kayıt yok.
- "Tüm ManageEngine ürünleri etkilendi" demeyin. Duyurular yalnızca DDI Central'ı kapsıyor.
- "Linux düğümde kod çalıştı" demeyin. Ayrıntı metni komutların yönetilen Windows düğümde çalıştığını söylüyor.
- Satıcı "High" derken "kritik değil" sonucu çıkarmayın. CNA metriği 9.1 ve NVD daha analiz etmedi; iki etiket aynı kaydın farklı ölçekleri.
- Düzeltme tarihini ifşa tarihi sanmayın. Build 6500, 17 Eylül'de yayınlandı; CVE kayıtları 18 Kasım'da açıldı.

## Durum

24 Kasım 2026 itibarıyla bu iki açık **satıcı duyuruları ve NVD kayıtlarıyla doğrulanmış, KEV'de değil**. ManageEngine'in CVE-2026-95643 ve CVE-2026-95645 duyuruları, NVD kayıtları (`Awaiting Analysis`, CWE-78, Zohocorp CNA CVSS v3.1 9.1, CISA SSVC `exploitation: none`/`automatable: no`/`technicalImpact: total`) ve 24 Kasım KEV JSON kontrolü birbirini destekliyor. Belirsizlikler: satıcı "build 6301 ve altı", NVD "6500 öncesi" diyor; 95643 başlığı ile ayrıntı metni farklı açıklıyor; satıcı "High", CNA "Critical"; NVD analizi yok; saha kanıtı, aktör veya etkilenen kurum bilgisi yok; hangi Windows hesabının kullanıldığı dağıtıma göre değişiyor. "Aktif istismar", "kimlik doğrulamasız RCE" veya "ransomware doğrulandı" başlıkları bu kayıtlarla desteklenmiyor.

## Bu seriden

- [IBM Guardium CVE-2026-84236](/blog/ibm-guardium-cve-2026-84236)
- [VMware vCenter CVE-2026-123890](/blog/vmware-vcenter-cve-2026-123890)
- [SonicWall CVE-2026-19868](/blog/sonicwall-gen6-cve-2026-19868)

## Kaynaklar

- [ManageEngine: CVE-2026-95643 duyurusu](https://www.manageengine.com/dns-dhcp-ipam/security-updates/cve-2026-95643.html)
- [ManageEngine: CVE-2026-95645 duyurusu](https://www.manageengine.com/dns-dhcp-ipam/security-updates/cve-2026-95645.html)
- [ManageEngine DDI Central güvenlik güncellemeleri listesi](https://www.manageengine.com/dns-dhcp-ipam/security-updates/security-updates.html)
- [NVD - CVE-2026-95643](https://nvd.nist.gov/vuln/detail/CVE-2026-95643)
- [NVD - CVE-2026-95645](https://nvd.nist.gov/vuln/detail/CVE-2026-95645)
- [CISA KEV JSON feed'i (sürüm 2026.11.23)](https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json)
