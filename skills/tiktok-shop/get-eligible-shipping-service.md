# TikTok Shop API: Get Eligible Shipping Service

# Get Eligible Shipping Service API Guide

## 1. Function & Usage
API queries shipping services for order. Use before shipping to get rates and carrier options based on package size/weight.

## 2. Endpoint
* **Method:** `POST`
* **URL:** `https://open-api.tiktokglobalshop.com/fulfillment/202309/orders/{order_id}/shipping_services/query`

## 3. Headers & Auth
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token.

**Query Parameters (Auth):**
* `app_key`: Unique app key.
* `sign`: Request signature.
* `timestamp`: Unix timestamp (UTC).
* `shop_cipher`: Shop identifier.

## 4. Parameters

### Path Parameter
* `order_id` (string, required): TikTok Shop order ID.

### Request Body (JSON)
* `order_line_item_ids` (array[string], optional): Order line item IDs.
* `weight` (object, optional): Package weight.
  * `value` (string): Weight value.
  * `unit` (string): Weight unit (e.g., `GRAM`).
* `dimension` (object, optional): Package dimensions.
  * `length` (string): Length value.
  * `width` (string): Width value.
  * `height` (string): Height value.
  * `unit` (string): Dimension unit (e.g., `INCH`, `CM`).
* `order_line_list` (array[object], optional): Sub-items for split orders.
  * `order_line_id` (string): Line item ID.
  * `sub_item_id` (string): Sub-item ID.

## 5. Response Structure
* `code` (number): `0` for success, non-zero for error.
* `message` (string): Status message.
* `request_id` (string): Log identifier.
* `data` (object):
  * `order_id` (string): Target order ID.
  * `order_line_id` (array[string]): Line IDs.
  * `weight` (object): Package weight.
  * `shipping_services` (array[object]): Available carriers.
    * `id` (string): Service ID.
    * `name` (string): Service name.
    * `price` (string): Cost.
    * `currency` (string): Currency code.
    * `earliest_delivery_days` (number): Min transit days.
    * `latest_delivery_days` (number): Max transit days.
    * `is_default` (boolean): Default service flag.
    * `shipping_provider_name` (string): Carrier name.
    * `shipping_provider_id` (string): Carrier ID.

## 6. Error Codes
* `10006402` / `36009003`: Internal error. Retry request.
* `21001001`: Invalid parameters. Check input format.
* `21011001`: Package not found. Verify order state.
* `21011006`: Order already shipped. Stop process.
* `21011029`: Order outside fulfillment unit.
* `21011037`: No services found. Check weight or address.
* `21011048`: Multiple packages exist. Must specify `order_line_list`.

## 7. Pitfalls & Best Practices
* **Unit mismatch:** Ensure weight and dimension units match carrier requirements.
* **Split orders:** If order contains multiple items, use `order_line_list` to avoid error `21011048`.
* **Signature:** Generate `sign` parameter using correct algorithm before every call. Timestamp must be current.

## 8. Code Example

```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/fulfillment/202309/orders/32132124331234/shipping_services/query?sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&app_key=38abcd' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "order_line_item_ids": [
    "32132124331234"
  ],
  "weight": {
    "value": "0.4",
    "unit": "GRAM"
  },
  "dimension": {
    "length": "0.3",
    "width": "0.2",
    "height": "1.5",
    "unit": "INCH"
  },
  "order_line_list": [
    {
      "order_line_id": "57632132124331234",
      "sub_item_id": "57632132124331234"
    }
  ]
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /fulfillment/202309/orders/{order_id}/shipping_services/query`*
