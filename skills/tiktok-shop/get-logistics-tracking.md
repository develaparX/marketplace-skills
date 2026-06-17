# TikTok Shop API: Get Logistics Tracking

# Get Logistics Tracking API Guide

## 1. Purpose
Order ID gets tracking data. More detail than basic API. Use for detailed shipment updates.

## 2. Endpoint
*   **Method:** `GET`
*   **Path:** `/logistics/202604/orders/{order_id}/tracking`
*   **Base URL:** `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (`user_type = 0`).

## 4. Parameters

### Path Parameter
*   `order_id` (string, required): TikTok Shop order ID.

### Query Parameters
*   `app_key` (string, required): Unique app identifier.
*   `sign` (string, required): Request signature.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
*   `shop_cipher` (string, required): Shop identifier cipher.

## 5. Response Structure
Returns JSON object:
*   `code` (number): Status code. `0` means success.
*   `message` (string): Error details or success message.
*   `request_id` (string): Log identifier.
*   `data` (object): Logistics payload.
    *   `order_id` (string): Target order.
    *   `logistics_details` (array):
        *   `newest_tracking_no` (string): Latest tracking number.
        *   `carrier_name` (string): Carrier name.
        *   `track_list` (array):
            *   `description` (string): Milestone description.
            *   `tracking_no` (string): Tracking number.
            *   `update_time_millis` (number): Epoch millisecond timestamp.
            *   `action_code` (number): Milestone code.
            *   `action_code_name` (string): Milestone name.

## 6. Error Handling
*   `36009003`: Internal error. Retry request. Contact support if persists.
*   `11007009`: Order unsupported. Check order status.
*   `11007010`: System busy. Wait, then retry.

## 7. Pitfalls & Best Practices
*   **Signature Fail:** Generate signature using exact query parameter order.
*   **Token Expiry:** Refresh `x-tts-access-token` before call.
*   **Rate Limits:** Implement exponential backoff for code `11007010`.

## 8. Implementation Examples

### cURL
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/logistics/202604/orders/576461413038785752/tracking?sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&app_key=38abcd' \
  -H 'content-type: application/json' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k'
```

### Pseudocode
```python
# Define parameters
order_id = "576461413038785752"
path = f"/logistics/202604/orders/{order_id}/tracking"
timestamp = get_utc_timestamp()
sign = generate_signature(app_key, app_secret, path, timestamp, shop_cipher)

# Set headers
headers = {
    "content-type": "application/json",
    "x-tts-access-token": access_token
}

# Set query parameters
params = {
    "app_key": app_key,
    "timestamp": timestamp,
    "shop_cipher": shop_cipher,
    "sign": sign
}

# Execute
response = http.get(url = base_url + path, headers = headers, params = params)
if response.code == 0:
    process_tracking(response.data)
else:
    handle_error(response.code, response.message)
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /logistics/202604/orders/{order_id}/tracking`*
