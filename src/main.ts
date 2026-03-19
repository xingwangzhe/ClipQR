import { createApp } from 'vue'
import { Menu } from '@tauri-apps/api/menu';
import App from './App.vue';
import { TrayIcon } from '@tauri-apps/api/tray';
import { platform } from '@tauri-apps/plugin-os';
import { readImage, readText } from '@tauri-apps/plugin-clipboard-manager';
import { exit } from '@tauri-apps/plugin-process';
import { openUrl } from '@tauri-apps/plugin-opener';
import { invoke } from '@tauri-apps/api/core';
import { getCurrentWindow } from '@tauri-apps/api/window';
import './main.css';

const appWindow = getCurrentWindow();
createApp(App).mount('#app');

// 保存托盘ID，防止创建多个托盘
let existingTrayId: number | undefined;

export async function processQrContent(qrText: string | null) {
  if (!qrText) {
    //   console.log('⚠️ 托盘: 未检测到二维码');
    return;
  }
  const trimmedText = qrText.trim();
  // console.log('✅ 托盘: 二维码识别成功:', trimmedText);

  // 尝试解析为 URL，支持所有协议 (http, https, mailto, tel, sms, geo, file 等)
  try {
    new URL(trimmedText);
    // console.log('🔗 识别为URL，自动打开:', trimmedText);
    if (trimmedText.startsWith('file://')) {
      // file:// URL 需要解码 percent encoding 得到本地路径
      const filePath = decodeURIComponent(new URL(trimmedText).pathname);
      // console.log('📄 读取本地图片文件:', filePath);
      // 读取本地图片文件再解析二维码
      const fileQrText = await invoke<string | null>('decode_qr_from_file', { path: filePath });
      await processQrContent(fileQrText);
    } else {
      await openUrl(trimmedText);
    }
  } catch {
    // 如果 new URL() 解析失败，检查是否有协议头，也尝试打开
    if (trimmedText.includes('://')) {
      // console.log('🔗 检测到协议头，尝试打开:', trimmedText);
      try {
        await openUrl(trimmedText);
      } catch (e) {
        // console.error('❌ 打开失败:', e);
      }
    } else {
      //console.log('ℹ️ 内容不是URL，仅打印结果，不自动打开');
    }
  }
}

const menu = await Menu.new({
  items: [
    {
      id: 'show_window',
      text: '显示主窗口',
      action: async () => {
        await appWindow.show();
        await appWindow.unminimize();
        await appWindow.setFocus();
      }
    },
    {
      id: 'read_clipboard',
      text: '读取剪贴板二维码',
      action: async () => {
        //   console.log('=== 托盘: 开始读取剪贴板二维码 ===');
        // 首先尝试读取剪贴板图片
        try {
          const image = await readImage();
          const { width, height } = await image.size();
          const rgbaData = await image.rgba();

          // 在后端 Rust 解析二维码
          const qrText = await invoke<string | null>('decode_qr', {
            rgba: Array.from(rgbaData),
            width,
            height
          });
          await processQrContent(qrText);

        } catch (e) {
          // 读取图片失败，尝试读取文本
          //   console.log('ℹ️ 剪贴板没有图片，尝试读取文本...');
          //   console.log(e);
          try {
            const text = await readText();
            if (!text) {
              //     console.error('❌ 剪贴板为空');
              return;
            }
            const trimmedText = text.trim();
            //  console.log('📝 读取到文本:', trimmedText);

            // 检查是否是本地文件路径（支持 file:// URL、Unix 绝对路径、Windows 绝对路径）
            let filePath: string | null = null;
            if (trimmedText.startsWith('file://')) {
              filePath = decodeURIComponent(new URL(trimmedText).pathname);
            } else if (trimmedText.startsWith('/') || /^[A-Za-z]:[\\/]/.test(trimmedText)) {
              // Unix 绝对路径 (/...) 或 Windows 绝对路径 (C:\... 或 C:/...)
              filePath = trimmedText;
            }

            if (filePath) {
              //      console.log('📄 读取本地图片文件:', filePath);
              const qrText = await invoke<string | null>('decode_qr_from_file', { path: filePath });
              await processQrContent(qrText);
            } else {
              // 不是文件路径，直接尝试作为URL打开
              //    console.log('ℹ️ 文本不是file://链接，直接处理...');
              await processQrContent(trimmedText);
            }

          } catch (textErr) {
            //console.error('❌ 读取文本也失败:', textErr);
          }
        }
        // console.log('=== 托盘: 处理结束 ===');
      }
    },
    {
      id: 'quit',
      text: '完全退出',
      action: async () => { await exit(0); }
    },
  ],
});

const currentPlatform = platform();

let icon = '../src-tauri/icons/icon.png'
if (currentPlatform === 'windows') {
  icon = '../src-tauri/icons/icon.ico';
}

// 如果已经存在托盘，先移除它防止多托盘问题
if (existingTrayId !== undefined) {
  await TrayIcon.removeById(existingTrayId);
}

// 创建新托盘并保存ID
const tray = await TrayIcon.new({
  icon: icon,
  menu,
  menuOnLeftClick: true,
});
existingTrayId = tray.id();
