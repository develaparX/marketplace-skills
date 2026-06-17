# TikTok Shop API: Partner Generate Multi Affiliate Campaign Product Link

# Generate Multi Affiliate Campaign Product Links

## Overview
API generate affiliate links for multiple products in campaign. Use to batch-create promotion links.

## Endpoint
*   **Method**: `POST`
*   **Path**: `/affiliate_partner/202505/campaigns/{campaign_id}/products/promotion_links/generate_batch`

## Headers & Authentication
*   `content-type`: `application/json`
*   `x-tts-access-token`: Partner access token. Require `user_type = 3`.

## Parameters

### Path Parameters
*   `campaign_id` (string, required): Target campaign ID.

### Query Parameters
*   `app_key` (string, required): Unique developer app key.
*   `sign` (string, required): Request signature from generation algorithm.
*   `timestamp` (number, required): Unix timestamp in seconds (UTC).
*   `category_asset_cipher` (string, optional): Partner identifier.

### Request Body
*   `product_ids` (array of strings/numbers, optional): List of product IDs. Max size 50.

```json
{
  "product_ids": [
    7362840009596340000,
    7362840009596340001
  ]
}
```

## Response Structure
*   `code` (number): Status code. `0` mean success.
*   `message` (string): Status message.
*   `request_id` (string): Log identifier for debug.
*   `data` (object):
    *   `product_promotion_links` (array): Generated links.
        *   `product_id` (string): Product identifier.
        *   `link` (string): Affiliate promotion link.
    *   `failed_product_ids` (array): Product IDs that failed generation.

```json
{
  "code": 0,
  "data": {
    "product_promotion_links": [
      {
        "product_id": "7362840009596339971",
        "link": "https://affiliate.tiktok.com/api/v1/share/AIxvOHlaJoKO"
      }
    ],
    "failed_product_ids": [
      7362840009596340000
    ]
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

## Error Handling
*   Check `code` field. Non-zero value mean request failed.
*   Check `failed_product_ids` array. API allow partial success. Some IDs fail while others succeed.

## Pitfalls & Best Practices
*   **Batch Limit**: Keep `product_ids` array under 50 items. Large batch cause timeout.
*   **Partial Success**: Always inspect `failed_product_ids` to identify failed items. Retry failed items only.
*   **Token Type**: Ensure token generated for `user_type = 3`. Wrong token type cause auth error.
*   **Signature**: Generate `sign` query parameter using correct HMAC-SHA256 algorithm. Incorrect signature cause rejection.

## Implementation Example

```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/affiliate_partner/202505/campaigns/7362840009596339923/products/promotion_links/generate_batch?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&category_asset_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3=' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "product_ids": [
    7362840009596340000,
    7362840009596340000
  ]
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_partner/202505/campaigns/{campaign_id}/products/promotion_links/generate_batch`*
