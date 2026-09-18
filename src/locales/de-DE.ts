import enUS from './en-US'

export default {
  ...enUS,
  app: { ...enUS.app, eyebrow: "Desktop QR-Dienstprogramm", title: "Entschlüsseln Sie den Moment.", titleAccent: "Weitermachen", website: "Webseite", inputLabel: "Wählen Sie eine Eingabe", dropHint: "oder ziehen Sie ein Bild an eine beliebige Stelle", clipboardMeta: "Aktuelles Bild lesen", fileMeta: "Lokale Bilder durchsuchen", working: "Bild wird dekodiert...", resultLabel: "Decodiertes Ergebnis", ready: "Fertig", copied: "Kopiert", copyResult: "Ergebnis kopieren", footer: "Schnelles, privates, lokal erstes QR-Parsing", desc: "Ziehen Sie ein QR-Code-Bild per Drag & Drop oder lesen Sie es aus der Zwischenablage, um es zu dekodieren" },
  notice: { ...enUS.notice, decoded: "QR-Code erfolgreich dekodiert", noQr: "Kein QR-Code in diesem Bild gefunden", failed: "Diese Eingabe konnte nicht decodiert werden", copied: "Ergebnis in Zwischenablage kopiert" },
  fileButton: { ...enUS.fileButton, selectFile: "Datei auswählen", result: "Ergebnis:", copied: "Kopiert", copy: "Ausfertigung", noQr: "QR-Code erkannt", parseFailed: "Parse fehlgeschlagen", dialogFilter: "Bilder" },
  readPaste: { ...enUS.readPaste, readClipboard: "Zwischenablage lesen", result: "Ergebnis:", copied: "Kopiert", copy: "Ausfertigung", failed: "Lesen fehlgeschlagen, kein Bild in der Zwischenablage" },
  dragDrop: { ...enUS.dragDrop, dropToParse: "Zum Analysieren des Bildes freigeben" },
  appMain: { ...enUS.appMain, noQrFound: "Kein QR-Code gefunden.", result: "Ergebnis:", copied: "Kopiert!", copy: "Ausfertigung" },
  tray: { ...enUS.tray, showWindow: "Hauptfenster anzeigen", readClipboard: "QR-Code der Zwischenablage lesen", quit: "Vollständig beenden" },
}
