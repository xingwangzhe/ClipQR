import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { languages, useLocale, type Locale } from '../i18n'

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale()
  const [open, setOpen] = useState(false)
  const [menuStyle, setMenuStyle] = useState<CSSProperties>({})
  const root = useRef<HTMLDivElement>(null)
  const menu = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (!root.current?.contains(target) && !menu.current?.contains(target)) setOpen(false)
    }
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    document.addEventListener('click', clickOutside)
    document.addEventListener('keydown', escape)
    return () => { document.removeEventListener('click', clickOutside); document.removeEventListener('keydown', escape) }
  }, [])
  useLayoutEffect(() => {
    if (!open) return
    const placeMenu = () => {
      const button = root.current?.querySelector('button')
      if (!button) return
      const rect = button.getBoundingClientRect()
      const width = Math.min(248, window.innerWidth - 24)
      const maxHeight = Math.min(560, window.innerHeight - 32)
      const below = window.innerHeight - rect.bottom - 12
      const height = Math.min(560, languages.length * 46 + 12, window.innerHeight - 32)
      const top = below >= Math.min(height, 240) ? rect.bottom + 8 : Math.max(16, rect.top - Math.min(height, maxHeight) - 8)
      const left = Math.max(12, Math.min(rect.right - width, window.innerWidth - width - 12))
      setMenuStyle({ position: 'fixed', top, left, width, maxHeight, zIndex: 9999 })
    }
    placeMenu()
    window.addEventListener('resize', placeMenu)
    window.addEventListener('scroll', placeMenu, true)
    return () => { window.removeEventListener('resize', placeMenu); window.removeEventListener('scroll', placeMenu, true) }
  }, [open])
  return <div ref={root} className="language-switcher">
    <button className="switcher-btn" aria-label={t('nav.chooseLanguage')} aria-expanded={open} onClick={() => setOpen(!open)}><span className="language-glyph">文A</span></button>
    {open && createPortal(<div ref={menu} className="dropdown-menu" role="menu" style={menuStyle}>{languages.map((language) => <button key={language.code} className={`dropdown-item ${locale === language.code ? 'active' : ''}`} role="menuitem" onClick={() => { setLocale(language.code as Locale); setOpen(false) }}><span>{language.nativeName}</span><small>{language.englishName}</small>{locale === language.code && <b>✓</b>}</button>)}</div>, document.body)}
  </div>
}
