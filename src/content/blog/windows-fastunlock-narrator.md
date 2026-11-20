---
title: 'FastUnlock: kilit ekranında Narrator ile sınırlı kod çalıştırma'
description: 'FastUnlock, fiziksel erişim ve Narrator kullanarak Windows kilit ekranında sınırlı WSIAccount bağlamında kod çalıştırıyor. BitLocker şifresini kırmıyor; durum ve önlemler.'
pubDate: '2026-11-20'
heroImage: ../../assets/windows-fastunlock-narrator-hero.jpg
tags: ['security', 'windows', 'zero-day', 'physical-access', 'narrator']
---

19 Kasım 2026'da, Chaotic Eclipse / MSNightmare / Nightmare Eclipse takma adlarını kullanan bir araştırmacı **FastUnlock** adlı Windows kilit ekranı atlatma tekniğini yayımladı. Aynı gün ThreatLocker Threat Intelligence ekibi tekniği test edip doğruladı. Sonuç: fiziksel erişimi olan bir kişi, oturum açmadan kilit ekranında sınırlı yetkili bir hesap bağlamında kod çalıştırabiliyor.

Bu bir uzaktan istismar değil; şifre kırma da değil. Kilit ekranı, Windows'un kendi erişilebilirlik aracı ve hesap kurtarma akışı üzerinden aşılıyor. Microsoft'tan henüz yama veya resmi advisory yok, kamuya açık bir CVE kaydı bulunmuyor ve gerçek bir saldırıda kullanıldığına dair kanıt yok.

## Kısa özet

| Alan | Bilinen durum |
|---|---|
| Ad | FastUnlock, Windows Narrator lock screen bypass |
| Keşif / yayın | 19 Kasım 2026, araştırmacının GitHub deposu |
| Bağımsız doğrulama | ThreatLocker, 19 Kasım 2026'da aynı gün test etti |
| Ön koşul | Fiziksel erişim; kilit ekranındaki kurtarma akışından erişilebilen bir Microsoft hesabı |
| Yöntem | Yerleşik Narrator ekran okuyucu ile kilit ekranı arayüzünde gezinme |
| Elde edilen hesap | WSIAccount; yönetici değil |
| Yama | Yok; Microsoft advisory'si veya CVE kaydı yok |
| İstismar kanıtı | Vahşi kullanım bildirimi yok |
| BitLocker | Şifre kırılmaz, anahtar ele geçirilmez; TPM otomatik açma zaten diski açmış olur |

![FastUnlock kilit ekranı atlatma şeması](/diagrams/windows-fastunlock-narrator.svg)

## 1. Kaynakların ayrımı: birincil iddia ve bağımsız test

Tekniğin ilk anlatımı araştırmacının GitHub reposunda yer alıyor. Bu, iddianın birincil kaynağı; ancak kısa bir yazı ve video içeriyor. Araştırmacı, sorunun Narrator'ın kilitli hesap bağlamında arayüzü yönetme biçiminde olduğunu ve başarılı istismarın kilit ekranı hesabı olan `WsiAccount` bağlamında kod çalıştırdığını yazıyor.

ThreatLocker'ın 19 Kasım tarihli yazısı bağımsız testi anlatıyor; bu yüzden teknik sonuçlar için en net kaynak. ThreatLocker, kilit ekranından Ayarlar uygulamasına ulaşıldığını ve WSIAccount kullanıcısı olarak bir program çalıştırılabildiğini doğruladı. Şirket ayrıca bu hesabın **yönetici olmadığını** açıkça belirtiyor.

The Hacker News ve Security Affairs gibi ikincil kaynaklar, araştırmacının takma adlarını ve açıklama takvimini tekrarlıyor. Bunlar olayın duyurulmasını takip etmek için yararlı, ancak teknik iddianın dayanağı GitHub reposu ve ThreatLocker testi.

## 2. Saldırı zinciri nasıl işliyor?

ThreatLocker'ın listelediği ön koşullar kısa:

- Makineye fiziksel erişim.
- Kilit ekranındaki hesap kurtarma akışından erişilebilen bir Microsoft hesabı.
- Caps Lock ve ok tuşlarıyla Narrator gezinmesi.

Akış, kilit ekranındaki "PIN'i unuttum" ya da parola sıfırlama seçeneğiyle başlıyor. Microsoft hesabı kurtarma ekranında `Win+U` ile yerleşik ekran okuyucu Narrator açılıyor. Araştırmacının anlatımına göre Narrator, normalde görünmemesi gereken bir arka plan penceresine odaklanıyor; Caps Lock + ok tuşları ve Enter ile bu pencereden Ayarlar'a geçiliyor.

ThreatLocker testinde fiziksel klavyeyle yazmanın mümkün olmadığını, gerekiyorsa ekran klavyesinin açılabileceğini belirtiyor. Kodun makineye nasıl taşınacağı değişken; testte harici bir sürücü kullanılmış, araştırmacı da USB üzerinden çalıştırma senaryosunu anlatıyor.

Bu nedenle "tek tuşla bilgisayar ele geçirme" tarifleri yanlış. Zincir, kurtarma akışı, ekran okuyucu odak hatası ve kilit ekranı oturumuna ait düşük yetkili hesap bağlamının birleşimine dayanıyor.

## 3. Yetki sınırı: WSIAccount yönetici değil

En çok karıştırılan nokta bu. ThreatLocker'ın testinde ulaşılan hesap **WSIAccount**, yani Windows kilit ekranını barındıran sınırlı hesap. Bu hesap yönetici değil; dolayısıyla teknik, doğrudan domain yöneticiliği veya SYSTEM yetkisi anlamına gelmiyor.

Sınırlı hesap yine de gerçek bir risk: kilit ekranında oturum açmadan dosya sisteminde işlem yapabilmek, yerel veriye erişmek ve kurban oturum açtığında kalıcı bir şey bırakmak için bir başlangıç noktası oluşturur. Microsoft'un kendi kilit ekranı güven modeli, tam da bu tür bir erişimi engellemeyi amaçlar.

Bazı ikincil raporlar, belirli koşullarda yeni yönetici hesabı oluşturulabildiğini yazıyor. Bu iddia ThreatLocker testinin kapsamı dışında; kaynak olarak ikincil ve doğrulanmamış sayılmalı.

## 4. BitLocker neden engel olmuyor?

Birçok Windows cihazda BitLocker, TPM ile birlikte kullanılır ve diski açılışta otomatik açar. Yani kilit ekranı göründüğünde sürücü zaten çözülmüş ve dosyalar okunabilir durumdadır. FastUnlock tam bu noktada devreye girer.

Bu, BitLocker'ın şifrelemesini kırmak anlamına gelmez. Teknik, kurtarma anahtarını ya da şifreleme anahtarını ele geçirmez; yalnızca disk zaten açılmış bir sistemde kilit ekranı katmanını atlar. "BitLocker kırıldı" başlığı bu yüzden yanlıştır.

Ön boot PIN kullanan cihazlarda durum farklıdır: cihaz kapatıldıysa veya hazırda bekliyorsa PIN, disk açılmadan ve Windows başlamadan istenir. ThreatLocker'ın notu da bu yönde. Ancak PIN, zaten açık ve kilit ekranında olan bir makineyi korumaz.

## 5. Kapsam ve belirsizlikler

Araştırmacı tekniği Windows 11 26H2'nin Kasım 2026 yama seviyesinde test ettiğini ve denediği makinelerde tutarlı çalıştığını yazıyor. Windows 10'u test etmediğini de kendisi belirtiyor.

Şu an elimizde **resmi bir etkilenen sürüm listesi yok**. Bu yüzden "tüm Windows sürümleri etkileniyor" ya da "yalnızca 26H2 etkileniyor" demek mümkün değil. Koşulları karşılayan her makine potansiyel olarak etkilenen kabul edilmeli.

Araştırmacı, video demosunda son USB çalıştırma adımını göstermediğini, elinde bellek olmadığını yazıyor. Bu, zincirin ilk bölümünün gösterildiği, son adımın ise araştırmacının deneyimine dayandığı anlamına gelir. ThreatLocker'ın bağımsız testi bu boşluğu kısmen kapatıyor.

## 6. Ne yapmalı?

1. **Fiziksel erişimi azaltın.** Dizüstü bilgisayarlar, ortak masalar ve tezgâh arkası cihazlar kontrolsüz bırakılmamalı.
2. **Kilit ekranını tek başına güvenlik sınırı saymayın.** Cihaz sahibi olmadan erişilebilen bir makine risk altında kabul edilmeli.
3. **Kurtarma seçeneklerini gözden geçirin.** Kilit ekranından erişilebilen Microsoft hesabı kurtarma akışlarını ve MDM ayarlarınızı denetleyin.
4. **BitLocker PIN'i değerlendirin.** Özellikle taşınabilir cihazlarda TPM-only otomatik açma yerine ön boot PIN, kapalı cihazı korur.
5. **Kapattın veya hazırda bekletin.** Cihaz kontrolünüzden çıkacaksa kilit ekranı yerine kapatma ya da hibernation daha güvenli.
6. **Erişilebilirlik araçlarını politika ile yönetin.** Narrator'ı ihtiyaç duymayan yönetilen cihazlarda engellemek geçici bir azaltma olabilir; ekran okuyucu kullanan kullanıcıları kesmemeye dikkat edin.
7. **Microsoft advisory'sini takip edin.** Yama yayımlandığında sürümü doğrulayın; şu an "fix var" denemez.

## 7. Ne yazmamalı?

- "BitLocker kırıldı" — anahtar ele geçirilmiyor, disk zaten açık.
- "Uzaktan sıfır tıklamalı RCE" — fiziksel erişim şart.
- "Yönetici yetkisi ele geçirildi" — ThreatLocker sınırlı WSIAccount diyor.
- "KEV'de, aktif istismar ediliyor" — CVE yok, KEV kaydı yok, vahşi kullanım kanıtı yok.
- "Microsoft yama yayınladı" — henüz resmi düzeltme yok.
- "Tüm Windows cihazları etkilendi" — resmi etkilenen sürüm listesi yok ve her makine koşulları sağlamıyor.

## Durum

20 Kasım 2026 itibarıyla FastUnlock, bağımsız olarak doğrulanmış ama yamasız bir fiziksel erişim tekniği. Risk, cihazın başında durabilen bir aktöre ve kurtarma akışından erişilebilen Microsoft hesabına bağlı. En pragmatik önlemler fiziksel güvenlik, cihaz politikası ve uygun cihazlarda BitLocker PIN.

## Bu seriden

- [WhatsApp iOS açığı: cck.dat içinde düz metin Noise anahtarı iddiası](/blog/whatsapp-ios-noise-anahtari-cve-2026-128974)
- [Neden her şey 2shell oluyor?](/blog/neden-her-sey-2shell-oluyor)
- [Ruby2Shell: case conversion taşması](/blog/ruby2shell-cve-2026-132825)

## Kaynaklar

- [MSNightmare/FastUnlock GitHub deposu](https://github.com/msnightmare/fastunlock)
- [ThreatLocker: Proof of Concept for FastUnlock](https://www.threatlocker.com/blog/proof-of-concept-for-fastunlock-windows-lock-screen-bypass-from-nightmare-eclipse)
- [The Hacker News: New Unpatched Windows 0-Day FastUnlock](https://thehackernews.com/2026/11/new-unpatched-windows-0-day-fastunlock.html)
- [Security Affairs: Chaotic Eclipse Releases FastUnlock](https://securityaffairs.com/203537/hacking/chaotic-eclipse-releases-fastunlock-a-new-windows-zero-day-vulnerability.html)
- [Cybernews: Windows 11 lock screen bypass via Narrator](https://cybernews.com/security/nightmare-eclipse-windows-lock-screen-bypass/)
