import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { directionFor, languages, resolvePreferredLocale, resolveLocale, supportedLocales, type Locale } from './catalog'

const USER_CHOICE_KEY = 'clipqr-locale-choice'
type Messages = Record<string, unknown>
const localeModules = import.meta.glob('./locales/*.ts', { eager: true, import: 'default' }) as Record<string, Messages>
const messages = Object.fromEntries(languages.map(({ code }) => [code, localeModules[`./locales/${code}.ts`]])) as Record<Locale, Messages>

function initialLocale(): Locale {
  const stored = typeof localStorage === 'undefined' ? null : localStorage.getItem(USER_CHOICE_KEY)
  if (stored && supportedLocales.includes(stored as Locale)) return stored as Locale
  const candidates = typeof navigator === 'undefined' ? [] : navigator.languages?.length ? navigator.languages : [navigator.language]
  return resolvePreferredLocale(candidates)
}

function lookup(source: Messages | undefined, key: string): string {
  const value = key.split('.').reduce<unknown>((current, part) => current && typeof current === 'object' ? (current as Messages)[part] : undefined, source)
  return typeof value === 'string' ? value : key
}

type LocaleContextValue = { locale: Locale; setLocale: (locale: Locale) => void; t: (key: string) => string }
const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(initialLocale)
  const chooseLocale = (next: Locale) => {
    localStorage.setItem(USER_CHOICE_KEY, next)
    setLocale(next)
  }
  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = directionFor(locale)
    document.title = lookup(messages[locale], 'meta.title')
    document.querySelector('meta[name="description"]')?.setAttribute('content', lookup(messages[locale], 'meta.description'))
  }, [locale])
  useEffect(() => {
    const followSystemLanguage = () => {
      if (localStorage.getItem(USER_CHOICE_KEY)) return
      const candidates = navigator.languages?.length ? navigator.languages : [navigator.language]
      setLocale(resolvePreferredLocale(candidates))
    }
    window.addEventListener('languagechange', followSystemLanguage)
    return () => window.removeEventListener('languagechange', followSystemLanguage)
  }, [])
  const value = useMemo<LocaleContextValue>(() => ({
    locale,
    setLocale: chooseLocale,
    t: (key) => lookup(messages[locale], key) === key ? lookup(messages['en-US'], key) : lookup(messages[locale], key),
  }), [locale])
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const value = useContext(LocaleContext)
  if (!value) throw new Error('useLocale must be used inside LocaleProvider')
  return value
}

export { languages, directionFor, resolveLocale, resolvePreferredLocale, supportedLocales }
export type { Locale }
