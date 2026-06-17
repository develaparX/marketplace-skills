# TikTok Shop API: Get Affiliate Partner Campaign Detail

# API Guide: Get Affiliate Partner Campaign Detail

## 1. Overview
API get affiliate campaign detail. Use to check campaign status, commission rate, target shops, contact info.

## 2. Endpoint & Method
* **Method**: `GET`
* **Path**: `/affiliate_partner/202405/campaigns/{campaign_id}`
* **Base URL**: `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
* `content-type`: `application/json`
* `x-tts-access-token`: Partner access token. Get from Get Access Token API. Require `user_type = 3`.

## 4. Parameters

### Path Parameter
* `campaign_id` (string, required): Campaign identifier.

### Query Parameters
* `app_key` (string, required): Unique app key.
* `sign` (string, required): Request signature. Generate via signature algorithm.
* `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
* `category_asset_cipher` (string, required): Partner identifier.

## 5. Response Structure
Response return JSON object:
* `code` (number): Status code. `0` mean success.
* `message` (string): Status message.
* `request_id` (string): Request log identifier.
* `data` (object): Campaign detail.
  * `id` (string): Campaign ID.
  * `name` (string): Campaign name.
  * `description` (string): Campaign description.
  * `status` (string): Campaign status (e.g., `READY`).
  * `region` (string): Region code (e.g., `US`).
  * `registration_start_time` (number): Registration start (Unix timestamp).
  * `registration_end_time` (number): Registration end (Unix timestamp).
  * `campaign_start_time` (number): Campaign start (Unix timestamp).
  * `campaign_end_time` (number): Campaign end (Unix timestamp).
  * `commission_rate` (number): Commission rate. Value multiplied by 100 (e.g., `1000` = 10%).
  * `contact_info` (object): Contact details (whatsapp, email, phone, zalo, viber, line).
  * `target_shops` (array): Target shops list.

## 6. Error Handling
* `16032001`: Region mismatch. Check Creator and Seller region.
* `16032005`: Campaign not found. Check `campaign_id`.
* `16032007`: Permission denied. Check token and app key.
* `36009003`: Internal error. Retry request.

## 7. Pitfalls & Best Practices
* **Commission Rate**: Value `1000` mean `10%`. Divide by 100 to get percent.
* **Timestamp**: Use current UTC timestamp. Old timestamp cause signature failure.
* **User Type**: Token must use `user_type = 3`. Other types fail.

## 8. Code Example

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/affiliate_partner/202405/campaigns/7373988288167036678?timestamp=1623812664&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&category_asset_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /affiliate_partner/202405/campaigns/{campaign_id}`*
