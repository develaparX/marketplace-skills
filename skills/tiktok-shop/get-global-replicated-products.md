# TikTok Shop API: Get Global Replicated Products

# Implementation Guide: Get Global Replicated Products API

## Purpose
Find replicated products in other markets. Use only for global sellers. Use when product copied via local replication.

## Endpoint
*   Method: `GET`
*   Path: `/product/202507/products/{product_id}/replicated_products`
*   Base URL: `https://open-api.tiktokglobalshop.com`

## Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (requires `user_type = 0`).

## Parameters

### Path Parameters
*   `product_id` (string, required): ID of source product.

### Query Parameters
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Signature from generation algorithm.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
*   `shop_cipher` (string, required): Shop identifier.

## Response Structure
JSON object.
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Log identifier.
*   `data` (object): Return payload.
    *   `replicated_products` (array): List of replicas.
        *   `region` (string): Target market (e.g., "US").
        *   `shop_id` (string): Target shop ID.
        *   `product_id` (string): Target product ID.
        *   `product_status` (string): Status (e.g., "ACTIVE").

## Error Handling
*   Check `code` field. Non-zero value means failure.
*   Log `request_id` for support tickets.

## Pitfalls & Best Practices
*   **Global Sellers Only:** API fails for local sellers.
*   **Signature Match:** Include all query parameters in signature generation.
*   **Token Type:** Use seller token (`user_type = 0`).

## Code Example
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/product/202507/products/1732064081124754497/replicated_products?timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /product/202507/products/{product_id}/replicated_products`*
