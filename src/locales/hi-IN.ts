import enUS from './en-US'

export default {
  ...enUS,
  app: { ...enUS.app, eyebrow: "डेस्कटॉप QR यूटिलिटी", title: "पल को डीकोड करें।", titleAccent: "चलते रहो.", website: "वेबसाइट", inputLabel: "एक इनपुट चुनें", dropHint: "या किसी इमेज को कहीं भी खींचें", clipboardMeta: "ताज़ा फ़ोटो पढ़ें", fileMeta: "स्थानीय फ़ोटो ब्राउज़ करें", working: "इमेज को डिकोड किया जा रहा है...", resultLabel: "डिकोड किया गया परिणाम", ready: "तैयार", copied: "कॉपी किया गया ", copyResult: "परिणाम कॉपी करें", footer: "तेज़, निजी, लोकल - फ़र्स्ट QR पार्सिंग", desc: "QR कोड इमेज खींचें और ड्रॉप करें या क्लिपबोर्ड से डिकोड करने के लिए पढ़ें" },
  notice: { ...enUS.notice, decoded: "QR कोड सफलतापूर्वक डिकोड किया गया", noQr: "इस फ़ोटो में कोई QR कोड नहीं मिला", failed: "इस इनपुट को डिकोड नहीं किया जा सका", copied: "परिणाम क्लिपबोर्ड पर कॉपी किया गया" },
  fileButton: { ...enUS.fileButton, selectFile: "फ़ाइल चुनें", result: "परिणाम:", copied: "कॉपी किया गया ", copy: "नाम पर्ची", noQr: "कोई QR कोड नहीं मिला", parseFailed: "पार्स विफल रहा", dialogFilter: "छवियाँ" },
  readPaste: { ...enUS.readPaste, readClipboard: "क्लिपबोर्ड पढ़ें", result: "परिणाम:", copied: "कॉपी किया गया ", copy: "नाम पर्ची", failed: "पढ़ने में विफल, क्लिपबोर्ड में कोई छवि नहीं" },
  dragDrop: { ...enUS.dragDrop, dropToParse: "इमेज को पार्स करने के लिए रिलीज़ करें" },
  appMain: { ...enUS.appMain, noQrFound: "कोई QR कोड नहीं मिला", result: "परिणाम:", copied: "कॉपी किया गया!", copy: "नाम पर्ची" },
  tray: { ...enUS.tray, showWindow: "मुख्य विंडो दिखाएँ", readClipboard: "क्लिपबोर्ड QR कोड पढ़ें", quit: "पूरी तरह से बाहर निकलें" },
}
