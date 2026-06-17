# TikTok Shop API: Get Product Stats

# Get Product Stats API Guide

## 1. Purpose
Get product metrics for live stream room. Use to track sales, clicks, GMV, exposure during live show.

## 2. Endpoint
Method: `GET`
Path: `https://open-api.tiktokglobalshop.com/analytics/202502/live_rooms/{live_room_id}/product_stats`

## 3. Headers
*   `content-type`: `application/json`
*   `x-tts-access-token`: Creator access token (from Get Access Token, `user_type = 1`).

## 4. Parameters
### Path
*   `live_room_id` (string, required): Live stream room ID.

### Query
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Signature from gen algorithm.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).

## 5. Response
JSON object. Key fields:
*   `code` (number): Status. `0` is success.
*   `message` (string): Error details.
*   `request_id` (string): Log ID.
*   `data.product_stats` (array): Product performance list.
    *   `product_id` (string)
    *   `product_name` (string)
    *   `main_image_url` (string)
    *   `is_live` (boolean): Active in stream.
    *   `click_through_rate` (string)
    *   `sellable_region` (string)
    *   `exposure_count` (number)
    *   `total_click_count` (number)
    *   `created_order_count` (number)
    *   `local_gmv` (object: `amount`, `currency`)
    *   `local_unit_price` (object: `amount`, `currency`)

## 6. Error Codes
*   `66009302`: Invalid param. Check room ID.
*   `66009315`: No permission. Check token scope.

## 7. Pitfalls & Best Practices
*   **Token type**: Must use creator token (`user_type = 1`). Seller token fails.
*   **Signature**: Generate signature using exact query params. Order matters.
*   **Timestamp**: Must be current UTC. Old timestamp causes auth failure.

## 8. Example Request
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/analytics/202502/live_rooms/123/product_stats?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /analytics/202502/live_rooms/{live_room_id}/product_stats`*
