# TikTok Shop API: Get Order Split Attributes

# Order Split Attributes API Guide

## 1. Purpose & Use Cases
Check if orders can split into multiple packages. Use before split-shipment execution. Prevents fulfillment errors.

## 2. Endpoint & Method
*   **Method:** `GET`
*   **Path:** `/fulfillment/202309/orders/split_attributes`
*   **Base URL:** `https://open-api.tiktokglobalshop.com`

## 3. Headers & Authentication
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (from Get Access Token, `user_type = 0`).

## 4. Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Request signature. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |
| `shop_cipher` | string | Yes | Shop identifier. |
| `order_ids` | array | Yes | Comma-separated TikTok Shop order IDs. |

## 5. Response Structure
Response contains execution status and split rules.

### Key Fields
*   `code`: `0` for success, non-zero for error.
*   `message`: Status description or error reason.
*   `data.split_attributes`: Array of order split rules.
    *   `order_id`: Target order ID.
    *   `can_split`: Boolean. True if split allowed.
    *   `reason`: Reason why split is blocked.
    *   `must_split`: Boolean. True if split required.
    *   `must_split_reasons`: Array of forced split reasons.
        *   `type`: Reason type (e.g., `CATEGORY_ITEM_LIMITATION`).
        *   `category_id`: Target category.
        *   `max_count`: Max items allowed per package.

## 6. Error Handling
*   **Code `36009003`**: Internal error. Action: Retry request. Contact support if error persists.
*   **Non-zero code**: Check `message` field for failure details.

## 7. Pitfalls & Best Practices
*   **Signature Expiry**: Generate fresh `timestamp` and `sign` for every request.
*   **Forced Splits**: Check `must_split` flag. Some categories require separate packages.
*   **Array Format**: Pass `order_ids` as comma-separated values in query string.

## 8. Code Examples

### cURL
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/fulfillment/202309/orders/split_attributes?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&order_ids=556643423443,556643423444' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

### Response Example
```json
{
  "code": 0,
  "data": {
    "split_attributes": [
      {
        "order_id": "556643423444",
        "can_split": false,
        "reason": "Order has been canceled",
        "must_split": false,
        "must_split_reasons": [
          {
            "type": "CATEGORY_ITEM_LIMITATION",
            "category_id": "601990",
            "max_count": "2"
          }
        ]
      }
    ]
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /fulfillment/202309/orders/split_attributes`*
