# TikTok Shop API: Reject Return

# Reject Return API Implementation Guide

## 1. Purpose
API rejects buyer return or refund request. Use when seller denies request. Valid decision depends on current request status.

## 2. Endpoint
* **Method**: `POST`
* **URL**: `https://open-api.tiktokglobalshop.com/return_refund/202309/returns/{return_id}/reject`

## 3. Headers
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token.

## 4. Parameters

### Path Parameter
* `return_id` (string, required): Return request ID.

### Query Parameters
* `app_key` (string, required): App identifier.
* `sign` (string, required): Request signature.
* `timestamp` (number, required): Unix timestamp (UTC).
* `shop_cipher` (string, required): Shop identifier.
* `idempotency_key` (string, optional): Unique UUID. Prevents duplicate requests. Max 255 characters.

### Body Parameters (JSON)
* `decision` (string, required): Seller decision. Allowed values:
  * `REJECT_REFUND`: Reject refund-only request.
  * `REJECT_RETURN`: Reject initial return-and-refund request.
  * `REJECT_RECEIVED_PACKAGE`: Reject return-and-refund request after buyer ships item.
  * `REJECT_REPLACEMENT`: Reject replacement request.
* `reject_reason` (string, required): Rejection reason name. Get from Get Decision Eligibility API.
* `comment` (string, optional): Seller explanation.
* `images` (array, optional): Evidence images. Contains `image_id`, `mime_type`, `height`, `width`.

## 5. Response Structure
JSON object containing:
* `code` (number): Status code. `0` means success.
* `message` (string): Status description.
* `request_id` (string): Log identifier.
* `data` (object): Return details.

## 6. Error Handling
Common error codes:
* `25020010`: Request approved already. Cannot reject.
* `25020004`: Decision mismatch. Check reverse type.
* `25011025`: Quick refund active. Rejection blocked.
* `25020005`: Permission denied. Check shop cipher.
* `25001020`: Reason offline. Fetch new reason.

## 7. Best Practices & Pitfalls

### Implementation Sequence
To ensure the rejection reason is valid, you must follow this sequence:
1. Call the Get Decision Eligibility API to retrieve the currently available rejection reasons for the return request.
2. Extract the valid reason name from the eligibility response.
3. Map this reason name to the `reject_reason` field in the Reject Return payload.
4. Send the POST request to the Reject Return endpoint.

### Pitfalls
* Shop cipher incorrect. Cross-border shops fail. Use correct cipher from Get Authorization Shop API.
* Reason code changes. Do not hardcode reasons. Always fetch eligibility first.

## 8. Code Example

```bash
curl -X POST \
 'https://open-api.tiktokglobalshop.com/return_refund/202309/returns/4035319218955782461/reject?timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&idempotency_key=40b456b1-78e7-412d-9fe6-82181496e1bd&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c' \
 -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
 -H 'content-type: application/json' \
 -d '{
  "decision": "REJECT_RECEIVED_PACKAGE",
  "reject_reason": "seller_reject_apply_package_has_not_exceeded_estimated_delivery_time",
  "comment": "I have reached an agreement with the buyer",
  "images": [
    {
      "image_id": "tos-maliva-i-o3syd03w52-us/57a1c8908fe74572861ea5e50887d8d1",
      "mime_type": "image/png",
      "height": 200,
      "width": 200
    }
  ]
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /return_refund/202309/returns/{return_id}/reject`*
