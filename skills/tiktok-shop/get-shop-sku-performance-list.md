# TikTok Shop API: Get Shop SKU Performance List

# Guide: Shop SKU Performance API

## 1. Overview
API get SKU performance metrics. Use to track sales, plan inventory.

## 2. Endpoint
*   **Method**: `GET`
*   **Path**: `/analytics/202509/shop_skus/performance`
*   **Base URL**: `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (from Get Access Token, `user_type = 0`).

## 4. Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Signature from gen algorithm. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |
| `shop_cipher` | string | Yes | Shop cipher for request. |
| `start_date_ge` | string | Yes | Start date (ISO 8601 YYYY-MM-DD), inclusive. Shop timezone. |
| `end_date_lt` | string | Yes | End date (ISO 8601 YYYY-MM-DD), exclusive. Shop timezone. |
| `page_size` | number | No | Records per page. Max 100. |
| `page_token` | string | No | Token for page position. Default empty (first page). |
| `sort_field` | string | No | Sort field: `gmv` (default), `sku_orders`, `units_sold`. |
| `sort_order` | string | No | Sort order: `DESC` (default), `ASC`. |
| `category_filter` | array | No | Filter by category IDs. |
| `product_status_filter` | string | No | Filter status: `LIVE`, `INACTIVE`, `ALL` (default). |
| `product_ids` | array | No | Filter by product IDs. Empty returns all SKUs. |
| `currency` | string | No | Currency: `USD`, `LOCAL` (default). |

## 5. Response Fields

*   `code` (number): Status code. `0` means success.
*   `message` (string): Error details or success message.
*   `request_id` (string): Request log identifier.
*   `data` (object):
    *   `skus` (array): SKU performance list.
        *   `id` (number): SKU ID.
        *   `product_id` (number): Product ID.
        *   `gmv` (object): Gross Merchandise Value.
            *   `amount` (string): GMV value.
            *   `currency` (string): Currency code.
        *   `sku_orders` (number): Order count.
        *   `units_sold` (number): Units sold count.
    *   `next_page_token` (string): Token for next page.
    *   `total_count` (number): Total record count.
    *   `latest_available_date` (string): Latest date with data.

## 6. Error Handling
*   **Error Code `36009003`**: Internal error. Retry request. Contact support if fail persist.

## 7. Pitfalls & Best Practices
*   **Timezone mismatch**: Use shop registered timezone for dates. Prevent data mismatch.
*   **Date range**: `end_date_lt` exclusive. `start_date_ge` inclusive. Check dates before request.
*   **Pagination**: Use `next_page_token` to fetch next page. Stop when token empty.
*   **Signature**: Generate signature using official algorithm. Wrong signature cause auth failure.

## 8. Code Example

```bash
curl -X GET \
  'https://open-api.tiktokglobalshop.com/analytics/202509/shop_skus/performance?sort_order=DESC&category_filter=123123,321412&product_ids=123456789,34909989&app_key=38abcd&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&page_token=cGFnZV9udW1iZXI9MQ==&sort_field=gmv&product_status_filter=LIVE&currency=USD&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&start_date_ge=2024-04-01&end_date_lt=2024-04-08&page_size=10' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /analytics/202509/shop_skus/performance`*
