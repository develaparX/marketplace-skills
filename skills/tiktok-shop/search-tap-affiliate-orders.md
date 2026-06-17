# TikTok Shop API: Search Tap Affiliate Orders

# Implement Search Tap Affiliate Orders API

## Purpose
Retrieve affiliate orders. Track conversions. Use when TAP partner needs order data.

## Endpoint
* Method: `POST`
* Path: `/affiliate_partner/202603/orders/search`
* Base URL: `https://open-api.tiktokglobalshop.com`

## Headers & Auth
* `content-type`: `application/json`
* `x-tts-access-token`: Partner access token (user_type = 3).

## Parameters

### Query Parameters
* `category_asset_cipher` (string, required): Partner identifier. Get from Get Authorized Category Assets API.
* `app_key` (string, required): Unique app key.
* `sign` (string, required): Signature.
* `timestamp` (number, required): Unix timestamp UTC.
* `page_size` (number, required): Range 1-100. Default 20.
* `page_token` (string, optional): Next page token.

### Body Parameters (JSON)
* `create_time_ge` (number, optional): Start time. Unix timestamp. Max 3 months range.
* `create_time_lt` (number, optional): End time. Unix timestamp.
* `campaign_id` (string, optional): Filter by campaign ID.

## Response Structure
* `code` (number): Status code. `0` means success.
* `message` (string): Error details.
* `request_id` (string): Log identifier.
* `data` (object): Order payload.
  * `sku_orders` (array): List of orders.
    * `id` (string): Order ID.
    * `create_time` (number): Order creation timestamp.
    * `delivery_time` (number): Delivery timestamp.
    * `settle_status` (string): Settlement status (e.g., `SETTLED`).
    * `sku_id` (string): SKU ID.
    * `campaign_id` (string): Campaign ID.
    * `creator_username` (string): Creator handle.
    * `product_name` (string): Product title.
    * `product_id` (string): Product ID.
    * `price` (object): Price details.
      * `amount` (string): Cost.
      * `currency` (string): Currency code.
    * `quantity` (number): Item count.
    * `content_type` (string): Content format (e.g., `VIDEO`).
    * `content_id` (string): Content ID.
    * `creator_standard_commission_rate` (number): Commission rate.

## Error Handling
* Code `36009003`: Internal error. Action: Retry request. Contact support if fail persist.

## Pitfalls & Best Practices
* Time range limit: `create_time_ge` to present must not exceed 3 months. Query fail if range too wide.
* Pagination: Use `page_token` from response for next page. Do not skip.
* Signature: Generate `sign` using all query parameters. Incorrect order cause auth failure.

## Code Example

```bash
curl -X POST \
'https://open-api.tiktokglobalshop.com/affiliate_partner/202603/orders/search?category_asset_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&page_token=6AsPQsUMvH3RkchNUPPh22NROHkE0D8pmq/N5M1kHYcZmtRyv9aVrNv65W7Q6tFA+7D1ud64MPNz5OaT&page_size=20&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_partner/202603/orders/search`*
