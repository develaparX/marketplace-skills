# TikTok Shop API: Add External Order References

# Add External Order References API

## 1. Purpose
Link external OMS order data to TikTok Shop order. Use to sync external platform (e.g. Shopify) to TikTok Shop.

## 2. Endpoint
* **Method:** `POST`
* **URL:** `https://open-api.tiktokglobalshop.com/order/202406/orders/external_orders`

## 3. Headers & Auth
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token (user_type = 0)

## 4. Parameters

### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `shop_cipher` | string | Yes | Shop identifier |
| `app_key` | string | Yes | Unique app key |
| `sign` | string | Yes | Request signature |
| `timestamp` | number | Yes | Unix timestamp (UTC) |

### Request Body
* `orders` (array, required): Max 100 items.
  * `id` (string, required): TikTok order ID.
  * `external_order` (object, required): External order details.
    * `id` (string, required): External order ID.
    * `platform` (string, required): External platform name (e.g., `SHOPIFY`).
    * `line_items` (array, optional): Line item mapping.
      * `id` (string, required): TikTok line item ID.
      * `origin_id` (string, required): External line item ID.

## 5. Response Structure
* `code` (number): Status code. `0` means success.
* `message` (string): Status message.
* `request_id` (string): Log identifier.
* `data` (object): Return payload. Contains `errors` array if items fail.

## 6. Error Handling
Check `code` in response. If `code` not `0`, request failed. Check `data.errors` for item-level failures.
* Error code `36020001`: Invalid order ID.

## 7. Pitfalls & Best Practices
* **Batch limit:** Max 100 orders per request. Split big payloads.
* **Signature:** Generate `sign` correctly using TikTok algorithm.
* **Token:** Use seller token, not partner token.

## 8. Code Example

### Request
```bash
curl -X POST \
'https://open-api.tiktokglobalshop.com/order/202406/orders/external_orders?shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "orders": [
    {
      "id": "576461413038785752",
      "external_order": {
        "id": "676461413038785752",
        "platform": "SHOPIFY",
        "line_items": [
          {
            "id": "577086512123755123",
            "origin_id": "677086512123755123"
          }
        ]
      }
    }
  ]
}'
```

### Response
```json
{
  "code": 0,
  "data": {
    "errors": [
      {
        "code": "36020001",
        "message": "Invalid order_id",
        "detail": {
          "order_id": "576461413038785752",
          "external_order": {
            "id": "676461413038785752",
            "platform": "SHOPIFY"
          }
        }
      }
    ]
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /order/202406/orders/external_orders`*
