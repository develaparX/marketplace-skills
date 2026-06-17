# TikTok Shop API: Approve Cancellation

# Approve Cancellation API Implementation Guide

## 1. Overview
Approve buyer-initiated cancellation. Use only when request waits for seller action.

## 2. Endpoint
*   **Method:** `POST`
*   **URL:** `https://open-api.tiktokglobalshop.com/return_refund/202309/cancellations/{cancel_id}/approve`

## 3. Headers
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (from Get Access Token, `user_type = 0`).

## 4. Parameters

### Path Parameter
*   `cancel_id` (string, required): Cancellation request ID. Get from Search Cancellations. Do not use order ID.

### Query Parameters
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Signature from gen algorithm.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
*   `shop_cipher` (string, required): Shop identifier. Get from Get Authorization Shop.
*   `idempotency_key` (string, optional): Unique UUID to prevent double execution. Max 255 characters.

## 5. Response Structure
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message. Failure details here.
*   `request_id` (string): Log identifier.
*   `data` (object): Empty on success.

## 6. Error Handling
Handle these specific error codes:
*   `25001003`: Invalid order status.
*   `25001045`: Order shipped. Cannot cancel.
*   `25011012`: Status cannot approve.
*   `25020005`: No permission for order.
*   `36009003`: Internal error. Retry request.

## 7. Pitfalls & Best Practices
*   **Wrong ID:** Do not pass order ID to `cancel_id`. Use ID from Search Cancellations.
*   **Cross-border Shops:** Must pass correct `shop_cipher` or request fails.
*   **Network Timeout:** Use `idempotency_key` to retry safely. Avoid double approval.

## 8. Code Example

```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/return_refund/202309/cancellations/98001001/approve?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&idempotency_key=40b456b1-78e7-412d-9fe6-82181496e1bd' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /return_refund/202309/cancellations/{cancel_id}/approve`*
