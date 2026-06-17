# TikTok Shop API: Get FBT Warehouse List

# FBT Warehouse List Integration Guide

## 1. Overview
Get Fulfilled by TikTok (FBT) warehouse details. Use to map warehouse IDs, get addresses, check subscription.

## 2. Endpoint
* **Method**: `GET`
* **URL**: `https://open-api.tiktokglobalshop.com/fbt/202408/warehouses`

## 3. Headers & Auth
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token. Get from auth flow (user_type = 0).

## 4. Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app identifier. |
| `sign` | string | Yes | Request signature. |
| `timestamp` | number | Yes | Unix timestamp (UTC). |
| `shop_cipher` | string | Yes | Shop cipher identifier. |

## 5. Response Structure
* `code` (number): Success status. `0` means success.
* `message` (string): Error or success message.
* `request_id` (string): Log identifier.
* `data` (object): Contains `warehouses` array.
  * `fbt_warehouse_id` (string): FBT warehouse ID.
  * `warehouse_ids` (array[string]): Associated warehouse IDs.
  * `name` (string): Warehouse name.
  * `type` (string): Warehouse type (e.g., `PLATFORM_WAREHOUSE`).
  * `subscribed` (boolean): Subscription status.
  * `addresses` (array[object]): Address details (postal code, region, state, district, city, address lines).

## 6. Error Handling
* Check `code` field. 
* If `code` not `0`, action failed. Read `message` for error details. Use `request_id` for support tickets.

## 7. Pitfalls & Best Practices
* **Signature failure**: Sort query parameters alphabetically before signing.
* **Timestamp error**: Server rejects requests with old timestamps. Generate fresh timestamp for every call.
* **Token expiry**: Refresh `x-tts-access-token` before expiry to prevent `401` errors.

## 8. Code Example

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/fbt/202408/warehouses?timestamp=1623812664&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
  -H 'content-type: application/json' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /fbt/202408/warehouses`*
