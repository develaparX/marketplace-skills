# TikTok Shop API: Get Order List

# Implementation Guide: Get Order List API

## 1. Purpose
Fetch orders. Use for sync, status track, filter by date/status.

## 2. Endpoint
*   **Method**: `POST`
*   **Path**: `/order/202309/orders/search`

## 3. Headers & Auth
*   `Content-Type`: `application/json`
*   `x-tts-access-token`: Seller access token.
*   Query parameters for auth: `app_key`, `sign`, `timestamp`, `shop_cipher`.

## 4. Parameters

### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Signature from gen algorithm. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |
| `shop_cipher` | string | Yes | Shop identifier. |

### Request Body (JSON)
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `page_size` | number | Yes | Results per page. Range: [1-100]. Default: 20. |
| `sort_order` | string | No | `ASC` or `DESC`. Default: `DESC`. |
| `page_token` | string | No | Token for next page. |
| `sort_field` | string | No | `create_time` or `update_time`. Default: `create_time`. |
| `order_status` | string | No | Status: `UNPAID`, `ON_HOLD`, `AWAITING_SHIPMENT`, `PARTIALLY_SHIPPING`, `AWAITING_COLLECTION`, `IN_TRANSIT`, `DELIVERED`, `COMPLETED`, `CANCELLED`. |
| `create_time_ge` | number | No | Created on/after Unix timestamp. |
| `create_time_lt` | number | No | Created before Unix timestamp. |
| `update_time_ge` | number | No | Updated on/after Unix timestamp. |
| `update_time_lt` | number | No | Updated before Unix timestamp. |
| `shipping_type` | string | No | `TIKTOK`, `SELLER`, `TIKTOK_DIGITAL`. |
| `buyer_user_id` | string | No | Buyer ID. |
| `is_buyer_request_cancel` | boolean | No | Buyer cancel request status. |
| `warehouse_ids` | array | No | Warehouse IDs. Max count: 100. |

## 5. Response Structure
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "orders": [
      {
        "order_id": "string"
      }
    ],
    "next_page_token": "string",
    "has_more": true
  }
}
```

## 6. Error Handling
*   `400 Bad Request`: Invalid parameters. Check types.
*   `401 Unauthorized`: Token expired or invalid signature. Refresh token.
*   `429 Too Many Requests`: Rate limit hit. Back off.
*   `500 Internal Error`: Server issue. Retry with backoff.

## 7. Pitfalls & Best Practices
*   **Pagination**: Use `page_token` for next page. Do not skip.
*   **Timezones**: Use Unix timestamp (UTC).
*   **Delta sync**: Use `update_time_ge` to pull new changes. Avoid full scans.
*   **Rate limit**: Implement exponential backoff.

## 8. Code Example
```bash
curl -X POST "https://api.example.com/order/202309/orders/search?app_key=123&sign=abc&timestamp=1690000000&shop_cipher=xyz" \
  -H "Content-Type: application/json" \
  -H "x-tts-access-token: token123" \
  -d '{
    "page_size": 20,
    "order_status": "AWAITING_SHIPMENT"
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /order/202309/orders/search`*
