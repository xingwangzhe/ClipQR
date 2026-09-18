import enUS from './en-US'

export default {
  ...enUS,
  app: { ...enUS.app, eyebrow: "الأداة المساعدة QR لسطح المكتب", title: "فك شفرة اللحظة.", titleAccent: "واصلوا التقدم مع الطرد.", website: "الموقع الالكتروني:", inputLabel: "اختيار إدخال", dropHint: "أو اسحب صورة إلى أي مكان", clipboardMeta: "قراءة أحدث صورة", fileMeta: "استعراض الصور المحلية", working: "جاري فك تشفير الصورة...", resultLabel: "نتيجة فك التشفير", ready: "جاهز", copied: "تم النسخ", copyResult: "نسخ النتيجة", footer: "تحليل سريع، خاص، محلي - أول QR", desc: "اسحب وأفلت صورة رمز الاستجابة السريعة أو اقرأ من الحافظة لفك التشفير" },
  notice: { ...enUS.notice, decoded: "تم فك تشفير رمز الاستجابة السريعة (QR) بنجاح", noQr: "لم يتم العثور على رمز الاستجابة السريعة في هذه الصورة", failed: "تعذر فك تشفير هذا الإدخال", copied: "تم نسخ النتيجة إلى الحافظة" },
  fileButton: { ...enUS.fileButton, selectFile: "اختر ملفًا", result: "النتيجة:", copied: "تم النسخ", copy: "[ترجمة المصطلح: Copy]", noQr: "تم الكشف عن رمز الاستجابة السريعة", parseFailed: "فشل التحليل", dialogFilter: "الصور" },
  readPaste: { ...enUS.readPaste, readClipboard: "قراءة الحافظة", result: "النتيجة:", copied: "تم النسخ", copy: "[ترجمة المصطلح: Copy]", failed: "تعذر القراءة، لا توجد صورة في الحافظة" },
  dragDrop: { ...enUS.dragDrop, dropToParse: "تحرير لتحليل الصورة" },
  appMain: { ...enUS.appMain, noQrFound: "لم يتم العثور على رمز الاستجابة السريعة", result: "النتيجة:", copied: "تم النسخ!", copy: "[ترجمة المصطلح: Copy]" },
  tray: { ...enUS.tray, showWindow: "عرض النافذة الرئيسية", readClipboard: "قراءة رمز الاستجابة السريعة للحافظة", quit: "إنهاء بالكامل" },
}
