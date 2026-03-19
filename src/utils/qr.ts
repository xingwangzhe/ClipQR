import { invoke } from '@tauri-apps/api/core';
import { writeText } from '@tauri-apps/plugin-clipboard-manager';
import { processQrContent } from '../main';

export { processQrContent };

/**
 * 解析剪贴板图片中的二维码
 */
export async function parseClipboardImage(): Promise<string | null> {
  const { readImage } = await import('@tauri-apps/plugin-clipboard-manager');
  const image = await readImage();
  const { width, height } = await image.size();
  const rgbaData = await image.rgba();

  const result = await invoke<string | null>('decode_qr', {
    rgba: Array.from(rgbaData),
    width,
    height
  });

  return result;
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
