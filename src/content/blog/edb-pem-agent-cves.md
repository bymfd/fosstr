---
title: 'EnterpriseDB PEM: ajan ayrıcalıklarını genişleten üç açık'
description: 'Postgres Enterprise Manager 10.6.1 öncesi için CVE-2026-132658, CVE-2026-132659 ve CVE-2026-132660. EDB bildirimleri, CVSS kaynağı ve NVD durumu.'
pubDate: '2026-11-22'
heroImage: ../../assets/edb-pem-agent-cves-hero.jpg
tags: ['security', 'enterprisedb', 'postgres', 'pem', 'cve', 'privilege-escalation']
---

EnterpriseDB, 19 Kasım 2026'da Postgres Enterprise Manager (PEM) için üç güvenlik bildirimi yayımladı. NVD kayıtları 20 Kasım'da oluşturuldu ve hâlâ `Received` durumunda. Üç açık da 10.6.1'de düzeltiliyor; ancak CVSS 9.4 skorunun sahibi EDB, NVD analizi değil.

## Kısa özet

| Alan | Değer |
|---|---|
| CVE | CVE-2026-132658, CVE-2026-132659, CVE-2026-132660 |
| Ürün | Postgres Enterprise Manager (PEM), 10.6.1 öncesi |
| Zayıflıklar | CWE-269 (ayrıcalık yönetimi), CWE-863 (yanlış yetkilendirme), CWE-426 (güvenilmeyen arama yolu) |
| CVSS v4.0 | 9.4 Critical — üçü de EDB CNA kaynaklı; NVD'de CVSS v3.1 kaydı yok |
| NVD durumu | Üçü de Received (analiz tamamlanmadı) |
| SSVC (CISA Coordinator) | exploitation: none, automatable: no, technicalImpact: total |
| CISA KEV | Bu üç CVE kaydı KEV kataloğunda yok |
| Düzeltme | PEM 10.6.1 veya üstü |

![EnterpriseDB PEM ajan ayrıcalık zinciri](/diagrams/edb-pem-agent-cves.svg)

## Teknik görünüm

**CVE-2026-132658 — dosya erişimi.** Her PEM ajan girişinin devraldığı `pem_agent` rolü, PEM arka uç veritabanında `pg_read_server_files` ve `pg_write_server_files` üyesi. İzlenen herhangi bir sunucuyu ve dolayısıyla o sunucunun ajan sertifikasını kontrol eden saldırgan, PEM sunucu host'unda `postgres` işletim sistemi kullanıcısı olarak dosya okuyup yazabiliyor. Bu kapsam PEM CA anahtarını da içeriyor; anahtar ele geçirse saldırgan başka ajanlar için sertifika üretebilir. Etkilenen aralık 10.5.0 ve 10.6.1 öncesi.

**CVE-2026-132659 — iş kuyruğu sınırı.** `pem.job` ve `pem.jobstep` üzerindeki satır düzeyi güvenlik politikaları bir ajanı kendi işleriyle sınırlamıyor. Tek bir izlenen sunucuyu kontrol eden saldırgan, PEM sunucusundaki ajan dahil tüm ajanlar için iş oluşturabiliyor, değiştirebiliyor ve silebiliyor. SQL iş adımları izlenen sunucunun veritabanı kimlik bilgileriyle, shell adımları toplu işler etkinse o şekilde çalışıyor. EDB bildirimi, tek bir hostun ele geçirilmesinin tüm izlenen veritabanlarda ve PEM arka ucunda süper kullanıcı SQL erişimi verebileceğini yazıyor. Etkilenen aralık 7.3.0 ve 10.6.1 öncesi.

**CVE-2026-132660 — arama yolu.** PEM şemasındaki birkaç `SECURITY DEFINER` fonksiyon süper kullanıcıya ait ve güvenli `search_path` ayarlamıyor. Arka uç veritabanına bağlanabilen her PEM kullanıcısı, bu fonksiyonların kullandığı nesneleri kendi nesneleriyle gölgeleyip süper kullanıcı yetkisiyle keyfi SQL çalıştırabiliyor. Geçici nesneler desteklenen tüm PostgreSQL sürümlerinde, `public` şema nesneleri PostgreSQL 14 arka uçlarında ve 14'ten yükseltilmiş arka uçlarda kullanılabiliyor. Etkilenen aralık 7.6.0 ve 10.6.1 öncesi.

Üç bildirim de kta1kri tarafından EDB açık raporlama programı aracılığıyla bildirildiğini belirtiyor.

## Ne yapmalı?

1. **10.6.1'e yükseltin.** Üç bildirim de ilk düzeltme sürümü olarak 10.6.1'i gösteriyor. PEM 9.8 için düzeltme yok; 9.x kullanıcılarının 10.6.1 veya üstüne geçmesi gerekiyor.
2. **Ajan sertifikalarını koruyun.** Yükseltmeye kadar izlenen hostlardaki ajan sertifikası ve özel anahtarını koruyun, bu hostlarda root erişimini güvenilir yöneticilerle sınırlayın; bu EDB'nin geçici önlemi.
3. **Gereksiz shell iş adımlarını kapalı tutun.** CVE-2026-132659 için EDB, ihtiyaç duymayan ajanlarda toplu (shell) iş adımlarının devre dışı bırakılmasını öneriyor.
4. **Arka uç erişimini daraltın.** CVE-2026-132660 için `pg_hba.conf` ile veritabanına bağlanabilen hostları sınırlayın ve `REVOKE CREATE ON SCHEMA public FROM PUBLIC` uygulayın. EDB bu önlemin geçici nesne yolunu kapatmadığını, yükseltmenin yerine geçmediğini açık yazıyor.
5. **Şüpheli durumda sertifikaları yenileyin.** EDB, yükseltmenin eski dosya erişimini geri almadığını; izlenen bir hostun ele geçirildiği düşünülüyorsa CA ve tüm ajan sertifikalarının yeniden verilmesini istiyor.

## Ne yapmamalı?

- "CVSS 9.4 NVD verdi" demeyin. Skor EDB CNA'sına ait CVSS v4.0; NVD kayıtları Received ve v3.1 analizi yok.
- "Aktif istismar ediliyor" veya "KEV'de" demeyin. Bu üç CVE KEV kataloğunda yok; SSVC `exploitation: none` diyor. Bu, istismarın imkânsız olduğu anlamına da gelmez.
- "Yamalı sürüm 10.6.1, hepsi tamam" demeyin. EDB, şüpheli ele geçirme durumunda sertifika yenilemesi gerektiğini ayrıca belirtiyor.
- `REVOKE CREATE ON SCHEMA public FROM PUBLIC` tek başına çözüm sanmayın; geçici nesne yolu açık kalıyor.
- Birincil bildirimlerde yer almayan port, saldırı yüzeyi veya PoC ayrıntılarını eklemeyin.

## Durum

22 Kasım 2026 itibarıyla üç açık **satıcı bildirimleriyle doğrulanmış, düzeltmesi yayımlanmış, fakat NVD analizi tamamlanmamış**. NVD kayıtları Received; CVSS 9.4 ve vektörler EDB kaynaklı, SSVC alanları CISA Coordinator kaynaklı. CISA KEV kataloğunda bu CVE'ler bulunmuyor ve birincil kayıtlar istismar kanıtı ya da PoC içermiyor. Belirsizlikler: NVD analizi tamamlanmadığı için bağımsız skor yok; bildirimler ağ portu veya uzaktan erişim yüzeyi hakkında ayrıntı vermiyor. "PEM sunucuları ele geçirildi" veya "ransomware doğrulandı" başlıkları bu kayıtlarla desteklenmiyor.

## Bu seriden

- [IBM Guardium CVE-2026-84236](/blog/ibm-guardium-cve-2026-84236)
- [VMware vCenter CVE-2026-123890](/blog/vmware-vcenter-cve-2026-123890)
- [Apache Axis CVE-2026-90436](/blog/apache-axis-cve-2026-90436)

## Kaynaklar

- [EDB bildirimi CVE-2026-132658](https://www.enterprisedb.com/docs/security/advisories/cve2026132658/)
- [EDB bildirimi CVE-2026-132659](https://www.enterprisedb.com/docs/security/advisories/cve2026132659/)
- [EDB bildirimi CVE-2026-132660](https://www.enterprisedb.com/docs/security/advisories/cve2026132660/)
- [NVD - CVE-2026-132658](https://nvd.nist.gov/vuln/detail/CVE-2026-132658)
- [NVD - CVE-2026-132659](https://nvd.nist.gov/vuln/detail/CVE-2026-132659)
- [NVD - CVE-2026-132660](https://nvd.nist.gov/vuln/detail/CVE-2026-132660)
- [CISA KEV kataloğu](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)
