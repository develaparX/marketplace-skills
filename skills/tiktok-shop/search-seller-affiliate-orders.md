# TikTok Shop API: Search Seller Affiliate Orders

# Search Seller Affiliate Orders API Implementation Guide

## 1. Overview
API retrieve affiliate orders. Use to track affiliate conversions.

## 2. Endpoint
* **Method:** `POST`
* **Path:** `/affiliate_seller/202410/orders/search`

## 3. Headers & Authentication
Include headers in request:
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token
* `app_key`: Unique app key
* `sign`: Algorithm signature
* `timestamp`: Unix timestamp (UTC)

## 4. Request Parameters
Pass in JSON body:

| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `page_size` | number | Yes | Results per page |
| `shop_cipher` | string | Yes | Shop identifier |
| `page_token` | string | No | Token for next page |
| `create_time_lt` | number | No | Filter orders created before Unix timestamp |
| `create_time_ge` | number | No | Filter orders created on/after Unix timestamp |
| `program_id` | string | No | Filter by affiliate campaign ID |

## 5. Response Structure
JSON response fields:
* `code` (number): Status code
* `message` (string): Status message / error reason
* `request_id` (string): Log identifier
* `data` (object): Orders list container

## 6. Error Handling
1. Check `code` field.
2. If `code` not success, read `message`.
3. Log `request_id` to debug failed calls.

## 7. Pitfalls & Best Practices
* **Timestamp:** Must use UTC timezone.
* **Signature:** Generate signature using exact parameters. Incorrect order cause auth failure.
* **Pagination:** Use `page_token` to get next page. Do not hardcode page limits.
* **Time Filters:** Use `create_time_ge` and `create_time_lt` to limit data size. Prevent timeout.

## 8. Code Example (cURL)

```bash
curl -X POST "https://api-gateway.domain/affiliate_seller/202410/orders/search" \
  -H "content-type: application/json" \
  -H "x-tts-access-token: ACCESS_TOKEN" \
  -H "app_key: APP_KEY" \
  -H "sign: SIGNATURE" \
  -H "timestamp: 1710000000" \
  -d '{
    "page_size": 20,
    "shop_cipher": "SHOP_CIPHER_VALUE",
    "create_time_ge": 1709900000,
    "create_time_lt": 1710000000
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_seller/202410/orders/search`*
