# TikTok Shop API: Ship Inbound Order

# Ship Inbound Order API Guide

## 1. Purpose
Finalize inbound order shipment. Use after preparing cartons and shipping methods.

## 2. Endpoint
* **Method**: `POST`
* **Path**: `/fbt/202603/ship_inbound_order`
* **Base URL**: `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token. Get from Get Access Token (use `user_type = 0`).

## 4. Parameters

### Query Parameters
* `app_key` (string, required): Unique app key.
* `sign` (string, required): Signature from gen algorithm.
* `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
* `shop_cipher` (string, required): Shop identifier.

### Body Parameters
* `inbound_order_id` (string, required): Inbound order ID.
* `cartons` (array, optional): Carton list.
  * `carton_type` (string): Carton type (e.g., `SINGLE_SKU`).
  * `items` (array): Items in carton.
    * `goods_id` (string): Goods ID.
    * `quantity` (number): Item quantity.
    * `lot_code` (string): Lot code.
    * `expiration_timestamp` (string): Expiration timestamp.
  * `quantity` (number): Carton quantity.
  * `carton_nums` (array of strings): Carton numbers.
* `shipment_option` (object, required): Shipment option details.

## 5. Response Structure
* `code` (number): Status code. `0` means success.
* `message` (string): Status message.
* `request_id` (string): Request log ID.
* `data` (object): Return data.
  * `inbound_order_id` (string): Inbound order ID.

## 6. Error Handling
* `36009003`: Internal error. Retry request. Contact support if fail.
* `39001002`: Empty request/parameters. Check input.

## 7. Pitfalls & Best Practices
* `shipment_option` required in schema. Example payload lacks it. Include `shipment_option` object to avoid validation errors.
* `timestamp` must be UTC. Check system clock.
* `sign` calculation must include all query parameters. Sort alphabetically before hashing.

## 8. Code Example
```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/fbt/202603/ship_inbound_order?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /fbt/202603/ship_inbound_order`*
