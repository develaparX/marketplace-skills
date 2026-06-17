# TikTok Shop API: Get Bestselling LIVEs

# Implement Get Bestselling LIVEs API

API fetch top 100 live streams. Use for GMV tracking, creator analysis, performance audit.

## Endpoint

*   **Method**: `GET`
*   **Path**: `https://open-api.tiktokglobalshop.com/analytics/202511/lives/bestselling`

## Headers & Authentication

*   `content-type`: `application/json` (Required)
*   `x-tts-access-token`: Seller access token (Required. Get from auth flow, `user_type = 0`)

## Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | App identifier. |
| `sign` | string | Yes | Request signature. |
| `timestamp` | number | Yes | Unix timestamp (UTC). |
| `shop_cipher` | string | Yes | Target shop cipher. |
| `date` | string | No | ISO 8601 date (`YYYY-MM-DD`). Shop timezone. |
| `time_slot` | string | No | Range. Values: `1D`, `7D`, `30D`. |
| `currency` | string | No | Values: `USD`, `LOCAL`. |

## Response Structure

*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Log ID. Use for debugging.
*   `data` (object): Payload.
    *   `lives` (array): Top 100 lives.
        *   `rank` (number): Position.
        *   `gmv_range` (string): Estimated GMV range.
        *   `id` (string): Live ID.
        *   `title` (string): Live title.
        *   `start_time` (number): Unix timestamp.
        *   `duration` (number): Seconds.
        *   `creator_name` (string): Creator handle.
        *   `open_id` (string): Creator ID.
        *   `creator_nick_name` (string): Creator nickname.

## Error Handling

Check `code` field. Non-zero means error. Log `request_id` for support.

## Pitfalls & Best Practices

*   **Signature fail**: Generate signature using exact algorithm.
*   **Timestamp drift**: Keep server clock synced. Request fails if timestamp old.
*   **Timezone error**: Use shop timezone for `date` parameter.

## Code Example

### Curl

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/analytics/202511/lives/bestselling?sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&date=2025-11-13&time_slot=7D&currency=USD&app_key=38abcd' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

### Python Pseudocode

```python
import requests
import time

# Setup params
url = "https://open-api.tiktokglobalshop.com/analytics/202511/lives/bestselling"
timestamp = int(time.time())
sign = generate_signature(app_key, timestamp, shop_cipher) # Implement sign algorithm

params = {
    "app_key": "38abcd",
    "sign": sign,
    "timestamp": timestamp,
    "shop_cipher": "GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3",
    "date": "2025-11-13",
    "time_slot": "7D",
    "currency": "USD"
}

headers = {
    "x-tts-access-token": "TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k",
    "content-type": "application/json"
}

# Execute
response = requests.get(url, headers=headers, params=params)
result = response.json()

# Check
if result.get("code") == 0:
    print("Success. Lives count:", len(result["data"]["lives"]))
else:
    print("Error:", result.get("message"), "Request ID:", result.get("request_id"))
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /analytics/202511/lives/bestselling`*
