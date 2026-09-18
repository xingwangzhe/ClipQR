import enUS from './en-US'

export default {
  ...enUS,
  demo: { title: "示範", description: enUS.demo.description },
  nav: { ...enUS.nav, github: "GitHub" },
  hero: { ...enUS.hero, subtitle: "快速二維碼掃描器", description: "使用Tauri + Vue 3構建的跨平臺桌面應用程序\\ n從剪貼板和本地圖像快速讀取QR碼內容", downloadNow: "立即下載", learnMore: "了解更多", appScreenshot: "ClipQR應用程式螢幕擷取畫面", localFirst: "本地優先·開源·跨平臺" },
  features: { ...enUS.features, title: "特色Features", clipboardRead: "剪貼簿直接讀取", clipboardReadDesc: "只需點擊一下，即可直接從剪貼簿讀取圖像並解析QR碼", localFile: "本機檔案", localFileDesc: "支援從本機圖片檔案解析QR碼", dragDrop: "拖放", dragDropDesc: "支援將影像檔案拖曳至視窗以進行直接剖析", fastResponse: "fast response 快速回應", fastResponseDesc: "使用Rust進行高效能剖析，即時產生結果", oneClickCopy: "一鍵複製", oneClickCopyDesc: "按一下以將剖析結果複製到剪貼簿", autoOpenLink: "自動開啟連結", autoOpenLinkDesc: "偵測到網址時自動開啟瀏覽器" },
  useCases: { ...enUS.useCases, title: "使用案例", case1: "無需打開手機即可快速解析螢幕截圖中的QR碼", case2: "儲存二維碼圖片後快速擷取內容", case3: "在開發期間快速驗證生成的QR碼", case4: "從文件或網頁截圖中提取QR碼資訊" },
  download: { ...enUS.download, title: "立即下載", text: "前往GitHub版本頁面，下載適用於您平臺的最新版本", latestVersion: "下載最新版本" },
  footer: { ...enUS.footer, privacyPolicy: "隱私政策", termsOfService: "服務條款", refundPolicy: "退貨條款", copyright: "© 2026-現在ClipQR。由 ❤️" },
  meta: { ...enUS.meta, title: "ClipQR -快速QR碼掃描器", description: "ClipQR -快速QR碼掃描器，跨平臺桌面應用程式，從剪貼簿和本地圖像快速讀取QR碼內容" },
}
