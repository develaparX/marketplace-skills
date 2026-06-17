# TikTok Shop API: Seller Search Sample Applications

# Seller Search Sample Applications API Guide

## 1. Overview
Search affiliate sample applications. Use to track, filter, process creator requests for product samples.

## 2. Endpoint
*   **Method**: `POST`
*   **Path**: `/affiliate_seller/202508/sample_applications/search`

## 3. Auth & Headers
*   **Scope**: `seller.affiliate_collaboration.read`
*   **Headers**:
    *   `content-type`: `application/json` (Required)
    *   `x-tts-access-token`: Seller access token (Required)

## 4. Parameters

### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key |
| `sign` | string | Yes | Signature from gen algorithm |
| `timestamp` | int | Yes | Unix timestamp GMT (UTC+00:00) |
| `page_token` | string | No | Pagination offset |
| `page_size` | int | No | Size limit: > 0 and <= 50 |
| `shop_cipher` | string | Yes | Shop information cipher |

### Body Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `product_id` | string | No | Product ID |
| `title` | string | No | Product name (fuzzy search) |
| `creator_user_oepn_id` | string | No | TikTok User ID of creator (Note spelling: `oepn`) |
| `username` | string | No | TikTok User Name of creator (fuzzy search) |
| `target_collabration_id` | string | No | Target collaboration ID (Note spelling: `collabration`) |
| `order_id` | string | No | Main order ID for sample |
| `status` | string | No | Status enum. Values: `PENDING`, `AWAITING_SHIPMENT`, `SHIPPED`, `CONTENT_PENDING`, `REJECT_CANCELLED`, `OVERDUE_CANCELLED`, `UNFULFILL_CANCELLED`, `DEL_OPEN_COLLAB`, `SELLER_NOT_SHIP_CANCELLED`, `WITHDRAW_CANCELLED`, `UNFULFILLABLE_CANCELLED`, `OPS_CANCELLED`, `OPS_FAILED`, `OPS_COMPLETED`, `COMPLETED` |

## 5. Response Structure
```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {
    "next_page_token": "string",
    "total_count": 0,
    "sample_applications": [
      {
        "id": "string",
        "commission_rate": "string",
        "status": "string"
      }
    ]
  }
}
```

## 6. Error Handling
Check `code` in response. Non-zero means error. Check `message` for details. Use `request_id` for support logs.

## 7. Pitfalls & Best Practices
*   **Field Typos**: API uses `creator_user_oepn_id` (not `open`) and `target_collabration_id` (not `collaboration`). Use exact spelling.
*   **Page Size**: Keep `page_size` between 1 and 50. Out of range causes error.
*   **Pagination**: Use `next_page_token` from response in next request `page_token` query parameter.

## 8. Code Example (cURL)
```bash
curl -X POST "https://api.example.com/affiliate_seller/202508/sample_applications/search?app_key=YOUR_APP_KEY&sign=YOUR_SIGN&timestamp=1717171717&shop_cipher=YOUR_SHOP_CIPHER&page_size=10" \
  -H "content-type: application/json" \
  -H "x-tts-access-token: YOUR_ACCESS_TOKEN" \
  -d '{
    "status": "PENDING",
    "creator_user_oepn_id": "creator_123"
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_seller/202508/sample_applications/search`*
