# TikTok Shop API: Get Seller Permissions

# Get Seller Permissions API

## Overview
API retrieves allowed cross-border operations for seller. Use before calling global product APIs to verify access.

## Endpoint
*   **Method:** `GET`
*   **URL:** `https://open-api.tiktokglobalshop.com/seller/202309/permissions`

## Headers & Authentication
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token. Must use token where `user_type = 0`.

## Query Parameters
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Signature from generation algorithm.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).

## Response Structure
Response returns JSON object:
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Log identifier. Use for support.
*   `data` (object): Contains payload.
    *   `permissions` (array of strings): Allowed operations (e.g., `MANAGE_GLOBAL_PRODUCT`).

## Error Handling
*   Check `code` field. If `code` not `0`, request failed.
*   Log `request_id` for troubleshooting.

## Pitfalls & Best Practices
*   **Token Type:** Use seller token (`user_type = 0`). Developer token fails.
*   **Signature:** Generate signature using exact query parameters and timestamp. Incorrect signature causes auth failure.
*   **Caching:** Cache permission list. Reduce API calls, avoid rate limits.

## Example Request (cURL)
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/seller/202309/permissions?sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&app_key=38abcd' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

## Example Response
```json
{
  "code": 0,
  "data": {
    "permissions": [
      "MANAGE_GLOBAL_PRODUCT"
    ]
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /seller/202309/permissions`*
