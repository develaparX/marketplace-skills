# TikTok Shop API: Get Shop Performance

# Get Shop Performance API Implementation Guide

## 1. Overview
API fetch seller performance metrics. Use for dashboard analytics.

## 2. Endpoint
`GET https://open-api.tiktokglobalshop.com/analytics/202509/shop/performance`

## 3. Headers & Auth
*   `content-type`: `application/json` (Required)
*   `x-tts-access-token`: Seller access token (Required). Get from seller authorization flow (user_type = 0).

## 4. Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app identifier. |
| `sign` | string | Yes | Request signature. Use TTS generation algorithm. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |
| `start_date_ge` | string | Yes | Start date (ISO 8601 YYYY-MM-DD). Shop timezone. Inclusive. |
| `end_date_lt` | string | Yes | End date (ISO 8601 YYYY-MM-DD). Shop timezone. Exclusive. |
| `shop_cipher` | string | Yes | Shop identifier. Get via Get Authorization Shop API. Required for cross-border. |
| `granularity` | string | No | Data aggregation. Values: `ALL` (default), `1D` (daily). |
| `currency` | string | No | Currency type. Values: `LOCAL` (default), `USD`. |

## 5. Response Structure
Returns JSON object:
*   `code` (number): Status code. `0` equals success.
*   `message` (string): Status message. Contains error details.
*   `request_id` (string): Log identifier.
*   `data` (object): Performance metrics container.
    *   `performance.intervals` (array): Time-segmented metrics. Contains `start_date`, `end_date`, `sales.gmv.overall` (amount, currency), and `sales.gmv.breakdowns` (amount, currency, type).

## 6. Error Handling
*   **Code `28001022`**: Invalid request params. Reason: Start or end time invalid. Fix: Check ISO 8601 format and date range.

## 7. Pitfalls & Best Practices
*   **Timezone alignment**: Use shop registered timezone for `start_date_ge` and `end_date_lt`. Incorrect timezone causes wrong data aggregation.
*   **Cross-border shops**: Always pass correct `shop_cipher`. Missing/wrong cipher returns incorrect response.
*   **Signature generation**: Generate fresh `sign` and `timestamp` for every request. Expired timestamps cause authentication failure.

## 8. Code Example

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/analytics/202509/shop/performance?end_date_lt=2024-04-08&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&start_date_ge=2024-04-01&currency=LOCAL&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&granularity=ALL' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /analytics/202509/shop/performance`*
