# TikTok Shop API: Get Reject Reasons

# Get Reject Reasons API Implementation Guide

## 1. Purpose
Get reject reasons for aftersales request. Use before reject action.

## 2. Endpoint
* **Method:** `GET`
* **URL:** `https://open-api.tiktokglobalshop.com/return_refund/202309/reject_reasons`

## 3. Headers
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token (from Get Access Token, user_type = 0)

## 4. Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key |
| `sign` | string | Yes | Signature from gen algorithm |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00) |
| `shop_cipher` | string | Yes | Shop identifier |
| `return_or_cancel_id` | string | Yes | Return or cancel request ID |
| `locale` | string | No | BCP-47 locale code. Default: `en-US` |

## 5. Response Structure
JSON response fields:
* `code` (number): Success/failure status code. `0` is success.
* `message` (string): Status message.
* `request_id` (string): Log identifier.
* `data` (object): Contains payload.
  * `reasons` (array): List of reject reasons.
    * `name` (string): Reason key.
    * `text` (string): Display text.

### Response Example
```json
{
  "code": 0,
  "data": {
    "reasons": [
      {
        "name": "seller_reject_apply_you_have_reached_an_agreement_with_the_buyer",
        "text": "You have reached an agreement with the buyer"
      }
    ]
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

## 6. Error Handling
* Check `code` field. Non-zero means error.
* Log `request_id` for troubleshooting.

## 7. Pitfalls & Best Practices
* **Signature Error:** Generate `sign` using exact query parameters. Sort parameters alphabetically before signing.
* **Locale:** Pass correct BCP-47 code (e.g. `en-US`, `zh-CN`) to show localized text to seller.
* **Token Expiry:** Refresh `x-tts-access-token` before expiry.

## 8. Code Example

### cURL
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/return_refund/202309/reject_reasons?timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&locale=en-US&return_or_cancel_id=4035319218955782461&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c' \
  -H 'content-type: application/json' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /return_refund/202309/reject_reasons`*
