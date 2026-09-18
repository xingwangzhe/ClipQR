import enUS from './en-US'

export default {
  ...enUS,
  demo: { title: "Demonstração" },
  nav: { ...enUS.nav, github: "GitHub" },
  hero: { ...enUS.hero, subtitle: "Leitor Rápido de Código QR", description: "Aplicativo de desktop multiplataforma criado com Tauri + Vue 3\\ nLeia rapidamente o conteúdo do código QR da área de transferência e das imagens locais", downloadNow: "Descarregar agora", learnMore: "Saber Mais", appScreenshot: "Captura de ecrã da aplicação ClipQR", localFirst: "Local-first · Código aberto · Multiplataforma" },
  features: { ...enUS.features, title: "Características", clipboardRead: "Leitura Direta da Área de Transferência", clipboardReadDesc: "Leia diretamente as imagens da área de transferência e analise os códigos QR com um clique", localFile: "Local File", localFileDesc: "Suporte à análise de códigos QR de arquivos de imagem locais", dragDrop: "Arrastar e largar", dragDropDesc: "Suporte a arrastar arquivos de imagem para a janela para análise direta", fastResponse: "Tempo de Resposta Rápido", fastResponseDesc: "Análise de alto desempenho com Rust, resultados instantâneos", oneClickCopy: "Um clique", oneClickCopyDesc: "Clique para copiar os resultados da análise para a área de transferência", autoOpenLink: "Abrir link automaticamente", autoOpenLinkDesc: "Abrir automaticamente o navegador quando o URL for detectado" },
  useCases: { ...enUS.useCases, title: "Casos de Uso", case1: "Analise rapidamente os códigos QR das capturas de tela sem abrir o telefone", case2: "Extraia conteúdo rapidamente depois de salvar imagens de código QR", case3: "Verifique rapidamente os códigos QR gerados durante o desenvolvimento", case4: "Extrair informações de código QR de capturas de tela de documentos ou páginas da web" },
  download: { ...enUS.download, title: "Descarregar agora", text: "Aceda à página Lançamentos do GitHub para transferir a versão mais recente para a sua plataforma", latestVersion: "Descarregar a última versão" },
  footer: { ...enUS.footer, privacyPolicy: "Política de privacidade", termsOfService: "Termos de Serviço", refundPolicy: "Política de Reembolso", copyright: "©2026-agora ClipQR. Feito com ❤️" },
  meta: { ...enUS.meta, title: "ClipQR - Leitor Rápido de Código QR", description: "ClipQR - Leitor rápido de código QR, aplicativo de desktop multiplataforma, leitura rápida de conteúdo de código QR da área de transferência e imagens locais" },
}
