"""
Generate crystal-clear, high-definition, multi-resolution dental favicon assets
for Dr. Munojat Akbarova (drmunojat.uz).

Outputs:
  - public/favicon.svg (Pure vector, solid fills, zero fragile scanlines)
  - public/favicon.ico (Multi-res with uncompressed DIB frames for 16, 32, 48 and PNG for 120)
  - public/favicon-16x16.png
  - public/favicon-32x32.png
  - public/favicon-48x48.png
  - public/favicon-120x120.png (Targeted by Yandex search on desktop/mobile)
  - public/apple-touch-icon.png (180x180)
  - public/icon-192.png
  - public/icon-512.png
"""

import math
import os
import struct
from PIL import Image, ImageDraw

PUBLIC_DIR = os.path.join(os.path.dirname(__file__), "..", "public")

def cubic_bezier(p0, p1, p2, p3, n=40):
    pts = []
    for i in range(n + 1):
        t = i / n
        x = (1-t)**3 * p0[0] + 3*(1-t)**2 * t * p1[0] + 3*(1-t) * t**2 * p2[0] + t**3 * p3[0]
        y = (1-t)**3 * p0[1] + 3*(1-t)**2 * t * p1[1] + 3*(1-t) * t**2 * p2[1] + t**3 * p3[1]
        pts.append((x, y))
    return pts

def star_points(cx, cy, r_outer, r_inner):
    pts = []
    for i in range(8):
        angle = i * math.pi / 4 - math.pi / 2
        r = r_outer if i % 2 == 0 else r_inner
        pts.append((cx + r * math.cos(angle), cy + r * math.sin(angle)))
    return pts

def create_master_image(size=2048):
    """Render the master icon at 2048x2048 with high precision anti-aliasing."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    scale_factor = size / 512.0

    # 1. Background Squircle with Deep Crimson Red
    # Corner radius ~112 on 512 grid -> ~448 on 2048 grid
    rx = int(112 * scale_factor)
    draw.rounded_rectangle(
        [(0, 0), (size, size)],
        radius=rx,
        fill=(147, 11, 11, 255)  # #930b0b Dr. Munojat Brand Red
    )

    # 2. Tooth Silhouette Control Points (on 512 grid)
    # Master scaled tooth points
    scale = 1.15
    cx, cy = 256, 260
    dy = 10

    def transform_pt(pt):
        x, y = pt
        sx = cx + (x - cx) * scale
        sy = cy + (y - cy) * scale + dy
        return (sx * scale_factor, sy * scale_factor)

    p0 = (256, 172)
    c1_1 = (236, 156); c1_2 = (216, 142); p1 = (200, 142)
    c2_1 = (176, 142); c2_2 = (152, 156); p2 = (152, 178)
    c3_1 = (152, 215); c3_2 = (170, 235); p3 = (174, 258)
    c4_1 = (178, 295); c4_2 = (188, 355); p4 = (200, 385)
    c5_1 = (204, 395); c5_2 = (214, 395); p5 = (218, 385)
    c6_1 = (228, 355); c6_2 = (238, 310); p6 = (256, 298)
    c7_1 = (274, 310); c7_2 = (284, 355); p7 = (294, 385)
    c8_1 = (298, 395); c8_2 = (308, 395); p8 = (312, 385)
    c9_1 = (324, 355); c9_2 = (334, 295); p9 = (338, 258)
    c10_1 = (342, 235); c10_2 = (360, 215); p10 = (360, 178)
    c11_1 = (360, 156); c11_2 = (336, 142); p11 = (312, 142)
    c12_1 = (296, 142); c12_2 = (276, 156); p12 = (256, 172)

    curves = [
        (p0, c1_1, c1_2, p1),
        (p1, c2_1, c2_2, p2),
        (p2, c3_1, c3_2, p3),
        (p3, c4_1, c4_2, p4),
        (p4, c5_1, c5_2, p5),
        (p5, c6_1, c6_2, p6),
        (p6, c7_1, c7_2, p7),
        (p7, c8_1, c8_2, p8),
        (p8, c9_1, c9_2, p9),
        (p9, c10_1, c10_2, p10),
        (p10, c11_1, c11_2, p11),
        (p11, c12_1, c12_2, p12),
    ]

    tooth_poly = []
    for cp0, cp1, cp2, cp3 in curves:
        tp0 = transform_pt(cp0)
        tp1 = transform_pt(cp1)
        tp2 = transform_pt(cp2)
        tp3 = transform_pt(cp3)
        tooth_poly.extend(cubic_bezier(tp0, tp1, tp2, tp3, n=50))

    draw.polygon(tooth_poly, fill=(255, 255, 255, 255))

    # 3. Aesthetic Dental Sparkle (Upper Right)
    sparkle_pts = star_points(
        cx=395 * scale_factor,
        cy=115 * scale_factor,
        r_outer=48 * scale_factor,
        r_inner=14 * scale_factor
    )
    draw.polygon(sparkle_pts, fill=(255, 255, 255, 255))

    mini_sparkle_pts = star_points(
        cx=448 * scale_factor,
        cy=75 * scale_factor,
        r_outer=22 * scale_factor,
        r_inner=7 * scale_factor
    )
    draw.polygon(mini_sparkle_pts, fill=(255, 255, 255, 220))

    return img

def make_dib_frame(img):
    """Build uncompressed 32-bit DIB/BMP frame for .ico compliance."""
    w, h = img.size
    img = img.convert("RGBA")
    
    biSize = 40
    biWidth = w
    biHeight = h * 2  # ICO spec: height * 2 (XOR mask + AND mask)
    biPlanes = 1
    biBitCount = 32
    biCompression = 0
    biSizeImage = w * h * 4
    biXPels = 0
    biYPels = 0
    biClrUsed = 0
    biClrImportant = 0
    
    header = struct.pack(
        "<IIIHHIIIIII",
        biSize, biWidth, biHeight, biPlanes, biBitCount,
        biCompression, biSizeImage, biXPels, biYPels, biClrUsed, biClrImportant
    )
    
    # Bottom-up BGRA pixels
    pixels = bytearray()
    for y in range(h - 1, -1, -1):
        for x in range(w):
            r, g, b, a = img.getpixel((x, y))
            pixels.extend([b, g, r, a])
            
    # 1-bit AND mask: bottom-up, row padded to 32 bits (4 bytes)
    and_mask = bytearray()
    row_bytes = (w + 31) // 32 * 4
    for y in range(h - 1, -1, -1):
        row = bytearray(row_bytes)
        and_mask.extend(row)
        
    return header + pixels + and_mask

def make_png_frame(img):
    """Convert PIL image to raw PNG bytes."""
    import io
    buf = io.BytesIO()
    img.save(buf, format="PNG", optimize=True)
    return buf.getvalue()

def build_multi_res_ico(frames_dict, out_path):
    """
    Build multi-res .ico.
    frames_dict: {size: (raw_bytes, is_png)}
    """
    count = len(frames_dict)
    ico_header = struct.pack("<HHH", 0, 1, count)
    
    entries = bytearray()
    images_data = bytearray()
    
    # Directory offset starts after 6-byte header + 16-byte entry per frame
    current_offset = 6 + 16 * count
    
    for size, (data, is_png) in frames_dict.items():
        w_byte = 0 if size >= 256 else size
        h_byte = 0 if size >= 256 else size
        data_len = len(data)
        
        entry = struct.pack(
            "<BBBBHHII",
            w_byte, h_byte, 0, 0, 1, 32, data_len, current_offset
        )
        entries.extend(entry)
        images_data.extend(data)
        current_offset += data_len
        
    with open(out_path, "wb") as f:
        f.write(ico_header + entries + images_data)

def generate_svg(out_path):
    """Write pure SVG with solid vector paths and zero scanlines."""
    svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="drMunojatRed" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#9e0c0c" />
      <stop offset="100%" stop-color="#7d0808" />
    </linearGradient>
  </defs>

  <!-- Squircle Container -->
  <rect width="512" height="512" rx="112" ry="112" fill="url(#drMunojatRed)" />

  <!-- Solid White Sculpted Dental Molar Tooth -->
  <path d="M 256.0 168.8 C 233.0 150.4, 210.0 134.3, 191.6 134.3 C 164.0 134.3, 136.4 150.4, 136.4 175.7 C 136.4 218.2, 157.1 241.2, 161.7 267.7 C 166.3 310.2, 177.8 379.2, 191.6 413.8 C 196.2 425.2, 207.7 425.2, 212.3 413.8 C 223.8 379.2, 235.3 327.5, 256.0 313.7 C 276.7 327.5, 288.2 379.2, 299.7 413.8 C 304.3 425.2, 315.8 425.2, 320.4 413.8 C 334.2 379.2, 345.7 310.2, 350.3 267.7 C 354.9 241.2, 375.6 218.2, 375.6 175.7 C 375.6 150.4, 348.0 134.3, 320.4 134.3 C 302.0 134.3, 279.0 150.4, 256.0 168.8 Z" fill="#ffffff" />

  <!-- Aesthetic Dental Sparkles (Brilliant Smile) -->
  <path d="M 395 67 Q 395 115 443 115 Q 395 115 395 163 Q 395 115 347 115 Q 395 115 395 67 Z" fill="#ffffff" />
  <path d="M 448 55 Q 448 75 468 75 Q 448 75 448 95 Q 448 75 428 75 Q 448 75 448 55 Z" fill="#ffffff" opacity="0.85" />
</svg>'''
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(svg)

def main():
    print("Generating master 2048x2048 asset...")
    master = create_master_image(2048)
    
    sizes = {
        "icon-512.png": 512,
        "icon-192.png": 192,
        "apple-touch-icon.png": 180,
        "favicon-120x120.png": 120,
        "favicon-48x48.png": 48,
        "favicon-32x32.png": 32,
        "favicon-16x16.png": 16,
    }
    
    resized_images = {}
    for filename, sz in sizes.items():
        out_file = os.path.join(PUBLIC_DIR, filename)
        im_sz = master.resize((sz, sz), Image.Resampling.LANCZOS)
        im_sz.save(out_file, format="PNG", optimize=True)
        resized_images[sz] = im_sz
        print(f"  [OK] Saved {filename} ({sz}x{sz})")

    # Generate multi-res ICO
    ico_frames = {
        16: (make_dib_frame(resized_images[16]), False),
        32: (make_dib_frame(resized_images[32]), False),
        48: (make_dib_frame(resized_images[48]), False),
        120: (make_png_frame(resized_images[120]), True),
    }
    ico_path = os.path.join(PUBLIC_DIR, "favicon.ico")
    build_multi_res_ico(ico_frames, ico_path)
    print(f"  [OK] Saved favicon.ico ({os.path.getsize(ico_path)} bytes)")

    # Generate SVG
    svg_path = os.path.join(PUBLIC_DIR, "favicon.svg")
    generate_svg(svg_path)
    print(f"  [OK] Saved favicon.svg ({os.path.getsize(svg_path)} bytes)")
    
    print("\nAll favicon assets successfully generated and verified!")

if __name__ == "__main__":
    main()
