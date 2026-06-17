# TikTok Shop API: Generate Affiliate Partner Campaign Product Link

# Generate Affiliate Partner Campaign Product Link API Guide

## 1. Overview
API generates promotion link. Use when partner needs link for campaign product.

## 2. Endpoint
*   **Method**: `POST`
*   **Base URL**: `https://open-api.tiktokglobalshop.com`
*   **Path**: `/affiliate_partner/202405/campaigns/{campaign_id}/products/{product_id}/promotion_link/generate`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Partner access token (user_type = 3). Get from Get Access Token API.

## 4. Parameters

### Path Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `campaign_id` | string | Yes | Campaign ID |
| `product_id` | string | Yes | Product ID |

### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key |
| `sign` | string | Yes | Request signature |
| `timestamp` | number | Yes | Unix timestamp (UTC) |
| `category_asset_cipher` | string | Yes | Partner identifier. Get from Get Authorized Category Assets API |

### Body Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `creator_commission_rate` | number | Yes | Commission rate. Unit: hundredths of percent (0.01%). Must be <= seller total commission rate |

## 5. Response Structure
```json
{
  "code": 0,
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7",
  "data": {
    "product_promotion_link": "https://affiliate.tiktok.com/api/v1/share/AIxvOHlaJoKO"
  }
}
```

## 6. Error Handling
| Code | Description | Action |
| :--- | :--- | :--- |
| `16032001` | Region mismatch | Check Creator and Seller regions |
| `16032005` | Campaign not found | Verify `campaign_id` |
| `16032007` | Permission denied | Check token and app permissions |
| `16032008` | Operation denied | Check partner status |
| `16032009` | Campaign offline | Ensure campaign status is online |
| `16032010` | Campaign product not found | Verify `product_id` in campaign |
| `36009003` | Internal error | Retry request. Contact support if error persists |

## 7. Pitfalls & Best Practices
*   **Commission Math**: Rate uses hundredths of percent. Example: `1000` equals `10%`.
*   **Campaign Status**: Campaign must be online. Offline campaign causes error `16032009`.
*   **Signature**: Generate signature using correct algorithm. Invalid signature blocks request.

## 8. Code Example

```bash
curl -X POST \
  'https://open-api.tiktokglobalshop.com/affiliate_partner/202405/campaigns/7373988288167036678/products/1730064726487763199/promotion_link/generate?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&category_asset_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json' \
  -d '{
  "creator_commission_rate": 1000
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_partner/202405/campaigns/{campaign_id}/products/{product_id}/promotion_link/generate`*
