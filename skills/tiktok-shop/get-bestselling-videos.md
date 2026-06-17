# TikTok Shop API: Get Bestselling Videos

# API Guide: Get Bestselling Videos

## 1. Purpose
API fetches top 100 videos. Use to track sales performance. 

## 2. Endpoint
*   **Method**: `GET`
*   **URL**: `https://open-api.tiktokglobalshop.com/analytics/202511/videos/bestselling`

## 3. Headers
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token

## 4. Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key |
| `sign` | string | Yes | Signature from generation algorithm |
| `timestamp` | number | Yes | Unix timestamp GMT |
| `date` | string | Yes | Reference date ISO 8601 YYYY-MM-DD |
| `time_slot` | string | Yes | Query range: `1D`, `7D`, `30D` |
| `shop_cipher` | string | Yes | Shop information cipher |
| `currency` | string | No | `USD` or `LOCAL` |

## 5. Response Structure
Returns JSON object.

### Fields
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Request log ID.
*   `data` (object): Return payload.
    *   `videos` (array): Bestselling videos list.
        *   `rank` (number): Video rank.
        *   `id` (string): Video ID.
        *   `nick_name` (string): Creator nickname.
        *   `gmv_range` (string): Estimated GMV range.
        *   `views` (number): View count.
        *   `likes` (number): Like count.
        *   `comments` (number): Comment count.
        *   `shares` (number): Share count.
        *   `publish_time` (number): Unix timestamp.
        *   `duration` (number): Video duration in seconds.
        *   `product_infos` (array): Linked products.
            *   `product_id` (string): Product ID.
            *   `product_name` (string): Product name.

## 6. Error Handling
Check `code` field. Non-zero code means failure. Log `request_id` to debug.

## 7. Pitfalls & Best Practices
*   **Signature mismatch**: Generate `sign` parameter. Sort query parameters alphabetically to avoid signature mismatch.
*   **Time slot limit**: Use only `1D`, `7D`, `30D`. Other values cause validation error.
*   **Timestamp expiry**: Sync system clock. Old timestamps cause authentication failure.

## 8. Example Request
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/analytics/202511/videos/bestselling?timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&date=2025-11-13&time_slot=7D&currency=USD&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /analytics/202511/videos/bestselling`*
