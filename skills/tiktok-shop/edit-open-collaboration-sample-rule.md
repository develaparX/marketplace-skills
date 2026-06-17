# TikTok Shop API: Edit Open Collaboration Sample Rule

# Edit Open Collaboration Sample Rule

## 1. Overview
Manage sample rules in open collaborations. Use to create, update, or deactivate rules (valid time, creator thresholds).

## 2. Endpoint
* **Method:** `POST`
* **Path:** `https://open-api.tiktokglobalshop.com/affiliate_seller/202410/open_collaborations/sample_rules`

## 3. Headers & Auth
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token (from Get Access Token, user_type = 0)

## 4. Parameters

### Query Parameters
* `app_key` (string, required): Unique app key.
* `sign` (string, required): Signature from gen algorithm.
* `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
* `shop_cipher` (string, required): Shop identifier.

### Request Body
* `product_id` (string, required): Product ID for rule.
* `sample_rule` (object, optional): Rule details.
  * `sample_quota` (number): Sample limit.
  * `is_sample_time_unlimited` (boolean): Time limit flag.
  * `start_time` (number): Start timestamp.
  * `end_time` (number): End timestamp.
  * `thresholds` (object): Creator requirements.
    * `minimum_follower_count` (number): Min followers.
    * `minimum_gmv` (number): Min GMV.
    * `avg_ec_video_views` (number): Min average views.
    * `category_ids` (array of strings): Allowed categories.
    * `predicted_fulfillment_rank` (string): Fulfillment rank (e.g., "LOW").
  * `activate_status` (string): Status (e.g., "ACTIVATE").

## 5. Response Structure
* `code` (number): Status code (0 = success).
* `message` (string): Status message.
* `request_id` (string): Request log ID.
* `data` (object): Return data.

## 6. Error Handling
Check `code` field. If `code` not `0`, request failed. Read `message` for error details.

## 7. Pitfalls & Best Practices
* **Overwrite risk:** One rule per product. New API call overwrites previous rule.
* **Time format:** Use Unix timestamp GMT (UTC+00:00).

## 8. Code Example
```bash
curl -X POST \
  'https://open-api.tiktokglobalshop.com/affiliate_seller/202410/open_collaborations/sample_rules?timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json' \
  -d '{
    "product_id": "123456",
    "sample_rule": {
      "sample_quota": 100,
      "is_sample_time_unlimited": true,
      "start_time": 1728552553,
      "end_time": 1728552553,
      "thresholds": {
        "minimum_follower_count": 2000,
        "minimum_gmv": 1000,
        "avg_ec_video_views": 5,
        "category_ids": [


---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_seller/202410/open_collaborations/sample_rules`*
