---
title: 'XRAID: ZFS gibi declustered parity RAID XFS içinde'
description: 'Christoph Hellwig, zoned XFS için XRAID''i ilk kez kamuya açtı. Parity RAID yalnızca dosya verisine uygulanıyor; metadata MD RAID''e bırakılıyor. Yazmalar mdraid''e göre 20 kata kadar hızlı.'
pubDate: '2026-11-16'
heroImage: ../../assets/xraid-hero.jpg
tags: ['linux', 'xfs', 'storage', 'raid', 'zoned', 'kernel']
---

Linux depolama tarafında uzun süredir beklenen bir değişiklik 13 Kasım 2026'da görünür oldu: Christoph Hellwig, **XRAID** adını verdiği yeni RAID uygulamasının ilk genel sürümünü duyurdu. XRAID, ayrı bir blok katmanı veya ayrı bir dosya sistemi değil; **XFS'in içine entegre edilmiş declustered parity RAID**.

Hedef, özellikle **zoned XFS** kurulumları: SMR diskler gibi sıralı yazma zorunluluğu olan cihazlar. Ama XRAID normal sabit disklerde ve SSD'lerde de çalışıyor. Hellwig'e göre SSD performansı optimize edilmemiş olsa bile yazmalar **mdraid'e kıyasla 20 kata kadar** hızlı.

Bu yazı, XRAID'in ne yaptığını, neden mevcut RAID çözümlerinden farklı olduğunu ve henüz neden üretimde kullanılmaması gerektiğini anlatıyor.

## Kısa özet

| Alan | Değer |
|---|---|
| Geliştirici | Christoph Hellwig |
| Duyuru | 13 Kasım 2026, LKML |
| Geliştirme süresi | Yaklaşık 1,5 yıl |
| Tür | XFS'e entegre declustered parity RAID |
| Öncelikli hedef | Zoned XFS, SMR diskler |
| Desteklenen cihazlar | Zoned ve geleneksel HDD/SSD |
| Metadata koruması | Mevcut MD RAID mirroring'e devrediliyor |
| Performans | Yazmalarda mdraid'e göre 20 kata kadar hız |
| Durum | Kamuya açık ilk yamalar; upstream'e hazır değil |

## Zoned XFS neden farklı?

Zoned cihazlar, verinin sıralı olarak yazılmasını ister. SMR (shingled magnetic recording) sabit diskler bunun tipik örneği: Rastgele yazma pahalı, sıralı yazma verimli. Geleneksel RAID, parity bloklarını yerinde güncellemek zorunda olduğu için bu modelle doğrudan uyuşmaz.

Zoned XFS'in çözümü, dosya verisi ile metadata'yı ayırmak. XFS'in **realtime (RT) subvolume** mekanizması kullanılarak yalnızca dosya verisi sıralı yazma gerektiren zonalara yerleştiriliyor; metadata ise geleneksel cihazlarda veya zonalarda tutuluyor.

XRAID bu ayrımın üzerine kuruluyor. Parity RAID yalnızca **dosya verisi** için sağlanıyor; çünkü parity RAID'in verimli çalıştığı yer orası. Küçük nesnelerin yerinde güncellendiği metadata için ise parity RAID uygun değil. XRAID, metadata yedekliliğini MD RAID mirroring gibi mevcut katmanlı Linux sürücülerine bırakıyor.

## XRAID nasıl çalışıyor?

Hellwig'in açıklamasına göre XRAID, Zoned XFS I/O yolunun **altında**, katmanlı bir blok sürücüsüne benzer şekilde konumlanıyor. Alttaki cihazların fiziksel zonalarını mantıksal zonalara birleştiriyor; Zoned XFS bu mantıksal zonaları realtime gruplar olarak kullanıyor.

Akış kabaca şöyle:

1. XFS, dosya verisini RT subvolume üzerinden yazar.
2. Zoned XFS, bu veriyi sıralı yazma zonalarına yönlendirir.
3. XRAID, fiziksel zonaları mantıksal zonalara toplar ve parity'yi yönetir.
4. Metadata ayrı tutulur ve yedekliliği MD RAID mirroring'e devredilir.

Bu tasarımın ana fikri, RAID'in "her şeyi koruyan" bir katman olmaktan çıkıp yalnızca **parity'nin anlamlı olduğu veri türüne** odaklanması. Küçük, yerinde güncellenen metadata için aynalama; büyük, sıralı yazılan dosya verisi için parity.

## Declustered RAID ne kazandırıyor?

Klasik RAID'te bir stripe, D adet veri ve P adet parity bloğundan oluşur ve genellikle D+P disk üzerine sabitlenir. Declustered RAID'de ise her stripe'ın veri ve parity blokları, **D+P'den daha fazla disk içeren bir havuza** dağıtılır. Böylece tüm diskler okuma, yazma ve yeniden oluşturma işlemlerine katılır; yedek kapasite de tüm disklere yayılır.

Pratik sonuçlar:

- **Daha hızlı rebuild.** Yeniden oluşturma tek bir yedek diske değil, boş kapasitesi olan tüm cihazlara paralel yapılabiliyor.
- **Daha esnek büyük havuzlar.** Çok sayıda diski tek havuzda yönetmek kolaylaşıyor.
- **Dinamik rebuild sırası.** XRAID, birden fazla yedekliliğini kaybetmiş zonaları önce onarıyor; veri zonalarını parity zonalarından önce yeniden oluşturarak bozuk okuma (degraded read) maliyetini azaltıyor.

Bu, özellikle onlarca disklik depolama sunucularında rebuild süresinin saatler değil dakikalar mertebesine inmesi anlamına gelebilir. Ama buradaki "gelebilir" önemli: Henüz bağımsız ölçümler ve üretim deneyimi yok.

## Neden mdraid'in yerini almıyor?

XRAID'i "yeni genel amaçlı RAID" diye okumamak gerekiyor. Sınırlarını açıkça belirtmek lazım:

- **Upstream'e hazır değil.** Hellwig, ilk yamaların upstream gönderimi için hazır olmadığını, ancak test ve geri bildirim aşamasına geldiğini söylüyor.
- **Genel RAID yerine XFS'e özel.** XRAID, Zoned XFS'in veri/metadata ayrımına yaslanıyor. Diğer dosya sistemleri veya kök dosya sistemi senaryoları için bir çözüm olarak sunulmuyor.
- **Metadata için parity yok.** Metadata yedekliliği MD RAID mirroring'e devredilmiş. Yani tek başına "her şeyi RAID'leyen" bir katman değil.
- **SSD optimizasyonu yok.** SSD'lerde çalışıyor, ancak performans için özel bir çalışma yapılmamış.
- **Benchmark'lar erken.** 20 kat hız iddiası Hellwig'in sunumundaki ilk ölçümlere dayanıyor; bağımsız testlerle doğrulanması gerekiyor.

Kısacası XRAID, "mdraid öldü" haberi değil; zoned depolama ile parity RAID'i aynı çatı altında buluşturan deneysel bir yaklaşım.

## Neden önemli?

Depolama dünyası iki yöne birden gidiyor: Kapasite için SMR/zoned cihazlar yaygınlaşıyor, hız için NVMe SSD'ler öne çıkıyor. Geleneksel RAID yazılımı bu iki dünyanın ikisine de tam oturmuyor. SMR'de parity güncellemesi pahalı; SSD'de ise rebuild ve write amplification sorun olabiliyor.

XRAID'in katkısı, RAID'i dosya sisteminin veri yerleşimiyle uyumlu hale getirmesi. XFS zaten hangi verinin sıralı, hangisinin rastgele yazılacağını biliyor. RAID'in bu bilgiyi kullanması, ayrı bir katmanın tahmin etmesinden daha mantıklı.

Ayrıca Hellwig'in ismi burada güven veriyor: Uzun yıllardır Linux depolama ve dosya sistemi tarafında çalışan, XFS ve block layer'da imzası olan bir geliştirici. XRAID'in bir buçuk yıldır kapalı geliştirilmesi de aceleye getirilmediğini gösteriyor.

## Nasıl denenir?

Test etmek isteyenler için üç parça var:

- [LKML'deki ilk yama serisi](https://lore.kernel.org/lkml/20261113112913.GA31748@lst.de/)
- XRAID destekli `mkfs` için `xfsprogs` dalı
- Yeni `xraid` yardımcı programı

Ancak bunlar deneysel. Üretim verisiyle, yedek olmadan denenmemeli. Zoned XFS'in kendisi de olgun bir kurulum değil; XRAID onun üzerine ek bir katman.

Hellwig'in bu yıl yaptığı sunumun slaytları da [burada](https://verein.lst.de/~hch/raid-sucks.pdf) mevcut; tasarımın arkasındaki gerekçeyi ve ilk benchmark'ları görmek için iyi bir başlangıç.

## Sonuç

XRAID, "RAID'i dosya sistemine taşıma" fikrinin somut bir örneği. Parity'yi yalnızca dosya verisine uygulaması, metadata'yı mevcut aynalama çözümlerine bırakması ve zoned cihazları merkeze alması, klasik RAID'in sınırlarını kabul eden bir tasarım.

Henüz upstream'de değil, üretim için hazır değil ve performans iddiaları bağımsız olarak doğrulanmadı. Ama SMR/zoned depolama yaygınlaştıkça bu tür bir entegrasyonun neden gerekli olduğunu anlamak kolay. XRAID, bu ihtiyacın ilk ciddi cevaplarından biri.

## Kaynaklar

- [Phoronix: XRAID Publicly Released As New RAID Implementation For XFS](https://www.phoronix.com/news/XRAID-XFS-RAID)
- [LKML: XRAID ilk yama serisi](https://lore.kernel.org/lkml/20261113112913.GA31748@lst.de/)
- [Christoph Hellwig: RAID sunumu slaytları](https://verein.lst.de/~hch/raid-sucks.pdf)
