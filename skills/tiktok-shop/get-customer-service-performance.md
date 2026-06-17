# TikTok Shop API: Get Customer Service Performance

# Get Customer Service Performance API Implementation Guide

## 1. Overview
API fetch shop customer service performance. Use to monitor chat quality, response speed, sales conversion over time.

## 2. Endpoint
*   **Method**: `GET`
*   **Path**: `/customer_service/202407/performance`
*   **Base URL**: `https://open-api.tiktokglobalshop.com`

## 3. Headers & Authentication
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token. Get from authorization flow (user_type = 0).

## 4. Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app identifier. |
| `sign` | string | Yes | Request signature. Generate via platform algorithm. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00) in seconds. |
| `support_date_ge` | string | Yes | Start date (YYYY-MM-DD). Inclusive. |
| `support_date_lt` | string | Yes | End date (YYYY-MM-DD). Exclusive. |
| `shop_cipher` | string | Yes | Shop identifier. |

## 5. Response Structure

### Success Response (Code 0)
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Log identifier for debugging.
*   `data` (object): Container for performance metrics.
    *   `performance` (object):
        *   `support_session_count` (number): Total chat sessions.
        *   `response_percentage` (string): Percent of messages answered.
        *   `satisfaction_percentage` (string): Customer satisfaction rate.
        *   `response_time_mins` (string): Average response time in minutes.
        *   `conversion_rate` (string): Chat-to-sale conversion rate.
        *   `cs_guided_gmv` (string): Gross Merchandise Value driven by chat.
        *   `currency` (string): Currency code (e.g., USD).

## 6. Error Handling
Handle specific error codes returned in response:

*   `45101001`: Internal error. Retry request later. Contact support if error persists.
*   `36009003`: Internal error. Retry request. Contact support if error persists.

## 7. Pitfalls & Best Practices
*   **Date Range**: `support_date_lt` is exclusive. To query July 1 to July 7, set `support_date_ge=2024-07-01` and `support_date_lt=2024-07-08`.
*   **Signature**: Generate `sign` using all query parameters sorted alphabetically. Incorrect order causes auth failure.
*   **Timestamp**: Sync system clock with NTP. Expired timestamps cause request rejection.

## 8. Code Example

### Request
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/customer_service/202407/performance?shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&support_date_ge=2024-07-01&support_date_lt=2024-07-08&timestamp=1623812664&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

### Response
```json
{
  "code": 0,
  "data": {
    "performance": {
      "support_session_count": 15,
      "response_percentage": "93.4",
      "satisfaction_percentage": "95.2",
      "response_time_mins": "3.4",
      "conversion_rate": "66.67",
      "cs_guided_gmv": "36500",
      "currency": "USD"
    }
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /customer_service/202407/performance`*
