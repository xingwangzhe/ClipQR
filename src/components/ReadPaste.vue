<template>
    <div>
        <button @click="() => handleRead().catch(err => console.error(err))">读取剪贴板</button>
        <div v-if="imageSrc" style="margin-top: 10px;">
            <img :src="imageSrc" alt="clipboard image preview" style="max-width: 320px; max-height: 320px; border: 1px solid #ddd;" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { readImage } from '@tauri-apps/plugin-clipboard-manager';
import { ref } from 'vue';

const imageSrc = ref('');

const handleRead = async () => {
  console.log('=== 开始读取剪贴板 ===');
  try {
    // 1. readImage() 返回 Tauri Image 对象
    const image = await readImage();
    console.log('1. Image 对象:', image);

    // 2. 从 Image 对象获取宽高和 RGBA 像素数据
    const { width, height } = await image.size();
    console.log('2. 图片尺寸:', width, 'x', height);

    const rgbaData = await image.rgba();
    console.log('3. RGBA 像素数据:', rgbaData, '长度:', rgbaData.length);

    // 3. 使用 Canvas 将 RGBA 像素编码为 PNG base64
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('无法获取 canvas context');
      return;
    }

    // 4. 创建 ImageData 并绘制到 canvas — 需要转换为 Uint8ClampedArray
    const clamped = new Uint8ClampedArray(rgbaData);
    const imageData = new ImageData(clamped, width, height);
    ctx.putImageData(imageData, 0, 0);

    // 5. 转换为 base64
    const base64 = canvas.toDataURL('image/png');
    console.log('✅ 最终 Base64:', base64);
    imageSrc.value = base64;
  } catch (e) {
    console.error('❌ 读取失败（剪贴板可能没有图片）:', e);
  }
  console.log('=== 读取结束 ===');
};

</script>
