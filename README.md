# ClipQR - Quick QR Code Parser

[English](README.md) | [中文](README.zh-CN.md)

---

[https://clipqr.needhelp.icu/](https://clipqr.needhelp.icu/)

![App Screenshot](https://clipqr.needhelp.icu/%E5%BA%94%E7%94%A8%E6%88%AA%E5%9B%BE.png)

https://github.com/user-attachments/assets/22056d1a-0862-4003-976c-2522bfb05c1c

ClipQR is a cross-platform desktop QR code parsing application built with Tauri + Vue 3. It can quickly read QR code content from clipboard and local images.

## Features

- **Clipboard Direct Read**: Read images directly from clipboard and parse QR codes with one click
- **Local Files**: Support parsing QR codes from local image files
- **Drag & Drop**: Drag and drop image files to the window for instant parsing
- **One-click Copy**: Click to copy parsing results to clipboard
- **Auto Open Links**: Automatically open URLs in browser when detected
- **Multiple Protocol Support**: http/https, file, mailto, etc.
- **System Tray**: Minimize to system tray, always available
- **Cross-platform**: Support Windows, macOS, Linux

## Tech Stack

- **Frontend**: Vue 3 + TypeScript + Vite + Tailwind CSS
- **Backend**: Rust + Tauri 2
- **QR Code Parsing**: bardecoder (based on zxing, Rust native)
- **Image Processing**: image crate

## Download & Installation

Download the latest version for your platform from the [Releases](https://github.com/xingwangzhe/ClipQR/releases) page.

### Manual Build

Prerequisites:
- Rust development environment
- Bun (refer to [Bun Official Docs](https://bun.sh/docs/installation))
- Tauri system dependencies (refer to [Tauri Prerequisites](https://tauri.app/start/prerequisites/))

Build steps:

```bash
git clone https://github.com/xingwangzhe/ClipQR.git
cd ClipQR
bun install
bun run tauri build
```

## Usage

1. **Clipboard Read**: Screenshot or copy an image containing a QR code to clipboard, click "Read Clipboard" or use the tray menu to auto-parse
2. **Local File**: Click "Select Local Image File" and select an image file to parse
3. **Drag & Drop**: Drag and drop image files directly into the application window for auto-parsing
4. If the parsing result is a URL, it will automatically open in the browser
5. Closing the window minimizes to the system tray; to fully exit, select "Exit" from the tray menu

## Use Cases

- Parse QR codes from computer screenshots without needing a phone
- Extract links or text from saved QR code images
- Validate generated QR codes during development
- Extract QR code information from documents or webpage screenshots

## Project Structure

```
src/              # Frontend code
  components/      # Vue components
  utils/           # Utility functions
  App.vue          # Root component
  main.ts          # Entry file
src-tauri/        # Rust backend
  src/
    lib.rs         # QR code parsing logic
  Cargo.toml       # Dependency configuration
  tauri.conf.json  # Tauri configuration
```

## Donate

If this project has been helpful to you, feel free to buy the author a coffee ☕

| WeChat Pay | Alipay |
|:----------:|:------:|
| ![WeChat Pay](https://xingwangzhe.fun/wechat_pay.webp) | ![Alipay](https://xingwangzhe.fun/ali_pay.webp) |

## Contributing

Issues and Pull Requests are welcome.

## License

MIT License
