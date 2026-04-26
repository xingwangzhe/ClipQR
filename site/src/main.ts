import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n, { getCurrentLocale } from './i18n'

const app = createApp(App)
app.use(i18n)
app.mount('#app')

// Set initial lang attribute
document.documentElement.lang = getCurrentLocale()
