# TikTok Shop API: Remove Activity Product

# Implementation Guide: Remove Activity Product

## 1. Overview
API remove product or SKU from discount or flash sale promotion. Use when seller stop discount on specific item but keep promotion active.

## 2. Endpoint
* **Method**: `DELETE`
* **Path**: `/promotion/202309/activities/{activity_id}/products`
* **Base URL**: `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token (from Get Access Token, user_type = 0)

## 4. Parameters

### Path Parameter
* `activity_id` (string, required): Target promotion ID.

### Query Parameters
* `app_key` (string, required): Unique app key.
* `sign` (string, required): Request signature.
* `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
* `shop_cipher` (string, required): Shop identifier.

### Request Body (JSON)
* `product_ids` (array of string, optional): Product IDs to remove. Max 300.
* `sku_ids` (array of string, optional): SKU IDs to remove. Max 300.
* `benefit_product_ids` (array of string, optional): BXGY benefit product IDs to remove. Max 100.
* `exclude_product_ids` (array of string, optional): BXGY exclude product IDs to remove. Max 100.

## 5. Response Structure
Returns JSON object:
* `code` (number): Status code. `0` means success.
* `message` (string): Status message.
* `request_id` (string): Request log identifier.
* `data` (object):
  * `activity_id` (string): Promotion ID.
  * `status` (string): Promotion status (e.g., `ONGOING`).
  * `update_time` (number): Update timestamp.

## 6. Error Handling
Check `code` in response. Key error codes:
* `17029009`: Activity not exist. Check `activity_id`.
* `17029012`: Activity expired. Cannot modify.
* `17029047` / `17029048`: Ongoing flash sale product/SKU. Cannot modify during sale.
* `17029069`: Access denied. Activity belongs to other shop.
* `17029046`: Item count exceed limit.

## 7. Pitfalls & Best Practices
* **Flash Sale Lock**: Ongoing flash sale items locked. Remove before sale start.
* **Batch Limits**: Do not exceed 300 products/SKUs or 100 BXGY items per request. Split into multiple requests if needed.
* **Shop Cipher Match**: Ensure `shop_cipher` matches owner of `activity_id`.

## 8. Example Request

```bash
curl -X DELETE 'https://open-api.tiktokglobalshop.com/promotion/202309/activities/7402881377634567979/products?sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&app_key=38abcd&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "product_ids": [
    "7493989962827597361"
  ],
  "sku_ids": [
    "7135657830438176513"
  ],
  "benefit_product_ids": [
    "7493989962827597361"
  ],
  "exclude_product_ids": [
    "7493989962827597361"
  ]
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `DELETE /promotion/202309/activities/{activity_id}/products`*
