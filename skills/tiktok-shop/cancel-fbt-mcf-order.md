# TikTok Shop API: Cancel FBT MCF Order

# Cancel FBT MCF Order API Guide

API cancel FBT MCF order. Use when need stop shipment of specific consign order.

## Endpoint

*   **Method:** `POST`
*   **URL:** `https://open-api.tiktokglobalshop.com/fbt/202601/mcf_outbound_orders/cancel`

## Headers

*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token.

## Query Parameters

*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Signature from gen algorithm.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
*   `shop_cipher` (string, required): Shop cipher code.

## Request Body

*   `mcf_order_id` (string, required): Unique MCF order ID.
*   `consign_orders` (array, optional): List of consign orders to cancel.
    *   `id` (string): Consign order ID.

## Response Fields

*   `code` (number): Status code. `0` mean success.
*   *   `message` (string): Status message.
*   `request_id` (string): Request log ID.
*   `data` (object): Return payload.
    *   `mcf_order` (object): Order details.
        *   `external_order_id` (string): External system ID.
        *   `mcf_order_id` (string): MCF order ID.
        *   `consign_orders` (array): Cancelled consign orders.
            *   `id` (string): Consign order ID.
            *   `status` (string): Order status.

## Error Codes

*   `177001009`: Internal error. Action: Retry request. Contact support if fail persist.

## Pitfalls & Best Practices

*   **Sign generation:** Generate signature using exact query parameters. Wrong sign cause auth failure.
*   **Timestamp:** Use current UTC timestamp. Old timestamp cause rejection.
*   **Partial cancellation:** Pass specific consign order IDs in `consign_orders` array to cancel parts of order.

## Code Example

```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/fbt/202601/mcf_outbound_orders/cancel?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "mcf_order_id": "7136104329798256386",
  "consign_orders": [
    {
      "id": "OBF7136104329798256386"
    }
  ]
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /fbt/202601/mcf_outbound_orders/cancel`*
