---
title: Web Scraper Skill
author: OpenHands Team
category: skills
description: A powerful web scraping skill that extracts data from websites using BeautifulSoup and requests libraries. Perfect for gathering structured data from HTML pages.
---

# Web Scraper Skill

## Overview

The Web Scraper skill provides a simple and powerful way to extract structured data from HTML web pages. It uses the popular BeautifulSoup and requests libraries to fetch and parse web content.

## Features

- HTTP request handling with the `requests` library
- CSS selector-based data extraction
- Clean and structured output format
- Support for multiple selectors in a single request

## Parameters

### `url` (string, required)
The URL of the web page to scrape.

**Example:** `"https://example.com/products"`

### `selectors` (object, required)
A dictionary of CSS selectors for data extraction. Each key represents the name of the data field, and the value is the CSS selector to locate the elements.

**Example:**
```json
{
  "titles": "h2.product-title",
  "prices": "span.price",
  "descriptions": "p.description"
}
```

## Usage

```python
result = scrape(
    url="https://example.com/products",
    selectors={
        "titles": "h2.product-title",
        "prices": "span.price"
    }
)
```

## Implementation

```python
import requests
from bs4 import BeautifulSoup

def scrape(url, selectors):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    results = {}
    for key, selector in selectors.items():
        elements = soup.select(selector)
        results[key] = [el.text.strip() for el in elements]
    
    return results
```

## Return Value

Returns a dictionary where each key corresponds to the selector name, and the value is a list of extracted text content.

**Example output:**
```json
{
  "titles": ["Product 1", "Product 2", "Product 3"],
  "prices": ["$19.99", "$29.99", "$39.99"]
}
```

## Dependencies

- `requests`: For making HTTP requests
- `beautifulsoup4`: For parsing HTML content

Install with:
```bash
pip install requests beautifulsoup4
```
