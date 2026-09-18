import enUS from './en-US'

export default {
  ...enUS,
  demo: { title: "عرض توضيحي", description: enUS.demo.description },
  nav: { ...enUS.nav, github: "GitHub" },
  hero: { ...enUS.hero, subtitle: "ماسح ضوئي سريع لرمز الاستجابة السريعة", description: "تطبيق سطح مكتب متعدد المنصات تم إنشاؤه باستخدام Tauri + Vue 3\\ nقراءة محتوى رمز الاستجابة السريعة بسرعة من الحافظة والصور المحلية", downloadNow: "حمل الآن", learnMore: "اعرف المزيد عن المزايا", appScreenshot: "لقطة شاشة تطبيق ClipQR", localFirst: "Local - first · Open source · Cross - platform" },
  features: { ...enUS.features, title: "السمات", clipboardRead: "قراءة مباشرة في الحافظة", clipboardReadDesc: "قراءة الصور مباشرة من الحافظة وتحليل رموز الاستجابة السريعة بنقرة واحدة", localFile: "ملف محلي", localFileDesc: "دعم تحليل رموز الاستجابة السريعة من ملفات الصور المحلية", dragDrop: "السحب والإفلات", dragDropDesc: "دعم سحب ملفات الصور إلى النافذة للتحليل المباشر", fastResponse: "سريع الاستجابة", fastResponseDesc: "تحليل عالي الأداء مع الصدأ، نتائج فورية", oneClickCopy: "نسخ بنقرة واحدة", oneClickCopyDesc: "انقر لنسخ نتائج التحليل إلى الحافظة", autoOpenLink: "رابط الفتح التلقائي", autoOpenLinkDesc: "فتح المتصفح تلقائيًا عند اكتشاف عنوان URL" },
  useCases: { ...enUS.useCases, title: "أمثلة تطبيقية", case1: "قم بتحليل رموز الاستجابة السريعة (QR) بسرعة من لقطات الشاشة دون فتح هاتفك", case2: "استخرج المحتوى بسرعة بعد حفظ صور رمز الاستجابة السريعة", case3: "تحقق بسرعة من رموز الاستجابة السريعة التي تم إنشاؤها أثناء التطوير", case4: "استخراج معلومات رمز الاستجابة السريعة من لقطات شاشة المستند أو صفحة الويب" },
  download: { ...enUS.download, title: "نزّل الآن", text: "انتقل إلى صفحة إصدارات GitHub لتنزيل أحدث إصدار لمنصتك", latestVersion: "تحميل أحدث إصدار" },
  footer: { ...enUS.footer, privacyPolicy: "سياسة الخصوصية", termsOfService: "شروط الخدمة", refundPolicy: "سياسة الاسترداد", copyright: "© 2026 - الآن ClipQR. مصنوع من ❤️" },
  meta: { ...enUS.meta, title: "ClipQR - ماسح رمز الاستجابة السريعة", description: "ClipQR - ماسح ضوئي سريع لرمز الاستجابة السريعة، تطبيق سطح مكتب متعدد المنصات، يقرأ بسرعة محتوى رمز الاستجابة السريعة من الحافظة والصور المحلية" },
}
