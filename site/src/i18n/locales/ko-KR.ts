import enUS from './en-US'

export default {
  ...enUS,
  demo: { title: "데모", description: enUS.demo.description },
  nav: { ...enUS.nav, github: "GitHub" },
  hero: { ...enUS.hero, subtitle: "빠른 QR 코드 스캐너", description: "Tauri + VUE 3으로 제작된 크로스 플랫폼 데스크톱 앱\\ n클립보드와 로컬 이미지에서 QR 코드 콘텐츠를 빠르게 읽기", downloadNow: "Download Now", learnMore: "자세히 알아보기", appScreenshot: "ClipQR 앱 스크린샷", localFirst: "로컬 우선 · 오픈 소스 · 크로스 플랫폼" },
  features: { ...enUS.features, title: "기능", clipboardRead: "클립보드 직접 읽기", clipboardReadDesc: "클릭 한 번으로 클립보드에서 이미지를 직접 읽고 QR 코드를 구문 분석", localFile: "로컬 파일", localFileDesc: "로컬 이미지 파일에서 QR 코드 구문 분석 지원", dragDrop: "끌어서 놓기", dragDropDesc: "직접 구문 분석을 위해 이미지 파일을 창으로 드래그 지원", fastResponse: "신속한 응답", fastResponseDesc: "Rust를 사용한 고성능 파싱, 즉각적인 결과", oneClickCopy: "원클릭 복사", oneClickCopyDesc: "클립보드에 구문 분석 결과를 복사하려면 클릭하십시오", autoOpenLink: "링크 자동 열기", autoOpenLinkDesc: "URL이 감지되면 브라우저가 자동으로 열립니다" },
  useCases: { ...enUS.useCases, title: "사용 사례", case1: "휴대폰을 열지 않고도 스크린샷에서 QR 코드를 빠르게 구문 분석할 수 있습니다.", case2: "QR 코드 이미지 저장 후 빠르게 콘텐츠 추출", case3: "개발 중 생성된 QR 코드 신속하게 확인", case4: "문서 또는 웹페이지 스크린샷에서 QR 코드 정보 추출" },
  download: { ...enUS.download, title: "Download Now", text: "GitHub 릴리스 페이지로 이동하여 플랫폼에 맞는 최신 버전을 다운로드하세요.", latestVersion: "수동으로 최신 버전 다운로드" },
  footer: { ...enUS.footer, privacyPolicy: "개인 정보 보호 정책", termsOfService: "서비스 약관", refundPolicy: "환불정책", copyright: "© 2026- now ClipQR. Made with ❤️" },
  meta: { ...enUS.meta, title: "ClipQR - 빠른 QR 코드 스캐너", description: "ClipQR - 빠른 QR 코드 스캐너, 크로스 플랫폼 데스크톱 앱, 클립보드 및 로컬 이미지에서 QR 코드 콘텐츠 읽기" },
}
