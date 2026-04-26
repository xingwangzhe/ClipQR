import { createApp } from 'vue'
import App from './App.vue'
import { i18n, initLocale } from './i18n'
import { initTray } from './tray'
import './main.css'

createApp(App).use(i18n).mount('#app')

async function init() {
  await initLocale()
  await initTray()
}

await init()
