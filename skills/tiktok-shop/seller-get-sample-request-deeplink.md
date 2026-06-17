# TikTok Shop API: Seller Get Sample Request Deeplink

# Seller Get Sample Request Deeplink API Guide

## 1. Overview
API generate TikTok app deeplink. Creator click link, TikTok app launch, land on sample request page. Use when seller invite creator to request product sample.

## 2. Endpoint & Method
*   **Method:** `GET`
*   **Path:** `/affiliate_seller/202512/sample_applications/deeplink`
*   **Base URL:** `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token. Get from auth flow where `user_type` equals `0`.

## 4. Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique developer app key. |
| `sign` | string | Yes | Signature from gen algorithm. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |
| `product_id` | string | Yes | Target product ID. |
| `sku_id` | string | Yes | Target SKU ID. |
| `shop_cipher` | string | Yes | Shop cipher identifier. |
| `campaign_id` | string | No | TAP campaign ID. Support: `MY_CAMPAIGNS`, `SELLER_CAMPAIGNS`. |
| `collaboration_id` | string | No | Seller collaboration ID. |
| `valid_days` | number | No | Link lifetime. Min 1, max 14, default 7. |

## 5. Response Structure
JSON payload:
*   `code` (number): Status code. `0` mean success.
*   `message` (string): Status message.
*   `request_id` (string): Log identifier. Use for debug.
*   `data` (object): Return payload.
    *   `deeplink` (string): TikTok app launch link.

## 6. Error Handling
*   Check `code` field. If `code` not `0`, request fail.
*   Log `request_id` and `message` when error occur. Contact support with `request_id`.

## 7. Pitfalls & Best Practices
*   **Token check:** Use seller token (`user_type = 0`). Creator token cause auth error.
*   **Signature:** Generate `sign` parameter last. Query parameters must match signature input exactly.
*   **Expiry:** Deeplink expire after `valid_days`. Cache link, refresh before expiry.

## 8. Implementation Example

### Curl
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/affiliate_seller/202512/sample_applications/deeplink?app_key=38abcd&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&product_id=123456&sku_id=123456&campaign_id=3939495&collaboration_id=710240393&valid_days=14' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

### Pseudocode
```python
# 1. Define inputs
base_url = "https://open-api.tiktokglobalshop.com"
path = "/affiliate_seller/202512/sample_applications/deeplink"
params = {
    "app_key": "YOUR_APP_KEY",
    "timestamp": current_unix_time(),
    "product_id": "123456",
    "sku_id": "123456",
    "shop_cipher": "YOUR_SHOP_CIPHER",
    "valid_days": 7
}

# 2. Generate signature
params["sign"] = generate_tiktok_signature(path, params, app_secret)

# 3. Send request
headers = {
    "x-tts-access-token": "SELLER_ACCESS_TOKEN",
    "content-type": "application/json"
}
response = http.get(base_url + path, query=params, headers=headers)

# 4. Process result
if response.code == 0:
    deeplink = response.data.deeplink
    show_to_user(deeplink)
else:
    log_error(response.request_id, response.message)
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /affiliate_seller/202512/sample_applications/deeplink`*
