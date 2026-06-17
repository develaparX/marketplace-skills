# TikTok Shop API: Activate Product

# Activate Product API Implementation Guide

## 1. Function
Activate hidden products (`Seller_deactivated` or `Platform_deactivated` status). Show products in TikTok Shop catalog. 

## 2. Endpoint
* **Method**: `POST`
* **Path**: `/product/202309/products/activate`

## 3. Auth & Headers
* **Scope**: `seller.product.basic`
* **Headers**:
  * `content-type`: `application/json`
  * `x-tts-access-token`: Seller access token

## 4. Parameters

### Query Parameters
* `app_key` (string, required): Unique app key.
* `sign` (string, required): Signature from generation algorithm.
* `timestamp` (integer, required): Unix timestamp GMT (UTC+00:00).
* `shop_cipher` (string, required): Shop cipher.

### Request Body (JSON)
* `product_ids` (array of strings, required): Product IDs to activate. Max 20.
* `listing_platforms` (array of strings, optional): Target platforms. Values: `TOKOPEDIA`, `TIKTOK_SHOP`. Default: `TIKTOK_SHOP`.

## 5. Response Structure
JSON object:
* `code` (integer): Result code. `0` means success.
* `message` (string): Result message.
* `request_id` (string): Request identifier.
* `data` (object):
  * `errors` (array): List of activation failures.
    * `code` (integer): Error code.
    * `message` (string): Error description.
    * `detail` (object):
      * `product_id` (string): Failed product ID.
      * `extra_errors` (array): Sub-errors.
        * `code` (integer): Sub-error code.
        * `message` (string): Sub-error message.

## 6. Error Handling
* `12019022`: SKU lacks valid warehouse. Fix: Assign warehouse to SKU first.
* `12019120`: Product ID count exceeds limit. Fix: Send max 20 IDs.
* `12052048`: Product not in account/shop. Fix: Verify product ID ownership.
* `12052093`: Seller listing limit hit. Fix: Delete old products.
* `12052330`: Platform not supported. Fix: Check `listing_platforms` values.
* `12052332`: Seller center locked during integration. Fix: Wait for integration finish.
* `12052700`: Seller inactive. Fix: Check seller account status.
* `36009003`: Internal error. Fix: Retry request.

## 7. Pitfalls & Best Practices
* **Batch Limit**: Max 20 product IDs per call. Split larger lists.
* **Warehouse Check**: Ensure all target SKUs have active warehouse associations before call.
* **Partial Success**: Some products may fail while others succeed. Check `data.errors` array in response.

## 8. Code Example

```bash
curl -X POST "https://api.tiktokshop.com/product/202309/products/activate?app_key=123456&sign=abcdef123456&timestamp=1690000000&shop_cipher=GHIJKL" \
  -H "content-type: application/json" \
  -H "x-tts-access-token: access_token_val" \
  -d '{
    "product_ids": [
      "17200001234",
      "17200005678"
    ],
    "listing_platforms": [
      "TIKTOK_SHOP"
    ]
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /product/202309/products/activate`*
