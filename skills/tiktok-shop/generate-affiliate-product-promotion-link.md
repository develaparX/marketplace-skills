# TikTok Shop API: Generate Affiliate Product Promotion Link

# Generate Affiliate Product Promotion Link API Guide

## 1. Purpose
API generate affiliate link for open collaboration product. Use when seller need promote product.

## 2. Endpoint
* **Method**: `POST`
* **URL**: `https://open-api.tiktokglobalshop.com/affiliate_seller/202405/products/{product_id}/promotion_link/generate`

## 3. Headers & Auth
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token (get from token API, `user_type` must be `0`).

## 4. Parameters

### Path Parameter
* `product_id` (string, required): Product identifier.

### Query Parameters
* `app_key` (string, required): Unique app key.
* `sign` (string, required): Request signature.
* `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
* `shop_cipher` (string, required): Shop identifier cipher.

### Body Parameter
* Empty JSON object `{}` (required).

## 5. Response Structure
* `code` (number): Status code. `0` mean success.
* `message` (string): Status message. Explain failure reason.
* `request_id` (string): Request log identifier.
* `data` (object): Return payload.
  * `product_promotion_link` (string): Generated affiliate link.

## 6. Error Codes
* `16015001`: Invalid parameter. Product ID wrong or product not in showcase.
* `16015014`: Get product meta failed.

## 7. Pitfalls & Best Practices
* **Empty Body**: Must send empty JSON `{}` in body. Request fail if body empty string or missing.
* **Showcase Check**: Product must exist in showcase. If not, API return error `16015001`.
* **Signature**: Calculate signature using all query parameters.

## 8. Code Examples

### cURL
```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/affiliate_seller/202405/products/789078671231/promotion_link/generate?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{}'
```

### Pseudocode
```python
# Setup request
url = "https://open-api.tiktokglobalshop.com/affiliate_seller/202405/products/789078671231/promotion_link/generate"
query_params = {
    "app_key": "38abcd",
    "timestamp": 1623812664,
    "shop_cipher": "GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3",
    "sign": "5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c"
}
headers = {
    "x-tts-access-token": "TTP_pwSm2...",
    "content-type": "application/json"
}
body = {}

# Send request
response = http.post(url, params=query_params, headers=headers, json=body)

# Handle response
if response.code == 0:
    link = response.data.product_promotion_link
    print("Link: " + link)
else:
    print("Error: " + response.message)
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_seller/202405/products/{product_id}/promotion_link/generate`*
