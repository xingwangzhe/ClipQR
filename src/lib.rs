use image::RgbaImage;
use nsh_core::prelude::*;

#[native_module("clipqr/native")]
fn native(registry: &mut Registry) {
    registry.module::<Qr>();
}

/// QR image decoding methods.
#[module]
pub struct Qr;

#[module]
impl Qr {
    /// Decodes a QR code from encoded image bytes without uploading them.
    pub fn decode(bytes: Vec<u8>) -> Option<String> {
        decode_image(&bytes)
    }

    /// Decodes a QR code in an image file from a user-selected local path.
    pub fn decode_file(path: String) -> Option<String> {
        let bytes = std::fs::read(path).ok()?;
        decode_image(&bytes)
    }
}

fn decode_image(bytes: &[u8]) -> Option<String> {
    let image = image::load_from_memory(bytes).ok()?.to_rgba8();
    let decoder = bardecoder::default_decoder();
    if let Some(text) = decoder.decode(&image).into_iter().find_map(Result::ok) {
        return Some(text);
    }

    let (width, height) = image.dimensions();
    let gray = image::DynamicImage::ImageRgba8(image).to_luma8();
    let pixels = gray.pixels().map(|pixel| 255 - pixel.0[0]).collect();
    let inverted = image::GrayImage::from_vec(width, height, pixels)?;
    let mut rgba = RgbaImage::new(width, height);
    for (x, y, pixel) in inverted.enumerate_pixels() {
        let value = pixel.0[0];
        rgba.put_pixel(x, y, image::Rgba([value, value, value, 255]));
    }
    decoder.decode(&rgba).into_iter().find_map(Result::ok)
}

#[cfg(test)]
mod tests {
    use super::{decode_image, Qr};
    use image::{DynamicImage, GrayImage, ImageOutputFormat, Luma};
    use qrcodegen::{QrCode, QrCodeEcc};
    use std::io::Cursor;

    fn qr_png(text: &str, invert: bool) -> Vec<u8> {
        let code = QrCode::encode_text(text, QrCodeEcc::Low).unwrap();
        let border = 4;
        let scale = 5;
        let size = (code.size() + border * 2) * scale;
        let image = GrayImage::from_fn(size as u32, size as u32, |x, y| {
            let module_x = x as i32 / scale - border;
            let module_y = y as i32 / scale - border;
            let dark = module_x >= 0
                && module_y >= 0
                && module_x < code.size()
                && module_y < code.size()
                && code.get_module(module_x, module_y);
            let value = if dark { 0 } else { 255 };
            Luma([if invert { 255 - value } else { value }])
        });
        let mut bytes = Cursor::new(Vec::new());
        DynamicImage::ImageLuma8(image)
            .write_to(&mut bytes, ImageOutputFormat::Png)
            .unwrap();
        bytes.into_inner()
    }

    fn qr_bytes(text: &str, format: ImageOutputFormat) -> Vec<u8> {
        let png = qr_png(text, false);
        let image = image::load_from_memory(&png).unwrap();
        let mut bytes = Cursor::new(Vec::new());
        image.write_to(&mut bytes, format).unwrap();
        bytes.into_inner()
    }

    #[test]
    fn decodes_standard_qr_image() {
        let bytes = qr_png("ClipQR plain text", false);
        assert_eq!(decode_image(&bytes).as_deref(), Some("ClipQR plain text"));
    }

    #[test]
    fn decodes_http_and_https_qr_payloads() {
        for url in ["http://example.com/qr", "https://clipqr.needhelp.icu"] {
            assert_eq!(decode_image(&qr_png(url, false)).as_deref(), Some(url));
        }
    }

    #[test]
    fn decodes_supported_image_formats() {
        for format in [ImageOutputFormat::Png, ImageOutputFormat::Jpeg(90), ImageOutputFormat::WebP, ImageOutputFormat::Bmp, ImageOutputFormat::Gif] {
            let bytes = qr_bytes("format test", format);
            assert_eq!(decode_image(&bytes).as_deref(), Some("format test"));
        }
    }

    #[test]
    fn decodes_local_image_file() {
        let path = std::env::temp_dir().join(format!("clipqr-qr-{}.png", std::process::id()));
        std::fs::write(&path, qr_png("local file test", false)).unwrap();
        assert_eq!(Qr::decode_file(path.to_string_lossy().to_string()).as_deref(), Some("local file test"));
        std::fs::remove_file(path).unwrap();
    }

    #[test]
    fn decodes_user_reported_qr_image() {
        let bytes = include_bytes!("../tests/fixtures/user-reported-qr.png");
        assert_eq!(decode_image(bytes).as_deref(), Some("xingwangzhe.fun"));
        let image = image::load_from_memory(bytes).unwrap();
        let mut encoded = Cursor::new(Vec::new());
        image.write_to(&mut encoded, ImageOutputFormat::Png).unwrap();
        assert_eq!(decode_image(encoded.get_ref()).as_deref(), Some("xingwangzhe.fun"));
    }

    #[test]
    fn decodes_inverted_qr_image() {
        let bytes = qr_png("clipqr inverse test", true);
        assert_eq!(decode_image(&bytes).as_deref(), Some("clipqr inverse test"));
    }

    #[test]
    fn rejects_invalid_image_bytes() {
        assert_eq!(decode_image(b"not an image"), None);
    }
}
