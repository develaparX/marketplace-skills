# TikTok Shop API: Get Categories

# Get Categories API Implementation Guide

### 1. Overview
API retrieves shop product categories. Use to build category trees or validate category IDs before product upload.

### 2. Endpoint
*   **Method:** GET
*   **URL:** `https://open-api.tiktokglobalshop.com/product/202309/categories`

### 3. Headers & Authentication
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token. Get token from authorization flow (use `user_type = 0`).

### 4. Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique developer app key. |
| `sign` | string | Yes | Request signature from generation algorithm. |
| `timestamp` | number | Yes | Unix timestamp UTC (seconds). |
| `shop_cipher` | string | Yes | Shop identifier cipher. |
| `locale` | string | No | BCP-47 locale code for category names. |
| `keyword` | string | No | Filter by category name. |
| `category_version` | string | No | Category tree version. |
| `listing_platform` | string | No | Filter by platform. |
| `include_prohibited_categories` | boolean | No | Include blocked categories. |

### 5. Response Structure
```json
{
  "code": 0,
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7",
  "data": {
    "categories": [
      {
        "id": "600002",
        "parent_id": "600001",
        "local_name": "Home Supplies",
        "is_leaf": false,
        "permission_statuses": [
          "INVITE_ONLY",
          "NON_MAIN_CATEGORY"
        ]
      }
    ]
  }
}
```

### 6. Error Codes

| Code | Description | Action |
| :--- | :--- | :--- |
| `12019210` | publish param invalid | Check query parameter format. |
| `12052023` | Category does not exist | Verify category ID. |
| `12052217` | All region shops must use V2 categories | Change category version to V2. |
| `12052230` | Category version and categoryID mismatch | Align category ID with version parameter. |
| `12052700` | The seller is inactive | Check seller account status. |
| `12052704` | seller id not exist | Verify shop cipher and token. |
| `36009003` | Internal error | Retry request. Contact support if error persists. |

### 7. Pitfalls & Best Practices
*   **Cache category data.** Category lists change slowly. Store data locally to avoid rate limits.
*   **Verify leaf node status.** Check `is_leaf` field. Only map products to categories where `is_leaf` is `true`.
*   **Check permissions.** Inspect `permission_statuses` array. Avoid listing products in `INVITE_ONLY` categories without approval.

### 8. Code Example

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/product/202309/categories?locale=en-US&category_version=v1&listing_platform=TIKTOK_SHOP&include_prohibited_categories=false&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&keyword=electronics' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /product/202309/categories`*
