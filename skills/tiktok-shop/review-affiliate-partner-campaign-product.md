# TikTok Shop API: Review Affiliate Partner Campaign Product

# Review Affiliate Partner Campaign Product API

## Overview
Partner review seller product submissions. Use when seller submit product to campaign.

## Endpoint
`POST https://open-api.tiktokglobalshop.com/affiliate_partner/202405/campaigns/{campaign_id}/products/{product_id}/review`

## Headers
*   `content-type`: `application/json`
*   `x-tts-access-token`: Partner access token (user_type = 3).

## Parameters

### Path
*   `campaign_id` (string, required): Campaign identifier.
*   `product_id` (string, required): Product identifier.

### Query
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Signature from gen algorithm.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
*   `category_asset_cipher` (string, required): Partner identifier from Get Authorized Category Assets API.

### Body (JSON)
*   `review_result` (string, required): Decision. Allowed: `APPROVE`, `REJECT`, `REJECT_FOREVER`.
*   `reject_reasons` (array of strings, optional): Reason for rejection. Use if `review_result` is `REJECT` or `REJECT_FOREVER`. Allowed: `COMMISSION_TOO_LOW`, `PRODUCT_HARD_TO_PROMOTE`, `PRODUCT_TOO_EXPENSIVE`, `NO_SUITABLE_CREATOR`.

## Response
```json
{
  "code": 0,
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7",
  "data": {}
}
```
*   `code` (number): Status code. 0 is success.
*   `message` (string): Status message.
*   `request_id` (string): Request log ID.
*   `data` (object): Return info.

## Error Codes
*   `16032001`: Invalid parameter Creator and Seller, please ensure Region mismatch.
*   `16032005`: Campaign not found.
*   `16032007`: Permission denied.
*   `16032009`: Product operation denied, please ensure campaign is under online status.

## Pitfalls & Best Practices
*   Campaign offline blocks review. Ensure campaign online status. Check code `16032009`.
*   Region mismatch blocks review. Ensure creator and seller regions match. Check code `16032001`.
*   Rejection needs reason. Send `reject_reasons` when reject.

## Code Example
```bash
curl -X POST \
  'https://open-api.tiktokglobalshop.com/affiliate_partner/202405/campaigns/7373988288167036678/products/1730064726487763199/review?sign=5361235029d141222525e303d742f9e38aea052d10896d3

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_partner/202405/campaigns/{campaign_id}/products/{product_id}/review`*
