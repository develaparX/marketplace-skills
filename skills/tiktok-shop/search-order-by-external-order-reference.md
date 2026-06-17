# TikTok Shop API: Search Order By External Order Reference

# Search Order By External Order Reference

## 1. Purpose
Find TikTok Shop order ID using external OMS order ID. Use to link external system orders to TikTok Shop orders.

## 2. Endpoint
* **Method:** `POST`
* **URL:** `https://open-api.tiktokglobalshop.com/order/202406/orders/external_order_search`

## 3. Headers & Auth
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token (user_type = 0).

## 4. Parameters
Query parameters:
* `app_key` (string, required): Unique app key.
* `sign` (string, required): Signature from gen algorithm.
* `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
* `shop_cipher` (string, required): Shop identifier.
* `platform` (string, required): External OMS name. Allowed: `SHOPIFY`, `WOOCOMMERCE`, `BIGCOMMERCE`, `MAGENTO`, `SALESFORCE_COMMERCE_CLOUD`, `CHANNEL_ADVISOR`, `AMAZON`, `ORDER_MANAGEMENT_SYSTEM`, `WAREHOUSE_MANAGEMENT_SYSTEM`, `ERP_SYSTEM`.
* `external_order_id` (string, required): Order ID in external OMS.

*Note: Request body must be empty JSON `{}`.*

## 5. Response Structure
JSON response:
* `code` (number): Status code. `0` is success.
* `message` (string): Error or success message.
* `request_id` (string): Log ID for debug.
* `data` (object): Order details.
  * `orders` (array): Matching orders.
    * `id` (string): TikTok Shop order ID.
    * `external_order` (object): External order info.
      * `id` (string): External order ID.
      * `platform` (string): External platform.
      * `line_items` (array): Item details.
        * `id` (string): TikTok line item ID.
        * `origin_id` (string): External line item ID.

## 6. Error Handling
* Check `code`. If not `0`, request failed.
* Read `message` for failure reason.
* Log `request_id` for TikTok support.

## 7. Pitfalls & Best Practices
* **Platform value:** Must match allowed list exactly. Case sensitive.
* **Signature:** Generate `sign` using correct app secret and query params.
* **Empty body:** Must send empty JSON `{}` in body. Do not send null or empty string.
* **Timestamp:** Must be current UTC. Old timestamps fail.

## 8. Code Example

### Curl
```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/order/202406/orders/external_order_search?sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&app_key=38abcd&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&platform=SHOPIFY&external_order_id=676461413038785752' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /order/202406/orders/external_order_search`*
