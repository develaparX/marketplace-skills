# TikTok Shop API: Generate Target Collaboration Link

# Implement: Generate Target Collaboration Link API

## 1. Purpose & Usage
Seller generate link. Share with creator. Creator review, accept collaboration. Use after create target collaboration.

## 2. Endpoint & Method
*   **Method:** `POST`
*   **URL:** `https://open-api.tiktokglobalshop.com/affiliate_seller/202509/target_collaboration/{target_collaboration_id}/link`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token. Get from "Get Access Token" (user_type = 0).

## 4. Parameters

### Path Parameter
*   `target_collaboration_id` (string, required): Target collaboration ID.

### Query Parameters
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Signature from gen algorithm.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
*   `shop_cipher` (string, required): Shop cipher for cross-border shops.

## 5. Response Structure
*   `code` (number): Status code. `0` mean success.
*   `message` (string): Status message.
*   `request_id` (string): Request log ID.
*   `data` (object):
    *   `link` (string): Collaboration link.

## 6. Error Handling
Check `code` field. Non-zero mean fail. Log `request_id` for debug.

## 7. Pitfalls & Best Practices
*   **Token expire:** `x-tts-access-token` expire fast. Refresh token before call.
*   **Sign mismatch:** Calculate `sign` correct. Order query params alphabetical before hash.
*   **Empty body:** Send empty JSON object `{}` in body. Do not send null.

## 8. Code Example

```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/affiliate_seller/202509/target_collaboration/123/link?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_seller/202509/target_collaboration/{target_collaboration_id}/link`*
