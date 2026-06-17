# TikTok Shop API: List Products SKPP Status

# API Implementation Guide: List Products SKPP Status

## 1. Overview
API query SKPP status. Use for batch check product qualification.

## 2. Endpoint
* **Method:** `POST`
* **Path:** `/product/202606/skpps/search`

## 3. Headers & Authentication
* `Content-Type`: `application/json`
* `x-tts-access-token`: Seller access token (from Get Access Token, user_type = 0)

## 4. Parameters

### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Signature from algorithm. |
| `timestamp` | int | Yes | Unix timestamp UTC. |
| `shop_cipher` | string | Yes | Shop identifier. |
| `locale` | string | No | BCP-47 locale code. |

### Body Parameters
```json
{
  "product_ids": ["string"],
  "skpp_status": "string",
  "page_size": 0,
  "page_no": 0
}
```

| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `product_ids` | array of strings | No | Product IDs. Max 100. |
| `skpp_status` | string | No | Filter. Values: `QUALIFIED`, `NOT_QUALIFIED`. |
| `page_size` | int | No | Page size. |
| `page_no` | int | No | Page number. |

## 5. Response Structure
Standard response format:
```json
{
  "code": 0,
  "message": "Success",
  "request_id": "20260601...",
  "data": {
    "products": [
      {
        "product_id": "123456",
        "skpp_status": "QUALIFIED"
      }
    ],
    "total_count": 1
  }
}
```

## 6. Error Handling
* Check HTTP status code first.
* Check response `code` field. Non-zero means error.
* Common errors:
  * `400`: Invalid parameters (e.g., > 100 product IDs).
  * `401`: Invalid token or signature.
  * `429`: Rate limit exceeded.

## 7. Pitfalls & Best Practices
* **Limit:** Max 100 product IDs per call. Split larger lists.
* **Signature:** Generate signature using all query parameters. Do not include body parameters in signature calculation.
* **Pagination:** Use `page_size` and `page_no` when querying without specific product IDs.

## 8. Code Example (cURL)

```bash
curl -X POST "https://api-sandbox.tiktokshop.com/product/202606/skpps/search?app_key=test_app_key&sign=test_sign&timestamp=1672531199&shop_cipher=test_cipher" \
  -H "Content-Type: application/json" \
  -H "x-tts-access-token: test_token" \
  -d '{
    "product_ids": ["123456789", "987654321"],
    "skpp_status": "QUALIFIED",
    "page_size": 20,
    "page_no": 1
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /product/202606/skpps/search`*
