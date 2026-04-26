<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import Desc from './components/Desc.vue'
import HomeButton from './components/HomeButton.vue'
import { copyToClipboard } from './utils/qr'
import { initFileDrop } from './utils/drag'
import { setLocale } from './i18n'
import { rebuildTray } from './tray'

const { t, locale } = useI18n()

const isDragging = ref(false)
const qrResult = ref<string | null>(null)
const copied = ref(false)

let unlistens: Array<() => void> = []

async function copyResult() {
  if (!qrResult.value) return
  await copyToClipboard(qrResult.value)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}

async function toggleLocale() {
  const newLocale = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
  setLocale(newLocale)
  await rebuildTray()
}

onMounted(async () => {
  unlistens = await initFileDrop({
    onResult: (result) => {
      if (result) {
        qrResult.value = result
      } else {
        qrResult.value = t('appMain.noQrFound')
      }
    },
    onDragStateChange: (state) => {
      isDragging.value = state
    }
  })
})

onUnmounted(() => {
  unlistens.forEach(unlisten => unlisten())
})
</script>

<template>
  <div
    class="flex flex-col items-center min-h-[80vh] justify-center space-y-12 relative"
  >
    <div class="absolute top-4 right-4 z-10">
      <button
        @click="toggleLocale"
        class="px-3 py-1.5 text-sm bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors cursor-pointer"
      >
        {{ locale === 'zh-CN' ? 'English' : '中文' }}
      </button>
    </div>

    <div
      v-if="isDragging"
      class="absolute inset-0 bg-primary/10 border-2 border-dashed border-primary rounded-lg z-50 flex items-center justify-center pointer-events-none"
    >
      <p class="text-xl font-medium text-primary">{{ $t('dragDrop.dropToParse') }}</p>
    </div>

    <Desc />
    <HomeButton />

    <div v-if="qrResult" class="w-full max-w-md">
      <div class="bg-surface-alt rounded-lg p-4 border border-border">
        <p class="text-sm text-secondary mb-2">{{ $t('appMain.result') }}</p>
        <p class="text-primary break-all mb-4">{{ qrResult }}</p>
        <button
          @click="copyResult"
          class="w-full py-2 px-4 bg-primary text-on-primary rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
        >
          {{ copied ? $t('appMain.copied') : $t('appMain.copy') }}
        </button>
      </div>
    </div>
  </div>
</template>
