# TikTok Shop API: Get Shop LIVE Performance Overview

# Shop LIVE Performance API Guide

## 1. Purpose
API fetch performance metrics for shop LIVE streams. Use to build seller dashboards, track live stream sales.

## 2. Endpoint
*   **Method**: `GET`
*   **URL**: `https://open-api.tiktokglobalshop.com/analytics/202509/shop_lives/overview_performance`

## 3. Headers & Auth
*   `content-type`: `application/json` (Required)
*   `x-tts-access-token`: Seller access token (Required. Use token where `user_type = 0`).

## 4. Query Parameters
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Signature from gen algorithm.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
*   `start_date_ge` (string, required): Start date (ISO 8601 YYYY-MM-DD). Shop timezone. Greater than or equal.
*   `end_date_lt` (string, required): End date (ISO 8601 YYYY-MM-DD). Shop timezone. Less than.
*   `today` (boolean, optional): Set `true` to overwrite dates with real-time today data.
*   `granularity` (string, optional): Data granularity. Values: `ALL`, `1D`. Default: `ALL`.
*   `currency` (string, optional): Currency. Values: `USD`, `LOCAL`. Default: `LOCAL`.
*   `account_type` (string, optional): Creator account type. Values: `ALL`, `OFFICIAL_ACCOUNTS`, `MARKETING_ACCOUNTS`, `AFFILIATE_ACCOUNTS`. Default: `ALL`.
*   `shop_cipher` (string, required): Shop identifier.

## 5. Response Structure
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Request log ID.
*   `data` (object): Return payload.
    *   `performance` (object): Metrics container.
        *   `intervals` (array): Metrics grouped by interval. Fields:
            *   `start_date` (string): Interval start.
            *   `end_date` (string): Interval end.
            *   `gmv` (object): Gross Merchandise Value.
                *   `amount` (string): Value.
                *   `currency` (string): Currency code.
            *   `sku_orders` (number): Order count.
            *   `customers` (number): Buyer count.
            *   `items_sold` (number): Item count.
            *   `click_to_order_rate` (string): Conversion rate.
            *   `click_through_rate` (string): CTR rate.
    *   `latest_available_date` (string): Latest data date.

## 6. Error Codes
*   `36009003`: Internal error. Retry request. Contact support if fail persist.

## 7. Pitfalls & Best Practices
*   **Timezone alignment**: Use shop registered timezone for `start_date_ge` and `end_date_lt`. Wrong timezone cause data mismatch.
*   **Today flag**: `today=true` overwrites date range. Do not send date range if `today=true` active.
*   **Signature generation**: Generate `sign` using exact query string parameters. Order matters.
*   **Token type**: Ensure `x-tts-access-token` belongs to seller (`user_type = 0`).

## 8. Code Example

```bash
curl -X GET \
  'https://open-api.tiktokglobalshop.com/analytics/202509/shop_lives/overview_performance?sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&start_date_ge=2024-09-01&end_date_lt=2024-09-08&today=true&granularity=1D&account_type=ALL&app_key=38abcd&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&currency=USD' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /analytics/202509/shop_lives/overview_performance`*
