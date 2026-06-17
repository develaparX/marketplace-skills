# TikTok Shop API: Cancel Order

# API Guide: Cancel Order

## 1. Function
Cancel order for seller. Use when stock empty. US/UK markets support partial cancel at item level.

## 2. Endpoint
*   **Method**: `POST`
*   **URL**: `https://open-api.tiktokglobalshop.com/return_refund/202602/cancellations`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (`user_type = 0`).

## 4. Parameters

### Query Parameters
*   `app_key` (string, optional): Unique app key.
*   `sign` (string, optional): Request signature.
*   `timestamp` (number, optional): Unix timestamp GMT (UTC+00:00).
*   `shop_cipher` (string, required): Shop identifier. Required for cross-border shops.

### Body Parameters (JSON)
*   `order_id` (string, required): TikTok Shop order ID.
*   `cancel_reason` (string, required): Reason code. See Return API Overview.
*   `skus` (array, optional): SKUs to cancel.
    *   `sku_id` (string): SKU identifier.
    *   `quantity` (number): Quantity to cancel.
*   `order_line_list` (array, optional): Order lines to cancel. Use this for new integrations.
    *   `order_line_item_id` (string): Line item ID.
    *   `sub_order_line_item_id` (string): Sub line item ID.
*   `order_line_item_ids` (array, optional): Legacy field. Use `order_line_list` instead.

## 5. Response Structure
JSON object:
*   `code` (number): Status code. `0` means success.
*   `message` (string): Error or success message.
*   `request_id` (string): Log ID.
*   `data` (object): Result payload.
    *   `cancel_id` (string): Cancel request ID.
    *   `cancel_status` (string): Status (e.g., `CANCELLATION_REQUEST_SUCCESS`).

## 6. Error Codes
*   `25001001`: Invalid parameter. Check type/format.
*   `25001011`: Already cancelling or cancelled.
*   `25001014`: Bad reason code.
*   `25001015`: Reason not allowed for seller.
*   `25001020`: Reason offline.
*   `25001021`: Reason mismatch order status.
*   `25001028`: Reverse lock failed.
*   `25001045`: Shipped. Cannot cancel.
*   `25001046`: Blocked by risk control.
*   `25001051`: Order complete or cancelled.
*   `25005010`: Cannot cancel line items.
*   `25005011`: Line item limit exceeded.
*   `25020005`: No permission.
*   `36009003`: Internal error. Retry.

## 7. Pitfalls & Best Practices
*   **Legacy Field**: Avoid `order_line_item_ids`. Use `order_line_list` for new integrations.
*   **Cross-Border**: Must pass correct `shop_cipher` or API returns incorrect data.
*   **Partial Cancel**: US/UK only. Out of stock items.
*   **Shipped Orders**: Fail with `25001045`. Check order status before call.

## 8. Example Request

```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/return_refund/202602/cancellations?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "order_id": "577087614418520388",
  "skus": [
    {
      "sku_id": "1729386416015578024",
      "quantity": 1
    }
  ],
  "order_line_item_ids": [
    "577087614418716996"
  ],
  "cancel_reason": "ecom_order_delivered_refund_and_return_reason_wrong_product_seller",
  "order_line_list": [
    {
      "order_line_item_id": "576469648086306986",
      "sub_order_line_item_id": "576469648086306987"
    }
  ]
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /return_refund/202602/cancellations`*
