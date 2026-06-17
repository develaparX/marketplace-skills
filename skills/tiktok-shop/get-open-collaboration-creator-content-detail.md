# TikTok Shop API: Get Open Collaboration Creator Content Detail

# Get Open Collaboration Creator Content Detail API Guide

## 1. Purpose
API get creator content details for open collaboration. Use when seller track creator performance (video count, live count, status) for specific product.

## 2. Endpoint
*   **Method**: `GET`
*   **Path**: `/affiliate_seller/202508/open_collaborations/creator_content_details`
*   **Base URL**: `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token. Get from token API (`user_type = 0`).

## 4. Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Signature from gen algorithm. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |
| `shop_cipher` | string | Yes | Shop identifier. |
| `product_id` | string | Yes | Product ID to query. |
| `page_size` | number | Yes | Page size. Value must be 1 to 100. |
| `page_token` | string | No | Pagination offset. Leave empty for first request. |

## 5. Response Structure

Response return JSON object:

*   `code` (number): Status code. `0` mean success.
*   `message` (string): Status message.
*   `request_id` (string): Log ID for debug.
*   `data` (object): Payload.
    *   `next_page_token` (string): Token for next page.
    *   `total_count` (number): Total records.
    *   `creator_content_details` (array): Creator stats.
        *   `creator_profile` (object): Creator info (username, nickname, follower count, avatar, open ID).
        *   `video_count` (number): Video count.
        *   `live_count` (number): Live count.
        *   `promotion_status` (string): Status (e.g., `NORMAL`).
        *   `promotion_end_time` (number): End timestamp.

## 6. Error Handling
*   Check `code` field. If `code` not `0`, request fail.
*   Save `request_id` to log. Use `request_id` when contact support.

## 7. Pitfalls & Best Practices
*   **Page Size Limit**: Do not exceed `page_size` 100. Request fail if value too big.
*   **Pagination Loop**: Use `next_page_token` from response for next request. Stop when `next_page_token` empty.
*   **Signature Gen**: Generate `sign` using exact query params. Sort keys alphabetically before hash.

## 8. Code Example

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/affiliate_seller/202508/open_collaborations/creator_content_details?timestamp=1623812664&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&page_token=b2Zmc2V0PTAK&page_size=50&product_id=1730076583746441639' \
-H 'content-type: application/json' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /affiliate_seller/202508/open_collaborations/creator_content_details`*
