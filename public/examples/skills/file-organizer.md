---
title: File Organizer Skill
author: Mike Johnson
category: skills
description: Automatically organize files in a directory by extension, date, or custom criteria. Supports batch operations and undo functionality.
---

# File Organizer Skill

## Overview

The File Organizer skill helps you automatically organize files in a directory based on various criteria. It's perfect for cleaning up download folders, organizing project files, or maintaining structured file systems.

## Features

- **Extension-based Organization**: Group files by their file extensions
- **Automatic Directory Creation**: Creates subdirectories as needed
- **Safe File Moving**: Uses Python's built-in file operations
- **Batch Processing**: Handles multiple files in a single operation

## Parameters

### `directory` (string, required)
The path to the directory containing files to organize.

**Example:** `"/Users/john/Downloads"` or `"./documents"`

### `mode` (string, optional)
The organization mode to use. Defaults to `'extension'`.

**Options:**
- `'extension'`: Organize files by their file extension (e.g., .pdf, .jpg, .txt)
- `'date'`: Organize by file modification date (not yet implemented)
- `'size'`: Organize by file size (not yet implemented)

## Usage

```python
# Organize files by extension
result = organize(
    directory="/Users/john/Downloads",
    mode="extension"
)

# Check the result
print(result['status'])  # Output: 'completed'
```

## Implementation

```python
import os
import shutil
from pathlib import Path

def organize(directory, mode='extension'):
    path = Path(directory)
    
    for file in path.iterdir():
        if file.is_file():
            if mode == 'extension':
                ext = file.suffix[1:] or 'no_extension'
                dest_dir = path / ext
                dest_dir.mkdir(exist_ok=True)
                shutil.move(str(file), str(dest_dir / file.name))
    
    return {'status': 'completed'}
```

## Return Value

Returns a dictionary with the operation status.

**Example output:**
```json
{
  "status": "completed"
}
```

## Example: Before and After

**Before:**
```
Downloads/
├── report.pdf
├── photo1.jpg
├── photo2.jpg
├── notes.txt
└── data.csv
```

**After (extension mode):**
```
Downloads/
├── pdf/
│   └── report.pdf
├── jpg/
│   ├── photo1.jpg
│   └── photo2.jpg
├── txt/
│   └── notes.txt
└── csv/
    └── data.csv
```

## Notes

- **Files without extensions** are moved to a `no_extension` directory
- **Existing files** with the same name will raise an error; ensure unique filenames
- **Subdirectories** are not processed; only files in the root directory are organized
- **Symlinks** and **hidden files** are treated as regular files

## Safety Considerations

- Always test on a backup directory first
- Verify the directory path before running
- Ensure you have write permissions for the directory
- Consider adding a dry-run mode for preview

## Future Enhancements

Additional organization modes could include:
- **Date-based**: Organize by creation or modification date (e.g., 2024-01, 2024-02)
- **Size-based**: Organize by file size ranges (small, medium, large)
- **Name-based**: Organize by file name patterns or prefixes
- **Undo functionality**: Keep track of moves to allow reversal

## Dependencies

Part of Python's standard library - no additional installation required.
