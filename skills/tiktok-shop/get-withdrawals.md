# TikTok Shop API: Get Withdrawals

# TikTok Shop Get Withdrawals API Guide

## 1. Overview
Retrieve withdrawal records. Use to track seller payouts and transaction history.

## 2. Endpoint
*   **Method:** `GET`
*   **Path:** `/finance/202309/withdrawals`
*   **Base URL:** `https://open-api.tiktokglobalshop.com`

## 3. Headers & Authentication
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (`user_type = 0`).

## 4. Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |
| `shop_cipher` | string | Yes | Shop identifier. |
| `sign` | string | Yes | Request signature. |
| `types` | array | Yes | Transaction types. Values: `WITHDRAW`, `SETTLE`, `TRANSFER`, `REVERSE`. |
| `create_time_ge` | number | No | Start time (Unix timestamp). |
| `create_time_lt` | number | No | End time (Unix timestamp). |
| `page_size` | number | No | Page size (1-100). Default: 20. |
| `page_token` | string | No | Token for next page. |

## 5. Response Structure

```json
{
  "code": 0,
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7",
  "data": {
    "next_page_token": "6AsPQsUMvH3RkchNUPPh22NROHkE0D8pmq/N5M1kHYcZmtRyv9aVrNv65W7Q6tFA+7D1ud64MPNz5OaT",
    "total_count": 1,
    "withdrawals": [
      {
        "id": "EFASDFSAFDA23432DFAFDSA",
        "type": "WITHDRAW",
        "amount": "100",
        "currency": "IDR",
        "status": "PROCESSING",
        "create_time": 1623812664
      }
    ]
  }
}
```

## 6. Error Codes

| Code | Description | Action |
| :--- | :--- | :--- |
| `22005007` | Merchant does not exist. | Verify `shop_cipher` value. |
| `36009003` | Internal error. | Retry request. Contact support if error persists. |

## 7. Pitfalls & Best Practices
*   **Array formatting:** Pass `types` as comma-separated values in query string (e.g., `types=WITHDRAW,SETTLE`).
*   **Pagination:** Use `next_page_token` from response in subsequent request `page_token` parameter. Stop when `next_page_token` empty.
*   **Timestamp:** Use UTC timezone. Local timezones cause signature verification failure.

## 8. Implementation Examples

### cURL
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/finance/202309/withdrawals?app_key=38abcd&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&types=WITHDRAW,SETTLE&page_size=20&create_time_ge=1623812664&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&create_time_lt=1623812664&page_token=6AsPQsUMvH3RkchNUPPh22NROHkE0D8pmq/N5M1kHYcZmtRyv9aVrNv65W7Q6tFA+7D1ud64MPNz5OaT' \
-H 'content-type: application/json' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k'
```

### Pseudocode
```python
# Set credentials
token = "TTP_pwSm2..."
app_key = "38abcd"
shop_cipher = "GCP_XF90ig..."

# Build parameters
params = {
    "app_key": app_key,
    "timestamp": get_current_utc_timestamp(),
    "shop_cipher": shop_cipher,
    "types": "WITHDRAW,SETTLE",
    "page_size": 20
}

# Generate signature
params["sign"] = generate_signature(params)

# Set headers
headers = {
    "content-type": "application/json",
    "x-tts-access-token": token
}

# Execute request
response = http.get("https://open-api.tiktokglobalshop.com/finance/202309/withdrawals", params=params, headers=headers)
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /finance/202309/withdrawals`*
