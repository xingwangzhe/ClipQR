import enUS from './en-US'

export default {
  ...enUS,
  demo: { ...enUS.demo, title: "Demo", description: enUS.demo.description },
  nav: { ...enUS.nav, github: "GitHub" },
  hero: { ...enUS.hero, subtitle: "Scanner rapido per codici QR", description: "App desktop multipiattaforma costruita con Native Shell\\ nLeggi rapidamente il contenuto del codice QR dagli appunti e dalle immagini locali", downloadNow: "Scarica ora", learnMore: "Scopri di più", appScreenshot: "Screenshot dell'app ClipQR", localFirst: "Local-first · Open source · Multipiattaforma" },
  features: { ...enUS.features, title: "Caratteristiche", clipboardRead: "Lettura diretta appunti", clipboardReadDesc: "Leggi direttamente le immagini dagli appunti e analizza i codici QR con un clic", localFile: "Documento locale", localFileDesc: "Supporta l'analisi dei codici QR dai file di immagine locali", dragDrop: "Drag & Drop", dragDropDesc: "Supporta il trascinamento dei file di immagine nella finestra per l'analisi diretta", fastResponse: "Temi chiaro e scuro", fastResponseDesc: "Scegli l’aspetto che preferisci con un contrasto confortevole.", oneClickCopy: "Accesso dall’area di notifica", oneClickCopyDesc: "Apri ClipQR, leggi gli appunti o consulta le informazioni dal menu della tray.", autoOpenLink: "Optional link opening", autoOpenLinkDesc: "Review decoded links and open them with one click" },
  useCases: { ...enUS.useCases, title: "Casi d'uso", case1: "Analizza rapidamente i codici QR dagli screenshot senza aprire il telefono", case2: "Estrai rapidamente i contenuti dopo aver salvato le immagini dei codici QR", case3: "Verifica rapidamente i codici QR generati durante lo sviluppo", case4: "Estrai le informazioni sul codice QR dagli screenshot del documento o della pagina web" },
  download: { ...enUS.download, title: "Scarica ora", text: "Vai alla pagina Rilasci di GitHub per scaricare l'ultima versione per la tua piattaforma", latestVersion: "Scarica l’ultima versione" },
  footer: { ...enUS.footer, privacyPolicy: "Nella politica sulla protezione dei dati", termsOfService: "Termini di servizio", refundPolicy: "Politica sui rimborsi", copyright: "©2026-ora ClipQR. Realizzato con ❤️" },
  meta: { ...enUS.meta, title: "ClipQR - Scanner rapido per codici QR", description: "ClipQR - Scanner rapido di codici QR, app desktop multipiattaforma, lettura rapida del contenuto del codice QR dagli appunti e dalle immagini locali" },
}
