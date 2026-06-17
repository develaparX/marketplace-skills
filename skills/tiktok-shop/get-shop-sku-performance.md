# TikTok Shop API: Get Shop SKU Performance

# Implementation Guide: Get Shop SKU Performance API

## 1. Overview & Use Cases
API returns SKU performance metrics. Use to track sales, GMV, and channel breakdown (e.g., LIVE) for specific shop SKU.

## 2. Endpoint & HTTP Method
* **Method:** `GET`
* **URL:** `https://open-api.tiktokglobalshop.com/analytics/202509/shop_skus/{sku_id}/performance`

## 3. Headers & Authentication
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token. Get from access token flow (`user_type = 0`).

## 4. Parameters

### Path Parameters
* `sku_id` (string, required): Target SKU ID.

### Query Parameters
* `app_key` (string, required): Unique app key.
* `sign` (string, required): Signature from generation algorithm.
* `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
* `start_date_ge` (string, required): Start date (ISO 8601 `YYYY-MM-DD`), shop timezone, inclusive.
* `end_date_lt` (string, required): End date (ISO 8601 `YYYY-MM-DD`), shop timezone, exclusive.
* `shop_cipher` (string, required): Shop identifier cipher.
* `granularity` (string, optional): Data aggregation level. Values: `ALL` (default), `1D`.
* `currency` (string, optional): Currency unit. Values: `LOCAL` (default), `USD`.

## 5. Response Structure
Returns JSON object:
* `code` (number): Status code. `0` means success.
* `message` (string): Status message.
* `request_id` (string): Request log identifier.
* `data` (object): Performance payload.
  * `latest_available_date` (string): Last date with data.
  * `performance` (object): SKU metrics.
    * `product_id` (number): Parent product ID.
    * `sku_id` (string): SKU ID.
    * `intervals` (array): Metric intervals.
      * `start_date` (string): Interval start.
      * `end_date` (string): Interval end.
      * `gmv` (object): Total GMV. Contains `amount` (string) and `currency` (string).
      * `gmv_breakdown` (array): GMV by channel. Contains `amount`, `currency`, and `type` (e.g., `LIVE`).

## 6. Error Handling
* **`28001007`**: Product not found. Check if `sku_id` belongs to active shop.
* **`28001022`**: Invalid time range. Check `start_date_ge` and `end_date_lt` formats.
* **`36009003`**: Internal error. Retry request. Contact support if failure persists.

## 7. Pitfalls & Best Practices
* **Exclusive End Date**: `end_date_lt` is exclusive. Querying `2024-04-01` to `2024-04-08` returns data up to `2024-04-07`.
* **Timezone**: Use shop registered timezone for date parameters.
* **Signature**: Generate `sign` using exact query parameters sorted alphabetically.

## 8. Code Examples

### cURL
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/analytics/202509/shop_skus/1732xxxxxxxxxxxxx629/performance?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&end_date_lt=2024-04-08&granularity=ALL&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&start_date_ge=2024-04-01&currency=USD' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

### Python Pseudocode
```python
import requests
import time

url = "https://open-api.tiktokglobalshop.com/analytics/202509/shop_skus/1732xxxxxxxxxxxxx629/performance"

params = {
    "app_key": "38abcd",
    "timestamp": int(time.time()),
    "start_date_ge": "2024-04-01",
    "end_date_lt": "2024-04-08",
    "granularity": "ALL",
    "currency": "USD",
    "shop_cipher": "GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3",
    "sign": "GENERATED_SIGNATURE"
}

headers = {
    "x-tts-access-token": "TTP_ACCESS_TOKEN",
    "content-type": "application/json"
}

response = requests.get(url, params=params, headers=headers)
print(response.json())
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /analytics/202509/shop_skus/{sku_id}/performance`*
