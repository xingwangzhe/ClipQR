<template>
  <div class="w-full flex flex-col items-center space-y-4">
    <button
      @click="() => handleRead().catch(err => console.error(err))"
      class="w-full sm:w-40 px-6 py-3 bg-green-500/80 hover:bg-green-600/90 active:bg-green-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg backdrop-blur transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
    >
      {{ $t('readPaste.readClipboard') }}
    </button>

    <div
      v-if="qrResult"
      class="mt-4 w-full max-w-md p-4 bg-slate-800 rounded-lg border border-slate-700 shadow-sm text-center"
    >
      <div class="text-sm font-semibold text-slate-200 mb-2">{{ $t('readPaste.result') }}</div>
      <div class="break-all text-slate-100 bg-slate-700/50 p-3 rounded text-sm text-left">
        {{ qrResult }}
      </div>
      <button
        @click="copyToClipboard"
        class="mt-3 px-3 py-1.5 text-sm bg-slate-700 hover:bg-slate-600 text-slate-200 rounded transition-colors"
      >
        {{ copied ? $t('readPaste.copied') : $t('readPaste.copy') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { parseClipboardImage, copyToClipboard as copyToClipboardUtil, processQrContent } from '../utils/qr'

const { t } = useI18n()

const qrResult = ref<string | null>(null)
const copied = ref(false)

const copyToClipboard = async () => {
  if (!qrResult.value) return
  await copyToClipboardUtil(qrResult.value)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}

const handleRead = async () => {
  console.log('=== Start reading clipboard ===')
  qrResult.value = null
  copied.value = false

  try {
    const result = await parseClipboardImage()
    qrResult.value = result
    console.log('✅ QR code decoded:', qrResult.value)
    if (result) {
      await processQrContent(result)
    }
  } catch (e) {
    console.error('❌ Read failed (clipboard may have no image):', e)
    qrResult.value = t('readPaste.failed')
  }
  console.log('=== Read end ===')
}
</script>
