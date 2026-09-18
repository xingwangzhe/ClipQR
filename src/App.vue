<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { open } from '@tauri-apps/plugin-dialog'
import { sendNotification } from '@tauri-apps/plugin-notification'
import { copyToClipboard, parseClipboardImage, parseFile, processQrContent } from './utils/qr'
import { initFileDrop } from './utils/drag'
import { setLocale } from './i18n'

const { t, locale } = useI18n()
const result = ref<string | null>(null)
const busy = ref(false)
const dragging = ref(false)
const copied = ref(false)
const toast = ref<{ kind: string; text: string } | null>(null)
let timer: ReturnType<typeof setTimeout> | undefined
let unlistens: Array<() => void> = []

function notify(kind: string, text: string) {
  toast.value = { kind, text }
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => { toast.value = null }, 3200)
  try { sendNotification({ title: 'ClipQR', body: text }) } catch { /* UI toast remains available if system notifications are unavailable. */ }
}

async function decode(run: () => Promise<string | null>) {
  busy.value = true; result.value = null
  try {
    const value = await run()
    if (!value) notify('info', t('notice.noQr'))
    else { result.value = value; await processQrContent(value); notify('success', t('notice.decoded')) }
  } catch (error) { console.error(error); notify('error', t('notice.failed')) }
  finally { busy.value = false }
}
const readClipboard = () => decode(parseClipboardImage)
async function selectFile() {
  const path = await open({ multiple: false, filters: [{ name: t('fileButton.dialogFilter'), extensions: ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'] }] })
  if (!path || Array.isArray(path)) return
  await decode(() => parseFile(path))
}
async function copyResult() {
  if (!result.value) return
  await copyToClipboard(result.value); copied.value = true; notify('success', t('notice.copied'))
  setTimeout(() => { copied.value = false }, 1800)
}
async function toggleLocale() {
  setLocale(locale.value === 'zh-CN' ? 'en-US' : 'zh-CN')
  if ('__TAURI_INTERNALS__' in window) { const { rebuildTray } = await import('./tray'); await rebuildTray() }
}
onMounted(async () => {
  if (!('__TAURI_INTERNALS__' in window)) return
  unlistens = await initFileDrop({
    onResult: (value) => { if (value) { result.value = value; notify('success', t('notice.decoded')) } else notify('info', t('notice.noQr')) },
    onDragStateChange: (value) => { dragging.value = value },
  })
})
onUnmounted(() => unlistens.forEach((unlisten) => unlisten()))
</script>

<template>
  <main class="app-shell">
    <div class="ambient ambient-a" /><div class="ambient ambient-b" />
    <header class="topbar">
      <a class="brand" href="https://clipqr.needhelp.icu/" target="_blank" rel="noreferrer"><span class="brand-mark"><span /></span>ClipQR</a>
      <nav><a href="https://clipqr.needhelp.icu/" target="_blank" rel="noreferrer">{{ t('app.website') }} ↗</a><a href="https://github.com/xingwangzhe/ClipQR" target="_blank" rel="noreferrer">GitHub ↗</a><button class="lang" @click="toggleLocale">{{ locale === 'zh-CN' ? 'EN' : '中' }}</button></nav>
    </header>
    <section class="hero"><div class="eyebrow"><i />{{ t('app.eyebrow') }}</div><h1>{{ t('app.title') }}<br><em>{{ t('app.titleAccent') }}</em></h1><p>{{ t('app.desc') }}</p></section>
    <section class="workspace" :class="{ dragging }"><div class="scan-line" /><div class="workspace-head"><span><b>01</b>{{ t('app.inputLabel') }}</span><small>{{ t('app.dropHint') }}</small></div>
      <div class="actions"><button class="action primary" :disabled="busy" @click="readClipboard"><strong>⌁</strong><span>{{ t('readPaste.readClipboard') }}<small>{{ t('app.clipboardMeta') }} <b>→</b></small></span></button><button class="action" :disabled="busy" @click="selectFile"><strong>＋</strong><span>{{ t('fileButton.selectFile') }}<small>{{ t('app.fileMeta') }} <b>→</b></small></span></button></div>
      <div v-if="dragging" class="drop-overlay">↓　{{ t('dragDrop.dropToParse') }}</div><div v-if="busy" class="working"><i />{{ t('app.working') }}</div>
    </section>
    <section v-if="result" class="result-card"><div class="workspace-head"><span><b>02</b>{{ t('app.resultLabel') }}</span><small class="ready">{{ t('app.ready') }}</small></div><p>{{ result }}</p><button class="copy" @click="copyResult">{{ copied ? t('app.copied') : t('app.copyResult') }} <small>⌘ C</small></button></section>
    <footer><span>ClipQR · {{ t('app.footer') }}</span><i />{{ t('app.version') }}</footer>
    <Transition name="toast"><div v-if="toast" class="toast" :class="toast.kind"><b>{{ toast.kind === 'success' ? '✓' : toast.kind === 'error' ? '!' : 'i' }}</b>{{ toast.text }}</div></Transition>
  </main>
</template>
