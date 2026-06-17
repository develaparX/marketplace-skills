# TikTok Shop API: Get Products SEO Words

# Get Products SEO Words API Implementation Guide

## 1. Overview
Get SEO suggestions for live product titles. Boost search visibility. Use only for active products (`status: ACTIVATE`).

## 2. Endpoint
*   **Method:** `GET`
*   **Path:** `/product/202405/products/seo_words`
*   **Base URL:** `https://open-api.tiktokglobalshop.com`

## 3. Headers & Authentication
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (`user_type = 0`)

## 4. Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key |
| `sign` | string | Yes | Request signature |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00) |
| `shop_cipher` | string | Yes | Shop identifier |
| `product_ids` | array/string | Yes | Comma-separated product IDs. Max 20. Must be live. |

## 5. Response Structure
```json
{
  "code": 0,
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7",
  "data": {
    "products": [
      {
        "id": "12345",
        "seo_words": [
          {
            "text": "dress"
          }
        ]
      }
    ]
  }
}
```

## 6. Error Handling
Check `code` field in response. 

| Code | Description | Action |
| :--- | :--- | :--- |
| `12009014` | Seller no permission for product | Verify token and product ownership |
| `12019114` | Seller has no permission | Check token scopes |
| `12019120` | Product ID limit exceeded | Reduce batch size to 20 or less |
| `12052260` | Product ID does not exist | Verify product ID exists and is active |
| `36009003` | Internal error | Retry request. Contact support if error persists. |

## 7. Pitfalls & Best Practices
*   **Batch Limit:** Max 20 product IDs per call. Split larger lists.
*   **Product Status:** Only active products return data. Inactive products cause errors.
*   **Signature:** Generate new signature for every request. Timestamp must be current.

## 8. Code Example

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/product/202405/products/seo_words?sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&app_key=38abcd&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&product_ids=12345678,123456' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /product/202405/products/seo_words`*
