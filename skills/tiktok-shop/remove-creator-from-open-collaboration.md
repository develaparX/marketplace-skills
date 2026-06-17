# TikTok Shop API: Remove Creator From Open Collaboration

# API Integration Guide: Remove Creator From Open Collaboration

## 1. Overview
API removes creator from open collaboration. Use when seller stops creator from promoting specific product in open campaign.

## 2. Endpoint
*   **Method:** `POST`
*   **URL:** `https://open-api.tiktokglobalshop.com/affiliate_seller/202508/open_collaborations/{open_collaboration_id}/remove_creator`

## 3. Headers & Authentication
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token.
*   Query parameters required for signature verification: `app_key`, `sign`, `timestamp`, `shop_cipher`.

## 4. Parameters

### Path Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `open_collaboration_id` | string | Yes | Target collaboration ID. |

### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Request signature. |
| `timestamp` | number | Yes | Unix timestamp GMT (seconds). |
| `shop_cipher` | string | Yes | Shop cipher for cross-border shops. |

### Body Parameters (JSON)
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `creator_user_open_id` | string | Yes | Target creator open ID. |
| `product_id` | string | Yes | Target product identifier. |

## 5. Response Structure
```json
{
  "code": 0,
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7",
  "data": {}
}
```
*   `code`: Status indicator. `0` means success.
*   `message`: Status description.
*   `request_id`: Log identifier. Use for debugging.
*   `data`: Empty object on success.

## 6. Error Handling
*   Check `code` value. If `code` not `0`, request failed.
*   Log `request_id` and `message` for troubleshooting.
*   Retry request on network timeout. Do not retry on authorization errors (invalid `sign` or expired `x-tts-access-token`).

## 7. Pitfalls & Best Practices
*   **Signature Generation:** Include path parameters and query parameters in signature calculation.
*   **Timestamp Expiry:** Ensure system clock syncs with NTP. Out-of-sync timestamp causes signature failure.
*   **ID Matching:** Double check `creator_user_open_id` matches target creator. Wrong ID causes silent failure or incorrect removal.

## 8. Code Example (cURL)
```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/affiliate_seller/202508/open_collaborations/7890786712312312/remove_creator?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "creator_user_open_id": "uACafQAAAABmUU2qon4R0vUYvUVS3QC6CICP2m5A2-wd77j8R9G0yg",
  "product_id": "789078671231"
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_seller/202508/open_collaborations/{open_collaboration_id}/remove_creator`*
