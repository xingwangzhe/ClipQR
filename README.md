# ClipQR

Cross-platform QR reader built with [Native Shell](https://nsh.dev/). Decode QR codes from the clipboard, an image file, or a dragged image. Decoding runs on-device.

[Website](https://clipqr.needhelp.icu/) · [Releases](https://github.com/xingwangzhe/ClipQR/releases)

![ClipQR running on GNOME](https://clipqr.needhelp.icu/%E5%BA%94%E7%94%A8%E6%88%AA%E5%9B%BE.png)

## Features

- Read QR codes from clipboard images, local images, and dragged files.
- Copy decoded text or open safe HTTP and HTTPS links.
- Keep ClipQR available from the system tray and use `Ctrl/⌘ + Shift + V` to read the clipboard.
- Linux releases include `.deb`, `.rpm`, and `.AppImage` packages with desktop launchers and app icons. GNOME tray display requires the AppIndicator extension.
- Choose Light or Dark in the app. Dark is the default; the website stays dark.
- Follow the system language or choose from 21 app languages.
- Build for Linux, macOS, Windows, iOS, Android, and Web with Native Shell.

## Build and verify

Install [Native Shell](https://nsh.dev/zh-CN/) and [Bun](https://bun.sh/), then run:

```sh
nsh check App.tsx
nsh test App.test.tsx
nsh build App.tsx --release
```

After editing app translation sources, run `bun run sync:i18n` to update the bundled NSH catalog.

Build the React website with Vite:

```sh
cd site
bun install --frozen-lockfile
bun run build
```

Package for desktop:

```sh
bun run package:linux
bun run package:macos
bun run package:windows
```

## CI and releases

- `.github/workflows/nsh-ci.yml` runs NSH type checks, app tests, release builds, and locale checks.
- `.github/workflows/vite-ci.yml` installs the website lockfile, builds with Vite, and checks translations.
- `.github/workflows/release.yml` packages the supported platforms and publishes GitHub Releases for version tags such as `v1.0.0`.
- Linux `.deb` and `.rpm` packages declare GTK 4 and WebKitGTK 6 runtime dependencies; the AppImage also relies on those system libraries.

## Project layout

```text
App.tsx                  Native Shell app
App.test.tsx             Native Shell UI tests
src/lib.rs               Local QR decoding module
src/locales/             App translation sources
locales/clipqr.json      NSH translations bundled with the app
site/                    React + Vite website
.github/workflows/       NSH, Vite, and release workflows
```

## License

MIT
