# TikTok Shop API: Creator Search Sample Application Fulfillments

# Creator Sample Fulfillment Search API Guide

## 1. Purpose
Creators query sample fulfillment status. Track sample progress.

## 2. Endpoint
* **Method**: `POST`
* **URL**: `https://open-api.tiktokglobalshop.com/affiliate_creator/202409/sample_applications/fulfillments/search`

## 3. Headers & Auth
* `content-type`: `application/json`
* `x-tts-access-token`: Creator access token. Get from token API. Must use `user_type = 1`.

## 4. Parameters

### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Signature from generation algorithm. |
| `timestamp` | number | Yes | Unix timestamp UTC. |
| `sort_field` | string | No | Sort field. Values: `expired_time`, `create_time`. Default: `expired_time`. |
| `sort_order` | string | No | Sort direction. Values: `ASC`, `DESC`. Default: `ASC`. |

### Body Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `fulfillment_statuses` | array[string] | Yes | Status filter list. Values: `PENDING`, `ONGOING`, `SUCCEED`, `FAILED`, `OVERDUE`, `SUSPEND`, `CANCELLED`, `EXEMPTED`. |

## 5. Response Structure
Returns JSON object.

### Root Fields
* `code` (number): Status code. `0` means success.
* `message` (string): Status message. Contains error details.
* `request_id` (string): Log identifier. Use for debug.
* `data` (object): Payload.

### Data Object
* `fulfillments` (array): List of fulfillment records.
  * `id` (string): Fulfillment ID.
  * `shop_id` (string): Shop ID.
  * `application_id` (string): Sample application ID.
  * `sample_application_type` (string): Type. Example: `FREE_SAMPLE`.
  * `product_id` (string): Product ID.
  * `expiration_time` (number): Expiry timestamp.
  * `total_suspend_duration` (number): Paused time duration.
  * `status` (string): Current status.
  * `bound_product_status` (string): Product link status. Example: `LIVE`.

## 6. Error Handling
* Check `code` field.
* If `code` not `0`, action failed.
* Read `message` for failure reason.
* Save `request_id` for support.

## 7. Pitfalls & Best Practices
* **Token Type**: Use creator token (`user_type = 1`). Seller token fails.
* **Signature**: Generate `sign` using exact query parameters. Wrong order causes auth failure.
* **Timestamp**: Use current UTC time. Old timestamp triggers timeout error.

## 8. Code Example

```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/affiliate_creator/202409/sample_applications/fulfillments/search?sort_field=expired_time&timestamp=1623812664&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&sort_order=DESC' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{"fulfillment_statuses": ["PENDING", "ONGOING"]}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_creator/202409/sample_applications/fulfillments/search`*
