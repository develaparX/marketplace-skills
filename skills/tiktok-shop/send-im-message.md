# TikTok Shop API: Send IM Message

# Implementation Guide: Send IM Message API

## 1. Purpose
API sends messages to creators. Use for affiliate outreach, collaboration setup, sample negotiation.

## 2. Endpoint
*   **Method**: `POST`
*   **URL**: `https://open-api.tiktokglobalshop.com/affiliate_seller/202412/conversations/{conversation_id}/messages`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token. Get from "Get Access Token" flow (where `user_type` = 0).

## 4. Parameters

### Path Parameters
*   `conversation_id` (string, required): Target conversation identifier.

### Query Parameters
*   `app_key` (string, required): Unique application key.
*   `sign` (string, required): Request signature. Generate using platform algorithm.
*   `timestamp` (number, required): Unix timestamp (UTC).
*   `shop_cipher` (string, required): Shop identifier. Required for cross-border shop routing.

### Body Parameters (JSON)
*   `msg_type` (string, required): Message format. Allowed: `TEXT`, `PRODUCT_CARD`, `TARGET_COLLABORATION_CARD`, `FREE_SAMPLE_CARD`, `IMAGE`.
*   `content` (string, required): Message payload. Must be JSON serialized string.

## 5. Response Structure
JSON response contains:
*   `code` (number): Status code. `0` indicates success.
*   `message` (string): Status or error description.
*   `request_id` (string): Log identifier for debugging.
*   `data` (object): Contains `message_id` (string) on success.

## 6. Error Handling
Check `code` field. Handle specific errors:

| Code | Description | Action |
| :--- | :--- | :--- |
| `16030100` | Shop reached IM quota with creator. | Stop sending to this creator. |
| `16030101` | Seller account abnormal or GMV too low. | Check seller status/GMV level. |
| `16032001` | Region mismatch between creator and seller. | Verify target creator region. |
| `45101004` | Daily query quota reached (10000/day). | Pause requests. Retry tomorrow. |
| `36009003` | Internal error. | Retry request. Contact support if persists. |

## 7. Pitfalls & Best Practices
*   **Double Serialization**: `content` field requires escaped JSON string, not raw JSON object.
*   **Shop Cipher**: Incorrect `shop_cipher` causes failure or empty responses for cross-border shops.
*   **Signature**: Include all query parameters in signature generation.

## 8. Code Example

```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/affiliate_seller/202412/conversations/1234/messages?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "msg_type": "TEXT",
  "content": "{\"content\": \"simple text message\"}"
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_seller/202412/conversations/{conversation_id}/messages`*
