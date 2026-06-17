# TikTok Shop API: Get Agent Settings

# Get Agent Settings API Implementation Guide

## 1. Overview
API check if agent accept buyer chat. Use before route chat to agent.

## 2. Endpoint
*   **Method**: `GET`
*   **Base URL**: `https://open-api.tiktokglobalshop.com`
*   **Path**: `/customer_service/202309/agents/settings`

## 3. Headers & Authentication
*   `content-type`: `application/json` (Required)
*   `x-tts-access-token`: Seller access token. Need `user_type = 0` (Required)

## 4. Query Parameters
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Signature from gen algorithm.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
*   `shop_cipher` (string, required): Shop identifier.

## 5. Response Structure
*   `code` (number): Status code.
*   `message` (string): Status message.
*   `request_id` (string): Request log ID.
*   `data` (object): Return data.
    *   `can_accept_chat` (boolean): Agent chat status.

## 6. Error Handling
*   `36009003`: Internal error. Retry request. If fail, contact support.

## 7. Pitfalls & Best Practices
*   **Token check**: Ensure `user_type` is `0` for token. Wrong type cause auth fail.
*   **Sign check**: Generate signature with exact query params. Wrong order break sign.
*   **Time check**: Timestamp must be UTC. Drift cause rejection.

## 8. Code Example

### Request
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/customer_service/202309/agents/settings?shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json'
```

### Response
```json
{
  "code": 0,
  "data": {
    "can_accept_chat": true
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /customer_service/202309/agents/settings`*
