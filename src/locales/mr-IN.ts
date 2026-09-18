import enUS from './en-US'

export default {
  ...enUS,
  app: { ...enUS.app, eyebrow: "डेस्कटॉप QR उपयुक्तता", title: "क्षणाक्षणाला डिकोड करा.", titleAccent: "हालचाल करत राहा.", website: "वेबसाइट", inputLabel: "इनपुट निवडा", dropHint: "किंवा कुठेतरी प्रतिमा ड्रॅग करा", clipboardMeta: "नवीनतम प्रतिमा वाचा", fileMeta: "स्थानिक प्रतिमा ब्राउझ करा", working: "प्रतिमा डीकोड करत आहे...", resultLabel: "डीकोडेड परिणाम", ready: "तयार", copied: "कॉपी केले", copyResult: "परिणाम कॉपी करा", footer: "जलद, खाजगी, स्थानिक - प्रथम क्यूआर पार्सिंग", desc: "क्यूआर कोड प्रतिमा ड्रॅग आणि ड्रॉप करा किंवा क्लिपबोर्डवरून डीकोडवर वाचा" },
  notice: { ...enUS.notice, decoded: "क्यूआर कोड यशस्वीरित्या डीकोड केला", noQr: "या इमेजमध्ये क्यूआर कोड आढळला नाही", failed: "हे इनपुट डीकोड करणे शक्य नाही", copied: "परिणाम क्लिपबोर्डवर कॉपी केला" },
  fileButton: { ...enUS.fileButton, selectFile: "फाइल निवडा", result: "परिणाम", copied: "कॉपी केले", copy: "प्रतिकृत करा@ action: inmenu", noQr: "कोणताही क्यूआर कोड आढळला नाही", parseFailed: "पार्स अयशस्वी", dialogFilter: "प्रतिमा" },
  readPaste: { ...enUS.readPaste, readClipboard: "क्लिपबोर्ड वाचा", result: "परिणाम", copied: "कॉपी केले", copy: "प्रतिकृत करा@ action: inmenu", failed: "वाचण्यास अपयशी, क्लिपबोर्डमध्ये प्रतिमा नाही" },
  dragDrop: { ...enUS.dragDrop, dropToParse: "प्रतिमा वाचण्याकरीता सोडा" },
  appMain: { ...enUS.appMain, noQrFound: "क्यूआर कोड सापडला नाही", result: "परिणाम", copied: "कॉपी केले!", copy: "प्रतिकृत करा@ action: inmenu" },
  tray: { ...enUS.tray, showWindow: "मुख्य चौकट दर्शवा", readClipboard: "क्लिपबोर्ड क्यूआर कोड वाचा", quit: "पूर्णपणे बाहेर पडा" },
}
