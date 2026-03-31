use once_cell::sync::OnceCell;
use std::sync::Arc;
use tauri::{AppHandle, WebviewWindow};
use tauri::webview::WebviewWindowBuilder;

static MAIN_WINDOW: OnceCell<Arc<Option<WebviewWindow>>> = OnceCell::new();

pub fn init(window: WebviewWindow) {
    MAIN_WINDOW.set(Arc::new(Some(window))).ok();
}

pub fn get_main_window() -> Option<WebviewWindow> {
    MAIN_WINDOW
        .get()
        .map(|arc| arc.as_ref().as_ref().cloned())
        .unwrap_or(None)
}

pub fn destroy_main_window() {
    if let Some(arc_window) = MAIN_WINDOW.get() {
        if let Some(window) = arc_window.as_ref() {
            let _ = window.destroy();
        }
    }
}

pub fn recreate_main_window(app: &AppHandle) -> WebviewWindow {
    let window = WebviewWindowBuilder::new(
        app,
        "main",
        Default::default()
    )
    .build()
    .expect("Failed to recreate main window");

    // OnceCell 只能初始化一次，第二次 set 会失败，但不影响
    // 我们只需要确保至少存了一次即可
    let _cell = MAIN_WINDOW.get_or_init(|| Arc::new(Some(window.clone())));
    let _ = MAIN_WINDOW.set(Arc::new(Some(window.clone())));

    window
}
