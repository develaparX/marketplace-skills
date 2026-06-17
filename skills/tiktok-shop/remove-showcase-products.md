# TikTok Shop API: Remove Showcase Products

# Remove Showcase Products API Guide

## 1. Overview
API removes products from creator showcase. Use to clean showcase or delete out-of-stock items.

## 2. Endpoint
*   **Method**: `DELETE`
*   **Path**: `/affiliate_creator/202409/showcases/products`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Creator token (from Get Access Token, `user_type = 1`).

## 4. Parameters

### Query Parameters
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Signature from gen algorithm.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).

### Body Parameters
*   `product_ids` (array of strings, required): Product IDs to delete. Max 200 items.

## 5. Response Structure
*   `code` (number): Status code.
*   `message` (string): Status message.
*   `request_id` (string): Log ID.
*   `data` (object): Return info.

## 6. Error Handling
*   `16015001`: Invalid parameter. Product IDs wrong or not in showcase. Check IDs.
*   `16015027`: System error. Retry request.

## 7. Pitfalls & Best Practices
*   **Limit**: Max 200 products per request. Batch larger lists.
*   **Token**: Use creator token (`user_type = 1`). Shop token fails.
*   **State**: Verify products exist in showcase before delete.

## 8. Code Example

```bash
curl -X DELETE 'https://open-api.tiktokglobalshop.com/affiliate_creator/202409/showcases/products?sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&app_key=38abcd' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json' \
  -d '{
    "product_ids": [
      "12390753231",
      "7102893481290"
    ]
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `DELETE /affiliate_creator/202409/showcases/products`*
