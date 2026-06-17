# TikTok Shop API: Get Order Detail

# Implement Get Order Detail API

## 1. Purpose
API fetch order detail. Use for sync status, shipping, payment, package info.

## 2. Endpoint
*   **Method**: `GET`
*   **Path**: `/order/202507/orders`
*   **Base URL**: `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token. Get from auth flow.

## 4. Query Parameters
*   `app_key` (string, required): Unique developer app key.
*   `sign` (string, required): Request signature. Generate with sign algorithm.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
*   `ids` (array of strings, required): TikTok Shop order IDs. Max 50.
*   `shop_cipher` (string, required): Shop identifier. Get via Get Authorization Shop API.

## 5. Response Structure
*   `code` (number): Status code. `0` means success.
*   `message` (string): Error or success message.
*   `request_id` (string): Log identifier.
*   `data` (object): Order payload.
    *   `orders` (array): List of orders.
        *   `id` (string): Order ID.
        *   `status` (string): Order status (e.g., `UNPAID`).
        *   `payment` (object): Currency, subtotal, shipping fee, discounts, total.

## 6. Error Handling
*   `10002014`, `10002015`, `10037002`, `10037003`, `10037004`: Order fetch fail. Retry request.
*   `10006402`, `36009003`: Internal error. Retry request.
*   `21008111`: Order/package not belong to seller. Check token and cipher.

## 7. Pitfalls & Best Practices
*   **ID Limit**: Max 50 IDs per request. Batch large requests.
*   **Shop Cipher**: Wrong cipher returns bad data. Get via Shop API first.
*   **Signature**: Generate sign using exact query params.

## 8. Code Example

### Request
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/order/202507/orders?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&ids=57668123555,57668123555' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

### Response
```json
{
  "code": 0,
  "data": {
    "orders": [
      {
        "id": "576461413038785752",
        "cancellation_initiator": "SELLER",
        "shipping_provider": "TT Virtual express",
        "shipping_provider_id": "6617675021119438849",
        "user_id": "7021436810468230477",
        "status": "UNPAID",
        "rts_time": 1619611563,
        "payment": {
          "currency": "IDR",
          "sub_total": "5000",
          "shipping_fee": "5000",
          "seller_discount": "5000",
          "platform_discount": "5000",
          "payment_platform_discount": "10",
          "payment_discount_service_fee": "10",
          "total_amount": "5000",
          "original_total_product_price": "5000"
        }
      }
    ]
  }
}
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /order/202507/orders`*
