import enUS from './en-US'

export default {
  ...enUS,
  demo: { title: "デモ" },
  nav: { ...enUS.nav, github: "GitHub" },
  hero: { ...enUS.hero, subtitle: "クイックQRコードスキャナー", description: "Tauri + Vue 3で構築されたクロスプラットフォームデスクトップアプリ\\ nクリップボードとローカル画像からQRコードコンテンツをすばやく読み取る", downloadNow: "今すぐダウンロード", learnMore: "詳しく知る", appScreenshot: "ClipQRアプリのスクリーンショット", localFirst: "ローカルファースト・オープンソース・クロスプラットフォーム" },
  features: { ...enUS.features, title: "特徴", clipboardRead: "クリップボードのダイレクト読み取り", clipboardReadDesc: "ワンクリックでクリップボードから画像を直接読み取り、QRコードを解析", localFile: "ローカル ファイル", localFileDesc: "ローカル画像ファイルからのQRコードの解析をサポート", dragDrop: "ドラッグドロップ", dragDropDesc: "画像ファイルをウィンドウにドラッグして直接解析することをサポート", fastResponse: "迅速な対応。", fastResponseDesc: "Rustによる高性能解析、瞬時の結果", oneClickCopy: "ワンクリックコピー", oneClickCopyDesc: "クリックして解析結果をクリップボードにコピー", autoOpenLink: "リンクを自動で開く", autoOpenLinkDesc: "URLが検出されたときにブラウザを自動的に開く" },
  useCases: { ...enUS.useCases, title: "使用事例", case1: "スマートフォンを開かずに、スクリーンショットからQRコードをすばやく解析", case2: "QRコード画像を保存した後、コンテンツをすばやく抽出", case3: "開発中に生成されたQRコードをすばやく検証", case4: "文書またはウェブページのスクリーンショットからQRコード情報を抽出する" },
  download: { ...enUS.download, title: "今すぐダウンロード", text: "GitHubリリースページに移動して、プラットフォームの最新バージョンをダウンロードします", latestVersion: "％sアカウントからプラグインの最新バージョンをダウンロードできます。\n             現在のバージョンを無効にして削除した後、ダウンロードしたプラグインの最新バージョンをインストールします。" },
  footer: { ...enUS.footer, privacyPolicy: "プライバシーポリシー", termsOfService: "利用規約", refundPolicy: "返金ポリシー", copyright: "© 2026 -現在ClipQR. Made with ❤️" },
  meta: { ...enUS.meta, title: "ClipQR -クイックQRコードスキャナー", description: "ClipQR -クイックQRコードスキャナ、クロスプラットフォームデスクトップアプリ、クリップボードやローカル画像からQRコードコンテンツをすばやく読み取る" },
}
