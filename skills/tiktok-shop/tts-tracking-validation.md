# TikTok Shop API: TTS Tracking Validation

# TTS Tracking Validation API Guide

## 1. Overview & Use Case
API validates tracking number. Checks TikTok Shipping (TTS) or Collection by TikTok (CBT) coverage. 
* **Use case**: Verify shipping coverage before dispatch.
* **Limit**: US Market only.

## 2. Endpoint
* **Method**: `GET`
* **Path**: `/fulfillment/202508/tts_tracking_validation`
* **Base URL**: `https://open-api.tiktokglobalshop.com`

## 3. Headers & Authentication
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token (from Get Access Token, `user_type` must be `0`).

## 4. Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique developer app key. |
| `sign` | string | Yes | Request signature. |
| `timestamp` | number | Yes | Unix timestamp (UTC). |
| `shop_cipher` | string | Yes | Shop identifier cipher. |
| `tracking_number` | string | Yes | Carrier tracking number to validate. |

## 5. Response Structure
* `code` (number): Success/failure code. `0` means success.
* `message` (string): Status message.
* `request_id` (string): Debugging log ID.
* `data` (object):
  * `is_tiktok_shipping` (boolean): True if covered by TTS.
  * `is_tiktok_collection` (boolean): True if covered by CBT.

## 6. Error Handling
* Check `code` field. Non-zero value indicates failure.
* Log `request_id` for support tickets.

## 7. Pitfalls & Best Practices
* **US Only**: API fails for non-US shops. Check shop region before call.
* **Signature**: Generate `sign` using standard TikTok Shop algorithm. Incorrect signature causes auth failure.
* **Token Type**: Ensure token belongs to seller (`user_type = 0`). Warehouse tokens fail.

## 8. Code Examples

### cURL
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/fulfillment/202508/tts_tracking_validation?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&tracking_number=1234567' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

### Pseudocode
```python
# Generate signature
params = {
    "app_key": APP_KEY,
    "timestamp": current_unix_time(),
    "shop_cipher": SHOP_CIPHER,
    "tracking_number": "1234567"
}
sign = generate_tiktok_signature(path="/fulfillment/202508/tts_tracking_validation", params=params, secret=APP_SECRET)
params["sign"] = sign

# Send request
headers = {
    "x-tts-access-token": SELLER_TOKEN,
    "content-type": "application/json"
}
response = http.get("https://open-api.tiktokglobalshop.com/fulfillment/202508/tts_tracking_validation", query=params, headers=headers)

# Process response
if response.code == 0:
    is_tts = response.data.is_tiktok_shipping
    is_cbt = response.data.is_tiktok_collection
else:
    log_error(response.request_id, response.message)
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /fulfillment/202508/tts_tracking_validation`*
