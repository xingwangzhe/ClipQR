import enUS from './en-US'

export default {
  ...enUS,
  app: { ...enUS.app, eyebrow: "Masaüstü QR yardımcı programı", title: "Anı çöz.", titleAccent: "Harekete Devam", website: "Web sitesi", inputLabel: "Bir girdi seçin", dropHint: "veya bir resmi herhangi bir yere sürükleyin", clipboardMeta: "En son resmi oku", fileMeta: "Yerel resimlere göz atın", working: "Görüntü kodu çözülüyor...", resultLabel: "Kodu çözülmüş sonuç", ready: "Hazır", copied: "Kopyalandı", copyResult: "Sonucu kopyala", footer: "Hızlı, özel, yerel ilk QR ayrıştırma", desc: "Bir QR kodu görüntüsünü sürükleyip bırakın veya kodu çözmek için panodan okuyun" },
  notice: { ...enUS.notice, decoded: "QR kodu başarıyla çözüldü", noQr: "Bu resimde QR kodu bulunamadı", failed: "Bu girişin kodu çözülemedi", copied: "Sonuç panoya kopyalandı" },
  fileButton: { ...enUS.fileButton, selectFile: "Dosya Seç", result: "Sonuç :", copied: "Kopyalandı", copy: "Kopyala", noQr: "QR kodu algılanmadı", parseFailed: "Ayrıştırma başarısız", dialogFilter: "Resimler" },
  readPaste: { ...enUS.readPaste, readClipboard: "Panoyu Oku", result: "Sonuç :", copied: "Kopyalandı", copy: "Kopyala", failed: "Okunamadı, panoda resim yok" },
  dragDrop: { ...enUS.dragDrop, dropToParse: "Görüntüyü ayrıştırmak için bırakın" },
  appMain: { ...enUS.appMain, noQrFound: "QR kodu bulunamadı", result: "Sonuç :", copied: "Kopyalandı!", copy: "Kopyala" },
  tray: { ...enUS.tray, showWindow: "Ana Pencereyi Göster", readClipboard: "Pano QR Kodunu Oku", quit: "Tamamen Bırak" },
}
