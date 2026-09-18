import enUS from './en-US'

export default {
  ...enUS,
  app: { ...enUS.app, eyebrow: "Utilitaire QR de bureau", title: "Décodez le moment.", titleAccent: "Allez, on continue d'avancer.", website: "Site web", inputLabel: "Choisir une entrée", dropHint: "ou faites glisser une image n'importe où", clipboardMeta: "Lire la dernière image", fileMeta: "Parcourir les images locales", working: "décodage d'image", resultLabel: "Résultat décodé", ready: "Terminé", copied: "Copié", copyResult: "Copier le résultat", footer: "Analyse rapide, privée, locale en premier QR", desc: "Faites glisser et déposez une image de code QR ou lisez-la dans le presse-papiers pour décoder" },
  notice: { ...enUS.notice, decoded: "Code QR décodé avec succès", noQr: "Aucun code QR trouvé dans cette image", failed: "Impossible de décoder cette entrée", copied: "Résultat copié dans le presse-papiers" },
  fileButton: { ...enUS.fileButton, selectFile: "Choisir Dossier", result: "Résultat d'", copied: "Copié", copy: "Copier", noQr: "Le code QR a été détecté", parseFailed: "Échec de l'analyse !", dialogFilter: "Images" },
  readPaste: { ...enUS.readPaste, readClipboard: "Lire le presse-papiers", result: "Résultat d'", copied: "Copié", copy: "Copier", failed: "Impossible de lire, aucune image dans le presse-papiers" },
  dragDrop: { ...enUS.dragDrop, dropToParse: "Relâcher pour analyser l'image" },
  appMain: { ...enUS.appMain, noQrFound: "Aucun code QR trouvé", result: "Résultat d'", copied: "Copié!", copy: "Copier" },
  tray: { ...enUS.tray, showWindow: "Afficher la fenêtre principale", readClipboard: "Lire le code QR du presse-papiers", quit: "Quitter complètement" },
}
