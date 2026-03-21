import { invoke } from '@tauri-apps/api/core';
import { writeText } from '@tauri-apps/plugin-clipboard-manager';
import { processQrContent } from '../main';

export { processQrContent };

/**
 * 解析剪贴板图片中的二维码
 * 如果读取图片失败，尝试读取文本，如果文本是文件路径则解析该文件
 */
export async function parseClipboardImage(): Promise<string | null> {
  const { readImage, readText } = await import('@tauri-apps/plugin-clipboard-manager');

  // 首先尝试读取剪贴板图片
  try {
    const image = await readImage();
    const { width, height } = await image.size();
    const rgbaData = await image.rgba();

    const result = await invoke<string | null>('decode_qr', {
      rgba: Array.from(rgbaData),
      width,
      height
    });

    return result;
  } catch (e) {
    // 读取图片失败，尝试读取文本
    console.log('ℹ️ 剪贴板没有图片，尝试读取文本...');
    try {
      const text = await readText();
      if (!text) {
        return null;
      }
      const trimmedText = text.trim();

      // 检查是否是本地文件路径（支持 file:// URL、Unix 绝对路径、Windows 绝对路径）
      let filePath: string | null = null;
      if (trimmedText.startsWith('file://')) {
        filePath = decodeURIComponent(new URL(trimmedText).pathname);
      } else if (trimmedText.startsWith('/') || /^[A-Za-z]:[\\/]/.test(trimmedText)) {
        // Unix 绝对路径 (/...) 或 Windows 绝对路径 (C:\... 或 C:/...)
        filePath = trimmedText;
      }

      if (filePath) {
        console.log('📄 读取本地图片文件:', filePath);
        const fileQrText = await invoke<string | null>('decode_qr_from_file', { path: filePath });
        return fileQrText;
      } else {
        // 不是文件路径，直接返回文本内容让上层处理
        return trimmedText;
      }
    } catch (textErr) {
      console.error('❌ 读取文本也失败:', textErr);
      return null;
    }
  }
}

/**
 * 解析本地文件中的二维码
 */
export async function parseFile(filePath: string): Promise<string | null> {
  const result = await invoke<string | null>('decode_qr_from_file', { path: filePath });
  return result;
}

/**
 * 复制文本到剪贴板
 */
export async function copyToClipboard(text: string): Promise<void> {
  await writeText(text);
}
