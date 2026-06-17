# TikTok Shop API: Check Target Collaboration Conflicts

# API Integration Guide: Check Target Collaboration Conflicts

### 1. Purpose & Use Case
API find target collaboration conflict. Use before create new collaboration. Prevent duplicate contract.

### 2. Endpoint
*   **Method**: `POST`
*   **URL**: `https://open-api.tiktokglobalshop.com/affiliate_seller/202605/target_collaborations/conflicts/check`

### 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (user_type = 0)

### 4. Parameters

#### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique application key. |
| `sign` | string | Yes | Request signature. |
| `timestamp` | number | Yes | Unix epoch timestamp (UTC). |
| `shop_cipher` | string | Yes | Shop identifier. |

#### Body Parameters (JSON)
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `creator_open_id_list` | array[string] | Yes | Target creator IDs. |
| `product_id_list` | array[string] | Yes | Target product IDs. |

### 5. Response Structure
```json
{
  "code": 0,
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7",
  "data": {
    "has_conflict": false,
    "conflict_items": [
      {
        "creator_open_id": "uACafQAAAABmUU2qon4R0vUYvUVS3QC6CICP2m5A2-wd77j8R9G0yg",
        "product_id": "1234",
        "existing_collaboration_id": "1234"
      }
    ]
  }
}
```

### 6. Error Handling
Check `code` field. If `code` not `0`, request fail. Read `message` for error detail. Save `request_id` for debug log.

### 7. Pitfalls & Best Practices
*   **Signature expiry**: Generate signature right before call. Timestamp mismatch cause auth failure.
*   **Empty arrays**: Do not send empty `creator_open_id_list` or `product_id_list`. API return error.
*   **Token refresh**: Handle expired `x-tts-access-token`. Refresh token if API return auth error.

### 8. Code Example
```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/affiliate_seller/202605/target_collaborations/conflicts/check?timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "creator_open_id_list": [
    "uACafQAAAABmUU2qon4R0vUYvUVS3QC6CICP2m5A2-wd77j8R9G0yg"
  ],
  "product_id_list": [
    "1234"
  ]
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_seller/202605/target_collaborations/conflicts/check`*
