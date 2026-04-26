import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'
import { locale as osLocale } from '@tauri-apps/plugin-os'

function detectLocale(): string {
  const lang = navigator.language
  if (lang.startsWith('zh')) return 'zh-CN'
  if (lang.startsWith('en')) return 'en-US'
  return 'zh-CN'
}

export const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
})

export function t(key: string): string {
  return i18n.global.t(key)
}

export async function initLocale(): Promise<void> {
  try {
    const systemLocale = await osLocale()
    if (systemLocale) {
      const locale = systemLocale.startsWith('zh') ? 'zh-CN' :
                     systemLocale.startsWith('en') ? 'en-US' :
                     detectLocale()
      i18n.global.locale.value = locale as 'zh-CN' | 'en-US'
    }
  } catch (e) {
    console.error('Failed to get system locale:', e)
  }
}

export function setLocale(locale: 'zh-CN' | 'en-US') {
  i18n.global.locale.value = locale
}
