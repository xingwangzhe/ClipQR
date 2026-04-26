import { Menu } from '@tauri-apps/api/menu'
import { TrayIcon } from '@tauri-apps/api/tray'
import { platform } from '@tauri-apps/plugin-os'
import { readImage, readText } from '@tauri-apps/plugin-clipboard-manager'
import { exit } from '@tauri-apps/plugin-process'
import { invoke } from '@tauri-apps/api/core'
import { resolveResource } from '@tauri-apps/api/path'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { t } from './i18n'
import { processQrContent } from './utils/processQr'

const appWindow = getCurrentWindow()
let existingTrayId: string | undefined

async function buildMenu() {
  return Menu.new({
    items: [
      {
        id: 'show_window',
        text: t('tray.showWindow'),
        action: async () => {
          await appWindow.show()
          await appWindow.unminimize()
          await appWindow.setFocus()
        }
      },
      {
        id: 'read_clipboard',
        text: t('tray.readClipboard'),
        action: async () => {
          try {
            const image = await readImage()
            const { width, height } = await image.size()
            const rgbaData = await image.rgba()

            const qrText = await invoke<string | null>('decode_qr', {
              rgba: Array.from(rgbaData),
              width,
              height
            })
            await processQrContent(qrText)
          } catch (e) {
            try {
              const text = await readText()
              if (!text) return
              const trimmedText = text.trim()

              let filePath: string | null = null
              if (trimmedText.startsWith('file://')) {
                filePath = decodeURIComponent(new URL(trimmedText).pathname)
              } else if (trimmedText.startsWith('/') || /^[A-Za-z]:[\\/]/.test(trimmedText)) {
                filePath = trimmedText
              }

              if (filePath) {
                const qrText = await invoke<string | null>('decode_qr_from_file', { path: filePath })
                await processQrContent(qrText)
              } else {
                await processQrContent(trimmedText)
              }
            } catch (textErr) {
              // ignore
            }
          }
        }
      },
      {
        id: 'quit',
        text: t('tray.quit'),
        action: async () => { await exit(0) }
      },
    ],
  })
}

export async function initTray() {
  const menu = await buildMenu()
  const currentPlatform = platform()
  let iconPath = 'icons/icon.png'
  if (currentPlatform === 'windows') {
    iconPath = 'icons/icon.ico'
  }
  const resolvedIconPath = await resolveResource(iconPath)

  if (existingTrayId !== undefined) {
    await TrayIcon.removeById(existingTrayId)
  }

  const tray = await TrayIcon.new({
    icon: resolvedIconPath,
    menu,
    menuOnLeftClick: true,
  })
  existingTrayId = tray.id
}

export async function rebuildTray() {
  if (existingTrayId !== undefined) {
    await TrayIcon.removeById(existingTrayId)
    existingTrayId = undefined
  }
  await initTray()
}
