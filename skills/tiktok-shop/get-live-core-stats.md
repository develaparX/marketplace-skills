# TikTok Shop API: Get Live Core Stats

# Implementation Guide: Get Live Core Stats

## Overview
Get live stream room stats (GMV, viewers, orders). Use for real-time performance tracking.

## Endpoint
*   **Method**: `GET`
*   **URL**: `https://open-api.tiktokglobalshop.com/analytics/202502/live_rooms/{live_room_id}/core_stats`

## Headers & Authentication
### Headers
*   `content-type`: `application/json`
*   `x-tts-access-token`: Creator access token (user_type = 1).

### Query Parameters (Auth)
*   `app_key`: App unique key.
*   `sign`: Signature from gen algorithm.
*   `timestamp`: Unix timestamp GMT (UTC+00:00).

## Parameters
### Path
*   `live_room_id` (string, required): Live stream room ID.

### Query
*   `app_key` (string, required): App key.
*   `sign` (string, required): Request signature.
*   `timestamp` (number, required): Unix timestamp (UTC).

## Response Structure
### Fields
*   `code` (number): Status code. `0` is success.
*   `message` (string): Error details.
*   `request_id` (string): Log ID.
*   `data` (object): Stats container.
    *   `stats` (object):
        *   `sales` (number): Items sold.
        *   `local_gmv` (object): GMV amount and currency.
        *   `created_order_count` (number): Orders created.
        *   `current_visitor_count` (number): Live viewers.
        *   `paid_order_count` (number): Paid orders.
        *   `local_unit_price` (object): Average unit price.
        *   `product_reach_count` (number): Product impressions.
        *   `watch_pv` (number): Page views.
        *   `click_through_rate` (string): CTR ratio.
        *   `accumulated_new_follower_count` (number): New followers.
        *   `buyer_count` (number): Unique buyers.
        *   `accumulated_comment_count` (number): Total comments.

## Error Handling
Check `code` in response.
*   `66009302`: Bad room ID. Check ID format.
*   `66009315`: No permission. Check token scope.

## Pitfalls & Best Practices
*   Token expire fast. Refresh token before call.
*   Signature fail if query params order wrong. Sort params before sign.
*   Timestamp must be UTC. Sync server clock.

## Code Example
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/analytics/202502/live_rooms/123/core_stats?sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&app_key=38abcd' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /analytics/202502/live_rooms/{live_room_id}/core_stats`*
