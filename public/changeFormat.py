import os
from PIL import Image

source_dir = "C:\Users\zakaria\Desktop\my projetc\ste tissu\fabric\public\images\linen"
output_dir = "C:\Users\zakaria\Desktop\my projetc\ste tissu\fabric\public\images\linen"

# Ensure the output directory exists
os.makedirs(output_dir, exist_ok=True)

# Loop through all files in the source directory
for filename in os.listdir(source_dir):
    # Get the file extension
    ext = os.path.splitext(filename)[1].lower()
    if ext in ['.png', '.webp', '.tiff', '.jpeg', '.jpg']:
        input_path = os.path.join(source_dir, filename)
        output_path = os.path.join(output_dir, os.path.splitext(filename)[0] + '.jpg')

        # Open the image file
        with Image.open(input_path) as img:
            # Convert the image to JPEG
            img.convert('RGB').save(output_path, 'JPEG', quality=85)
            print(f'Converted {input_path} to {output_path}')

print('Conversion complete.')
