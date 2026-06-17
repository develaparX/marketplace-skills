# TikTok Shop API: Get Package Detail

# Implement Get Package Detail API

## Purpose
Get package info. Use to check status, tracking, shipping provider.

## Endpoint
* Method: `GET`
* URL: `https://open-api.tiktokglobalshop.com/fulfillment/202309/packages/{package_id}`

## Headers
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token.

## Parameters
### Path
* `package_id` (string, required): TikTok Shop package ID.

### Query
* `app_key` (string, required): Unique app key.
* `sign` (string, required): Signature.
* `timestamp` (number, required): Unix timestamp UTC.
* `shop_cipher` (string, required): Shop identifier.

## Response
### Root
* `code` (number): Status code. `0` is success.
* `message` (string): Status message.
* `request_id` (string): Log ID.
* `data` (object): Package details.

### Data Object
* `package_id` (string): Package ID.
* `orders` (array): Orders in package.
* `package_status` (string): Status (e.g., `PROCESSING`).
* `package_sub_status` (string): Sub-status.
* `ship_exception_reason` (string): Exception reason.
* `split_and_combine_tag` (string): Split/combine tag.
* `has_multi_skus` (boolean): Multi-SKU flag.

## Error Codes
* `10006402`: Internal error. Retry request.
* `36009003`: Internal error. Retry request. Contact support if fail.

## Pitfalls & Best Practices
* Timestamp expire. Generate fresh timestamp each call.
* Signature fail. Calculate signature correct. Use exact query params.
* Token expire. Refresh token before call.

## Example Request
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/fulfillment/202309/packages/5433567853345?shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

## Example Response
```json
{
  "code": 0,


---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /fulfillment/202309/packages/{package_id}`*
