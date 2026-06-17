# TikTok Shop API: Update Agent Settings

# Update Agent Settings API Implementation Guide

## 1. Function & Use Case
Update agent status. Set if agent accept auto-assigned chats. Use when agent change shift or workload.

## 2. Endpoint
*   **Method:** `PUT`
*   **Path:** `/customer_service/202309/agents/settings`
*   **Base URL:** `https://open-api.tiktokglobalshop.com`

## 3. Headers & Authentication
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token. Get from Get Access Token API. Use `user_type = 0`.

## 4. Parameters

### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Signature from generation algorithm. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |
| `shop_cipher` | string | Yes | Shop identifier cipher. |

### Body Parameters (JSON)
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `can_accept_chat` | boolean | Yes | `true` = auto-assigned chats. `false` = manual chats only. |

## 5. Response Structure
JSON response contains:
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Log identifier for debug.
*   `data` (object): Empty on success.

## 6. Error Handling
Check `code` field. 

| Code | Description | Action |
| :--- | :--- | :--- |
| `45101001` | Internal error. | Retry later. Contact support if fail. |
| `36009003` | Internal error. | Retry. Contact support if persist. |

## 7. Pitfalls & Best Practices
*   **Signature mismatch:** Generate `sign` query param last. Sort all query params alphabetically before hash.
*   **Timestamp expiry:** Use current UTC time. Request fails if timestamp too old.
*   **Token type:** Ensure `x-tts-access-token` belongs to seller (`user_type = 0`).

## 8. Code Example

```bash
curl -X PUT 'https://open-api.tiktokglobalshop.com/customer_service/202309/agents/settings?sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&app_key=38abcd&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{"can_accept_chat": true}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `PUT /customer_service/202309/agents/settings`*
