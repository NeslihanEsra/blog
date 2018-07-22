---
title: JSF'in Yaşam Döngüsü
date: 2018-05-09 17:41:00
categories:
- JSF
tags:
- JSF
- YasamDongusu
- LifeCycle
image: \nea\assets\images\jsf\jsf1.png

---

JSF'in yaşam döngüsünü anlamak, bir sorunla karşılaştığınız hatanın neyden kaynaklandığını bilmek ve bu işin mantığını öğrenmektir. Hem de JSF frameworkunun derdinin ne olduğu anlaşılır.

![](\nea\assets\images\jsf\jsf1.png)

### 1-Restore View

- İstemci tarafındaki kullanıcı ara yüzündeki bileşen ağacı (component tree)* oluşur. Sayfa ilk defa görüntüleniyor ise yeni bir bileşen ağacı oluşur. Eğer önceden oluşturulmuşsa bileşen ağacı güncellenir.

- Eğer request değer yoksa ve sayfa ilk defa görüntüleniyor ise son aşama olan Render Response aşamasına geçer.

> *bileşen ağacı = JSF sayfasındaki tüm kullanıcı elementleri için Java nesnelerini içeren bir veri yapısıdır.

### 2-Apply Request Values

- Request değerleri bileşen ağacına yerleştirilir.

### 3-Process Validations

- Local değerleri dönüştürme(converter) ve doğrulama(validator) kontrolleri yapılır. Bu kontroller tamamlanırsa bir sonraki aşamaya geçilir. Eğer kontrollerde hata olursa, Render Reponse aşamasına geçer ve  geçerli sayfa tekrar yüklenir. Bu durum ile ilgili hata tagleri ekleyerek kullanıcı hatanın kaynağını anlayabilir.

> *local değer = bileşende yer alan değer

### 4-Update Model Values

- Converter ve validator işlemi tamamlandıktan sonra bileşene bağlı olan modelin değerleri güncellenir.

### 5-Invoke Application

- Sayfada bulunan formun gönderilmesine neden olan action/actionListener da bulunan modelin controller sınıfında yer alan methodu çağırılır. Bu method ile uygulamanın işlemi gerçekleştirilir.

### 6-Render Response

- Response oluşturularak ve tarayıcıya gönderilir.

>  **Not 1:** Kullanıcı yeni request gönderdiğinde bu döngü yeniden başlar.