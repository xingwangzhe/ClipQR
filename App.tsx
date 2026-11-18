import { Clipboard, Picker, Scroll, Text, View, Image, signal, nativeModule, mount, keymap, openUrl, setColorScheme, locale, Storage, effect } from "nsh";
import { Tray, Window, isAvailable } from "nsh/desktop";
import { availableLocales, setLocale, t } from "nsh/i18n";
import appIcon from "./site/public/clipqr-icon.png";

const { Qr } = nativeModule<{ Qr: { decode(bytes: Uint8Array): string | null; decodeFile(path: string): string | null } }>("clipqr/native");

type State = "idle" | "working" | "ready" | "empty" | "error";
type Theme = { name: string; mode: "dark" | "light"; page: string; surface: string; raised: string; border: string; text: string; muted: string; accent: string; accentBg: string; accentText: string; accentBorder: string };
const themes: Theme[] = [
  { name: "Dark", mode: "dark", page: "bg-[#202127]", surface: "bg-[#292b32]", raised: "bg-[#333640]", border: "border-[#444854]", text: "text-[#f0f1f5]", muted: "text-[#a8adbb]", accent: "text-[#8ea5ff]", accentBg: "bg-[#8ea5ff]", accentText: "text-[#171923]", accentBorder: "border-[#8ea5ff]" },
  { name: "Light", mode: "light", page: "bg-[#f3f4f7]", surface: "bg-white", raised: "bg-[#e8eaf0]", border: "border-[#d5d8e0]", text: "text-[#242630]", muted: "text-[#656b7a]", accent: "text-[#526de5]", accentBg: "bg-[#526de5]", accentText: "text-white", accentBorder: "border-[#526de5]" },
];
const languageNames: Record<string, string> = { ar: "العربية", "bn-BD": "বাংলা", "de-DE": "Deutsch", "en-US": "English", "es-ES": "Español", "fr-FR": "Français", "hi-IN": "हिन्दी", "it-IT": "Italiano", "ja-JP": "日本語", "jv-ID": "Basa Jawa", "ko-KR": "한국어", "mr-IN": "मराठी", "pa-IN": "ਪੰਜਾਬੀ", "pt-BR": "Português", "ru-RU": "Русский", "te-IN": "తెలుగు", "tr-TR": "Türkçe", "ur-PK": "اردو", "vi-VN": "Tiếng Việt", "zh-CN": "简体中文", "zh-TW": "繁體中文" };
const selectedTheme = signal("Dark");
const themeMenuOpen = signal(false);
const languageMenuOpen = signal(false);
const aboutOpen = signal(false);
Storage.getItem("locale").then((saved) => { if (saved && availableLocales().includes(saved)) setLocale(saved); });
Storage.getItem("theme").then((saved) => { const theme = themes.find((item) => item.name === saved); if (theme) { selectedTheme.set(theme.name); setColorScheme(theme.mode); } });
const value = signal("");
const state = signal<State>("idle");
const copied = signal(false);
const dragging = signal(false);
const autoOpenLinks = signal(false);
Storage.getItem("autoOpenLinks").then((saved) => autoOpenLinks.set(saved === "true"));

function decodeFileUri(uri: string) {
  const path = decodeURIComponent(new URL(uri).pathname);
  return /^\/[A-Za-z]:\//.test(path) ? path.slice(1) : path;
}
async function showResult(text: string) {
  value.set(text);
  state.set(text ? "ready" : "empty");
  if (autoOpenLinks() && isHttpUrl(text)) {
    try { await openUrl(text); } catch (error) { console.error("Could not open decoded link", error); }
  }
}
async function decodeFile(file: Blob) {
  state.set("working");
  try {
    const text = Qr.decode(new Uint8Array(await file.arrayBuffer())) ?? "";
    await showResult(text);
  } catch (error) { console.error(error); value.set(""); state.set("error"); }
}
async function decodePath(path: string) {
  state.set("working");
  try {
    const text = Qr.decodeFile(path) ?? "";
    await showResult(text);
  } catch (error) { console.error(error); state.set("error"); }
}
async function acceptText(text: string) {
  const trimmed = text.trim();
  if (!trimmed) { value.set(""); state.set("empty"); return; }
  if (trimmed.startsWith("file://")) return decodePath(decodeFileUri(trimmed));
  if (trimmed.startsWith("/") || /^[A-Za-z]:[\\/]/.test(trimmed)) return decodePath(trimmed);
  await showResult(trimmed);
}
async function readClipboard() {
  state.set("working");
  try {
    let image = null;
    try { image = await Clipboard.readImage(); } catch (error) { console.warn("Clipboard image read failed; trying files and text", error); }
    if (image) {
      try {
        const response = await fetch(image.url);
        if (!response.ok) throw new Error(`Could not read clipboard image: ${response.status}`);
        const bytes = new Uint8Array(await response.arrayBuffer());
        const text = Qr.decode(bytes) ?? "";
        if (text) { await showResult(text); return; }
      } catch (error) { console.warn("Clipboard image decode failed; trying files and text", error); }
    }
    let files: string[] = [];
    try { files = await Clipboard.readFiles(); } catch (error) { console.warn("Clipboard file read failed; trying text", error); }
    for (const uri of files) {
      const path = decodeFileUri(uri);
      const text = Qr.decodeFile(path) ?? "";
      if (text) { await showResult(text); return; }
    }
    await acceptText(await Clipboard.readText());
  } catch (error) { console.error(error); value.set(""); state.set("error"); }
}
async function chooseFile() {
  try {
    const [picked] = await Picker.pickFiles({ filters: [{ name: "Images", extensions: ["png", "jpg", "jpeg", "webp", "gif", "bmp"] }] });
    if (picked?.file) await decodeFile(picked.file);
  } catch (error) { console.error(error); state.set("error"); }
}
function isHttpUrl(text: string) {
  try { const url = new URL(text); return url.protocol === "http:" || url.protocol === "https:"; } catch { return false; }
}
function App() {
  const win = Window.get("main");
  if (isAvailable) {
    win?.on("closePress", () => win.hide());
    keymap.bind("mod+shift+v", readClipboard);
    effect(() => Tray.set({ icon: appIcon, tooltip: "ClipQR", onClick: () => win?.focus(), menu: [
        { label: t("tray.showWindow"), onSelect: () => win?.focus() },
        { label: t("tray.readClipboard"), onSelect: async () => { await readClipboard(); win?.focus(); } },
        { label: t("app.aboutTitle"), onSelect: () => { win?.focus(); aboutOpen.set(true); } },
        { type: "separator" },
        { role: "quit" },
      ] }));
  }
  return (
  <View onFileDragEnter={() => dragging.set(true)} onFileDragLeave={() => dragging.set(false)} onFileDrop={async ({ uris }) => { dragging.set(false); if (uris[0]) await decodePath(decodeFileUri(uris[0])); }} class="flex-1 bg-[#f3f4f7] p-7 dark:bg-[#202127]">
      <View class="relative z-50 flex-row items-center justify-between">
        <View class="flex-row items-center gap-3"><Image src={appIcon} class="h-[30px] w-[30px]" /><Text class="text-[15px] font-semibold text-[#242630] dark:text-[#f0f1f5]">ClipQR</Text></View>
        <View class="flex-row items-center gap-2">
          <View onPress={() => aboutOpen.set(true)} role="button" class="rounded-lg border border-[#d5d8e0] bg-white px-3 py-2 dark:border-[#444854] dark:bg-[#292b32]"><Text class="text-[11px] text-[#242630] dark:text-[#f0f1f5]">{t("app.aboutTitle")}</Text></View>
          <View class="relative">
            <View onPress={() => { languageMenuOpen.set(!languageMenuOpen()); themeMenuOpen.set(false); }} role="button" class="flex-row items-center gap-2 rounded-lg border border-[#d5d8e0] bg-white px-3 py-2 dark:border-[#444854] dark:bg-[#292b32]"><Text class="text-[11px] text-[#242630] dark:text-[#f0f1f5]">{languageNames[locale()] ?? locale()}⌄</Text></View>
            <If when={languageMenuOpen()}><View class="absolute right-0 top-10 z-20 w-[220px] rounded-xl border border-[#d5d8e0] bg-white p-2 shadow-xl dark:border-[#444854] dark:bg-[#292b32]">
              <Text class="px-2 py-2 text-[10px] font-bold tracking-[2px] text-[#656b7a] dark:text-[#a8adbb]">{t("app.languageMenu")}</Text>
              <Scroll class="h-[300px]"><View><Each of={availableLocales()}>{(code) => { const language = code(); return <View onPress={() => { setLocale(language); Storage.setItem("locale", language); languageMenuOpen.set(false); }} role="button" class="flex-row items-center justify-between rounded-lg px-2 py-2" classList={{ "bg-[#e8eaf0] dark:bg-[#333640]": locale() === language }}><Text class="text-[12px] text-[#242630] dark:text-[#f0f1f5]">{languageNames[language] ?? language}</Text><If when={locale() === language}><Text class="text-[#526de5] dark:text-[#8ea5ff]">✓</Text></If></View> }}</Each></View></Scroll>
            </View></If>
          </View>
          <View class="relative">
            <View onPress={() => { themeMenuOpen.set(!themeMenuOpen()); languageMenuOpen.set(false); }} role="button" class="flex-row items-center gap-2 rounded-lg border border-[#d5d8e0] bg-white px-3 py-2 dark:border-[#444854] dark:bg-[#292b32]"><View class="size-[9px] rounded-full bg-[#526de5] dark:bg-[#8ea5ff]" /><Text class="text-[11px] text-[#242630] dark:text-[#f0f1f5]">{selectedTheme()}⌄</Text></View>
            <If when={themeMenuOpen()}><View class="absolute right-0 top-10 z-20 w-[160px] rounded-xl border border-[#d5d8e0] bg-white p-2 shadow-xl dark:border-[#444854] dark:bg-[#292b32]">
              <Scroll class="h-[88px]"><View><Each of={themes}>{(choice) => { const option = choice(); return <View onPress={() => { selectedTheme.set(option.name); setColorScheme(option.mode); Storage.setItem("theme", option.name); themeMenuOpen.set(false); }} role="button" class="flex-row items-center gap-3 rounded-lg px-2 py-2" classList={{ "bg-[#e8eaf0] dark:bg-[#333640]": selectedTheme() === option.name }}><If when={option.name === "Dark"}><View class="size-5 rounded border border-[#444854] bg-[#202127]" /></If><If when={option.name === "Light"}><View class="size-5 rounded border border-[#d5d8e0] bg-white" /></If><Text class="flex-1 text-[11px] text-[#242630] dark:text-[#f0f1f5]">{option.name}</Text><If when={selectedTheme() === option.name}><Text class="text-[#526de5] dark:text-[#8ea5ff]">✓</Text></If></View> }}</Each></View></Scroll>
            </View></If>
          </View>
        </View>
      </View>
      <View class="mt-12 mb-7">
        <Text class="text-[12px] font-semibold tracking-[2px] text-[#526de5] dark:text-[#8ea5ff]">{t("app.eyebrow")}</Text>
        <Text class="mt-3 text-[38px] font-bold leading-tight text-[#242630] dark:text-[#f0f1f5]">{t("app.title")}</Text>
        <Text class="text-[38px] font-bold leading-tight text-[#242630] dark:text-[#f0f1f5]">{t("app.titleAccent")}</Text>
        <Text class="mt-3 max-w-[420px] text-[14px] leading-relaxed text-[#656b7a] dark:text-[#a8adbb]">{t("app.desc")}</Text>
      </View>
      <View class="rounded-2xl border border-[#d5d8e0] bg-white p-5 dark:border-[#444854] dark:bg-[#292b32]" classList={{ "border-[#526de5] dark:border-[#8ea5ff]": dragging() }}>
        <View class="flex-row items-center justify-between"><Text class="text-[11px] font-bold tracking-[2px] text-[#526de5] dark:text-[#8ea5ff]">{t("app.inputLabel")}</Text><Text class="text-[11px] text-[#656b7a] dark:text-[#a8adbb]">{dragging() ? t("app.dropIndicator") : "PNG · JPEG · WEBP · GIF · BMP"}</Text></View>
        <View class="mt-5 flex-row gap-3">
          <View onPress={readClipboard} role="button" class="flex-1 rounded-xl border border-[#526de5] bg-[#e8eaf0] px-4 py-4 transition-colors active:opacity-80 dark:border-[#8ea5ff] dark:bg-[#333640]"><Text class="text-[15px] font-semibold text-[#242630] dark:text-[#f0f1f5]">⌁　{t("readPaste.readClipboard")}</Text><Text class="mt-1 text-[11px] text-[#656b7a] dark:text-[#a8adbb]">{t("app.clipboardMeta")}</Text></View>
          <View onPress={chooseFile} role="button" class="flex-1 rounded-xl border border-[#d5d8e0] bg-[#e8eaf0] px-4 py-4 transition-colors active:opacity-80 dark:border-[#444854] dark:bg-[#333640]"><Text class="text-[15px] font-semibold text-[#242630] dark:text-[#f0f1f5]">＋　{t("fileButton.selectFile")}</Text><Text class="mt-1 text-[11px] text-[#656b7a] dark:text-[#a8adbb]">{t("app.fileMeta")}</Text></View>
        </View>
        <View onPress={() => { const next = !autoOpenLinks(); autoOpenLinks.set(next); Storage.setItem("autoOpenLinks", String(next)); }} role="switch" class="mt-4 flex-row items-center justify-between rounded-xl border border-[#d5d8e0] px-4 py-3 dark:border-[#444854]"><View><Text class="text-[12px] font-semibold text-[#242630] dark:text-[#f0f1f5]">{t("app.autoOpenLinks")}</Text><Text class="mt-1 text-[10px] text-[#656b7a] dark:text-[#a8adbb]">{t("app.autoOpenLinksDesc")}</Text></View><Text class="text-[12px] font-bold text-[#526de5] dark:text-[#8ea5ff]">{autoOpenLinks() ? "●" : "○"}</Text></View>
        <View onPress={chooseFile} role="button" class="mt-4 flex-row items-center justify-center gap-3 rounded-xl border border-dashed border-[#d5d8e0] px-4 py-4 dark:border-[#444854]" classList={{ "border-[#526de5] bg-[#e8eaf0] dark:border-[#8ea5ff] dark:bg-[#333640]": dragging() }}><Text class="text-[17px] text-[#526de5] dark:text-[#8ea5ff]">↓</Text><Text class="text-[12px] text-[#656b7a] dark:text-[#a8adbb]">{t("app.dropIndicator")}</Text></View>
        <If when={state() === "working"}><Text class="mt-4 text-[12px] text-[#526de5] dark:text-[#8ea5ff]">{t("app.working")}</Text></If>
        <If when={state() === "empty"}><Text class="mt-4 text-[12px] text-[#526de5] dark:text-[#8ea5ff]">{t("notice.noQr")}</Text></If>
        <If when={state() === "error"}><Text class="mt-4 text-[12px] text-[#d84a6a] dark:text-[#f38ba8]">{t("notice.failed")}</Text></If>
      </View>
      <If when={state() === "ready"}>
        <View class="mt-4 rounded-2xl border border-[#d5d8e0] bg-white p-5 dark:border-[#444854] dark:bg-[#292b32]">
          <View class="flex-row items-center justify-between"><Text class="text-[11px] font-bold tracking-[2px] text-[#526de5] dark:text-[#8ea5ff]">{t("app.resultLabel")}</Text><View onPress={async () => { await Clipboard.writeText(value()); copied.set(true); }} role="button" class="rounded-lg border border-[#d5d8e0] px-3 py-2 dark:border-[#444854]"><Text class="text-[12px] text-[#242630] dark:text-[#f0f1f5]">{copied() ? `${t("app.copied")} ✓` : t("app.copyResult")}</Text></View></View>
          <View selectable class="mt-4 rounded-lg bg-[#f3f4f7] p-4 dark:bg-[#202127]"><Text class="font-mono text-[13px] leading-relaxed text-[#242630] dark:text-[#f0f1f5]">{value()}</Text></View>
          <If when={isHttpUrl(value())}><View onPress={async () => { await openUrl(value()); }} role="button" class="mt-3 self-start rounded-lg bg-[#526de5] px-4 py-2 dark:bg-[#8ea5ff]"><Text class="text-[12px] font-semibold text-white dark:text-[#171923]">{t("app.externalLink")} ↗</Text></View></If>
        </View>
      </If>
      <If when={aboutOpen()}>
        <View class="absolute inset-0 z-[100] items-center justify-center bg-black/70 p-6">
          <View class="w-full max-w-[420px] rounded-2xl border border-[#d5d8e0] bg-white p-6 shadow-2xl dark:border-[#444854] dark:bg-[#292b32]">
            <View class="flex-row items-center justify-between">
              <View class="flex-row items-center gap-3"><Image src={appIcon} class="h-[38px] w-[38px]" /><View><Text class="text-[19px] font-bold text-[#242630] dark:text-[#f0f1f5]">{t("app.aboutTitle")}</Text><Text class="mt-1 text-[12px] text-[#656b7a] dark:text-[#a8adbb]">ClipQR · {t("app.version")}</Text></View></View>
              <View onPress={() => aboutOpen.set(false)} role="button" class="rounded-lg border border-[#d5d8e0] px-3 py-2 dark:border-[#444854]"><Text class="text-[12px] text-[#242630] dark:text-[#f0f1f5]">×</Text></View>
            </View>
            <View class="mt-5 border-t border-[#d5d8e0] pt-4 dark:border-[#444854]">
              <View class="flex-row items-center justify-between py-2"><Text class="text-[12px] text-[#656b7a] dark:text-[#a8adbb]">{t("app.author")}</Text><Text class="text-[12px] font-semibold text-[#242630] dark:text-[#f0f1f5]">xingwangzhe</Text></View>
              <View class="flex-row items-center justify-between py-2"><Text class="text-[12px] text-[#656b7a] dark:text-[#a8adbb]">{t("app.repository")}</Text><View onPress={() => openUrl("https://github.com/xingwangzhe/ClipQR")} role="button"><Text class="text-[12px] text-[#526de5] dark:text-[#8ea5ff]">github.com/xingwangzhe/ClipQR ↗</Text></View></View>
              <View class="flex-row items-center justify-between py-2"><Text class="text-[12px] text-[#656b7a] dark:text-[#a8adbb]">{t("app.website")}</Text><View onPress={() => openUrl("https://clipqr.needhelp.icu/")} role="button"><Text class="text-[12px] text-[#526de5] dark:text-[#8ea5ff]">clipqr.needhelp.icu ↗</Text></View></View>
            </View>
          </View>
        </View>
      </If>
      <View class="mt-auto flex-row items-center justify-between border-t border-[#d5d8e0] pt-4 dark:border-[#444854]"><Text class="text-[10px] text-[#656b7a] dark:text-[#a8adbb]">{t("app.footer")}</Text><Text class="text-[10px] text-[#656b7a] dark:text-[#a8adbb]">Ctrl / ⌘ + Shift + V</Text></View>
    </View>
  );
}

mount(App);
