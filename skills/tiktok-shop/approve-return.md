# TikTok Shop API: Approve Return

# Approve Return API Implementation Guide

## 1. Purpose
Approve buyer return request. Use when seller accept return/refund. Action result depend on return type, status.

## 2. Endpoint
* **Method**: `POST`
* **URL**: `https://open-api.tiktokglobalshop.com/return_refund/202309/returns/{return_id}/approve`

## 3. Headers & Auth
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token (from Get Access Token, user_type = 0)

## 4. Parameters

### Path Parameter
* `return_id` (string, required): Return request ID.

### Query Parameters
* `app_key` (string, required): Unique app key.
* `sign` (string, required): Signature from gen algorithm.
* `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
* `shop_cipher` (string, required): Shop cipher token.
* `idempotency_key` (string, optional): Unique key to prevent double requests.

### Request Body (JSON)
* `decision` (string, required): Seller decision. Allowed values:
  * `APPROVE_REFUND`
  * `APPROVE_RETURN`
  * `APPROVE_RECEIVED_PACKAGE`
  * `APPROVE_REPLACEMENT`
  * `ISSUE_REPLACEMENT_REFUND`
  * `OFFER_PARTIAL_REFUND`
  * `DIRECT_REFUND`
* `buyer_keep_item` (boolean, optional): Use only when `decision` is `APPROVE_RETURN`. Set `true` for returnless refund.
* `partial_refund` (object, optional): Required only when `decision` is `OFFER_PARTIAL_REFUND`. Omit otherwise.
  * `currency` (string)
  * `amount` (string)

## 5. Response Structure
* `code` (number): Status code. `0` means success.
* `message` (string): Status message.
* `request_id` (string): Log ID.
* `data` (object): Return details.

## 6. Error Handling
* `11050001` / `25001001`: Bad parameter. Check format.
* `25001003`: Bad order status.
* `25011012` / `25011013`: Status block approval.
* `25020004`: Decision mismatch return type.
* `25020005`: No permission.

## 7. Pitfalls & Best Practices
* Send `idempotency_key`. Prevent double action.
* Match decision fields. Send `partial_refund` only for `OFFER_PARTIAL_REFUND`. Send `buyer_keep_item` only for `APPROVE_RETURN`. Wrong fields cause error `25020004`.

## 8. Example Request
```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/return_refund/202309/returns/4035319218955782461/approve?timestamp=1623812664&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&idempotency_key=40b456b1-78e7-412d-9fe6-82181496e1bd' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "decision": "APPROVE_REFUND",
  "buyer_keep_item": true,
  "partial_refund": {
    "currency": "IDR",
    "amount": "10"
  }
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /return_refund/202309/returns/{return_id}/approve`*
