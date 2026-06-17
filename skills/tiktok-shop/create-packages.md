# TikTok Shop API: Create Packages

# Create Packages API Implementation Guide

## 1. Overview
API ships orders. Purchases labels. US, JP regions only. Use when order ready for fulfillment.

## 2. Endpoint & Method
*   **Method:** `POST`
*   **Path:** `/fulfillment/202512/packages`

## 3. Headers & Auth
*   **Scope:** `seller.fulfillment.basic`
*   **Headers:**
    *   `content-type` (string, required): `application/json`
    *   `x-tts-access-token` (string, required): Seller access token

## 4. Parameters

### Query Parameters
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Request signature.
*   `timestamp` (int, required): Unix timestamp GMT.
*   `shop_cipher` (string, required): Shop information cipher.

### Request Body (JSON)
*   `ship_type` (string, required): Shipping type.
    *   `1`: One order, one package.
    *   `2`: Partial order, multi package.
    *   `3`: Multi order, one package.
*   `order_id` (string, optional): Order ID. Required if `ship_type` is `1` or `2`.
*   `order_line_item` (array of objects, optional): Line items. Required if `ship_type` is `2`.
*   `order_list_ids` (array of strings, optional): Order ID list. Required if `ship_type` is `3`.
*   `dimension` (object, optional): Package dimensions.
*   `shipping_service_id` (string, optional): Shipping service ID.
*   `weight` (object, optional): Package weight.

## 5. Response Structure
JSON object:
*   `code` (int): Status code.
*   `message` (string): Status message.
*   `request_id` (string): Request log ID.
*   `data` (object): Package details, shipping service info, package ID, weight.

## 6. Error Handling
Check `code` field. Non-zero means error. Log `request_id` to debug failed requests.

## 7. Pitfalls & Best Practices
*   **Region restriction:** API fails for shops outside US and JP. Check shop region before call.
*   **Logic conflict:** API doc mentions `order_id` required for `ship_type` `0` and `1`. `ship_type` `0` not defined. Use `order_id` for `ship_type` `1` and `2`.
*   **Signature:** Calculate `sign` using exact GMT timestamp. Clock drift causes auth failure.

## 8. Code Example

```bash
curl -X POST "https://api-gateway.domain/fulfillment/202512/packages?app_key=mock_key&sign=mock_sign&timestamp=1735689600&shop_cipher=mock_cipher" \
  -H "content-type: application/json" \
  -H "x-tts-access-token: mock_token" \
  -d '{
    "ship_type": "1",
    "order_id": "1234567890",
    "dimension": {
      "length": 12.0,
      "width": 8.0,
      "height": 6.0,
      "unit": "inch"
    },
    "weight": {
      "value": 1.5,
      "unit": "pound"
    },
    "shipping_service_id": "srv-123"
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /`*
