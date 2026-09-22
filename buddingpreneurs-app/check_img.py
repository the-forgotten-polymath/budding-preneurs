from PIL import Image
import sys

img = Image.open(sys.argv[1])
bg = Image.new(img.mode, img.size, img.getpixel((0,0)))
diff = Image.composite(img, bg, img.convert("L")) if img.mode == 'RGBA' else Image.new("L", img.size, 0)
# Actually, an easier way is Image.getbbox() if we convert black to transparent
img = img.convert("RGB")
# create mask of non-black pixels (threshold > 10)
mask = img.point(lambda p: p > 10 and 255)
# to single channel
mask = mask.convert("L")
bbox = mask.getbbox()
print(f"Original size: {img.size}")
print(f"Content bbox: {bbox}")
if bbox:
    print(f"Content size: {bbox[2]-bbox[0]}x{bbox[3]-bbox[1]}")
