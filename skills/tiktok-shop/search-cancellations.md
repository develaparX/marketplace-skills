# TikTok Shop API: Search Cancellations

# Search Cancellations API Implementation Guide

## 1. Purpose
Search, retrieve order cancellations. Sync cancellation requests. Check buyer refund status.

## 2. Endpoint
*   **Method:** `POST`
*   **URL:** `https://open-api.tiktokglobalshop.com/return_refund/202602/cancellations/search`

## 3. Headers & Authentication
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (from Get Access Token, `user_type = 0`).

## 4. Parameters

### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Request signature. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |
| `shop_cipher` | string | Yes | Shop identifier. |
| `sort_field` | string | No | Sort field. Values: `create_time` (default), `update_time`. |
| `sort_order` | string | No | Sort order. Values: `ASC` (default), `DESC`. |
| `page_size` | string | No | Results per page. Range: `1-50`. Default: `10`. |
| `page_token` | string | No | Pagination token for next page. |

### Body Parameters (JSON)
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `cancel_ids` | array[string] | No | List of cancellation IDs. |
| `order_ids` | array[string] | No | List of TikTok Shop order IDs. |
| `buyer_user_ids` | array[string] | No | List of buyer IDs. |
| `cancel_types` | array[string] | No | Cancellation types. Values: `CANCEL`, `BUYER_CANCEL`. |
| `cancel_status` | array[string] | No | Statuses. Values: `CANCELLATION_REQUEST_PENDING`, `CANCELLATION_REQUEST_SUCCESS`, `CANCELLATION_REQUEST_CANCEL`, `CANCELLATION_REQUEST_COMPLETE`. |
| `create_time_ge` | number | No | Min creation time (Unix timestamp). |
| `create_time_lt` | number | No | Max creation time (Unix timestamp). |
| `update_time_ge` | number | No | Min update time (Unix timestamp). |
| `update_time_lt` | number | No | Max update time (Unix timestamp). |
| `locale` | string | No | BCP-47 locale code. Default: `en-US`. |

## 5. Response Structure
*   `code` (number): Status code. `0` means success.
*   `message` (string): Error details.
*   `request_id` (string): Log identifier.
*   `data` (object): Contains `cancellations` array.
    *   `cancellations` (array):
        *   `order_id` (string): Order ID.
        *   `cancel_type` (string): Type.
        *   `cancel_status` (string): Status.
        *   `role` (string): Requester role.
        *   `cancel_reason` (string): Machine reason.
        *   `cancel_reason_text` (string): Human reason.
        *   `create_time` (number): Creation timestamp.
        *   `update_time` (number): Update timestamp.
        *   `seller_next_action_response` (array): Actions required by seller.
            *   `action` (string): Action name.
            *   `deadline` (number): Action deadline timestamp.
        *   `refund_amount` (object):
            *   `currency` (string): Currency code.
            *   `refund_total` (string): Refund amount value.

## 6. Error Handling
Handle these API error codes:
*   `25001001`: Invalid parameter. Check types, formats.
*   `25020005`: No permission. Check shop authorization.
*   `25020008`: Internal error. Retry request.
*   `36009003`: Internal error. Retry request.

## 7. Pitfalls & Best Practices
*   **Pagination**: Use `page_token` from response to fetch next page. Do not recalculate offsets.
*   **Time Filters**: Use Unix timestamps. Ensure correct range (`_ge` <= `_lt`).
*   **Signatures**: Generate `sign` query parameter using official algorithm. Incorrect signature causes authentication failure.

## 8. Code Example

```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/return_refund/202602/cancellations/search?sort_field=update_time&page_size=10&page_token=aDU2dHIzMlFhME5CUzJKUDhDdVJhTDM1WmJkeFVTVW9LTkRaSnNaZCtuWjJXVU5CSDhlaA==&sort_order=ASC&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "cancel_ids": [
    "577087614418520388"
  ],
  "order_ids": [
    "577087614418520388"
  ],
  "buyer_user_ids": [
    "7494845267308415300"
  ],
  "cancel_types": [
    "CANCEL"
  ],
  "cancel_status": [
    "CANCELLATION_REQUEST_PENDING"
  ],
  "create_time_ge": 1690340825,
  "create_time_lt": 1690340825
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /return_refund/202602/cancellations/search`*
