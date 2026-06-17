# TikTok Shop API: Get Available Shipping Template

# Get Available Shipping Template API

## Overview
API fetches seller shipping templates. Use to check template availability and find block reasons.

## Endpoint
* **Method:** `GET`
* **URL:** `https://open-api.tiktokglobalshop.com/logistics/202510/seller_templates`

## Headers
* `content-type`: `application/json` (Required)
* `x-tts-access-token`: Seller access token (Required. Get from auth flow, user_type = 0)

## Query Parameters
* `app_key` (string, required): Unique app key.
* `sign` (string, required): Request signature.
* `timestamp` (number, required): Unix timestamp (UTC).
* `shop_cipher` (string, required): Shop identifier. Required for cross-border shops.
* `product_attribute` (object, optional): Product dimensions and weight.

## Response Fields
* `code` (number): Status code. `0` means success.
* `message` (string): Error description or success message.
* `request_id` (string): Log identifier.
* `data` (object): Payload.
  * `templates` (array): List of templates.
    * `template_is_available` (boolean): Availability status.
    * `template` (object): Template details.
      * `template_name` (string): Name.
      * `template_id` (string): ID.
      * `is_default` (boolean): Default flag.
      * `template_party` (number): Party type.
    * `service_unreachable_reason` (array): Block reasons.
      * `service_id` (string): Service ID.
      * `filter_reason` (array): Filter details.
        * `filter_type` (string): Filter type code.
        * `reason` (string): Block explanation.

## Error Handling
Check `code` field. Non-zero value means error. Read `message` for details.

## Pitfalls & Best Practices
* **Shop Cipher:** Pass correct `shop_cipher`. Wrong cipher causes incorrect response for cross-border shops. Get cipher from Shop API.
* **Signature:** Calculate `sign` correctly. Invalid signature causes auth failure. Use official algorithm.
* **Product Attributes:** Send `product_attribute` to get accurate template availability based on package size.

## Code Examples

### cURL
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/logistics/202510/seller_templates?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=G

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /logistics/202510/seller_templates`*
