# TikTok Shop API: Search Aftersales Request

# Search Aftersales Request API Guide

## 1. Purpose
API search aftersales request data. Use when customer ask refund or return.

## 2. Endpoint
*   **Method**: `POST`
*   **URL**: `https://open-api.tiktokglobalshop.com/return_refund/202603/aftersales/search`

## 3. Authentication & Headers
### Headers
*   `x-tts-access-token` (String, Required): Seller access token.
*   `content-type` (String, Required): Must be `application/json`.

### Query Parameters
*   `app_key` (String, Required): Unique app key.
*   `sign` (String, Required): Request signature.
*   `timestamp` (Number, Required): Unix timestamp (UTC).
*   `shop_cipher` (String, Required): Shop identifier.
*   `locale` (String, Optional): BCP-47 locale code. Default `en`.

## 4. Request Body Parameters
*   `whitelisted_data_fields` (Array, Optional): Fields return extra data. Values: `LINE_ITEMS`, `SKU_RETURN_REQUESTS`, `RETURN_MERCHANDISE_AUTHORIZATIONS`.
*   `filters` (Object, Optional): Filter criteria.
*   `sort` (Object, Optional): Sort criteria.
*   `pagination` (Object, Optional): Pagination settings.

## 5. Response Structure
*   `code` (Number): Status code. `0` mean success.
*   `message` (String): Error details.
*   `request_id` (String): Log identifier.
*   `data` (Object): Return payload. Contains `aftersales_requests` array.

## 6. Error Codes
*   `25001001`: Invalid parameter. Check types and format.
*   `25020005`: No permission. Check shop cipher and token.
*   `25020008` / `36009003`: Internal error. Retry request.

## 7. Best Practices & Pitfalls
*   **Missing Data**: Must pass `whitelisted_data_fields` to get line items or return requests. Empty array return basic data only.
*   **Signature Failure**: Generate signature using exact query string order.

## 8. Implementation Example

```bash
curl -X POST \
  'https://open-api.tiktokglobalshop.com/return_refund/202603/aftersales/search?timestamp=1623812664&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&locale=en-US' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json' \
  -d '{
    "whitelisted_data_fields": [
      "LINE_ITEMS",
      "SKU_RETURN_REQUESTS"
    ],
    "filters": {
      "aftersales_request_ids": ["4035318504086604101"]
    }
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /return_refund/202603/aftersales/search`*
