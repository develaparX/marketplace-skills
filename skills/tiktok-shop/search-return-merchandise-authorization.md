# TikTok Shop API: Search Return Merchandise Authorization

# Search Return Merchandise Authorization (RMA) API Implementation Guide

## 1. Purpose
API search RMA request data. Use to track return status, get return line items, or link package to return request.

## 2. Endpoint & Method
*   **Method**: `POST`
*   **Path**: `/return_refund/202604/rma/search`
*   **Base URL**: `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
*   `content-type`: `application/json` (Required)
*   `x-tts-access-token`: Seller access token (Required. Use token where `user_type` = 0)

## 4. Parameters

### Query Parameters
*   `shop_cipher` (string, required): Shop identifier.
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Request signature from generator algorithm.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
*   `locale` (string, optional): BCP-47 locale code. Default: `en`.

### Body Parameters (JSON)
*   `whitelisted_data_fields` (array of strings, optional): Extra fields to return. Values: `LINE_ITEMS`, `SKU_RETURN_REQUESTS`.
*   `filters` (object, optional): Filter criteria (e.g., `rma_ids`, `package_ids`, `statuses`, `aftersales_request_ids`).
*   `sort` (object, optional): Sort criteria.
*   `pagination` (object, optional): Pagination configuration.

## 5. Response Structure
JSON response contains:
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Request log identifier.
*   `data` (object): Contains `return_merchandise_authorizations` array.
    *   `id` (string): RMA ID.
    *   `package_id` (string): Package ID.
    *   `aftersales_request_id` (string): Aftersales request ID.
    *   `status` (string): RMA status.
    *   `line_items` (array, conditional): Line item details (needs whitelist).
    *   `sku_return_requests` (array, conditional): SKU return request details (needs whitelist).

## 6. Error Handling
Check `code` field in response.

| Code | Description | Action |
| :--- | :--- | :--- |
| `25001001` | Invalid request parameter | Check parameter types and format. |
| `25020005` | No permission for order | Check shop cipher and access token. |
| `25020008` | Internal error | Retry request. Contact support if fail. |
| `36009003` | Internal error | Retry request. Contact support if fail. |

## 7. Pitfalls & Best Practices
*   **Missing Whitelist**: Must pass `whitelisted_data_fields` in body to get `line_items` or `sku_return_requests`. Empty otherwise.
*   **Signature Fail**: Generate `sign` using exact query parameters. Timestamp must match current time.
*   **Token Expiry**: Refresh `x-tts-access-token` before expiry.

## 8. Code Example

### cURL
```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/return_refund/202604/rma/search?shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&locale=en-US&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "whitelisted_data_fields": [
    "LINE_ITEMS",
    "SKU_RETURN_REQUESTS"
  ],
  "filters": {
    "rma_ids": [
      "2894521704838895640"
    ]
  }
}'
```

### Pseudocode
```python
# Define request details
url = "https://open-api.tiktokglobalshop.com/return_refund/202604/rma/search"
query_params = {
    "shop_cipher": "GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3",
    "app_key": "38abcd",
    "timestamp": current_timestamp(),
    "sign": generate_signature(query_params, app_secret)
}
headers = {
    "content-type": "application/json",
    "x-tts-access-token": "TTP_pwSm2AAAA..."
}
body = {
    "whitelisted_data_fields": ["LINE_ITEMS", "SKU_RETURN_REQUESTS"],
    "filters": {
        "rma_ids": ["2894521704838895640"]
    }
}

# Send request
response = http.post(url, params=query_params, headers=headers, json=body)

# Handle response
if response.code == 0:
    process_rma_data(response.data)
else:
    handle_error(response.code, response.message)
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /return_refund/202604/rma/search`*
