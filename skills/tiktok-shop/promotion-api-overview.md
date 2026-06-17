# TikTok Shop API: Promotion API overview

# TikTok Shop Promotion API Overview

## 1. Purpose
Retrieve documentation overview for TikTok Shop promotion activities (Product Discount, Flash Deal, Coupon/Voucher). Use to map promotion integration flow.

## 2. Endpoint
*   Method: `GET`
*   Path: `/docv2/page/promotion-api-overview`

## 3. Headers and Auth
Headers:
```http
Content-Type: application/json
```
Auth query parameters:
*   `app_key`: App identifier.
*   `access_token`: Seller authorization token.
*   `timestamp`: Current epoch timestamp (seconds).
*   `sign`: HMAC-SHA256 signature of request.

## 4. Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Partner application key |
| `access_token` | string | Yes | Seller access token |
| `timestamp` | integer | Yes | Current epoch timestamp |
| `sign` | string | Yes | Request signature |

## 5. Response Structure
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "title": "Promotion API overview",
    "content": "Overview of TikTok Shop promotion activities..."
  }
}
```

## 6. Error Handling
*   `400000`: Invalid parameter. Check query parameters.
*   `401000`: Auth failed. Check `sign` or `access_token`.

## 7. Pitfalls and Best Practices
*   Signature generation: Sort all query parameters alphabetically before HMAC-SHA256 calculation.
*   Rate limits: Cache document content. Do not call endpoint repeatedly.

## 8. Code Example
```bash
curl -X GET "https://api.tiktokshop.com/docv2/page/promotion-api-overview?app_key=123456&access_token=token123&timestamp=1600000000&sign=abcdef" \
  -H "Content-Type: application/json"
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `UNKNOWN /docv2/page/promotion-api-overview`*
