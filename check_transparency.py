from PIL import Image
import os

img_path = 'img/conectar-logo.png'
if os.path.exists(img_path):
    try:
        img = Image.open(img_path)
        print(f"Format: {img.format}")
        print(f"Mode: {img.mode}")
        if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
            print("Has alpha channel: Yes")
            # Check if it actually has transparent pixels
            extrema = img.getextrema()
            if img.mode == 'RGBA':
                alpha_extrema = extrema[3]
                if alpha_extrema[0] < 255:
                    print("Has transparent pixels: Yes")
                else:
                    print("Has transparent pixels: No (Alpha channel exists but is fully opaque)")
            else:
                 print("Has transparent pixels: Maybe (Complex to check for P/LA without iterating)")
        else:
            print("Has alpha channel: No")
    except Exception as e:
        print(f"Error: {e}")
else:
    print("File not found")
