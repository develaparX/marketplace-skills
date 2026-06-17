# TikTok Shop API: Recommend Global Categories

# Recommend Global Categories API Implementation Guide

## 1. Overview
API suggest global product categories. Use during product creation flow. Input title, description, images. Get category recommendations.

## 2. Endpoint
*   **Method:** `POST`
*   **Path:** `/product/202309/global_categories/recommend`

## 3. Authentication & Headers
Required scope: `seller.global_product.category.info`

### Headers
*   `content-type`: `application/json` (Required)
*   `x-tts-access-token`: Seller access token (Required)

## 4. Parameters

### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key |
| `sign` | string | Yes | Request signature |
| `timestamp` | int | Yes | Unix timestamp (UTC) |

### Request Body (JSON)
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `product_title` | string | Yes | Product title |
| `description` | string | No | HTML format. Max 10,000 characters |
| `images` | array[object] | No | Product images |
| `category_version` | string | No | US market: `v2` (7-level). Others: `v1` (3-level). Default: `v1` |

## 5. Response Structure
```json
{
  "code": 0,
  "message": "success",
  "request_id": "20230915102030abc123",
  "data": {}
}
```
*   `code`: Status code. `0` means success.
*   `message`: Status description.
*   `request_id`: Log identifier. Use for debugging.
*   `data`: Recommended category details.

## 6. Error Handling
*   Check `code` in response.
*   If `code` not `0`, request failed.
*   Log `request_id` and `message` for troubleshooting.

## 7. Pitfalls & Best Practices
*   **US Market:** Set `category_version` to `v2`. Default `v1` fails US 7-level structure.
*   **Description Limit:** HTML description must stay under 10,000 characters. Truncate before sending.
*   **Signature:** Generate `sign` using exact query parameters and timestamp.

## 8. Code Example (cURL)

```bash
curl -X POST "https://api.example.com/product/202309/global_categories/recommend?app_key=YOUR_APP_KEY&timestamp=1694773230&sign=GENERATED_SIGNATURE" \
  -H "content-type: application/json" \
  -H "x-tts-access-token: YOUR_ACCESS_TOKEN" \
  -d '{
    "product_title": "Wireless Bluetooth Headphones",
    "description": "<p>High quality sound with noise cancellation.</p>",
    "category_version": "v2"
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /product/202309/global_categories/recommend`*
