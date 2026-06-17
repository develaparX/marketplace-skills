# TikTok Shop API: Recover Products

# Recover Products API Implementation Guide

## 1. Overview
Recover deleted products. Status changes from `Deleted` to `Seller_deactivated`. Use to restore accidentally deleted items.

## 2. Endpoint
* **Method:** `POST`
* **Path:** `/product/202309/products/recover`

## 3. Headers & Authentication
* `Content-Type`: `application/json`
* `x-tts-access-token`: Seller access token (requires `user_type = 0`)

## 4. Parameters

### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Request signature from gen algorithm. |
| `timestamp` | number | Yes | Unix timestamp (UTC). |
| `shop_cipher` | string | Yes | Shop identifier cipher. |

### Body Parameters (JSON)
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `product_ids` | array | Yes | Product IDs to recover. Max 20 IDs. |

## 5. Response Structure
```json
{
  "code": 0,
  "message": "Success",
  "request_id": "20230915...",
  "data": {}
}
```
* `code` (number): Success/failure code. `0` means success.
* `message` (string): Status message.
* `request_id` (string): Log identifier for debugging.
* `data` (object): Specific return data.

## 6. Error Handling
* Check `code` value. Non-zero indicates failure.
* Log `request_id` on failure. Use to debug with support.

## 7. Pitfalls & Best Practices
* **Batch Limit:** Max 20 product IDs. Split larger lists into multiple requests.
* **Status Change:** Recovered products go to `Seller_deactivated`. Must activate products after recovery to make live.
* **Clock Drift:** Keep server time synced. Out-of-sync `timestamp` causes signature failure.

## 8. Code Example (cURL)

```bash
curl -X POST "https://api-gateway.domain/product/202309/products/recover?app_key=YOUR_APP_KEY&sign=YOUR_SIGNATURE&timestamp=1694784000&shop_cipher=YOUR_SHOP_CIPHER" \
  -H "Content-Type: application/json" \
  -H "x-tts-access-token: YOUR_ACCESS_TOKEN" \
  -d '{
    "product_ids": [
      "123456789",
      "987654321"
    ]
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /product/202309/products/recover`*
