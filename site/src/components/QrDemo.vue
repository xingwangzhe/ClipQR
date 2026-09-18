<script setup lang="ts">
import { ref } from 'vue'
import jsQR from 'jsqr'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const input = ref<HTMLInputElement | null>(null)
const result = ref('')
const status = ref<'idle' | 'dragging' | 'decoding' | 'empty' | 'error'>('idle')
const copied = ref(false)

function decodeImage(file: Blob): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const image = new Image()
    image.onload = () => {
      URL.revokeObjectURL(url)
      const canvas = document.createElement('canvas')
      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight
      const context = canvas.getContext('2d', { willReadFrequently: true })
      if (!context) { reject(new Error('Canvas unavailable')); return }
      context.drawImage(image, 0, 0)
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height)
      resolve(jsQR(pixels.data, pixels.width, pixels.height)?.data ?? null)
    }
    image.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Image unavailable')) }
    image.src = url
  })
}

async function parse(file: Blob) {
  status.value = 'decoding'; copied.value = false
  try {
    const value = await decodeImage(file)
    if (!value) { result.value = ''; status.value = 'empty'; return }
    result.value = value
    status.value = 'idle'
  } catch (error) {
    console.error(error)
    result.value = ''
    status.value = 'error'
  }
}

async function readClipboard() {
  try {
    if (navigator.clipboard?.read) {
      const items = await navigator.clipboard.read()
      for (const item of items) {
        const imageType = item.types.find((type) => type.startsWith('image/'))
        if (imageType) { await parse(await item.getType(imageType)); return }
      }
    }
    const text = await navigator.clipboard?.readText()
    if (text?.trim()) { result.value = text.trim(); status.value = 'idle'; return }
    status.value = 'empty'
  } catch (error) {
    console.error(error)
    status.value = 'error'
  }
}

function selectFile() { input.value?.click() }
async function onFile(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) await parse(file)
  if (input.value) input.value.value = ''
}
async function onDrop(event: DragEvent) {
  event.preventDefault()
  const file = event.dataTransfer?.files[0]
  if (file) await parse(file)
  else status.value = 'empty'
}
async function copyResult() {
  if (!result.value) return
  await navigator.clipboard.writeText(result.value)
  copied.value = true
  window.setTimeout(() => { copied.value = false }, 1800)
}
function isUrl(value: string) {
  try { return Boolean(new URL(value)) } catch { return false }
}
</script>

<template>
  <div class="qr-demo" :class="{ 'is-dragging': status === 'dragging' }" @dragover.prevent="status = 'dragging'" @dragleave="status = 'idle'" @drop="onDrop">
    <div class="qr-demo-head"><div><span class="demo-kicker">CLIPQR / BROWSER DEMO</span><h3>{{ t('demo.workspaceTitle') }}</h3></div><span class="demo-status" :class="status">{{ status === 'decoding' ? t('demo.decoding') : status === 'dragging' ? t('demo.drop') : result ? t('demo.ready') : t('demo.waiting') }}</span></div>
    <div class="qr-demo-actions"><button class="demo-action primary" @click="readClipboard"><strong>⌁</strong><span>{{ t('demo.clipboard') }}<small>{{ t('demo.clipboardMeta') }}</small></span></button><button class="demo-action" @click="selectFile"><strong>＋</strong><span>{{ t('demo.file') }}<small>{{ t('demo.fileMeta') }}</small></span></button></div>
    <input ref="input" class="sr-only" type="file" accept="image/*" @change="onFile">
    <div v-if="status === 'dragging'" class="qr-drop-state">↓ {{ t('demo.drop') }}</div>
    <div v-if="status === 'decoding'" class="qr-processing"><i />{{ t('demo.decoding') }}</div>
    <div v-if="status === 'empty'" class="qr-message">{{ t('demo.noQr') }}</div>
    <div v-if="status === 'error'" class="qr-message error">{{ t('demo.failed') }}</div>
    <div v-if="result" class="qr-result"><div class="qr-result-top"><span>{{ t('demo.result') }}</span><button @click="copyResult">{{ copied ? t('demo.copied') : t('demo.copy') }}</button></div><p>{{ result }}</p><a v-if="isUrl(result)" :href="result" target="_blank" rel="noreferrer">{{ t('demo.openLink') }} ↗</a></div>
  </div>
</template>
