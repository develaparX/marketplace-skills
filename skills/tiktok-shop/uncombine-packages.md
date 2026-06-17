# TikTok Shop API: Uncombine Packages

# API Implementation Guide: Uncombine Packages

## Purpose
API split orders from combined package. Use when seller need separate orders.

## Endpoint
* **Method**: `POST`
* **URL**: `https://open-api.tiktokglobalshop.com/fulfillment/202309/packages/{package_id}/uncombine`

## Headers and Auth
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token.

## Parameters

### Path Parameters
* `package_id` (string, required): Target package ID.

### Query Parameters
* `app_key` (string, required): App key.
* `sign` (string, required): Request signature.
* `timestamp` (number, required): Unix timestamp (UTC).
* `shop_cipher` (string, required): Shop cipher.

### Body Parameters (JSON)
* `order_ids` (array of strings, optional): Order IDs to remove. Must belong to package.

## Response Structure
JSON object:
* `code` (number): Status code. `0` mean success.
* `message` (string): Status message.
* `request_id` (string): Log ID.
* `data` (object): Result payload. Contain `packages` array with updated package IDs and order IDs.

## Error Codes
* `36009003`: Internal error. Retry request.
* `21011001`: Package not found. Check `package_id`.
* `21011005`: Invalid parameter. Check format.
* `21011028`: Wrong shop. Check `shop_cipher`.
* `21011029`: Order not in package. Check `order_ids`.

## Pitfalls and Best Practices
* **Shop Cipher**: Use correct cipher. Wrong cipher cause error `21011028`.
* **Order Validation**: Verify orders belong to package before call. Wrong order cause error `21011029`.
* **Signature**: Generate signature using correct algorithm.

## Example Request (cURL)
```bash
curl -X POST \
  'https://open-api.tiktokglobalshop.com/fulfillment/202309/packages/1231231231231313123132/uncombine?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json' \
  -d '{
    "order_ids": [
      "11132131131"
    ]
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /fulfillment/202309/packages/{package_id}/uncombine`*
