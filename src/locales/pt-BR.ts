import enUS from './en-US'

export default {
  ...enUS,
  app: { ...enUS.app, eyebrow: "Utilitário QR para desktop", title: "Decodifique o momento.", titleAccent: "Mantenha-se em moviment", website: "Sítios web", inputLabel: "Escolha uma entrada", dropHint: "ou arraste uma imagem para qualquer lugar", clipboardMeta: "Ler a imagem mais recente", fileMeta: "Procurar imagens locais", working: "A descodificar imagem...", resultLabel: "Resultado decodificado", ready: "Pronto", copied: "Copiado", copyResult: "Copiar o resultado", footer: "Análise QR rápida, privada e local", desc: "Arraste e solte uma imagem de código QR ou leia da área de transferência para decodificar" },
  notice: { ...enUS.notice, decoded: "Código QR decodificado com sucesso", noQr: "Nenhum código QR encontrado nesta imagem", failed: "Não foi possível decodificar esta entrada", copied: "Resultado copiado para a área de transferência" },
  fileButton: { ...enUS.fileButton, selectFile: "Selecionar ficheiro", result: "Resultado:", copied: "Copiado", copy: "Copiar", noQr: "Nenhum código QR detectado", parseFailed: "Falha na análise", dialogFilter: "Figuras" },
  readPaste: { ...enUS.readPaste, readClipboard: "Ler área de transferência", result: "Resultado:", copied: "Copiado", copy: "Copiar", failed: "Falha ao ler, nenhuma imagem na área de transferência" },
  dragDrop: { ...enUS.dragDrop, dropToParse: "Solte para analisar a imagem" },
  appMain: { ...enUS.appMain, noQrFound: "Nenhum código QR encontrado", result: "Resultado:", copied: "Copiado!", copy: "Copiar" },
  tray: { ...enUS.tray, showWindow: "Mostrar a Janela Principal", readClipboard: "Ler código QR da área de transferência", quit: "Sair completamente" },
}
