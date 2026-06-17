# TikTok Shop API: Get Creator Applicable Sample Label

# Guide: Get Creator Applicable Sample Label API

### 1. Purpose
Check if creator can request product sample. Use before render request button.

### 2. Endpoint
*   **Method:** `GET`
*   **Path:** `/affiliate_creator/202412/samples/labels`
*   **Base URL:** `https://open-api.tiktokglobalshop.com`

### 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Creator access token. Must use `user_type = 1`.

### 4. Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | App identifier. |
| `sign` | string | Yes | Signature from gen algorithm. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |
| `product_id` | string | Yes | TikTok Shop product ID. |

### 5. Response Structure
*   `code` (number): Status. `0` means success.
*   `message` (string): Error details.
*   `request_id` (string): Log identifier.
*   `data` (object): Payload.
    *   `label` (object):
        *   `can_apply` (boolean): True if creator eligible.
        *   `status` (string): Application status (e.g., `ONGOING`).
        *   `application_id` (string): Active application ID.
        *   `reach_limit` (boolean): True if creator hit limit.
        *   `sample_product` (object): Product details.
            *   `sample_sku_list` (array): Available SKUs.

### 6. Error Handling
*   **Code `36009003`**: Internal error. Retry request. Contact support if fail.

### 7. Pitfalls & Best Practices
*   **Token type**: Use creator token. Seller token fail.
*   **Signature**: Include `product_id` in signature calculation.
*   **Limit check**: Read `reach_limit` flag. If true, block request.

### 8. Implementation Example

#### cURL
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/affiliate_creator/202412/samples/labels?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&product_id=1729480364147774364' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

#### Pseudocode
```python
# Generate signature
params = {
    "app_key": APP_KEY,
    "timestamp": get_utc_timestamp(),
    "product_id": "1729480364147774364"
}
sign = generate_signature(params, APP_SECRET)
params["sign"] = sign

# Set headers
headers = {
    "x-tts-access-token": CREATOR_TOKEN,
    "content-type": "application/json"
}

# Send request
response = http.get("/affiliate_creator/202412/samples/labels", params=params, headers=headers)

# Process response
if response.code == 0:
    label = response.data.label
    if label.can_apply and not label.reach_limit:
        show_request_button()
    else:
        hide_request_button(reason=label.status)
else:
    handle_error(response.code, response.message)
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /affiliate_creator/202412/samples/labels`*
