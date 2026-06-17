# TikTok Shop API: Cancel Target Collaboration Conflicts

# Target Collaboration Conflict Resolution API

### 1. Overview
Resolve target collaboration conflicts. Use when collaboration fails due to creator or product conflict.

### 2. Endpoint
*   **Method:** `POST`
*   **URL:** `https://open-api.tiktokglobalshop.com/affiliate_seller/202605/target_collaborations/conflicts/resolve`

### 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token. Required. Get from token API (use `user_type = 0`).

### 4. Parameters

#### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Request signature from gen algorithm. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |
| `shop_cipher` | string | Yes | Shop identifier cipher. |

#### Body Parameters (JSON)
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `conflict_items` | array | Yes | List of conflict items to resolve. |
| `conflict_items[].existing_collaboration_id` | string | Yes | ID of existing conflict collaboration. |
| `conflict_items[].creator_open_id` | string | Yes | Creator identifier. |

### 5. Response Structure
*   `code` (number): Status code. `0` means API call succeeded.
*   `message` (string): Status message. Contains failure reasons.
*   `request_id` (string): Request log identifier.
*   `data` (object): Result payload.
    *   `success_items` (array): Successfully resolved items.
        *   `creator_open_id` (string)
        *   `existing_collaboration_id` (string)
    *   `failed_items` (array): Failed resolution items.
        *   `creator_open_id` (string)
        *   `existing_collaboration_id` (string)

### 6. Error Handling
*   Check `code` field. Non-zero indicates API failure. Read `message` for details.
*   Check `failed_items` array. API can return code `0` (HTTP 200) but contain items that failed resolution.

### 7. Pitfalls & Best Practices
*   **Partial Success:** API processes batch. Some items succeed, others fail. Always parse `failed_items` array.
*   **Signature Generation:** Include all query parameters in signature calculation.
*   **Token Scope:** Ensure `x-tts-access-token` belongs to authorized seller account.

### 8. Code Example

```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/affiliate_seller/202605/target_collaborations/conflicts/resolve?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "conflict_items": [
    {
      "existing_collaboration_id": "123",
      "creator_open_id": "uACafQAAAABmUU2qon4R0vUYvUVS3QC6CICP2m5A2-wd77j8R9G0yg"
    }
  ]
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_seller/202605/target_collaborations/conflicts/resolve`*
