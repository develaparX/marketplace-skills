# TikTok Shop API: Diagnose and Optimize Product

# Diagnose and Optimize Product API Guide

## 1. Overview
Diagnose, optimize TikTok Shop product listing. Use before publish or update. Check quality, get suggestions.

## 2. Endpoint
* **Method:** `POST`
* **Path:** `/product/202411/products/diagnose_optimize`

## 3. Auth & Headers
* **Required Scope:** `serller.product.optimize`

### Headers
| Header | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `content-type` | string | Yes | Must be `application/json` |
| `x-tts-access-token` | string | Yes | Seller access token (user_type = 0) |

## 4. Parameters

### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key |
| `sign` | string | Yes | Request signature |
| `timestamp` | integer | Yes | Unix timestamp GMT (UTC+00:00) |
| `shop_cipher` | string | Yes | Shop identifier |

### Body Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `product_id` | string | No | Existing product ID. Omit for new product. |
| `category_id` | string | Yes | Leaf category ID. |
| `description` | string | No | HTML format. Max 10,000 characters. |

## 5. Response Structure
*Schema not defined in API source. Expected structure:*
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "diagnose_result": {
      "score": 85,
      "suggestions": [
        {
          "field": "description",
          "issue": "Too short",
          "suggestion": "Add more product details"
        }
      ]
    }
  }
}
```

## 6. Error Handling
* **400 Bad Request:** Invalid category (not leaf), description > 10k characters.
* **401 Unauthorized:** Invalid token, sign mismatch, expired timestamp.

## 7. Pitfalls & Best Practices
* **Leaf Category:** `category_id` must be leaf node. Parent category causes error.
* **HTML Description:** Keep description under 10,000 characters including HTML tags.
* **Timestamp:** Sync server clock. Request fails if timestamp differs too much from server time.

## 8. Code Example

```bash
curl -X POST "https://api-sandbox.tiktokshop.com/product/202411/products/diagnose_optimize?app_key=test_key&sign=generated_sign&timestamp=1710000000&shop_cipher=test_cipher" \
  -H "content-type: application/json" \
  -H "x-tts-access-token: test_token" \
  -d '{
    "category_id": "123456",
    "description": "<p>Product description text</p>"
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `UNKNOWN /`*
