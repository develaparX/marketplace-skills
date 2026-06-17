# TikTok Shop API: Get Brands

# Get Brands API Implementation Guide

## 1. Purpose
Retrieve shop brands. Use to list built-in and custom brands. Required for product creation and category mapping.

## 2. Endpoint
* **Method**: `GET`
* **Path**: `/product/202309/brands`
* **Base URL**: `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token. Required.

## 4. Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Request signature. |
| `timestamp` | number | Yes | Unix timestamp UTC. |
| `page_size` | number | Yes | Results per page. Range: `[1-100]`. |
| `shop_cipher` | string | Yes | Shop cipher for cross-border. |
| `category_id` | string | No | Filter by category ID. |
| `is_authorized` | boolean | No | Filter by authorization. `1` = authorized, `0` = all. |
| `brand_name` | string | No | Filter by prefix. |
| `page_token` | string | No | Token for next page. |
| `category_version` | string | No | Category tree version (`v1` or `v2`). |

## 5. Response Structure
Returns JSON object.

```json
{
  "code": 0,
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7",
  "data": {
    "brands": [
      {
        "id": "7082427311584347905",
        "name": "Teas",
        "authorized_status": "AUTHORIZED",
        "is_t1_brand": true,
        "brand_status": "AVAILABLE"
      }
    ],
    "total_count": 10000,
    "next_page_token": "b2Zmc2V0PTAK"
  }
}
```

## 6. Error Codes

| Code | Description | Action |
| :--- | :--- | :--- |
| `12019108` | page number is invalid | Check page number format. |
| `12019109` | page size is invalid | Set `page_size` between 1 and 100. |
| `12019123` | product of pageSize and pageNumber exceeds maximum limit | Reduce page size or page number. |
| `12019124` | pageSize and pageNumber need to be used together | Provide both parameters. |
| `12052023` | Category does not exist | Verify `category_id`. |
| `12052217` | All region shops must use V2 categories | Set `category_version` to `v2`. |
| `12052230` | Category version and categoryID are not matched | Align version with category ID. |
| `12052700` | The seller is inactive | Check seller account status. |
| `12052704` | seller id not exist | Verify seller credentials. |
| `36009003` | Internal error | Retry request. Contact support if error persists. |

## 7. Pitfalls & Best Practices
* **Category Version**: Cross-border shops must use `v2` categories. Failure causes error `12052217`.
* **Pagination**: Use `next_page_token` from response for subsequent requests. Pass token to `page_token` parameter.
* **Caching**: Brand data changes rarely. Cache results to avoid rate limits.

## 8. Code Example

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/product/202309/brands?is_authorized=false&category_version=v1&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&category_id=600006&brand_name=Teas&page_size=100&page_token=b2Zmc2V0PTAK' \
  -H 'content-type: application/json' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /product/202309/brands`*
