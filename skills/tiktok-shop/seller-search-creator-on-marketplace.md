# TikTok Shop API: Seller Search Creator on Marketplace

# Seller Search Creator on Marketplace API Implementation Guide

## 1. Overview
Search TikTok creators on Creator Marketplace. Use to find affiliate partners for product promotion.

*   **Scope Required**: `seller.creator_marketplace.read`
*   **Version**: `202508`

## 2. Endpoint
*   **Method**: `POST`
*   **Path**: `/affiliate_seller/202508/marketplace_creators/search`

## 3. Headers & Authentication
| Header | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `content-type` | string | Yes | Must be `application/json` |
| `x-tts-access-token` | string | Yes | Seller access token |

## 4. Parameters

### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique developer app key |
| `sign` | string | Yes | Request signature |
| `timestamp` | int | Yes | Unix timestamp (UTC/GMT) |
| `page_token` | string | No | Pagination offset token |
| `page_size` | int | Yes | Page size. Must be `12` or `20` |
| `shop_cipher` | string | Yes | Shop identifier cipher |

### Body Parameters (JSON)
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `search_key` | string | No | Cache key for search results |
| `keyword` | string | No | TikTok Username or Nickname |
| `follower_demographics` | object | No | Follower demographic filters |
| `gmv_ranges` | array[string] | No | GMV range intervals |
| `units_sold_ranges` | array[string] | No | Sales volume range intervals |
| `category` | array[object] | No | Category filters |
| `content_performance` | object | No | Content performance filters |
| `affiliate_data` | object | No | Affiliate data filters |
| `advanced_filters` | object | No | Country specific filters |

## 5. Response Structure
```json
{
  "code": 0,
  "message": "Success",
  "request_id": "20250501120000010002003004",
  "data": {
    "creators": []
  }
}
```
*   `code`: Status indicator (0 for success).
*   `message`: Status description.
*   `request_id`: Unique identifier for debugging.
*   `data`: Creator search results.

## 6. Error Handling
*   **Check Code**: If `code` is not `0`, request failed.
*   **Log Request ID**: Always log `request_id` for API support.
*   **Retry Policy**: Retry on 5xx errors. Do not retry on 4xx errors.

## 7. Pitfalls & Best Practices
*   **Page Size Limit**: `page_size` must be `12` or `20`. Other values cause validation errors.
*   **Signature Generation**: Generate `sign` query parameter using official HMAC-SHA256 algorithm. Include path, query parameters, and request body.
*   **Pagination**: Use `page_token` from response data to fetch next page. Do not calculate offsets manually.

## 8. Code Example (cURL)
```bash
curl -X POST "https://api.tiktok-extension.com/affiliate_seller/202508/marketplace_creators/search?app_key=mock_app_key&sign=mock_signature&timestamp=1714564800&page_size=12&shop_cipher=mock_shop_cipher" \
  -H "content-type: application/json" \
  -H "x-tts-access-token: mock_access_token" \
  -d '{
    "keyword": "creator_username",
    "gmv_ranges": ["1000-5000"]
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_seller/202508/marketplace_creators/search`*
