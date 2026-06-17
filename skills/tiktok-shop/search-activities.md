# TikTok Shop API: Search Activities

# Implementation Guide: Search Activities API

Search product discount or flash deal promotions. Use to sync promotion lists, show active deals, manage campaigns.

## Endpoint

*   **Method**: `POST`
*   **URL**: `https://open-api.tiktokglobalshop.com/promotion/202309/activities/search`

## Headers

*   `content-type`: `application/json` (Required)
*   `x-tts-access-token`: Seller access token (Required for `user_type = 0`)

## Parameters

### Query Parameters

| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Signature from gen algorithm. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |
| `shop_cipher` | string | Yes | Shop identifier. |

### Body Parameters (JSON)

| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `status` | string | No | Values: `DRAFT`, `NOT_START`, `ONGOING`, `EXPIRED`, `DEACTIVATED`, `NOT_EFFECTIVE`. |
| `activity_title` | string | No | Title keywords. No fuzzy matching. |
| `page_size` | number | No | Range `[0, 100]`. Default `50`. |
| `page_token` | string | No | Token for page. Use `""` for first page. |
| `activity_type` | string | No | Values: `FIXED_PRICE`, `DIRECT_DISCOUNT`, `FLASHSALE`, `SHIPPING_DISCOUNT`, `BUY_MORE_SAVE_MORE`. |

## Response Structure

*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Request log ID.
*   `data` (object): Payload.
    *   `total_count` (number): Total promotions found.
    *   `next_page_token` (string): Token for next page.
    *   `activities` (array): List of promotions.
        *   `id` (string): Promotion ID.
        *   `title` (string): Promotion title.
        *   `activity_type` (string): Promotion type.
        *   `duration_type` (string): Duration type.
        *   `begin_time` (number): Start timestamp.
        *   `end_time` (number): End timestamp.
        *   `status` (string): Promotion status.
        *   `create_time` (number): Creation timestamp.
        *   `update_time` (number): Update timestamp.
        *   `product_level` (string): Product level.
        *   `activity_commands` (string): Command status.
        *   `participation_limit` (array): Limit rules.

## Error Handling

| Code | Description | Action |
| :--- | :--- | :--- |
| `17029001` | Invalid parameters | Check payload types and query parameters. |
| `17029055` | Request Timeout | Retry request. |
| `17029059` | page_token + page_size >= 10000 | Reduce page size or token offset. |
| `36009003` | Internal error | Retry request. Contact support if error persists. |

## Pitfalls & Best Practices

*   **No fuzzy match**: `activity_title` requires exact keywords. Search fails if title misspelled.
*   **Pagination limit**: `page_token` + `page_size` must be under 10000. Reset token if limit reached.
*   **Signature generation**: Calculate `sign` using correct algorithm before request. Incorrect signature causes auth failure.

## Code Example

### cURL

```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/promotion/202309/activities/search?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "status": "ONGOING",
  "activity_title": "Discount",
  "page_size": 20,
  "page_token": "21",
  "activity_type": "FLASHSALE"
}'
```

### Pseudocode

```python
import requests
import time

# Set parameters
url = "https://open-api.tiktokglobalshop.com/promotion/202309/activities/search"
app_key = "YOUR_APP_KEY"
shop_cipher = "YOUR_SHOP_CIPHER"
access_token = "YOUR_ACCESS_TOKEN"
timestamp = int(time.time())

# Generate signature (implement your sign algorithm)
sign = generate_signature(app_key, timestamp, shop_cipher)

query_params = {
    "app_key": app_key,
    "sign": sign,
    "timestamp": timestamp,
    "shop_cipher": shop_cipher
}

headers = {
    "content-type": "application/json",
    "x-tts-access-token": access_token
}

body = {
    "status": "ONGOING",
    "page_size": 50,
    "page_token": ""
}

# Execute request
response = requests.post(url, params=query_params, headers=headers, json=body)
data = response.json()

if data["code"] == 0:
    print("Success. Activities found:", data["data"]["activities"])
else:
    print("Error:", data["code"], data["message"])
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /promotion/202309/activities/search`*
