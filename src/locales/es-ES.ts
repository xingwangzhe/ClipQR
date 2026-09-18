import enUS from './en-US'

export default {
  ...enUS,
  app: { ...enUS.app, eyebrow: "Utilidad QR de escritorio", title: "Decodifica el momento.", titleAccent: "Mantenlos en movimiento. ", website: "Sitio web", inputLabel: "Elige una entrada", dropHint: "o arrastrar una imagen a cualquier parte", clipboardMeta: "Leer la última imagen", fileMeta: "Buscar imágenes locales", working: "Decodificando imagen...", resultLabel: "Resultado decodificado", ready: "Listo", copied: "Copiado", copyResult: "Copiar el resultado", footer: "Análisis QR rápido, privado y local", desc: "Arrastra y suelta una imagen de código QR o léela desde el portapapeles para decodificarla" },
  notice: { ...enUS.notice, decoded: "Código correctamente decodificado.", noQr: "No se ha encontrado ningún código QR en esta imagen", failed: "No se ha podido decodificar esta entrada", copied: "Resultado copiado al portapapeles" },
  fileButton: { ...enUS.fileButton, selectFile: "Seleccionar archivo", result: "Resultado:", copied: "Copiado", copy: "Copy", noQr: "Código QR detectado", parseFailed: "Error al analizar", dialogFilter: "Imágenes" },
  readPaste: { ...enUS.readPaste, readClipboard: "Leer desde el portapapeles", result: "Resultado:", copied: "Copiado", copy: "Copy", failed: "No se ha podido leer, no hay imagen en el portapapeles" },
  dragDrop: { ...enUS.dragDrop, dropToParse: "Suelte para analizar la imagen" },
  appMain: { ...enUS.appMain, noQrFound: "Ningún codigo encontrado.", result: "Resultado:", copied: "¡Copiado!", copy: "Copy" },
  tray: { ...enUS.tray, showWindow: "Mostrar ventana principal", readClipboard: "Leer el código QR del portapapeles", quit: "Salir por completo" },
}
