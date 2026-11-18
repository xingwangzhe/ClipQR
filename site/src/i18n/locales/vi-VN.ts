import enUS from './en-US'

export default {
  ...enUS,
  demo: { ...enUS.demo, title: "Bản demo", description: enUS.demo.description },
  nav: { ...enUS.nav, github: "Github" },
  hero: { ...enUS.hero, subtitle: "Máy quét mã QR nhanh", description: "Ứng dụng máy tính để bàn đa nền tảng được xây dựng với Native Shell\\ nĐọc nhanh nội dung mã QR từ khay nhớ tạm và hình ảnh cục bộ", downloadNow: "Tải ngay", learnMore: "Tìm hiểu thêm", appScreenshot: "Ảnh chụp màn hình ứng dụng ClipQR", localFirst: "Đầu tiên tại địa phương · Nguồn mở · Đa nền tảng" },
  features: { ...enUS.features, title: "Tính năng", clipboardRead: "Đọc trực tiếp bảng tạm", clipboardReadDesc: "Đọc trực tiếp hình ảnh từ khay nhớ tạm và phân tích mã QR chỉ bằng một cú nhấp chuột", localFile: "Hồ sơ quốc gia", localFileDesc: "Hỗ trợ phân tích mã QR từ các tệp hình ảnh cục bộ", dragDrop: "Kéo & Thả", dragDropDesc: "Hỗ trợ kéo các tệp hình ảnh vào cửa sổ để phân tích cú pháp trực tiếp", fastResponse: "Giao diện sáng và tối", fastResponseDesc: "Chọn giao diện yêu thích với độ tương phản dễ nhìn.", oneClickCopy: "Truy cập từ khay hệ thống", oneClickCopyDesc: "Mở ClipQR, đọc clipboard hoặc xem thông tin ứng dụng từ menu khay.", autoOpenLink: "Optional link opening", autoOpenLinkDesc: "Review decoded links and open them with one click" },
  useCases: { ...enUS.useCases, title: "Các trường hợp sử dụng:", case1: "Nhanh chóng phân tích mã QR từ ảnh chụp màn hình mà không cần mở điện thoại", case2: "Nhanh chóng trích xuất nội dung sau khi lưu hình ảnh mã QR", case3: "Xác minh nhanh mã QR đã tạo trong quá trình phát triển", case4: "Trích xuất thông tin mã QR từ ảnh chụp màn hình tài liệu hoặc trang web" },
  download: { ...enUS.download, title: "Tải ngay", text: "Truy cập trang Bản phát hành GitHub để tải xuống phiên bản mới nhất cho nền tảng của bạn", latestVersion: "Tải xuống phiên bản mới nhất" },
  footer: { ...enUS.footer, privacyPolicy: "Chính sách quyền riêng tư", termsOfService: "Điều khoản dịch vụ", refundPolicy: "Chính sách Hoàn tiền", copyright: "© 2026-now ClipQR. Được làm bằng ❤️" },
  meta: { ...enUS.meta, title: "ClipQR - Máy quét mã QR nhanh", description: "ClipQR - Trình quét mã QR nhanh, ứng dụng máy tính để bàn đa nền tảng, đọc nhanh nội dung mã QR từ khay nhớ tạm và hình ảnh cục bộ" },
}
