import LanguageSwitcher from './components/LanguageSwitcher'
import QrDemo from './components/QrDemo'
import { useLocale } from './i18n'

export default function App() {
  const { t } = useLocale()
  return <div className="site-shell">
    <header className="site-nav container">
      <a className="site-brand" href="/"><img className="brand-icon" src="/clipqr-icon.png" alt="ClipQR" /><span>ClipQR</span></a>
      <nav className="nav-links"><a href="#features">{t('features.title')}</a><a href="#demo">{t('demo.title')}</a><a aria-label={t('nav.github')} href="https://github.com/xingwangzhe/ClipQR" target="_blank" rel="noreferrer">{t('nav.github')} ↗</a><LanguageSwitcher /></nav>
    </header>
    <main>
      <section className="hero container">
        <div className="hero-copy"><div className="eyebrow"><span /> {t('hero.eyebrow')}</div><h1>{t('hero.subtitle')}<br /><em>{t('hero.titleSuffix')}</em></h1><p>{t('hero.description').replace('\n', ' ')}</p><div className="hero-actions"><a className="button primary" href="https://github.com/xingwangzhe/ClipQR/releases" target="_blank" rel="noreferrer">{t('hero.downloadNow')} <span>↗</span></a><a className="button quiet" href="#features">{t('hero.learnMore')} <span>↓</span></a></div><div className="hero-note"><span className="pulse" /> {t('hero.localFirst')}</div></div>
        <div className="hero-visual"><div className="visual-label">{t('hero.visualLabel')}</div><div className="app-shots"><figure className="visual-frame"><img src="/主界面.webp" alt={t('hero.mainScreenshot')} /><figcaption><span>01</span><div><strong>{t('hero.mainTitle')}</strong><small>{t('hero.mainCaption')}</small></div></figcaption></figure><figure className="visual-frame about-frame"><img src="/关于界面.webp" alt={t('hero.aboutScreenshot')} /><figcaption><span>02</span><div><strong>{t('hero.aboutTitle')}</strong><small>{t('hero.aboutCaption')}</small></div></figcaption></figure></div></div>
      </section>
      <section id="features" className="section container"><div className="section-intro"><span className="section-number">{t('sections.featuresNumber')}</span><h2>{t('features.title')}</h2><p>{t('hero.description').split('\n')[1]}</p></div><div className="feature-grid">
        <article><span className="feature-index">A</span><h3>{t('features.clipboardRead')}</h3><p>{t('features.clipboardReadDesc')}</p></article><article><span className="feature-index">B</span><h3>{t('features.localFile')}</h3><p>{t('features.localFileDesc')}</p></article><article><span className="feature-index">C</span><h3>{t('features.dragDrop')}</h3><p>{t('features.dragDropDesc')}</p></article><article><span className="feature-index">D</span><h3>{t('features.autoOpenLink')}</h3><p>{t('features.autoOpenLinkDesc')}</p></article><article><span className="feature-index">E</span><h3>{t('features.fastResponse')}</h3><p>{t('features.fastResponseDesc')}</p></article><article><span className="feature-index">F</span><h3>{t('features.oneClickCopy')}</h3><p>{t('features.oneClickCopyDesc')}</p></article>
      </div></section>
      <section id="demo" className="demo-section section container"><div className="section-intro"><span className="section-number">{t('sections.demoNumber')}</span><h2>{t('demo.title')}</h2><p>{t('demo.description')}</p></div><QrDemo /></section>
      <section className="download container"><div><span className="section-number">{t('sections.downloadNumber')}</span><h2>{t('download.title')}</h2><p>{t('download.text')}</p></div><a className="button primary" href="https://github.com/xingwangzhe/ClipQR/releases" target="_blank" rel="noreferrer">{t('download.latestVersion')} <span>↗</span></a></section>
    </main>
    <footer className="site-footer container"><span>ClipQR · {t('nav.mitLicense')}</span><span className="footer-line" /><span>{t('footer.copyright')}</span><a aria-label={t('nav.github')} href="https://github.com/xingwangzhe/ClipQR" target="_blank" rel="noreferrer">{t('nav.github')} ↗</a></footer>
  </div>
}
