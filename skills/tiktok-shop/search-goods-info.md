# TikTok Shop API: Search Goods Info

# Search Goods Info API Implementation Guide

## 1. Purpose & Use Cases
API retrieves merchant goods list. Use to get goods IDs, names, SKU relations, dimensions, warehouse-verified weight.

## 2. Endpoint & Method
*   **Method:** `POST`
*   **URL:** `https://open-api.tiktokglobalshop.com/fbt/202409/goods/search`

## 3. Headers & Authentication
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (when `user_type` = 0).

## 4. Parameters

### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Signature from gen algorithm. |
| `timestamp` | string | Yes | Unix timestamp GMT (UTC+00:00). |
| `shop_cipher` | string | Yes | Shop identifier from Get Authorization Shop API. |
| `page_size` | number | Yes | Results per page. Range: [1-100]. |
| `page_token` | string | No | Token for next page. Leave empty for page 1. |

### Body Parameters (JSON)
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `goods_ids` | array[string] | No | FBT goods IDs. Max length 100. |
| `product_ids` | array[string] | No | TikTok Shop product IDs. Max length 100. |
| `reference_codes` | array[string] | No | Merchant SKU codes. Max length 100. |
| `sku_ids` | array[string] | No | TikTok Shop SKU IDs. Max length 100. |

## 5. Response Structure
Returns JSON object.

### Root Fields
*   `code` (number): Status code. `0` means success.
*   `message` (string): Error details.
*   `request_id` (string): Log identifier.
*   `data` (object): Payload.

### Data Object Fields
*   `next_page_token` (string): Token for next page request.
*   `total_count` (number): Total matched items.
*   `goods` (array): List of goods.
    *   `id` (string): Goods ID.
    *   `name` (string): Goods name.
    *   `barcodes` (array): Barcode list (code, type).
    *   `reference_code` (string): Merchant SKU.
    *   `image_url` (string): Image link.
    *   `merchant_declaration_info` (object): Weight details (value, unit).

## 6. Error Handling
Check `code` field. If `code` not `0`, request failed. Read `message` to debug. Save `request_id` for support logs.

## 7. Pitfalls & Best Practices
*   **Shop Cipher:** Wrong `shop_cipher` returns empty/incorrect data. Fetch correct cipher first.
*   **Array Limits:** Do not exceed 100 items in filter arrays. Request fails if limit exceeded.
*   **Pagination:** Use `next_page_token` from response in next request query. Stop when `next_page_token` empty.

## 8. Code Example

```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/fbt/202409/goods/search?page_size=50&page_token=cGFnZV9udW1iZXI9Mg==&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "goods_ids": [
    "256080616234"
  ],
  "product_ids": [
    "256990616123"
  ],
  "reference_codes": [
    "SELLERSKU 123456"
  ],
  "sku_ids": [
    "256086568895"
  ]
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /fbt/202409/goods/search`*
