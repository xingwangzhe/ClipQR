<template>
    <div>
        <button @click="() => handleRead().catch(err => console.error(err))">读取剪贴板</button>
        <div v-if="imageSrc" style="margin-top: 10px;">
            <img :src="imageSrc" alt="剪贴板图片" style="max-width: 320px; max-height: 320px; border: 1px solid #ddd;" />
        </div>
        <div v-if="qrResult" style="margin-top: 10px; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
            <div><strong>识别结果:</strong></div>
            <div style="word-break: break-all; margin-top: 5px;">{{ qrResult }}</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { readImage } from '@tauri-apps/plugin-clipboard-manager';
import { ref } from 'vue';
import { BrowserMultiFormatReader } from '@zxing/library';

const imageSrc = ref('');
const qrResult = ref<string | null>(null);
const codeReader = new BrowserMultiFormatReader();

const handleRead = async () => {
  console.log('=== 开始读取剪贴板 ===');
  imageSrc.value = '';
  qrResult.value = null;

  try {
    // 1. readImage() 返回 Tauri Image 对象
    const image = await readImage();
    console.log('1. Image 对象:', image);

    // 2. 从 Image 对象获取宽高和 RGBA 像素数据
    const { width, height } = await image.size();
    console.log('2. 图片尺寸:', width, 'x', height);

    const rgbaData = await image.rgba();
    console.log('3. RGBA 像素数据:', rgbaData, '长度:', rgbaData.length);

    // 3. 使用 Canvas 将 RGBA 像素编码为 PNG base64 用于显示
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('无法获取 canvas context');
      return;
    }

    const clamped = new Uint8ClampedArray(rgbaData);
    const imageData = new ImageData(clamped, width, height);
    ctx.putImageData(imageData, 0, 0);

    const base64 = canvas.toDataURL('image/png');
    imageSrc.value = base64;
    console.log('✅ 图片已显示');

    // 4. 使用 zxing-js 在前端识别二维码
    const img = new Image();
    img.src = base64;
    await new Promise(resolve => {
      img.onload = resolve;
    });

    try {
      const result = await codeReader.decodeFromImageElement(img);
      qrResult.value = result.getText();
      console.log('✅ 二维码识别成功:', qrResult.value);
    } catch (e) {
      console.log('⚠️ 未检测到二维码:', e);
    }

  } catch (e) {
    console.error('❌ 读取失败（剪贴板可能没有图片）:', e);
  }
  console.log('=== 读取结束 ===');
};

</script>
