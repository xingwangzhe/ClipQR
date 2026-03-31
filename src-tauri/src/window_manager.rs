use once_cell::sync::OnceCell;
use std::sync::Arc;
use tauri::Window;

static MAIN_WINDOW: OnceCell<Arc<Option<Window>>> = OnceCell::new();

pub fn init(window: Window) {
    // 初始化时保存窗口引用
    MAIN_WINDOW.set(Arc::new(Some(window))).ok();
}

pub fn get_main_window() -> Option<Window> {
    // 获取窗口引用（如果还存在）
    MAIN_WINDOW
        .get()
        .map(|arc| arc.as_ref().as_ref().cloned())
        .unwrap_or(None)
}

pub fn destroy_main_window() {
    // 销毁窗口和 webview
    if let Some(arc_window) = MAIN_WINDOW.get() {
        if let Some(window) = arc_window.as_ref() {
            let _ = window.destroy();
            // 注意：destroy 后窗口就没了，这里只需要清空引用
            // 因为 OnceCell 不能清空，所以用 Option 包裹
        }
    }
}

pub fn recreate_main_window(app: &tauri::AppHandle) -> tauri::Window {
    // 重新创建窗口
    let window = tauri::WindowBuilder::new(app, "main", tauri::WindowUrl::default())
        .build()
        .expect("Failed to recreate main window");

    // 重新保存引用
    *MAIN_WINDOW
        .get_or_init(|| Arc::new(Some(window.clone())))
        .clone();

    window
}
