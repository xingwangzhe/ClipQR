import enUS from './en-US'

export default {
  ...enUS,
  demo: { ...enUS.demo, title: "Demo", description: enUS.demo.description },
  nav: { ...enUS.nav, github: "GitHub" },
  hero: { ...enUS.hero, subtitle: "Schneller QR-Code-Scanner", description: "Plattformübergreifende Desktop-App mit Native Shell\\ nSchnellesLesen von QR-Code-Inhalten aus der Zwischenablage und lokalen Bildern", downloadNow: "Jetzt herunterladen", learnMore: "Mehr erfahren", appScreenshot: "Screenshot der ClipQR-App", localFirst: "Lokal zuerst · Open Source · Plattformübergreifend" },
  features: { ...enUS.features, title: "MERKMALE ", clipboardRead: "Direktes Lesen der Zwischenablage", clipboardReadDesc: "Bilder direkt aus der Zwischenablage lesen und QR-Codes mit einem Klick analysieren", localFile: "Lokale Datei", localFileDesc: "Unterstützt das Parsen von QR-Codes aus lokalen Bilddateien", dragDrop: "Drag & Drop", dragDropDesc: "Unterstützt das Ziehen von Bilddateien in das Fenster zum direkten Parsen", fastResponse: "Helles und dunkles Design", fastResponseDesc: "Wähle dein Design mit klarem Kontrast.", oneClickCopy: "Symbol im Infobereich", oneClickCopyDesc: "Öffne ClipQR, lies die Zwischenablage oder rufe App-Infos über das Tray-Menü auf.", autoOpenLink: "Link automatisch öffnen", autoOpenLinkDesc: "Browser automatisch öffnen, wenn URL erkannt wird" },
  useCases: { ...enUS.useCases, title: "Anwendungsfälle", case1: "Analysieren Sie schnell QR-Codes von Screenshots, ohne Ihr Telefon zu öffnen", case2: "Schnelles Extrahieren von Inhalten nach dem Speichern von QR-Code-Bildern", case3: "Schnelle Überprüfung der generierten QR-Codes während der Entwicklung", case4: "Extrahieren Sie QR-Code-Informationen aus Dokument- oder Webseiten-Screenshots" },
  download: { ...enUS.download, title: "Jetzt herunterladen", text: "Gehen Sie zur GitHub Releases-Seite, um die neueste Version für Ihre Plattform herunterzuladen", latestVersion: "Neueste Version wird heruntergeladen." },
  footer: { ...enUS.footer, privacyPolicy: "Datenschutzrichtlinie", termsOfService: "Nutzungsbedingungen", refundPolicy: "Rückgaberecht", copyright: "©2026-jetzt ClipQR. Hergestellt mit ❤️" },
  meta: { ...enUS.meta, title: "ClipQR - Schneller QR-Code-Scanner", description: "ClipQR - Schneller QR-Code-Scanner, plattformübergreifende Desktop-App, schnelles Lesen von QR-Code-Inhalten aus der Zwischenablage und lokalen Bildern" },
}
