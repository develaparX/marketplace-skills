# TikTok Shop API: Get Shop Video Performance Overview

# Shop Video Performance Overview API Implementation Guide

## 1. Overview
API gets video performance metrics for shop. Use to track GMV, clicks, impressions.

## 2. Endpoint
*   **Method:** `GET`
*   **Path:** `/analytics/202509/shop_videos/overview_performance`
*   **Base URL:** `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (from Get Access Token, `user_type = 0`).

## 4. Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Signature from gen algorithm. |
| `timestamp` | number | Yes | Unix timestamp UTC. |
| `shop_cipher` | string | Yes | Shop identifier. |
| `start_date_ge` | string | Yes | Start date (ISO 8601 YYYY-MM-DD) in shop timezone. |
| `end_date_lt` | string | Yes | End date (ISO 8601 YYYY-MM-DD) in shop timezone. |
| `today` | boolean | No | True overwrites dates with today's real-time data. |
| `granularity` | string | No | Data granularity. Values: `ALL`, `1D`. Default: `ALL`. |
| `currency` | string | No | Currency. Values: `USD`, `LOCAL`. Default: `LOCAL`. |
| `account_type` | string | No | Video creator account type. Values: `ALL`, `OFFICIAL_ACCOUNTS`, `MARKETING_ACCOUNTS`, `AFFILIATE_ACCOUNTS`. Default: `ALL`. |

## 5. Response Structure
Response returns JSON object.

### Fields
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Log ID.
*   `data` (object): Performance payload.
    *   `latest_available_date` (string): Last date with data.
    *   `performance` (object): Performance container.
        *   `intervals` (array): Metric list.
            *   `start_date` (string): Interval start.
            *   `end_date` (string): Interval end.
            *   `gmv` (object): GMV data.
                *   `amount` (string): GMV value.
                *   `currency` (string): Currency code.
            *   `click_through_rate` (string): CTR value.
            *   `sku_orders` (number): Order count.
            *   `product_clicks` (number): Click count.
            *   `avg_customers` (number): Customer count.
            *   `product_impressions` (number): Impression count.

## 6. Error Handling
Check `code` field. Non-zero means error. Log `request_id` for support.

## 7. Pitfalls & Best Practices
*   **Timezone:** Use shop registered timezone for dates.
*   **Date Format:** Use strict ISO 8601 YYYY-MM-DD.
*   **Today Flag:** Setting `today=true` ignores `start_date_ge` and `end_date_lt`.
*   **Signature:** Generate signature using correct algorithm before request.

## 8. Code Example

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/analytics/202509/shop_videos/overview_performance?sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&end_date_lt=2024-09-08&today=true&account_type=ALL&app_key=38abcd&granularity=ALL&currency=USD&start_date_ge=2024-09-01' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /analytics/202509/shop_videos/overview_performance`*
