# ClipQR

ClipQR 使用 [Native Shell](https://nsh.dev/zh-CN/) 构建，支持多个桌面与移动平台。可从剪贴板、本地图片或拖入窗口的图片中读取二维码。解码在设备本地完成。

[网站](https://clipqr.needhelp.icu/) · [发行版本](https://github.com/xingwangzhe/ClipQR/releases)

![ClipQR 在 GNOME 中运行](https://clipqr.needhelp.icu/%E5%BA%94%E7%94%A8%E6%88%AA%E5%9B%BE.png)

## 功能

- 读取剪贴板图片、本地图片和拖入窗口的图片中的二维码。
- 复制解析结果，或安全地打开 HTTP、HTTPS 链接。
- 使用系统托盘快速访问；按 `Ctrl/⌘ + Shift + V` 读取剪贴板。
- 提供 14 种应用主题，默认 Dark；网站固定使用暗色主题。
- 默认跟随系统语言，也可从 21 种应用语言中选择。
- 使用 Native Shell 构建 Linux、macOS、Windows、iOS、Android 和 Web 版本。

## 构建与验证

安装 [Native Shell](https://nsh.dev/zh-CN/) 和 [Bun](https://bun.sh/)，然后运行：

```sh
nsh check App.tsx
nsh test App.test.tsx
nsh build App.tsx --release
```

修改应用语言源文件后，运行 `bun run sync:i18n` 更新随应用打包的 NSH 语言文件。

使用 Vite 构建 React 网站：

```sh
cd site
bun install --frozen-lockfile
bun run build
```

打包桌面版本：

```sh
bun run package:linux
bun run package:macos
bun run package:windows
```

## CI 与发行

- `.github/workflows/nsh-ci.yml` 执行 NSH 类型检查、应用测试、发布构建和语言文件检查。
- `.github/workflows/vite-ci.yml` 安装网站锁文件依赖，运行 Vite 构建和翻译检查。
- `.github/workflows/release.yml` 为支持的平台打包，并在推送 `v1.0.0` 等版本标签后发布 GitHub Release。

## 项目结构

```text
App.tsx                  Native Shell 应用
App.test.tsx             Native Shell 界面测试
src/lib.rs               本地二维码解码模块
src/locales/             应用翻译源文件
locales/clipqr.json      随应用打包的 NSH 翻译
site/                    React + Vite 网站
.github/workflows/       NSH、Vite 和发行工作流
```

## 许可证

MIT
