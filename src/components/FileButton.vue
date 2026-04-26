<template>
  <div class="w-full flex flex-col items-center space-y-4">
    <button
      @click="handleFileSelect"
      class="w-full sm:w-40 px-6 py-3 bg-blue-500/80 hover:bg-blue-600/90 active:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg backdrop-blur transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
    >
      {{ $t('fileButton.selectFile') }}
    </button>

    <div
      v-if="qrResult"
      class="mt-4 w-full max-w-md p-4 bg-slate-800 rounded-lg border border-slate-700 shadow-sm text-center"
    >
      <div class="text-sm font-semibold text-slate-200 mb-2">{{ $t('fileButton.result') }}</div>
      <div class="break-all text-slate-100 bg-slate-700/50 p-3 rounded text-sm">
        {{ qrResult }}
      </div>
      <button
        @click="copyToClipboard"
        class="mt-3 px-3 py-1.5 text-sm bg-slate-700 hover:bg-slate-600 text-slate-200 rounded transition-colors"
      >
        {{ copied ? $t('fileButton.copied') : $t('fileButton.copy') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { open } from '@tauri-apps/plugin-dialog'
import { parseFile, copyToClipboard as copyToClipboardUtil, processQrContent } from '../utils/qr'

const { t } = useI18n()

const qrResult = ref<string | null>(null)
const copied = ref(false)

const handleFileSelect = async () => {
  qrResult.value = null
  copied.value = false

  const filePath = await open({
    multiple: false,
    filters: [{
      name: t('fileButton.dialogFilter'),
      extensions: ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp']
    }]
  })

  if (!filePath) {
    return
  }

  console.log('📄 Select local file:', filePath)

  try {
    const result = await parseFile(filePath)
    if (result) {
      qrResult.value = result
      console.log('✅ QR code decoded:', result)
      await processQrContent(result)
    } else {
      console.log('⚠️ No QR code detected')
      qrResult.value = t('fileButton.noQr')
    }
  } catch (e) {
    console.error('❌ Parse failed:', e)
    qrResult.value = t('fileButton.parseFailed') + ': ' + e
  }
}

const copyToClipboard = async () => {
  if (!qrResult.value) return
  await copyToClipboardUtil(qrResult.value)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>
