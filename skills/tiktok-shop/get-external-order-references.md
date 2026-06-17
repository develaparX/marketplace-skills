# TikTok Shop API: Get External Order References

# Get External Order References API

## 1. Purpose
API fetch external order mapping. Use to verify sync between TikTok Shop and external OMS (e.g. Shopify).

## 2. Endpoint
* Method: `GET`
* Path: `/order/202406/orders/{order_id}/external_orders`
* Base URL: `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token (from Get Access Token, `user_type = 0`).

## 4. Parameters
### Path Parameters
* `order_id` (string, required): TikTok Shop order ID.

### Query Parameters
* `app_key` (string, required): App unique key.
* `sign` (string, required): Signature from gen algorithm.
* `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
* `platform` (string, required): External OMS alias. Allowed: `SHOPIFY`, `WOOCOMMERCE`, `BIGCOMMERCE`, `MAGENTO`, `SALESFORCE_COMMERCE_CLOUD`, `CHANNEL_ADVISOR`, `AMAZON`, `ORDER_MANAGEMENT_SYSTEM`, `WAREHOUSE_MANAGEMENT_SYSTEM`, `ERP_SYSTEM`.
* `shop_cipher` (string, required): Shop identifier cipher.

## 5. Response Structure
Response body contains:
* `code` (number): Status code. `0` means success.
* `message` (string): Status message.
* `request_id` (string): Log identifier.
* `data` (object): Payload.
  * `external_orders` (array):
    * `id` (string): External order ID.
    * `platform` (string): External platform name.
    * `line_items` (array):
      * `id` (string): Line item ID.
      * `origin_id` (string): Original line item ID.

## 6. Error Handling
Check `code` value. If `code` not `0`, request failed. Log `request_id` to troubleshoot.

## 7. Pitfalls & Best Practices
* Platform value case-sensitive. Must match enum.
* Signature generation must include all query parameters.
* Timestamp must be current UTC. Old timestamps cause auth failure.

## 8. Code Example

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/order/202406/orders/576461413038785752/external_orders?platform=SHOPIFY&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /order/202406/orders/{order_id}/external_orders`*
