# TikTok Shop API: Get Shop LIVE Products Performance List

# API Implementation: Get Shop LIVE Products Performance List

## 1. Purpose
Track product sales in TikTok Shop LIVE. Use for live stream performance analysis.

## 2. Endpoint
*   **Method**: `GET`
*   **Base URL**: `https://open-api.tiktokglobalshop.com`
*   **Path**: `/analytics/202512/shop/{live_id}/products_performance`

## 3. Headers & Auth
*   `content-type`: `application/json` (Required)
*   `x-tts-access-token`: Seller access token (Required. Get from auth flow, `user_type` must be `0`)

## 4. Parameters

### Path Parameters
*   `live_id` (string, required): TTS LIVE session ID.

### Query Parameters
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Request signature.
*   `timestamp` (number, required): Unix timestamp UTC.
*   `shop_cipher` (string, required): Shop identifier.
*   `sort_order` (string, optional): Sort direction. Values: `ASC`, `DESC` (default).
*   `sort_field` (string, optional): Sort key. Default: `gmv`. Values: `direct_gmv`, `items_sold`, `customers`, `created_sku_orders`, `sku_orders`, `main_orders`, `product_impressions`, `produt_clicks`.
*   `currency` (string, optional): Currency type. Values: `USD`, `LOCAL`.

## 5. Response Structure
JSON response contains status and product metrics.

```json
{
  "code": 0,
  "message": "success",
  "request_id": "2025...",
  "data": {
    "products": [
      {
        "id": "1731736614984386107",
        "name": "Product Name",
        "sales": {
          "direct_gmv": {
            "currency": "SGD",
            "amount": "737.97"
          },
          "items_sold": 24,
          "customers": 24,
          "created_sku_orders": 27,
          "avg_price": {
            "currency": "SGD",
            "amount": "30.75"
          },
          "sku_orders": 24,
          "main_orders": 24,
          "payment_rate": "0.8888"
        }
      }
    ]
  }
}
```

## 6. Error Handling
*   Check `code` field. `0` is success.
*   Non-zero code indicates error. Read `message` for details.

## 7. Pitfalls & Best Practices
*   **Signature generation**: Sign calculation uses query params. Sort params alphabetically before hashing. Avoid auth failure.
*   **Token expiry**: Access token expires. Refresh token before API call. Avoid 401 error.
*   **Timestamp**: Use current UTC timestamp. Request fails if timestamp drift exceeds limit.

## 8. Code Example

### cURL
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/analytics/202512/shop/111/products_performance?sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&sort_order=DESC&sort_field=direct_gmv&currency=USD&app_key=38abcd' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

### Python Pseudocode
```python
import requests
import time
import hmac
import hashlib

# 1. Set config
app_key = "38abcd"
app_secret = "your_secret"
token = "TTP_pwSm2..."
shop_cipher = "GCP_XF90ig..."
live_id = "111"
timestamp = str(int(time.time()))

# 2. Build params
params = {
    "app_key": app_key,
    "timestamp": timestamp,
    "shop_cipher": shop_cipher,
    "sort_order": "DESC",
    "sort_field": "direct_gmv"
}

# 3. Generate signature (simplified)
# Sort params, concat with secret, hash with HMAC-SHA256
sign = generate_signature(params, app_secret)
params["sign"] = sign

# 4. Request
url = f"https://open-api.tiktokglobalshop.com/analytics/202512/shop/{live_id}/products_performance"
headers = {
    "x-tts-access-token": token,
    "content-type": "application/json"
}

response = requests.get(url, params=params, headers=headers)
print(response.json())
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /analytics/202512/shop/{live_id}/products_performance`*
