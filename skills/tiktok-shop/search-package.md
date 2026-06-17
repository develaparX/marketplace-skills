# TikTok Shop API: Search Package

# Search Package API Implementation Guide

## 1. Purpose
Search Package API. Find package IDs. Use when need package list by time or status.

## 2. Endpoint
*   **Method**: `POST`
*   **Path**: `/fulfillment/202309/packages/search`
*   **Base URL**: `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token. Required.

## 4. Parameters

### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Request signature. |
| `timestamp` | number | Yes | Unix timestamp (UTC). |
| `page_size` | number | Yes | Results per page. Range: `[1-50]`. |
| `sort_field` | string | No | Sort field. Default: `create_time`. Values: `create_time`, `update_time`, `order_pay_time`. |
| `sort_order` | string | No | Sort order. Default: `DESC`. Values: `ASC`, `DESC`. |
| `page_token` | string | No | Token for next page. |
| `shop_cipher` | string | No | Shop identifier. |

### Request Body (JSON)
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `create_time_ge` | number | No | Filter created >= timestamp. Unix timestamp. |
| `create_time_lt` | number | No | Filter created < timestamp. Unix timestamp. |
| `update_time_ge` | number | No | Filter updated >= timestamp. Unix timestamp. |
| `update_time_lt` | number | No | Filter updated < timestamp. Unix timestamp. |
| `package_status` | string | No | Status filter. Values: `PROCESSING`, `FULFILLING`, `COMPLETED`, `CANCELLED`. |

## 5. Response Structure
*   `code` (number): Status code. `0` means success.
*   `message` (string): Error details.
*   `request_id` (string): Log ID.
*   `data` (object):
    *   `next_page_token` (string): Token for next page.
    *   `total_count` (number): Total results.
    *   `packages` (array):
        *   `id` (string): Package ID.
        *   `orders` (array):
            *   `id` (string): Order ID.
            *   `skus` (array):
                *   `id` (string): SKU ID.
                *   `name` (string): SKU name.
                *   `image_url` (string): Image link.
                *   `quantity` (number): Quantity.
        *   `create_time` (number): Creation timestamp.

## 6. Error Handling
*   **Error Code `36009003`**: Internal error. Action: Retry request. Contact support if fail persists.

## 7. Pitfalls & Best Practices
*   **Pagination**: Use `next_page_token` from response. Pass into `page_token` query param for next page.
*   **Timestamps**: Use Unix epoch seconds. Ensure UTC.
*   **Page Size**: Max limit 50. Request will fail if page size > 50.

## 8. Code Examples

### cURL
```bash
curl -X POST \
 'https://open-api.tiktokglobalshop.com/fulfillment/202309/packages/search?sort_order=ASC&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&sort_field=order_pay_time&page_token=6AsPQsUMvH3RkchNUPPh22NROHkE0D8pmq/N5M1kHYcZmtRyv9aVrNv65W7Q6tFA&app_key=38abcd&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&page_size=20' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "create_time_ge": 1623812664,
  "create_time_lt": 1623812664,
  "update_time_ge": 1623812664,
  "update_time_lt": 1623812664,
  "package_status": "PROCESSING"
}'
```

### Pseudocode
```python
# Define parameters
query_params = {
    "app_key": "38abcd",
    "timestamp": 1623812664,
    "sign": "5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c",
    "page_size": 20,
    "sort_field": "order_pay_time",
    "sort_order": "ASC"
}

headers = {
    "x-tts-access-token": "TTP_pwSm2...",
    "

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /fulfillment/202309/packages/search`*
