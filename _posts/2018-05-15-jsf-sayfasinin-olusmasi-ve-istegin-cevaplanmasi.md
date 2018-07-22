---
title: JSF Sayfasının Oluşması & İsteğin Cevaplanması
date: 2018-05-01 19:11:00
categories:
- JSF
tags:
- JSF
- RenderingPages
- DecodingRequests
image: \nea\assets\images\jsf\jsf3.png

---

### JSF Sayfasının Oluşması  (Rendering Pages)

- Sayfada yer alan JSF elementi, karşılığı olan html elementine dönüştürülerek bileşen ağacı oluşturulur.  Bu işlem 'encoding' olarak adlandırılır.
- Encoded page tarayıcıya gönderilir. Tarayıcı üzerinde JSF sayfası incelendiğinde html elementleri görülür.

{% highlight r %}

Örneğin,

JSF elementi = h:inputText
Dönüştürülen HTML elementi = input name="id" type="text" value="değer"

{% endhighlight %}

![](\nea\assets\images\jsf\jsf3.png)
*JSF sayfasının oluşması & İsteğin cevaplanması*

### İsteğin Cevaplanması (Decoding Request)

- Kullanıcı, tarayıcıdaki form alanlarını doldurup komut (h:commandButton, h:commandLink) bileşeni ile etkileşime geçtiğinde, forma girilen veriler POST isteği olarak web sunucusuna gönderilir. Form gönderildikten sonra başka bir sayfaya gidilir.
- Girdi bileşenlerine girilen değerler, "setter" methodu ile çağrılır.
- Komut bileşenine tıklanıldıysa "action" etiketine bakılır.
- Formdaki veri 'id1=değer1&id2=değer2' olarak gönderilir.
- Bu işlem 'decoding' olarak adlandırılır.