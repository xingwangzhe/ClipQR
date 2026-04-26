import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'

const supportedLocales = ['zh-CN', 'en-US'] as const
export type Locale = (typeof supportedLocales)[number]

const STORAGE_KEY = 'clipqr-locale'

function getInitialLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && supportedLocales.includes(stored as Locale)) {
    return stored as Locale
  }
  return 'en-US'
}

const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'en-US',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
})

export function setLocale(locale: Locale) {
  i18n.global.locale.value = locale
  localStorage.setItem(STORAGE_KEY, locale)
  document.documentElement.lang = locale
}

export function getCurrentLocale(): Locale {
  return i18n.global.locale.value as Locale
}

export { supportedLocales }
export default i18n
