<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Desc from './components/Desc.vue'
import HomeButton from './components/HomeButton.vue'
import { copyToClipboard } from './utils/qr'
import { initFileDrop } from './utils/drag'

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

onMounted(async () => {
  unlistens = await initFileDrop({
    onResult: (result) => {
      if (result) {
        qrResult.value = result
      } else {
        qrResult.value = '未找到二维码'
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
    <!-- 拖拽遮罩 -->
    <div
      v-if="isDragging"
      class="absolute inset-0 bg-primary/10 border-2 border-dashed border-primary rounded-lg z-50 flex items-center justify-center pointer-events-none"
    >
      <p class="text-xl font-medium text-primary">松开以解析图片</p>
    </div>

    <Desc />
    <HomeButton />

    <!-- 拖拽结果显示 -->
    <div v-if="qrResult" class="w-full max-w-md">
      <div class="bg-surface-alt rounded-lg p-4 border border-border">
        <p class="text-sm text-secondary mb-2">解析结果:</p>
        <p class="text-primary break-all mb-4">{{ qrResult }}</p>
        <button
          @click="copyResult"
          class="w-full py-2 px-4 bg-primary text-on-primary rounded-lg hover:opacity-90 transition-opacity"
        >
          {{ copied ? '已复制!' : '复制' }}
        </button>
      </div>
    </div>
  </div>
</template>
