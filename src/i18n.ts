import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'
import { locale as osLocale } from '@tauri-apps/plugin-os'
import { directionFor, languages, resolveLocale, supportedLocales, type Locale } from './i18n/catalog'

const STORAGE_KEY = 'clipqr-locale'
const localeModules = import.meta.glob('./locales/*.ts', { eager: true, import: 'default' }) as Record<string, unknown>
const messages = Object.fromEntries(languages.map(({ code }) => [
  code,
  localeModules[`./locales/${code}.ts`] ?? (code === 'zh-CN' ? zhCN : enUS),
])) as Record<string, typeof enUS>

function syncDocument(locale: Locale) {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = locale
    document.documentElement.dir = directionFor(locale)
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: 'en-US',
  fallbackLocale: 'en-US',
  messages: {
    ...messages,
  },
})

export function t(key: string): string {
  return i18n.global.t(key)
}

export async function initLocale(): Promise<void> {
  const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
  const initial = stored && languages.some(({ code }) => code === stored)
    ? stored as Locale
    : resolveLocale(await osLocale().catch(() => undefined))
  setLocale(initial, false)
}

export function setLocale(locale: Locale, persist = true) {
  ;(i18n.global.locale as unknown as { value: Locale }).value = locale
  syncDocument(locale)
  if (persist && typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, locale)
}

export { languages, directionFor, supportedLocales }
export type { Locale }
