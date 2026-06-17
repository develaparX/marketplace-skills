# TikTok Shop API: Get Open Collaboration Settings

# Guide: Get Open Collaboration Settings

## Purpose
Get affiliate seller settings. Use to check auto-add status and commission rate.

## Endpoint
*   Method: `GET`
*   Path: `/affiliate_seller/202409/open_collaboration_settings`
*   Base URL: `https://open-api.tiktokglobalshop.com`

## Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token. Get from token API where `user_type = 0`.

## Query Parameters
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Signature from generation algorithm.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
*   `shop_cipher` (string, required): Shop identifier.

## Response Structure
*   `code` (number): Status. `0` is success.
*   `message` (string): Status message.
*   `request_id` (string): Log ID.
*   `data` (object): Settings container.
    *   `open_collaboration_settings` (object): Collaboration details.
        *   `auto_add_product` (object): Auto-add details.
            *   `enable` (boolean): Auto-add active status.
            *   `commission_rate` (number): Commission rate.

## Error Handling
*   Check `code` value. Non-zero means fail.
*   Save `request_id`. Need this for support tickets.

## Pitfalls & Best Practices
*   Timestamp drift: Keep system clock synced. Old timestamp rejects request.
*   Commission scale: Rate `1000` represents `10.00%` (scaled by 100). Verify math.
*   Signature order: Sort parameters alphabetically before hash.

## Example Request
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/affiliate_seller/202409/open_collaboration_settings?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
  -H 'content-type: application/json' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k'
```

## Example Response
```json
{
  "code": 0,
  "data": {
    "open_collaboration_settings": {
      "auto_add_product": {
        "enable": true,
        "commission_rate": 1000
      }
    }
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /affiliate_seller/202409/open_collaboration_settings`*
