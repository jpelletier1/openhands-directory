---
title: REST API Client Skill
author: OpenHands Team
category: skills
description: Generic REST API client with authentication, retries, and response parsing.
---

# REST API Client Skill

## Overview

The REST API Client skill provides a robust and production-ready way to interact with REST APIs. It includes automatic retry logic, connection pooling, and proper error handling to ensure reliable API communications.

## Features

- **Automatic Retries**: Built-in retry mechanism with exponential backoff
- **Connection Pooling**: Efficient connection reuse for better performance
- **Error Handling**: Proper HTTP error detection and reporting
- **Flexible Authentication**: Support for custom headers including auth tokens
- **Multiple HTTP Methods**: Support for GET, POST, PUT, DELETE, and more

## Parameters

### `url` (string, required)
The API endpoint URL to call.

**Example:** `"https://api.example.com/v1/users"`

### `method` (string, optional)
The HTTP method to use. Defaults to `'GET'`.

**Options:** `'GET'`, `'POST'`, `'PUT'`, `'DELETE'`, `'PATCH'`

### `headers` (object, optional)
Custom HTTP headers to include in the request.

**Example:**
```json
{
  "Authorization": "Bearer YOUR_TOKEN",
  "Content-Type": "application/json"
}
```

### `data` (object, optional)
Request body data for POST, PUT, or PATCH requests. Will be automatically serialized to JSON.

**Example:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

## Usage

```python
# GET request
response = call_api("https://api.example.com/v1/users")

# POST request with data
response = call_api(
    url="https://api.example.com/v1/users",
    method="POST",
    headers={"Authorization": "Bearer TOKEN"},
    data={"name": "John", "email": "john@example.com"}
)
```

## Implementation

```python
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

def call_api(url, method='GET', headers=None, data=None):
    session = requests.Session()
    retry = Retry(total=3, backoff_factor=0.5)
    adapter = HTTPAdapter(max_retries=retry)
    session.mount('http://', adapter)
    session.mount('https://', adapter)

    response = session.request(method, url, headers=headers, json=data)
    response.raise_for_status()

    return response.json()
```

## Return Value

Returns the parsed JSON response from the API as a Python dictionary or list.

## Error Handling

- Raises `HTTPError` for 4xx and 5xx status codes
- Automatically retries on connection errors and timeouts
- Uses exponential backoff between retries (0.5s, 1s, 2s)

## Dependencies

- `requests`: HTTP library for Python
- `urllib3`: HTTP client (included with requests)

Install with:
```bash
pip install requests
```
