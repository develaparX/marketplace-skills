# TikTok Shop API: Query Target Collaboration Detail

# Query Target Collaboration Detail API Implementation Guide

## 1. Purpose
Seller retrieve target collaboration details. Use to check status, contact info, creator counts, or products.

## 2. Endpoint
*   **Method**: `GET`
*   **URL**: `https://open-api.tiktokglobalshop.com/affiliate_seller/202508/target_collaborations/{target_collaboration_id}`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token. Get via token API (use `user_type = 0`).

## 4. Parameters

### Path Parameters
*   `target_collaboration_id` (string, required): Target collaboration ID.

### Query Parameters
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Request signature. Generate via platform algorithm.
*   `timestamp` (number, required): Unix timestamp (UTC).
*   `shop_cipher` (string, required): Shop identifier. Get via Get Authorization Shop API.

## 5. Response Structure
Returns JSON object:
*   `code` (number): Status code. `0` means success.
*   `message` (string): Error or success message.
*   `request_id` (string): Log ID for debugging.
*   `data` (object): Collaboration details.
    *   `target_collaboration` (object):
        *   `id` (string): Collaboration ID.
        *   `name` (string): Collaboration name.
        *   `message` (string): Invitation message.
        *   `seller_contact_info` (object): Email, phone, whatsapp, telegram, line.
        *   `start_time` (number): Start timestamp.
        *   `end_time` (number): End timestamp.
        *   `update_time` (number): Last update timestamp.
        *   `creator_invited_count` (number): Total invited creators.
        *   `showcase_creator_count` (number): Creators with showcase.
        *   `content_creator_count` (number): Creators with content.
        *   `product_count` (number): Total products.
        *   `free_sample_rule` (object): Sample rules.

## 6. Error Handling
*   `50001700`: Seller cannot access collaboration. Check token and shop_cipher match collaboration owner.
*   `36009003`: Internal error. Retry request. Contact support if error persists.

## 7. Pitfalls & Best Practices
*   **Wrong shop_cipher**: Causes empty or wrong response. Get fresh cipher via Get Authorization Shop API.
*   **Signature mismatch**: Signature fail. Generate signature using exact query params order.
*   **Timestamp drift**: Server reject request. Sync server clock with NTP.

## 8. Code Example

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/affiliate_seller/202508/target_collaborations/1234?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /affiliate_seller/202508/target_collaborations/{target_collaboration_id}`*
