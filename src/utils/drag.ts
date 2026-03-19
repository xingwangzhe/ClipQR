import { listen } from '@tauri-apps/api/event'
import { parseFile, processQrContent } from './qr'

export interface DragListeners {
  onResult: (result: string | null) => void
  onDragStateChange: (isDragging: boolean) => void
}

/**
 * 初始化文件拖拽监听
 * 返回清理函数数组
 */
export async function initFileDrop({
  onResult,
  onDragStateChange
}: DragListeners): Promise<Array<() => void>> {
  const unlistens: Array<() => void> = []

  unlistens.push(await listen('tauri://drag-drop', async (event) => {
    onDragStateChange(false)
    const { paths } = event.payload as { paths: string[] }
    if (paths.length === 0) return

    const filePath = paths[0]
    console.log('📦 拖拽文件路径:', filePath)

    try {
      const result = await parseFile(filePath)
      if (result) {
        processQrContent(result)
      }
      onResult(result)
    } catch (e) {
      console.error('❌ 解析失败:', e)
      onResult('解析失败: ' + e)
    }
  }))

  unlistens.push(await listen('tauri://drag-enter', () => {
    onDragStateChange(true)
  }))

  unlistens.push(await listen('tauri://drag-leave', () => {
    onDragStateChange(false)
  }))

  return unlistens
}
