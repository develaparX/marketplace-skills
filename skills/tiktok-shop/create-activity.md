# TikTok Shop API: Create Activity

# Create Activity API Implementation Guide

## 1. Purpose
Create product discount or flash deal activity. Use to set up promotions.

## 2. Endpoint & Method
* **Method:** `POST`
* **Path:** `/promotion/202309/activities`
* **Base URL:** `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
* `content-type`: `application/json` (Required)
* `x-tts-access-token`: Seller access token (Required)

## 4. Parameters

### Query Parameters
* `app_key` (string, required): Unique app key.
* `sign` (string, required): Signature from generation algorithm.
* `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
* `shop_cipher` (string, required): Shop identifier.

### Request Body
* `title` (string, required): Unique activity name. Max 50 characters.
* `activity_type` (string, required): Promotion type. Allowed: `FIXED_PRICE`, `DIRECT_DISCOUNT`, `FLASHSALE`, `SHIPPING_DISCOUNT`, `BUY_MORE_SAVE_MORE`, `BUY_X_GET_Y`.
* `product_level` (string, required): Product dimension. Allowed: `PRODUCT`, `VARIATION`, `SHOP`.
* `duration_type` (string, optional): Effective time type. Allowed: `NORMAL`, `INDEFINITE`. Default: `NORMAL`.
* `begin_time` (number, required): Start UNIX timestamp. Must be future time.
* `end_time` (number, required): End UNIX timestamp.
* `participation_limit` (array, optional): Buyer purchase limits.
* `discount` (object, optional): Discount details.
* `target_user_info` (object, optional): Target customer segment.

## 5. Response Structure
* `code` (number): Status code. `0` means success.
* `message` (string): Status message.
* `request_id` (string): Log identifier.
* `data` (object):
  * `activity_id` (string): Created activity ID.
  * `create_time` (number): Creation timestamp.
  * `update_time` (number): Update timestamp.
  * `status` (string): Activity status (e.g., `ONGOING`).

## 6. Error Handling
* `17003203`: Storewide free shipping active. Limit one.
* `17029004`: Duplicate title. Change `title` value.
* `17029005`: Begin time in past. Set `begin_time` to future.
* `17029006` / `17029007`: Duration invalid. Adjust start/end times.
* `17029035`: ShopRisk check failed. Account restricted.
* `36009003`: Internal error. Retry request.

## 7. Pitfalls & Best Practices
* **Title collision:** Titles must be unique. Append timestamp to title to avoid `17029004`.
* **Clock sync:** Server time must match UTC. Out-of-sync clocks cause signature failure.
* **Time check:** `begin_time` must be greater than current time.

## 8. Code Example

```bash
curl -X POST \
 'https://open-api.tiktokglobalshop.com/promotion/202309/activities?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "title": "DiscountEvent0829",
  "activity_type": "FIXED_PRICE",
  "product_level": "PRODUCT",
  "duration_type": "INDEFINITE",
  "begin_time": 1661756811,
  "end_time": 1661856811,
  "participation_limit": [
    {
      "type": "BUYER_NO_LIMIT"
    }
  ],
  "discount": {
    "shipping_discount": {
      "threshold_type": "MINIMAL_ITEM_QUANTITY",
      "threshold_value": "3",
      "type": "DISCOUNT_SHIPPING_FEE",
      "value": "10.5"
    }
  }
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /promotion/202309/activities`*
