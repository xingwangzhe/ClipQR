import enUS from './en-US'

export default {
  ...enUS,
  app: { ...enUS.app, eyebrow: "Утилита QR для настольных ПК", title: "Расшифруйте момент.", titleAccent: "Продолжайте двигаться.", website: "Сайт", inputLabel: "Выберите ввод", dropHint: "или перетащите изображение в любое место", clipboardMeta: "Читать последнее изображение", fileMeta: "Просмотр локальных изображений", working: "Декодирование изображения...", resultLabel: "Расшифрованный результат", ready: "Готово", copied: "Скопировано", copyResult: "Копировать Результат", footer: "Быстрый, приватный, локальный QR-анализ", desc: "Перетащите изображение QR-кода или прочитайте из буфера обмена для декодирования" },
  notice: { ...enUS.notice, decoded: "QR-код успешно декодирован", noQr: "На этом изображении не найден QR-код", failed: "Не удалось декодировать этот вход", copied: "Результат скопирован в буфер обмена" },
  fileButton: { ...enUS.fileButton, selectFile: "Выберите файл", result: "Результат:", copied: "Скопировано", copy: "Скопировать", noQr: "QR-код не обнаружен", parseFailed: "Ошибка парсинга XML", dialogFilter: "Изображения" },
  readPaste: { ...enUS.readPaste, readClipboard: "Чтение буфера обмена", result: "Результат:", copied: "Скопировано", copy: "Скопировать", failed: "Не удалось прочитать, нет изображения в буфере обмена" },
  dragDrop: { ...enUS.dragDrop, dropToParse: "Отпустите, чтобы проанализировать изображение" },
  appMain: { ...enUS.appMain, noQrFound: "QR-код не найден.", result: "Результат:", copied: "Скопировано!", copy: "Скопировать" },
  tray: { ...enUS.tray, showWindow: "Показать главное окно", readClipboard: "Считать QR-код буфера обмена", quit: "Выйти полностью" },
}
