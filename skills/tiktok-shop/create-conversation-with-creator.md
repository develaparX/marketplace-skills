# TikTok Shop API: Create Conversation with creator

# Create Conversation with Creator API Guide

## 1. Overview
API gets existing conversation or creates new one with TikTok creator. Use before sending messages.

## 2. Endpoint
*   **Method:** `POST`
*   **Path:** `/affiliate_seller/202508/conversations`
*   **Base URL:** `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
*   `content-type`: `application/json` (Required)
*   `x-tts-access-token`: Seller access token. Required. Get from "Get Access Token" (user_type = 0).

## 4. Parameters

### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Signature from gen algorithm. |
| `timestamp` | number | Yes | Unix timestamp UTC. |
| `shop_cipher` | string | Yes | Shop identifier. |

### Body Parameters (JSON)
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `creator_open_id` | string | Yes | Creator Open ID. |
| `only_need_conversation_id` | boolean | No | Default `true`. If `true`, returns only `conversation_id` in `data`. If `false`, returns all fields. |

## 5. Response Structure
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Log ID.
*   `data` (object):
    *   `conversation_id` (string): Unique ID.
    *   `is_new` (boolean): True if newly created.
    *   `username` (string): Creator username.
    *   `avatar` (string): Creator avatar URL.
    *   `unread_count` (number): Unread message count.
    *   `creator_im_id` (string): Creator IM ID.

## 6. Error Handling
Check `code` in response. Non-zero means error.

| Code | Description | Action |
| :--- | :--- | :--- |
| `16030001` | Creator cleared | Stop request. Creator inactive. |
| `16030002` | Shop reached IM quota | Wait for quota reset. |
| `16030003` | Shop GMV too low | Increase shop GMV to unlock messaging. |
| `16030007` | Invalid shop status | Check shop account status. |
| `16030009` | Test account isolated | Do not use test account to message. |
| `16032001` | Region mismatch | Ensure creator and seller match regions. |
| `45101021` | Creator privacy control | Creator blocked messages. Stop request. |
| `36009003` | Internal error | Retry request. |

## 7. Pitfalls & Best Practices
*   **GMV Limit:** Low GMV shops cannot message creators. Handle error `16030003` gracefully.
*   **Region Check:** Creator and seller must be in same region. Check error `16032001`.
*   **Bandwidth:** Set `only_need_conversation_id` to `true` to save bandwidth if metadata not needed.
*   **Signature:** Generate signature using correct algorithm before request.

## 8. Code Example

### Curl
```bash
curl -X POST \
 'https://open-api.tiktokglobalshop.com/affiliate_seller/202508/conversations?sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&app_key=38abcd&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
 -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
 -H 'content-type: application/json' \
 -d '{
  "creator_open_id": "uACafQAAAABmUU2qon4R0vUYvUVS3QC6CICP2m5A2-wd77j8R9G0yg",
  "only_need_conversation_id": true
}'
```

### Python Pseudocode
```python
import requests

url = "https://open-api.tiktokglobalshop.com/affiliate_seller/202508/conversations"
params = {
    "sign": "5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c",
    "timestamp": 1623812664,
    "app_key": "38abcd",
    "shop_cipher": "GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3"
}
headers = {
    "x-tts-access-token": "TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k",
    "content-type": "application/json"
}
payload = {
    "creator_open_id": "uACafQAAAABmUU2qon4R0vUYvUVS3QC6CICP2m5A2-wd77j8R9G0yg",
    "only_need_conversation_id": True
}

response = requests.post(url, params=params, headers=headers, json=payload)
data = response.json()

if data.get("code") == 0:
    print("Conversation ID:", data["data"]["conversation_id"])
else:
    print("Error:", data.get("message"))
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_seller/202508/conversations`*
