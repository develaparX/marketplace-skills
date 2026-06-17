# TikTok Shop API: Listing quality diagnosis

# TikTok Shop Listing Quality Diagnosis Integration Guide

## 1. Purpose & Use Cases

API diagnose product listing quality. Prevent product block. Use cases:

*   **Pre-listing check**: Use Check Product Listing API (v202309) before publish. Prevent bad listings.
*   **Live catalog check**: Use Product Information Issue Diagnosis API (v202405) on active products. Find active issues.
*   **Filter low quality**: Use Search Products API (v202312) to find products in specific quality tier (US market).
*   **Fix issues**: Use Get Product API (v202309) to read current values. Update fields.

---

## 2. Endpoints & HTTP Methods

Refer to official documentation pages for exact gateway paths:

*   **Check Product Listing API (v202309)**: `POST` 
    *   Doc: `https://partner.tiktokshop.com/docv2/page/650a0ee8f1fd3102b91c6493`
*   **Product Information Issue Diagnosis API (v202405)**: `POST`
    *   Doc: `https://partner.tiktokshop.com/docv2/page/665048f380b6b302e73917d9`
*   **Search Products API (v202312)**: `POST`
    *   Doc: `https://partner.tiktokshop.com/docv2/page/65854ffb8f559302d8a6acda?external_id=65854ffb8f559302d8a6acda`
*   **Get Product API (v202309)**: `GET`
    *   Doc: `https://partner.tiktokshop.com/docv2/page/6509d85b4a0bb702c057fdda?external_id=6509d85b4a0bb702c057fdda`

---

## 3. Headers & Authentication

All requests require query parameters and headers.

### Query Parameters
*   `app_key`: App identifier.
*   `timestamp`: Epoch timestamp (seconds).
*   `sign`: HMAC-SHA256 signature.
*   `shop_id`: Target seller shop ID.

### Headers
```http
Content-Type: application/json
x-tts-access-token: ACCESS_TOKEN
```

---

## 4. Parameters

### Check Product Listing API (v202309)
Pass product payload in request body:

| Field | Type | Description |
| :--- | :--- | :--- |
| `title` | String | Product title |
| `description` | String | Product description |
| `main_images` | Array | Image URLs |
| `product_attributes` | Array | Category attributes |
| `skus.sales_attributes` | Array | SKU attributes |
| `size_chart` | Object | Size chart image/info |

### Product Information Issue Diagnosis API (v202405)
Pass product identifier in request body:

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `product_id` | String | Yes | Target product ID |

### Search Products API (v202312)
Pass search filters in request body:

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `quality_tier` | String | No | Filter by tier (e.g., `FAIR`) |
| `page_size` | Integer | Yes | Max 100 |
| `page_token` | String | No | Pagination token |

---

## 5. Response Structure

Diagnosis APIs return quality tier and failed rules.

### Example Diagnosis Response
```json
{
  "code": 0,
  "message": "Success",
  "data": {
    "quality_tier": "FAIR",
    "diagnose_results": [
      {
        "field": "description",
        "code": "DESCRIPTION_CHARACTERS_LESS_THAN_80_CHARS",
        "recommendation": "Provide a description of at least 80 characters and/or add images."
      },
      {
        "field": "main_images",
        "code": "MAIN_IMG_FIRST_IMG_TEXT_OVERLOAD",
        "recommendation": "First image: Use an image that does not contain logos, watermarks, graphics, and text."
      }
    ]
  }
}
```

---

## 6. Error Handling

*   **HTTP 400/403**: Auth signature invalid or token expired. Refresh token. Recalculate signature.
*   **HTTP 429**: Rate limit hit

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `UNKNOWN /`*
