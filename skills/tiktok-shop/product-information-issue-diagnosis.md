# TikTok Shop API: Product Information Issue Diagnosis

# Product Information Issue Diagnosis API Guide

## 1. Purpose
API diagnoses product issues. Use to check health of live products.

## 2. Endpoint
* **Method**: `GET`
* **Path**: `/product/202405/products/diagnoses`

## 3. Authentication & Headers
Required scope: `serller.product.optimize`

Headers:
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token (user_type = 0)

## 4. Query Parameters
* `app_key` (string, required): Unique app key.
* `sign` (string, required): Signature from algorithm.
* `timestamp` (int, required): Unix timestamp GMT (UTC+00:00).
* `product_ids` ([]string, required): Live product IDs. Status must be `ACTIVATE`. Max 200 IDs.
* `shop_cipher` (string, required): Shop identifier.

## 5. Response Structure
```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {}
}
```
* `code` (int): Status code.
* `message` (string): Status message.
* `request_id` (string): Log identifier.
* `data` (object): Diagnosis details.

## 6. Error Codes
* `12009014`: seller no permission for product error
* `12019114`: Seller has no permission
* `12019120`: The number of provided product IDs exceeds the limit.
* `12052260`: The product ID does not exist
* `36009003`: Internal error. Please try again. If the issue persists after multiple attempts, please contact platform support.

## 7. Pitfalls & Best Practices
* **Limit**: Max 200 product IDs per request. Batch larger lists.
* **Status**: Products must be active. Inactive products cause errors.
* **Scope Typo**: Scope name has typo (`serller.product.optimize`). Use exact spelling.

## 8. cURL Example
```bash
curl -X GET "https://api-gateway.domain/product/202405/products/diagnoses?app_key=YOUR_APP_KEY&sign=YOUR_SIGN&timestamp=1714521600&product_ids=prod123&product_ids=prod456&shop_cipher=YOUR_SHOP_CIPHER" \
  -H "content-type: application/json" \
  -H "x-tts-access-token: YOUR_ACCESS_TOKEN"
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /product/202405/products/diagnoses`*
