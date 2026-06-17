# TikTok Shop API: Delete Shop Webhook

# Delete Shop Webhook API Implementation Guide

## 1. Overview
API deletes shop webhook URL for event topic. 
Use: Stop receiving specific event notifications.
Note: Returns success code `0` even if webhook not configured.

## 2. Endpoint
* **Method:** `DELETE`
* **URL:** `https://open-api.tiktokglobalshop.com/event/202309/webhooks`

## 3. Headers & Authentication
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token (from Get Access Token, where `user_type = 0`).

## 4. Parameters

### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Request signature. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |
| `shop_cipher` | string | Yes | Shop identifier. |

### Request Body (JSON)
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `event_type` | string | Yes | Topic to delete. |

**Allowed `event_type` values:**
`ORDER_STATUS_CHANGE`, `RECIPIENT_ADDRESS_UPDATE`, `PACKAGE_UPDATE`, `PRODUCT_STATUS_CHANGE`, `SELLER_DEAUTHORIZATION`, `UPCOMING_AUTHORIZATION_EXPIRATION`, `CANCELLATION_STATUS_CHANGE`, `RETURN_STATUS_CHANGE`, `NEW_CONVERSATION`, `NEW_MESSAGE`, `PRODUCT_INFORMATION_CHANGE`, `PRODUCT_CREATION`, `PRODUCT_CATEGORY_CHANGE`, `NEW_MESSAGE_LISTENER`, `INVOICE_STATUS_CHANGE`, `PRODUCT_AUDIT_STATUS_CHANGE`, `REVERSE_STATUS_UPDATE`.

## 5. Response Structure
JSON object containing:
* `code` (number): Status code (`0` for success).
* `message` (string): Status message.
* `request_id` (string): Log identifier.
* `data` (object): Empty object `{}` on success.

## 6. Error Handling
* API returns `code: 0` even if webhook did not exist.
* Non-zero `code` indicates authentication, signature, or parameter validation failure. Check `message` for details.

## 7. Pitfalls & Best Practices
* **Idempotency:** Do not use this API to check if webhook exists. It always returns success.
* **Signature:** Generate `sign` using correct algorithm. Incorrect signature causes immediate failure.
* **Timestamp:** Ensure system clock syncs with UTC. Out-of-sync timestamps cause request rejection.

## 8. Code Example (cURL)

```bash
curl -X DELETE 'https://open-api.tiktokglobalshop.com/event/202309/webhooks?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "event_type": "ORDER_STATUS_CHANGE"
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `DELETE /event/202309/webhooks`*
