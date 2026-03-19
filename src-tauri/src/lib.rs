use image::{ImageBuffer, Luma};
use rqrr::PreparedImage;

#[tauri::command]
fn decode_qr(rgba: Vec<u8>, width: u32, height: u32) -> Option<String> {
    // Convert RGBA to 8-bit grayscale for rqrr
    let mut pixels = Vec::with_capacity((width * height) as usize);
    for chunk in rgba.chunks(4) {
        // RGBA -> luminance: 0.299*R + 0.587*G + 0.114*B
        let r = chunk[0] as f32;
        let g = chunk[1] as f32;
        let b = chunk[2] as f32;
        let gray = (0.299 * r + 0.587 * g + 0.114 * b) as u8;
        pixels.push(gray);
    }

    // Create grayscale image
    let img_buffer = ImageBuffer::<Luma<u8>, Vec<u8>>::from_vec(width, height, pixels)
        .expect("Failed to create image buffer");

    // Prepare image for QR detection
    let mut prepared = PreparedImage::prepare(img_buffer);
    let grids = prepared.detect_grids();

    // Try to decode each detected grid
    for grid in grids {
        if let Ok((_, content)) = grid.decode() {
            return Some(content);
        }
    }

    None
}

/// Check if file is an image based on extension and magic numbers
fn is_image_file(path: &str, data: &[u8]) -> bool {
    // Check extension
    let lower = path.to_lowercase();
    let has_image_ext = lower.ends_with(".png")
        || lower.ends_with(".jpg")
        || lower.ends_with(".jpeg")
        || lower.ends_with(".gif")
        || lower.ends_with(".bmp")
        || lower.ends_with(".webp")
        || lower.ends_with(".ico");

    if !has_image_ext {
        return false;
    }

    // Check magic number
    if data.len() < 4 {
        return false;
    }

    match &data[0..4] {
        // PNG: 89 50 4E 47
        [0x89, 0x50, 0x4E, 0x47] => true,
        // JPEG: FF D8 FF
        [0xFF, 0xD8, 0xFF, _] => true,
        // GIF: GIF87/GIF89 -> 47 49 46 38
        [0x47, 0x49, 0x46, 0x38] => true,
        // BMP: 42 4D
        [0x42, 0x4D, _, _] => true,
        // WEBP: RIFF....WEBP -> 52 49 46 46
        [0x52, 0x49, 0x46, 0x46] => true,
        // ICO: 00 00 01 00
        [0x00, 0x00, 0x01, 0x00] => true,
        _ => false,
    }
}

#[tauri::command]
fn decode_qr_from_file(path: String) -> Option<String> {
    // Read file first bytes for magic check
    match std::fs::read(&path) {
        Ok(data) => {
            if !is_image_file(&path, &data) {
                eprintln!("Skipping non-image file: {}", path);
                return None;
            }

            // Open image file and decode QR code
            match image::load_from_memory(&data) {
                Ok(img) => {
                    let gray_img = img.to_luma8();
                    let mut prepared = rqrr::PreparedImage::prepare(gray_img);
                    let grids = prepared.detect_grids();
                    for grid in grids {
                        if let Ok((_, content)) = grid.decode() {
                            return Some(content);
                        }
                    }
                    None
                }
                Err(e) => {
                    eprintln!("Failed to load image from {}: {}", path, e);
                    None
                }
            }
        }
        Err(e) => {
            eprintln!("Failed to read file {}: {}", path, e);
            None
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|_app, _args, _cwd| {}))
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![decode_qr, decode_qr_from_file])
        .on_window_event(|window, event| {
            match event {
                tauri::WindowEvent::CloseRequested { api, .. } => {
                    // 关闭窗口不退出，只是隐藏
                    window.hide().unwrap();
                    api.prevent_close();
                }
                _ => {}
            }
        })
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
