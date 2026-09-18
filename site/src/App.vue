<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import { useMeta } from './composables/useMeta'

const { t } = useI18n()
useMeta()
</script>

<template>
  <div class="site-shell">
    <header class="site-nav container">
      <a class="site-brand" href="/"><span class="brand-symbol"><i /></span><span>ClipQR</span></a>
      <nav class="nav-links"><a href="#features">{{ t('features.title') }}</a><a href="#demo">{{ t('demo.title') }}</a><a href="https://github.com/xingwangzhe/ClipQR" target="_blank" rel="noreferrer">GitHub ↗</a><LanguageSwitcher /></nav>
    </header>

    <main>
      <section class="hero container">
        <div class="hero-copy"><div class="eyebrow"><span /> CLIPQR / DESKTOP UTILITY</div><h1>{{ t('hero.subtitle') }}<br><em>without the detour.</em></h1><p>{{ t('hero.description').replace('\n', ' ') }}</p><div class="hero-actions"><a class="button primary" href="https://github.com/xingwangzhe/ClipQR/releases" target="_blank" rel="noreferrer">{{ t('hero.downloadNow') }} <span>↗</span></a><a class="button quiet" href="#features">{{ t('hero.learnMore') }} <span>↓</span></a></div><div class="hero-note"><span class="pulse" /> {{ t('hero.localFirst') || 'Local-first · Open source · Cross-platform' }}</div></div>
        <div class="hero-visual"><div class="visual-label">01 / IN ACTION</div><div class="visual-frame"><img src="/应用截图.png" :alt="t('hero.appScreenshot')"><div class="visual-caption"><span>ClipQR</span><small>Fast QR parsing</small></div></div></div>
      </section>

      <section id="features" class="section container"><div class="section-intro"><span class="section-number">02</span><h2>{{ t('features.title') }}</h2><p>{{ t('hero.description').split('\n')[1] }}</p></div><div class="feature-grid"><article><span class="feature-index">A</span><h3>{{ t('features.clipboardRead') }}</h3><p>{{ t('features.clipboardReadDesc') }}</p></article><article><span class="feature-index">B</span><h3>{{ t('features.localFile') }}</h3><p>{{ t('features.localFileDesc') }}</p></article><article><span class="feature-index">C</span><h3>{{ t('features.dragDrop') }}</h3><p>{{ t('features.dragDropDesc') }}</p></article><article><span class="feature-index">D</span><h3>{{ t('features.autoOpenLink') }}</h3><p>{{ t('features.autoOpenLinkDesc') }}</p></article></div></section>

      <section id="demo" class="demo container"><div class="demo-heading"><span class="section-number">03</span><h2>{{ t('demo.title') }}</h2></div><div class="video-frame"><video controls poster="/应用截图.png"><source src="/演示视频.mp4" type="video/mp4">{{ t('demo.videoNotSupported') }}</video></div></section>

      <section class="download container"><div><span class="section-number">04</span><h2>{{ t('download.title') }}</h2><p>{{ t('download.text') }}</p></div><a class="button primary" href="https://github.com/xingwangzhe/ClipQR/releases" target="_blank" rel="noreferrer">{{ t('download.latestVersion') }} <span>↗</span></a></section>
    </main>

    <footer class="site-footer container"><span>ClipQR · MIT License</span><span class="footer-line" /><span>{{ t('footer.copyright') }}</span><a href="https://github.com/xingwangzhe/ClipQR" target="_blank" rel="noreferrer">GitHub ↗</a></footer>
  </div>
</template>
