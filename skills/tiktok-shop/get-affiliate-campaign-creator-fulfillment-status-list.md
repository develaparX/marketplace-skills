# TikTok Shop API: Get Affiliate Campaign Creator Fulfillment Status List

# Guide: Campaign Creator Fulfillment Status API

## 1. Purpose
Get creator performance data for campaign products in showcase. Use to track sales, stock, commissions.

## 2. Endpoint
* **Method**: `GET`
* **Path**: `/affiliate_partner/202501/campaigns/{campaign_id}/products/performance`
* **Base URL**: `https://open-api.tiktokglobalshop.com`

## 3. Headers
* `content-type`: `application/json`
* `x-tts-access-token`: Partner access token (from Get Access Token, user_type = 3).

## 4. Parameters

### Path Parameters
* `campaign_id` (string, required): Campaign unique ID.

### Query Parameters
* `app_key` (string, required): Unique app key.
* `sign` (string, required): Signature from gen algorithm.
* `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
* `page_size` (number, optional): Results per page. Range: 1-50.
* `page_token` (string, optional): Token for next page.

## 5. Response Structure
* `code` (number): Status code. `0` is success.
* `message` (string): Status message.
* `request_id` (string): Request log ID.
* `data` (object):
  * `total_count` (number): Total results.
  * `campaign_product_statistics` (array):
    * `data_update_time` (string): Update time (Unix ms).
    * `creator_sales_num` (number): Sales count.
    * `collaborated_creators_num` (number): Collaborated creators count.
    * `promoted_creator_num` (number): Promoted creators count.
    * `sample_requested_creator_num` (number): Sample requests count.
    * `campaign_product_detail` (object):
      * `product_id` (string): Product ID.
      * `product_status` (string): Status (e.g., `PRODUCT_UNSPECIFIED`).
      * `product_name` (string): Product name.
      * `product_stock_count` (string): Stock count.
      * `total_commission_percent` (string): Total commission percent (multiplied by 100).
      * `creator_commission_percent` (string): Creator commission percent (multiplied by 100).
      * `partner_commission_percent` (string): Partner commission percent (multiplied by 100).
      * `plan_commission_percent` (string): Plan commission percent (multiplied by 100).
      * `product_price` (object):
        * `min_price` (string): Minimum price.

## 6. Error Handling
* Check `code` field. If not `0`, request failed.
* Save `request_id` for debugging.

## 7. Pitfalls & Best Practices
* **Signature**: Generate `sign` using sorted query parameters.
* **Timestamp**: Use current UTC epoch seconds. Request fails if timestamp expires.
* **Pagination**: Use `page_token` from previous response to get next page. Do not calculate offsets manually.
* **Commissions**: Percentages multiplied by 100 (e.g., `5000` means `50.00%`).

## 8. Code Example

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/affiliate_partner/202501/campaigns/1234567890/products/performance?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&page_size=10&page_token=b2Zmc2V0PTAK' \
  -H 'content-type: application/json' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /affiliate_partner/202501/campaigns/{campaign_id}/products/performance`*
