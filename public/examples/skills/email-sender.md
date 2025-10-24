---
title: Email Sender Skill
author: OpenHands Team
category: skills
description: Send emails using SMTP protocol with support for attachments and HTML content.
---

# Email Sender Skill

## Overview

The Email Sender skill provides a simple interface for sending emails programmatically using the SMTP protocol. It supports both plain text and HTML email content, making it suitable for notifications, reports, and automated communications.

## Features

- **Plain Text & HTML Support**: Send both plain text and HTML-formatted emails
- **SMTP Protocol**: Standard email sending using SMTP
- **Multi-part Messages**: Proper MIME formatting for email clients
- **Simple API**: Easy-to-use interface for quick email sending

## Parameters

### `to` (string, required)
The recipient's email address.

**Example:** `"user@example.com"`

### `subject` (string, required)
The email subject line.

**Example:** `"Monthly Report - January 2024"`

### `body` (string, required)
The email body content. Can be plain text or HTML depending on the `html` parameter.

**Plain text example:**
```
"Hello,\n\nThis is a test email.\n\nBest regards,\nYour Team"
```

**HTML example:**
```html
"<html><body><h1>Hello</h1><p>This is a <strong>test</strong> email.</p></body></html>"
```

### `html` (boolean, optional)
Whether the body content is HTML. Defaults to `False` (plain text).

**Example:** `true` or `false`

## Usage

```python
# Send a plain text email
send_email(
    to="user@example.com",
    subject="Hello from OpenHands",
    body="This is a plain text message."
)

# Send an HTML email
send_email(
    to="user@example.com",
    subject="Monthly Report",
    body="<h1>Report</h1><p>Here are the results...</p>",
    html=True
)
```

## Implementation

```python
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email(to, subject, body, html=False):
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['To'] = to

    content_type = 'html' if html else 'plain'
    msg.attach(MIMEText(body, content_type))

    with smtplib.SMTP('localhost') as server:
        server.send_message(msg)
```

## Configuration

This skill assumes you have an SMTP server running on `localhost` (port 25). For production use, you may want to configure:

- **SMTP Server**: Change `'localhost'` to your SMTP server address
- **Port**: Add port parameter (e.g., 587 for TLS, 465 for SSL)
- **Authentication**: Add username/password for authenticated SMTP
- **TLS/SSL**: Enable encryption for secure transmission

## Example with Authentication

```python
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email(to, subject, body, html=False):
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['To'] = to
    msg['From'] = "noreply@example.com"

    content_type = 'html' if html else 'plain'
    msg.attach(MIMEText(body, content_type))

    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login('your-email@gmail.com', 'your-password')
        server.send_message(msg)
```

## Dependencies

Part of Python's standard library - no additional installation required.

## Notes

- Ensure your SMTP server is properly configured before use
- For Gmail, you may need to use an app-specific password
- Consider rate limiting for bulk email sending
- Add proper error handling for production use
