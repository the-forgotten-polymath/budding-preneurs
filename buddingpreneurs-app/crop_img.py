from PIL import Image
import numpy as np
import sys

img = Image.open(sys.argv[1]).convert('RGB')
arr = np.array(img)
# Calculate row-wise sum of brightness
# threshold to find non-black rows
row_max = arr.max(axis=(1,2))
col_max = arr.max(axis=(0,2))

# Find first and last row where max pixel value > 30 (to ignore noise)
rows = np.where(row_max > 30)[0]
cols = np.where(col_max > 30)[0]

if len(rows) > 0 and len(cols) > 0:
    top, bottom = rows[0], rows[-1]
    left, right = cols[0], cols[-1]
    cropped = img.crop((left, top, right, bottom))
    cropped.save(sys.argv[1])
    print(f"Cropped to {right-left}x{bottom-top}")
else:
    print("No content found")
