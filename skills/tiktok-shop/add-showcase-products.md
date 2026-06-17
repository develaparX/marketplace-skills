# TikTok Shop API: Add Showcase Products

# Add Showcase Products API Implementation Guide

## 1. Overview
Add products to creator showcase. Use when creator wants display items on profile.

## 2. Endpoint
*   **Method:** `POST`
*   **Base URL:** `https://open-api.tiktokglobalshop.com`
*   **Path:** `/affiliate_creator/202405/showcases/products/add`

## 3. Headers & Authentication
*   `content-type`: `application/json`
*   `x-tts-access-token`: Creator access token (required, `user_type = 1`).

## 4. Parameters

### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app identifier. |
| `sign` | string | Yes | Signature from generation algorithm. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |

### Request Body (JSON)
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `add_type` | string | Yes | Add method. Values: `PRODUCT_ID`, `PRODUCT_LINK`. |
| `product_ids` | array\[string\] | No | Product identifiers. Max 20 items. Required if `add_type` is `PRODUCT_ID`. |
| `product_link` | string | No | Product URL. Max 20 URLs. Required if `add_type` is `PRODUCT_LINK`. |

## 5. Response Structure
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Request log identifier.
*   `data` (object): Return payload. Contains `errors` array for failed items.

## 6. Error Handling
API returns overall success code but individual items can fail. Check `data.errors` array in response.

Example error payload:
```json
{
  "code": 0,
  "data": {
    "errors": [
      {
        "code": 16001001,
        "message": "Encounter network error, please try again.",
        "detail": {
          "product_id": "12390753231"
        }
      }
    ]
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

## 7. Pitfalls & Best Practices
*   **Limit:** Max 20 products per request. Batch larger lists.
*   **Type Match:** Do not send `product_ids` if `add_type` is `PRODUCT_LINK`.
*   **Partial Success:** API returns HTTP 200 even if some products fail. Parse `data.errors` to find failed items.

## 8. Code Example

```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/affiliate_creator/202405/showcases/products/add?timestamp=1623812664&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "add_type": "PRODUCT_ID",
  "product_ids": [
    "12390753231",
    "7102893481290"
  ]
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_creator/202405/showcases/products/add`*
