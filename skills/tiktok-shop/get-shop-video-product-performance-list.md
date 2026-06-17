# TikTok Shop API: Get Shop Video Product Performance List

# Get Shop Video Product Performance List API Implementation Guide

## 1. Purpose
Track product metrics for specific video. Measure GMV, units sold, buyer count. Use for creator analytics, campaign ROI tracking.

## 2. Endpoint
* **Method**: `GET`
* **URL**: `https://open-api.tiktokglobalshop.com/analytics/202509/shop_videos/{video_id}/products/performance`

## 3. Headers
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token (from Get Access Token, where `user_type` = 0)

## 4. Parameters

### Path Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `video_id` | string | Yes | Target video ID |

### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key |
| `sign` | string | Yes | Request signature |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00) |
| `shop_cipher` | string | Yes | Shop identifier cipher |
| `start_date_ge` | string | Yes | Start date. ISO 8601 `YYYY-MM-DD`. Inclusive. Shop timezone. |
| `end_date_lt` | string | Yes | End date. ISO 8601 `YYYY-MM-DD`. Exclusive. Shop timezone. |
| `page_size` | number | No | Items per page. Max 100. Default 10. |
| `sort_field` | string | No | Sort key. Values: `gmv`, `units_sold`, `daily_avg_buyers`. Default `gmv`. |
| `sort_order` | string | No | Sort direction. Values: `ASC`, `DESC`. Default `DESC`. |
| `currency` | string | No | Currency type. Values: `USD`, `LOCAL`. Default `LOCAL`. |
| `page_token` | string | No | Token for next page. |

## 5. Response Structure

### Success Response (Code 0)
```json
{
  "code": 0,
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7",
  "data": {
    "products": [
      {
        "id": "105xxxxxxxxxxxxx247",
        "name": "Product Name",
        "gmv": {
          "amount": "0",
          "currency": "USD"
        },
        "units_sold": 0,
        "daily_avg_buyers": "0"
      }
    ],
    "latest_available_date": "2024-09-07",
    "next_page_token": "cGFnZV9udW1iZXI9MQ==",
    "total_count": 10
  }
}
```

### Fields
* `data.products`: Array. Product performance list.
* `data.latest_available_date`: String. Latest date with data.
* `data.next_page_token`: String. Token for next page request. Empty if no more pages.
* `data.total_count`: Number. Total matching items.

## 6. Error Handling
* **Code `28001022`**: Invalid request params. Start time or end time invalid.
* **Fix**: Check date formats. Ensure `start_date_ge` <= `end_date_lt`. Use `YYYY-MM-DD`.

## 7. Pitfalls & Best Practices
* **Date Range**: `end_date_lt` is exclusive. To get data for Sept 1 to Sept 7, set `start_date_ge=2024-09-01` and `end_date_lt=2024-09-08`.
* **Timezone**: Dates use shop registered timezone, not UTC.
* **Pagination**: Use `next_page_token` from response in `page_token` query param for next page. Do not calculate offsets manually.
* **Signature**: Generate `sign` using standard algorithm. Include all query parameters except `sign` itself.

## 8. Code Example

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/analytics/202509/shop_videos/752xxxxxxxxxxxxxxx42/products/performance?timestamp=1623812664&end_date_lt=2024-09-08&sort_field=gmv&sort_order=DESC&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&page_size=10&currency=USD&page_token=cGFnZV9udW1iZXI9MQ==&start_date_ge=2024-09-01&app_key=38abcd' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /analytics/202509/shop_videos/{video_id}/products/performance`*
