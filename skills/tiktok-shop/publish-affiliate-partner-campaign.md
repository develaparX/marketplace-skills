# TikTok Shop API: Publish Affiliate Partner Campaign

# Publish Affiliate Partner Campaign API

## 1. Overview
API publish Affiliate Partner campaign. Seller see campaign after publish. Use after create or edit campaign.

## 2. Endpoint & Method
*   **Method**: `POST`
*   **URL**: `https://open-api.tiktokglobalshop.com/affiliate_partner/202405/campaigns/{campaign_id}/publish`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Partner access token. Require `user_type = 3`.

## 4. Parameters

### Path Parameter
*   `campaign_id` (string, required): Campaign identifier.

### Query Parameters
*   `category_asset_cipher` (string, required): Partner identifier. Get via [Get Authorized Category Assets API](https://partner.tiktokshop.com/docv2/page/666012dd609d4402cc3be995).
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Signature from gen algorithm.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).

### Request Body
*   Empty JSON object `{}`.

## 5. Response Structure
*   `code` (number): Status code. `0` mean success.
*   `message` (string): Error or success message.
*   `request_id` (string): Request log ID.
*   `data` (object): Return info. Empty on success.

## 6. Error Handling
Handle these codes:
*   `16032001`: Region mismatch between creator and seller.
*   `16032005`: Campaign not found. Check `campaign_id`.
*   `16032007`: Permission denied. Check token.
*   `16032008`: Operation denied.
*   `16032011`: Max online campaign limit reached. Close old campaigns.

## 7. Pitfalls & Best Practices
*   **Region Mismatch**: Creator and seller must share region. Check region before publish.
*   **Token Type**: Use partner token (`user_type = 3`). Seller token fail.
*   **Timestamp**: Use UTC. Clock drift cause signature failure.
*   **Empty Body**: Send `{}`. Do not omit body.

## 8. Code Example

```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/affiliate_partner/202405/campaigns/7373988288167036678/publish?category_asset_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&app_key=38abcd' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_partner/202405/campaigns/{campaign_id}/publish`*
