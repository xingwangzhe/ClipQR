import { createApp } from 'vue'
import App from './App.vue'
import { i18n, initLocale } from './i18n'
import './main.css'

createApp(App).use(i18n).mount('#app')

async function init() {
  if (!('__TAURI_INTERNALS__' in window)) return
  const { initTray } = await import('./tray')
  await initLocale()
  await initTray()
}

await init()
