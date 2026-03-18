import { createApp } from 'vue'
import { Menu } from '@tauri-apps/api/menu';
import './style.css'
import App from './App.vue'
import { TrayIcon } from '@tauri-apps/api/tray';
import { platform } from '@tauri-apps/plugin-os';
createApp(App).mount('#app')
const menu = await Menu.new({
  items: [
    {
      id: 'quit',
      text: '完全退出',
    },
  ],
});

const currentPlatform = platform();

let icon = '../src-tauri/icons/icon.png'
if (currentPlatform === 'windows') {
  icon = '../src-tauri/icons/icon.ico';
}

const tray = await TrayIcon.new({
  icon: icon,
  menu,
  menuOnLeftClick: true,
});
