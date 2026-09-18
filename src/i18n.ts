import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'
import { locale as osLocale } from '@tauri-apps/plugin-os'

export const i18n = createI18n({
  legacy: false,
  locale: 'en-US',
  fallbackLocale: 'en-US',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
})

export function t(key: string): string {
  return i18n.global.t(key)
}

export async function initLocale(): Promise<void> {
  // Keep the first launch predictable for screenshots, docs, and cross-platform builds.
  // Users can still switch language from the app toolbar.
  try { await osLocale() } catch (e) { console.error('Failed to read system locale:', e) }
}

export function setLocale(locale: 'zh-CN' | 'en-US') {
  i18n.global.locale.value = locale
}
