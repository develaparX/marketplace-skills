# TikTok Shop API: Get Tracking

# Implement Get Tracking API

## 1. Purpose
Get logistics tracking info for order. Use when buyer or system need shipping status.

## 2. Endpoint
*   **Method:** `GET`
*   **Base URL:** `https://open-api.tiktokglobalshop.com`
*   **Path:** `/fulfillment/202309/orders/{order_id}/tracking`

## 3. Headers
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (from Get Access Token, user_type = 0)

## 4. Parameters

### Path Parameter
*   `order_id` (string, required): TikTok Shop order ID.

### Query Parameters
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Signature from gen algorithm.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
*   `shop_cipher` (string, required): Shop cipher for shop info.

## 5. Response Structure
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message. Fail reasons show here.
*   `request_id` (string): Log ID for debug.
*   `data` (object): Payload.
    *   `tracking` (array): List of tracking events.
        *   `description` (string): Event details.
        *   `update_time_millis` (number): Event time in epoch milliseconds.
        *   `action_code` (number): Event action code.

## 6. Error Handling
*   **Code `36009003`**: Internal error. Retry request. Contact support if fail persist.
*   **Non-zero code**: Request fail. Check `message` field for details.

## 7. Pitfalls & Best Practices
*   **Timestamp expire**: Use current UTC time. Old timestamp cause auth fail.
*   **Signature fail**: Check sign algorithm inputs. Order of query parameters matter.
*   **Path variable**: Put `order_id` in path. Do not put in query parameters.

## 8. Code Example

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/fulfillment/202309/orders/576461413038785752/tracking?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /fulfillment/202309/orders/{order_id}/tracking`*
