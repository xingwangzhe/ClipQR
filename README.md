# ClipQR - Quick QR Code Parser

[English](#english) | [中文](#chinese)

---

<h2 id="english">English</h2>

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

---

<h2 id="chinese">中文</h2>

[https://clipqr.needhelp.icu/](https://clipqr.needhelp.icu/)

![应用截图](https://clipqr.needhelp.icu/%E5%BA%94%E7%94%A8%E6%88%AA%E5%9B%BE.png)

https://github.com/user-attachments/assets/22056d1a-0862-4003-976c-2522bfb05c1c

ClipQR 是一个跨平台桌面二维码解析应用，基于 Tauri + Vue 3 开发，可以快速读取剪贴板和本地图片中的二维码内容。

## 功能

- **剪贴板直读**：直接读取剪贴板中的图片，一键解析二维码
- **本地文件**：支持从本地图片文件解析二维码
- **拖拽解析**：拖拽图片文件到窗口直接解析
- **一键复制**：点击复制解析结果到剪贴板
- **自动打开链接**：识别到 URL 自动在浏览器打开
- **支持多种协议**：http/https、file、mailto 等
- **系统托盘**：最小化到系统托盘，随时可用
- **跨平台**：支持 Windows、macOS、Linux

## 技术栈

- **前端**：Vue 3 + TypeScript + Vite + Tailwind CSS
- **后端**：Rust + Tauri 2
- **二维码解析**：bardecoder (基于 zxing，Rust 原生)
- **图片处理**：image crate

## 下载安装

从 [Releases](https://github.com/xingwangzhe/ClipQR/releases) 页面下载对应平台的最新版本。

### 手动编译

需要提前安装：
- Rust 开发环境
- Bun（参考 [Bun 官方文档](https://bun.sh/docs/installation)）
- Tauri 系统依赖（参考 [Tauri 环境设置](https://tauri.app/start/prerequisites/)）

编译步骤：

```bash
git clone https://github.com/xingwangzhe/ClipQR.git
cd ClipQR
bun install
bun run tauri build
```

## 使用说明

1. **剪贴板读取**：截图或复制包含二维码的图片到剪贴板，点击"读取剪贴板"或托盘菜单，自动解析
2. **本地文件**：点击"选择本地图片文件"，选择图片文件后解析
3. **拖拽**：直接将图片文件拖到应用窗口，自动解析
4. 如果解析结果是 URL，会自动在浏览器打开
5. 关闭窗口会最小化到系统托盘，完全退出需要从托盘菜单选择"完全退出"

## 使用场景

- 解析电脑截图中的二维码，不需要手机
- 从保存的二维码图片中提取链接或文本
- 开发过程中验证生成的二维码
- 从文档或网页截图中提取二维码信息

## 项目结构

```
src/              # 前端代码
  components/      # Vue 组件
  utils/           # 工具函数
  App.vue          # 根组件
  main.ts          # 入口文件
src-tauri/        # Rust 后端
  src/
    lib.rs         # 二维码解析逻辑
  Cargo.toml       # 依赖配置
  tauri.conf.json  # Tauri 配置
```

## 捐赠支持

如果这个项目对你有帮助，欢迎请作者喝杯咖啡 ☕

| 微信支付 | 支付宝 |
|:-------:|:------:|
| ![微信支付](https://xingwangzhe.fun/wechat_pay.webp) | ![支付宝](https://xingwangzhe.fun/ali_pay.webp) |

## 贡献

欢迎提交 Issue 和 Pull Request。

## 许可证

MIT License
