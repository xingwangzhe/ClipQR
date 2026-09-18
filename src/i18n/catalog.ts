export const languages = [
  { code: 'en-US', nativeName: 'English', englishName: 'English', base: 'en', dir: 'ltr' },
  { code: 'zh-CN', nativeName: '简体中文', englishName: 'Simplified Chinese', base: 'zh', dir: 'ltr' },
  { code: 'zh-TW', nativeName: '繁體中文', englishName: 'Traditional Chinese', base: 'zh', dir: 'ltr' },
  { code: 'es-ES', nativeName: 'Español', englishName: 'Spanish', base: 'es', dir: 'ltr' },
  { code: 'hi-IN', nativeName: 'हिन्दी', englishName: 'Hindi', base: 'hi', dir: 'ltr' },
  { code: 'ar', nativeName: 'العربية', englishName: 'Arabic', base: 'ar', dir: 'rtl' },
  { code: 'pt-BR', nativeName: 'Português', englishName: 'Portuguese', base: 'pt', dir: 'ltr' },
  { code: 'bn-BD', nativeName: 'বাংলা', englishName: 'Bengali', base: 'bn', dir: 'ltr' },
  { code: 'ru-RU', nativeName: 'Русский', englishName: 'Russian', base: 'ru', dir: 'ltr' },
  { code: 'ja-JP', nativeName: '日本語', englishName: 'Japanese', base: 'ja', dir: 'ltr' },
  { code: 'pa-IN', nativeName: 'ਪੰਜਾਬੀ', englishName: 'Punjabi', base: 'pa', dir: 'ltr' },
  { code: 'de-DE', nativeName: 'Deutsch', englishName: 'German', base: 'de', dir: 'ltr' },
  { code: 'jv-ID', nativeName: 'Basa Jawa', englishName: 'Javanese', base: 'jv', dir: 'ltr' },
  { code: 'ko-KR', nativeName: '한국어', englishName: 'Korean', base: 'ko', dir: 'ltr' },
  { code: 'fr-FR', nativeName: 'Français', englishName: 'French', base: 'fr', dir: 'ltr' },
  { code: 'te-IN', nativeName: 'తెలుగు', englishName: 'Telugu', base: 'te', dir: 'ltr' },
  { code: 'tr-TR', nativeName: 'Türkçe', englishName: 'Turkish', base: 'tr', dir: 'ltr' },
  { code: 'vi-VN', nativeName: 'Tiếng Việt', englishName: 'Vietnamese', base: 'vi', dir: 'ltr' },
  { code: 'mr-IN', nativeName: 'मराठी', englishName: 'Marathi', base: 'mr', dir: 'ltr' },
  { code: 'it-IT', nativeName: 'Italiano', englishName: 'Italian', base: 'it', dir: 'ltr' },
  { code: 'ur-PK', nativeName: 'اردو', englishName: 'Urdu', base: 'ur', dir: 'rtl' },
] as const

export type Locale = (typeof languages)[number]['code']
export const supportedLocales = languages.map(({ code }) => code) as Locale[]

export function resolveLocale(input: string | null | undefined): Locale {
  if (!input) return 'en-US'
  const normalized = input.replace('_', '-').toLowerCase()
  const exact = languages.find(({ code }) => code.toLowerCase() === normalized)
  if (exact) return exact.code
  const base = normalized.split('-')[0]
  return languages.find((language) => language.base === base)?.code ?? 'en-US'
}

export function directionFor(locale: Locale): 'ltr' | 'rtl' {
  return languages.find((language) => language.code === locale)?.dir ?? 'ltr'
}
