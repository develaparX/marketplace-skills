# TikTok Shop API: Split Orders

# Split Orders API Guide

## 1. Purpose
API confirms order split. Use when order needs division into multiple packages for shipping.

## 2. Endpoint
`POST https://open-api.tiktokglobalshop.com/fulfillment/202309/orders/{order_id}/split`

## 3. Headers
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token.

## 4. Parameters

### Path
* `order_id` (string, required): TikTok Shop order ID.

### Query
* `app_key` (string, required): App identifier.
* `sign` (string, required): Request signature.
* `timestamp` (number, required): Unix timestamp (UTC).
* `shop_cipher` (string, required): Shop identifier.

### Body
* `splittable_groups` (array, required): List of splittable groups.
* `splittable_groups_v2` (array, optional): List for bundle order splitting. Supports sub-items.

## 5. Response
JSON payload returns status and package IDs.
```json
{
  "code": 0,
  "data": {
    "packages": [
      {
        "splittable_group_id": "123",
        "id": "223362377512830222"
      }
    ]
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

## 6. Errors
* `36009003`: System error. Retry request.
* `21011005`: Bad parameters. Check inputs.
* `21011035`: Split blocked. Order state invalid.

## 7. Pitfalls & Best Practices
* Use `splittable_groups_v2` for bundle orders. Avoids errors on sub-items.
* Match signature timestamp with current time. Old timestamps fail.

## 8. Example
```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/fulfillment/202309/orders/556643423444/split?sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&app_key=38abcd&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{"splittable_groups": [{"id": "123","order_line_item_ids": ["57646237751283022","

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /fulfillment/202309/orders/{order_id}/split`*
