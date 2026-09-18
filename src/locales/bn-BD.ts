import enUS from './en-US'

export default {
  ...enUS,
  app: { ...enUS.app, eyebrow: "ডেস্কটপ QR ইউটিলিটি", title: "মুহূর্তটি ডিকোড করুন ।", titleAccent: "এটিকে সচল রাখুন ।", website: "ওয়েবসাইট", inputLabel: "একটি ইনপুট নির্বাচন করুন", dropHint: "বা যে কোনও জায়গায় একটি ছবি টেনে আনুন", clipboardMeta: "সর্বশেষ ছবিটি পড়ুন", fileMeta: "স্থানীয় ছবি ব্রাউজ করুন", working: "ছবি ডিকোড করা হচ্ছে...", resultLabel: "ডিকোড করা ফলাফল", ready: "প্রস্তুত", copied: "কপি করা হয়েছে", copyResult: "ফলাফল কপি করুন", footer: "দ্রুত, ব্যক্তিগত, স্থানীয়-প্রথম QR পার্সিং", desc: "একটি QR কোড চিত্র টেনে আনুন এবং ড্রপ করুন বা ক্লিপবোর্ড থেকে ডিকোড করতে পড়ুন" },
  notice: { ...enUS.notice, decoded: "QR কোড সফলভাবে ডিকোড করা হয়েছে", noQr: "এই ছবিতে কোনও QR কোড পাওয়া যায়নি", failed: "এই ইনপুটটি ডিকোড করা যায়নি", copied: "ফলাফল ক্লিপবোর্ডে অনুলিপি করা হয়েছে" },
  fileButton: { ...enUS.fileButton, selectFile: "ফাইলটি বেছে নিন", result: "ফল", copied: "কপি করা হয়েছে", copy: "কপি করুন", noQr: "কোনও QR কোড সনাক্ত করা যায়নি", parseFailed: "পার্স ব্যর্থ হয়েছে", dialogFilter: "চিত্রসমূহ" },
  readPaste: { ...enUS.readPaste, readClipboard: "ক্লিপবোর্ড পড়ুন", result: "ফল", copied: "কপি করা হয়েছে", copy: "কপি করুন", failed: "পড়তে ব্যর্থ, ক্লিপবোর্ডে কোনও ছবি নেই" },
  dragDrop: { ...enUS.dragDrop, dropToParse: "ছবি পার্স করতে রিলিজ করুন" },
  appMain: { ...enUS.appMain, noQrFound: "কোনও QR কোড পাওয়া যায়নি", result: "ফল", copied: "কপি করা হয়েছে", copy: "কপি করুন" },
  tray: { ...enUS.tray, showWindow: "প্রধান উইন্ডো দেখান", readClipboard: "ক্লিপবোর্ড QR কোড পড়ুন", quit: "সম্পূর্ণভাবে প্রস্থান করুন" },
}
