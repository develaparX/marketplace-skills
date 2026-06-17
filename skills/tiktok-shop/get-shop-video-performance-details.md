# TikTok Shop API: Get Shop Video Performance Details

# Shop Video Performance API Guide

## 1. Purpose
Get performance metrics for shop video. Use to track sales, GMV, CTR, impressions.

## 2. Endpoint
GET `https://open-api.tiktokglobalshop.com/analytics/202509/shop_videos/{video_id}/performance`

## 3. Headers
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token (user_type = 0)

## 4. Parameters

### Path Parameter
* `video_id` (string, required): Video ID.

### Query Parameters
* `app_key` (string, required): Unique app key.
* `sign` (string, required): Request signature.
* `timestamp` (number, required): Unix timestamp UTC.
* `shop_cipher` (string, required): Shop identifier.
* `start_date_ge` (string, required): Start date (ISO 8601 YYYY-MM-DD) in shop timezone.
* `end_date_lt` (string, required): End date (ISO 8601 YYYY-MM-DD) in shop timezone.
* `granularity` (string, optional): Data aggregation level. Values: `ALL`, `1D`. Default: `ALL`.
* `currency` (string, optional): Currency type. Values: `USD`, `LOCAL`. Default: `LOCAL`.

## 5. Response Structure
Returns JSON object.

```json
{
  "code": 0,
  "message": "success",
  "request_id": "20240901...",
  "data": {
    "performance": {
      "intervals": [
        {
          "start_date": "2024-09-01",
          "end_date": "2024-09-08",
          "sales": {
            "overall": {
              "gmv": {
                "amount": "230.02",
                "currency": "USD"
              },
              "gpm": {
                "amount": "1.02",
                "currency": "USD"
              },
              "customers": 12,
              "items_sold": 22,
              "ctr": "0.029",
              "product_impressions": 32092
            }
          }
        }
      ]
    }
  }
}
```

## 6. Error Handling
* Code `28001022`: Invalid start or end time. Check date format and range.

## 7. Pitfalls & Best Practices
* Timezone: Use shop registered timezone for dates. Wrong timezone causes wrong data.
* Signature: Generate signature using official algorithm. Signature mismatch causes auth failure.
* Token: Use seller token (user_type = 0). Other token types fail.

## 8. Code Example

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/analytics/202509/shop_videos/1111/performance?timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&start_date_ge=2024-09-01&end_date_lt=2024-09-08&granularity=ALL&app_key=38abcd&currency=USD&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /analytics/202509/shop_videos/{video_id}/performance`*
