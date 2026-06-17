# TikTok Shop API: Get Affiliate Campaign Creator Fulfillment Status Info

# Get Affiliate Campaign Creator Fulfillment Status Info

## 1. Overview
API track creator fulfillment. Use to check partner product status in creator showcase.

## 2. Endpoint
* **Method**: `GET`
* **URL**: `https://open-api.tiktokglobalshop.com/affiliate_partner/202508/campaigns/{campaign_id}/products/{product_id}/performance`

## 3. Headers & Auth
* `content-type`: `application/json`
* `x-tts-access-token`: Partner access token (requires `user_type = 3`).

## 4. Parameters

### Path Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `campaign_id` | string | Yes | Campaign identifier. |
| `product_id` | string | Yes | Product identifier. |

### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Request signature. |
| `timestamp` | number | Yes | Unix timestamp (UTC). |
| `category_asset_cipher` | string | Yes | Partner identifier. |
| `page_size` | number | No | Results per page (1-50). |
| `page_token` | string | No | Token for next page. |

## 5. Response Structure
Returns execution status and creator performance data.

```json
{
  "code": 0,
  "message": "Success",
  "request_id": "202508...",
  "data": {
    "total_creator_count": 1,
    "promotion_creators": [
      {
        "paid_amount": {
          "currency": "USD",
          "amount": "3.00"
        },
        "room_count": 1,
        "video_count": 1,
        "free_sample_status": "AWAITING_COLLECTION",
        "commission": "100",
        "effective_end_time": "1731020040687",
        "effective_start_time": "1731019880391",
        "creator": {
          "nick_name": "Test_Creator_E",
          "avatar_url": "https://...",
          "follower_num": 19,
          "user_name": "us_lxq6213",
          "creator_open_id": "uACafQ..."
        }
      }
    ]
  }
}
```

## 6. Error Handling
* **Code `36009003`**: Internal error. Retry request. Contact support if error persist.

## 7. Pitfalls & Best Practices

### Signature Generation Sequence
To sign the request, follow these steps:
1. Extract all query parameters except `sign`.
2. Sort parameters alphabetically by key.
3. Concatenate sorted parameters as `keyvalue` pairs without separators.
4. Prepend the API path to the concatenated string.
5. Sign the resulting string using HMAC-SHA256 with your app secret.

*Resume caveman style:*

* Token expire. Refresh token before call.
* Page size limit 50. Use `page_token` for next page.

## 8. Code Example

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/affiliate_partner/202508/campaigns/CAMP123/products/PROD456/performance?timestamp=1623812664&category_asset_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&page_size=10&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c' \
  -H 'content-type: application/json' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /affiliate_partner/202508/campaigns/{campaign_id}/products/{product_id}/performance`*
