# TikTok Shop API: Update Shop Webhook

# Update Shop Webhook Implementation Guide

## 1. Purpose
API updates shop webhook URL for specific event topic. Use when webhook URL changes or subscribing to new event.

## 2. Endpoint
* **Method**: `PUT`
* **URL**: `https://open-api.tiktokglobalshop.com/event/202309/webhooks`

## 3. Headers & Auth
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token (user_type = 0).

## 4. Parameters

### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Request signature. |
| `timestamp` | number | Yes | Unix timestamp (UTC). |
| `shop_cipher` | string | Yes | Shop identifier. Required for cross-border shops. |

### Body Parameters (JSON)
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `address` | string | Yes | Webhook URL. Max 255 characters. |
| `event_type` | string | Yes | Event topic. See allowed values below. |

#### Allowed `event_type` Values:
* `ORDER_STATUS_CHANGE`
* `RECIPIENT_ADDRESS_UPDATE`
* `PACKAGE_UPDATE`
* `PRODUCT_STATUS_CHANGE`
* `SELLER_DEAUTHORIZATION`
* `UPCOMING_AUTHORIZATION_EXPIRATION`
* `CANCELLATION_STATUS_CHANGE`
* `RETURN_STATUS_CHANGE`
* `NEW_CONVERSATION`
* `NEW_MESSAGE`
* `PRODUCT_INFORMATION_CHANGE`
* `PRODUCT_CREATION`
* `PRODUCT_CATEGORY_CHANGE`
* `NEW_MESSAGE_LISTENER`
* `INVOICE_STATUS_CHANGE`
* `PRODUCT_AUDIT_STATUS_CHANGE`
* `REVERSE_STATUS_UPDATE`

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
* `message` (string): Status message. Contains failure reason if code not `0`.
* `request_id` (string): Log ID for debugging.
* `data` (object): Return data. Empty on success.

## 6. Error Handling
* Check `code` field. If `code` not `0`, request failed.
* Read `message` field to find failure reason.
* Log `request_id` for support tickets.

## 7. Pitfalls & Best Practices
* **Shop Cipher**: Wrong `shop_cipher` returns bad data for cross-border shops. Verify cipher before call.
* **URL Length**: `address` limit 255 characters. Keep webhook URL short.
* **Signature**: Generate fresh `sign` and `timestamp` for every request. Old timestamps cause auth failure.

## 8. Code Example

```bash
curl -X PUT 'https://open-api.tiktokglobalshop.com/event/202309/webhooks?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "address": "https://partner.tiktokshop.com",
  "event_type": "ORDER_STATUS_CHANGE"
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `PUT /event/202309/webhooks`*
