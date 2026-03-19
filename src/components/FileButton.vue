<template>
  <div class="w-full flex flex-col items-center space-y-4">
    <button
      @click="handleFileSelect"
      class="w-full sm:w-40 px-6 py-3 bg-blue-500/80 hover:bg-blue-600/90 active:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg backdrop-blur transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
    >
      选择文件
    </button>
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      @change="handleFileChange"
      class="hidden"
    />

    <div
      v-if="qrResult"
      class="mt-4 w-full max-w-md p-4 bg-slate-800 rounded-lg border border-slate-700 shadow-sm text-center"
    >
      <div class="text-sm font-semibold text-slate-200 mb-2">识别结果:</div>
      <div class="break-all text-slate-100 bg-slate-700/50 p-3 rounded text-sm">
        {{ qrResult }}
      </div>
      <button
        @click="copyToClipboard"
        class="mt-3 px-3 py-1.5 text-sm bg-slate-700 hover:bg-slate-600 text-slate-200 rounded transition-colors"
      >
        {{ copied ? '已复制' : '复制' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { invoke } from '@tauri-apps/api/core';
import { writeText } from '@tauri-apps/plugin-clipboard-manager';
import { processQrContent } from '../main';

const fileInput = ref<HTMLInputElement | null>(null);
const qrResult = ref<string | null>(null);
const copied = ref(false);

const copyToClipboard = async () => {
  if (!qrResult.value) return;
  await writeText(qrResult.value);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};

const handleFileSelect = () => {
  fileInput.value?.click();
};

const handleFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  qrResult.value = null;
  copied.value = false;

  // 获取文件的本地路径 (在 Tauri 环境中，webview 能拿到本地文件路径)
  const filePath = file.path;
  if (!filePath) {
    console.error('❌ 无法获取文件路径');
    return;
  }

  console.log('📄 选择本地文件:', filePath);

  try {
    // 使用后端解析
    const result = await invoke<string | null>('decode_qr_from_file', { path: filePath });
    if (result) {
      qrResult.value = result;
      console.log('✅ 二维码识别成功:', result);
      // 自动处理内容（如果是URL会自动打开）
      await processQrContent(result);
    } else {
      console.log('⚠️ 未检测到二维码');
      qrResult.value = '未检测到二维码';
    }
  } catch (e) {
    console.error('❌ 解析失败:', e);
    qrResult.value = '解析失败: ' + e;
  }

  // 清空 input 以便重复选择同一个文件
  input.value = '';
};
</script>
