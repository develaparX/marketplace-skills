# TikTok Shop API: Search Open Collaboration

# Search Open Collaboration API Implementation Guide

## 1. Overview & Use Case
API retrieves open collaboration data from merchants. Get commission rates, showcase counts, creator counts. Use to build product search pages for affiliate creators.

## 2. Endpoint
*   **Method**: `POST`
*   **Path**: `/affiliate_seller/202412/open_collaborations/search`

## 3. Headers & Authentication
*   `Content-Type`: `application/json`
*   `x-tts-access-token`: Seller access token. Required.

## 4. Parameters
Pass parameters in query string or request body based on API gateway setup.

| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Request signature. |
| `timestamp` | number | Yes | Unix timestamp (UTC). |
| `shop_cipher` | string | Yes | Cross-border shop identifier. |
| `page_size` | number | Yes | Range: 1 to 100. |
| `page_token` | string | No | Pagination offset token. |
| `sort_order` | string | No | `ASC` or `DESC` (default). |
| `sort_field` | string | No | Field to sort by (e.g., `product_original_price`). |
| `keyword_type` | string | No | Enum: `PRODUCT_ID`, `PRODUCT_NAME`. |
| `keyword` | string | No | Search value matching `keyword_type`. |
| `top_level_category_id` | string | No | Filter by category ID. |

## 5. Response Structure
JSON object returned.

```json
{
  "code": 0,
  "message": "Success",
  "request_id": "20241208120000010002003",
  "data": {}
}
```

*   `code` (number): Status code. `0` means success.
*   `message` (string): Status description.
*   `request_id` (string): Unique log identifier. Use for debugging.
*   `data` (object): Collaboration details payload.

## 6. Error Handling
*   Check `code` field. If non-zero, request failed.
*   Log `request_id` and `message` on failure.
*   Retry request on network timeout. Do not retry on authorization errors.

## 7. Pitfalls & Best Practices
*   **Timestamp validation**: Server rejects requests with old timestamps. Sync system clock with UTC.
*   **Page size limit**: Keep `page_size` between 1 and 100. Value above 100 triggers validation error.
*   **Signature generation**: Generate `sign` parameter last. Include all query parameters in signature calculation.

## 8. Code Example (cURL)

```bash
curl -X POST "https://api.example.com/affiliate_seller/202412/open_collaborations/search?app_key=123456&sign=abcdef123456&timestamp=1733659200" \
  -H "Content-Type: application/json" \
  -H "x-tts-access-token: valid_seller_token_here" \
  -d '{
    "shop_cipher": "GB_SHOP_999",
    "page_size": 20,
    "keyword_type": "PRODUCT_NAME",
    "keyword": "wireless charger"
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_seller/202412/open_collaborations/search`*
