<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { listen } from '@tauri-apps/api/event'
import Desc from './components/Desc.vue'
import HomeButton from './components/HomeButton.vue'
import { parseFile, copyToClipboard, processQrContent } from './utils/qr'

const isDragging = ref(false)
const qrResult = ref<string | null>(null)
const copied = ref(false)

let unlistenDrop: (() => void) | undefined
let unlistenEnter: (() => void) | undefined
let unlistenLeave: (() => void) | undefined

async function handleDrop(event: { payload: { paths: string[] } }) {
  isDragging.value = false
  const paths = event.payload.paths
  if (paths.length === 0) return

  const filePath = paths[0]
  qrResult.value = null
  copied.value = false

  try {
    console.log('📦 拖拽文件路径:', filePath);
    const result = await parseFile(filePath);
    if (result) {
      qrResult.value = result
      processQrContent(result)
    } else {
      qrResult.value = '未找到二维码'
    }
  } catch (e) {
    console.error('解析失败:', e);
    qrResult.value = '解析失败: ' + e;
  }
}

function handleDragEnter() {
  isDragging.value = true
}

function handleDragLeave() {
  isDragging.value = false
}

async function copyResult() {
  if (!qrResult.value) return
  await copyToClipboard(qrResult.value)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}

onMounted(async () => {
  unlistenDrop = await listen('tauri://drag-drop', handleDrop)
  unlistenEnter = await listen('tauri://drag-enter', handleDragEnter)
  unlistenLeave = await listen('tauri://drag-leave', handleDragLeave)
})

onUnmounted(() => {
  unlistenDrop?.()
  unlistenEnter?.()
  unlistenLeave?.()
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
