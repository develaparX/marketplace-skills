# TikTok Shop API: Create Custom Brands

# Create Custom Brands API Guide

## 1. Purpose
Create custom brands for seller use across all markets. Use when brand missing from global list.

## 2. Endpoint
*   **Method**: `POST`
*   **URL**: `https://open-api.tiktokglobalshop.com/product/202309/brands`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (from Get Access Token, `user_type = 0`).

## 4. Parameters

### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Request signature from gen algorithm. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |

### Body Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `name` | string | Yes | Brand name. Length: 2-30 chars. No Chinese. No translation. |

## 5. Response Structure
JSON object containing:
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message or error details.
*   `request_id` (string): Log identifier.
*   `data` (object): Contains brand `id` (string) on success.

## 6. Error Codes
| Code | Description | Action |
| :--- | :--- | :--- |
| `12052189` | Name too short (< 2 chars). | Fix length. |
| `12052190` | Name too long (> 30 chars). | Fix length. |
| `12052191` | Special fonts/emoticons used. | Remove special characters. |
| `12052192` | 5+ consecutive numbers. | Remove consecutive numbers. |
| `12052202` | Daily creation limit reached. | Wait 24 hours. |
| `12052203` | Total creation limit reached. | Delete old brands or contact support. |
| `12052204` | Invalid brand name. | Check name rules. |
| `12052205` | Brand name already exists. | Use existing brand. |
| `12052206` | Invalid character count. | Fix length. |
| `36009003` | Internal error. | Retry request. |

## 7. Pitfalls & Best Practices
*   **No Chinese**: API rejects Chinese characters. Use English or local market language.
*   **Consecutive Numbers**: Blocked if name contains 5+ numbers in row (e.g., "Brand12345").
*   **Limits**: Track daily and total brand creation counts to avoid block.
*   **Signature**: Generate `sign` using exact query params and request body.

## 8. Code Examples

### cURL
```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/product/202309/brands?timestamp=1623812664&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c' \
-H 'content-type: application/json' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-d '{"name": "Teas"}'
```

### Pseudocode
```python
# Define config
url = "https://open-api.tiktokglobalshop.com/product/202309/brands"
token = "TTP_ACCESS_TOKEN"
app_key = "YOUR_APP_KEY"
timestamp = current_unix_time()

# Generate signature
params = {
    "app_key": app_key,
    "timestamp": timestamp
}
sign = generate_signature(params, body={"name": "Teas"})
params["sign"] = sign

# Send request
headers = {
    "content-type": "application/json",
    "x-tts-access-token": token
}
body = {
    "name": "Teas"
}

response = http.post(url, query_params=params, headers=headers, body=body)

if response.code == 0:
    brand_id = response.data.id
    print("Success. Brand ID: " + brand_id)
else:
    print("Error: " + response.message)
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /product/202309/brands`*
