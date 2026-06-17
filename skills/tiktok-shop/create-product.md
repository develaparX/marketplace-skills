# TikTok Shop API: Create Product

# Create Product API Implementation Guide

## 1. Purpose
Create new product in seller shop. Use to add inventory.

## 2. Endpoint
*   **Method:** `POST`
*   **Path:** `/product/202309/products`

## 3. Headers & Authentication
*   `content-type`: `application/json` (Required)
*   `x-tts-access-token`: Seller access token (Required)
*   **Required OAuth Scope:** `seller.product.write`

## 4. Parameters

### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key |
| `sign` | string | Yes | Signature from gen algorithm |
| `timestamp` | integer | Yes | Unix timestamp GMT (UTC+00:00) |
| `shop_cipher` | string | Yes | Shop cipher for shop info |

### Body Parameters (JSON)
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `save_mode` | string | No | Values: `AS_DRAFT`, `LISTING`. Default: `LISTING` |
| `description` | string | Yes | Product description. HTML format. Max 10,000 characters. |
| `category_id` | string | Yes | Leaf category ID |

## 5. Response Structure
API metadata lacks response schema. Standard response format:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "product_id": "123456789"
  }
}
```

## 6. Error Handling
*   `400 Bad Request`: Invalid HTML, description too long, or category not leaf.
*   `401 Unauthorized`: Bad `x-tts-access-token` or expired token.
*   `403 Forbidden`: Missing `seller.product.write` scope.
*   `429 Too Many Requests`: Rate limit hit. Implement backoff.

## 7. Pitfalls & Best Practices
*   **Leaf Category Only:** `category_id` must be leaf node. Parent category causes failure.
*   **HTML Limit:** Keep description under 10,000 characters including HTML tags.
*   **Signature Generation:** Generate `sign` query param using correct algorithm before call. Timestamp must be current.

## 8. Code Example (cURL)

```bash
curl -X POST "https://api-gateway.domain/product/202309/products?app_key=YOUR_APP_KEY&sign=YOUR_GENERATED_SIGN&timestamp=1696161600&shop_cipher=YOUR_SHOP_CIPHER" \
  -H "content-type: application/json" \
  -H "x-tts-access-token: YOUR_ACCESS_TOKEN" \
  -d '{
    "save_mode": "LISTING",
    "description": "<p>Product description here. Max 10k chars.</p>",
    "category_id": "100012"
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `UNKNOWN POST /product/202309/products`*
