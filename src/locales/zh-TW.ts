import enUS from './en-US'

export default {
  ...enUS,
  app: { ...enUS.app, eyebrow: "桌面QR公用程式", title: "解碼這一刻。", titleAccent: "繼續前進。", website: "Website", inputLabel: "選擇一個輸入項目", dropHint: "或將圖片拖曳到任何位置", clipboardMeta: "閱讀最新圖片", fileMeta: "瀏覽本地圖片", working: "正在解碼影像…", resultLabel: "解碼結果", ready: "準備就緒", copied: "從聯盟專業腳本複製聯盟使用者和存儲的推薦信。在此過程中，您可以將特定的 UAP 排名分配給新複製的聯盟使用者。", copyResult: "複製結果", footer: "快速、私密、本地優先的QR解析", desc: "拖放QR碼圖片或從剪貼簿讀取以解碼" },
  notice: { ...enUS.notice, decoded: "QR碼解碼成功", noQr: "此圖片中找不到QR碼", failed: "無法解碼此輸入", copied: "結果已複製到剪貼簿" },
  fileButton: { ...enUS.fileButton, selectFile: "選取檔案", result: "結果 :", copied: "從聯盟專業腳本複製聯盟使用者和存儲的推薦信。在此過程中，您可以將特定的 UAP 排名分配給新複製的聯盟使用者。", copy: "複製", noQr: "未偵測到QR碼", parseFailed: "解析失敗", dialogFilter: "图片" },
  readPaste: { ...enUS.readPaste, readClipboard: "讀取剪貼簿", result: "結果 :", copied: "從聯盟專業腳本複製聯盟使用者和存儲的推薦信。在此過程中，您可以將特定的 UAP 排名分配給新複製的聯盟使用者。", copy: "複製", failed: "讀取失敗，剪貼簿中沒有圖片" },
  dragDrop: { ...enUS.dragDrop, dropToParse: "釋放以解析影像" },
  appMain: { ...enUS.appMain, noQrFound: "未找到程式碼。", result: "結果 :", copied: "已複製！", copy: "複製" },
  tray: { ...enUS.tray, showWindow: "主視窗", readClipboard: "讀取剪貼簿QR碼", quit: "完全退出" },
}
