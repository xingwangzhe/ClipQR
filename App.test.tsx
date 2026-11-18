import { expect, open, test } from "nsh/test";

test("shows the QR scanning workspace and privacy copy", async () => {
  const app = await open("./App.tsx");
  expect(app.texts()).toContain("Decode the moment.");
  expect(app.texts()).toContain("Read the latest image");
  expect(app.texts()).toContain("Browse local images");
  expect(app.texts()).toContain("Drop an image into the window to scan it");
});

test("follows the selected system language", async () => {
  const app = await open("./App.tsx", { locale: "zh-CN" });
  expect(app.texts()).toContain("解码每个瞬间。");
  expect(app.texts()).toContain("允许拖拽图片进入窗口识别");
});

test("lets the user change the app language", async () => {
  const app = await open("./App.tsx", { locale: "en-US" });
  await app.press("English⌄");
  await app.press("简体中文");
  expect(app.texts()).toContain("解码每个瞬间。");
});

test("offers only Light and Dark app themes", async () => {
  const app = await open("./App.tsx");
  await app.press("Dark⌄");
  expect(app.texts()).toContain("Light");
  expect(app.texts()).toContain("Dark");
  expect(app.texts()).not.toContain("Catppuccin Mocha");
  await app.press("Light");
  expect(app.texts()).toContain("Light⌄");
});

test("shows app information from the About button", async () => {
  const app = await open("./App.tsx", { locale: "en-US" });
  await app.press("About ClipQR");
  expect(app.texts()).toContain("xingwangzhe");
  expect(app.texts()).toContain("github.com/xingwangzhe/ClipQR ↗");
  expect(app.texts()).toContain("clipqr.needhelp.icu ↗");
  expect(app.texts()).toContain("ClipQR · v1.0.0");
});
