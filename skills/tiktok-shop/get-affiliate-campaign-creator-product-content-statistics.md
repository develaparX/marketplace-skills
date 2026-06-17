# TikTok Shop API: Get Affiliate Campaign Creator Product Content Statistics

# Implementation Guide: Creator Product Content Statistics API

## 1. Purpose
API gets creator video stats. Use to track views, likes, comments, sales from creator posts.

## 2. Endpoint
* **Method**: `GET`
* **Path**: `/affiliate_partner/202508/campaigns/{campaign_id}/products/{product_id}/creator/{creator_temp_id}/content/statistics`
* **Base URL**: `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
* `x-tts-access-token` (string, required): Partner access token.
* `content-type` (string, required): Must be `application/json`.

## 4. Parameters

### Path Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `campaign_id` | string | Yes | Campaign identifier. |
| `product_id` | string | Yes | Product identifier. |
| `creator_temp_id` | string | Yes | Creator Open ID. |

### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Request signature. |
| `timestamp` | number | Yes | Unix timestamp (UTC). |
| `affiliate_product_id` | string | Yes | Affiliate product identifier. |
| `category_asset_cipher` | string | Yes | Partner identifier. |
| `content_type` | string | No | Content type filter. `1` (VIDEO) or `2` (LIVE_ROOM). |

## 5. Response Structure
Returns JSON object.

### Root Fields
* `code` (number): Status code. `0` means success.
* `message` (string): Status message.
* `request_id` (string): Log identifier.
* `data` (object): Statistics payload.

### Data Fields (`data.creator_content_statistics` Array)
* `content_type` (string): Content type (e.g., `VIDEO`).
* `cover_img_url` (string): Video cover image URL.
* `source_url` (string): Source video URL.
* `view_count` (string): Total views.
* `like_count` (string): Total likes.
* `comment_num` (string): Total comments.
* `paid_order_num` (string): Total orders generated.
* `paid_amount` (string): Total revenue generated.
* `linked_tiktok_video` (string): Linked TikTok video URL.
* `published_date` (string): Publish date (YYYY-MM-DD).
* `content_end_date` (string): End date (YYYY-MM-DD).

## 6. Error Handling
* `16032001`: Creator and Seller region mismatch. Check account regions.
* `36009003`: Internal error. Retry request.

## 7. Pitfalls & Best Practices
* **Value Mismatch**: API description lists `1` or `2` for `content_type` query parameter, but example uses string `VIDEO`. Support both formats.
* **Signature Generation**: Sort all query parameters alphabetically before generating signature.
* **Numeric Strings**: Metrics like `view_count` and `paid_amount` return as strings. Convert to numbers in application logic.

## 8. Code Example

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/affiliate_partner/202508/campaigns/123/products/123/creator/uACafQAAAABmUU2qon4R0vUYvUVS3QC6CICP2m5A2-wd77j8R9G0yg/content/statistics?content_type=VIDEO&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&category_asset_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&affiliate_product_id=123456789' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /affiliate_partner/202508/campaigns/{campaign_id}/products/{product_id}/creator/{creator_temp_id}/content/statistics`*
