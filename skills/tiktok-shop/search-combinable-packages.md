# TikTok Shop API: Search Combinable Packages

# Search Combinable Packages API Guide

## 1. Purpose
Find orders for combined shipping. Use to merge orders. Save shipping cost.

## 2. Endpoint
*   Method: `GET`
*   URL: `https://open-api.tiktokglobalshop.com/fulfillment/202309/combinable_packages/search`

## 3. Headers
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token. Get from auth flow (user_type = 0).

## 4. Query Parameters
*   `app_key` (string, required): App identifier.
*   `sign` (string, required): Request signature.
*   `timestamp` (number, required): Unix timestamp (UTC).
*   `shop_cipher` (string, required): Shop identifier.
*   `page_size` (number, required): Results per page. Range: 1-50.
*   `page_token` (string, optional): Token for next page.

## 5. Response Structure
```json
{
  "code": 0,
  "message": "Success",
  "request_id": "string",
  "data": {
    "combinable_packages": [
      {
        "id": "string",
        "order_ids": ["string"]
      }
    ],
    "next_page_token": "string",
    "total_count": 0
  }
}
```

## 6. Error Handling
*   Code `36009003`: Internal error. Retry request. If fail, contact support.

## 7. Pitfalls & Best Practices
*   Pagination: Loop until `next_page_token` empty. Pass token to `page_token` parameter.
*   Signature: Generate `sign` with correct parameters. Wrong order cause auth failure.
*   Page size limit: Keep `page_size` between 1 and 50. Out of range cause error.

## 8. Code Example

Curl request:
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/fulfillment/202309/combinable_packages/search?page_size=20&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&page_token=6AsPQsUMvH3RkchNUPPh22NROHkE0D8pmq/N5M1kHYcZmtRyv9aVrNv65W7Q6tFA' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

Pseudocode loop:
```python
page_token = ""
while True:
    response = call_api(page_token)
    packages = response.data.combinable_packages
    process(packages)
    page_token = response.data.next_page_token
    if not page_token:
        break
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /fulfillment/202309/combinable_packages/search`*
