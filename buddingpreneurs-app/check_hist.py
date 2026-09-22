from PIL import Image
import numpy as np
import sys

img = Image.open(sys.argv[1]).convert('RGB')
arr = np.array(img)
row_max = arr.max(axis=(1,2))

print(f"Row max values top 20: {row_max[:20]}")
print(f"Row max values bottom 20: {row_max[-20:]}")
