---
title: PDF Generator Skill
author: OpenHands Team
category: skills
description: Generate PDF documents from text, HTML, or templates with custom styling.
---

# PDF Generator Skill

## Overview

The PDF Generator skill enables you to create PDF documents programmatically from text content. It uses the ReportLab library to generate professional-looking PDFs with custom formatting.

## Features

- **Text to PDF**: Convert plain text content to PDF format
- **Multi-line Support**: Automatically handles line breaks and formatting
- **Standard Page Sizes**: Uses letter-size pages by default
- **Simple API**: Easy-to-use interface for quick PDF generation

## Parameters

### `content` (string, required)
The text content to convert to PDF. Supports multi-line text with `\n` line breaks.

**Example:**
```
"Title: My Document\n\nThis is the first paragraph.\n\nThis is the second paragraph."
```

### `output_path` (string, required)
The file path where the generated PDF should be saved.

**Example:** `"./reports/document.pdf"`

### `format` (string, optional)
The input format type. Defaults to `'text'`.

**Options:**
- `'text'`: Plain text (currently supported)
- `'html'`: HTML content (planned)
- `'markdown'`: Markdown content (planned)

## Usage

```python
# Generate a simple PDF
output_file = generate_pdf(
    content="Hello World\n\nThis is my first PDF document.",
    output_path="./output/hello.pdf",
    format="text"
)

print(f"PDF saved to: {output_file}")
```

## Implementation

```python
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

def generate_pdf(content, output_path, format='text'):
    c = canvas.Canvas(output_path, pagesize=letter)
    width, height = letter

    y = height - 50
    for line in content.split('\n'):
        c.drawString(50, y, line)
        y -= 20

    c.save()
    return output_path
```

## Return Value

Returns the path to the generated PDF file (same as `output_path` parameter).

## Example

```python
content = """
MONTHLY REPORT
January 2024

Sales Summary:
- Total Revenue: $125,000
- New Customers: 45
- Customer Satisfaction: 94%

Notes:
Strong performance this month.
"""

pdf_path = generate_pdf(
    content=content,
    output_path="./reports/january_2024.pdf"
)
```

## Page Specifications

- **Page Size**: US Letter (8.5" × 11")
- **Margins**: 50 points from left edge, 50 points from top
- **Line Height**: 20 points between lines
- **Font**: Default Helvetica

## Limitations

- No automatic page overflow handling (text may go off page)
- Fixed font and styling
- No support for images or tables
- Limited to basic text rendering

## Enhanced Version

For more advanced PDF generation, consider extending with:

```python
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer

def generate_pdf_advanced(content, output_path, title=None):
    doc = SimpleDocTemplate(output_path, pagesize=letter)
    styles = getSampleStyleSheet()
    story = []
    
    if title:
        story.append(Paragraph(title, styles['Title']))
        story.append(Spacer(1, 0.2*inch))
    
    for line in content.split('\n'):
        if line.strip():
            story.append(Paragraph(line, styles['Normal']))
            story.append(Spacer(1, 0.1*inch))
    
    doc.build(story)
    return output_path
```

## Dependencies

- `reportlab`: PDF generation library

Install with:
```bash
pip install reportlab
```

## Notes

- Ensure the output directory exists before calling the function
- For production use, add error handling and validation
- Consider page overflow for longer documents
- The function will overwrite existing files at `output_path`
