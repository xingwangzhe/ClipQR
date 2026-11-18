import enUS from './en-US'

export default {
  ...enUS,
  demo: { ...enUS.demo, title: "ডেমো", description: enUS.demo.description },
  nav: { ...enUS.nav, github: "গিথুব" },
  hero: { ...enUS.hero, subtitle: "দ্রুত QR কোড স্ক্যানার", description: "Native Shell দিয়ে নির্মিত ক্রস-প্ল্যাটফর্ম ডেস্কটপ অ্যাপ ক্লিপবোর্ড এবং স্থানীয় চিত্রগুলি থেকে দ্রুত QR কোড সামগ্রীটি পড়ুন", downloadNow: "এখনই ডাউনলোড করুন", learnMore: "আরও জানুন", appScreenshot: "ক্লিপ কিউআর অ্যাপের স্ক্রিনশট", localFirst: "লোকাল-ফার্স্ট · ওপেন সোর্স · ক্রস-প্ল্যাটফর্ম" },
  features: { ...enUS.features, title: "বৈশিষ্ট্যগুলি", clipboardRead: "ক্লিপবোর্ড ডাইরেক্ট রিড", clipboardReadDesc: "ক্লিপবোর্ড থেকে সরাসরি ছবিগুলি পড়ুন এবং এক ক্লিকে QR কোডগুলি বিশ্লেষণ করুন", localFile: "স্থানীয় ফাইল", localFileDesc: "স্থানীয় চিত্র ফাইল থেকে QR কোডগুলি পার্স করা সমর্থন করে", dragDrop: "টেনে আনুন এবং ড্রপ করুন", dragDropDesc: "সরাসরি পার্সিংয়ের জন্য উইন্ডোতে চিত্র ফাইলগুলি টেনে আনতে সহায়তা করুন", fastResponse: "হালকা ও গাঢ় থিম", fastResponseDesc: "স্পষ্ট কনট্রাস্টসহ পছন্দের থিম বেছে নিন।", oneClickCopy: "সিস্টেম ট্রে আইকন", oneClickCopyDesc: "ট্রে থেকে ClipQR খুলুন, ক্লিপবোর্ড পড়ুন বা অ্যাপের তথ্য দেখুন।", autoOpenLink: "Optional link opening", autoOpenLinkDesc: "Review decoded links and open them with one click" },
  useCases: { ...enUS.useCases, title: "কেস 🎯 ব্যবহার করুন", case1: "আপনার ফোন খোলা ছাড়াই স্ক্রিনশট থেকে দ্রুত QR কোড পার্স করুন", case2: "QR কোডের ছবি সেভ করার পরে দ্রুত কন্টেন্ট এক্সট্র্যাক্ট করুন", case3: "বিকাশের সময় উত্পন্ন QR কোডগুলি দ্রুত যাচাই করুন", case4: "ডকুমেন্ট বা ওয়েবপৃষ্ঠার স্ক্রিনশট থেকে QR কোডের তথ্য বের করুন" },
  download: { ...enUS.download, title: "এখন ডাউনলোড করুন", text: "আপনার প্ল্যাটফর্মের জন্য সর্বশেষ সংস্করণ ডাউনলোড করতে GitHub রিলিজ পৃষ্ঠায় যান", latestVersion: "সর্বশেষ সংস্করণ ডাউনলোড করুন" },
  footer: { ...enUS.footer, privacyPolicy: "ব্যক্তিগত গোপনীয়তার নীতি", termsOfService: "পরিষেবার শর্তাদি", refundPolicy: "প্রত্যর্পণ নীতি", copyright: "©2026- NOW ক্লিপQR. দিয়ে তৈরি ❤️" },
  meta: { ...enUS.meta, title: "ক্লিপ কিউআর - কুইক কিউআর কোড স্ক্যানার", description: "ক্লিপ কিউআর - দ্রুত QR কোড স্ক্যানার, ক্রস-প্ল্যাটফর্ম ডেস্কটপ অ্যাপ, ক্লিপবোর্ড এবং স্থানীয় চিত্র থেকে দ্রুত QR কোড সামগ্রী পড়ুন" },
}
