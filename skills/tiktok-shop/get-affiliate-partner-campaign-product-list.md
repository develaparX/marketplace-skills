# TikTok Shop API: Get Affiliate Partner Campaign Product List

# Affiliate Partner Campaign Product List API

## Purpose
Get seller products in campaign. Syncs inventory. Checks review status.

## Endpoint
`GET https://open-api.tiktokglobalshop.com/affiliate_partner/202405/campaigns/{campaign_id}/products`

## Headers
*   `content-type`: `application/json`
*   `x-tts-access-token`: Partner access token (user_type = 3)

## Parameters

### Path Parameter
*   `campaign_id` (string, required): Campaign ID.

### Query Parameters
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Request signature.
*   `timestamp` (number, required): Unix timestamp (UTC).
*   `category_asset_cipher` (string, required): Partner identifier

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /affiliate_partner/202405/campaigns/{campaign_id}/products`*
