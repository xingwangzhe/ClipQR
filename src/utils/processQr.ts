import { invoke } from '@tauri-apps/api/core'
import { openUrl } from '@tauri-apps/plugin-opener'

export async function processQrContent(qrText: string | null) {
  if (!qrText) {
    return
  }
  const trimmedText = qrText.trim()

  if (trimmedText.startsWith('/') || /^[A-Za-z]:[\\/]/.test(trimmedText)) {
    const fileQrText = await invoke<string | null>('decode_qr_from_file', { path: trimmedText })
    await processQrContent(fileQrText)
    return
  }

  try {
    new URL(trimmedText)
    if (trimmedText.startsWith('file://')) {
      const filePath = decodeURIComponent(new URL(trimmedText).pathname)
      const fileQrText = await invoke<string | null>('decode_qr_from_file', { path: filePath })
      await processQrContent(fileQrText)
    } else {
      try {
        await openUrl(trimmedText)
      } catch (e) {
        // ignore
      }
    }
  } catch {
    if (trimmedText.includes('://')) {
      try {
        await openUrl(trimmedText)
      } catch (e) {
        // ignore
      }
    }
  }
}
