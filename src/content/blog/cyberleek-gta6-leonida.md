---
title: 'Cyberleek, GTA 6 ve Leonida: sizintidan statik rekompilasyona'
description: 'Cyberleek 209 GB Xbox build ve exe iddialari, Leonida statik rekompilasyon projesi, RDNA2 SPIR-V ve D3D12 Vulkan ilerlemesi. 24 Kasim 2026 durumu.'
pubDate: '2026-11-24'
heroImage: ../../assets/cyberleek-gta6-leonida-hero.jpg
tags: ['security', 'gta6', 'reverse-engineering', 'vulkan', 'open-source']
---

"Cyberleek", "cyberleek gta 6" ve "leonida" sorguları aynı olay etrafında yükseliyor: Cyberleek'in GTA 6 Xbox sürümünü sızdırma iddiası ve bu dosyaları Windows'ta çalıştırmayı hedefleyen açık kaynaklı Leonida projesi. Bu bir CVE değil; sızıntı ekonomisi, statik rekompilasyon ve kötü amaçlı "hazır PC portu" indirmelerinin kesişimi. Aşağıda indirim/indirme bağlantısı yok; yalnızca doğrulanabilen teknik durum var.

## Kısa özet

| Alan | Değer |
|---|---|
| Konu | Cyberleek sızıntısı + Leonida statik rekompilasyon |
| 19 Kasım | Cyberleek, 209 GB Xbox build iddiası; exe eksik |
| 20 Kasım | Leonida GitHub'da; oyun, anahtar ve exe içermiyor |
| 23 Kasım | Exe yayımlandı; 15M→6M token eşiği iddiaları karşılanmadı |
| 24 Kasım | Proje ve Discord kapatıldı; sebep doğrulanmadı |
| Teknik yol | x86-64 native, GDK/XMem shim, RDNA2→SPIR-V, D3D12→Vulkan |
| Shader durumu | 26.503 / 26.503 shader `spirv-val` geçti; görüntü yok |
| Boot durumu | İlk denemelerde siyah ekran, ses kesiliyor |
| Ana risk | Sızıntı dosyaları, malware, telif ve token teşviki |

![Cyberleek sızıntısından Leonida boot denemesine](/diagrams/cyberleek-gta6-leonida.svg)

## Teknik görünüm

Cyberleek Ağustos 2026'dan beri GTA 6 oynanış klipleri yayımlıyor; PC Gamer, kliplerden bazılarında QR kod ve CYBERLEEK tanıtımı görüldüğünü yazıyor. Eurogamer'ın 19 Kasım kaydına göre site, "Kasım 2026 build'i" ve 209 GB indirme iddiası ortaya koydu; exe ayrı tutuldu ve token eşiğine bağlandı. Eurogamer dosyaların gerçekten var olduğunu doğrulayamadı. IT-Connect, vx-underground'un torrent'i inceleyip gerçek GTA 6 dosyaları olduğunu söylediğini aktarıyor; bu ikincil bir aktarım ve dosyaların güvenliği anlamına gelmiyor.

Token tarafı teknik olayın ayrılmaz parçası. Cyberleek, sızıntıları Solana üzerindeki bir memecoin'in piyasa değerine bağlayan bir yol haritası yayımladı. PC Gamer, coin'in Ağustos sonunda yaklaşık 23 milyon dolar piyasa değerine ulaşıp çöktüğünü; IT-Connect ise yaklaşık 250.000 dolar işlem ücreti elde edildiğini yazıyor. Eurogamer'ın "en az 200.000 £" ifadesiyle birlikte okununca ortada doğrulanmış tek bir mali tablo yok; güvenilir olan şey teşvik yapısının varlığı.

Leonida 20 Kasım 2026'da GitHub'da yayımlandı. README'in tanımı net: Xbox Series sürümünü Windows'ta **yerel olarak** çalıştırmayı hedefleyen statik bir rekompilasyon projesi; emülasyon değil. Xbox Series CPU'su x86-64 olduğu için oyun kodu doğrudan yükleniyor, konsol sistem yazılımı ise shim'lerle yeniden kuruluyor. GDK, XMem ve Xbox D3D12 importları PC karşılıklarına yönlendiriliyor; havuzda oyun dosyası, anahtar veya exe yok ve koruma aşımı tarif edilmiyor.

Grafik tarafı en büyük iş. Konsolun derlenmiş RDNA2 GPU programları LLVM'nin AMDGPU disassembler'ı ile SPIR-V'ye çevriliyor. PCGH'nin 24 Kasım tablosuna göre 26.503 shader'ın tamamı `spirv-val` kontrolünden geçiyor; bu yalnızca biçimsel geçerlilik demek, doğru görüntü demek değil. D3D12→Vulkan katmanında device, queue, command list, fence, descriptor heap, resource, view ve copy gibi parçalar çalışıyor; mesh draw, indirect draw, stream output, pipeline/swapchain ve ray tracing serileştirmesi açık. 23.841 shader Wave64 kullanıyor; Radeon bunu doğrudan karşılıyor, GeForce ve Intel'de bazı shader sınıfları yaklaşık çalışıyor.

Boot tarafı henüz "oyun açıldı" noktasında değil. README PE loader'ı yalnızca yer tutucu bir exe ile uçtan uca test edildiğini söylüyor. PCGH, gerçek exe sonrası ilk denemelerde siyah ekrana gelinip sesin kesildiğini aktarıyor; tek bir X paylaşımındaki "prolog açıldı" iddiası doğrulanabilir ayrıntı içermiyor. 24 Kasım 02:30 güncellemesinde projenin GitHub deposu ve Discord'u, ana geliştiricinin duyurusuyla kapatıldı. Sebep bilinmiyor; DMCA iddiası doğrulanmadığı için burada yok.

PCGH, üç günde 10.958 commit ve yaklaşık 32.400 yıldız sayısından söz ediyor; katkıda bulunanlar arasında Claude da listeleniyor. Projenin `AGENTS.md` kuralları oyun verisi ve koruma aşımını yasaklıyor, her PR'da AI kullanımı ve GPU/test bilgisi istiyor. Yani yüksek commit hızı, oynanabilirliğin ölçüsü değil. Exe'nin şifresiz ZIP ve SHA-256 ile verilmesi de benzer bir yanılgıyı doğuruyor: hash, dosyanın yayımlanan özetle eşleştiğini kanıtlar; kaynağın güvenli veya temiz olduğunu kanıtlamaz.

## Ne yapmalı?

1. **Yalnızca resmî kanalları izleyin.** Leonida'nın yayımladığı "indirici", "hazır exe" veya "GTA 6 PC kurulumu" yok; proje kapalıyken özellikle yok.
2. **Hash'ı güvenlik kanıtı sanmayın.** SHA-256 bütünlük kontrolüdür; kötü amaçlı yazılım taraması veya kaynak doğrulaması değildir.
3. **İddia ile durumu ayırın.** "26.503 shader geçti" ile "GTA 6 PC'de çalışıyor" aynı cümlede kullanılamaz; arada Vulkan katmanı ve görüntü üretimi var.
4. **Sızıntı dosyalarını çalıştırmayın.** Bilinmeyen kaynaktan gelen arşivleri açmayın; çalıştırdıysanız cihazı izole edip tarama yapın.
5. **Kod okuyorsanız sınırları koruyun.** README, design notları ve open issue'lar teknik kaynak; oyun dosyası, anahtar veya kırılmış kopya değil.
6. **Resmî PC sürümünü bekleyin.** Rockstar/Take-Two bu kayıtlarda bir PC tarihi açıklamadı; "bir hafta içinde oynanır" ifadesi Cyberleek'in iddiası, doğrulama değil.

## Ne yapmamalı?

- "GTA 6 PC'de oynanıyor" demeyin; kayıtlar siyah ekran ve ses kesilmesini gösteriyor.
- "Leonida bir emülatör" demeyin; proje statik rekompilasyon yapıyor.
- "spirv-val geçti, görüntü garanti" demeyin; bu yalnızca shader biçiminin geçerli olduğunu söyler.
- "Hash doğruysa dosya güvenli" demeyin; yayımlanan özetle eşleşme, temizlik kanıtı değil.
- "Repo kapatıldı, DMCA kanıtlandı" demeyin; sebep doğrulanmadı.
- "Cyberleek tüketiciler için kahraman" demeyin; olay token teşviki, tanıtım ve sızıntı ekonomisiyle iç içe.
- "Repo oyunun kendisini veya exe'yi içeriyor" demeyin; README açıkça aksini söylüyor.
- "Hazır port linki paylaşayım" demeyin; bu tür bağlantılar malware ve telif riski taşıyor.

## Durum

24 Kasım 2026 itibarıyla bu kayıt bir CVE değil; Cyberleek'in sızıntı iddiaları ile Leonida'nın açık kaynak çalışması birlikte izlendi. Doğrulanan bilgiler: 19 Kasım 209 GB build iddiası ve eksik exe, 23 Kasım exe yayımlanması, Leonida'nın 20 Kasım'da yayımlanması, README'in oyun/anahtar/exe içermemesi, 26.503 shader'ın SPIR-V'ye çevrilip biçimsel doğrulamadan geçmesi, D3D12→Vulkan işinin açık parçaları, ilk boot denemelerinde siyah ekran ve 24 Kasım'da repo/Discord'un kapatılması. Belirsizlikler: kapatılma sebebi, dosyaların baştan sona özgünlüğü, exe'nin kaynağı, gelecekteki resmî PC sürümü ve mali kazanç rakamları. Rockstar/Take-Two'nun bu kayıtlarda bir açıklaması yok; "DMCA kanıtlandı", "PC portu bitti" veya "coin kazancı kesin" başlıkları desteklenmiyor.

## Bu seriden

- [Windows 11 kilit ekranı atlatma: Narrator](/blog/windows-fastunlock-narrator)
- [Rank Math SEO eklentisine gömülen backdoor](/blog/herkes-phpye-dalmisken)
- [OpenShell: politika kapılı ajan çalışma ortamı](/blog/openshell-cncf-ajan-guvenligi)

## Kaynaklar

- [GitHub: ItsNotRexed/Leonida README](https://github.com/ItsNotRexed/Leonida)
- [GitHub: Leonida docs/design.md](https://github.com/ItsNotRexed/Leonida/blob/main/docs/design.md)
- [GitHub: Leonida docs/d3d12_vulkan.md](https://github.com/ItsNotRexed/Leonida/blob/main/docs/d3d12_vulkan.md)
- [GitHub: Leonida issue #313, D3D12 to Vulkan critical path](https://github.com/ItsNotRexed/Leonida/issues/313)
- [PC Games Hardware: Leonida after the exe leak, 24 Kasım 2026](https://www.pcgameshardware.de/GTA-6-Spiel-55239/News/PC-Port-Leonida-KI-Exe-Leak-Xbox-1560883/)
- [Eurogamer: CyberLeek claims a full development build, 19 Kasım 2026](https://www.eurogamer.net/cyberleek-gta-6-dev-build)
- [IT-Connect: Leonida recompiles the leaked Xbox build, 23 Kasım 2026](https://www.it-connect.tech/gta-6-on-pc-leonida-tries-to-recompile-the-leaked-xbox-build/)
- [PC Gamer: Who is Cyberleek?, 20 Ağustos 2026](https://www.pcgamer.com/games/grand-theft-auto/who-is-cyberleek-what-we-know-about-the-gta-6-leaker)
