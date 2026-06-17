# TikTok Shop API: Get Feature Permissions

# Get Feature Permissions API Implementation Guide

## 1. Overview
API checks shop permissions for customer engagement features. Use before calling engagement APIs. Prevent unauthorized errors.

## 2. Endpoint
* **Method:** `GET`
* **URL:** `https://open-api.tiktokglobalshop.com/customer_engagement/202502/permissions`

## 3. Headers & Authentication
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token (from Get Access Token, where `user_type` is `0`).

## 4. Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Signature from gen algorithm. Identifies sender. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |
| `shop_cipher` | string | Yes | Shop identifier. Required for cross-border shops. |

## 5. Response Structure

### Success Response (Code 0)
```json
{
  "code": 0,
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7",
  "data": {
    "features": [
      {
        "name": "CUSTOM_MSG",
        "is_authorized": true
      }
    ]
  }
}
```

### Response Fields
* `code` (number): Status code. `0` is success.
* `message` (string): Status message. Failure details here.
* `request_id` (string): Log ID for debugging.
* `data` (object): Contains `features` array.
  * `features[].name` (string): Feature name (e.g., `CUSTOM_MSG`).
  * `features[].is_authorized` (boolean): `true` if shop has permission.

## 6. Error Handling
* Check `code` value. If non-zero, request failed.
* Read `message` for failure reason.
* Log `request_id` for support tickets.

## 7. Pitfalls & Best Practices
* **Wrong Shop Cipher:** Bad cipher returns wrong data. Use correct cipher for cross-border shops.
* **Signature Failure:** Generate `sign` using exact TTS algorithm. Match query params order.
* **Expired Token:** Refresh `x-tts-access-token` regularly.

## 8. Code Example

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/customer_engagement/202502/permissions?sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&app_key=38abcd' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /customer_engagement/202502/permissions`*
