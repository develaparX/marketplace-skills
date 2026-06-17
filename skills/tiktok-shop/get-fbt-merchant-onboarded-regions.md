# TikTok Shop API: Get FBT Merchant Onboarded Regions

# FBT Merchant Onboarded Regions API Guide

API verify FBT status. Return authorized regions. Use before start FBT workflow.

## Endpoint

`GET https://open-api.tiktokglobalshop.com/fbt/202409/merchants/onboarded_regions`

## Headers

*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (user_type = 0).

## Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Signature from gen algorithm. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |
| `shop_cipher` | string | Yes | Shop identifier. |

## Response Structure

*   `code` (number): Status code. `0` mean success.
*   `message` (string): Error details or success message.
*   `request_id` (string): Log ID.
*   `data` (object): Payload.
    *   `onboarded_regions` (array): List of authorized regions.
        *   `region_code` (string): ISO region code (e.g., "GB").

## Error Handling

Check `code` field. Non-zero value mean error. Read `message` for cause. Save `request_id` for support.

## Pitfalls & Best Practices

*   Wrong `shop_cipher` return bad data. Use exact cipher for cross-border shops.
*   Old `timestamp` fail auth. Keep system clock sync.
*   Sign algorithm must match TTS spec. Generate signature for every request.

## Code Example

### Request

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/fbt/202409/merchants/onboarded_regions?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&timestamp=1623812664' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

### Response

```json
{
  "code": 0,
  "data": {
    "onboarded_regions": [
      {
        "region_code": "GB"
      }
    ]
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /fbt/202409/merchants/onboarded_regions`*
