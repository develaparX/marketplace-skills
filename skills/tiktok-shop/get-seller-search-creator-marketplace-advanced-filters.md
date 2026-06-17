# TikTok Shop API: Get Seller Search Creator Marketplace Advanced Filters

# API Guide: Get Seller Search Creator Marketplace Advanced Filters

## 1. Overview
API get dynamic search filters for Creator Marketplace. Use before render search UI. Filters change by country/region.

## 2. Endpoint
*   **Method:** `POST`
*   **Path:** `/affiliate_seller/202601/marketplace_creators/search/filter`
*   **Base URL:** `https://open-api.tiktokglobalshop.com`

## 3. Headers & Authentication
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (from Get Access Token, `user_type` must be `0`).

## 4. Query Parameters
Pass parameters in URL query string:

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique developer app key. |
| `sign` | string | Yes | Request signature from gen algorithm. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |
| `shop_cipher` | string | Yes | Shop identifier. Get via "Get Authorization Shop" API. |

## 5. Request Body
Send empty JSON object:
```json
{}
```

## 6. Response Structure
*   `code` (number): Status code. `0` mean success.
*   `message` (string): Status message. Contain error reason if fail.
*   `request_id` (string): Log identifier. Use for debug.
*   `data` (object): Filter options container.
    *   `advanced_filters` (object): Available filters.
        *   `language` (array[string]): Language options.
        *   `creator_level` (array[string]): Creator levels.
        *   `category_pro` (array[string]): Product categories.

## 7. Pitfalls & Best Practices
*   **Wrong Shop Cipher:** Cross-border shops return wrong data if cipher incorrect. Get cipher first.
*   **Dynamic Filters:** Do not hardcode filter values. API return new filters when released. Cache response short time only.
*   **Signature Fail:** Ensure query parameters sorted before sign generation.

## 8. Code Example

### Request
```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/affiliate_seller/202601/marketplace_creators/search/filter?shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&timestamp=1623812664&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{}'
```

### Response
```json
{
  "code": 0,
  "data": {
    "advanced_filters": {
      "language": [
        "Malay",
        "English"
      ],
      "creator_level": [
        "Lv. 0",
        "Lv. 1"
      ],
      "category_pro": [
        "Home",
        "Auto"
      ]
    }
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_seller/202601/marketplace_creators/search/filter`*
