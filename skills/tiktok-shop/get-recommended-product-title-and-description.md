# TikTok Shop API: Get Recommended Product Title And Description

# Implement: Get Recommended Product Title And Description

## 1. Purpose
API fetch AI-optimized titles and descriptions. Use to improve listings. Product must be live (`ACTIVATE` status).

## 2. Endpoint
*   Method: `GET`
*   URL: `https://open-api.tiktokglobalshop.com/product/202405/products/suggestions`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token. Get from Get Access Token flow (`user_type = 0`).

## 4. Query Parameters
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Signature from gen algorithm.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
*   `product_ids` (array, required): Max 20 IDs. Product status must be `ACTIVATE`.
*   `shop_cipher` (string, required): Shop identifier.

## 5. Response Structure
JSON payload:
*   `code` (number): Success/failure code. `0` is success.
*   `message` (string): Status message.
*   `request_id` (string): Request log ID.
*   `data` (object): Suggestions payload.
    *   `products` (array): List of products.
        *   `id` (string): Product ID.
        *   `suggestions` (array): Recommended fields.
            *   `field` (string): Target field (e.g., `TITLE`).
            *   `items` (array): Recommended texts.

## 6. Error Codes
*   `12009014` / `12019114`: Seller no permission. Check token scope.
*   `12019120`: Product ID limit exceeded. Max 20.
*   `12052260`: Product ID not found. Check ID validity.
*   `36009003`: Internal error. Retry request.

## 7. Pitfalls & Best Practices
*   Batch size: Limit `product_ids` to 20. Split big lists.
*   Product status: Check status before call. Inactive products fail.
*   Signature: Generate `sign` using exact query parameters.

## 8. Example Request & Response

### Curl
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/product/202405/products/suggestions?shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&product_ids=12345678,123456&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

### Response
```json
{
  "code": 0,
  "data": {
    "products": [
      {
        "id": "123456",
        "suggestions": [
          {
            "field

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /product/202405/products/suggestions`*
