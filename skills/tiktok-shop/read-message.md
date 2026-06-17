# TikTok Shop API: Read Message

# Read Message API Implementation Guide

## 1. Purpose
API mark buyer message read. Call before reply. Prevent unread status mismatch.

## 2. Endpoint
* **Method**: `POST`
* **URL**: `https://open-api.tiktokglobalshop.com/customer_service/202309/conversations/{conversation_id}/messages/read`

## 3. Headers
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token (user_type = 0).

## 4. Parameters

### Path Parameter
* `conversation_id` (string, required): Target conversation identifier.

### Query Parameters
* `app_key` (string, required): Unique app key.
* `sign` (string, required): Signature from gen algorithm.
* `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
* `shop_cipher` (string, required): Shop identifier. Get via Get Authorization Shop API.

## 5. Response Structure
```json
{
  "code": 0,
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7",
  "data": {}
}
```
* `code` (number): Status code. `0` means success.
* `message` (string): Error details or success status.
* `request_id` (string): Log identifier for debug.
* `data` (object): Empty on success.

## 6. Error Handling
* **`45101003`**: Record not found. Check `conversation_id` and parameters.
* **`45101004`**: Quota reached (10000 requests/day). Stop requests until tomorrow.
* **`36009003`**: Internal error. Retry request. Contact support if fail persist.

## 7. Pitfalls & Best Practices
* **Shop Cipher**: Pass correct `shop_cipher`. Wrong cipher return bad response.
* **Timing**: Call API before send reply. Keep message status sync.
* **Signature**: Generate `sign` using correct algorithm. Invalid signature block request.

## 8. Code Example
```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/customer_service/202309/conversations/{conversation_id}/messages/read?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /customer_service/202309/conversations/{conversation_id}/messages/read`*
