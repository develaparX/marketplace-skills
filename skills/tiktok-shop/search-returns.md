# TikTok Shop API: Search Returns

# Search Returns API Guide

## 1. Purpose
Search, filter TikTok Shop return requests. Use to sync return status, track refunds, manage disputes.

## 2. Endpoint
*   **Method**: `POST`
*   **Path**: `/return_refund/202602/returns/search`

## 3. Headers
*   `content-type`: `application/json` (Required)
*   `x-tts-access-token`: Seller access token (Required)

## 4. Parameters

### Query Parameters
| Name | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | - | App key |
| `sign` | string | Yes | - | Signature from gen algorithm |
| `timestamp` | int | Yes | - | Unix timestamp UTC |
| `sort_field` | string | No | `create_time` | Sort field: `create_time`, `update_time` |
| `sort_order` | string | No | `ASC` | Sort order: `ASC`, `DESC` |
| `page_size` | string | No | `10` | Size range: 10-50 |
| `page_token` | string | No | - | Token for next page |
| `shop_cipher` | string | Yes | - | Shop identifier |

### Body Parameters (JSON)
| Name | Type | Required | Description / Allowed Values |
| :--- | :--- | :--- | :--- |
| `return_ids` | []string | No | Return IDs list |
| `order_ids` | []string | No | Order IDs list |
| `buyer_user_ids` | []string | No | Buyer IDs list |
| `return_types` | []string | No | `REFUND`, `RETURN_AND_REFUND`, `REPLACEMENT` |
| `return_status` | []string | No | Status list: `RETURN_OR_REFUND_REQUEST_PENDING`, `REFUND_OR_RETURN_REQUEST_REJECT`, `AWAITING_BUYER_SHIP`, `BUYER_SHIPPED_ITEM`, `REJECT_RECEIVE_PACKAGE`, `RETURN_OR_REFUND_REQUEST_SUCCESS`, `RETURN_OR_REFUND_REQUEST_CANCEL`, `RETURN_OR_REFUND_REQUEST_COMPLETE`, `REPLACEMENT_REQUEST_PENDING`, `REPLACEMENT_REQUEST_REJECT`, `REPLACEMENT_REQUEST_REFUND_SUCCESS`, `REPLACEMENT_REQUEST_CANCEL`, `REPLACEMENT_REQUEST_COMPLETE`, `AWAITING_BUYER_RESPONSE` |
| `seller_proposed_return_type` | []string | No | `PARTIAL_REFUND` |
| `create_time_ge` | int | No | Created on/after timestamp |
| `create_time_lt` | int | No | Created before timestamp |
| `update_time_ge` | int | No | Updated on/after timestamp |
| `update_time_lt` | int | No | Updated before timestamp |
| `arbitration_status` | []string | No | `IN_PROGRESS`, `SUPPORT_BUYER`, `SUPPORT_SELLER`, `CLOSED` |
| `locale` | string | No | BCP-47 locale (Default: `en`) |

## 5. Response Structure
```json
{
  "code": 0,
  "message": "success",
  "request_id": "20260201...",
  "data": {}
}
```

## 6. Error Handling
*   Check `code` field. Non-zero code means failure.
*   Log `request_id` for debugging.

## 7. Pitfalls & Best Practices
*   **Page Size Limit**: Keep `page_size` between 10 and 50. Request fails if outside range.
*   **Time Filters**: Use Unix epoch seconds for `create_time` and `update_time` filters.
*   **Signature**: Generate `sign` using query parameters. Do not include body parameters in signature generation.

## 8. Code Example (cURL)
```bash
curl -X POST "https://api.tiktokshop.com/return_refund/202602/returns/search?app_key=test_key&sign=test_sign&timestamp=1700000000&shop_cipher=shop_123" \
  -H "content-type: application/json" \
  -H "x-tts-access-token: token_val" \
  -d '{
    "return_types": ["REFUND"],
    "page_size": "20"
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /return_refund/202602/returns/search`*
