# TikTok Shop API: Get GMV Trend Performances

# API Implementation Guide: Get GMV Trend Performances

## Overview
API get GMV trend points for live room. Use to track sales performance over time. Build dashboards.

## Endpoint
*   Method: `GET`
*   Path: `/analytics/202502/live_rooms/{live_room_id}/gmv_trend_performances`

## Headers & Authentication
*   `content-type`: `application/json`
*   `x-tts-access-token`: Creator access token (from Get Access Token, user_type = 1).

## Parameters

### Path Parameters
*   `live_room_id` (string, required): Live stream room ID.

### Query Parameters
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Request signature.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).

## Response Structure
*   `code` (number): Status code.
*   `message` (string): Status message.
*   `request_id` (string): Request log ID.
*   `data` (object): Return data.
    *   `gmv_trend_performances` (array): Trend data.
        *   `stats_type` (string): Metric type (e.g., `TREND_GMV`).
        *   `data_points` (array): Data points.
            *   `order_count` (number): Order count.
            *   `timestamp` (number): Point timestamp.
            *   `gmv` (object): GMV details.
                *   `currency` (string): Currency code (e.g., `USD`).
                *   `amount` (string): GMV value.

## Error Handling
*   `66009302`: Invalid parameter. Check `live_room_id`.
*   `66009315`: No permission. Check token access.

## Pitfalls & Best Practices
*   **Signature mismatch**: Calculate `sign` parameter correct. Use exact algorithm.
*   **Timestamp expiry**: Use current UTC timestamp. Old timestamps fail.
*   **Token type**: Use creator token (`user_type = 1`). Seller token fails.

## Code Example

```bash
curl -X GET \
  'https://open-api.tiktokglobalshop.com/analytics/202502/live_rooms/123/gmv_trend_performances?timestamp=1623812664&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /analytics/202502/live_rooms/{live_room_id}/gmv_trend_performances`*
