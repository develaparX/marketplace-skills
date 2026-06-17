# TikTok Shop API: Remove Open Collaboration

# Remove Open Collaboration API

## Overview
Terminate open collaboration for product. Use only when status is `NORMAL`.

## Endpoint
*   Method: `DELETE`
*   URL: `https://open-api.tiktokglobalshop.com/affiliate_seller/202409/open_collaborations/products/{product_id}`

## Headers
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (from Get Access Token, user_type = 0).

## Parameters
### Path
*   `product_id` (string, required): Product ID to terminate.

### Query
*   `app_key` (string, required): App key.
*   `sign` (string, required): Signature.
*   `timestamp` (number, required): Unix timestamp (UTC).
*   `shop_cipher` (string, required): Shop cipher.

## Response
*   `code` (number): Status code. `0` is success.
*   `message` (string): Status message.
*   `request_id` (string): Log ID.
*   `data` (object):
    *   `terminated_effective_time` (number): Unix timestamp of termination.

## Errors
*   `16003025`: Seller account deactivated. Check seller status.

## Pitfalls & Best Practices
*   Status check: API fails if status not `NORMAL`. Verify status before call.
*   Signature: Generate `sign` using official algorithm. Match timestamp.

## Code Example

### Request
```bash
curl -X DELETE 'https://open-api.tiktokglobalshop.com/affiliate_seller/202409/open_collaborations/products/7890786712312312?sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&app_key=38abcd&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{}'
```

### Response
```json
{
  "code": 0,
  "data": {
    "terminated_effective_time": 1725334422
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `DELETE /affiliate_seller/202409/open_collaborations/products/{product_id}`*
