# TikTok Shop API: Get Shop Product Performance List

# Shop Product Performance API Implementation Guide

## 1. Overview
Get product performance metrics. Use for analytics dashboards, sales tracking, inventory decisions.

## 2. Endpoint
*   **Method:** `GET`
*   **URL:** `https://open-api.tiktokglobalshop.com/analytics/202605/shop_products/performance`

## 3. Headers & Authentication
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (user_type = 0).

## 4. Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Request signature. |
| `timestamp` | number | Yes | Unix timestamp (UTC). |
| `shop_cipher` | string | Yes | Shop identifier. |
| `start_date_ge` | string | Yes | Start date (ISO 8601 `YYYY-MM-DD`). Shop timezone. Inclusive. |
| `end_date_lt` | string | Yes | End date (ISO 8601 `YYYY-MM-DD`). Shop timezone. Exclusive. |
| `page_size` | number | No | Products per page. Max 100. Default 10. |
| `page_token` | string | No | Token for next page. |
| `sort_field` | string | No | Sort key. `gmv` (default), `items_sold`, `orders`. |
| `sort_order` | string | No | Sort direction. `DESC` (default), `ASC`. |
| `currency` | string | No | `LOCAL` (default), `USD`. |
| `category_filter` | array | No | Category IDs. |
| `product_status_filter`| string | No | `ALL` (default), `LIVE`, `INACTIVE`. |

## 5. Response Structure

```json
{
  "code": 0,
  "message": "success",
  "request_id": "20240501...",
  "data": {
    "products": [
      {
        "id": "1732333333333333629",
        "total_performance": {
          "gmv": {
            "amount": "395.03",
            "currency": "GBP"
          },
          "orders": 12,
          "sku_orders": 12,
          "items_sold": 12,
          "estimated_customers": 10,
          "aov": {
            "amount": "32.92",
            "currency": "GBP"
          },
          "product_impressions": 5420,
          "product_clicks": 438,
          "ctr": "0.0808"
        }
      }
    ]
  }
}
```

## 6. Error Handling
*   **Error Code `28001022`**: Invalid start or end time. Fix: Check date format (`YYYY-MM-DD`). Verify start date is before end date.

## 7. Pitfalls & Best Practices
*   **Date range exclusive**: `end_date_lt` excludes the boundary day. Query `2024-04-01` to `2024-04-08` to get data for April 1 through April 7.
*   **Timezone alignment**: Dates use shop registered timezone, not UTC. Convert local system time to shop timezone before query.
*   **Pagination**: Use `page_token` from response data for next page request. Do not calculate page offsets manually.
*   **Signature generation**: Generate `sign` parameter using correct hashing algorithm. Include all query parameters in signature calculation.

## 8. Code Example

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/analytics/202605/shop_products/performance?timestamp=1623812664&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&start_date_ge=2024-04-01&end_date_lt=2024-04-08&sort_order=DESC&currency=LOCAL&category_filter=123123,321412&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&page_size=10&page_token=cGFnZV9udW1iZXI9MQ==&sort_field=gmv&product_status_filter=LIVE' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /analytics/202605/shop_products/performance`*
