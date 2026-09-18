import enUS from './en-US'

export default {
  ...enUS,
  app: { ...enUS.app, eyebrow: "デスクトップQRユーティリティ", title: "瞬間を解読する。", titleAccent: "突き進め", website: "ウェブサイト", inputLabel: "入力を選択してください", dropHint: "または画像を任意の場所にドラッグして", clipboardMeta: "最新の画像を読む", fileMeta: "ローカル画像を閲覧する", working: "画像をデコードしています…", resultLabel: "デコードされた結果", ready: "準備完了", copied: "コピーしました", copyResult: "結果をコピーします", footer: "高速、プライベート、ローカルファーストのQR解析", desc: "QRコード画像をドラッグ&ドロップするか、クリップボードから読み取ってデコードします" },
  notice: { ...enUS.notice, decoded: "QRコードが正常にデコードされました", noQr: "この画像にQRコードが見つかりません", failed: "この入力をデコードできませんでした", copied: "結果をクリップボードにコピーしました" },
  fileButton: { ...enUS.fileButton, selectFile: "ファイルを選択", result: "結果：", copied: "コピーしました", copy: "コピー", noQr: "QRコードが検出されませんでした", parseFailed: "解析に失敗しました", dialogFilter: "画像" },
  readPaste: { ...enUS.readPaste, readClipboard: "クリップボードを読む", result: "結果：", copied: "コピーしました", copy: "コピー", failed: "読み取りに失敗しました。クリップボードに画像がありません" },
  dragDrop: { ...enUS.dragDrop, dropToParse: "画像を解析するにはリリースしてください" },
  appMain: { ...enUS.appMain, noQrFound: "QRコードが見つかりません", result: "結果：", copied: "コピーしました !", copy: "コピー" },
  tray: { ...enUS.tray, showWindow: "メインウィンドウを表示", readClipboard: "クリップボードのQRコードを読む", quit: "完全に終了" },
}
