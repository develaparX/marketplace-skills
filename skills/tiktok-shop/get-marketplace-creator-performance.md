# TikTok Shop API: Get Marketplace Creator Performance

# Get Marketplace Creator Performance API Implementation Guide

## 1. Purpose & Use Case
API get creator marketplace info, performance metrics last 30 days. Use evaluate creator before collaborate.

## 2. Endpoint & Method
*   **Method:** `GET`
*   **Path:** `/affiliate_seller/202508/marketplace_creators/{creator_user_id}`
*   **Base URL:** `https://open-api.tiktokglobalshop.com`

## 3. Headers & Authentication
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (user_type = 0). Get from token API.

## 4. Parameters

### Path Parameter
*   `creator_user_id` (string, required): Creator Open ID.

### Query Parameters
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Signature from gen algorithm.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
*   `shop_cipher` (string, required): Shop identifier.

## 5. Response Structure
Response contain outer wrapper and `data` object.

### Outer Wrapper
*   `code` (number): Status code. `0` mean success.
*   `message` (string): Error/success message.
*   `request_id` (string): Log ID for debug.
*   `data` (object): Payload.

### Data Object (`data.creator`)
*   `username` (string): Creator username.
*   `nickname` (string): Creator nickname.
*   `avatar` (object): Contains `url` (string).
*   `selection_region` (string): Creator region.
*   `bio_description` (string): Bio text.
*   `follower_count` (number): Total followers.
*   `profile_tt_uri` (string): TikTok app deep link.
*   `category_ids` (array of strings): Creator categories.
*   `top_collaborated_brand_ids` (array of strings): Top brand IDs.
*   `brand_collaboration_count` (number): Collaboration count.
*   `units_sold` (number): Units sold last 30 days.
*   `units_sold_range` (object): Range data.

## 6. Error Handling
Handle specific error codes:

| Code | Description | Action |
| :--- | :--- | :--- |
| `16032012` | Only affiliate partner cipher can access | Check API permissions. |
| `16901005` | Creator lacks e-commerce permission | Skip creator. |
| `16901006` | Region mismatch | Match seller region with creator region. |
| `16901007` | Insufficient permission for profile | Check seller authorization. |
| `16901008` | Creator deactivated or lacks permission | Skip creator. |
| `16901009` | Cannot access TikTok Linkshare creator | Skip creator. |
| `36009002` | Rate limit exceeded | Implement backoff. |
| `45101004` | Daily quota reached (10000/day) | Cache data, stop requests. |
| `36009003` | Internal error | Retry request. |
| `98001004` | Invalid parameter | Check query params. |

## 7. Pitfalls & Best Practices
*   **Region Check:** Verify creator `selection_region` matches seller region. Mismatch cause error `16901006`.
*   **Quota Limit:** Cache creator data. Daily limit 10000 requests. Prevent error `45101004`.
*   **Signature:** Generate signature using exact query params. Sort keys alphabetically before hash.

## 8. Code Example

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/affiliate_seller/202508/marketplace_creators/uACafQAAAABmUU2qon4R0vUYvUVS3QC6CICP2m5A2-wd77j8R9G0yg?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /affiliate_seller/202508/marketplace_creators/{creator_user_id}`*
