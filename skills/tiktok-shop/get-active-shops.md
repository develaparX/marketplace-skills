# TikTok Shop API: Get Active Shops

# Get Active Shops API Implementation Guide

## 1. Purpose
API retrieves active shops for seller. Use check shop activation status.

## 2. Endpoint & Method
*   **Method:** `GET`
*   **Path:** `/seller/202309/shops`
*   **Base URL:** `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token. Get from access token flow (user_type = 0).

## 4. Query Parameters
*   `app_key` (string): Unique app key.
*   `sign` (string): Request signature. Generate with signature algorithm.
*   `timestamp` (number): Unix timestamp GMT (UTC+00:00).

## 5. Response Structure
JSON response fields:
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message. Failure reason here.
*   `request_id` (string): Log identifier.
*   `data` (object): Shop details.
    *   `shops` (array): List of active shops.
        *   `id` (string): Shop ID.
        *   `region` (string): Shop region (e.g., "GB").

## 6. Error Handling
Check `code` field. If `code` not `0`, request failed. Read `message` for error detail. Log `request_id` for support.

## 7. Pitfalls & Best Practices
*   **Clock drift:** Timestamp expire fast. Sync server clock with NTP.
*   **Signature error:** Signature mismatch common. Verify sign algorithm steps, parameter order.
*   **Token expiry:** Refresh token before call.

## 8. Code Example

### Request
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/seller/202309/shops?timestamp=1623812664&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

### Response
```json
{
  "code": 0,
  "data": {
    "shops": [
      {
        "id": "36123502970007",
        "region": "GB"
      }
    ]
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /seller/202309/shops`*
