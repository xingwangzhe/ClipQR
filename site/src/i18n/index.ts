import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'
import { directionFor, languages, resolveLocale, supportedLocales, type Locale } from './catalog'

const STORAGE_KEY = 'clipqr-locale'

function getInitialLocale(): Locale {
  const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
  if (stored && supportedLocales.includes(stored as Locale)) {
    return stored as Locale
  }
  const candidates = typeof navigator !== 'undefined' && navigator.languages?.length ? navigator.languages : [navigator?.language]
  return resolveLocale(candidates.find(Boolean))
}

const localeModules = import.meta.glob('./locales/*.ts', { eager: true, import: 'default' }) as Record<string, unknown>
const messages = Object.fromEntries(languages.map(({ code }) => [code, localeModules[`./locales/${code}.ts`] ?? (code === 'zh-CN' ? zhCN : enUS)])) as Record<string, typeof enUS>

const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'en-US',
  messages: {
    ...messages
  }
})

export function setLocale(locale: Locale) {
  i18n.global.locale.value = locale
  localStorage.setItem(STORAGE_KEY, locale)
  document.documentElement.lang = locale
  document.documentElement.dir = directionFor(locale)
}

export function getCurrentLocale(): Locale {
  return i18n.global.locale.value as Locale
}

export { languages, directionFor, resolveLocale, supportedLocales }
export default i18n
