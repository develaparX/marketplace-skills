# TikTok Shop API: Check Listing Prerequisites

# Check Listing Prerequisites API

## Purpose
Check shop readiness. Use before list product. Prevent listing fail.

## Endpoint
*   **Method:** `GET`
*   **URL:** `https://open-api.tiktokglobalshop.com/product/202312/prerequisites`

## Headers
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token. Get from Get Access Token (user_type = 0).

## Query Parameters
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Signature from gen algorithm. Verify sender.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
*   `shop_cipher` (string, required): Shop identifier. Get from Get Authorization Shop API. Required for cross-border shops.

## Response Structure
*   `code` (number): Status code. `0` mean success.
*   `message` (string): Status message. Fail reason here.
*   `request_id` (string): Log ID.
*   `data` (object): Payload.
    *   `check_results` (array): List of checks.
        *   `check_item` (string): Checked requirement (e.g., `RETURN_WAREHOUSE`).
        *   `is_failed` (boolean): `true` if shop fail requirement.
        *   `fail_reasons` (array of string): Why check fail.

## Error Codes
*   `36009003`: Internal error. Retry. Contact support if persist.
*   `33001002`: Internal error. Retry.

## Pitfalls & Best Practices
*   **Missing shop_cipher:** Cross-border shops return wrong data if missing. Always send correct `shop_cipher`.
*   **Failed checks:** If `is_failed` is `true`, block listing UI. Show `fail_reasons` to user. Direct user to Seller Center to fix.

## Implementation Example

### Curl
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/product/202312/prerequisites?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

### Pseudocode
```python
# Generate signature and timestamp
timestamp = get_utc_timestamp()
sign = generate_signature(app_key, app_secret, timestamp, path)

# Set request
headers = {
    "content-type": "application/json",
    "x-tts-access-token": seller_token
}
params = {
    "app_key": app_key,
    "sign": sign,
    "timestamp": timestamp,
    "shop_cipher": shop_cipher
}

# Call API
response = http.get("https://open-api.tiktokglobalshop.com/product/202312/prerequisites", headers=headers, params=params)

# Process
if response.code == 0:
    for result in response.data.check_results:
        if result.is_failed:
            print("Block listing. Reason: " + result.fail_reasons[0])
else:
    print("API error: " + response.message)
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /product/202312/prerequisites`*
