import enUS from './en-US'

export default {
  ...enUS,
  app: { ...enUS.app, eyebrow: "데스크톱 QR 유틸리티", title: "순간을 디코딩하세요.", titleAccent: "계속 움직이세요.", website: "웹사이트", inputLabel: "입력 선택", dropHint: "또는 어디로든 이미지를 드래그하세요.", clipboardMeta: "최신 이미지 읽기", fileMeta: "로컬 이미지 찾아보기", working: "이미지 디코딩 중...", resultLabel: "디코딩된 결과", ready: "준비", copied: "복사됨", copyResult: "결과 복사", footer: "신속한, 비공개, 로컬 우선 QR 구문 분석", desc: "QR 코드 이미지를 드래그 앤 드롭하거나 클립보드에서 읽어 디코딩" },
  notice: { ...enUS.notice, decoded: "QR 코드가 성공적으로 디코딩되었습니다", noQr: "이 이미지에서 QR 코드를 찾을 수 없습니다", failed: "이 입력을 디코딩할 수 없습니다", copied: "결과가 클립보드에 복사되었습니다" },
  fileButton: { ...enUS.fileButton, selectFile: "파일 선택하기", result: "결과:", copied: "복사됨", copy: "복사", noQr: "QR 코드가 감지되지 않음", parseFailed: "구문 분석 실패", dialogFilter: "이미지" },
  readPaste: { ...enUS.readPaste, readClipboard: "클립보드 읽기", result: "결과:", copied: "복사됨", copy: "복사", failed: "읽기 실패, 클립보드에 이미지 없음" },
  dragDrop: { ...enUS.dragDrop, dropToParse: "이미지를 구문 분석하려면 놓으세요." },
  appMain: { ...enUS.appMain, noQrFound: "QR 코드를 찾을 수 없습니다", result: "결과:", copied: "복사 완료", copy: "복사" },
  tray: { ...enUS.tray, showWindow: "주 창 보이기", readClipboard: "클립보드 QR 코드 읽기", quit: "완전히 나가기" },
}
