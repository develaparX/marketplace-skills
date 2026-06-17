# TikTok Shop API: Get Aftersale Eligibility

# Get Aftersale Eligibility API Guide

## 1. Purpose
Checks refund, return, cancel options for order. Call before making aftersale request.

## 2. Endpoint
*   **Method:** `GET`
*   **URL:** `https://open-api.tiktokglobalshop.com/return_refund/202602/orders/{order_id}/aftersale_eligibility`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (user_type = 0).

## 4. Parameters

### Path Parameters
*   `order_id` (string, required): TikTok Shop order ID.

### Query Parameters
*   `app_key` (string, required): App developer key.
*   `sign` (string, required): Request signature.
*   `timestamp` (number, required): Unix timestamp (UTC).
*   `shop_cipher` (string, required): Shop identifier. Required for cross-border shops.
*   `initiate_aftersale_user` (string, optional): User type. Values: `SELLER`, `BUYER`. Default: `SELLER`.
*   `request_types` (array, optional): Filter by type. Values: `CANCEL`, `REFUND`, `RETURN_AND_REFUND`.

## 5. Response Structure
Returns JSON object.

```json
{
  "code": 0,
  "message": "success",
  "request_id": "2026...",
  "data": {
    "sku_eligibility": [
      {
        "sku_id": "1729385144994206632",
        "line_item_eligibility": [
          {
            "request_type": "REFUND",
            "order_line_items_ids": ["576469648086306000"],
            "eligible": true,
            "ineligible_code": 25001001,
            "ineligible_reason": "invalid order status",
            "available_reason_names": "available reason names",
            "order_line_list": [
              {
                "order_line_item_id": "576469648086306986",
                "sub_order_line_item_id": "576469648086306987"
              }
            ]
          }
        ]
      }
    ]
  }
}
```

## 6. Error Handling
*   Check `code` field. `0` means success.
*   Non-zero code means error. Read `message` for details.

## 7. Pitfalls & Best Practices
*   **Cross-border shops:** Must pass correct `shop_cipher`. Wrong cipher returns wrong data.
*   **Signature:** Calculate `sign` using all query parameters. Sort keys alphabetically before signing.
*   **Check eligibility first:** Always call this API before submitting refund or return requests to prevent API errors.

## 8. Code Example

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/return_refund/202602/orders/577087614418520388/aftersale_eligibility?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&initiate_aftersale_user=BUYER&request_types=REFUND' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /return_refund/202602/orders/{order_id}/aftersale_eligibility`*
