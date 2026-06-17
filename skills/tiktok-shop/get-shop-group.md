# TikTok Shop API: Get Shop Group

# Implementation Guide: Get Shop Group API

### 1. Overview
API query shop scope. Use to find linked shops.

### 2. Endpoint
*   **Method**: `GET`
*   **Path**: `/seller/202601/shop_groups`
*   **Base URL**: `https://open-api.tiktokglobalshop.com`

### 3. Headers & Authentication
*   `content-type`: `application/json` (Required)
*   `x-tts-access-token`: Seller access token. Get from "Get Access Token" flow (user_type = 0). (Required)

### 4. Query Parameters
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Signature from gen algorithm.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).

### 5. Response Structure
*   `code` (number): Status code. `0` mean success.
*   `message` (string): Status message.
*   `request_id` (string): Log identifier.
*   `data` (object): Shop group details.
    *   `shop_group_data` (object): Group container.
        *   `shop_group` (object): Group info.
            *   `source` (string): Group source.
            *   `shop_group_name` (string): Group name.
        *   `shops` (array): List of shops in group.
            *   `shop_id` (string): Shop ID.
            *   `seller_id` (string): Seller ID.
            *   `shop_name` (string): Shop name.
            *   `shop_region` (string): Shop region (e.g., "US").

### 6. Error Handling
*   **Error Code `98001004`**: Parameter invalid. Check parameter name, reason, expected value.

### 7. Pitfalls & Best Practices
*   **Timestamp drift**: Sync server clock. Request fail if timestamp old.
*   **Signature generation**: Sign query params correctly. Order matters.
*   **Token expiry**: Refresh token before expiry.

### 8. Example

#### Request
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/seller/202601/shop_groups?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

#### Response
```json
{
  "code": 0,
  "data": {
    "shop_group_data": {
      "shop_group": {
        "source": "1",
        "shop_group_name": "shop group name A"
      },
      "shops": [
        {
          "shop_id": "1234",
          "seller_id": "12",
          "shop_name": "shop name A",
          "shop_region": "US"
        }
      ]
    }
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /seller/202601/shop_groups`*
