<template>
  <div class="w-full flex flex-col items-center space-y-4">
    <button
      @click="() => handleRead().catch(err => console.error(err))"
      class="w-full sm:w-40 px-6 py-3 bg-green-500/80 hover:bg-green-600/90 active:bg-green-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg backdrop-blur transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
    >
      读取剪贴板
    </button>

    <div
      v-if="qrResult"
      class="mt-4 w-full max-w-md p-4 bg-slate-800 rounded-lg border border-slate-700 shadow-sm text-center"
    >
      <div class="text-sm font-semibold text-slate-200 mb-2">识别结果:</div>
      <div class="break-all text-slate-100 bg-slate-700/50 p-3 rounded text-sm text-left">
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
import { readImage } from '@tauri-apps/plugin-clipboard-manager';
import { ref } from 'vue';
import { invoke } from '@tauri-apps/api/core';
import { writeText } from '@tauri-apps/plugin-clipboard-manager';
import { processQrContent } from '../main';

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

const handleRead = async () => {
  console.log('=== 开始读取剪贴板 ===');
  qrResult.value = null;
  copied.value = false;

  try {
    // 1. readImage() 返回 Tauri Image 对象
    const image = await readImage();
    console.log('1. Image 对象:', image);

    // 2. 从 Image 对象获取宽高和 RGBA 像素数据
    const { width, height } = await image.size();
    console.log('2. 图片尺寸:', width, 'x', height);

    const rgbaData = await image.rgba();
    console.log('3. RGBA 像素数据:', rgbaData, '长度:', rgbaData.length);

    // 4. 使用后端 Rust 解析二维码
    try {
      const result = await invoke<string | null>('decode_qr', {
        rgba: Array.from(rgbaData),
        width,
        height
      });
      qrResult.value = result;
      console.log('✅ 二维码识别成功:', qrResult.value);
      if (result) {
        await processQrContent(result);
      }
    } catch (e) {
      console.log('⚠️ 后端解析失败:', e);
      qrResult.value = '解析失败: ' + e;
    }

  } catch (e) {
    console.error('❌ 读取失败（剪贴板可能没有图片）:', e);
    qrResult.value = '读取失败，剪贴板中没有图片';
  }
  console.log('=== 读取结束 ===');
};

</script>
