# TikTok Shop API: Get FBT Merchant MCF Status

# Implement: Get FBT Merchant MCF Status

## 1. Purpose
API checks FBT merchant status and MCF enrollment. Use before route MCF orders.

## 2. Endpoint
*   **Method:** `GET`
*   **URL:** `https://open-api.tiktokglobalshop.com/fbt/202601/merchants/mcf_status`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (`user_type = 0`).

## 4. Query Parameters
*   `app_key` (string, required): App identifier.
*   `sign` (string, required): Signature from generation algorithm.
*   `timestamp` (number, required): Unix timestamp (UTC).
*   `shop_cipher` (string, required): Shop cipher string.

## 5. Response Structure
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Log ID.
*   `data` (object): Container.
    *   `mcf_status` (object): MCF details.
        *   `is_mcf` (number): `1` = enrolled, `0` = not enrolled.

## 6. Error Handling
Check `code` field. If `code` not `0`, request failed. Log `request_id` for troubleshooting.

## 7. Pitfalls & Best Practices
*   **Timestamp drift:** Sync server clock. Request fails if timestamp expires.
*   **Signature generation:** Sort query parameters alphabetically before hash.
*   **Token type:** Use seller token. Partner token fails.

## 8. Code Examples

### cURL
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/fbt/202601/merchants/mcf_status?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
  -H 'content-type: application/json' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k'
```

### Python Pseudocode
```python
import time
import hmac
import hashlib
import requests

# Setup params
app_key = "38abcd"
app_secret = "your_app_secret"
shop_cipher = "GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3"
token = "TTP_pwSm2..."
timestamp = str(int(time.time()))
path = "/fbt/202601/merchants/mcf_status"

# Sign request
params = {
    "app_key": app_key,
    "timestamp": timestamp,
    "shop_cipher": shop_cipher
}
# Sort and concatenate
sign_string = path
for k in sorted(params.keys()):
    sign_string += k + params[k]

# Generate HMAC-SHA256
sign = hmac.new(
    app_secret.encode('utf-8'),
    sign_string.encode('utf-8'),
    hashlib.sha256
).hexdigest()

params["sign"] = sign

# Send request
headers = {
    "content-type": "application/json",
    "x-tts-access-token": token
}
url = f"https://open-api.tiktokglobalshop.com{path}"
response = requests.get(url, params=params, headers=headers)
print(response.json())
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /fbt/202601/merchants/mcf_status`*
