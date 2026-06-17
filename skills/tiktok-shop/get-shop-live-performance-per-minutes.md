# TikTok Shop API: Get Shop LIVE Performance Per Minutes

# API Guide: Shop LIVE Performance Per Minutes

## 1. Purpose & Usage
API fetch minute-by-minute live stream metrics. Use after live session end for post-stream analysis. Only support official or marketing accounts.

## 2. Endpoint
*   **Method:** `GET`
*   **Path:** `/analytics/202510/shop_lives/{live_id}/performance_per_minutes`
*   **Base URL:** `https://open-api.tiktokglobalshop.com`

## 3. Headers & Authentication
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (from auth flow where `user_type = 0`).

## 4. Parameters

### Path Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `live_id` | string | Yes | TTS LIVE session ID |

### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key |
| `sign` | string | Yes | Request signature |
| `timestamp` | number | Yes | Unix timestamp UTC (seconds) |
| `shop_cipher` | string | Yes | Shop identifier |
| `page_token` | string | No | Pagination token |
| `currency` | string | No | `USD` or `LOCAL` |

## 5. Response Structure
Response return JSON object.

```json
{
  "code": 0,
  "message": "success",
  "request_id": "2025...123",
  "data": {
    "performance": {
      "overall": {
        "live_title": "BAJU BARU!!!",
        "start_time": 1623812664,
        "end_time": 1623812664,
        "duration": 3600,
        "gmv": {
          "amount": "39440.00",
          "currency": "USD"
        },
        "items_sold": 432,
        "unique_viewers": 10230,
        "impressions": 87939
      },
      "intervals": [
        {
          "start_time": 1623812664,
          "end_time": 1623812664,
          "sales": null
        }
      ]
    }
  }
}
```

## 6. Error Handling
Check `code` field in response body.
*   `code` == `0`: Success.
*   `code` != `0`: Failure. Read `message` field for error details.

## 7. Pitfalls & Best Practices
*   **Active Lives:** Do not call during live stream. API only return data after session finish.
*   **Account Type:** Verify account role. Creator accounts not supported; only official/marketing accounts work.
*   **Signature Expiry:** Generate fresh `sign` and `timestamp` for every request. Old timestamps cause auth failure.
*   **Pagination:** Large streams contain many intervals. Check response for next page token, pass to `page_token` query parameter.

## 8. Implementation Examples

### cURL
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/analytics/202510/shop_lives/111/performance_per_minutes?timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&page_token=cGFnZV9udW1iZXI9MQ==&currency=USD&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

### Pseudocode
```python
# Define request parameters
path_params = {
    "live_id": "111"
}
query_params = {
    "app_key": "38abcd",
    "timestamp": current_unix_time(),
    "shop_cipher": "GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3",
    "currency": "USD"
}

# Generate signature
query_params["sign"] = generate_signature(path_params, query_params, app_secret)

# Send request
headers = {
    "x-tts-access-token": "TTP_pwSm2...",
    "content-type": "application/json"
}
url = "https://open-api.tiktokglobalshop.com/analytics/202510/shop_lives/" + path_params["live_id"] + "/performance_per_minutes"

response = http.get(url, headers=headers, query=query_params)

if response.code == 0:
    process_data(response.data)
else:
    log_error(response.message)
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /analytics/202510/shop_lives/{live_id}/performance_per_minutes`*
