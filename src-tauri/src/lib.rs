use image::{self, RgbaImage, GrayImage};
use bardecoder;

#[tauri::command]
fn decode_qr(rgba: Vec<u8>, width: u32, height: u32) -> Option<String> {
    // We already get RGBA from Tauri clipboard
    let img = RgbaImage::from_raw(width, height, rgba)
        .expect("Failed to create RGBA image buffer");

    // Try with bardecoder (zxing based, more accurate detection)
    let decoder = bardecoder::default_decoder();
    let results = decoder.decode(&img);
    for result in results {
        if let Ok(content) = result {
            println!("✅ [后端] 二维码解析成功: {}", content);
            return Some(content);
        }
    }

    // If failed, try inverted grayscale
    // Convert to grayscale first
    let mut gray_pixels = Vec::with_capacity((width * height) as usize);
    for pixel in img.pixels() {
        let r = pixel[0] as f32;
        let g = pixel[1] as f32;
        let b = pixel[2] as f32;
        let gray = (0.299 * r + 0.587 * g + 0.114 * b) as u8;
        gray_pixels.push(gray);
    }
    let gray_img = GrayImage::from_vec(width, height, gray_pixels.clone())
        .expect("Failed to create gray image buffer");

    // Try normal grayscale
    // Convert back to RGBA for bardecoder (it expects RGBA)
    let mut gray_rgba = RgbaImage::new(width, height);
    for (x, y, pixel) in gray_img.enumerate_pixels() {
        let g = pixel.0[0];
        gray_rgba.put_pixel(x, y, image::Rgba([g, g, g, 255]));
    }
    let results = decoder.decode(&gray_rgba);
    for result in results {
        if let Ok(content) = result {
            println!("✅ [后端] 灰度二维码解析成功: {}", content);
            return Some(content);
        }
    }

    // Try inverted grayscale (for dark background QR codes)
    let inverted_gray: Vec<u8> = gray_pixels.iter().map(|&g| 255 - g).collect();
    let inverted_gray_img = GrayImage::from_vec(width, height, inverted_gray)
        .expect("Failed to create inverted image");

    // Convert to RGBA
    let mut inverted_gray_rgba = RgbaImage::new(width, height);
    for (x, y, pixel) in inverted_gray_img.enumerate_pixels() {
        let g = pixel.0[0];
        inverted_gray_rgba.put_pixel(x, y, image::Rgba([g, g, g, 255]));
    }
    let results = decoder.decode(&inverted_gray_rgba);
    for result in results {
        if let Ok(content) = result {
            println!("✅ [后端] 反转后二维码解析成功: {}", content);
            return Some(content);
        }
    }

    println!("⚠️ [后端] 未检测到二维码");
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
    println!("📄 [后端] 开始解析文件: {}", path);
    match std::fs::read(&path) {
        Ok(data) => {
            if !is_image_file(&path, &data) {
                eprintln!("⚠️ [后端] 跳过非图片文件: {}", path);
                return None;
            }

            match image::load_from_memory(&data) {
                Ok(img) => {
                    // Try original RGBA
                    let rgba_img = img.to_rgba8();
                    let decoder = bardecoder::default_decoder();
                    let results = decoder.decode(&rgba_img);
                    for result in results {
                        if let Ok(content) = result {
                            println!("✅ [后端] 文件二维码解析成功: {}", content);
                            return Some(content);
                        }
                    }

                    // Try grayscale
                    let gray_img = img.to_luma8();
                    let mut gray_rgba = RgbaImage::new(rgba_img.width(), rgba_img.height());
                    for (x, y, pixel) in gray_img.enumerate_pixels() {
                        let g = pixel.0[0];
                        gray_rgba.put_pixel(x, y, image::Rgba([g, g, g, 255]));
                    }
                    let results = decoder.decode(&gray_rgba);
                    for result in results {
                        if let Ok(content) = result {
                            println!("✅ [后端] 文件灰度解析成功: {}", content);
                            return Some(content);
                        }
                    }

                    // Try inverted grayscale
                    let inverted_gray: Vec<u8> = gray_img.pixels().map(|p| 255 - p.0[0]).collect();
                    let inverted_gray_img = GrayImage::from_vec(gray_img.width(), gray_img.height(), inverted_gray)
                        .expect("Failed to create inverted image");
                    let mut inverted_gray_rgba = RgbaImage::new(gray_img.width(), gray_img.height());
                    for (x, y, pixel) in inverted_gray_img.enumerate_pixels() {
                        let g = pixel.0[0];
                        inverted_gray_rgba.put_pixel(x, y, image::Rgba([g, g, g, 255]));
                    }
                    let results = decoder.decode(&inverted_gray_rgba);
                    for result in results {
                        if let Ok(content) = result {
                            println!("✅ [后端] 文件反转解析成功: {}", content);
                            return Some(content);
                        }
                    }

                    println!("⚠️ [后端] 文件中未检测到二维码");
                    None
                }
                Err(e) => {
                    eprintln!("❌ [后端] 加载图片失败 {}: {}", path, e);
                    None
                }
            }
        }
        Err(e) => {
            eprintln!("❌ [后端] 读取文件失败 {}: {}", path, e);
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
                    if let Err(e) = window.hide() {
                        eprintln!("Failed to hide window: {}", e);
                    }
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
