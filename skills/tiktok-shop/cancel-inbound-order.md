# TikTok Shop API: Cancel Inbound Order

# Implement: Cancel Inbound Order

## Purpose
Cancel inbound order before warehouse arrival. Prevent processing. Update status.

## Endpoint
* **Method**: `POST`
* **Path**: `/fbt/202602/inbound_orders/cancel`

## Headers & Auth
* `content-type`: `application/json` (Required)
* `x-tts-access-token`: Seller access token (Required. Get from token API, `user_type = 0`).

## Parameters

### Query Parameters
* `app_key` (string, required): Unique app key.
* `sign` (string, required): Signature from gen algorithm.
* `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
* `shop_cipher` (string, required): Shop identifier.

### Body Parameters (JSON)
* `order_id` (string, required): Numeric ID. No "IBR" prefix.
* `cancel_reason` (string, required): Reason text.

## Response Structure
* `code` (number): Status code. `0` means success.
* `message` (string): Success/error message.
* `request_id` (string): Log identifier.
* `data` (object): Return data. Empty on success.

## Error Codes
* `36009003`: Internal error. Retry.
* `39001002`: Empty request/parameters. Check input.
* `39015007`: Access denied. Seller must bind to one merchant.
* `39015009`: Invalid SellerId.
* `39015010`: No inbound orders for merchant.
* `39015013`: Invalid/missing cancel reason.
* `39015014`: Status/business restriction. Check order status.

## Pitfalls & Best Practices
* Strip "IBR" prefix from `order_id`. Use numbers only.
* Check order status before call. Cannot cancel after warehouse arrival.
* Ensure seller binds to exactly one merchant. Avoid error `39015007`.

## Example Request (cURL)
```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/fbt/202602/inbound_orders/cancel?timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "order_id": "5766071177167344427",
  "cancel_reason": "Order created by mistake."
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
*Endpoint: `POST /fbt/202602/inbound_orders/cancel`*
