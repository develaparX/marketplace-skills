# TikTok Shop API: Get Shop Video Performance List

# Shop Video Performance API Guide

## 1. Overview
API fetches shop video metrics. Use to track sales, views, creator performance.

## 2. Endpoint
* **Method**: `GET`
* **Path**: `/analytics/202605/shop_videos/performance`
* **Base URL**: `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token. Get from Get Access Token (user_type = 0).

## 4. Query Parameters
* `app_key` (string, required): Unique app key.
* `sign` (string, required): Signature from algorithm.
* `timestamp` (number, required): Unix timestamp UTC.
* `shop_cipher` (string, required): Shop identifier.
* `start_date_ge` (string, required): Start date (ISO 8601 YYYY-MM-DD). Inclusive. Shop timezone.
* `end_date_lt` (string, required): End date (ISO 8601 YYYY-MM-DD). Exclusive. Shop timezone.
* `page_size` (number, optional): Max 100. Default 10.
* `sort_field` (string, optional): Default `gmv`. Values: `gmv`, `gpm`, `avg_customers`, `sku_orders`, `items_sold`, `views`, `click_through_rate`.
* `sort_order` (string, optional): Default `DESC`. Values: `ASC`, `DESC`.
* `currency` (string, optional): Default `LOCAL`. Values: `USD`, `LOCAL`.
* `page_token` (string, optional): Token for next page.
* `account_type` (string, optional): Default `ALL`. Values: `ALL`, `OFFICIAL_ACCOUNTS`, `MARKETING_ACCOUNTS`, `AFFILIATE_ACCOUNTS`.

## 5. Response Fields
* `code` (number): Status code. `0` means success.
* `message` (string): Status message.
* `request_id` (string): Request log ID.
* `data` (object): Video list payload.
  * `videos` (array): Video objects.
    * `id` (string): Video ID.
    * `title` (string): Video title.
    * `username` (string): Creator username.
    * `creator` (object): Creator details.
      * `open_id` (string): Creator open ID.
      * `user_name` (string): Creator username.
      * `nick_name` (string): Creator nickname.
      * `author_type` (string): Creator type.
    * `video_post_time` (string): Post time.
    * `duration` (number): Duration in seconds.
    * `hash_tags` (array of strings): Hashtags.
    * `gmv` (object): GMV details.
      * `amount` (string): GMV amount.

## 6. Error Codes
* `28001022`: Invalid start or end time. Check ISO format.
* `36009003`: Internal error. Retry request. Contact support if fails.

## 7. Pitfalls & Best Practices
* **Timezones**: Dates use shop registered timezone. Check shop settings to avoid offset errors.
* **Date range**: `end_date_lt` exclusive. For full week, set start Monday, end next Monday.
* **Pagination**: Use `page_token` from response for next page. Do not hardcode page numbers.
* **Signature**: Generate `sign` using exact query params. Order matters.

## 8. Code Example

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/analytics/202605/shop_videos/performance?app_key=38abcd&timestamp=1623812664&page_size=10&sort_order=DESC&currency=USD&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&start_date_ge=2024-09-01&end_date_lt=2024-09-08&sort_field=gmv&page_token=cGFnZV9udW1iZXI9MQ==&account_type=ALL' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /analytics/202605/shop_videos/performance`*
