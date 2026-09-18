import enUS from './en-US'

export default {
  ...enUS,
  demo: { ...enUS.demo, title: "Demo", description: enUS.demo.description },
  nav: { ...enUS.nav, github: "GitHub" },
  hero: { ...enUS.hero, subtitle: "Hızlı QR Kod Tarayıcı", description: "Tauri + Vue 3 ile oluşturulmuş çapraz platform masaüstü uygulaması\\ n Pano ve yerel görüntülerden QR kodu içeriğini hızlı bir şekilde okuyun", downloadNow: "Şimdi İndirin", learnMore: "Daha Fazla Bilgi Edinin", appScreenshot: "ClipQR Uygulaması Ekran Görüntüsü", localFirst: "Önce yerel · Açık kaynak · Çapraz platform" },
  features: { ...enUS.features, title: " Özellikler ", clipboardRead: "Pano Doğrudan Okuma", clipboardReadDesc: "Panodaki görüntüleri doğrudan okuyun ve tek bir tıklamayla QR kodlarını ayrıştırın", localFile: "Yerel Dosya", localFileDesc: "Yerel görüntü dosyalarından QR kodlarının ayrıştırılmasını destekleyin", dragDrop: "Sürükle bırak", dragDropDesc: "Doğrudan ayrıştırma için resim dosyalarını pencereye sürüklemeyi destekler", fastResponse: "Hızlı Yanıt", fastResponseDesc: "Pas ile yüksek performanslı ayrıştırma, anında sonuçlar", oneClickCopy: "Tek Tıkla Kopyala", oneClickCopyDesc: "Ayrıştırma sonuçlarını panoya kopyalamak için tıklayın", autoOpenLink: "Bağlantıyı Otomatik Aç", autoOpenLinkDesc: "URL algılandığında tarayıcıyı otomatik olarak aç" },
  useCases: { ...enUS.useCases, title: "Kullanım Gereklilikleri", case1: "Telefonunuzu açmadan ekran görüntülerinden QR kodlarını hızlı bir şekilde ayrıştırın", case2: "QR kodu görüntülerini kaydettikten sonra içeriği hızlı bir şekilde ayıklayın", case3: "Geliştirme sırasında oluşturulan QR kodlarını hızlı bir şekilde doğrulayın", case4: "Belge veya web sayfası ekran görüntülerinden QR kodu bilgilerini ayıklayın" },
  download: { ...enUS.download, title: "HEMEN İNDİRİN", text: "Platformunuzun en son sürümünü indirmek için GitHub Sürümler sayfasına gidin", latestVersion: "En son sürüm yükle" },
  footer: { ...enUS.footer, privacyPolicy: "Gizlilik Politikası", termsOfService: "Hizmet Maddeleri", refundPolicy: "İade Politikası", copyright: "© 2026- now ClipQR. ile üretilmiştir ❤️" },
  meta: { ...enUS.meta, title: "ClipQR - Hızlı QR Kod Tarayıcı", description: "ClipQR - Hızlı QR kod tarayıcı, platformlar arası masaüstü uygulaması, pano ve yerel görüntülerden QR kod içeriğini hızlı bir şekilde okuyun" },
}
