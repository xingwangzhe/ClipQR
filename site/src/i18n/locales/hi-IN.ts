import enUS from './en-US'

export default {
  ...enUS,
  demo: { title: "डेमो", description: enUS.demo.description },
  nav: { ...enUS.nav, github: "GitHub" },
  hero: { ...enUS.hero, subtitle: "क्विक QR कोड स्कैनर", description: "Tauri + Vue 3 के साथ बनाया गया क्रॉस - प्लेटफ़ॉर्म डेस्कटॉप ऐप\\ nक्लिपबोर्ड और स्थानीय छवियों से QR कोड सामग्री को तुरंत पढ़ें", downloadNow: "डाक डाउनलोड करें (D) @ info: tooltip", learnMore: "और जानें", appScreenshot: "क्लिपक्यूआर ऐप स्क्रीनशॉट", localFirst: "लोकल - फर्स्ट · ओपन सोर्स · क्रॉस - प्लेटफ़ॉर्म" },
  features: { ...enUS.features, title: "विशेषताएँ", clipboardRead: "क्लिपबोर्ड डायरेक्ट रीड", clipboardReadDesc: "क्लिपबोर्ड से सीधे इमेज पढ़ें और एक क्लिक में QR कोड पार्स करें", localFile: "सभी फ़ाइलें", localFileDesc: "स्थानीय इमेज फ़ाइलों से क्यूआर कोड पार्स करने में मदद करें", dragDrop: "ड्रैग एंड ड्रॉप", dragDropDesc: "डायरेक्ट पार्सिंग के लिए इमेज फ़ाइलों को खिड़की पर खींचने का समर्थन करें", fastResponse: "तेज़ प्रतिक्रिया", fastResponseDesc: "जंग के साथ उच्च - प्रदर्शन पार्सिंग, तत्काल परिणाम", oneClickCopy: "एक - क्लिक कॉपी", oneClickCopyDesc: "क्लिपबोर्ड पर पार्सिंग परिणामों को कॉपी करने के लिए क्लिक करें", autoOpenLink: "ऑटो ओपन लिंक", autoOpenLinkDesc: "URL का पता चलने पर ब्राउज़र को स्वचालित रूप से खोलें" },
  useCases: { ...enUS.useCases, title: "यूज़ केसेस।", case1: "अपना फ़ोन खोले बिना स्क्रीनशॉट से QR कोड को तुरंत पार्स करें", case2: "QR कोड छवियों को सहेजने के बाद जल्दी से सामग्री निकालें", case3: "डेवलपमेंट के दौरान जेनरेट किए गए QR कोड को तुरंत वेरिफ़ाई करें", case4: "डॉक्यूमेंट या वेबपेज स्क्रीनशॉट से QR कोड की जानकारी निकालें" },
  download: { ...enUS.download, title: "अभी डाउनलोड करें", text: "अपने प्लैटफ़ॉर्म का सबसे नया वर्ज़न डाउनलोड करने के लिए GitHub रिलीज़ पेज पर जाएँ", latestVersion: "नवीनतम संस्करण डाउनलोड करें" },
  footer: { ...enUS.footer, privacyPolicy: "गोपनियता नीति", termsOfService: "सेवा की शर्तें", refundPolicy: "धनवापसी नीति", copyright: "© 2026 - अब क्लिपक्यूआर। के साथ बनाया गया ❤️" },
  meta: { ...enUS.meta, title: "क्लिपक्यूआर - क्विक क्यूआर कोड स्कैनर", description: "क्लिपक्यूआर - त्वरित क्यूआर कोड स्कैनर, क्रॉस - प्लेटफ़ॉर्म डेस्कटॉप ऐप, क्लिपबोर्ड और स्थानीय छवियों से क्यूआर कोड सामग्री को जल्दी से पढ़ें" },
}
