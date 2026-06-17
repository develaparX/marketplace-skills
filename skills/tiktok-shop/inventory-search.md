# TikTok Shop API: Inventory Search

# Inventory Search API Implementation Guide

## 1. Overview
Get inventory for products or SKUs. Use to sync stock levels.

## 2. Endpoint
*   **Method:** `POST`
*   **Path:** `/product/202309/inventory/search`

## 3. Headers & Auth
*   `content-type`: `application/json` (Required)
*   `x-tts-access-token`: Seller access token (Required)

## 4. Parameters

### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key |
| `sign` | string | Yes | Signature from gen algorithm |
| `timestamp` | int | Yes | Unix timestamp GMT (UTC+00:00) |
| `shop_cipher` | string | Yes | Shop cipher |

### Body Parameters (JSON)
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `product_ids` | []string | No | Product ID list. Max: 100 |
| `sku_ids` | []string | No | SKU ID list. Max: 600. Overrides `product_ids` if both present |

## 5. Response Structure
```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {}
}
```
*   `code` (int): Status code.
*   `message` (string): Status message.
*   `request_id` (string): Log ID for debug.
*   `data` (object): Inventory payload.

## 6. Error Codes
*   `36009003`: Internal error. Retry request.
*   `12019008`: Product ID invalid. Check ID format.
*   `12019015`: SKU count exceeds 600 limit. Reduce batch size.
*   `12019022`: SKU lacks valid warehouse. Check warehouse config.
*   `12019112`: Seller ID invalid. Check credentials.
*   `12019114`: Seller lacks permission. Check scopes.
*   `12019120`: Product ID count exceeds 100 limit. Reduce batch size.

## 7. Pitfalls & Best Practices
*   **Limit batch size:** Keep `product_ids` under 100, `sku_ids` under 600.
*   **Precedence rule:** API ignores `product_ids` if `sku_ids` present. Send one or other.
*   **Time sync:** Sync system clock to UTC. Bad timestamp causes auth failure.

## 8. Code Example (cURL)
```bash
curl -X POST "https://api-gateway.domain/product/202309/inventory/search?app_key=YOUR_APP_KEY&sign=YOUR_SIGNATURE&timestamp=1696161600&shop_cipher=YOUR_SHOP_CIPHER" \
  -H "content-type: application/json" \
  -H "x-tts-access-token: YOUR_ACCESS_TOKEN" \
  -d '{
    "sku_ids": ["sku_12345", "sku_67890"]
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /product/202309/inventory/search`*
