import { Clipboard, Picker, Scroll, Text, View, Image, signal, nativeModule, mount, keymap, openUrl, setColorScheme, locale, Storage } from "nsh";
import { Tray, Window, isAvailable } from "nsh/desktop";
import { availableLocales, setLocale, t } from "nsh/i18n";
import trayIcon from "./tray.svg";

const { Qr } = nativeModule<{ Qr: { decode(bytes: number[]): string | null; decodeFile(path: string): string | null } }>("clipqr/native");

type State = "idle" | "working" | "ready" | "empty" | "error";
type Theme = { name: string; mode: "dark" | "light"; page: string; surface: string; raised: string; border: string; text: string; muted: string; accent: string; accentText: string };
const themes: Theme[] = [
  { name: "Dark", mode: "dark", page: "#202127", surface: "#292b32", raised: "#333640", border: "#444854", text: "#f0f1f5", muted: "#a8adbb", accent: "#8ea5ff", accentText: "#171923" },
  { name: "Light", mode: "light", page: "#f3f4f7", surface: "#ffffff", raised: "#e8eaf0", border: "#d5d8e0", text: "#242630", muted: "#656b7a", accent: "#526de5", accentText: "#ffffff" },
  { name: "Catppuccin Mocha", mode: "dark", page: "#1e1e2e", surface: "#181825", raised: "#313244", border: "#45475a", text: "#cdd6f4", muted: "#a6adc8", accent: "#cba6f7", accentText: "#1e1e2e" },
  { name: "Catppuccin Macchiato", mode: "dark", page: "#24273a", surface: "#1e2030", raised: "#363a4f", border: "#494d64", text: "#cad3f5", muted: "#a5adcb", accent: "#c6a0f6", accentText: "#24273a" },
  { name: "Catppuccin Frappé", mode: "dark", page: "#303446", surface: "#292c3c", raised: "#414559", border: "#51576d", text: "#c6d0f5", muted: "#a5adce", accent: "#ca9ee6", accentText: "#303446" },
  { name: "Catppuccin Latte", mode: "light", page: "#eff1f5", surface: "#e6e9ef", raised: "#dce0e8", border: "#bcc0cc", text: "#4c4f69", muted: "#6c6f85", accent: "#8839ef", accentText: "#ffffff" },
  { name: "Tokyo Night", mode: "dark", page: "#1a1b26", surface: "#16161e", raised: "#24283b", border: "#3b4261", text: "#c0caf5", muted: "#a9b1d6", accent: "#7aa2f7", accentText: "#1a1b26" },
  { name: "Dracula", mode: "dark", page: "#282a36", surface: "#21222c", raised: "#343746", border: "#44475a", text: "#f8f8f2", muted: "#bdc0cc", accent: "#bd93f9", accentText: "#282a36" },
  { name: "Nord", mode: "dark", page: "#2e3440", surface: "#272d38", raised: "#3b4252", border: "#4c566a", text: "#eceff4", muted: "#b7c0ce", accent: "#88c0d0", accentText: "#2e3440" },
  { name: "Gruvbox Dark", mode: "dark", page: "#282828", surface: "#1d2021", raised: "#3c3836", border: "#504945", text: "#ebdbb2", muted: "#bdae93", accent: "#fabd2f", accentText: "#282828" },
  { name: "Rosé Pine", mode: "dark", page: "#191724", surface: "#1f1d2e", raised: "#26233a", border: "#403d52", text: "#e0def4", muted: "#908caa", accent: "#c4a7e7", accentText: "#191724" },
  { name: "Solarized Light", mode: "light", page: "#fdf6e3", surface: "#eee8d5", raised: "#e3ddc8", border: "#d3cbb7", text: "#586e75", muted: "#657b83", accent: "#268bd2", accentText: "#ffffff" },
  { name: "One Light", mode: "light", page: "#fafafa", surface: "#ffffff", raised: "#f0f0f1", border: "#d3d3d3", text: "#383a42", muted: "#696c77", accent: "#4078f2", accentText: "#ffffff" },
  { name: "Kanagawa Wave", mode: "dark", page: "#1f1f28", surface: "#16161d", raised: "#2a2a37", border: "#54546d", text: "#dcd7ba", muted: "#a6a69c", accent: "#7e9cd8", accentText: "#1f1f28" },
];
const languageNames: Record<string, string> = { ar: "العربية", "bn-BD": "বাংলা", "de-DE": "Deutsch", "en-US": "English", "es-ES": "Español", "fr-FR": "Français", "hi-IN": "हिन्दी", "it-IT": "Italiano", "ja-JP": "日本語", "jv-ID": "Basa Jawa", "ko-KR": "한국어", "mr-IN": "मराठी", "pa-IN": "ਪੰਜਾਬੀ", "pt-BR": "Português", "ru-RU": "Русский", "te-IN": "తెలుగు", "tr-TR": "Türkçe", "ur-PK": "اردو", "vi-VN": "Tiếng Việt", "zh-CN": "简体中文", "zh-TW": "繁體中文" };
const selectedTheme = signal("Dark");
const themeMenuOpen = signal(false);
const languageMenuOpen = signal(false);
const currentTheme = () => themes.find((theme) => theme.name === selectedTheme()) ?? themes[0];
Storage.getItem("locale").then((saved) => { if (saved && availableLocales().includes(saved)) setLocale(saved); });
Storage.getItem("theme").then((saved) => { const theme = themes.find((item) => item.name === saved); if (theme) { selectedTheme.set(theme.name); setColorScheme(theme.mode); } });
const value = signal("");
const state = signal<State>("idle");
const copied = signal(false);
const dragging = signal(false);

function decodeFileUri(uri: string) {
  const path = decodeURIComponent(new URL(uri).pathname);
  return /^\/[A-Za-z]:\//.test(path) ? path.slice(1) : path;
}
async function decodeFile(file: Blob) {
  state.set("working");
  try {
    const text = Qr.decode(Array.from(new Uint8Array(await file.arrayBuffer()))) ?? "";
    value.set(text); state.set(text ? "ready" : "empty");
  } catch (error) { console.error(error); value.set(""); state.set("error"); }
}
async function decodePath(path: string) {
  state.set("working");
  try {
    const text = Qr.decodeFile(path) ?? "";
    value.set(text); state.set(text ? "ready" : "empty");
  } catch (error) { console.error(error); state.set("error"); }
}
async function acceptText(text: string) {
  const trimmed = text.trim();
  if (!trimmed) { value.set(""); state.set("empty"); return; }
  if (trimmed.startsWith("file://")) return decodePath(decodeFileUri(trimmed));
  if (trimmed.startsWith("/") || /^[A-Za-z]:[\\/]/.test(trimmed)) return decodePath(trimmed);
  value.set(trimmed); state.set("ready");
}
async function readClipboard() {
  state.set("working");
  try {
    const image = await Clipboard.readImage();
    if (image) {
      const encoded = image.url.split(",", 2)[1] ?? "";
      const bytes = Array.from(atob(encoded), (char) => char.charCodeAt(0));
      const text = Qr.decode(bytes) ?? "";
      value.set(text); state.set(text ? "ready" : "empty"); return;
    }
    const files = await Clipboard.readFiles();
    if (files.length) return decodePath(decodeFileUri(files[0]));
    await acceptText(await Clipboard.readText());
  } catch (error) { console.error(error); state.set("error"); }
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
    Tray.set({ icon: trayIcon, tooltip: "ClipQR", onClick: () => win?.focus(), menu: [
      { label: t("tray.showWindow"), onSelect: () => win?.focus() },
      { label: t("tray.readClipboard"), onSelect: async () => { await readClipboard(); win?.focus(); } },
      { type: "separator" },
      { role: "quit" },
    ] });
  }
  const theme = currentTheme();
  return (
    <View onFileDragEnter={() => dragging.set(true)} onFileDragLeave={() => dragging.set(false)} onFileDrop={async ({ uris }) => { dragging.set(false); if (uris[0]) await decodePath(decodeFileUri(uris[0])); }} style={{ flex: 1, padding: 28, backgroundColor: theme.page }}>
      <View class="flex-row items-center justify-between" style={{ zIndex: 50 }}>
        <View class="flex-row items-center gap-3"><Image src={trayIcon} style={{ width: 30, height: 30 }} /><Text style={{ fontSize: 15, fontWeight: "600", color: theme.text }}>ClipQR</Text></View>
        <View class="flex-row items-center gap-2">
          <View class="relative">
            <View onPress={() => { languageMenuOpen.set(!languageMenuOpen()); themeMenuOpen.set(false); }} role="button" class="flex-row items-center gap-2 rounded-lg border px-3 py-2" style={{ backgroundColor: theme.surface, borderColor: theme.border }}><Text style={{ fontSize: 11, color: theme.text }}>{languageNames[locale()] ?? locale()}⌄</Text></View>
            <If when={languageMenuOpen()}><View class="absolute right-0 top-10 z-20 w-[220px] rounded-xl border p-2" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
              <Text class="px-2 py-2 text-[10px] font-bold tracking-[2px]" style={{ color: theme.muted }}>{t("app.languageMenu")}</Text>
              <Scroll style={{ height: 300 }}><View><Each of={availableLocales()}>{(code) => { const language = code(); return <View onPress={() => { setLocale(language); Storage.setItem("locale", language); languageMenuOpen.set(false); }} role="button" class="flex-row items-center justify-between rounded-lg px-2 py-2" style={{ backgroundColor: locale() === language ? theme.raised : "transparent" }}><Text style={{ fontSize: 12, color: theme.text }}>{languageNames[language] ?? language}</Text><If when={locale() === language}><Text style={{ color: theme.accent }}>✓</Text></If></View> }}</Each></View></Scroll>
            </View></If>
          </View>
          <View class="relative">
            <View onPress={() => { themeMenuOpen.set(!themeMenuOpen()); languageMenuOpen.set(false); }} role="button" class="flex-row items-center gap-2 rounded-lg border px-3 py-2" style={{ backgroundColor: theme.surface, borderColor: theme.border }}><View style={{ width: 9, height: 9, borderRadius: 99, backgroundColor: theme.accent }} /><Text style={{ fontSize: 11, color: theme.text }}>{selectedTheme()}⌄</Text></View>
            <If when={themeMenuOpen()}><View class="absolute right-0 top-10 z-20 w-[270px] rounded-xl border p-2" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
              <Scroll style={{ height: 350 }}><View><Each of={themes}>{(choice) => { const option = choice(); return <View onPress={() => { selectedTheme.set(option.name); setColorScheme(option.mode); Storage.setItem("theme", option.name); themeMenuOpen.set(false); }} role="button" class="flex-row items-center gap-3 rounded-lg px-2 py-2" style={{ backgroundColor: selectedTheme() === option.name ? theme.raised : "transparent" }}><View style={{ width: 28, height: 20, borderRadius: 5, backgroundColor: option.page, borderWidth: 1, borderColor: option.border }}><View style={{ width: 9, height: 9, margin: 4, borderRadius: 99, backgroundColor: option.accent }} /></View><Text style={{ flex: 1, fontSize: 11, color: theme.text }}>{option.name}</Text><If when={selectedTheme() === option.name}><Text style={{ color: theme.accent }}>✓</Text></If></View> }}</Each></View></Scroll>
            </View></If>
          </View>
        </View>
      </View>
      <View class="mt-12 mb-7">
        <Text class="text-[12px] font-semibold tracking-[2px]" style={{ color: theme.accent }}>{t("app.eyebrow")}</Text>
        <Text class="mt-3 text-[38px] font-bold leading-tight" style={{ color: theme.text }}>{t("app.title")}</Text>
        <Text class="text-[38px] font-bold leading-tight" style={{ color: theme.text }}>{t("app.titleAccent")}</Text>
        <Text class="mt-3 max-w-[420px] text-[14px] leading-relaxed" style={{ color: theme.muted }}>{t("app.desc")}</Text>
      </View>
      <View class="rounded-2xl border p-5" style={{ backgroundColor: theme.surface, borderColor: dragging() ? theme.accent : theme.border }}>
        <View class="flex-row items-center justify-between"><Text class="text-[11px] font-bold tracking-[2px]" style={{ color: theme.accent }}>{t("app.inputLabel")}</Text><Text class="text-[11px]" style={{ color: theme.muted }}>{dragging() ? t("app.dropIndicator") : "PNG · JPG · WEBP"}</Text></View>
        <View class="mt-5 flex-row gap-3">
          <View onPress={readClipboard} role="button" class="flex-1 rounded-xl border px-4 py-4 active:opacity-80" style={{ backgroundColor: theme.raised, borderColor: theme.accent }}><Text style={{ fontSize: 15, fontWeight: "600", color: theme.text }}>⌁　{t("readPaste.readClipboard")}</Text><Text class="mt-1 text-[11px]" style={{ color: theme.muted }}>{t("app.clipboardMeta")}</Text></View>
          <View onPress={chooseFile} role="button" class="flex-1 rounded-xl border px-4 py-4 active:opacity-80" style={{ backgroundColor: theme.raised, borderColor: theme.border }}><Text style={{ fontSize: 15, fontWeight: "600", color: theme.text }}>＋　{t("fileButton.selectFile")}</Text><Text class="mt-1 text-[11px]" style={{ color: theme.muted }}>{t("app.fileMeta")}</Text></View>
        </View>
        <View onPress={chooseFile} role="button" class="mt-4 flex-row items-center justify-center gap-3 rounded-xl border px-4 py-4" style={{ borderWidth: 1, borderStyle: "dashed", borderColor: dragging() ? theme.accent : theme.border, backgroundColor: dragging() ? theme.raised : "transparent" }}><Text style={{ fontSize: 17, color: theme.accent }}>↓</Text><Text style={{ fontSize: 12, color: theme.muted }}>{t("app.dropIndicator")}</Text></View>
        <If when={state() === "working"}><Text class="mt-4 text-[12px]" style={{ color: theme.accent }}>{t("app.working")}</Text></If>
        <If when={state() === "empty"}><Text class="mt-4 text-[12px]" style={{ color: theme.accent }}>{t("notice.noQr")}</Text></If>
        <If when={state() === "error"}><Text class="mt-4 text-[12px]" style={{ color: "#f38ba8" }}>{t("notice.failed")}</Text></If>
      </View>
      <If when={state() === "ready"}>
        <View class="mt-4 rounded-2xl border p-5" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
          <View class="flex-row items-center justify-between"><Text class="text-[11px] font-bold tracking-[2px]" style={{ color: theme.accent }}>{t("app.resultLabel")}</Text><View onPress={async () => { await Clipboard.writeText(value()); copied.set(true); }} role="button" class="rounded-lg border px-3 py-2" style={{ borderColor: theme.border }}><Text style={{ fontSize: 12, color: theme.text }}>{copied() ? `${t("app.copied")} ✓` : t("app.copyResult")}</Text></View></View>
          <View selectable class="mt-4 rounded-lg p-4" style={{ backgroundColor: theme.page }}><Text style={{ fontFamily: "monospace", fontSize: 13, lineHeight: 1.6, color: theme.text }}>{value()}</Text></View>
          <If when={isHttpUrl(value())}><View onPress={async () => { await openUrl(value()); }} role="button" class="mt-3 self-start rounded-lg px-4 py-2" style={{ backgroundColor: theme.accent }}><Text style={{ fontSize: 12, fontWeight: "600", color: theme.accentText }}>{t("app.externalLink")} ↗</Text></View></If>
        </View>
      </If>
      <View class="mt-auto flex-row items-center justify-between border-t pt-4" style={{ borderColor: theme.border }}><Text class="text-[10px]" style={{ color: theme.muted }}>{t("app.footer")}</Text><Text class="text-[10px]" style={{ color: theme.muted }}>Ctrl / ⌘ + Shift + V</Text></View>
    </View>
  );
}

mount(App);
