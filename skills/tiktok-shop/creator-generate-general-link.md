# TikTok Shop API: Creator Generate General Link

# Creator Generate General Link API Implementation Guide

## 1. Purpose
Generate sharing links for affiliate products. Use when creator needs product links for Tokopedia or TikTok Shop. Material type must be `PRODUCT`.

## 2. Endpoint
* **Method**: `POST`
* **URL**: `https://open-api.tiktokglobalshop.com/affiliate_creator/202505/affiliate_sharing_links/general_publishers/generate_batch`

## 3. Headers & Auth
* `content-type`: `application/json`
* `x-tts-access-token`: Creator access token (from Get Access Token, user_type = 1).

### Query Parameters
* `app_key` (string, required): Unique app key.
* `sign` (string, required): Signature from gen algorithm.
* `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).

## 4. Request Body
```json
{
  "material": {
    "ids": ["string"],
    "type": "PRODUCT"
  },
  "campaign_id": "string",
  "link_type": "string"
}
```

### Fields
* `material` (object, required): Target entities.
  * `ids` (array of strings, required): Product IDs.
  * `type` (string, required): Must be `PRODUCT`.
* `campaign_id` (string, optional): Campaign ID.
* `link_type` (string, optional): Pass `TOKO` for Tokopedia URL. Omit for TikTok Shop URL.

## 5. Response Structure
```json
{
  "code": 0,
  "message": "Success",
  "request_id": "string",
  "data": {
    "sharing_links": [
      {
        "material_id": "string",
        "sharing_link": "string",
        "deep_link": "string",
        "one_link": "string"
      }
    ],
    "failed_materials": [
      {
        "material_id": "string",
        "fail_reason": "string"
      }
    ]
  }
}
```

## 6. Error Handling
* Check `code` field. `0` means success.
* Check `failed_materials` array. Individual items fail even if API returns `code: 0`.

## 7. Pitfalls & Best Practices
* **Material Type**: Only `PRODUCT` allowed. Other types fail.
* **Link Type**: Set `link_type` to `TOKO` for Tokopedia. Default is TikTok Shop.
* **Batch Limits**: Check failed items list. Sold out products fail.

## 8. Code Example

```bash
curl -X POST \
  'https://open-api.tiktokglobalshop.com/affiliate_creator/202505/affiliate_sharing_links/general_publishers/generate_batch?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json' \
  -d '{
    "material": {
      "ids": [
        "7362840009596339971",
        "7362840009596339923"
      ],
      "type": "PRODUCT"
    },
    "campaign_id": "7332840009596339923",
    "link_type": "TOKO"
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_creator/202505/affiliate_sharing_links/general_publishers/generate_batch`*
