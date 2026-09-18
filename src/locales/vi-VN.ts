import enUS from './en-US'

export default {
  ...enUS,
  app: { ...enUS.app, eyebrow: "Tiện ích QR trên máy tính để bàn", title: "Giải mã thời điểm.", titleAccent: "Làm nhanh lên. Nhanh lên!", website: "Trang web", inputLabel: "Chọn một đầu vào", dropHint: "hoặc kéo một hình ảnh bất cứ nơi nào", clipboardMeta: "Đọc hình ảnh mới nhất", fileMeta: "Duyệt tìm hình ảnh địa phương", working: "Đang giải mã hình ảnh…", resultLabel: "Kết quả đã giải mã", ready: "Sẵn sàng", copied: "Đã sao chép", copyResult: "Sao chép kết quả", footer: "Phân tích cú pháp QR nhanh, riêng tư, đầu tiên tại địa phương", desc: "Kéo và thả hình ảnh mã QR hoặc đọc từ khay nhớ tạm để giải mã" },
  notice: { ...enUS.notice, decoded: "Mã QR được giải mã thành công", noQr: "Không tìm thấy mã QR trong hình ảnh này", failed: "Không thể giải mã đầu vào này", copied: "Đã sao chép kết quả vào khay nhớ tạm" },
  fileButton: { ...enUS.fileButton, selectFile: "Chọn tệp", result: "Kết quả:", copied: "Đã sao chép", copy: "Sao chép", noQr: "Không phát hiện thấy mã QR", parseFailed: "Không thể phân tích cú pháp.", dialogFilter: "Hình ảnh" },
  readPaste: { ...enUS.readPaste, readClipboard: "Đọc bảng tạm", result: "Kết quả:", copied: "Đã sao chép", copy: "Sao chép", failed: "Không thể đọc, không có hình ảnh trong khay nhớ tạm" },
  dragDrop: { ...enUS.dragDrop, dropToParse: "Nhả để phân tích cú pháp hình ảnh" },
  appMain: { ...enUS.appMain, noQrFound: "Không tìm thấy mã QR.", result: "Kết quả:", copied: "Đã sao chép!", copy: "Sao chép" },
  tray: { ...enUS.tray, showWindow: "Hiện cửa sổ chính", readClipboard: "Đọc mã QR của bảng tạm", quit: "Thoát hoàn toàn" },
}
