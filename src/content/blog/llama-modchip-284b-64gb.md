---
title: 'llama-modchip: 284B DeepSeek''i 64 GB RAM''de çalıştırma iddiası'
description: '284B parametreli DeepSeek-V4-Flash''i GPU olmadan 64 GB RAM''de çalıştırdığını iddia eden llama-modchip''i inceliyoruz: 1.71 bpw quantizasyon, 9-14 tok/s hız ve henüz doğrulanmamış taraflar.'
pubDate: '2026-11-09'
heroImage: ../../assets/blog-placeholder-3.jpg
tags: ['llm', 'local-ai', 'deepseek', 'cpu', 'quantization', 'linux']
---

8 Kasım 2026'da Hacker News'te [412 puan alan bir başlık](https://news.ycombinator.com/item?id=50411961) vardı: **"Llama-modchip: 284B DeepSeek on 64GB RAM, no GPU."** Bir yanda 284 milyar parametreli bir model, diğer yanda ekran kartı olmayan, sadece 64 GB DDR5 belleğe sahip bir dizüstü işlemcisi. Normalde bu denklemin sonucu "OOM" olur. Proje, olmadığını söylüyor.

İddia ilginç olduğu kadar şüpheli de. Çünkü ortada bağımsız bir ölçüm yok; tüm sayılar projenin kendi README'sinden geliyor. Bu yazıda ne yaptığını, nasıl sığdığını ve nerede temkinli olmak gerektiğini anlatıyorum.

## Ne yapıyor?

[llama-modchip](https://github.com/synchopate/llama-modchip), `llama.cpp`/`ggml` üzerine yazılmış bir dizi kernel yaması, quantizasyon dönüştürücüsü ve çalışma zamanı aracı. Hedefi, Mixture-of-Experts (MoE) modellerini tamamen sistem belleğinde, GPU olmadan çalıştırmak.

Projenin vitrin modeli **DeepSeek-V4-Flash**. Modelin toplam 284,33 milyar parametresi var; her token için bunun yaklaşık 13,17 milyarı aktif oluyor. 43 MLA katmanı ve 256 yönlendirilmiş uzman (expert) içeriyor.

Standart `UD-IQ1_S` quantizasyonu bu modeli **76,87 GiB** (82,5 GB) boyutuna getiriyor. Bu, 64 GB'lık bir Linux makinede kullanılabilir belleğin üstünde. llama-modchip ise aynı modeli **56,56 GiB** (60,73 GB) boyutuna indiriyor. Projenin verdiği sayılara göre 256K bağlam penceresiyle çalışırken süreç belleği **57,61-58,9 GiB** arasında kalıyor ve takas (swap) kullanmıyor.

Yani olay "model küçüldü" değil; **model, 64 GB'lık makinenin sınırına sığdırıldı.** Aradaki fark 20,31 GiB, yaklaşık %26,4'lük bir küçülme.

## Nasıl sığıyor?

İki temel teknik var.

Birincisi **Fractal-64** adı verilen özel quantizasyon formatı. Ortalama **1,71 bit/parametre** demek bu. Modelin her katmanı aynı hassasiyette değil: gömme katmanları ve hassas katmanlar `Q4_K`/`Q5_K`/`F32` gibi daha yüksek hassasiyette tutulurken, yönlendirilmiş uzmanların çoğu `IQ1_S` (1,5625 bpw) seviyesine indiriliyor. Sınır katmanları `IQ2_XXS` ve `IQ1_M` ile korunuyor. MLA projeksiyonları ise `Fractal-64` (`GGML_TYPE_Q2_0`, tip kimliği 40) formatına dönüştürülüyor.

İkincisi **SwiGLU-H2** adı verilen ikinci dereceden ölçek eşleştirme. Proje, bu sıkıştırmanın modelin çıktısını tam olarak koruduğunu iddia ediyor; ancak bu da bağımsız olarak doğrulanmış değil.

Hız tarafında projenin verdiği sayılar şöyle:

| Ölçüm | Değer |
|---|---|
| Ön dolgu (prefill) | 43,16-44,36 tok/s |
| Kayıpsız decode | 9,06-9,95 tok/s |
| Spekülatif çözücüyle decode | 11,5-14,7 tok/s |
| Önceki prefill | 25,0 tok/s |

Yani manşetteki **14,7 tok/s**, spekülatif çözücü (Stockfish-PVS v2) açıkken elde edilen en iyi değer. Saf decode hızı 9-10 tok/s civarında. Bu, sohbet için kullanılabilir ama akıcı değil; 10.000 token'lık bir istemde ilk token'ı görmek yaklaşık 225 saniye sürebiliyor.

## Neden önemli?

Çünkü bu bir "yeni model" haberi değil, **donanım sınırını yeniden çizme** denemesi. 284B'lik bir MoE modelini tek bir 64 GB makinede çalıştırabilmek, özellikle şu senaryolarda anlamlı:

- GPU'su olmayan ama yüksek RAM'li bir iş istasyonu veya sunucu,
- Modelin ve verinin makineden çıkmadığı, çevrimdışı bir kurulum,
- Çoklu GPU maliyetinden kaçınmak isteyen araştırma ortamı.

Projenin daha pratik tarafı da var: aynı araç, **Nemotron-3.5-30B-A3B** modelini 14,35 GiB'e sığdırıp 16-32 GB RAM'li mini PC'lerde 25-60 tok/s hızında çalıştırabiliyor. Günlük kullanım için 284B iddiasından çok bu satır önemli olabilir.

## Şüpheli taraflar

İşin zor kısmı burada başlıyor.

**1. Bağımsız doğrulama yok.** Tüm hız ve bellek sayıları projenin kendi ölçümleri. Aynı donanımda üçüncü bir tarafın aynı sonucu aldığına dair bir kayıt yok. LavX News de bunu açıkça not ediyor: projenin özel formatı, aynı çalışma zamanını gerektiriyor.

**2. Hacker News yorumlarında başarısız denemeler var.** Bir kullanıcı, Xeon sunucusunda DeepSeek modelini yüklerken `tensor 'blk.0.ffn_gate_tid2eid.weight' has wrong shape` hatası aldığını; paketlenmiş `llama-cpp` ikilisinin ise `Illegal instruction (core dumped)` ile çöktüğünü yazmış. Başka bir kullanıcı, varsayılan `modchip` uygulamasının DeepSeek'i değil Nemotron'u kurduğunu söylüyor. Yani "klonla ve çalıştır" her makinede aynı sonucu vermiyor.

**3. Donanım şartı ciddi.** Manşet sayılar 16 çekirdekli Zen 5 (Ryzen 9 9955HX) üzerinde alınmış ve **AVX-512BW** gerektiriyor. Proje AVX2 ve ARM64'ü de desteklediğini söylüyor; ancak 9-14 tok/s seviyesi bu özel donanımda ölçülmüş. Eski bir Xeon'da aynı performansı beklemek doğru olmaz.

**4. Bellek gerçekten çok sıkı.** 64 GB'lık bir makinede kullanılabilir RAM yaklaşık 62,5 GiB. Model 57,61 GiB tuttuğunda geriye 4-6 GiB kalıyor. Tarayıcı, masaüstü ortamı ve diğer süreçler bu alanı hızla tüketebilir. Proje "sığıyor" diyor; pratikte "sığıyor ama nefes alacak yeri yok" demek daha doğru.

**5. Kalite ölçülmemiş.** 1,71 bpw, agresif bir sıkıştırma. Proje 100 puanlık kendi kalite kapısından bahsediyor; ancak modelin tam hassasiyetli sürümle karşılaştırmalı, bağımsız bir kalite ölçümü yok. Kod, matematik ve uzun bağlam görevlerinde ne kadar kayıp olduğu bilinmiyor.

**6. Format sizi projeye bağlıyor.** `GGML_TYPE_Q2_0` (tip 40), standart `llama.cpp`, Ollama veya LM Studio tarafından tanınmıyor. Yani modeli indirdiğinizde onu çalıştırmak için projenin kendi ikilisini veya yamalı sürümünü kullanmak zorundasınız. Bu, tedarik zinciri ve güvenlik açısından da dikkat gerektiriyor: yabancı bir depodan gelen önceden derlenmiş ikiliyi çalıştırmak, her zaman risk almak demek.

**7. 256K bağlam "yapılandırılmış" olabilir, test edilmiş olmayabilir.** README 256K bağlamda 57,61-58,9 GiB bellekten bahsediyor. Ancak gerçek bir 256K doldurma testinin sonuçları ve kararlılığı ayrıca gösterilmiyor.

## Kim denemeli?

llama-modchip'i **üretim için değil, deney için** düşünmek gerekiyor.

- Elinizde AVX-512 destekli, 64 GB RAM'li, GPU'suz bir Linux makinesi varsa ve "gerçekten sığıyor mu?" sorusuna kendi ölçümünüzle cevap arıyorsanız anlamlı.
- Gizlilik nedeniyle modeli tamamen çevrimdışı tutmak istiyorsanız, önce 30B/70B quantize modellerle başlamak daha mantıklı. 30B Nemotron bu projede çok daha olgun bir seçenek gibi görünüyor.
- Günlük kodlama veya sohbet için 9-14 tok/s ve sıkı bellek sınırı sizi mutlu etmeyebilir. 32B-70B aralığındaki modeller, 64 GB RAM'de çok daha rahat çalışır.

## Denemek isterseniz

Projenin kendi hızlı başlangıcı şu:

```bash
git clone https://github.com/synchopate/llama-modchip.git
cd llama-modchip
./modchip chat
```

Modeli doğrudan çalıştırmak için Hugging Face'teki `Synchopate/DeepSeek-V4-Flash-0731-Fractal-64GB-CPU-GGUF` deposunu ve projenin önceden derlenmiş `llama-server-modchip-linux-x86_64` ikilisini kullanmak gerekiyor. İlk adım olarak `./modchip status` ile CPU ve bellek hazırlığını kontrol edebilirsiniz.

Ama şunu unutmayın: bu, `ollama run` kadar basit bir işlem değil. Özel format, özel ikili, özel donanım ve çok az bellek payı var. Denemeden önce mevcut çalışma ortamınızı bozmayacak bir makinede veya ayrı bir kullanıcı hesabında çalıştırın.

## Sonuç

llama-modchip, "284B model 64 GB'a sığar" cümlesini teknik olarak mümkün kılan bir mühendislik gösterisi. Ama bu cümleyi ürünleştirmek ayrı bir iş: bağımsız doğrulama, kalite ölçümü, kararlılık ve normal bir kullanıcının kuramayacağı kadar özel bir kurulum gerekiyor.

Yine de bu tür projeler önemli. Çünkü donanım sınırlarının sabit olmadığını, quantizasyon ve çekirdek optimizasyonlarının bir araya geldiğinde birkaç yıl önce imkânsız görünen şeyleri mümkün kılabildiğini gösteriyor. Bugün 64 GB'ta 284B çalıştıran bir deney, yarın 32 GB'ta 70B çalıştıran bir ürüne dönüşebilir.

*Bu yazıdaki veriler 9 Kasım 2026 itibarıyla projenin GitHub deposu, Hacker News tartışması ve bağımsız haber kaynaklarından derlenmiştir. Tüm performans sayıları projenin kendi ölçümleridir; bağımsız olarak doğrulanmamıştır.*
