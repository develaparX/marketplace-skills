# TikTok Shop API: Create First Mile Bundle(V2)

# Create First Mile Bundle (V2)

## 1. Purpose
Group packages into single bundle for TikTok Shop warehouse. Use when shipping multiple orders together. Returns bundle ID and label URL.

## 2. Endpoint
* **Method:** `POST`
* **URL:** `https://open-api.tiktokglobalshop.com/fulfillment/202510/first_mile_bundle`

## 3. Authentication & Headers
### Headers
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token (user_type = 0)

### Query Parameters
* `app_key`: App identifier
* `timestamp`: Unix timestamp (UTC)
* `sign`: Request signature
* `shop_cipher`: Shop identifier

## 4. Request Parameters (Body)
```json
{
  "order_ids": ["string"],
  "handover_method": "string",
  "shipping_provider_id": "string",
  "tracking_number": "string",
  "phone_tail_number": "string"
}
```

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `order_ids` | Array[String] | Yes | Order IDs in bundle. |
| `handover_method` | String | Yes | `PICKUP` or `DROP_OFF`. |
| `shipping_provider_id` | String | Conditional | Required if `handover_method` is `DROP_OFF`. |
| `tracking_number` | String | Conditional | Required if `handover_method` is `DROP_OFF`. |
| `phone_tail_number` | String | Conditional | Last 4 digits of sender phone. Required if `handover_method` is `DROP_OFF`. |

## 5. Response Structure
```json
{
  "code": 0,
  "message": "Success",
  "request_id": "string",
  "data": {
    "first_mile_bundle_id": "string",
    "url": "string",
    "errors": [
      {
        "code": 0,
        "message": "string",
        "detail": {
          "order_id": "string"
        }
      }
    ]
  }
}
```

## 6. Error Handling
* Root `code` non-zero: Request failed.
* Root `code` is `0` but `data.errors` populated: Partial failure. Some orders failed bundle creation.
* Check `data.errors[].detail.order_id` to identify failed packages.

## 7. Pitfalls & Best Practices
* **Conditional validation:** `DROP_OFF` requires provider ID, tracking number, and phone tail. API rejects request if missing.
* **Partial success check:** Do not assume root `code: 0` means all orders succeeded. Parse `data.errors` array.
* **Token type:** Ensure `x-tts-access-token` belongs to seller (`user_type = 0`).

## 8. Example Request
```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/fulfillment/202510/first_mile_bundle?timestamp=1623812664&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
-H 'content-type: application/json' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-d '{
  "order_ids": [
    "578967030217083407"
  ],
  "handover_method": "PICKUP",
  "shipping_provider_id": "7463353253533",
  "tracking_number": "SF1244442424",
  "phone_tail_number": "1234"
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /fulfillment/202510/first_mile_bundle`*
