import enUS from './en-US'

export default {
  ...enUS,
  app: { ...enUS.app, eyebrow: "Utilità desktop QR", title: "Decodifica il momento.", titleAccent: "Non fermatevi.", website: "Indirizzo Internet", inputLabel: "Scegli un input", dropHint: "o trascina un'immagine ovunque", clipboardMeta: "Leggi l'ultima immagine", fileMeta: "Sfoglia le immagini locali", working: "Decodifica immagine in corso...", resultLabel: "Risultato decodificato", ready: "Pronto", copied: "Copiati", copyResult: "Copia risultato", footer: "Analisi QR rapida, privata e locale", desc: "Trascina e rilascia un'immagine del codice QR o leggi dagli appunti per decodificarla" },
  notice: { ...enUS.notice, decoded: "Codice QR decodificato con successo", noQr: "Nessun codice QR trovato in questa immagine", failed: "Impossibile decodificare questo input", copied: "Risultato copiato negli appunti" },
  fileButton: { ...enUS.fileButton, selectFile: "Seleziona file", result: "Risultato:", copied: "Copiati", copy: "Copia", noQr: "Nessun codice QR rilevato", parseFailed: "Parse fallito!", dialogFilter: "Immagini" },
  readPaste: { ...enUS.readPaste, readClipboard: "Leggi gli Appunti", result: "Risultato:", copied: "Copiati", copy: "Copia", failed: "Impossibile leggere, nessuna immagine negli appunti" },
  dragDrop: { ...enUS.dragDrop, dropToParse: "Rilascia per analizzare l'immagine" },
  appMain: { ...enUS.appMain, noQrFound: "Nessun Codice QR trovato", result: "Risultato:", copied: "Copiato!", copy: "Copia" },
  tray: { ...enUS.tray, showWindow: "Mostra la finestra principale", readClipboard: "Leggi il codice QR degli appunti", quit: "Abbandona completamente" },
}
