# TikTok Shop API: Get Global Categories

# API Implementation Guide: Get Global Categories

## 1. Overview
Retrieve product categories. Use to build category selector for product listing. Data is market-independent.

## 2. Endpoint
* **Method**: `GET`
* **Path**: `/product/202309/global_categories`

## 3. Headers & Authentication
Set these headers:
* `Content-Type`: `application/json`
* `x-tts-access-token`: Seller access token.

## 4. Parameters

### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Request signature. |
| `timestamp` | number | Yes | Unix timestamp (UTC). |
| `locale` | string | No | BCP-47 locale code. |
| `keyword` | string | No | Filter by category name. |
| `category_version` | string | No | Category tree version (`v1` or `v2`). |

## 5. Response Structure
API returns JSON. Standard format:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "categories": [
      {
        "id": "12345",
        "parent_id": "0",
        "local_name": "Electronics",
        "is_leaf": false
      }
    ]
  }
}
```

## 6. Error Handling
* **401 Unauthorized**: Invalid `x-tts-access-token`. Refresh token.
* **400 Bad Request**: Invalid `sign` or expired `timestamp`. Re-calculate signature.
* **Rate Limit**: Back off and retry.

## 7. Pitfalls & Best Practices
* **Cache data**: Category tree changes rarely. Cache locally. Do not call API on every page load.
* **Timestamp sync**: Server rejects requests if timestamp drift > 5 minutes. Sync system clock with NTP.
* **Signature order**: Sort query parameters alphabetically before signing.

## 8. Code Example (cURL)

```bash
curl -X GET "https://api.example.com/product/202309/global_categories?app_key=your_app_key&sign=generated_signature&timestamp=1695895200&locale=en-US&category_version=v2" \
  -H "Content-Type: application/json" \
  -H "x-tts-access-token: your_seller_token"
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /product/202309/global_categories`*
