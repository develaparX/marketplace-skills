# TikTok Shop API: Reject Cancellation

# Reject Cancellation API Guide

Reject buyer cancellation request. Use when order status allows seller rejection.

## Endpoint

`POST https://open-api.tiktokglobalshop.com/return_refund/202309/cancellations/{cancel_id}/reject`

## Headers

*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (user_type = 0)

## Parameters

### Path Parameters
*   `cancel_id` (string, required): Cancellation request ID. Do not use order ID.

### Query Parameters
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Request signature.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
*   `shop_cipher` (string, required): Shop identifier. Get via Get Authorization Shop API.
*   `idempotency_key` (string, optional): Unique UUID. Prevents duplicate processing.

### Request Body (JSON)
*   `reject_reason` (string, required): Rejection reason name. Get valid values from Get Decision Eligibility API.
*   `comment` (string, optional): Seller explanation.
*   `images` (array, optional): Evidence images.
    *   `image_id` (string)
    *   `mime_type` (string)
    *   `height` (number)
    *   `width` (number)

## Response

*   `code` (number): `0` for success, non-zero for error.
*   `message` (string): Result description.
*   `request_id` (string): Log identifier.
*   `data` (object): Return data. Empty on success.

## Critical Errors

*   `25007006`: Order not found.
*   `25011011`: Status cannot reject. Request already processed or expired.
*   `25020010`: Aftersales approved. Rejection blocked.
*   `25001001`: Invalid parameter format.

## Pitfalls & Best Practices

*   **Wrong ID**: Use `cancel_id` from Search Cancellations. Do not use order ID.
*   **Invalid Reason**: Call Get Decision Eligibility first. Use exact reason string returned.
*   **Race Conditions**: Use `idempotency_key` to prevent double-submit errors.

## Example Request

```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/return_refund/202309/cancellations/4035319218955782461/reject?sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&idempotency_key=40b456b1-78e7-412d-9fe6-82181496e1bd&app_key=38abcd' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "reject_reason": "seller_reject_apply_product_has_been_packed",
  "comment": "I have packed the products before cancellation request",
  "images": [
    {
      "image_id": "tos-maliva-i-o3syd03w52-us/57a1c8908fe74572861ea5e50887d8d1",
      "mime_type": "image/png",
      "height": 200,
      "width": 200
    }
  ]
}'
```

## Example Response

```json
{
  "code": 0,
  "data": {},
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /return_refund/202309/cancellations/{cancel_id}/reject`*
