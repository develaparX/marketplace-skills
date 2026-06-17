# TikTok Shop API: Create Global Product

# Create Global Product API Guide

## 1. Purpose
Create global product. Use for listing new items.

## 2. Endpoint
* **Method:** `POST`
* **Path:** `/product/202309/global_products`

## 3. Headers & Authentication
* **Scope required:** `seller.global_product.write`

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
| `timestamp` | int | Yes | Unix timestamp GMT |

### Body Parameters (JSON)
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | string | Yes | Product title. Length limits:<br>- DE, ES, FR, IE, IT, JP, UK, US: [1, 255]<br>- MX: [1, 300]<br>- Others: [25, 255] |
| `description` | string | Yes | HTML format. Max 10,000 characters. Max 30 `<img>` tags under 4000px |
| `category_id` | string | Yes | Leaf category ID. Status must be AVAILABLE |
| `brand_id` | string | No | Brand ID |
| `main_images` | array of objects | Yes | Image list. Max 9. Dimensions: 300x300px to 4000x4000px |

## 5. Response Structure
Returns JSON object containing created product details.

```json
{
  "code": 0,
  "message": "Success",
  "data": {
    "global_product_id": "123456789"
  }
}
```

## 6. Error Handling
* **400 Bad Request:** Invalid input. Check title length or image dimensions.
* **401 Unauthorized:** Invalid `x-tts-access-token` or signature.
* **403 Forbidden:** Missing scope `seller.global_product.write`.
* **409 Conflict:** Product duplicate or category unavailable.

## 7. Pitfalls & Best Practices
* **Title length:** Check target country before sending. Mexico allows 300 characters. Others limit to 255.
* **HTML description:** Count HTML tags in character limit. Do not exceed 10,000 characters.
* **Images:** Verify image dimensions before upload. Minimum 300x300px, maximum 4000x4000px.
* **Category:** Verify category ID is leaf node. Parent categories fail.

## 8. Code Example

```bash
curl -X POST "https://api.example.com/product/202309/global_products?app_key=YOUR_APP_KEY&sign=YOUR_SIGNATURE&timestamp=1696118400" \
  -H "content-type: application/json" \
  -H "x-tts-access-token: YOUR_ACCESS_TOKEN" \
  -d '{
    "title": "Sample Global Product",
    "description": "<p>Product description</p><img src=\"https://example.com/img.jpg\" />",
    "category_id": "12345",
    "brand_id": "67890",
    "main_images": [
      {
        "url": "https://example.com/img.jpg"
      }
    ]
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `UNKNOWN /`*
