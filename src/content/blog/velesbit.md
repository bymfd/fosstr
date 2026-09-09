---
title: 'velesbit: Otomatik Vitesli Bisiklet Sistemi'
description: 'Arduino tabanlı, kablolu vites sistemlerine uyumlu otomatik şanzıman projesi'
pubDate: '2026-09-10'
heroImage: ../../assets/blog-placeholder-2.jpg
tags: ['arduino', 'bisiklet', 'mekatronik', 'diy']
---

Bisiklet süren biliyorsun: tırmanmada vites değiştirmek, inişte fren, virajda denge... Peki ya bisikletin bunu kendisi yapsa?

## Neden İhtiyaç Duydum?

İstanbul'da bisikletla işe giderken, Kadıköy'den Fenerbahçe'ye her gün tırmanıyordum. Vites değiştirmek o kadar can sıkıcıydı ki, "bunu yazılım yapabilir miyim?" diye düşündüm. Sonra bir de şey ekledim: eğer bisikletin kendi karar verirse, insan hatası olmaz. Trafikte dikkatin dağıldığı anlarda vites unutulmaz — otomatik sistem bunu çözer.

## Proje Nedir?

`velesbit`, mevcut kablolu vites sistemlerine uyumlu, Arduino tabanlı otomatik şanzıman projesi. Hız ve RPM verilerine göre otomatik vites değiştiriyor.

## Versiyonlar

- **Alpha 3:** 2x16 LCD ekran, buton kontrolü
- **Alpha 6:** 0.96" OLED ekran, daha kompakt tasarım

## Nasıl Çalışır?

1. Sensörler hız ve RPM okur
2. Arduino hesaplamalar yapar
3. Servo motor kablo çekerek vites değiştirir

## Uyumluluk

Tüm kablolu vites sistemleriyle çalışır (Shimano, SRAM vb.). Mekanik bir modül bisikletinize takılır.

## Deneyimler

Hackaday.io'da da paylaşılan proje, açık kaynak topluluktan ilham almak için tasarlandı. 3D yazıcıdan parçalar, Arduino'dan kod, bisikletten güç — tam bir DIY projesi.

---

**Repo:** [github.com/bymfd/velesbit](https://github.com/bymfd/velesbit)
**Hackaday:** [hackaday.io/project/166291](https://hackaday.io/project/166291-automatic-transmission-system-for-bicycles)
**Lisans:** MIT
