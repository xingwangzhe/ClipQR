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
      <section className="download container"><div className="download-heading"><span className="section-number">{t('sections.downloadNumber')}</span><h2>{t('download.title')}</h2><p>{t('download.text')}</p></div><div className="platform-grid">
        <a className="platform-card" href="https://github.com/xingwangzhe/ClipQR/releases/latest" target="_blank" rel="noreferrer" aria-label="ClipQR for Windows x64 and ARM64"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M5 10.5 21 8v15H5zm19-3 19-2.8V23H24zM5 25h16v15L5 37.5zm19 0h19v18.3L24 40.5z" /></svg><span><strong>Windows</strong><small>x64 · ARM64 · ZIP</small></span><b>↗</b></a>
        <a className="platform-card" href="https://github.com/xingwangzhe/ClipQR/releases/latest" target="_blank" rel="noreferrer" aria-label="ClipQR for macOS Apple silicon"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M33.6 25.5c0-4.1 3.4-6.1 3.5-6.2a7.5 7.5 0 0 0-5.9-3.2c-2.5-.3-4.9 1.5-6.2 1.5s-3.3-1.5-5.4-1.4a8 8 0 0 0-6.7 4.1c-2.9 5-.7 12.4 2.1 16.5 1.4 2 3 4.2 5.1 4.1 2-.1 2.8-1.3 5.3-1.3s3.2 1.3 5.4 1.2c2.2 0 3.6-2 5-4a18 18 0 0 0 2.3-4.7 7.2 7.2 0 0 1-4.5-6.6ZM29.5 13.4a7.5 7.5 0 0 0 1.7-5.4 7.7 7.7 0 0 0-5 2.6 7.2 7.2 0 0 0-1.8 5.2 6.4 6.4 0 0 0 5.1-2.4Z" /></svg><span><strong>macOS</strong><small>Apple silicon · ZIP</small></span><b>↗</b></a>
        <a className="platform-card" href="https://github.com/xingwangzhe/ClipQR/releases/latest" target="_blank" rel="noreferrer" aria-label="ClipQR for Linux x86 64 and ARM64"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 5c-6.2 0-9 5-9 11v7c-3.6 2.7-6 7.2-6 12.1V40h30v-4.9c0-4.9-2.4-9.4-6-12.1v-7c0-6-2.8-11-9-11Zm-5 13a2 2 0 1 1 0 .1Zm10 0a2 2 0 1 1 0 .1ZM18 27h12l4 4H14zM5 35h5v6H5zm33 0h5v6h-5z" /></svg><span><strong>Linux</strong><small>x86_64 · ARM64 · DEB / RPM / AppImage</small></span><b>↗</b></a>
      </div></section>
    </main>
    <footer className="site-footer container"><span>ClipQR · {t('nav.mitLicense')}</span><span className="footer-line" /><span>{t('footer.copyright')}</span><a aria-label={t('nav.github')} href="https://github.com/xingwangzhe/ClipQR" target="_blank" rel="noreferrer">{t('nav.github')} ↗</a></footer>
  </div>
}
