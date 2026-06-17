# TikTok Shop API: Creator Search Open Collaboration Product

# Creator Search Open Collaboration Product API

## 1. Overview
Search open collaboration products on TikTok Shop Affiliate Marketplace. Use to find affiliate items for creators.

## 2. Endpoint
* **Method**: `POST`
* **URL**: `https://open-api.tiktokglobalshop.com/affiliate_creator/202405/open_collaborations/products/search`

## 3. Headers & Auth
* `content-type`: `application/json`
* `x-tts-access-token`: Creator access token (requires `user_type = 1`).

## 4. Parameters

### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app identifier. |
| `sign` | string | Yes | Request signature. |
| `timestamp` | number | Yes | Unix timestamp (UTC). |
| `page_size` | number | Yes | Items per page. Range: 1-20. |
| `page_token` | string | No | Pagination offset token. Empty for first request. |
| `sort_field` | string | No | Sort field: `commission_rate`, `product_sales_price`, `commission`, `units_sold`. |
| `sort_order` | string | No | Sort direction: `ASC` (default), `DESC`. |

### Body Parameters (JSON)
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title_keywords` | array[string] | No | Product keywords. Max 20 items. Max 255 chars per item. Loose match. |
| `sales_price_range` | object | No | Price filter. Contains `amount_ge` (min price) and `amount_lt` (max price). |
| `category` | object | No | Category filter. Contains `id` (string). |
| `commission_rate_range`| object | No | Rate filter. Contains `rate_ge` (min rate) and `rate_lt` (max rate). |

## 5. Response Structure
Returns JSON object.

* `code` (number): Success (0) or error code.
* `message` (string): Status message or error details.
* `request_id` (string): Log identifier.
* `data` (object): Contains `products` array.
  * `products` (array): Product details (shop name, ID, inventory status, units sold, title, region, image, link, price, categories).

## 6. Error Handling
Check `code` field in response. 
* `code == 0`: Success.
* `code != 0`: Failure. Read `message` for error details. Log `request_id` for debugging.

## 7. Pitfalls & Best Practices
* **Page Size Limit**: Do not exceed `page_size = 20`. Request fails if higher.
* **Pagination**: Save `page_token` from response. Pass to next request for next page.
* **Keyword Limits**: Keep `title_keywords` under 20 items. Keep each keyword under 255 characters.
* **Signature**: Generate `sign` using official algorithm before request.

## 8. Example Request

```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/affiliate_creator/202405/open_collaborations/products/search?page_size=20&sort_field=commission_rate&sort_order=DESC&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&page_token=b2Zmc2V0PTAK' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "title_keywords": [
    "Men",
    "Fashion",
    " Sports Short"
  ],
  "sales_price_range": {
    "amount_ge": "12.44",
    "amount_lt": "100"
  },
  "category": {
    "id": "341234"
  },
  "commission_rate_range": {
    "rate_ge": 100,
    "rate_lt": 8000
  }
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_creator/202405/open_collaborations/products/search`*
