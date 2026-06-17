# TikTok Shop API: Create Return

# Implement Create Return API

API create return request for buyer. Use when seller start return process.

## Endpoint

*   **Method**: `POST`
*   **Path**: `/return_refund/202602/returns`
*   **Base URL**: `https://open-api.tiktokglobalshop.com`

## Headers & Auth

*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (from Get Access Token, `user_type = 0`).

## Parameters

### Query Parameters

| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | No | Unique app key. |
| `sign` | string | No | Signature from gen algorithm. |
| `timestamp` | number | No | Unix timestamp UTC. |
| `shop_cipher` | string | Yes | Shop identifier. |
| `idempotency_key` | string | No | Prevent double requests. |

### Request Body (JSON)

| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `order_id` | string | Yes | TikTok Shop order ID. |
| `return_reason` | string | Yes | Seller reason code. |
| `return_type` | string | Yes | `REFUND` or `RETURN_AND_REFUND`. |
| `skus` | array | No | SKU list. |
| `order_line_item_ids` | array | No | Order line IDs. |
| `refund_total` | string | No | Refund amount. |
| `currency` | string | No | Currency code. Must match order currency. |
| `shipment_type` | string | No | Return shipping method. Values: `PLATFORM`, `BUYER_ARRANGE`. |
| `handover_method` | string | No | Handover method. Values: `DROP_OFF`, `PICKUP`. Use only if `shipment_type` is `PLATFORM`. |
| `order_line_list` | array | No | Line items for bundle splitting. |

## Response Structure

JSON object containing:

*   `code` (number): Status code. `0` mean success.
*   `message` (string): Status message.
*   `request_id` (string): Log ID.
*   `data` (object): Return details.
    *   `return_id` (string): Unique return ID.
    *   `return_status` (string): Current status.

## Error Handling

Check `code` in response. Common error codes:

| Code | Description | Action |
| :--- | :--- | :--- |
| `25001003` | Invalid order status. | Check order state before call. |
| `25001010` / `25001011` | Return exists or order cancelled. | Stop request. |
| `25001014` / `25001015` / `25001020` | Reason code invalid or offline. | Use valid reason code. |
| `25005005` | Refund amount too high. | Reduce `refund_total`. |
| `25020005` | Permission denied. | Check `shop_cipher` and token. |

## Pitfalls & Best Practices

*   **Double requests**: Always send `idempotency_key` in query. Prevent double refund.
*   **Currency match**: `currency` must match order currency. Check order details first.
*   **Conditional fields**: Only send `handover_method` if `shipment_type` set to `PLATFORM`.
*   **Risk control**: Code `25001046` mean TikTok risk block. Cannot bypass. Inform user.

## Code Example

```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/return_refund/202602/returns?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&idempotency_key=1623812664' \
-H 'content-type: application/json' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-d '{
  "order_id": "576473917261320779",
  "skus": [
    {
      "sku_id": "1729386416015578024",
      "quantity": 1
    }
  ],
  "order_line_item_ids": [
    "455764739172614518516"
  ],
  "return_reason": "ecom_order_delivered_refund_reason_missing_product_seller",
  "return_type": "REFUND",
  "refund_total": "10.5",
  "currency": "USD",
  "shipment_type": "PLATFORM",
  "handover_method": "DROP_OFF"
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /return_refund/202602/returns`*
