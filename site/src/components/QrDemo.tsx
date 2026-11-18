import { useRef, useState, type ChangeEvent, type DragEvent } from 'react'
import jsQR from 'jsqr'
import { useLocale } from '../i18n'

type Status = 'idle' | 'dragging' | 'decoding' | 'empty' | 'error'

function decodeImage(file: Blob): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const image = new Image()
    image.onload = () => {
      URL.revokeObjectURL(url)
      const canvas = document.createElement('canvas')
      canvas.width = image.naturalWidth; canvas.height = image.naturalHeight
      const context = canvas.getContext('2d', { willReadFrequently: true })
      if (!context) { reject(new Error('Canvas unavailable')); return }
      context.drawImage(image, 0, 0)
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height)
      resolve(jsQR(pixels.data, pixels.width, pixels.height)?.data ?? null)
    }
    image.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Image unavailable')) }
    image.src = url
  })
}

export default function QrDemo() {
  const { t } = useLocale()
  const input = useRef<HTMLInputElement>(null)
  const [result, setResult] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [copied, setCopied] = useState(false)
  async function parse(file: Blob) {
    setStatus('decoding'); setCopied(false)
    try {
      const decoded = await decodeImage(file)
      if (!decoded) { setResult(''); setStatus('empty'); return }
      setResult(decoded); setStatus('idle')
    } catch (error) { console.error(error); setResult(''); setStatus('error') }
  }
  async function readClipboard() {
    try {
      if (navigator.clipboard?.read) {
        const items = await navigator.clipboard.read()
        for (const item of items) {
          const type = item.types.find((entry) => entry.startsWith('image/'))
          if (type) { await parse(await item.getType(type)); return }
        }
      }
      const text = await navigator.clipboard?.readText()
      if (text?.trim()) { setResult(text.trim()); setStatus('idle') } else setStatus('empty')
    } catch (error) { console.error(error); setStatus('error') }
  }
  async function onFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0]
    if (file) await parse(file)
    event.currentTarget.value = ''
  }
  async function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault(); const file = event.dataTransfer.files[0]
    if (file) await parse(file); else setStatus('empty')
  }
  async function copyResult() {
    if (!result) return
    await navigator.clipboard.writeText(result); setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }
  const isUrl = (() => { try { const url = new URL(result); return url.protocol === 'https:' || url.protocol === 'http:' } catch { return false } })()
  const statusText = status === 'decoding' ? t('demo.decoding') : status === 'dragging' ? t('demo.drop') : result ? t('demo.ready') : t('demo.waiting')
  return <div className={`qr-demo ${status === 'dragging' ? 'is-dragging' : ''}`} onDragOver={(event) => { event.preventDefault(); setStatus('dragging') }} onDragLeave={() => setStatus('idle')} onDrop={onDrop}>
    <div className="qr-demo-head"><div><span className="demo-kicker">CLIPQR / BROWSER DEMO</span><h3>{t('demo.workspaceTitle')}</h3></div><span className={`demo-status ${status}`}>{statusText}</span></div>
    <div className="qr-demo-actions"><button className="demo-action primary" onClick={readClipboard}><strong>⌁</strong><span>{t('demo.clipboard')}<small>{t('demo.clipboardMeta')}</small></span></button><button className="demo-action" onClick={() => input.current?.click()}><strong>＋</strong><span>{t('demo.file')}<small>{t('demo.fileMeta')}</small></span></button></div>
    <input ref={input} className="sr-only" type="file" accept="image/*" onChange={onFile} />
    {status === 'dragging' && <div className="qr-drop-state">↓ {t('demo.drop')}</div>}{status === 'decoding' && <div className="qr-processing"><i />{t('demo.decoding')}</div>}{status === 'empty' && <div className="qr-message">{t('demo.noQr')}</div>}{status === 'error' && <div className="qr-message error">{t('demo.failed')}</div>}
    {result && <div className="qr-result"><div className="qr-result-top"><span>{t('demo.result')}</span><button onClick={copyResult}>{copied ? t('demo.copied') : t('demo.copy')}</button></div><p>{result}</p>{isUrl && <a href={result} target="_blank" rel="noreferrer">{t('demo.openLink')} ↗</a>}</div>}
  </div>
}
