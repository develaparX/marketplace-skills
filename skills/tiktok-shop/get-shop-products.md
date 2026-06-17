# TikTok Shop API: Get Shop Products

# Get Shop Products API Guide

## 1. Purpose
API search products. Creator bind shop. Use to find products by keyword.

## 2. Endpoint
*   **Method:** `GET`
*   **Path:** `/affiliate_creator/202509/shop_products`
*   **Base URL:** `https://open-api.tiktokglobalshop.com`

## 3. Headers
*   `content-type`: `application/json`
*   `x-tts-access-token`: Creator access token. Required when `user_type` is `1`.

## 4. Parameters
Query parameters:

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Signature from gen algorithm. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |
| `page_size` | number | Yes | Products per page. Range: `1-100`. |
| `title_keyword`| string | No | Product title keyword search. |
| `sort_field` | string | No | Sort field: `PRODUCT_ID` (default), `PRICE`, `SALE`. |
| `sort_order` | string | No | Sort order: `DESC` (default), `ASC`. |
| `page_token` | string | No | Pagination offset token. |

## 5. Response Structure
JSON response contains:
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Log identifier.
*   `data` (object): Product list container.
    *   `products` (array):
        *   `id` (string): Product ID.
        *   `title` (string): Product name.
        *   `price` (object): `amount` (string), `currency` (string).
        *   `added_status` (string): Status (e.g., `ADDABLE`).
        *   `brand_name` (string): Brand.
        *   `images` (array): `url` (string), `width` (number), `height` (number).
        *   `sales_count` (number): Total sales.

## 6. Error Handling
*   Check `code` field. Code non-zero means failure.
*   Save `request_id` to debug.

## 7. Pitfalls & Best Practices
*   **Timestamp expiry:** Server rejects old timestamps. Generate fresh timestamp to prevent rejection.
*   **Page size limit:** Do not exceed 100. Request fails if size out of range.
*   **Signature mismatch:** Generate signature using exact query parameters. Order matters.

## 8. Code Example
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/affiliate_creator/202509/shop_products?sort_field=PRODUCT_ID&sort_order=DESC&page_size=20&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&title_keyword=apple&app_key=38abcd&page_token=b2Zmc2V0PTAK' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtF

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /affiliate_creator/202509/shop_products`*
