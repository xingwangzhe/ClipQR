import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { LocaleProvider } from './i18n'
import './style.css'
import './demo.css'

createRoot(document.getElementById('app')!).render(
  <StrictMode><LocaleProvider><App /></LocaleProvider></StrictMode>,
)
