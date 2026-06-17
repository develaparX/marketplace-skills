# TikTok Shop API: Remove Target Collaboration

# Remove Target Collaboration API Guide

## 1. Overview
API delete affiliate target collaboration. Use when seller end collaboration with creator.

## 2. Endpoint & Method
*   **Method:** `DELETE`
*   **Path:** `/affiliate_seller/202409/target_collaborations/{target_collaboration_id}`
*   **Base URL:** `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token.

## 4. Parameters

### Path Parameter
*   `target_collaboration_id` (string, required): Unique ID of target collaboration.

### Query Parameters
*   `app_key` (string, required): Unique key for app.
*   `sign` (string, required): Signature from gen algorithm.
*   `timestamp` (number, required): Unix timestamp GMT.
*   `shop_cipher` (string, required): Shop cipher.

## 5. Response Structure
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Request log ID.
*   `data` (object): Return data. Empty on success.

## 6. Error Handling
*   `600001001`: Seller call too fast. Rate limit hit. Wait before retry.
*   `600001002`: Lock failed. Concurrent request conflict. Retry after delay.

## 7. Pitfalls & Best Practices
*   **Sign error:** Generate `sign` using exact query params. Wrong order cause failure.
*   **Lock error:** Do not send parallel requests for same collaboration.
*   **Rate limit:** Implement exponential backoff for error `600001001`.

## 8. Code Example

```bash
curl -X DELETE 'https://open-api.tiktokglobalshop.com/affiliate_seller/202409/target_collaborations/7890786712312312?shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json' \
  -d '{}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `DELETE /affiliate_seller/202409/target_collaborations/{target_collaboration_id}`*
