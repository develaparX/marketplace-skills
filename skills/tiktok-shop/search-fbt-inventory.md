# TikTok Shop API: Search FBT Inventory

# Search FBT Inventory API Guide

## 1. Purpose
API get FBT inventory data. Use to sync stock levels, check warehouse quantities, track reserved items.

## 2. Endpoint
*   **Method:** `POST`
*   **Path:** `/fbt/202408/inventory/search`
*   **Base URL:** `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (user_type = 0).

## 4. Parameters

### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Request signature. |
| `timestamp` | number | Yes | Unix timestamp (UTC). |
| `shop_cipher` | string | Yes | Shop identifier. |
| `page_size` | number | Yes | Results per page. Range: [1-100]. |
| `page_token` | string | No | Token for next page. Empty for page 1. |

### Body Parameters (JSON)
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `goods_ids` | array[string] | No | FBT goods IDs. Max 100 items. |
| `fbt_warehouse_ids` | array[string] | No | FBT warehouse IDs. |
| `sku_ids` | array[string] | No | TikTok Shop SKU IDs. Max 100 items. |

## 5. Response Structure
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Log identifier.
*   `data` (object): Payload.
    *   `next_page_token` (string): Token for next page.
    *   `total_count` (number): Total matching records.
    *   `inventory` (array): List of inventory details.
        *   `goods` (object): Goods info.
            *   `id` (string): Goods ID.
            *   `reference_code` (string): Reference code.
            *   `name` (string): Goods name.
            *   `skus` (array): SKU list.
                *   `id` (string): SKU ID.
                *   `on_hand_detail` (object): Quantities.
                    *   `total_quantity` (number): Total stock.
                    *   `available_quantity` (number): Sellable stock.
                    *   `reserved_quantity` (number): Reserved stock.

## 6. Error Handling
Check `code` field. Non-zero means error. Log `request_id` to debug with support. Retry on network fail.

## 7. Pitfalls & Best Practices
*   **Wrong signature block request.** Calculate signature with all query parameters to pass auth.
*   **Pagination require token.** Use `next_page_token` from response to fetch next page. Do not hardcode.
*   **Array limit exist.** Keep `goods_ids` and `sku_ids` under 100 items to avoid validation error.

## 8. Code Example

```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/fbt/202408/inventory/search?sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&page_size=50&page_token=cGFnZV9udW1iZXI9Mg==&app_key=38abcd' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "goods_ids": ["256080616234", "2231616264"],
  "fbt_warehouse_ids": ["7232382932030232"],
  "sku_ids": ["256080616234"]
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /fbt/202408/inventory/search`*
