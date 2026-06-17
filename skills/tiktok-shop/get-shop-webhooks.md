# TikTok Shop API: Get Shop Webhooks

# Get Shop Webhooks API

## What This API Does and When to Use It
Retrieve shop's registered webhooks and URLs. Use to list event subscriptions for monitoring or management.

## Endpoint and Method
- Method: GET
- Endpoint: `https://open-api.tiktokglobalshop.com/event/202309/webhooks`

## Required Headers and Authentication
- Headers:
  - `Content-Type: application/json`
  - `x-tts-access-token: <seller_access_token>` (from Get Access Token, user_type=0)
- Authentication: Sign requests with `sign` parameter. Use `app_key`, `timestamp`, `shop_cipher` in query.

## Parameters
All required.
- `content-type` (header): string, must be `application/json`
- `x-tts-access-token` (header): string, seller access token
- `app_key` (query): string, unique app key
- `timestamp` (query): number, Unix timestamp GMT (UTC+00:00)
- `sign` (query): string, generated signature for sender identification
- `shop_cipher` (query): string, shop cipher for cross-border shops; incorrect value returns wrong response

## Response Structure
JSON object:
- `code`: number, 0 success, non-zero error
- `message`: string, success or error details
- `request_id`: string, request log ID
- `data`: object
  - `webhooks`: array of webhook objects
    - Each: `event_type` (string), `address` (string), `create_time` (number), `update_time` (number)
  - `total_count`: number, total webhooks count

## Error Handling
- Check `code`: 0 success.
- Parse `message` for failure reasons.
- Handle common errors: invalid signature, expired token, incorrect parameters.

## Common Pitfalls and Best Practices
- Pitfalls:
  - Wrong signature algorithm or input.
  - Timestamp skew or invalid format.
  - Invalid `shop_cipher` for cross-border shops.
- Best practices:
  - Generate signature per request.
  - Use accurate timestamp.
  - Validate `x-tts-access-token` expiry.
  - Always check response `code` and `message`.

## Code Example
### Curl
```
curl -X GET 'https://open-api.tiktokglobalshop.com/event/202309/webhooks?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' -H 'content-type: application/json'
```

### Pseudocode
```
function getShopWebhooks(accessToken, appKey, shopCipher):
  timestamp = getCurrentUnixTimestamp()
  sign = generateSignature(appKey, timestamp, shopCipher)  // Use correct signing method
  headers = {
    'Content-Type': 'application/json',
    'x-tts-access-token': accessToken
  }
  queryParams = {
    'app_key': appKey

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /event/202309/webhooks`*
