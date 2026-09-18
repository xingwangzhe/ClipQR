import enUS from './en-US'

export default {
  ...enUS,
  demo: { ...enUS.demo, title: "Демо", description: enUS.demo.description },
  nav: { ...enUS.nav, github: "GitHub" },
  hero: { ...enUS.hero, subtitle: "Быстрый сканер QR-кода", description: "Кроссплатформенное настольное приложение, созданное с помощью Tauri + Vue 3\\nБыстро читайте содержимое QR-кода из буфера обмена и локальных изображений", downloadNow: "Загрузить сейчас", learnMore: "Подробнее", appScreenshot: "Скриншот приложения ClipQR", localFirst: "Local-first · Open source · Кроссплатформенность" },
  features: { ...enUS.features, title: "Возможности", clipboardRead: "Прямое чтение из буфера обмена", clipboardReadDesc: "Непосредственное чтение изображений из буфера обмена и разбор QR-кодов одним щелчком мыши", localFile: "Локальный файл", localFileDesc: "Поддержка анализа QR-кодов из локальных файлов изображений", dragDrop: "Перетащите", dragDropDesc: "Поддержка перетаскивания файлов изображений в окно для прямого анализа", fastResponse: "Экстренное реагирование", fastResponseDesc: "Высокопроизводительный парсинг с Rust, мгновенные результаты", oneClickCopy: "Один щелчок", oneClickCopyDesc: "Нажмите, чтобы скопировать результаты анализа в буфер обмена", autoOpenLink: "Автоматически открывать ссылку", autoOpenLinkDesc: "Автоматически открывать браузер при обнаружении URL-адреса" },
  useCases: { ...enUS.useCases, title: "Варианты использования", case1: "Быстро разбирайте QR-коды со скриншотов, не открывая телефон", case2: "Быстрое извлечение содержимого после сохранения изображений QR-кода", case3: "Быстрая проверка сгенерированных QR-кодов во время разработки", case4: "Извлечение информации о QR-коде из снимков экрана документа или веб-страницы" },
  download: { ...enUS.download, title: "Загрузить сейчас", text: "Перейдите на страницу GitHub Releases, чтобы загрузить последнюю версию для своей платформы", latestVersion: "Скачайте последнюю версию" },
  footer: { ...enUS.footer, privacyPolicy: "Политика конфиденциальности", termsOfService: "Пользовательское соглашение Telegram", refundPolicy: "Политика возврата средств", copyright: "©2026-now ClipQR. Сделано с ❤️" },
  meta: { ...enUS.meta, title: "ClipQR - быстрый сканер QR-кода", description: "ClipQR - быстрый сканер QR-кода, кроссплатформенное настольное приложение, быстрое чтение содержимого QR-кода из буфера обмена и локальных изображений" },
}
