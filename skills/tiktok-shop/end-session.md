# TikTok Shop API: End Session

# API Implementation Guide: End Session

## 1. Overview
API ends active agent chat session. Use when agent resolves issue or customer closes chat.

## 2. Endpoint & Method
* **Method:** `POST`
* **Path:** `/customer_service/202605/conversations/{conversation_id}/sessions/{session_id}/end`
* **Base URL:** `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token. Get via Get Access Token API (user_type = 0).

## 4. Parameters

### Path Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `conversation_id` | string | Yes | Conversation identifier. |
| `session_id` | string | Yes | Session identifier. |

### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Signature. Generate via signature algorithm. |
| `timestamp` | number | Yes | Unix timestamp (UTC+00:00). |
| `shop_cipher` | string | Yes | Shop identifier. Get via Get Authorization Shop API. |

## 5. Response Structure
* `code` (number): Status code. `0` means success.
* `message` (string): Status description. Contains error details.
* `request_id` (string): Request identifier. Use for logs.
* `data` (object): Empty object on success.

## 6. Error Handling
* Check `code` value. If `code` not `0`, request failed.
* Read `message` field. Identify failure cause.
* Log `request_id`. Use for support tickets.

## 7. Pitfalls & Best Practices
* `shop_cipher` mismatch causes incorrect response. Verify cipher for cross-border shops.
* Signature generation requires correct parameter order. Sort query parameters before hashing.
* Empty JSON body required. Send `{}`. Do not omit body.

## 8. Code Example

```bash
curl -X POST \
  'https://open-api.tiktokglobalshop.com/customer_service/202605/conversations/7494560109732334261/sessions/7345123456789012345/end?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json' \
  -d '{}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /customer_service/202605/conversations/{conversation_id}/sessions/{session_id}/end`*
