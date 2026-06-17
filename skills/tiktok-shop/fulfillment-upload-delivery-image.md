# TikTok Shop API: Fulfillment Upload Delivery Image

# Fulfillment Upload Delivery Image API Implementation Guide

## 1. Purpose
Upload proof of delivery image. Get image URL. Use when package delivered.

## 2. Endpoint
*   **Method**: `POST`
*   **Path**: `/fulfillment/202309/images/upload`
*   **Base URL**: `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
*   `content-type`: `multipart/form-data`
*   `x-tts-access-token`: Seller access token. Get from Get Access Token API (user_type = 0).

## 4. Parameters

### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Request signature. |
| `timestamp` | number | Yes | Unix timestamp (UTC). |
| `shop_cipher` | string | Yes | Shop identifier. |
| `category_asset_cipher` | string | No | Partner identifier. |

### Body Parameters (Multipart Form)
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `data` | file | Yes | Image file. API description mentions Base64, but protocol requires multipart file upload. |

## 5. Response Structure
```json
{
  "code": 0,
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7",
  "data": {
    "url": "https://p-pbe38.byted.org/tos-ppdi18n-i-0euhj0x6u9/0a119a90d90b41e3838608bc384",
    "height": 256,
    "width": 256
  }
}
```

## 6. Error Handling
Handle these API error codes:
*   `12019116`: Resolution invalid. Keep image between 100x100 and 20000x20000 pixels.
*   `12038002`: File invalid. Check payload structure.
*   `12038004`: Format invalid. Use JPG, JPEG, or PNG.
*   `12038005`: Size invalid. Keep file under 5MB.

## 7. Pitfalls & Best Practices
*   **Format Conflict**: API description mentions Base64 string. Header requires `multipart/form-data`. Send actual file binary via multipart form, not Base64 string.
*   **Pre-flight Check**: Validate image size (< 5MB) and format (JPG/PNG) locally before upload. Save bandwidth.
*   **Resolution Limit**: Check dimensions. Mobile camera photos can exceed 20000 pixels. Resize if needed.

## 8. Code Example

### cURL
```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/fulfillment/202309/images/upload?sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&app_key=38abcd' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: multipart/form-data' \
  -F 'data=@"/absolute/path/to/delivery_proof.jpg"'
```

### Python Pseudocode
```python
import requests

url = "https://open-api.tiktokglobalshop.com/fulfillment/202309/images/upload"
params = {
    "app_key": "38abcd",
    "timestamp": 1623812664,
    "shop_cipher": "GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3",
    "sign": "5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c"
}
headers = {
    "x-tts-access-token": "TTP_pwSm2..."
}
files = {
    "data": ("delivery_proof.jpg", open("/absolute/path/to/delivery_proof.jpg", "rb"), "image/jpeg")
}

response = requests.post(url, params=params, headers=headers, files=files)
print(response.json())
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /fulfillment/202309/images/upload`*
