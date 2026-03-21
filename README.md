# ClipQR 📱 - 快捷二维码解析工具

[https://clipqr.needhelp.icu/](https://clipqr.needhelp.icu/)



一个基于 Tauri + Vue 3 开发的跨平台桌面二维码解析应用，快速读取剪贴板和本地图片中的二维码内容。

## ✨ 功能特性

- 📋 **剪贴板直读**：直接读取剪贴板中的图片，一键解析二维码
- 📁 **本地文件**：支持从本地图片文件中解析二维码
- 🖱️ **拖拽解析**：支持拖拽图片文件到窗口直接解析
- 🚀 **快速响应**：使用 Rust 高性能解析，瞬间出结果
- 📎 **一键复制**：点击即可复制解析结果到剪贴板
- 🌐 **自动打开链接**：识别到 URL 自动打开浏览器
- 📂 **支持多种协议**：支持 http/https、file、mailto 等常见协议
- 🧩 **系统托盘**：最小化到系统托盘，随时随地快捷调用
- 🎯 **跨平台**：支持 Windows、macOS、Linux

## 🛠️ 技术栈

- **前端**：Vue 3 + TypeScript + Vite + Tailwind CSS
- **后端**：Rust + Tauri 2
- **二维码解析**：rqrr (Rust)
- **图片处理**：image crate

## 📦 下载安装

你可以从 [Releases](https://github.com/xingwangzhe/ClipQR/releases) 页面下载对应平台的最新版本安装包。

### 手动编译

**前提条件**：
- Rust 开发环境
- Node.js 18+ 或 Bun
- 系统依赖（参考 [Tauri 环境设置](https://tauri.app/start/prerequisites/)）

**编译步骤**：

```bash
# 克隆项目
git clone https://github.com/xingwangzhe/ClipQR.git
cd ClipQR

# 安装依赖
bun install

# 开发模式
bun run dev

# 生产构建
bun run build
```

## 🎮 使用方法

| 使用方式 | 操作步骤 |
|---------|---------|
| **剪贴板读取** | 1. 截图或复制包含二维码的图片到剪贴板<br>2. 点击「读取剪贴板二维码」按钮或托盘菜单选项<br>3. 自动解析，点击复制按钮将结果复制到剪贴板 |
| **本地文件** | 1. 点击「选择本地图片文件」按钮<br>2. 选择包含二维码的图片文件<br>3. 获取解析结果 |
| **拖拽解析** | 直接将图片文件拖拽到应用窗口，自动解析 |

## 🎯 使用场景

- 快捷解析截图中的二维码，无需打开手机
- 保存二维码图片后快速提取内容
- 开发过程中快速验证生成的二维码
- 提取文档或网页截图中的二维码信息

## ⚙️ 行为说明

- 关闭窗口：应用会最小化到系统托盘，不会退出
- 退出程序：请点击系统托盘菜单中的「退出」选项

## 📝 项目结构

```
├── src/                  # 前端代码
│   ├── components/       # Vue 组件
│   ├── utils/            # 工具函数
│   ├── App.vue           # 根组件
│   └── main.ts           # 入口文件
├── src-tauri/            # Rust 后端
│   ├── src/
│   │   ├── lib.rs        # 核心二维码解析逻辑
│   │   └── main.rs       # 应用入口
│   └── tauri.conf.json   # Tauri 配置
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 👨‍💻 作者

xingwangzhe
