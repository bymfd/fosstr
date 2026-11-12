---
title: 'Linux çekirdeğinde AI yama seli: Lorenzo Stoakes bazı review görevlerini bıraktı'
description: 'Linux bellek yönetimi uzmanı Lorenzo Stoakes, AI üretimi yama akını nedeniyle core, reclaim, Rust, THP ve misc incelemelerinden çekildi. Bu, çekirdek geliştirme modelinin darboğazını gösteriyor.'
pubDate: '2026-11-12'
heroImage: ../../assets/blog-placeholder-4.jpg
tags: ['linux', 'kernel', 'ai', 'open-source', 'maintainers']
---

Linux çekirdeği, açık kaynak dünyasının en katı kalite süreçlerinden birine sahip. Bir yama, kabul edilmeden önce alt sistem maintainer'larının incelemesinden geçiyor; bu inceleme çoğu zaman yamanın kendisinden daha uzun sürüyor. Son yıllarda bu sürece yeni bir değişken eklendi: AI ile üretilen yamalar.

Kasım 2026'nın başında, bellek yönetimi (MM) alanının en deneyimli isimlerinden **Lorenzo Stoakes**, bazı review görevlerini bıraktığını Linux kernel mailing listesinde (LKML) duyurdu. Nedeni, AI kaynaklı yama akınının inceleme kapasitesini tüketmesi.

Bu, "bir geliştirici yoruldu" haberi değil. Çekirdek geliştirme modelinin ölçek sorununu gösteren somut bir işaret.

## Kısa özet

| Alan | Değer |
|---|---|
| Kişi | Lorenzo Stoakes (Arm) |
| Katkı | 2014'ten beri Linux çekirdeği; bellek yönetimi ve `mm/` alt sistemleri |
| Duyuru | LKML, 10 Kasım 2026 |
| Bıraktığı review alanları | MM core, reclaim, Rust, THP (Huge Pages), misc |
| Devam ettiği işler | Maintainer olduğu alanlar, KVM, elindeki yama serisini tamamlama |
| Gerekçe | AI/LLM kaynaklı yama akını ve gelen kutusu yükü |
| Ton | Karşılıklı anlayış; kırgınlık veya "AI karşıtı" bir manifesto yok |

## Lorenzo Stoakes kim?

Stoakes, Arm'da çalışan ve 2014'ten beri Linux çekirdeğine katkı veren bir geliştirici. Bellek yönetimi tarafında uzun süredir review yapıyor; `The Linux Memory Manager` kitabının da yazarı. Yani "çekirdeğe ara sıra bakan" biri değil, alt sistemin günlük işleyişini taşıyan isimlerden biri.

LKML'deki duyuruda, review listelerinden kendisini çıkardığı yama serisinde şunu yazıyor:

> "Çekirdekteki mevcut AI üretimi yama hacmi göz önüne alındığında, ne yazık ki maintainer olduğum alanlar dışında genel olarak review yapabilecek bant genişliğine sahip değilim."

Stoakes, ayrılmanın nedenini "gelen kutusunu biraz daha yönetilebilir hale getirme isteği" olarak açıklıyor. Elindeki yama serilerini tamamlayacağını ve zaman zaman katkı vermeye devam edeceğini söylüyor. Yani çekirdekten tamamen ayrılmıyor; review yükünü azaltıyor.

## AI yama seli ne demek?

"AI slop" ifadesi, büyük dil modelinin ürettiği, yüzeysel olarak makul görünen ama bakımı zor veya gereksiz yamalar için kullanılıyor. Bu yamalar derleniyor, bazen testleri geçiyor, hatta mantıklı bir hata düzeltmesi gibi görünüyor. Asıl maliyet, **anlamlı bir katkı ile gürültüyü ayırma** aşamasında ortaya çıkıyor.

Stoakes bunu yeni bir sorun olarak görmüyor. Temmuz 2026'da bellek yönetimi listesinde "son dönemdeki slop dalgasından" söz etmiş ve şunu söylemişti:

> "AI slop'una harcanan zaman zaten çok fazla ve biz daha bu işin başındayız."

Ekim 2026'da ise daha net bir tablo çizmiş: projeyi öldüren şeyin 1.000 slop gönderisi olduğunu ve bunlarla 2-3 kişinin uğraşmak zorunda kaldığını söylemiş. Bu, rakamın kendisinden çok oranı anlatıyor: üretim tarafı ölçekleniyor, inceleme tarafı ölçeklenmiyor.

## Neden review, neden şimdi?

Linux çekirdeğinde kod yazmak hiç bu kadar "kolay" olmamıştı. Bir modelden yama taslağı istemek, saniyeler sürüyor. Ama o yamanın doğru olduğunu, kenar durumları bozmadığını, alt sistemin kurallarına uyduğunu ve gerçekten gerekli olduğunu doğrulamak hâlâ insan zamanı istiyor.

Çekirdek topluluğu AI katkılarını etiketleme zorunluluğu getirmedi. Bu tercih, katkı verenin kimliğine göre değil, yamanın kendisine göre değerlendirme yapma geleneğine dayanıyor. Ancak pratikte triyajı zorlaştırıyor: maintainer, gelen yamanın bir model tarafından üretilip üretilmediğini çoğu zaman bilmiyor. Kötü niyetli bir "slop" ile deneyimsiz ama gerçek bir katkıyı ayırmak için yine kodu okumak gerekiyor.

Stoakes'in durumu, bu işin sürdürülebilirliğini gösteriyor. Review yapan kişi sayısı sabit; gelen yama sayısı artıyor. Bir noktada ya inceleme kalitesi düşüyor ya da inceleme yapan kişi miktarı azaltıyor. Stoakes ikinci yolu seçti.

## Bu "AI karşıtı" bir isyan mı?

Hayır. Tabloyu doğru okumak için birkaç noktayı ayırmak gerekiyor.

**1. Stoakes çekirdekten ayrılmıyor.** Maintainer olduğu alanlarda ve KVM tarafında çalışmaya devam ediyor. Duyuru, topyekûn bir "bırakıyorum" değil, review yükünü daraltma kararı. Tonu da suçlayıcı değil; yama serisini alt sistem maintainer'larına bölüştürüp kolaylaştırmaya çalışıyor.

**2. Linux'ta AI kullanımı zaten var.** Linus Torvalds, AI destekli katkılara karşı değil; hatta Linux 7.4-rc2 sürecinin önemli bir kısmının AI kaynaklı düzeltmelerle ilerlediğini söyledi. Çekirdek, hata bulma ve düzeltme tarafında AI'dan fiilen yararlanıyor. Sorun, AI'ın varlığı değil, **düşük kaliteli üretimin review kapasitesini tüketmesi**.

**3. Karar amicable.** Tom's Hardware ve Phoronix'in aktardığı tabloda kırgın bir ayrılık yok. Stoakes, "bu trend göz önüne alındığında gelen kutumla ilgili bir şey yapmak istiyorum" diyor. Bu, bir sistemin sınırına geldiğini kabul etmek anlamına geliyor.

Yani mesele "AI kötü" değil; **üretim maliyeti düşerken doğrulama maliyetinin düşmemesi**.

## Daha geniş tablo

Linux, AI katkıları konusunda tek örnek değil. 2026 boyunca projeler farklı yönlere savruldu: Debian, Ağustos 2026'da AI üretimi katkılara izin verme yönünde oy kullandı. Gentoo ve NetBSD gibi projeler ise telif, kalite ve etik gerekçelerle daha sıkı kurallar uyguluyor. Aynı soruya verilen farklı cevaplar, ortak bir standardın henüz oluşmadığını gösteriyor.

Çekirdek tarafında ise pratik bir gerçek var: proje, katkıların AI ile üretilip üretilmediğini zorunlu olarak sormuyor. Bu, katkı verenler için özgürlük; maintainer'lar için ise filtreleme yükü demek.

Uzun vadede akla gelen çözümler şunlar:

- **Etiketleme ve köken bilgisi.** Zorunlu olmasa bile "bu yama AI destekli üretildi" bilgisini taşımak, maintainer'ın nasıl okuyacağını değiştirebilir.
- **Otomatik ön inceleme.** Derleme, stil, temel test ve statik analiz katmanlarının AI yamalarını insan sırasına girmeden elemek için daha agresif kullanılması.
- **Katkı reputasyonu.** Aynı kişiden gelen düşük kaliteli yamaların tekrar tekrar insan zamanı tüketmesini engelleyen süreçler.
- **Review kapasitesine yatırım.** Maintainer'lık çoğu projede gönüllü veya yarı gönüllü bir iş. Üretim tarafı otomatikleşirken inceleme tarafının aynı hızda büyümemesi, bu tür ayrılıkları kaçınılmaz hale getiriyor.

## Sonuç

Lorenzo Stoakes'in kararı, Linux çekirdeğinin "AI ile kod yazma" tartışmasında geldiği noktayı gösteriyor: mesele artık kod üretmek değil, üretilen kodu **güvenilir şekilde ayıklamak**. Bir modelin saniyeler içinde ürettiği yamayı, bir insanın saatler içinde incelemesi gerekiyorsa, ölçek sorunu çözülmemiş demektir.

Bu, AI'ın açık kaynağa katkısını reddetmek için bir gerekçe değil. Tam tersine, katkının değerini korumak için inceleme sürecinin yeniden tasarlanması gerektiğinin işareti. Aksi halde daha fazla deneyimli maintainer, aynı nedenden dolayı yükünü azaltacak.

## Kaynaklar

- [LKML: Stoakes'in review listelerinden çekilme yama serisi](https://lore.kernel.org/lkml/avMRk95T26rsq4JK@gremlin/T/)
- [Phoronix: Longtime Linux Developer Steps Down From Some Roles Due To Patch Flood Caused By AI](https://www.phoronix.com/news/Lorenzo-Stoakes-AI-Flood)
- [Tom's Hardware: Linux kernel reviewer steps down from memory management duties due to influx of AI slop patches](https://www.tomshardware.com/software/linux/linux-kernel-reviewer-steps-down-from-memory-management-duties-due-to-influx-of-ai-slop-patches-the-amount-of-time-wasted-on-ai-slop-is-already-too-much-and-were-only-at-the-start-of-this-volume-of-submissions-and-low-manpower-forces-the-step-back)
- [MLQ.ai: Linux memory-management reviewer Lorenzo Stoakes drops most review duties](https://mlq.ai/news/linux-memory-management-reviewer-lorenzo-stoakes-drops-most-review-duties-citing-a-flood-of-ai-generated-patches)
