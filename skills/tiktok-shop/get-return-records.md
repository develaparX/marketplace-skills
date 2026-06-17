# TikTok Shop API: Get Return Records

# Implement Get Return Records API

## 1. Purpose & Use Case
API fetch return history. Use to track return lifecycle, audit buyer/seller actions, show timeline.

## 2. Endpoint & Method
*   **Method**: `GET`
*   **Path**: `/return_refund/202309/returns/{return_id}/records`
*   **Base URL**: `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token.

## 4. Parameters

### Path Parameter
*   `return_id` (string, required): Return request ID.

### Query Parameters
*   `app_key` (string, required): App identifier.
*   `sign` (string, required): Request signature.
*   `timestamp` (number, required): Unix timestamp (UTC).
*   `shop_cipher` (string, required): Shop identifier.
*   `locale` (string, optional): BCP-47 code. Default `en-US`.

## 5. Response Structure
*   `code` (number): Status. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Log ID.
*   `data` (object): Return details.
    *   `records` (array): Event list.
        *   `event` (string): Action type (e.g., `ORDER_RETURN`).
        *   `role` (string): Actor (e.g., `Buyer`).
        *   `description` (string): Event summary.
        *   `reason_text` (string): Return reason.
        *   `note` (string): Additional text.
        *   `images` (array): Proof images.
            *   `url` (string), `width` (number), `height` (number).
        *   `videos` (array): Proof videos.
            *   `url` (string), `cover` (string), `width` (number).

## 6. Error Handling
Check `code` in response. Non-zero means error. Log `request_id` for support.

## 7. Pitfalls & Best Practices
*   **Signature mismatch**: Generate `sign` correctly using official algorithm.
*   **Timestamp expiry**: Server time must match UTC.
*   **Media URLs expire**: Cache images/videos locally if needed.

## 8. Code Example

### Curl
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/return_refund/202309/returns/4035318504086604100/records?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&locale=en-US' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

### Pseudocode
```python
# Set parameters
return_id = "4035318504086604100"
url = f"https://open-api.tiktokglobalshop.com/return_refund/202309/returns/{return_id}/records"

headers = {
    "x-tts-access-token": "TTP_ACCESS_TOKEN",
    "content-type": "application/json"
}

params = {
    "app_key": "YOUR_APP_KEY",
    "timestamp": current_unix_timestamp(),
    "shop_cipher": "YOUR_SHOP_CIPHER",
    "locale": "en-US"
}

# Generate signature
params["sign"] = generate_signature(url, params, headers)

# Send request
response = http.get(url, headers=headers, params=params)

# Process response
if response.code == 0:
    records = response.data.records
    for record in records:
        print(record.event, record.description)
else:
    log_error(response.request_id, response.message)
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /return_refund/202309/returns/{return_id}/records`*
