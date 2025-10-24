---
title: Data Analyzer Skill
author: Jane Smith
category: skills
description: Analyze CSV and JSON data files with statistical operations including mean, median, standard deviation, and generate summary reports.
---

# Data Analyzer Skill

## Overview

The Data Analyzer skill provides powerful statistical analysis capabilities for CSV data files. It leverages pandas and numpy to perform common statistical operations and generate insights from your datasets.

## Features

- **Multiple Statistical Operations**: Calculate mean, median, and standard deviation
- **CSV Support**: Read and analyze CSV files
- **Column-wise Analysis**: Perform operations on all numeric columns
- **Flexible Operation Selection**: Choose which statistics to compute

## Parameters

### `file_path` (string, required)
Path to the CSV data file to analyze.

**Example:** `"./data/sales_data.csv"`

### `operations` (array, required)
List of statistical operations to perform on the dataset.

**Options:**
- `'mean'`: Calculate the average value for each numeric column
- `'median'`: Calculate the median value for each numeric column
- `'std'`: Calculate the standard deviation for each numeric column

**Example:**
```json
["mean", "median", "std"]
```

## Usage

```python
# Analyze a dataset with multiple operations
results = analyze(
    file_path="./data/sales_data.csv",
    operations=["mean", "median", "std"]
)

# Access specific statistics
print(f"Average sales: {results['mean']['sales']}")
print(f"Median price: {results['median']['price']}")
```

## Implementation

```python
import pandas as pd
import numpy as np

def analyze(file_path, operations):
    df = pd.read_csv(file_path)
    
    results = {}
    for op in operations:
        if op == 'mean':
            results['mean'] = df.mean().to_dict()
        elif op == 'median':
            results['median'] = df.median().to_dict()
        elif op == 'std':
            results['std'] = df.std().to_dict()
    
    return results
```

## Return Value

Returns a dictionary where each key corresponds to a statistical operation, and the value is another dictionary mapping column names to their calculated statistics.

**Example output:**
```json
{
  "mean": {
    "price": 29.99,
    "quantity": 150.5,
    "revenue": 4498.50
  },
  "median": {
    "price": 24.99,
    "quantity": 120.0,
    "revenue": 2999.88
  },
  "std": {
    "price": 15.32,
    "quantity": 75.8,
    "revenue": 2250.10
  }
}
```

## Notes

- Only numeric columns are analyzed; non-numeric columns are automatically skipped
- Empty or missing values are handled by pandas' default behavior (typically ignored)
- Large datasets are efficiently processed using pandas' optimized operations

## Dependencies

- `pandas`: Data manipulation and analysis library
- `numpy`: Numerical computing library

Install with:
```bash
pip install pandas numpy
```
