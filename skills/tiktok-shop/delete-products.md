# TikTok Shop API: Delete Products

# API Implementation Guide: Delete Products

## 1. Overview
Delete non-frozen products. Use for inventory cleanup.

## 2. Endpoint
*   **Method:** `DELETE`
*   **Path:** `/product/202309/products`

## 3. Headers & Authentication
Required scope: `seller.product.delete`

| Header | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `content-type` | string | Yes | Must be `application/json` |
| `x-tts-access-token` | string | Yes | Seller access token |

## 4. Parameters

### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key |
| `sign` | string | Yes | Request signature |
| `timestamp` | int | Yes | Unix timestamp (UTC) |
| `shop_cipher` | string | Yes | Shop identifier |

### Body Parameters (JSON)
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `product_ids` | array[string] | Yes | Product IDs to delete. Max 20 |

## 5. Response Structure
```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {}
}
```

| Field | Type | Description |
| :--- | :--- | :--- |
| `code` | int | Status code (0 for success) |
| `message` | string | Failure reason or success message |
| `request_id` | string | Log identifier for debugging |
| `data` | object | Response payload |

## 6. Error Handling
*   Check `code` in response body. Non-zero means failure.
*   Read `message` for failure details.
*   Log `request_id` for support tickets.

## 7. Pitfalls & Best Practices
*   **Limit:** Max 20 product IDs per request. Batch larger lists.
*   **Frozen Products:** API fails if product is frozen.
*   **Shop Cipher:** Use correct cipher. Wrong cipher returns bad data for cross-border shops.

## 8. Code Example (cURL)

```bash
curl -X DELETE "https://api-gateway.domain/product/202309/products?app_key=YOUR_APP_KEY&sign=YOUR_SIGNATURE&timestamp=1696156800&shop_cipher=YOUR_SHOP_CIPHER" \
  -H "content-type: application/json" \
  -H "x-tts-access-token: YOUR_ACCESS_TOKEN" \
  -d '{
    "product_ids": ["prod_123", "prod_456"]
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `DELETE /product/202309/products`*
