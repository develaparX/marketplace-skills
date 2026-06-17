# TikTok Shop API: Upload Product File

# Guide: Upload Product File API

## 1. Purpose
Upload non-image files (PDF, video) to TikTok Shop. Use for product manuals, demo videos, size guides.

## 2. Endpoint
*   Method: `POST`
*   Path: `/product/202309/files/upload`

## 3. Headers & Auth
*   `content-type`: `multipart/form-data` (Required)
*   `x-tts-access-token`: Seller access token (Required)

## 4. Parameters
### Query Parameters
*   `app_key` (string, required): App identifier.
*   `sign` (string, required): Signature from generation algorithm.
*   `timestamp` (int, required): Unix timestamp GMT.

### Body (multipart/form-data)
*   `data` (file, required): Local file binary. Allowed: PDF, MP4, MOV, MKV, WMV, WEBM, AVI, 3GP, FLV, MPEG.
*   `name` (string, required): File name with extension.

## 5. Response
JSON format:
```json
{
  "code": 0,
  "message": "success",
  "request_id": "202309...",
  "data": {
    "id": "file_id_123",
    "url": "https://...",
    "name": "manual.pdf",
    "format": "pdf"
  }
}
```

## 6. Error Handling
Check `code` field. Non-zero value means failure. Save `request_id` for debugging.

## 7. Pitfalls & Best Practices
*   Do not upload images. Use image upload API instead.
*   Match extension in `name` parameter with actual file type.
*   Generate signature using correct timestamp.

## 8. cURL Example
```bash
curl -X POST "https://api-domain/product/202309/files/upload?app_key=YOUR_APP_KEY&sign=YOUR_SIGNATURE&timestamp=1690000000" \
  -H "content-type: multipart/form-data" \
  -H "x-tts-access-token: YOUR_ACCESS_TOKEN" \
  -F "data=@/absolute/path/to/document.pdf" \
  -F "name=document.pdf"
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /product/202309/files/upload`*
