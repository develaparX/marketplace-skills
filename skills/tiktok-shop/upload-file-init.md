# TikTok Shop API: Upload File Init

# TikTok Shop Upload File Init API

## 1. Overview
Initialize upload session for large files (videos). Use before chunk upload.

## 2. Endpoint
*   **Method**: `POST`
*   **Path**: `/open/202512/file/init`
*   **Base URL**: `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Access token (seller, creator, partner).

## 4. Parameters

### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Request signature. |
| `timestamp` | number | Yes | Unix timestamp (UTC). |
| `shop_cipher` | string | No | Cross-border shop identifier. |
| `category_asset_cipher` | string | No | Partner identifier. |

### Body Parameters (JSON)
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `file_name` | string | Yes | Name of file. |
| `file_type` | string | Yes | File type. Only `video` supported. |
| `file_size` | number | Yes | File size in bytes. |
| `total_chunk_count` | number | Yes | Total number of chunks. |
| `target_path` | string | Yes | Target resource path (e.g., `[POST]/affiliate_creator/202505/videos`). |

## 5. Response Structure
```json
{
  "code": 0,
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7",
  "data": {
    "upload_url": "https://open-api.tiktokglobalshop.com/file/202512/upload",
    "upload_token": "60973947df3667c22381df233d4452fcb1a0ed59a4e79e6207805ceef5268321"
  }
}
```

## 6. Error Handling
*   Check `code` field. `0` means success. Non-zero means failure.
*   Save `request_id` for debugging.

## 7. Pitfalls & Best Practices
*   `file_type` must be `video`. Other types fail.
*   `target_path` must match final API endpoint using video.
*   Calculate `total_chunk_count` accurately. Mismatch blocks upload completion.

## 8. Code Example

```bash
curl -X POST \
  'https://open-api.tiktokglobalshop.com/open/202512/file/init?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json' \
  -d '{
    "file_name": "test.mp4",
    "file_type": "video",
    "file_size": 1024,
    "total_chunk_count": 1,
    "target_path": "[POST]/affiliate_creator/202505/videos"
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /open/202512/file/init`*
