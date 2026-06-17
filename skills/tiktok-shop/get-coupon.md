# TikTok Shop API: Get Coupon

# Implementation Guide: Get Coupon API

## 1. Purpose
Get coupon details by ID. Use to check coupon status, validity times, display channels.

## 2. Endpoint
*   **Method**: `GET`
*   **Base URL**: `https://open-api.tiktokglobalshop.com`
*   **Path**: `/promotion/202406/coupons/{coupon_id}`

## 3. Headers & Authentication
*   `content-type`: `application/json` (Required)
*   `x-tts-access-token`: Seller access token. Required. Use token from seller login (user_type = 0).

## 4. Parameters

### Path Parameters
*   `coupon_id` (string, required): Target coupon ID.

### Query Parameters
*   `app_key` (string, required): Unique app identifier.
*   `sign` (string, required): Request signature. Generate via platform algorithm.
*   `timestamp` (number, required): Unix timestamp in seconds (UTC+00:00).
*   `shop_cipher` (string, required): Shop identifier.

## 5. Response Structure
Returns JSON object:
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Log identifier for debugging.
*   `data` (object): Coupon details.
    *   `coupon` (object):
        *   `id` (string): Coupon ID.
        *   `title` (string): Coupon name.
        *   `display_type` (string): Display location.
        *   `status` (string): Coupon state (e.g., `NOT_START`).
        *   `create_time` (number): Creation timestamp (milliseconds).
        *   `update_time` (number): Update timestamp (milliseconds).
        *   `claim_duration` (object): Claim start/end times (seconds).
        *   `redemption_duration` (object): Usage start/end times (seconds).
        *   `display_channels` (array): Allowed channels.

## 6. Error Handling
*   **Error Code `36009003`**: Internal error. Retry request. Contact support if error persists.
*   **Non-zero `code`**: Request failed. Check `message` for details.

## 7. Pitfalls & Best Practices
*   **Trailing Newlines**: Response fields `display_type` and `status` contain `\n` characters. Strip whitespace before comparison.
*   **Timestamp Unit**: Query parameter `timestamp` uses seconds. Response fields `create_time`/`update_time` use milliseconds. Convert units before compare.
*   **Signature Expiry**: Generate new `sign` and `timestamp` for every request. Old timestamps cause authentication failure.

## 8. Code Example

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/promotion/202406/coupons/7136104329798256386?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /promotion/202406/coupons/{coupon_id}`*
