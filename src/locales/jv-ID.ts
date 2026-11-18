import enUS from './en-US'

export default {
  ...enUS,
  app: { ...enUS.app, eyebrow: 'Piranti QR desktop', title: 'Waca kode QR.', titleAccent: 'Terusake kegiyatan.', website: 'Situs web', inputLabel: 'Pilih sumber', dropHint: 'Utawa selehake gambar ing endi wae', clipboardMeta: 'Waca gambar paling anyar', fileMeta: 'Pilih gambar lokal', working: 'Nggoleki kode QR…', resultLabel: 'Asil maca', ready: 'Wis siap', copied: 'Wis disalin', copyResult: 'Salin asil', footer: 'Cepet, pribadi, lan diproses ing piranti iki', desc: 'Selehake gambar kode QR utawa waca saka clipboard', dropIndicator: 'Gambar bisa diseret menyang jendhela kanggo diwaca', version: 'v1.0.0', aboutTitle: 'Babagan ClipQR', author: 'Panganggit', repository: 'Repositori' },
  notice: { decoded: 'Kode QR kasil diwaca', noQr: 'Ora ana kode QR ing gambar iki', failed: 'Input iki ora bisa diwaca', copied: 'Asil wis disalin menyang clipboard' },
  fileButton: { selectFile: 'Pilih berkas', result: 'Asil:', copied: 'Wis disalin', copy: 'Salin', noQr: 'Kode QR ora ditemokake', parseFailed: 'Gagal maca', dialogFilter: 'Gambar' },
  readPaste: { readClipboard: 'Waca clipboard', result: 'Asil:', copied: 'Wis disalin', copy: 'Salin', failed: 'Gagal maca, ora ana gambar ing clipboard' },
  dragDrop: { dropToParse: 'Copot gambar kanggo miwiti maca' },
  appMain: { noQrFound: 'Kode QR ora ditemokake', result: 'Asil:', copied: 'Wis disalin!', copy: 'Salin' },
  tray: { showWindow: 'Tuduhake jendhela utama', readClipboard: 'Waca kode QR saka clipboard', quit: 'Metu sakabehe' },
}
