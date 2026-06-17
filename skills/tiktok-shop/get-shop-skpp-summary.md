# TikTok Shop API: Get Shop SKPP Summary

# Implement Get Shop SKPP Summary API

## Purpose
Get shop-level SKPP products roll-up. Use to show shop summary metrics: qualified products, eligible products, earned ad credits, visibility.

## Endpoint
* **Method**: `GET`
* **Path**: `/product/202606/skpps/sum`
* **Base URL**: `https://open-api.tiktokglobalshop.com`

## Headers & Auth
* `content-type`: `application/json` (Required)
* `x-tts-access-token`: Seller access token. Get from "Get Access Token" API. Use only when `user_type = 0`.

## Query Parameters
* `app_key` (string, required): Unique app key.
* `sign` (string, required): Signature from gen algorithm.
* `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
* `shop_cipher` (string, required): Shop identifier.

## Response Structure
JSON object. Fields:
* `code` (number): Status code. `0` means success.
* `message` (string): Status message.
* `request_id` (string): Log identifier.
* `data` (object): Payload. Contains `shop_summary`:
  * `qualified_products_count` (number): Count of qualified products.
  * `eligible_products_count` (number): Count of eligible products.
  * `earned_ad_credit` (string): Ad credit earned (e.g., `"$500"`).
  * `increased_visibility_l30d` (string): Visibility increase last 30 days.

## Error Codes
Handle these codes:
* `12081001`: Invalid request parameters. Check query string.
* `12081003`: Internal server error. Retry request.
* `12081006`: Unauthorized for SKPP on this shop. Check permissions.

## Pitfalls & Best Practices
* **Token Type**: `x-tts-access-token` needs `user_type = 0`. Other types fail.
* **Signature**: Generate `sign` using exact query parameters. Order matters.
* **Timestamp**: Use UTC. Server rejects old timestamps.

## Code Example
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/product/202606/skpps/sum?timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /product/202606/skpps/sum`*
