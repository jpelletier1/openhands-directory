---
title: Image Processor Skill
author: OpenHands Team
category: skills
description: Process and transform images with operations like resize, crop, and filter application using PIL.
---

# Image Processor Skill

## Overview

The Image Processor skill provides powerful image manipulation capabilities using the Python Imaging Library (PIL/Pillow). It supports common image operations like resizing, cropping, rotating, and applying filters.

## Features

- **Multiple Operations**: Resize, crop, rotate, and filter images
- **Format Support**: Works with all common image formats (JPEG, PNG, GIF, BMP, etc.)
- **Filter Effects**: Apply built-in PIL filters for image enhancement
- **Flexible Parameters**: Each operation has customizable parameters

## Parameters

### `image_path` (string, required)
The file path to the input image.

**Example:** `"./images/photo.jpg"`

### `operation` (string, required)
The image operation to perform.

**Options:**
- `'resize'`: Change image dimensions
- `'crop'`: Extract a rectangular region
- `'rotate'`: Rotate the image by an angle
- `'filter'`: Apply an image filter

### `params` (object, required)
Operation-specific parameters. The required fields depend on the chosen operation.

## Operations

### Resize

Resize the image to specific dimensions.

**Parameters:**
```json
{
  "width": 800,
  "height": 600
}
```

**Usage:**
```python
img = process_image(
    image_path="photo.jpg",
    operation="resize",
    params={"width": 800, "height": 600}
)
```

### Crop

Extract a rectangular region from the image.

**Parameters:**
```json
{
  "left": 100,
  "top": 100,
  "right": 400,
  "bottom": 400
}
```

**Usage:**
```python
img = process_image(
    image_path="photo.jpg",
    operation="crop",
    params={"left": 100, "top": 100, "right": 400, "bottom": 400}
)
```

### Rotate

Rotate the image by a specified angle (in degrees).

**Parameters:**
```json
{
  "angle": 90
}
```

**Usage:**
```python
img = process_image(
    image_path="photo.jpg",
    operation="rotate",
    params={"angle": 90}
)
```

### Filter

Apply a PIL ImageFilter to the image.

**Parameters:**
```json
{
  "filter": "BLUR"
}
```

**Available filters:**
- `"BLUR"`: Blur the image
- `"CONTOUR"`: Find contours in the image
- `"DETAIL"`: Enhance detail
- `"EDGE_ENHANCE"`: Enhance edges
- `"SHARPEN"`: Sharpen the image
- `"SMOOTH"`: Smooth the image

**Usage:**
```python
img = process_image(
    image_path="photo.jpg",
    operation="filter",
    params={"filter": "SHARPEN"}
)
```

## Implementation

```python
from PIL import Image, ImageFilter

def process_image(image_path, operation, params):
    img = Image.open(image_path)

    if operation == 'resize':
        img = img.resize((params['width'], params['height']))
    elif operation == 'crop':
        img = img.crop((params['left'], params['top'], params['right'], params['bottom']))
    elif operation == 'rotate':
        img = img.rotate(params['angle'])
    elif operation == 'filter':
        img = img.filter(getattr(ImageFilter, params['filter']))

    return img
```

## Return Value

Returns a PIL Image object that can be:
- Saved to disk: `img.save('output.jpg')`
- Further processed with additional operations
- Converted to other formats: `img.convert('RGB')`
- Displayed: `img.show()`

## Example Workflow

```python
# Open and process an image
img = process_image("photo.jpg", "resize", {"width": 1024, "height": 768})

# Save the result
img.save("photo_resized.jpg", quality=95)

# Chain operations
img = process_image("photo.jpg", "crop", {"left": 0, "top": 0, "right": 500, "bottom": 500})
img = img.filter(ImageFilter.SHARPEN)
img.save("photo_cropped_sharp.jpg")
```

## Dependencies

- `Pillow`: The Python Imaging Library

Install with:
```bash
pip install Pillow
```

## Notes

- The original image file is not modified; operations return a new Image object
- For resize, the aspect ratio is not preserved by default
- Rotation may result in transparent or black corners
- Some operations may affect image quality; use appropriate quality settings when saving
